'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Icon } from './Icons';
import { TerminalWidget } from './TerminalWidget';

const floatingWrap = {
  initial: { opacity: 1, y: 18 },
  animate: (delay: number) => ({
    opacity: 1,
    y: [0, -6, 0],
    transition: {
      opacity: { duration: 0.7, delay, ease: 'easeOut' },
      y: {
        duration: 5.5,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
        delay
      }
    }
  })
};

// decorative map nodes removed to reduce silhouette/overlay graphics

function DashboardCard({
  title,
  children,
  delay
}: {
  title: string;
  children: ReactNode;
  delay: number;
}) {
  return (
    <motion.article
      variants={floatingWrap}
      initial="initial"
      animate="animate"
      custom={delay}
      className="rounded-3xl border border-cyan-400/25 bg-slate-950/82 p-4 shadow-neon backdrop-blur-xl transition duration-200 hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-[0_20px_44px_rgba(2,8,23,0.45),0_0_24px_rgba(30,144,255,0.12)] sm:p-5 z-[2] relative"
    >
      <p className="font-dashboard text-sm tracking-[0.18em] text-white">{title}</p>
      <div className="mt-3">{children}</div>
    </motion.article>
  );
}

const skillBarWidths = ['w-[72%]', 'w-[64%]', 'w-[56%]', 'w-[48%]'];

export function DashboardScene() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative min-h-[34rem] overflow-hidden rounded-[2rem] lg:min-h-[44rem]">
      <div className="absolute inset-0 bg-grid bg-[length:42px_42px] opacity-12 z-0" />

      {/* Removed large SVG silhouette and overlay gradients to declutter background */}

      <div className="relative z-[2] grid gap-6 p-4 pb-56 sm:p-6 sm:pb-56 lg:grid-cols-2 lg:gap-6 lg:p-8 lg:pb-56">
        <DashboardCard title="THREAT DETECTED" delay={0.08}>
          <div className="grid grid-cols-[auto,1fr] gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-300">
              <Icon name="shield" className="h-7 w-7" />
            </div>
            <div className="font-dashboard space-y-1 text-sm text-slate-200">
              <p>Severity: Medium</p>
              <p>Source: 192.168.1.25</p>
              <p>Status: Investigating</p>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="ACTIVE MONITORING" delay={0.18}>
          <div className="font-dashboard space-y-2.5 text-sm text-slate-200">
            <p>SIEM Connected</p>
            <p>Logs Analyzed</p>
            <p className="font-metric text-4xl text-white">24,821</p>
          </div>
          <div className="mt-4 h-12 rounded-2xl border border-cyan-400/15 bg-cyan-400/5 p-2">
            <div className="flex h-full items-end gap-1.5">
              {[26, 44, 18, 56, 28, 72, 36, 50, 24, 60, 32].map((height, index) => (
                <motion.span
                  key={height}
                  className="w-full rounded-full bg-gradient-to-t from-blue-500 to-cyan-300"
                  style={{ height: `${height}%` }}
                  animate={{ scaleY: [0.85, 1, 0.85] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: index * 0.12 }}
                />
              ))}
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="STATUS CARD" delay={0.28}>
          <div className="font-dashboard grid gap-2.5 text-sm text-slate-200">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3">
              <span>Incident Queue</span>
              <span className="text-cyan-300">3 Open</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3">
              <span>Response Time</span>
              <span className="text-cyan-300">12m Avg</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3">
              <span>Alerts Triaged</span>
              <span className="text-cyan-300">98.4%</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="TOP SKILLS" delay={0.38}>
          <ul className="font-dashboard space-y-2.5 text-sm text-slate-200">
            {['SIEM', 'Log Analysis', 'Incident Response', 'Network Security'].map((skill, index) => (
              <li key={skill} className="flex items-center gap-3">
                <span className="min-w-0">{skill}</span>
                <span className="ml-auto h-2 w-24 rounded-full bg-slate-800/90">
                  <span
                    className={`block h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-300 ${skillBarWidths[index]}`}
                  />
                </span>
              </li>
            ))}
          </ul>
        </DashboardCard>

        {/* Terminal row: spans both columns on large screens, sits below the cards */}
        <div className="lg:col-span-2 z-[2]">
          <TerminalWidget />
        </div>
      </div>
    </div>
  );
}
