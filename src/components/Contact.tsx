import React, { useState } from 'react';
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Instagram,
  MapPin,
  CheckCircle,
  Copy,
  Check,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalInfo } from '../data/portfolioData';
import Globe3D from './3d/Globe3D';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate sending message
    setTimeout(() => {
      setStatus('success');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#818cf8', '#22d3ee', '#a855f7'],
      });
      setFormData({ name: '', email: '', message: '' });
    }, 800);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-24 scroll-mt-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>INITIATE TRANSMISSION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Let's Build Something Together.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl">
            Whether you have an internship opportunity, a project to collaborate on, or just want to discuss Computer Science and web engineering — my inbox is always open.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
        </div>

        {/* Content Layout: Left Form + Right 3D Globe & Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Form */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08] shadow-2xl relative">
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill in your details below and I'll get back to you promptly.
              </p>

              {status === 'success' ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-white">
                    Message Transmitted!
                  </h4>
                  <p className="text-xs text-slate-300">
                    Thank you for reaching out, your message has been received. I look forward to connecting with you!
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-3 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300 hover:text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-medium">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5 font-medium">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell me about your team, internship opening, project ideas, or questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-2 group active:scale-98 disabled:opacity-50"
                  >
                    {status === 'submitting' ? (
                      <span>Transmitting...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <span className="text-base group-hover:translate-x-1 transition-transform">🚀</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: 3D Animated Globe + Direct Contact Channels */}
          <div className="lg:col-span-6 space-y-6">
            {/* 3D Globe Card */}
            <div className="glass-panel p-4 rounded-3xl border border-white/[0.08] relative overflow-hidden flex flex-col items-center">
              <div className="w-full flex items-center justify-between px-3 pt-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Base: {personalInfo.location}
                </span>
                <span className="text-[10px] font-mono text-slate-500">AVAILABLE GLOBALLY</span>
              </div>

              {/* 3D Globe Element */}
              <Globe3D />
            </div>

            {/* Direct Contact Channels Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Email Card with Copy button */}
              <div
                onClick={copyEmail}
                className="p-4 rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-500/40 transition-all cursor-pointer group flex items-center justify-between"
                title="Click to copy email address"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 group-hover:border-cyan-500/30">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Email Address</span>
                    <span className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {personalInfo.email}
                    </span>
                  </div>
                </div>

                <div className="text-slate-400 group-hover:text-white transition-colors">
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </div>
              </div>

              {/* GitHub Card */}
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-500/40 transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 group-hover:text-white group-hover:border-cyan-500/30">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">GitHub</span>
                    <span className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                      @sainath-kadam
                    </span>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-mono">→</span>
              </a>

              {/* LinkedIn Card */}
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-500/40 transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-blue-400 group-hover:border-cyan-500/30">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">LinkedIn</span>
                    <span className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                      in/sainath-kadam
                    </span>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-mono">→</span>
              </a>

              {/* Instagram Card */}
              <a
                href={personalInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl glass-panel border border-white/[0.08] hover:border-cyan-500/40 transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-pink-400 group-hover:border-cyan-500/30">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase block">Instagram</span>
                    <span className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                      @sainath_kadam
                    </span>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-mono">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
