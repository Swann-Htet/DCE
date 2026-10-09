import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MotionEffects from './components/MotionEffects';
import SideDots from './components/SideDots';
import Home from './pages/Home';
import Feedback from './pages/Feedback';
import Privacy from './pages/Privacy';
import Features from './pages/Features';
import HowItWorks from './pages/HowItWorks';
import Security from './pages/Security';
import About from './pages/About';
import Demo from './pages/Demo';
import Admin from './pages/admin/Admin';

// New route -> start at the top.
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Section dots only make sense on the long, multi-screen pages.
function Dots() {
  const { pathname } = useLocation();
  return ['/', '/about', '/features'].includes(pathname) ? <SideDots key={pathname} /> : null;
}

// The admin panel has its own shell: no public header, footer or section dots.
function Shell() {
  const { pathname } = useLocation();
  const admin = pathname.startsWith('/admin');
  return (
    <>
      <ScrollToTop />
      <MotionEffects />
      <a className="skip-link" href="#main">Skip to main content</a>
      {!admin && <Header />}
      {admin ? (
        <Routes><Route path="/admin" element={<Admin />} /></Routes>
      ) : (
        <main id="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/security" element={<Security />} />
            <Route path="/about" element={<About />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      )}
      {!admin && <Dots />}
      {!admin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
