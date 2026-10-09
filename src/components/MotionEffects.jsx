import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Global, dependency-free motion layer:
//  - scroll progress bar        (--p on .scroll-progress)
//  - [data-reveal] scroll-in    (adds .is-in once visible; handles nodes added later)
//  - .spotlight card glow       (--mx / --my follow the pointer)
//  - .magnetic button pull      (subtle translate toward the pointer)
// With prefers-reduced-motion, everything is shown immediately and pointer effects are skipped.
export default function MotionEffects() {
  const { pathname } = useLocation();

  useEffect(() => {
    const bar = document.querySelector('.scroll-progress');
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar?.style.setProperty('--p', max > 0 ? String(Math.min(1, window.scrollY / max)) : '0');
      document.body.classList.toggle('is-scrolled', window.scrollY > 16);
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [pathname]);

  useEffect(() => {
    // Hidden tabs/panes do not deliver IntersectionObserver callbacks, so never leave content stranded.
    const noMotion = reduced() || document.visibilityState === 'hidden';
    const io = noMotion ? null : new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      }
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });

    const watch = (el) => {
      if (el.classList.contains('is-in') || el.dataset.watched) return;
      el.dataset.watched = '1';
      const r = el.getBoundingClientRect();
      const inView = r.top < window.innerHeight * 0.92 && r.bottom > 0;
      if (io && !inView) io.observe(el); else el.classList.add('is-in');
    };
    const scan = (root) => {
      if (root.matches?.('[data-reveal]')) watch(root);
      root.querySelectorAll?.('[data-reveal]').forEach(watch);
    };
    scan(document);
    const mo = new MutationObserver((muts) => {
      for (const m of muts) m.addedNodes.forEach((n) => { if (n.nodeType === 1) scan(n); });
    });
    mo.observe(document.getElementById('root'), { childList: true, subtree: true });
    return () => { io?.disconnect(); mo.disconnect(); };
  }, [pathname]);

  useEffect(() => {
    if (reduced() || !window.matchMedia('(pointer: fine)').matches) return undefined;
    const onMove = (e) => {
      const card = e.target.closest?.('.spotlight');
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }
      const mag = e.target.closest?.('.magnetic');
      if (mag) {
        const r = mag.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        mag.style.transform = `translate(${dx * 10}px, ${dy * 8}px)`;
      }
    };
    const onLeave = (e) => {
      const mag = e.target.closest?.('.magnetic');
      if (mag) mag.style.transform = '';
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerout', onLeave, { passive: true });
    return () => { document.removeEventListener('pointermove', onMove); document.removeEventListener('pointerout', onLeave); };
  }, []);

  return <div className="scroll-progress" aria-hidden="true" />;
}
