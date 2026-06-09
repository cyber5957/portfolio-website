'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from './Icons';

type TerminalAccessProps = {
  open: boolean;
  onClose: () => void;
};

type CommandResult = {
  heading: string;
  lines: string[];
};

const commandMap: Record<string, CommandResult> = {
  whoami: {
    heading: 'Identity',
    lines: ['Vinayak Chauhan', 'Cybersecurity Student', 'Blue Team Learner']
  },
  skills: {
    heading: 'Core Skills',
    lines: ['Wireshark', 'Nmap', 'Linux', 'Networking']
  },
  goals: {
    heading: 'Career Goals',
    lines: ['SOC Analyst', 'Threat Detection', 'Incident Response']
  }
};

const quickCommands = [
  { label: 'whoami', hint: 'Identity' },
  { label: 'skills', hint: 'Core Skills' },
  { label: 'goals', hint: 'Career Goals' }
] as const;

function TerminalBlock({ command, result }: { command: string; result: CommandResult }) {
  return (
    <div className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/80 p-4 shadow-neon transition duration-200 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_20px_44px_rgba(2,8,23,0.45),0_0_24px_rgba(30,144,255,0.1)]">
      <p className="font-dashboard text-sm text-cyan-300">
        <span className="text-slate-500">$</span> {command}
      </p>
      <div className="pl-4">
        <p className="font-dashboard text-xs uppercase tracking-[0.24em] text-slate-400">{result.heading}</p>
      </div>
      <div className="font-dashboard space-y-1 pl-4 text-sm text-slate-100 sm:text-base">
        {result.lines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function TerminalShell({ onClose }: { onClose: () => void }) {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; result?: CommandResult; error?: string }>>([
    {
      command: 'help',
      result: {
        heading: 'Available Commands',
        lines: ['whoami', 'skills', 'goals']
      }
    }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  const promptHint = useMemo(() => 'Type whoami, skills, or goals and press Enter.', []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runCommand = (rawCommand?: string) => {
    const normalized = (rawCommand ?? command).trim().toLowerCase();
    if (!normalized) {
      return;
    }

    const result = commandMap[normalized];
    if (result) {
      setHistory((current) => [...current, { command: normalized, result }]);
    } else {
      setHistory((current) => [
        ...current,
        {
          command: normalized,
          error: 'Unknown command. Try whoami, skills, or goals.'
        }
      ]);
    }

    setCommand('');
    window.requestAnimationFrame(() => inputRef.current?.focus());
  };

  return (
    <div className="flex min-h-full flex-col">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
        <div>
          <p className="font-dashboard text-xs uppercase tracking-[0.28em] text-cyan-300">Terminal Access</p>
          <p className="font-body mt-1 text-sm text-slate-400">Professional command palette</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="font-button rounded-xl border border-white/10 bg-white/5 p-2 text-slate-300 transition duration-200 hover:-translate-y-1 hover:border-cyan-400/40 hover:text-white hover:shadow-[0_0_24px_rgba(30,144,255,0.14)]"
          aria-label="Close terminal"
        >
          <Icon name="close" className="h-4 w-4" />
        </button>
      </div>

      <div className="grid gap-4 px-5 py-5 sm:max-h-[calc(100vh-9rem)] sm:overflow-y-auto sm:px-6">
        <div className="grid gap-3 rounded-3xl border border-white/10 bg-slate-950/82 p-4 shadow-neon transition duration-200 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_20px_44px_rgba(2,8,23,0.45),0_0_24px_rgba(30,144,255,0.1)] sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="font-dashboard text-xs uppercase tracking-[0.28em] text-slate-400">Live Session</p>
            <p className="font-body mt-2 text-sm leading-7 text-slate-300">
              A clean command palette for quick identity, skills, and goals lookup.
            </p>
          </div>
          <div className="font-dashboard flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(74,222,128,0.55)]" />
            Ready
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {quickCommands.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => runCommand(item.label)}
              className="font-button rounded-full border border-cyan-400/15 bg-cyan-400/10 px-3 py-2 text-xs uppercase tracking-[0.24em] text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-400/15"
            >
              {item.label}
              <span className="ml-2 text-cyan-300/70">{item.hint}</span>
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/82 p-4 shadow-neon transition duration-200 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-[0_20px_44px_rgba(2,8,23,0.45),0_0_24px_rgba(30,144,255,0.1)]">
          <div className="font-dashboard flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-slate-400">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(74,222,128,0.55)]" />
            <span>Command Output</span>
          </div>

          <div className="mt-4 space-y-4">
            {history.map((entry, index) =>
              entry.result ? (
                <TerminalBlock key={`${entry.command}-${index}`} command={entry.command} result={entry.result} />
              ) : (
                <div key={`${entry.command}-${index}`} className="space-y-2 rounded-2xl border border-white/10 bg-slate-950/80 p-4">
                  <p className="font-dashboard text-sm text-cyan-300">
                    <span className="text-slate-500">$</span> {entry.command}
                  </p>
                  <p className="font-body pl-4 text-sm text-rose-200">{entry.error}</p>
                </div>
              )
            )}
          </div>
        </div>

        <form
          className="rounded-2xl border border-cyan-400/15 bg-slate-950/82 p-4 shadow-neon transition duration-200 hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-[0_20px_44px_rgba(2,8,23,0.45),0_0_24px_rgba(30,144,255,0.12)]"
          onSubmit={(event) => {
            event.preventDefault();
            runCommand();
          }}
        >
          <label htmlFor="terminal-command" className="font-dashboard text-xs uppercase tracking-[0.28em] text-slate-400">
            Terminal Input
          </label>
          <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/88 px-4 py-3 shadow-[0_0_0_1px_rgba(30,144,255,0.05)]">
            <span className="font-dashboard text-sm text-cyan-300">vinayak@portfolio:~$</span>
            <input
              ref={inputRef}
              id="terminal-command"
              value={command}
              onChange={(event) => setCommand(event.target.value)}
              placeholder={promptHint}
              className="font-dashboard w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              autoComplete="off"
              spellCheck={false}
            />
            <span className="h-4 w-px animate-pulse bg-cyan-300/70" />
          </div>
          <div className="font-dashboard mt-3 flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-slate-500">
            <span>Press Enter to run</span>
            <span>Esc to close</span>
          </div>
        </form>
      </div>
    </div>
  );
}

export function TerminalAccess({ open, onClose }: TerminalAccessProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!mounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto px-4 py-6 sm:items-center sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          aria-modal="true"
          role="dialog"
        >
          <button
            type="button"
            aria-label="Close terminal access"
            className="absolute inset-0 cursor-default bg-slate-950/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-slate-950/85 shadow-[0_0_0_1px_rgba(30,144,255,0.12),0_30px_80px_rgba(2,8,23,0.75)] backdrop-blur-2xl sm:w-[min(100%,42rem)] sm:max-h-[calc(100vh-3rem)]"
          >
            <TerminalShell onClose={onClose} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
