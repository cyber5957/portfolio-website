'use client';

import { motion } from 'framer-motion';
import { siteContent } from '@/data/site';

export function SkillMatrix() {
  const categories = siteContent.skillMatrix;

  return (
    <section id="skills" className="mx-auto max-w-[1800px] px-4 pt-16 sm:px-6 lg:px-8 xl:px-12 lg:pt-20">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="max-w-3xl">
          <p className="font-dashboard text-xs uppercase tracking-[0.32em] text-cyan-300">Skills</p>
          <h2 className="font-section mt-3 text-3xl text-white sm:text-4xl">Capabilities built for SOC operations</h2>
          <p className="font-body mt-4 max-w-3xl leading-8 text-slate-300">
            A professional skill visualization that highlights strength across Blue Team, threat detection, and operational readiness.
          </p>
        </div>

        <div className="grid gap-4">
          {categories.map((category) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-neon"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-section text-xl text-white">{category.title}</h3>
                <span className="text-xs uppercase tracking-[0.24em] text-slate-400">{category.strength}%</span>
              </div>
              <div className="mt-5 space-y-3">
                {category.items.map((item, index) => (
                  <div key={item} className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-slate-300">
                      <span>{item}</span>
                      <span>{Math.max(20, category.strength - index * 10)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-300"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${Math.max(20, category.strength - index * 10)}%` }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
