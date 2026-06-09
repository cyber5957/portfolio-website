'use client';

import { motion } from 'framer-motion';

type InternshipStatusProps = {
  text?: string;
  className?: string;
};

export function InternshipStatus({
  text = 'Available for Internship Opportunities',
  className = ''
}: InternshipStatusProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={`inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/8 px-4 py-2 text-sm text-emerald-100 shadow-[0_0_20px_rgba(52,211,153,0.12)] ${className}`}
      aria-label="Internship status"
    >
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
      <span className="font-dashboard uppercase tracking-[0.2em] text-emerald-100/90">{text}</span>
    </motion.div>
  );
}
