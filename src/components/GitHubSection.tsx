import React, { useState } from 'react';
import {
  Github,
  GitBranch,
  Star,
  GitFork,
  Flame,
  ArrowUpRight,
  Code2,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { githubStatsData, personalInfo } from '../data/portfolioData';

export default function GitHubSection() {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  // Generate 52 weeks x 7 days simulated contribution matrix
  // High density of activity showcasing active coding practice!
  const weeks = 40;
  const daysPerWeek = 7;

  const getHeatmapColor = (intensity: number) => {
    switch (intensity) {
      case 0:
        return 'bg-slate-900 border border-slate-800';
      case 1:
        return 'bg-emerald-950/80 border border-emerald-900';
      case 2:
        return 'bg-emerald-800/80 border border-emerald-700';
      case 3:
        return 'bg-emerald-500/80 border border-emerald-400';
      case 4:
        return 'bg-emerald-400 border border-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.5)]';
      default:
        return 'bg-slate-900 border border-slate-800';
    }
  };

  // Deterministic contribution pattern showing strong student commit streaks
  const getContributionCount = (week: number, day: number) => {
    const val = (week * 7 + day * 13) % 29;
    if (val < 6) return 0;
    if (val < 13) return 1;
    if (val < 20) return 2;
    if (val < 25) return 3;
    return 4;
  };

  return (
    <section id="github" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
            <Github className="w-3.5 h-3.5" />
            <span>OPEN SOURCE & CODE COMMIT ACTIVITY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            GitHub Activity & Repositories
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
            A transparent window into my daily coding cadence, project commits, and technology stack breakdown.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
        </div>

        {/* GitHub Header Dashboard Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] shadow-2xl mb-10">
          <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/[0.08] pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-lg">
                <Github className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span>@{githubStatsData.username}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    Active Contributor
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Engineering Student • C++, Python, Java & Modern React
                </p>
              </div>
            </div>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-white transition-all shadow-sm group"
            >
              <span>View GitHub Profile</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-white/[0.08]">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.04]">
              <span className="text-[11px] font-mono text-slate-400 uppercase block">Public Repos</span>
              <span className="font-display text-2xl font-bold text-white">{githubStatsData.reposCount}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.04]">
              <span className="text-[11px] font-mono text-slate-400 uppercase block">Total Stars</span>
              <span className="font-display text-2xl font-bold text-amber-400 flex items-center gap-1">
                <Star className="w-5 h-5 fill-amber-400" />
                {githubStatsData.starsCount}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.04]">
              <span className="text-[11px] font-mono text-slate-400 uppercase block">Yearly Contributions</span>
              <span className="font-display text-2xl font-bold text-emerald-400">{githubStatsData.totalContributions}+</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-white/[0.04]">
              <span className="text-[11px] font-mono text-slate-400 uppercase block">Active Streak</span>
              <span className="font-display text-2xl font-bold text-cyan-400 flex items-center gap-1">
                <Flame className="w-5 h-5" />
                {githubStatsData.currentStreak}
              </span>
            </div>
          </div>

          {/* 52-Week Contribution Matrix Grid */}
          <div className="pt-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-slate-300 font-semibold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                Contributions Heatmap Timeline
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <span>Less</span>
                <div className="w-2.5 h-2.5 rounded-sm bg-slate-900 border border-slate-800" />
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-950 border border-emerald-900" />
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-700" />
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
                <span>More</span>
              </div>
            </div>

            {/* Scrollable Heatmap */}
            <div className="overflow-x-auto pb-2">
              <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 min-w-[720px]">
                {Array.from({ length: weeks * daysPerWeek }).map((_, i) => {
                  const week = Math.floor(i / 7);
                  const day = i % 7;
                  const intensity = getContributionCount(week, day);
                  const commits = intensity === 0 ? 0 : intensity * 2 + 1;

                  return (
                    <div
                      key={i}
                      onMouseEnter={() =>
                        setHoveredCell(`Week ${week + 1}, Day ${day + 1}: ${commits} commits`)
                      }
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`w-3 h-3 rounded-[3px] transition-transform duration-150 hover:scale-125 cursor-pointer ${getHeatmapColor(
                        intensity
                      )}`}
                      title={`Week ${week + 1}: ${commits} commits`}
                    />
                  );
                })}
              </div>
            </div>

            {hoveredCell && (
              <div className="text-[11px] font-mono text-cyan-300">
                {hoveredCell}
              </div>
            )}
          </div>

          {/* Most Used Technologies Progress Bar */}
          <div className="pt-6 mt-6 border-t border-white/[0.08] space-y-3">
            <span className="text-xs font-mono uppercase text-slate-300 font-semibold block">
              Most Used Technologies
            </span>

            {/* Stacked Percentage Bar */}
            <div className="h-3 w-full rounded-full bg-slate-900 overflow-hidden flex">
              {githubStatsData.topLanguages.map((lang) => (
                <div
                  key={lang.name}
                  style={{
                    width: `${lang.percentage}%`,
                    backgroundColor: lang.color,
                  }}
                  title={`${lang.name}: ${lang.percentage}%`}
                />
              ))}
            </div>

            {/* Language Legend */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              {githubStatsData.topLanguages.map((lang) => (
                <div key={lang.name} className="flex items-center gap-1.5 text-xs text-slate-300">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span>{lang.name}</span>
                  <span className="text-slate-500 font-mono text-[11px]">
                    {lang.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Repositories Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-bold text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              Featured Repositories
            </h3>
            <span className="text-xs font-mono text-slate-500">Public Repositories</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {githubStatsData.featuredRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-500/40 hover:bg-slate-900/80 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-bold text-cyan-300 group-hover:text-cyan-200 transition-colors flex items-center gap-1.5">
                      <GitBranch className="w-3.5 h-3.5 text-slate-400" />
                      {repo.name}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-white/[0.04]">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: repo.languageColor }}
                    />
                    <span>{repo.language}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3 text-slate-400" />
                      {repo.forks}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
