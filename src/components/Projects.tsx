import React, { useState, useRef } from 'react';
import {
  ExternalLink,
  Github,
  FolderGit2,
  Sparkles,
  Zap,
  Layers,
  ArrowUpRight,
  Terminal,
  Activity,
  CloudSun,
  Laptop
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types';
import ProjectModal from './ProjectModal';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (p: Project) => void;
}

// Interactive 3D Tilt Card Component
const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenModal,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`
    );
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Preview graphics per project
  const renderCardVisual = () => {
    if (project.id === 'smart-farmer') {
      return (
        <div className="h-44 w-full bg-gradient-to-br from-emerald-950/50 via-slate-900 to-[#07090e] p-5 flex flex-col justify-between relative overflow-hidden border-b border-white/[0.06]">
          <div className="flex justify-between items-center z-10">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
              Live Queue • Token System
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <div className="space-y-1.5 z-10 font-mono text-xs">
            <div className="text-emerald-200 font-bold text-sm flex items-center gap-1.5">
              <span>Token #4829</span>
              <span className="text-[10px] text-emerald-400 bg-emerald-950 px-1.5 rounded">Active Slot</span>
            </div>
            <div className="text-slate-400 text-[11px]">
              Procurement Center: APMC Hub • Wait: 15 mins
            </div>
          </div>

          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        </div>
      );
    }

    if (project.id === 'weather-app') {
      return (
        <div className="h-44 w-full bg-gradient-to-br from-cyan-950/50 via-slate-900 to-[#07090e] p-5 flex flex-col justify-between relative overflow-hidden border-b border-white/[0.06]">
          <div className="flex justify-between items-center z-10">
            <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
              Meteorological Telemetry
            </span>
            <CloudSun className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>

          <div className="flex items-baseline gap-3 z-10 font-mono">
            <span className="text-3xl font-bold text-white">28°C</span>
            <div className="text-xs text-slate-300">
              <span className="text-cyan-300 font-semibold block">Clear Skies</span>
              <span className="text-slate-400 text-[10px]">AQI 38 • Optimal</span>
            </div>
          </div>

          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        </div>
      );
    }

    if (project.id === 'student-portfolio') {
      return (
        <div className="h-44 w-full bg-gradient-to-br from-indigo-950/50 via-slate-900 to-[#07090e] p-5 flex flex-col justify-between relative overflow-hidden border-b border-white/[0.06]">
          <div className="flex justify-between items-center z-10">
            <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-[11px] font-mono text-indigo-300">
              Three.js 3D Portfolio
            </span>
            <Laptop className="w-5 h-5 text-indigo-400" />
          </div>

          <div className="space-y-1 z-10 font-mono">
            <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <span className="text-cyan-400">WebGL</span>
              <span>• 60 FPS • 3D Desk</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Apple-minimal glassmorphic interface
            </div>
          </div>

          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        </div>
      );
    }

    return (
      <div className="h-44 w-full bg-gradient-to-br from-purple-950/50 via-slate-900 to-[#07090e] p-5 flex flex-col justify-between relative overflow-hidden border-b border-white/[0.06]">
        <div className="flex justify-between items-center z-10">
          <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-[11px] font-mono text-purple-300">
            Algorithmic Graph Theory
          </span>
          <Activity className="w-5 h-5 text-purple-400" />
        </div>

        <div className="space-y-1 z-10 font-mono">
          <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <span className="text-purple-400">Dijkstra & A*</span>
            <span>Pathfinding</span>
          </div>
          <div className="text-[11px] text-slate-400">
            2,500+ graph nodes animated real-time
          </div>
        </div>

        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>
    );
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-3xl glass-panel border border-white/[0.08] hover:border-cyan-500/50 shadow-xl transition-all duration-200 overflow-hidden flex flex-col justify-between"
      style={{
        transform: transformStyle,
        transition: isHovered ? 'transform 0.05s ease-out' : 'transform 0.5s ease-out',
        willChange: 'transform',
      }}
    >
      <div>
        {/* Project Visual / 3D Simulation Preview */}
        {renderCardVisual()}

        {/* Content Body */}
        <div className="p-6 space-y-4">
          {/* Title & Tagline */}
          <div>
            <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
              <span>{project.title}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                {project.category}
              </span>
            </h3>
            <p className="text-xs sm:text-sm text-cyan-300/90 font-medium mt-1">
              {project.tagline}
            </p>
          </div>

          {/* Problem Solved Highlight */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.05] text-xs">
            <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold mb-1 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Problem Solved:
            </div>
            <p className="text-slate-300 line-clamp-2">
              {project.problemSolved}
            </p>
          </div>

          {/* Short Description */}
          <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Technologies Used */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-[11px] font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-500">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Action Buttons */}
      <div className="p-6 pt-0 border-t border-white/[0.05] mt-4 flex items-center justify-between gap-3">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors"
        >
          <Github className="w-3.5 h-3.5" />
          <span>GitHub</span>
        </a>

        <button
          onClick={() => onOpenModal(project)}
          className="flex-1 py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition-colors shadow-sm"
        >
          <span>Live Demo</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PRODUCTION & ENGINEERING REPOSITORIES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
            Practical software engineered to solve tangible problems. Each project reflects end-to-end craftsmanship, algorithmic efficiency, and clean UX.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
        </div>

        {/* 3D Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Interactive Project Blueprint Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
