'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { siteContent } from '@/data/site';

const commands = [
  { label: 'Go to Home', action: '#home', type: 'section' },
  { label: 'Go to About', action: '#about', type: 'section' },
  { label: 'Go to Investigations', action: '#projects', type: 'section' },
  { label: 'Go to Journey', action: '#journey', type: 'section' },
  { label: 'Go to Skills', action: '#skills', type: 'section' },
  { label: 'Go to Reports', action: '#reports', type: 'section' },
  { label: 'Go to Contact', action: '#contact', type: 'section' },
  { label: 'Open GitHub', action: siteContent.socials.find((item) => item.label === 'GitHub')?.href ?? '#', type: 'link' },
  { label: 'Open LinkedIn', action: siteContent.socials.find((item) => item.label === 'LinkedIn')?.href ?? '#', type: 'link' },
  { label: 'Contact Me', action: '#contact', type: 'section' },
  { label: 'Download Resume', action: siteContent.ctas.resumePdf, type: 'link' }
] as const;

type Command = (typeof commands)[number];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(
    () => commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((current) => !current);
      }

      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      inputRef.current?.focus();
    }
  }, [open]);

  const execute = (command: Command) => {
    setOpen(false);

    if (command.type === 'section') {
      const target = document.querySelector(command.action);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.open(command.action, '_blank');
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="fixed bottom-6 right-6 z-[251] inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/95 px-4 py-3 text-sm text-white shadow-neon transition duration-200 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-500/10"
        aria-label="Open command palette"
      >
        <span className="font-dashboard uppercase tracking-[0.2em] text-cyan-300">Ctrl</span>
        <span className="font-dashboard uppercase tracking-[0.2em] text-slate-300">K</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[250] flex items-center justify-center px-4 py-6 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <button className="absolute inset-0 bg-slate-950/85 backdrop-blur-lg" onClick={() => setOpen(false)} type="button" aria-label="Close command palette" />

          <motion.div
            className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 p-5 shadow-[0_0_60px_rgba(15,23,42,0.45)]"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-dashboard text-xs uppercase tracking-[0.28em] text-cyan-300">Command Palette</p>
                <p className="font-body mt-1 text-sm text-slate-300">Press Enter to execute. Ctrl + K to open.</p>
              </div>
              <span className="rounded-full border border-cyan-400/15 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-cyan-100">
                {filtered.length} commands
              </span>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-slate-950/80 px-4 py-3 shadow-inner">
              <label htmlFor="command-search" className="sr-only">
                Search commands
              </label>
              <input
                ref={inputRef}
                id="command-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search commands..."
                className="w-full bg-transparent text-base text-white outline-none placeholder:text-slate-500"
                autoComplete="off"
                autoCorrect="off"
              />
            </div>

            <div className="mt-4 grid gap-3">
              {filtered.length > 0 ? (
                filtered.map((command) => (
                  <button
                    key={command.label}
                    type="button"
                    onClick={() => execute(command)}
                    className="group flex w-full items-center justify-between rounded-2xl border border-white/10 bg-slate-900/85 px-4 py-4 text-left transition duration-200 hover:border-cyan-400/30 hover:bg-slate-900/95"
                  >
                    <div>
                      <p className="font-body text-sm text-white">{command.label}</p>
                      <p className="font-dashboard text-xs uppercase tracking-[0.24em] text-slate-400">{command.type}</p>
                    </div>
                    <span className="text-xs text-cyan-300">↵</span>
                  </button>
                ))
              ) : (
                <div className="rounded-2xl border border-white/10 bg-slate-900/85 p-4 text-sm text-slate-400">No matching commands found.</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
    </>
  );
}
