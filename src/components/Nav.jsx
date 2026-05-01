import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';
import { NAV } from '../data/content.js';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled ? 'bg-cream-50/90 backdrop-blur border-b border-ink-950' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold uppercase tracking-wider">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="nav-link">
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#join" className="hidden md:inline-flex btn-primary text-sm">
          Join the Club
        </a>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-cream-50 border-b border-ink-950 px-5 py-4 flex flex-col gap-3 text-sm font-semibold uppercase tracking-wider">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
          <a href="#join" onClick={() => setOpen(false)} className="btn-primary text-center mt-2">
            Join the Club
          </a>
        </div>
      )}
    </header>
  );
}
