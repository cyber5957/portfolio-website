'use client';

import { motion } from 'framer-motion';
import { siteContent } from '@/data/site';

export function AchievementWall() {
  return (
    <section id="reports" className="mx-auto max-w-[1800px] px-4 pt-16 sm:px-6 lg:px-8 xl:px-12 lg:pt-20">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="font-dashboard text-xs uppercase tracking-[0.32em] text-cyan-300">Achievements</p>
          <h2 className="font-section mt-3 text-3xl text-white sm:text-4xl">Operational impact and evidence</h2>
          <p className="font-body mt-4 max-w-3xl leading-8 text-slate-300">
            A showcase of awards, published reports, and measurable results from incident response and security research.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {siteContent.achievements.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="rounded-[1.75rem] border border-white/10 bg-slate-950/85 p-6 shadow-neon"
            >
              <h3 className="font-section text-lg text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.28em] text-slate-500">{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
