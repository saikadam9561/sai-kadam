import React, { useState } from 'react';
import { Trophy, Terminal, Globe, BookOpen, Rocket, Award, Edit3, Plus, Check, X, Sparkles } from 'lucide-react';
import { achievementsData as initialAchievements } from '../data/portfolioData';
import { Achievement } from '../types';

export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [isEditing, setIsEditing] = useState(false);
  const [editingCard, setEditingCard] = useState<Achievement | null>(null);

  const iconMap: Record<string, React.ReactNode> = {
    Trophy: <Trophy className="w-6 h-6 text-amber-400" />,
    Terminal: <Terminal className="w-6 h-6 text-emerald-400" />,
    Globe: <Globe className="w-6 h-6 text-cyan-400" />,
    BookOpen: <BookOpen className="w-6 h-6 text-blue-400" />,
    Rocket: <Rocket className="w-6 h-6 text-purple-400" />,
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCard) return;

    setAchievements((prev) =>
      prev.map((item) => (item.id === editingCard.id ? editingCard : item))
    );
    setEditingCard(null);
  };

  return (
    <section id="achievements" className="relative py-24 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-mono text-cyan-300">
            <Award className="w-3.5 h-3.5" />
            <span>MILESTONES & RECOGNITION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Key Achievements
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
            Demonstrated competencies spanning competitive coding, practical software delivery, and core theoretical rigor.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
        </div>

        {/* Quick Edit Mode Toggle */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
              isEditing
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Done Customizing' : 'Customize Cards'}</span>
          </button>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item) => (
            <div
              key={item.id}
              className="group relative p-6 rounded-3xl glass-panel border border-white/[0.08] hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-950/20 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="space-y-4">
                {/* Top Row: Icon + Badge */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    {iconMap[item.icon] || <Trophy className="w-6 h-6 text-cyan-400" />}
                  </div>

                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900/80 border border-white/[0.06] text-slate-300">
                    {item.badge}
                  </span>
                </div>

                {/* Metric Callout */}
                <div className="pt-2">
                  <span className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {item.metric}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-slate-200 mt-1">
                    {item.title}
                  </h3>
                  <div className="text-xs font-mono text-cyan-400/90">
                    {item.subtitle}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Edit button in edit mode */}
              {isEditing && (
                <div className="mt-4 pt-3 border-t border-white/[0.08] flex justify-end">
                  <button
                    onClick={() => setEditingCard(item)}
                    className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Content</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editingCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-950 border border-slate-800 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <h4 className="font-display text-lg font-bold text-white">
                Customize Achievement Card
              </h4>
              <button
                onClick={() => setEditingCard(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  value={editingCard.title}
                  onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Key Metric</label>
                <input
                  type="text"
                  value={editingCard.metric}
                  onChange={(e) => setEditingCard({ ...editingCard, metric: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Badge Tag</label>
                <input
                  type="text"
                  value={editingCard.badge}
                  onChange={(e) => setEditingCard({ ...editingCard, badge: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingCard.description}
                  onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingCard(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
