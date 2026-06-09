'use client';

import { motion } from 'framer-motion';
import { siteContent } from '@/data/site';

export function InvestigatorJournal() {
  return (
    <section id="journal" className="mx-auto max-w-[1800px] px-4 pt-16 sm:px-6 lg:px-8 xl:px-12 lg:pt-20">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-neon">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="font-dashboard text-xs uppercase tracking-[0.32em] text-cyan-300">Journal</p>
            <h2 className="font-section mt-3 text-3xl text-white sm:text-4xl">Investigator notes and tactical reflections</h2>
            <p className="font-body mt-4 max-w-3xl leading-8 text-slate-300">
              A curated journal that maps investigative focus, operational mindset, and key security insights for hiring teams.
            </p>
          </div>

          <div className="grid gap-4">
            {siteContent.journalEntries.map((entry) => (
              <motion.article
                key={entry.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-section text-lg text-white">{entry.title}</h3>
                  <span className="rounded-full border border-cyan-400/15 bg-cyan-400/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-cyan-200">
                    {entry.tag}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">{entry.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
