import React from 'react';
import { X, Download, FileText, CheckCircle2, GraduationCap, Code, Briefcase, Mail, Phone, MapPin } from 'lucide-react';
import { personalInfo, educationData, skillsData, projectsData } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl my-8 rounded-3xl bg-[#0b101b] border border-white/[0.12] shadow-2xl shadow-cyan-950/60 overflow-hidden">
        {/* Top bar */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
            <FileText className="w-4 h-4" />
            <span>Curriculum Vitae • Sainath Kadam</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 text-xs font-mono flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Sheet */}
        <div className="p-6 sm:p-10 space-y-6 max-h-[80vh] overflow-y-auto font-sans bg-[#0c111d] text-slate-200">
          {/* Header */}
          <div className="border-b border-slate-800 pb-6">
            <h1 className="font-display text-3xl font-bold text-white tracking-tight">
              {personalInfo.name}
            </h1>
            <p className="text-cyan-400 font-medium text-sm mt-1">
              B.Tech Computer Science & Engineering Undergraduate | Future Software Engineer
            </p>

            <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                {personalInfo.email}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {personalInfo.location}
              </span>
              <span>github.com/sainath-kadam</span>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              Education
            </h2>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-white text-sm">{educationData.degree}</h3>
                <span className="text-xs font-mono text-cyan-300">{educationData.period}</span>
              </div>
              <p className="text-xs text-slate-400">{educationData.field} • {educationData.institution}</p>
              <p className="text-xs font-mono text-emerald-400 font-semibold">{educationData.grade}</p>
              <div className="pt-2 text-xs text-slate-300">
                <span className="font-semibold text-slate-400">Core Coursework: </span>
                DSA, Operating Systems, Database Management Systems (SQL), Computer Networks, OOP with C++ & Java.
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" />
              Selected Engineering Projects
            </h2>

            <div className="space-y-3">
              {projectsData.map((project) => (
                <div key={project.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white text-sm">{project.title}</h3>
                    <span className="text-[11px] font-mono text-slate-400">{project.category}</span>
                  </div>
                  <p className="text-xs text-slate-300">{project.problemSolved}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-1.5">
              <Code className="w-4 h-4" />
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="font-semibold text-slate-300 block mb-1">Languages:</span>
                <span className="text-slate-400 font-mono">C, C++, Java, Python, JavaScript (ES6+), SQL</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="font-semibold text-slate-300 block mb-1">Web & Tooling:</span>
                <span className="text-slate-400 font-mono">React, HTML5, CSS3, Tailwind CSS, Three.js, Git, GitHub, VS Code</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
