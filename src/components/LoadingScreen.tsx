import React, { useEffect, useState } from 'react';
import { Terminal, Cpu, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing 3D WebGL Matrix...');

  useEffect(() => {
    const steps = [
      { p: 25, text: 'Compiling Three.js Shaders & Workspace...' },
      { p: 55, text: 'Loading CSE Knowledge Graphs & Neural Chip...' },
      { p: 85, text: 'Mounting Interactive 3D Developer Desk...' },
      { p: 100, text: 'System Ready • Welcome' },
    ];

    let currentStep = 0;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }

        if (steps[currentStep] && next >= steps[currentStep].p) {
          setStatusText(steps[currentStep].text);
          currentStep++;
        }

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07090e] text-white select-none">
      <div className="w-full max-w-md px-6 space-y-6 text-center">
        {/* Futuristic Icon Ring */}
        <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
          <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Terminal className="w-7 h-7 text-cyan-400" />
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="font-display text-xl font-bold tracking-wider uppercase text-white">
            Sainath Kadam
          </h2>
          <p className="text-xs font-mono text-cyan-400">
            B.Tech Computer Science Engineering • 3D Portfolio
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full h-1.5 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono text-slate-500">
            <span className="truncate pr-2">{statusText}</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
