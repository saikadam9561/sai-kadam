import React, { useState } from 'react';
import { X, ExternalLink, Github, CheckCircle, Smartphone, Database, Zap, Shield, Sparkles } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  // Interactive mini simulation states based on project
  const [tokenNumber, setTokenNumber] = useState<number | null>(null);
  const [farmerName, setFarmerName] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('Soybean');
  const [queueStatus, setQueueStatus] = useState<string | null>(null);

  // Weather simulation
  const [weatherCity, setWeatherCity] = useState('Mumbai');
  const [weatherData, setWeatherData] = useState<{ temp: number; desc: string; humidity: number; aqi: number }>({
    temp: 29,
    desc: 'Partly Sunny & Coastal Breeze',
    humidity: 68,
    aqi: 45,
  });

  const handleBookToken = (e: React.FormEvent) => {
    e.preventDefault();
    const token = Math.floor(1000 + Math.random() * 9000);
    setTokenNumber(token);
    setQueueStatus('Confirmed: Token #' + token + ' • Estimated Wait: 25 mins • Window: Slot B (10:00 AM)');
  };

  const handleWeatherSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (weatherCity.toLowerCase().includes('delhi')) {
      setWeatherData({ temp: 32, desc: 'Hazy Sunshine', humidity: 42, aqi: 180 });
    } else if (weatherCity.toLowerCase().includes('pune') || weatherCity.toLowerCase().includes('maha')) {
      setWeatherData({ temp: 27, desc: 'Pleasant Winds', humidity: 55, aqi: 38 });
    } else {
      setWeatherData({ temp: 26 + Math.floor(Math.random() * 8), desc: 'Clear Skies & Optimal Sun', humidity: 50 + Math.floor(Math.random() * 20), aqi: 40 + Math.floor(Math.random() * 30) });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl my-8 rounded-3xl bg-[#0b101b] border border-white/[0.1] shadow-2xl shadow-cyan-950/50 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: project.accentColor }}
            />
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              {project.category} • Project Blueprint
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Header & Tagline */}
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-cyan-300 font-medium">
              {project.tagline}
            </p>
          </div>

          {/* Problem Solved Callout */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20">
            <div className="text-xs font-mono text-cyan-400 uppercase font-semibold mb-1 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Problem Solved
            </div>
            <p className="text-sm text-slate-200">
              {project.problemSolved}
            </p>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Architecture & Overview
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Interactive In-Modal Simulation Widget */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono uppercase text-slate-300 font-semibold">
                  Live Functional Simulation Preview
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                Interactive
              </span>
            </div>

            {project.id === 'smart-farmer' && (
              <div className="space-y-4 text-xs">
                <p className="text-slate-400">
                  Simulate digital queue booking for an APMC procurement center:
                </p>
                <form onSubmit={handleBookToken} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Farmer Name (e.g., Ramesh P.)"
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                  <select
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option>Soybean (Grade A)</option>
                    <option>Cotton (Long Staple)</option>
                    <option>Wheat (Sharbati)</option>
                    <option>Gram / Chickpea</option>
                  </select>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition-colors shadow-sm"
                  >
                    Generate Digital Token
                  </button>
                </form>

                {queueStatus && (
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-xs flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>{queueStatus}</span>
                  </div>
                )}
              </div>
            )}

            {project.id === 'weather-app' && (
              <div className="space-y-4 text-xs">
                <p className="text-slate-400">
                  Simulate live micro-climate meteorological telemetry lookup:
                </p>
                <form onSubmit={handleWeatherSearch} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter city (e.g., Mumbai, Pune, Delhi)"
                    value={weatherCity}
                    onChange={(e) => setWeatherCity(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors"
                  >
                    Fetch Telemetry
                  </button>
                </form>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">TEMPERATURE</span>
                    <span className="text-lg font-bold text-white font-mono">{weatherData.temp}°C</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">ATMOSPHERE</span>
                    <span className="text-xs font-semibold text-cyan-300 line-clamp-1">{weatherData.desc}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">HUMIDITY</span>
                    <span className="text-lg font-bold text-white font-mono">{weatherData.humidity}%</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">AIR QUALITY (AQI)</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">{weatherData.aqi} Good</span>
                  </div>
                </div>
              </div>
            )}

            {project.id === 'student-portfolio' && (
              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  You are exploring this project in real-time! The portfolio renders with WebGL Three.js, procedural particles, mouse parallax, and responsive Tailwind UI.
                </p>
                <div className="p-3 rounded-lg bg-slate-900 font-mono text-[11px] text-cyan-300">
                  Performance: 60 FPS • Shader Overhead: Minimal • Memory: ~18MB
                </div>
              </div>
            )}

            {project.id === 'algo-visualizer' && (
              <div className="space-y-2 text-xs text-slate-300">
                <p>
                  Graph theory explorer supporting Dijkstra, A*, Breadth-First, and Depth-First algorithms on weighted grid spaces.
                </p>
                <div className="p-3 rounded-lg bg-slate-900 font-mono text-[11px] text-purple-300 flex items-center justify-between">
                  <span>Dijkstra Shortest Path: O(E + V log V)</span>
                  <span className="text-emerald-400">Guaranteed Optimal</span>
                </div>
              </div>
            )}
          </div>

          {/* Key Features List */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Key Features Implemented
            </h4>
            <div className="space-y-2">
              {project.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
              Technologies & Libraries
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-4 border-t border-white/[0.08] bg-slate-900/80 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono text-slate-400">
            {project.metrics && <span>Metric: {project.metrics}</span>}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>

            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/25 transition-all"
            >
              <span>Launch Demo</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
