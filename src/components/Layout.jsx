import { useEffect, useRef, useState } from 'react';
import { SITE } from '../content';

export const NAV = [
  ['services', 'Capabilities'],
  ['workflow-simulator', 'Simulator'],
  ['live-sandbox', 'Live Sandbox'],
  ['architecture', 'Architecture'],
  ['roi-calculator', 'ROI Model'],
  ['case-studies', 'Case Studies'],
  ['process', 'Roadmap'],
];

export const Logo = ({ size = 22 }) => (
  <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true">
    <rect x="3" y="5" width="26" height="5" rx="2.5" fill="#f3f0eb" />
    <rect x="3" y="13.5" width="26" height="5" rx="2.5" fill="#ff7a3d" />
    <rect x="3" y="22" width="26" height="5" rx="2.5" fill="#8a705e" />
  </svg>
);

export function Nav({ onOpenCmd }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    menu.inert = !open;
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    menu.querySelector('a')?.focus();
    const onKey = e => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab') return;
      const f = [btnRef.current, ...menu.querySelectorAll('a')];
      const i = f.indexOf(document.activeElement);
      e.preventDefault();
      f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <a
        className="sr"
        href="#main"
        onFocus={e => e.currentTarget.classList.remove('sr')}
        onBlur={e => e.currentTarget.classList.add('sr')}
      >
        Skip to main content
      </a>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="wrap nav-wrap">
          <a href="#top" className="brand" aria-label="ERPsol home">
            <Logo size={24} />
            <span className="brand-text">ERPsol</span>
            <span className="brand-badge">ENTERPRISE</span>
          </a>

          <nav className="desktop-nav" aria-label="Main Navigation">
            <ul>
              {NAV.map(([id, l]) => (
                <li key={id}>
                  <a href={`#${id}`} data-nav={id}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-actions">
            {/* Quick Command Bar Trigger */}
            <button
              className="nav-cmd-trigger"
              onClick={() => onOpenCmd?.(true)}
              aria-label="Open Command Hub (Press ⌘K)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Search / Actions</span>
              <kbd>⌘K</kbd>
            </button>

            <a href="#contact" className="btn btn-primary nav-cta">
              <span>Book Consultation</span>
              <span className="arr">→</span>
            </a>

            <button
              ref={btnRef}
              className="menu-btn"
              aria-expanded={open}
              aria-controls="mmenu"
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              onClick={() => setOpen(o => !o)}
            >
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        ref={menuRef}
        id="mmenu"
        className={`mobile-menu ${open ? 'open' : ''}`}
        aria-hidden={!open}
        onClick={e => e.target.closest('a') && setOpen(false)}
      >
        <button
          className="btn btn-ghost"
          style={{ justifyContent: 'center', marginBottom: 16 }}
          onClick={() => {
            setOpen(false);
            onOpenCmd?.(true);
          }}
        >
          <span>⌘K Command Palette</span>
        </button>
        {NAV.map(([id, l]) => (
          <a key={id} href={`#${id}`}>
            {l}
          </a>
        ))}
        <a href="#contact" className="btn btn-primary" style={{ marginTop: 24, justifyContent: 'center' }}>
          Book Consultation
        </a>
      </div>
    </>
  );
}

export function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="wrap">
        <div className="footer-cols">
          <div className="footer-brand-col">
            <a href="#top" className="brand" aria-label="ERPsol home">
              <Logo size={24} />
              <span className="brand-text">ERPsol</span>
            </a>
            <p className="footer-blurb">
              Enterprise operating systems, custom business software, real-time analytics, and private autonomous AI pipelines engineered for organizations where operational reliability is non-negotiable.
            </p>
            <div className="footer-cert-tags">
              <span className="cert-tag">SOC 2 Type II Audited</span>
              <span className="cert-tag">ISO 27001 Certified</span>
              <span className="cert-tag">99.99% SLA Uptime</span>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Capabilities</h4>
            <ul className="footer-links">
              {SITE.services.map(s => (
                <li key={s.id}>
                  <a href="#services">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Interactive Riffs</h4>
            <ul className="footer-links">
              <li><a href="#workflow-simulator">Workflow Simulator (Retool)</a></li>
              <li><a href="#live-sandbox">Live App Sandbox (ERPSAA)</a></li>
              <li><a href="#architecture">Architecture Spec (Vercel)</a></li>
              <li><a href="#roi-calculator">ROI Estimator (Stripe)</a></li>
              <li><a href="#operational-core">3D Core Web (Lusion)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Advisory &amp; Contact</h4>
            <ul className="footer-links">
              <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><a href={`tel:${SITE.phone.replace(/[^0-9+]/g, '')}`}>{SITE.phone}</a></li>
              <li><a href="#contact">Schedule 30-Min Architecture Call</a></li>
              <li><a href={SITE.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></li>
              <li><a href={SITE.links.github} target="_blank" rel="noopener noreferrer">GitHub Enterprise ↗</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <span className="legal-copy">
            © {new Date().getFullYear()} ERPsol Systems Inc. All rights reserved. Double-entry architecture.
          </span>
          <div className="legal-links">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/security">Security &amp; Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
