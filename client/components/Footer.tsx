'use client';

import { Icon } from './Icons';
import { siteContent } from '@/data/site';

export function Footer() {
  return (
    <footer id="contact" className="mx-auto max-w-[1800px] px-4 pb-16 pt-12 sm:px-6 lg:px-8 xl:px-12 lg:pb-20 lg:pt-16">
      <div className="border-t border-white/8 pt-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-dashboard text-sm uppercase tracking-[0.24em] text-slate-400">Quick Links</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {siteContent.footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-button rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition duration-200 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white hover:shadow-[0_0_24px_rgba(30,144,255,0.14)]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-dashboard text-sm uppercase tracking-[0.24em] text-slate-400">Social Links</p>
            <div className="mt-4 flex items-center gap-3">
              {siteContent.socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-slate-950/60 text-slate-100 transition duration-200 hover:-translate-y-1 hover:border-cyan-400/40 hover:text-cyan-300 hover:shadow-[0_0_24px_rgba(30,144,255,0.14)]"
                >
                  <Icon name={item.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 rounded-3xl border border-white/10 bg-slate-950/80 p-5 text-sm text-slate-300 sm:grid-cols-3">
          <div>
            <p className="font-dashboard text-xs uppercase tracking-[0.24em] text-slate-400">Email</p>
            <a href={`mailto:${siteContent.contact.email}`} className="mt-2 block text-sm text-cyan-200 hover:text-white">
              {siteContent.contact.email}
            </a>
          </div>
          <div>
            <p className="font-dashboard text-xs uppercase tracking-[0.24em] text-slate-400">Location</p>
            <p className="mt-2 text-sm text-slate-200">{siteContent.contact.location}</p>
          </div>
          <div>
            <p className="font-dashboard text-xs uppercase tracking-[0.24em] text-slate-400">Next Step</p>
            <p className="mt-2 text-sm text-slate-200">Reach out for internships, SOC roles, or investigative reporting.</p>
          </div>
        </div>

        <div className="font-body mt-8 border-t border-white/10 pt-5 text-sm text-slate-400">
          <p>
            {siteContent.brand}
          </p>
        </div>
      </div>
    </footer>
  );
}
