'use client';

import { useEffect, useState } from 'react';
import { siteContent } from '@/data/site';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Investigations' },
  { id: 'journey', label: 'Journey' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'journal', label: 'Journal' },
  { id: 'contact', label: 'Contact' }
] as const;

export function FloatingNav() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          const current = visible.reduce((latest, entry) => {
            if (!latest) return entry;
            return entry.intersectionRatio > latest.intersectionRatio ? entry : latest;
          }, visible[0]);

          if (current?.target instanceof HTMLElement) {
            setActive(current.target.id || 'home');
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0.1, 0.5, 0.9] }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Section navigation" className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="space-y-3 rounded-[2rem] border border-white/10 bg-slate-950/90 p-3 shadow-neon backdrop-blur-xl">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xs uppercase tracking-[0.24em] transition duration-200 ${
              active === section.id ? 'border border-cyan-400/35 bg-cyan-400/15 text-white shadow-[0_0_20px_rgba(30,144,255,0.18)]' : 'text-slate-400 hover:border hover:border-white/10 hover:bg-slate-900/80 hover:text-white'
            }`}
            aria-label={`Go to ${section.label}`}
          >
            {section.label.slice(0, 2)}
          </button>
        ))}
      </div>
    </nav>
  );
}
