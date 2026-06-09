'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { Icon } from './Icons';
import type { CaseFile } from '@/data/site';

type InvestigationModalProps = {
  caseFile: CaseFile | null;
  open: boolean;
  onClose: () => void;
};

export function InvestigationModal({ caseFile, open, onClose }: InvestigationModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!mounted || !open || !caseFile) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[220] flex items-start justify-center overflow-y-auto px-4 py-6 sm:items-center sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close case details"
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-[0_0_0_1px_rgba(30,144,255,0.12),0_30px_80px_rgba(2,8,23,0.75)]"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-title"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-dashboard text-xs uppercase tracking-[0.28em] text-cyan-300">{caseFile.caseId}</p>
                <h2 id="case-title" className="font-section mt-3 text-3xl text-white">{caseFile.title}</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition duration-200 hover:border-cyan-400/40 hover:text-white"
                aria-label="Close case modal"
              >
                <Icon name="close" />
              </button>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <p className="font-dashboard text-xs uppercase tracking-[0.24em] text-slate-400">Objective</p>
                <p className="mt-3 font-body text-sm leading-7 text-slate-200">{caseFile.objective}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <p className="font-dashboard text-xs uppercase tracking-[0.24em] text-slate-400">Status</p>
                <p className="mt-3 font-body text-sm leading-7 text-slate-200">{caseFile.status}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <p className="font-dashboard text-xs uppercase tracking-[0.24em] text-cyan-300">Findings</p>
                <p className="font-body text-sm leading-7 text-slate-200">{caseFile.findings}</p>
              </div>
              <div className="space-y-3 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <p className="font-dashboard text-xs uppercase tracking-[0.24em] text-cyan-300">Tools Used</p>
                <div className="flex flex-wrap gap-2">
                  {caseFile.tools.map((tool) => (
                    <span key={tool} className="rounded-full border border-cyan-400/15 bg-white/5 px-3 py-2 text-xs text-slate-200">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <p className="font-dashboard text-xs uppercase tracking-[0.24em] text-cyan-300">Methodology</p>
                <p className="mt-3 font-body text-sm leading-7 text-slate-200">{caseFile.methodology}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5">
                <p className="font-dashboard text-xs uppercase tracking-[0.24em] text-cyan-300">Lessons Learned</p>
                <p className="mt-3 font-body text-sm leading-7 text-slate-200">{caseFile.lessons}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
