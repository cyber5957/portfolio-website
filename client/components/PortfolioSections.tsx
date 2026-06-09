'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Icon } from './Icons';
import { siteContent, type CaseFile } from '@/data/site';
import TimelineSection from './TimelineSection';
import { InvestigatorJournal } from './InvestigatorJournal';
import { AchievementWall } from './AchievementWall';
import { InvestigationModal } from './InvestigationModal';
import { CertificationsSection } from './CertificationsSection';

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay, ease: 'easeOut' }
  })
};

export function PortfolioSections() {
  const [activeCase, setActiveCase] = useState<CaseFile | null>(null);

  const heatmapBarClasses: Record<number, string> = {
    5: 'h-[60px] opacity-[0.8]',
    6: 'h-[72px] opacity-[0.82]',
    7: 'h-[84px] opacity-[0.86]',
    8: 'h-[96px] opacity-[0.9]',
    9: 'h-[108px] opacity-[0.94]',
    10: 'h-[120px] opacity-[0.99]'
  };

  return (
    <>
      <section id="projects" className="mx-auto max-w-[1800px] px-4 pt-12 sm:px-6 lg:px-8 xl:px-12 lg:pt-16">
        <div className="max-w-4xl">
          <p className="font-dashboard text-xs uppercase tracking-[0.32em] text-cyan-300">Featured Investigations</p>
          <h2 className="font-section mt-3 text-3xl text-white sm:text-4xl">Proof of work, not just placeholders</h2>
          <p className="font-body mt-4 max-w-3xl leading-8 text-slate-300">
            These case files show how I document, investigate, and report on security events with a SOC mindset.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {siteContent.caseFiles.map((file, index) => (
            <motion.article
              key={file.caseId}
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              custom={index * 0.08}
              className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 shadow-neon transition duration-200 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-slate-900/85 hover:shadow-[0_20px_44px_rgba(2,8,23,0.45),0_0_26px_rgba(30,144,255,0.14)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-date text-xs uppercase tracking-[0.28em] text-cyan-300">{file.caseId}</p>
                  <h3 className="font-section mt-2 text-xl text-white">{file.title}</h3>
                </div>
                <span className="font-dashboard rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
                  {file.status}
                </span>
              </div>

              <p className="font-body mt-4 leading-7 text-slate-300">{file.objective}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {file.tools.map((tool) => (
                  <span key={tool} className="font-dashboard rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                    {tool}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setActiveCase(file)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-4 py-3 text-sm text-slate-950 transition duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_34px_rgba(30,144,255,0.38)]"
              >
                Review Case File
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            </motion.article>
          ))}
        </div>
      </section>

      <TimelineSection />
      <AchievementWall />
      <InvestigatorJournal />

      <section id="heatmap" className="mx-auto max-w-[1800px] px-4 pt-16 sm:px-6 lg:px-8 xl:px-12 lg:pt-20">
        <div className="max-w-4xl">
          <p className="font-dashboard text-xs uppercase tracking-[0.32em] text-cyan-300">Learning Heatmap</p>
          <h2 className="font-section mt-3 text-3xl text-white sm:text-4xl">Learning activity over time</h2>
          <p className="font-body mt-4 max-w-3xl leading-8 text-slate-300">
            A simple view of how practice, reports, and hands-on work have been building month by month.
          </p>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {siteContent.learningHeatmap.map((month) => (
            <div key={month.month} className="border-t border-white/8 pt-5">
              <p className="font-dashboard text-sm uppercase tracking-[0.24em] text-slate-400">{month.month}</p>
              <div className="mt-4 flex items-end gap-2">
                {month.bars.map((level, index) => (
                  <span
                    key={`${month.month}-${index}`}
                    className={`flex-1 rounded-t-2xl bg-gradient-to-t from-blue-500 via-cyan-300 to-cyan-100 shadow-[0_0_18px_rgba(30,144,255,0.15)] ${heatmapBarClasses[level] ?? 'h-[60px] opacity-[0.8]'}`}
                  />
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-slate-400">
                <span>Learning Activity</span>
                <span>Growing</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-[1800px] px-4 pt-16 sm:px-6 lg:px-8 xl:px-12 lg:pt-20">
        <div className="max-w-4xl">
          <p className="font-dashboard text-xs uppercase tracking-[0.32em] text-cyan-300">Skills</p>
          <h2 className="font-section mt-3 text-3xl text-white sm:text-4xl">Core skills and tooling</h2>
          <p className="font-body mt-4 max-w-3xl leading-8 text-slate-300">A compact overview of technical areas I practice and tools I use regularly.</p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteContent.skills.map((group) => (
            <div key={group.title} className="rounded-2xl border border-white/10 bg-slate-950/80 p-5 shadow-neon">
              <div className="font-section text-lg text-white">{group.title}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((it) => (
                  <span key={it} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div id="about" className="mx-auto max-w-[1800px] px-4 pb-8 pt-6 sm:px-6 lg:px-8 xl:px-12 lg:pt-8">
        <div className="max-w-4xl">
          <p className="font-dashboard text-xs uppercase tracking-[0.32em] text-cyan-300">About</p>
          <h2 className="font-section mt-3 text-3xl text-white sm:text-4xl">My journey</h2>
          <div className="font-body mt-4 space-y-4 leading-8 text-slate-300">
            {siteContent.about.split('\n\n').map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      <InvestigationModal caseFile={activeCase} open={Boolean(activeCase)} onClose={() => setActiveCase(null)} />
      <CertificationsSection />
    </>
  );
}
