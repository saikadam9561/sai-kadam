import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Github, Linkedin, Instagram, Code2, Sparkles, Terminal, ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import HeroScene from './3d/HeroScene';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden"
    >
      {/* Background glow spotlights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Left Column: Personal Introduction & Identity */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/25 text-xs text-slate-300 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-cyan-300 font-medium">{personalInfo.availability}</span>
            </div>

            {/* Greeting */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg md:text-xl font-medium text-cyan-400 font-mono tracking-tight">
                  Hi, I'm Sainath Kadam 👋
                </span>
              </div>

              {/* Large Heading */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
                B.Tech CSE Student <br />
                <span className="text-gradient-cyan">Building the Future</span> <br />
                with Code.
              </h1>
            </div>

            {/* Dynamic Role Rotator */}
            <div className="flex items-center gap-2 font-mono text-sm sm:text-base text-slate-400">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-slate-500">role:</span>
              <span className="text-slate-200 font-semibold transition-all duration-300">
                {personalInfo.roles[roleIndex]}
              </span>
            </div>

            {/* Short Introduction */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed">
              {personalInfo.bioShort}
            </p>

            {/* Two Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 active:scale-95"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 hover:text-white transition-all duration-300 active:scale-95 backdrop-blur-md"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Secondary Links: GitHub | LinkedIn | Instagram */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center gap-5 text-sm">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
                Connect:
              </span>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
                title="Sainath Kadam GitHub"
              >
                <Github className="w-4 h-4" />
                <span className="font-medium text-xs">GitHub</span>
              </a>

              <span className="text-slate-700">•</span>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors"
                title="Sainath Kadam LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
                <span className="font-medium text-xs">LinkedIn</span>
              </a>

              <span className="text-slate-700">•</span>

              <a
                href={personalInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-400 hover:text-pink-400 transition-colors"
                title="Sainath Kadam Instagram"
              >
                <Instagram className="w-4 h-4" />
                <span className="font-medium text-xs">Instagram</span>
              </a>
            </div>
          </div>

          {/* Right Column: 3D Developer Workspace Scene */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              {/* Subtle back ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-blue-500/10 rounded-3xl blur-2xl -z-10" />

              {/* 3D Scene Wrapper */}
              <div className="relative rounded-3xl border border-white/[0.08] bg-slate-950/40 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden">
                <HeroScene />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => scrollToSection('about')}
            className="flex flex-col items-center gap-1 text-slate-500 hover:text-cyan-400 transition-colors text-xs font-mono"
            aria-label="Scroll to About section"
          >
            <span>DISCOVER</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
