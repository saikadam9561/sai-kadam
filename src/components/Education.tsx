import React from 'react';
import { GraduationCap, BookOpen, Award, CheckCircle2, Calendar, MapPin, Sparkles } from 'lucide-react';
import { educationData } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Education
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
            Rigorous undergraduate studies in Computer Science Engineering, synthesizing theoretical fundamentals with practical software systems.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
        </div>

        {/* Futuristic Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Central Glowing Spine Line */}
          <div className="absolute top-0 bottom-0 left-8 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 opacity-60" />

          {/* Major Node: B.Tech CSE */}
          <div className="relative z-10 mb-12">
            {/* Center Glowing Node Icon */}
            <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 -top-3 w-10 h-10 rounded-full bg-[#07090e] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.6)]">
              <GraduationCap className="w-5 h-5 text-cyan-300" />
            </div>

            {/* Main Education Glass Card */}
            <div className="pl-16 sm:pl-0 sm:pt-10">
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] hover:border-cyan-500/40 transition-all duration-300 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* Degree & Institution */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.08] pb-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold block mb-1">
                      Undergraduate Degree
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                      {educationData.degree}
                    </h3>
                    <h4 className="text-lg font-medium text-slate-300 mt-1">
                      {educationData.field}
                    </h4>
                    <p className="text-sm text-slate-400 mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{educationData.institution}</span>
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end gap-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{educationData.period}</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-300">
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{educationData.grade}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="py-6 border-b border-white/[0.08]">
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {educationData.description}
                  </p>
                </div>

                {/* Relevant Coursework / Subjects */}
                <div className="pt-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-semibold">
                      Core Computer Science & Engineering Subjects
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {educationData.coreSubjects.map((subject, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-white/[0.04] text-xs sm:text-sm text-slate-300 hover:border-cyan-500/30 transition-colors"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span>{subject}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Academic & Technical Highlights */}
                <div className="pt-6 mt-6 border-t border-white/[0.08] space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                    Technical Learning & Campus Leadership
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    {educationData.keyHighlights.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
