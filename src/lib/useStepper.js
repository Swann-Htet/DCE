import { useEffect, useState } from 'react';

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// True while the element is on screen (so mockup loops only run when visible).
// Hidden panes/tabs and old browsers get `true`, so a mockup is never stuck.
export function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (document.visibilityState === 'hidden' || !('IntersectionObserver' in window)) { setVisible(true); return undefined; }
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return visible;
}

// Cycles through steps, each lasting durations[step] ms, only while `active`.
// Returns { step, round } (round counts completed cycles). With prefers-reduced-motion the loop does not
// run and the mockup shows `staticStep`, a frame that still tells the story.
export function useStepper(durations, active, staticStep = 0) {
  const [state, setState] = useState({ step: staticStep, round: 0 });
  useEffect(() => {
    if (!active || prefersReduced()) return undefined;
    let timer;
    let step = 0;
    let round = 0;
    const tick = () => {
      setState({ step, round });
      timer = setTimeout(() => {
        step += 1;
        if (step >= durations.length) { step = 0; round += 1; }
        tick();
      }, durations[step]);
    };
    tick();
    return () => clearTimeout(timer);
  }, [durations, active]);
  return state;
}
