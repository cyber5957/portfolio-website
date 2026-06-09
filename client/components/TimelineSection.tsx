'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { siteContent } from '@/data/site';

export function TimelineSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="journey" className="mx-auto max-w-[1800px] px-4 pt-16 sm:px-6 lg:px-8 xl:px-12 lg:pt-20">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="max-w-3xl">
          <p className="font-dashboard text-xs uppercase tracking-[0.32em] text-cyan-300">Journey</p>
          <h2 className="font-section mt-3 text-3xl text-white sm:text-4xl">A modern investigation timeline</h2>
          <p className="font-body mt-4 max-w-3xl leading-8 text-slate-300">
            The timeline captures academic learning, active security practice, and professional progression with expandable milestones.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-neon lg:pl-10">
          <div className="absolute left-5 top-6 bottom-6 hidden w-px bg-gradient-to-b from-cyan-400/80 to-transparent lg:block" />

          <div className="relative space-y-8">
            {siteContent.journey.map((step, index) => {
              const isActive = activeIndex === index;
              return (
                <motion.div
                  key={step.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.05 }}
                >
                  <div className="w-full rounded-[1.5rem] border border-white/10 bg-slate-950/90 p-5 text-left transition duration-200 hover:border-cyan-400/30 hover:bg-slate-900/95">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 min-w-[2.5rem] items-center justify-center rounded-full border border-cyan-400/20 bg-slate-900/90 text-xs font-dashboard uppercase tracking-[0.24em] text-cyan-300 lg:h-10 lg:w-10">
                          {step.year}
                        </div>
                        <div>
                          <h3 className="font-section text-lg text-white">{step.title}</h3>
                          <p className="font-body mt-2 text-sm leading-6 text-slate-400">{step.summary}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-dashboard text-xs uppercase tracking-[0.22em] text-slate-500">{isActive ? 'Collapse' : 'Expand'}</span>
                        {(() => {
                          const a: any = isActive ? { 'aria-expanded': true, 'aria-controls': `journey-details-${index}` } : {};
                          return (
                            <button
                              type="button"
                              onClick={() => setActiveIndex(isActive ? null : index)}
                              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100"
                              {...a}
                            >
                              {isActive ? 'Hide' : 'Open'}
                            </button>
                          );
                        })()}
                      </div>
                    </div>

                    {isActive ? (
                      <div id={`journey-details-${index}`} className="mt-4 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-4 text-sm leading-7 text-slate-200">
                        <p>
                          This milestone represents the next stage of SOC preparation, blending academic foundation with hands-on security operations and public reporting.
                        </p>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TimelineSection;
