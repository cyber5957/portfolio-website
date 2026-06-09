'use client';

import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Icon } from './Icons';

const introForceKey = 'vinayak-portfolio-intro-force';

// Timings (ms) for cinematic steps
const STEP = {
  logoIn: 500,
  textIn: 700,
  photoReveal: 900,
  loading: 1100,
  accessGranted: 350,
  finalWelcome: 200
};

const loadingLines = [
  'Initializing Portfolio...',
  'Loading Investigations...',
  'Loading Reports...',
  'Loading Certifications...',
  'Loading Experience...'
];

function IntroOverlay({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [showAccessGranted, setShowAccessGranted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (shouldReduceMotion) {
      setStep(4);
      setProgress(100);
      setShowAccessGranted(true);
      setShowWelcome(true);

      const reduceMotionTimer = window.setTimeout(() => {
        setShowWelcome(false);
        onComplete();
      }, 1200);

      return () => {
        document.body.style.overflow = previousOverflow;
        window.clearTimeout(reduceMotionTimer);
      };
    }

    // sequence orchestration
    const t1 = window.setTimeout(() => setStep(1), STEP.logoIn);
    const t2 = window.setTimeout(() => setStep(2), STEP.logoIn + STEP.textIn);
    const t3 = window.setTimeout(() => setStep(3), STEP.logoIn + STEP.textIn + STEP.photoReveal);
    const t4 = window.setTimeout(() => setStep(4), STEP.logoIn + STEP.textIn + STEP.photoReveal + STEP.loading / 4);

    let progressTimer: number | null = window.setInterval(() => {
      setProgress((p) => Math.min(100, p + Math.random() * 8 + 2));
    }, 120);

    const lineTimers = loadingLines.map((_, i) =>
      window.setTimeout(() => setLineIndex(i), STEP.logoIn + STEP.textIn + STEP.photoReveal + i * (STEP.loading / loadingLines.length))
    );

    const tAccess = window.setTimeout(() => setShowAccessGranted(true), STEP.logoIn + STEP.textIn + STEP.photoReveal + STEP.loading);

    let completeTimer: number | null = null;
    const tFinal = window.setTimeout(() => {
      setShowWelcome(true);
      completeTimer = window.setTimeout(() => {
        if (progressTimer) window.clearInterval(progressTimer);
        setShowWelcome(false);
        onComplete();
      }, STEP.finalWelcome);
    }, STEP.logoIn + STEP.textIn + STEP.photoReveal + STEP.loading + STEP.accessGranted);

    return () => {
      if (completeTimer) window.clearTimeout(completeTimer);
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
      window.clearTimeout(tAccess);
      window.clearTimeout(tFinal);
      if (progressTimer) window.clearInterval(progressTimer);
      lineTimers.forEach((id) => window.clearTimeout(id));
    };
  }, [onComplete, shouldReduceMotion]);

  const particlePositions = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        top: `${8 + ((index * 13) % 84)}%`,
        left: `${6 + ((index * 17) % 88)}%`,
        size: 2 + (index % 3),
        duration: 5 + (index % 5)
      })),
    []
  );

  return (
    <motion.div
      className="fixed inset-0 z-[100] overflow-hidden bg-[#020817]/95 backdrop-blur-xl"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      aria-label="Cybersecurity intro"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(30,144,255,0.16),transparent_30%),linear-gradient(180deg,rgba(2,8,23,0.95),rgba(2,8,23,0.98))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,144,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(30,144,255,0.08)_1px,transparent_1px)] bg-[size:46px_46px] opacity-15" />

      {particlePositions.map((particle, index) => (
        <motion.span
          key={`${particle.top}-${particle.left}-${index}`}
          className="absolute rounded-full bg-cyan-300/40"
          style={{
            top: particle.top,
            left: particle.left,
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
          animate={{
            opacity: [0.12, 0.7, 0.12],
            y: [0, -8, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 0.12
          }}
        />
      ))}

      <div className="relative flex min-h-screen items-center justify-center px-4">
        <motion.div
          className="w-full max-w-2xl rounded-[2rem] border border-cyan-400/15 bg-slate-950/45 p-6 shadow-neon backdrop-blur-2xl sm:p-8"
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="flex flex-col items-center text-center">
            {/* Logo */}
            <motion.div
              className="grid h-20 w-20 place-items-center rounded-[1.75rem] border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 shadow-[0_0_40px_rgba(30,144,255,0.25)] sm:h-24 sm:w-24"
              initial={{ opacity: 0, scale: 0.84 }}
              animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <Icon name="shield" className="h-10 w-10 sm:h-12 sm:w-12" />
            </motion.div>

            {/* Primary text */}
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
            >
              <p className="font-logo text-3xl text-white sm:text-4xl">VINAYAK CHAUHAN</p>
              <p className="font-dashboard mt-3 text-sm uppercase tracking-[0.32em] text-cyan-300 sm:text-base">Cybersecurity Portfolio</p>
              <p className="font-body mt-4 text-sm leading-7 text-slate-300 sm:text-base">Learning in Public • Building Practical Skills</p>
            </motion.div>

            {/* Photo reveal + profile details (step 3) */}
            {step >= 3 ? (
              <motion.div
                className="mt-8 flex items-center gap-5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
                <div className="relative flex-shrink-0">
                  <div className="relative h-28 w-28 overflow-hidden rounded-full border border-white/8 bg-white/5">
                    {/* expects /profile.jpg in public; optimized via next/image */}
                    <Image src="/profile.svg" alt="Vinayak Chauhan" width={112} height={112} className="h-full w-full object-cover" priority={true} />
                  </div>
                  <div className="absolute inset-0 rounded-full ring-2 ring-cyan-400/20 pointer-events-none" />
                </div>

                <div className="text-left">
                  <div className="font-section text-lg text-white">VINAYAK CHAUHAN</div>
                  <div className="text-sm text-slate-300">Cybersecurity Student · BCA Cyber Security & Digital Forensics</div>
                  <div className="mt-2 text-sm text-slate-300">
                    <ul className="list-inside list-disc">
                      <li>Blue Team Operations</li>
                      <li>Threat Detection</li>
                      <li>Digital Forensics</li>
                      <li>Security Operations</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            ) : null}

            {/* Loading block */}
            {step >= 4 ? (
              <div className="mt-7 w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/50 p-4 text-left">
                <p className="font-dashboard text-xs uppercase tracking-[0.28em] text-slate-400">Initializing</p>
                <motion.p
                  key={loadingLines[lineIndex]}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="font-body mt-2 min-h-6 text-sm text-slate-100"
                >
                  {loadingLines[lineIndex]}
                </motion.p>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-300 to-sky-200"
                    initial={{ width: '0%' }}
                    animate={{ width: `${Math.min(100, progress)}%` }}
                    transition={{ duration: 0.18, ease: 'linear' }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-slate-400">
                  <span>Loading...</span>
                  <span>{Math.min(100, Math.round(progress))}%</span>
                </div>
              </div>
            ) : null}

            <AnimatePresence mode="wait">
              {showAccessGranted ? (
                <motion.p
                  key="access-granted"
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="font-dashboard mt-6 text-base uppercase tracking-[0.32em] text-cyan-300 sm:text-lg"
                >
                  ACCESS GRANTED
                </motion.p>
              ) : null}
            </AnimatePresence>

            {showWelcome ? (
              <div className="mt-4 text-sm text-slate-200">Welcome, Visitor. Entering Security Operations Workspace...</div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function IntroGate({ children }: { children: ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const forceIntro = urlParams.get('intro') === '1' || window.localStorage.getItem(introForceKey) === 'true';

    if (forceIntro) {
      window.localStorage.removeItem(introForceKey);
      setShowIntro(true);
      return;
    }

    setShowIntro(true);
  }, []);

  return (
    <>
      {children}
      <AnimatePresence>
        {showIntro ? <IntroOverlay key="intro" onComplete={() => setShowIntro(false)} /> : null}
      </AnimatePresence>
    </>
  );
}
