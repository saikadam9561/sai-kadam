import React from 'react';
import { GraduationCap, Terminal, Code2, Rocket, Cpu, CheckCircle2, Award, BookOpen } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import Chip3D from './3d/Chip3D';

export default function About() {
  const statIcons: Record<string, React.ReactNode> = {
    GraduationCap: <GraduationCap className="w-5 h-5 text-cyan-400" />,
    Terminal: <Terminal className="w-5 h-5 text-emerald-400" />,
    Code2: <Code2 className="w-5 h-5 text-blue-400" />,
    Rocket: <Rocket className="w-5 h-5 text-purple-400" />,
  };

  return (
    <section id="about" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
            <Cpu className="w-3.5 h-3.5" />
            <span>ACADEMIC & DEVELOPER PROFILE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Who Am I?
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & Core Stats */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.08] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

              <p className="text-lg sm:text-xl text-slate-200 font-medium leading-relaxed mb-6">
                "{personalInfo.aboutWhoAmI}"
              </p>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                As a computer science undergraduate, my core objective is bridging theoretical computation with tangible, high-impact software engineering. Whether designing efficient data structures in C++, building full-stack reactive applications, or deploying community tools for rural farmers, I approach every engineering challenge with curiosity, rigor, and craft.
              </p>

              {/* Core Strengths Bullet Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6 border-t border-white/[0.08]">
                <div className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Strong Algorithmic & DSA Core</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Modern Full-Stack Web Development</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Clean Systems & Code Organization</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Passionate Continuous Learner</span>
                </div>
              </div>
            </div>

            {/* 4 Animated Statistics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {personalInfo.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass-panel p-4 rounded-xl border border-white/[0.08] hover:border-cyan-500/40 hover:bg-slate-900/60 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                      {statIcons[stat.icon] || <Cpu className="w-5 h-5 text-cyan-400" />}
                    </div>
                  </div>

                  <div>
                    <div className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium text-slate-300 mt-0.5">
                      {stat.label}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono mt-1">
                      {stat.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Rotating Microchip Element */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm rounded-3xl p-4 glass-panel border border-white/[0.08] shadow-xl shadow-cyan-950/20">
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono text-cyan-300 font-semibold uppercase tracking-wider">
                    Core Compute Matrix
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">64-BIT SIM</span>
              </div>

              {/* 3D Chip Component */}
              <Chip3D />

              <div className="px-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Architecture: Silicon CSE</span>
                <span className="text-cyan-400">Interactive 3D</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
