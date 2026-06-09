'use client';

import { useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Icon } from './Icons';
import { siteContent } from '@/data/site';

type Cert = (typeof siteContent)['certifications'][number];

const certs = siteContent.certifications;
const railCerts = [...certs, ...certs];

function formatDate(value?: string) {
  return value ?? 'TBD';
}

function PanelFrame({
  eyebrow,
  title,
  summary,
  children,
  className = ''
}: {
  eyebrow: string;
  title: string;
  summary: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid h-full gap-10 lg:grid-cols-[1.1fr_0.9fr] ${className}`}>
      <div className="flex h-full flex-col justify-center lg:pr-10">
        <p className="font-dashboard text-xs uppercase tracking-[0.34em] text-cyan-300">{eyebrow}</p>
        <h3 className="font-section mt-4 max-w-xl text-4xl text-white sm:text-5xl">{title}</h3>
        <p className="font-body mt-5 max-w-2xl leading-8 text-slate-300">{summary}</p>
      </div>
      <div className="flex h-full items-center lg:pl-10">{children}</div>
    </div>
  );
}

function CredentialPanel({
  cert,
  onOpen,
  onPreview
}: {
  cert: Cert;
  onOpen: (cert: Cert) => void;
  onPreview: (image: string) => void;
}) {
  return (
    <PanelFrame eyebrow={cert.category} title={cert.title} summary={cert.summary}>
      <div className="grid w-full gap-6">
        <motion.button
          type="button"
          onClick={() => onOpen(cert)}
          whileHover={{ scale: 1.015, y: -2 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="credential-card group relative w-full overflow-hidden rounded-[1.6rem] border border-cyan-400/15 bg-slate-950/98 p-4 text-left shadow-[0_28px_90px_rgba(2,8,23,0.62)] backdrop-blur-xl transition-[transform,box-shadow,border-color] duration-300"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(14,165,233,0.14),transparent_24%),linear-gradient(180deg,rgba(2,6,23,0.12),rgba(2,6,23,0.55))]" />
          <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(30,144,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(30,144,255,0.1)_1px,transparent_1px)] [background-size:56px_56px]" />
          <div className="credential-scanline absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent opacity-0" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
            <div className="rounded-[1.35rem] border border-white/10 bg-slate-900/98 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div className="flex items-center justify-between gap-3">
                <span className="font-dashboard rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-cyan-200">
                  {cert.status}
                </span>
                <span className="font-dashboard text-[10px] uppercase tracking-[0.22em] text-slate-500">{cert.category}</span>
              </div>

              <div className="mt-4">
                <p className="font-section text-2xl text-white sm:text-3xl">{cert.title}</p>
                <div className="mt-3 space-y-2 text-sm uppercase tracking-[0.18em] text-slate-400">
                  <div>{cert.provider}</div>
                  <div>{formatDate(cert.date)}</div>
                </div>
              </div>

              <div className="mt-5 border-t border-white/8 pt-4">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Learning Path</div>
                <div className="mt-2 text-sm text-slate-200">{cert.learningPath ?? 'Foundations'}</div>
              </div>
            </div>

            <div className="flex min-h-[18rem] items-center justify-center rounded-[1.35rem] border border-white/10 bg-slate-900/98 p-4 lg:pl-8">
              <div
                role="button"
                tabIndex={0}
                onClick={(event) => {
                  event.stopPropagation();
                  onPreview(cert.image);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    event.stopPropagation();
                    onPreview(cert.image);
                  }
                }}
                className="group relative w-full cursor-zoom-in overflow-hidden rounded-[1.1rem] border border-white/12 bg-white p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_18px_45px_rgba(2,8,23,0.22)] outline-none transition-transform duration-300 hover:scale-[1.01] focus-visible:ring-2 focus-visible:ring-cyan-300/70"
              >
                <img src={cert.image} alt={`${cert.title} preview`} className="h-full w-full object-contain" loading="lazy" />
                <div className="pointer-events-none absolute inset-0 flex items-end justify-end rounded-[1.1rem] bg-gradient-to-t from-slate-950/40 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="rounded-full border border-white/15 bg-slate-950/70 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-100">
                    Click to expand
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.button>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-[1.4rem] border border-white/10 bg-slate-900/95 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Completion Date</div>
            <div className="mt-2 text-lg text-white">{formatDate(cert.date)}</div>
            <div className="mt-4 text-[11px] uppercase tracking-[0.2em] text-slate-500">Skills Gained</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {(cert.skills ?? []).map((skill) => (
                <span key={skill} className="rounded-full border border-cyan-400/15 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-white/10 bg-slate-900/95 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Learning Outcome</div>
            <p className="mt-3 leading-7 text-slate-300">{cert.summary}</p>
          </div>
        </div>
      </div>
    </PanelFrame>
  );
}

function LargePreviewOverlay({ image, onClose }: { image: string; onClose: () => void }) {
  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative z-10 flex w-full max-w-[1200px] items-center justify-center">
        <div className="relative w-full overflow-hidden rounded-[1.5rem] border border-cyan-400/15 bg-slate-900 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.7)]">
          <img src={image} alt="Expanded certificate preview" className="max-h-[86vh] w-full rounded-[1.15rem] object-contain" />
        </div>
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 text-white"
          aria-label="Close expanded preview"
        >
          <Icon name="close" />
        </button>
      </div>
    </div>,
    document.body
  );
}

export function CertificationsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeCert, setActiveCert] = useState<Cert | null>(null);
  const [largeImage, setLargeImage] = useState<string | null>(null);
  const [loopPaused, setLoopPaused] = useState(false);

  const stats = useMemo(
    () => [
      { label: 'Total Credentials', value: certs.length.toString(), note: 'Live portfolio' },
      {
        label: 'Learning Paths',
        value: certs.filter((cert) => cert.category === 'Learning Path' || cert.category === 'Course' || cert.category === 'Assessment').length.toString(),
        note: 'Foundations tracked'
      },
      { label: 'Challenges', value: certs.filter((cert) => cert.category === 'Competition' || cert.category === 'Hackathon').length.toString(), note: 'Applied practice' },
      { label: 'Recognition', value: certs.filter((cert) => cert.category === 'Recognition').length.toString(), note: 'Appreciation layer' }
    ],
    []
  );

  const progressBars = useMemo(
    () => [
      { label: 'Foundations', value: 100 },
      { label: 'Networking', value: 88 },
      { label: 'Security Fundamentals', value: 82 },
      { label: 'Practical Challenges', value: 72 },
      { label: 'Professional Development', value: 64 }
    ],
    []
  );

  return (
    <section ref={sectionRef} id="certifications" className="mx-auto max-w-[1800px] px-4 pt-8 sm:px-6 lg:px-8 xl:px-12 lg:pt-12">
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-4 top-0 h-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(30,144,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(30,144,255,0.1)_1px,transparent_1px)] [background-size:64px_64px]" />

        <div className="relative z-10 max-w-4xl">
          <p className="font-dashboard text-xs uppercase tracking-[0.34em] text-cyan-300">CYBER CREDENTIAL STORY</p>
          <h2 className="font-section mt-3 text-3xl text-white sm:text-4xl">A horizontal learning journey that loops continuously.</h2>
          <p className="font-body mt-3 max-w-3xl leading-8 text-slate-300">
            The rail moves at a steady medium pace on its own, and pauses whenever a certificate is hovered or focused.
          </p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl border border-cyan-400/10 bg-slate-950/92 p-4 shadow-[0_14px_45px_rgba(2,8,23,0.22)] backdrop-blur-md"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45 }}
            >
              <div className="font-section text-3xl text-white">{stat.value}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">{stat.label}</div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">{stat.note}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 rounded-[1.8rem] border border-cyan-400/10 bg-slate-950/92 p-4 shadow-[0_20px_60px_rgba(2,8,23,0.42)] backdrop-blur-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-dashboard text-[11px] uppercase tracking-[0.28em] text-cyan-300">Progress Visualization</p>
              <p className="mt-1 text-sm text-slate-300">Stage-by-stage growth across the journey</p>
            </div>
            <div className="font-tech text-xs uppercase tracking-[0.2em] text-slate-500">Medium-speed live rail</div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            {progressBars.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/8">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-sky-500" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative left-1/2 mt-6 w-screen -translate-x-1/2 overflow-hidden py-4">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_50%,rgba(56,189,248,0.07),transparent_28%),radial-gradient(circle_at_88%_50%,rgba(14,165,233,0.06),transparent_26%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(30,144,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(30,144,255,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#08111f] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#08111f] to-transparent" />

          <div
            onMouseEnter={() => setLoopPaused(true)}
            onMouseLeave={() => setLoopPaused(false)}
            onFocusCapture={() => setLoopPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setLoopPaused(false);
              }
            }}
          >
            <motion.div
              className="credential-loop-track flex w-max transform-gpu"
              style={
                shouldReduceMotion
                  ? undefined
                  : ({
                      animationPlayState: loopPaused ? 'paused' : 'running'
                    } as any)
              }
            >
              {railCerts.map((cert, index) => (
                <section key={`${cert.title}-${index}`} className="flex h-[40rem] w-screen shrink-0 items-center px-0 sm:px-0 lg:px-0 xl:px-0">
                  <div className="w-full">
                    <CredentialPanel cert={cert} onOpen={(item) => setActiveCert(item)} onPreview={(image) => setLargeImage(image)} />
                  </div>
                </section>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {activeCert ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm" onClick={() => setActiveCert(null)} />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative z-10 w-full max-w-5xl overflow-hidden rounded-[1.8rem] border border-cyan-400/20 bg-[#07111f]/95 shadow-[0_30px_100px_rgba(2,8,23,0.7)]"
          >
            <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(30,144,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(30,144,255,0.12)_1px,transparent_1px)] [background-size:56px_56px]" />
            <div className="relative z-10 grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[24rem] bg-slate-950 p-4 sm:p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.18),transparent_28%),radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.14),transparent_26%)]" />
                <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-3">
                  <img src={activeCert.image} alt={`${activeCert.title} certificate preview`} className="h-full max-h-[34rem] w-full rounded-[1.15rem] object-contain" />
                </div>
              </div>

              <div className="relative border-t border-white/8 bg-slate-950/70 p-5 sm:p-6 lg:border-l lg:border-t-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-dashboard text-xs uppercase tracking-[0.28em] text-cyan-300">Credential Detail</p>
                    <h3 className="font-section mt-3 text-2xl text-white sm:text-3xl">{activeCert.title}</h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveCert(null)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white"
                    aria-label="Close credential detail"
                  >
                    <Icon name="close" />
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Provider</div>
                      <div className="mt-2 text-sm text-white">{activeCert.provider}</div>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Completion Date</div>
                      <div className="mt-2 text-sm text-white">{formatDate(activeCert.date)}</div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Skills Gained</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(activeCert.skills ?? []).map((skill) => (
                        <span key={skill} className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/8 bg-white/4 p-4">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Learning Path</div>
                    <div className="mt-2 text-sm text-white">{activeCert.learningPath ?? 'Foundations'}</div>
                  </div>

                  <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/8 p-4">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-cyan-200">Verification Link</div>
                    <div className="mt-3">
                      <a
                        href={activeCert.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-button inline-flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-slate-950/50 px-4 py-2 text-sm text-cyan-100"
                      >
                        Open Verification
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
          onClick={() => {
            setActiveCert(null);
            setLargeImage(activeCert.image);
          }}
          className="absolute left-5 top-5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.2em] text-cyan-100"
        >
          Expand Preview
        </button>
      </motion.div>
    </div>
  ) : null}

      {largeImage ? <LargePreviewOverlay image={largeImage} onClose={() => setLargeImage(null)} /> : null}
    </section>
  );
}

