'use client';

import { motion } from 'framer-motion';
import { siteContent } from '@/data/site';

export function MissionDashboard() {
  const { currentMission } = siteContent;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="rounded-[2rem] border border-white/10 bg-slate-950/75 p-5 shadow-neon backdrop-blur-xl"
      aria-label="Current mission overview"
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-dashboard text-xs uppercase tracking-[0.28em] text-cyan-300">Current Mission</p>
          <h3 className="font-section mt-3 text-xl text-white sm:text-2xl">{currentMission.title}</h3>
        </div>
        <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.26em] text-emerald-200">
          {currentMission.status}
        </span>
      </div>

      <p className="font-body mt-4 leading-7 text-slate-300">{currentMission.overview}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {currentMission.focusAreas.map((area) => (
          <div key={area} className="rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-slate-200">
            {area}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
