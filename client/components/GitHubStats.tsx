'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Icon } from './Icons';
import { siteContent } from '@/data/site';

type GitHubProfile = {
  login: string;
  name?: string;
  public_repos: number;
  followers: number;
  html_url: string;
  avatar_url?: string;
};

type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
};

export function GitHubStats() {
  const username = siteContent.githubUsername;
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [contributions, setContributions] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      try {
        const [profileRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`),
          fetch(`https://api.github.com/users/${username}/events/public?per_page=100`)
        ]);

        if (!profileRes.ok || !reposRes.ok || !eventsRes.ok) {
          throw new Error('GitHub API request failed');
        }

        const profileData = (await profileRes.json()) as GitHubProfile;
        const reposData = (await reposRes.json()) as GitHubRepo[];
        const eventsData = (await eventsRes.json()) as Array<{ type: string }>;
        const recentContributions = eventsData.filter((event) => event.type === 'PushEvent' || event.type === 'PullRequestEvent').length;

        if (active) {
          setProfile(profileData);
          setRepos(reposData);
          setContributions(recentContributions);
        }
      } catch (err) {
        if (active) {
          setError('GitHub data unavailable. Try again later.');
        }
      }
    };

    loadData();

    return () => {
      active = false;
    };
  }, [username]);

  const stats = useMemo(
    () => [
      { label: 'Public Repositories', value: profile?.public_repos ?? '—' },
      { label: 'Recent Contributions', value: contributions !== null ? contributions : '—' },
      { label: 'Followers', value: profile?.followers ?? '—' },
      { label: 'Projects', value: repos.length ?? '—' }
    ],
    [profile, contributions, repos.length]
  );

  return (
    <section id="github" className="mx-auto max-w-[1800px] px-4 pt-16 sm:px-6 lg:px-8 xl:px-12 lg:pt-20">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="max-w-3xl">
          <p className="font-dashboard text-xs uppercase tracking-[0.32em] text-cyan-300">GitHub Insights</p>
          <h2 className="font-section mt-3 text-3xl text-white sm:text-4xl">Live activity from GitHub</h2>
          <p className="font-body mt-4 max-w-3xl leading-8 text-slate-300">
            Recruiters can review the latest repositories, contribution momentum, and active security investigation work.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {stats.map((item) => (
            <motion.div
              key={item.label}
              className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 shadow-neon"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <p className="font-dashboard text-xs uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
              <p className="font-metric mt-4 text-3xl text-white">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {error ? (
          <div className="rounded-[1.75rem] border border-rose-400/20 bg-rose-400/10 p-6 text-slate-100">
            <p className="font-dashboard text-sm text-rose-200">{error}</p>
          </div>
        ) : (
          repos.map((repo) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 shadow-neon transition duration-200 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-slate-900/90"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-section text-lg text-white">{repo.name}</p>
                  <p className="font-body mt-2 text-sm leading-6 text-slate-400">{repo.description ?? 'No description available.'}</p>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-300">
                  <Icon name="github" className="h-5 w-5" />
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
                <span>{repo.language ?? 'Unknown'}</span>
                <span>{repo.stargazers_count} stars</span>
              </div>
            </motion.a>
          ))
        )}
      </div>
    </section>
  );
}
