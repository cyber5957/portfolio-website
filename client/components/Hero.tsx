'use client';

import { motion } from 'framer-motion';
import { DashboardScene } from './DashboardScene';
import { Icon } from './Icons';
import { InternshipStatus } from './InternshipStatus';
import { siteContent } from '@/data/site';

export function Hero() {
  return (
    <section id="home" className="relative mx-auto max-w-[1800px] px-4 pt-[clamp(1.5rem,4vw,5.5rem)] sm:px-6 lg:px-8 xl:px-12">
      <div className="grid items-center gap-16 lg:grid-cols-[1.3fr_0.9fr] lg:gap-24 xl:gap-28">
        <div className="space-y-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-dashboard inline-flex items-center gap-3 rounded-full border border-cyan-400/18 bg-slate-950/65 px-4 py-2.5 text-sm text-slate-200 backdrop-blur-xl"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_18px_rgba(30,144,255,0.8)]" />
              <span>{siteContent.badge}</span>
            </motion.div>
          </div>

          <div className="mt-6">
            <InternshipStatus className="!rounded-full" />
          </div>

          <div className="max-w-4xl space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-hero max-w-4xl text-4xl leading-[0.9] text-white sm:text-6xl lg:text-8xl"
            >
              <span className="block">{siteContent.headline[0]}</span>
              <span className="block text-cyan-400 drop-shadow-[0_0_18px_rgba(30,144,255,0.5)]">{siteContent.headline[1]}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="font-dashboard text-sm uppercase tracking-[0.32em] text-cyan-300 sm:text-lg sm:tracking-[0.34em]"
            >
              {siteContent.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.26 }}
              className="font-body max-w-3xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-8"
            >
              {siteContent.description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 1, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34 }}
            className="flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            <a
              href={siteContent.ctas.projects}
              className="font-button inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-4 text-base text-slate-950 shadow-[0_14px_32px_rgba(30,144,255,0.22)] transition duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_0_34px_rgba(30,144,255,0.42)]"
            >
              View My Projects
              <Icon name="arrow" className="h-4 w-4" />
            </a>
            <a
              href={siteContent.ctas.resumePdf}
              className="font-button inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base text-white backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:shadow-[0_0_28px_rgba(30,144,255,0.18)]"
            >
              Resume PDF
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="flex flex-wrap items-center gap-3 text-sm text-slate-300"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs uppercase tracking-[0.24em] text-cyan-200">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Public investigation
            </span>
            <a
              href={`https://github.com/${siteContent.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-200 transition duration-200 hover:text-white"
            >
              View live GitHub work
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.44 }}
            className="grid gap-4 rounded-[1.75rem] border border-white/10 bg-slate-950/85 p-5 shadow-neon sm:grid-cols-3"
          >
            <a
              href={`mailto:${siteContent.contact.email}`}
              className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-4 text-left transition duration-200 hover:border-cyan-400/30 hover:bg-slate-900/95"
            >
              <p className="font-dashboard text-xs uppercase tracking-[0.28em] text-cyan-300">Hire Me</p>
              <p className="mt-3 font-body text-base text-white">{siteContent.contact.email}</p>
            </a>

            <div className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-4">
              <p className="font-dashboard text-xs uppercase tracking-[0.28em] text-cyan-300">Focus</p>
              <p className="mt-3 font-body text-base text-white">SOC Analyst readiness • Threat detection • Incident response</p>
            </div>

            <a
              href={`https://github.com/${siteContent.githubUsername}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-4 transition duration-200 hover:border-cyan-400/30 hover:bg-slate-900/95"
            >
              <p className="font-dashboard text-xs uppercase tracking-[0.28em] text-cyan-300">Live Work</p>
              <p className="mt-3 font-body text-base text-white">Public GitHub investigations and lab reports</p>
            </a>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 1, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative"
        >
          <DashboardScene />
        </motion.div>
      </div>
    </section>
  );
}
