'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

const mapNodes = [
  { top: '18%', left: '14%', delay: 0.1 },
  { top: '28%', left: '26%', delay: 0.25 },
  { top: '22%', left: '40%', delay: 0.18 },
  { top: '30%', left: '56%', delay: 0.34 },
  { top: '24%', left: '72%', delay: 0.22 },
  { top: '43%', left: '20%', delay: 0.3 },
  { top: '49%', left: '37%', delay: 0.42 },
  { top: '46%', left: '55%', delay: 0.36 },
  { top: '52%', left: '75%', delay: 0.48 }
];

export function SiteBackdrop() {
  const shouldReduceMotion = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, index) => ({
        top: `${10 + ((index * 11) % 78)}%`,
        left: `${5 + ((index * 19) % 90)}%`,
        size: 2 + (index % 2),
        duration: 5.5 + (index % 5)
      })),
    []
  );

  const particleAnimation = shouldReduceMotion
    ? undefined
    : {
        opacity: [0.15, 0.65, 0.15],
        y: [0, -10, 0],
        scale: [1, 1.2, 1]
      };

  const nodeAnimation = shouldReduceMotion
    ? undefined
    : {
        scale: [0.9, 1.1, 0.9],
        opacity: [0.25, 0.8, 0.25]
      };

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(30,144,255,0.16),transparent_28%),radial-gradient(circle_at_18%_78%,rgba(14,165,233,0.1),transparent_20%),linear-gradient(180deg,rgba(2,8,23,0.84),rgba(2,8,23,0.95))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,144,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(30,144,255,0.07)_1px,transparent_1px)] bg-[size:52px_52px] opacity-28" />

      {particles.map((particle, index) => (
        <motion.span
          key={`${particle.top}-${particle.left}-${index}`}
          className="absolute rounded-full bg-cyan-300/35"
          style={{
            top: particle.top,
            left: particle.left,
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
          animate={particleAnimation}
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.14
                }
          }
        />
      ))}

      <svg
        viewBox="0 0 1200 700"
        className="absolute left-1/2 top-1/2 h-[86vh] w-[118vw] -translate-x-1/2 -translate-y-1/2 opacity-72 drop-shadow-[0_0_22px_rgba(30,144,255,0.2)]"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="siteMapGlow" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#1E90FF" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#67E8F9" stopOpacity="0.08" />
          </linearGradient>
          <filter id="siteMapBlur">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>
        <g
          fill="url(#siteMapGlow)"
          fillOpacity="0.5"
          stroke="#67e8f9"
          strokeOpacity="0.18"
          strokeWidth="1.1"
          strokeLinejoin="round"
          filter="url(#siteMapBlur)"
        >
          <path d="M92,169 l73,-25 56,13 39,44 55,14 18,27 -20,34 28,43 -20,35 -70,6 -40,-19 -26,18 -60,-12 -39,-43 -63,-18 -18,-32 15,-29 33,-20 19,-36z" />
          <path d="M397,154 l89,-16 53,22 22,30 -18,37 17,30 -26,43 -70,12 -52,-23 -41,13 -38,-18 -8,-43 25,-32 37,-11z" />
          <path d="M707,145 l95,-13 56,19 45,41 -20,37 19,43 -25,32 -64,13 -58,-21 -41,14 -35,-14 6,-46 21,-28 41,-18z" />
          <path d="M983,186 l61,-18 48,17 42,39 -10,31 -31,17 -56,11 -43,-15 -24,-30 13,-39z" />
          <path d="M111,383 l63,-12 53,17 31,34 -14,27 20,36 -15,35 -57,10 -50,-20 -49,18 -18,-31 12,-39 26,-16 10,-34z" />
          <path d="M366,382 l80,-14 59,14 35,33 -10,31 18,33 -18,31 -69,13 -62,-17 -38,8 -38,-18 -6,-37 17,-31 32,-12 20,-34z" />
          <path d="M664,386 l95,-18 57,18 39,35 -14,35 18,34 -25,28 -63,13 -58,-20 -36,9 -35,-16 -6,-39 20,-28 34,-11 14,-20z" />
          <path d="M965,387 l73,-13 51,16 33,36 -11,28 -25,16 -57,8 -45,-16 -20,-29 10,-34z" />
        </g>
      </svg>

      {mapNodes.map((node, index) => (
        <motion.span
          key={`${node.top}-${node.left}-${index}`}
          className="absolute h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(103,232,249,0.8)]"
          style={{ top: node.top, left: node.left }}
          animate={nodeAnimation}
          transition={
            shouldReduceMotion
              ? undefined
              : { duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: node.delay }
          }
        />
      ))}
    </div>
  );
}
