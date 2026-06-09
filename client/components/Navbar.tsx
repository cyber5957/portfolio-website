'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icons';
import { TerminalAccess } from './TerminalAccess';
import { siteContent } from '@/data/site';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Journey', href: '#journey' },
  { label: 'Investigations', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Journal', href: '#journal' },
  { label: 'Contact', href: '#contact' }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('Home');
  const [commandOpen, setCommandOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const targetPercent = useRef(0);
  const currentPercent = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setCommandOpen(false);
      }
    };

    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // progress -> set a target percent and animate via rAF for smooth transform-only updates
      const raw = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      targetPercent.current = Math.min(100, Math.max(0, raw));
      if (rafId.current == null) {
        const tick = () => {
          // lerp current -> target
          const t = 0.18; // smoothing factor
          currentPercent.current += (targetPercent.current - currentPercent.current) * t;
          if (progressRef.current) {
            const s = Math.max(0, Math.min(1, currentPercent.current / 100));
            progressRef.current.style.transform = `scaleX(${s})`;
          }
          if (Math.abs(currentPercent.current - targetPercent.current) > 0.01) {
            rafId.current = requestAnimationFrame(tick);
          } else {
            // snap and stop
            currentPercent.current = targetPercent.current;
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${Math.max(0, Math.min(1, currentPercent.current / 100))})`;
            if (rafId.current) {
              cancelAnimationFrame(rafId.current);
              rafId.current = null;
            }
          }
        };
        rafId.current = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', onScroll as any);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.querySelector(l.href));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = `#${entry.target.id}`;
            const match = NAV_LINKS.find((n) => n.href === id);
            if (match) setActive(match.label);
          }
        });
      },
      { threshold: 0.45 }
    );
    sections.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const mobileMenuAriaExpanded = open ? 'true' : 'false';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'border-b border-white/8 bg-slate-900/60 backdrop-blur-sm' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main"
    >
      <div className="absolute left-0 top-0 h-1 w-full bg-transparent">
        <div ref={progressRef} className="h-1 bg-cyan-400 nav-progress" />
      </div>

      <div className="mx-auto flex h-20 max-w-[1800px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center gap-4">
          <a href="#home" className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-400/50 bg-cyan-400/6 text-cyan-300">
              <Icon name="shield" className="h-5 w-5" />
            </span>
            <span className="font-logo text-xl text-white">VINAYAK</span>
          </a>

          {/* availability moved to the Hero section per request */}
        </div>

        <nav className="hidden items-center gap-6 text-sm font-button text-slate-200 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                setActive(link.label);
                const el = document.querySelector(link.href);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`relative px-2 py-2 transition-colors duration-150 ${
                active === link.label ? 'text-white' : 'text-slate-200 hover:text-white'
              }`}
              aria-current={active === link.label ? 'page' : undefined}
            >
              {link.label}
              {active === link.label ? (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute left-0 right-0 bottom-0 h-0.5 bg-cyan-400 rounded-full nav-indicator"
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                />
              ) : null}
            </a>
          ))}

          <div className="relative">
            {(() => {
              const ariaProps: any = commandOpen
                ? { 'aria-expanded': true, 'aria-controls': 'command-center' }
                : {};
              return (
                <button
                  type="button"
                  onClick={() => setCommandOpen((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/6 bg-white/3 px-3 py-2 text-sm text-slate-100"
                  {...ariaProps}
                >
                  <Icon name="note" className="h-4 w-4" />
                  Command Center
                </button>
              );
            })()}

            <AnimatePresence>
              {commandOpen ? (
                <motion.div
                  id="command-center"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute right-0 mt-2 w-60 rounded-2xl border border-white/8 bg-slate-950/95 p-3 shadow-lg"
                >
                  <a href={`https://github.com/${siteContent.githubUsername}`} target="_blank" rel="noopener noreferrer" className="block rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-white/3">View GitHub</a>
                  <a href={siteContent.socials.find((s) => s.icon === 'linkedin')?.href} target="_blank" rel="noopener noreferrer" className="block rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-white/3">Open LinkedIn</a>
                  <a href={siteContent.ctas.resumePdf} className="block rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-white/3">Download Resume</a>
                  <a href="#projects" className="block rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-white/3">Latest Investigation</a>
                  <a href="#reports" className="block rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-white/3">Latest Report</a>
                  <a href="#contact" className="block rounded-md px-3 py-2 text-sm text-slate-200 hover:bg-white/3">Contact Me</a>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <a
            href={siteContent.ctas.resumePdf}
            className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 transition duration-200 hover:-translate-y-1 hover:bg-cyan-400/10 lg:inline-flex"
          >
            Resume
          </a>

          <button
            type="button"
            onClick={() => setTerminalOpen(true)}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 transition duration-200 hover:-translate-y-1 hover:bg-cyan-400/10"
            aria-label="Open terminal access"
          >
            <Icon name="terminal" className="h-4 w-4" />
            <span className="hidden lg:inline">Terminal Access</span>
          </button>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white lg:hidden"
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.aside
            id="mobile-navigation"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-60 h-full w-full max-w-sm border-l border-white/6 bg-slate-950/98 p-6 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <a href="#home" onClick={() => setOpen(false)} className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl border border-cyan-400/50 bg-cyan-400/6 text-cyan-300">
                  <Icon name="shield" className="h-5 w-5" />
                </span>
                <span className="font-logo text-lg text-white">VINAYAK</span>
              </a>
              <button onClick={() => setOpen(false)} className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/3">Close</button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-md bg-white/3 p-3">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-green-400 animate-pulse" />
                  <div>
                    <div className="text-xs text-slate-200">Status</div>
                    <div className="text-sm font-dashboard text-white">Available for Internship Opportunities</div>
                  </div>
                </div>
              </div>

              <nav className="grid gap-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      setActive(link.label);
                      const el = document.querySelector(link.href);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="rounded-xl px-4 py-3 text-lg text-slate-200 hover:bg-white/5"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="mt-4 flex items-center gap-3">
                <a href={`https://github.com/${siteContent.githubUsername}`} className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-sm">GitHub</a>
                <a href={siteContent.socials.find((s) => s.icon === 'linkedin')?.href} className="inline-flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-sm">LinkedIn</a>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      <TerminalAccess open={terminalOpen} onClose={() => setTerminalOpen(false)} />
    </header>
  );
}
