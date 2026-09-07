import React, { useState } from 'react';
import {
  Terminal,
  Cpu,
  Coffee,
  FileCode2,
  Layout,
  Palette,
  Braces,
  Atom,
  GitBranch,
  Github,
  Database,
  Binary,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { skillsData } from '../data/portfolioData';
import { Skill } from '../types';
import SkillsSphere from './3d/SkillsSphere';

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);

  const categories = ['All', 'Languages', 'Web Tech', 'Tools & Core CS'];

  const filteredSkills = selectedCategory === 'All'
    ? skillsData
    : skillsData.filter((s) => s.category === selectedCategory);

  const iconMap: Record<string, React.ReactNode> = {
    Terminal: <Terminal className="w-5 h-5" />,
    Cpu: <Cpu className="w-5 h-5" />,
    Coffee: <Coffee className="w-5 h-5" />,
    FileCode2: <FileCode2 className="w-5 h-5" />,
    Layout: <Layout className="w-5 h-5" />,
    Palette: <Palette className="w-5 h-5" />,
    Braces: <Braces className="w-5 h-5" />,
    Atom: <Atom className="w-5 h-5" />,
    GitBranch: <GitBranch className="w-5 h-5" />,
    Github: <Github className="w-5 h-5" />,
    Database: <Database className="w-5 h-5" />,
    Binary: <Binary className="w-5 h-5" />,
  };

  return (
    <section id="skills" className="relative py-24 scroll-mt-20">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
            <Layers className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCIES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Skills & Tech Stack
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
            A comprehensive overview of programming languages, development frameworks, and systems engineering tools in my toolkit.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
        </div>

        {/* 3D Visual Constellation + Interactive Network Banner */}
        <div className="mb-14 p-4 sm:p-6 rounded-3xl glass-panel border border-white/[0.08] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left 3D Sphere */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md">
                <SkillsSphere
                  activeSkillId={activeSkillId}
                  onSelectSkill={(id) => {
                    setActiveSkillId(id);
                    const el = document.getElementById(`skill-card-${id}`);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                />
              </div>
            </div>

            {/* Right Sphere Explainer */}
            <div className="lg:col-span-7 space-y-4 text-left p-2 sm:p-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>INTERACTIVE 3D SKILL NETWORK</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                Interconnected Engineering Knowledge
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Computer Science is not just isolated languages — it is an interconnected ecosystem. Low-level systems programming in C and C++ sharpens algorithmic logic, which powers robust Java backend systems and optimizes high-performance React frontends.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                  • Systems: C, C++
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-blue-500/30 text-xs font-mono text-blue-300">
                  • Modern Web: React, JS, HTML, CSS
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-purple-500/30 text-xs font-mono text-purple-300">
                  • Backend & DB: Python, Java, SQL
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                  • DevOps: Git, GitHub, VS Code
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white border border-white/[0.05] hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Floating 3D Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredSkills.map((skill) => {
            const isSelected = activeSkillId === skill.id;

            return (
              <div
                key={skill.id}
                id={`skill-card-${skill.id}`}
                onMouseEnter={() => setActiveSkillId(skill.id)}
                className={`group relative p-5 rounded-2xl glass-panel border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isSelected
                    ? 'border-cyan-400/80 shadow-[0_0_25px_rgba(6,182,212,0.3)] bg-slate-900/90'
                    : 'border-white/[0.08] hover:border-cyan-500/50 hover:shadow-[0_10px_30px_-10px_rgba(6,182,212,0.2)]'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Background glow accent matching skill color */}
                <div
                  className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none"
                  style={{ backgroundColor: skill.color }}
                />

                <div className="flex items-center justify-between mb-4">
                  {/* Skill Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-md"
                    style={{
                      backgroundColor: `${skill.color}15`,
                      borderColor: `${skill.color}40`,
                      borderWidth: 1,
                      color: skill.color,
                    }}
                  >
                    {iconMap[skill.icon] || <Terminal className="w-5 h-5" />}
                  </div>

                  {/* Level Tag */}
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 group-hover:border-cyan-500/30 group-hover:text-cyan-300 transition-colors">
                    {skill.level}
                  </span>
                </div>

                {/* Skill Name */}
                <h4 className="font-display text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-1.5 flex items-center justify-between">
                  <span>{skill.name}</span>
                  <span className="text-xs font-mono text-slate-500 group-hover:text-slate-400">
                    {skill.projectsCount}+ projects
                  </span>
                </h4>

                {/* Short Description */}
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                  {skill.description}
                </p>

                {/* Bottom subtle bar */}
                <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>{skill.category}</span>
                  <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Active Node →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
