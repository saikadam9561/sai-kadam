import React, { useState } from 'react';
import { Route, CheckCircle2, ChevronRight, Sparkles, Terminal, Code2, ArrowDown } from 'lucide-react';
import { journeyData } from '../data/portfolioData';

export default function Journey() {
  const [activeStep, setActiveStep] = useState<number>(7);

  return (
    <section id="journey" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
            <Route className="w-3.5 h-3.5" />
            <span>PROGRESSION MAP</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Learning Journey & Growth
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
            From low-level computational foundations to architectural full-stack systems engineering. An intentional, structured path of growth.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
        </div>

        {/* Timeline Flow */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 opacity-40 pointer-events-none" />

          <div className="space-y-8 sm:space-y-12">
            {journeyData.map((item, index) => {
              const isEven = index % 2 === 0;
              const isSelected = activeStep === item.step;

              return (
                <div
                  key={item.step}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } group cursor-pointer`}
                  onClick={() => setActiveStep(item.step)}
                >
                  {/* Glowing Node in Center */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 ${
                        isSelected
                          ? 'bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.8)] scale-110'
                          : 'bg-slate-900 border-2 border-slate-700 text-slate-300 group-hover:border-cyan-400 group-hover:text-cyan-300'
                      }`}
                    >
                      {item.step}
                    </div>
                  </div>

                  {/* Card Container (Left or Right) */}
                  <div className="w-full sm:w-1/2 pl-14 sm:pl-0 sm:px-8">
                    <div
                      className={`glass-panel p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${
                        isSelected
                          ? 'border-cyan-400/80 bg-slate-900/90 shadow-[0_10px_30px_-10px_rgba(6,182,212,0.3)]'
                          : 'border-white/[0.08] hover:border-cyan-500/40 hover:bg-slate-900/60'
                      }`}
                    >
                      {/* Step Period & Status */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                          Phase 0{item.step} • {item.period}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                            item.status === 'in-progress'
                              ? 'bg-purple-950/60 text-purple-300 border border-purple-500/30'
                              : 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                          }`}
                        >
                          {item.status === 'in-progress' ? 'Active Focus' : 'Mastered'}
                        </span>
                      </div>

                      {/* Step Title */}
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                        {item.description}
                      </p>

                      {/* Milestones */}
                      <div className="space-y-1.5 pt-2 border-t border-white/[0.05]">
                        {item.keyMilestones.map((milestone, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{milestone}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-1.5 mt-3 pt-2">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
