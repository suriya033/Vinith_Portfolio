import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Code2,
  Library,
  BarChart3,
  Wrench,
  Sparkles,
  Terminal,
  Database,
  Cpu,
  Layers,
  GitBranch,
  Monitor
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { skills } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    { name: 'All', icon: Sparkles },
    { name: 'Programming', icon: Code2 },
    { name: 'Libraries & Frameworks', icon: Library },
    { name: 'Data Science', icon: BarChart3 },
    { name: 'Tools', icon: Wrench }
  ];

  // Helper icon selector based on skill name
  const getSkillIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('python')) return <Code2 className="w-5 h-5 text-yellow-400" />;
    if (n.includes('sql')) return <Database className="w-5 h-5 text-blue-400" />;
    if (n.includes('scikit') || n.includes('numpy') || n.includes('pandas')) return <Cpu className="w-5 h-5 text-cyan-400" />;
    if (n.includes('matplotlib') || n.includes('seaborn') || n.includes('visualization')) return <BarChart3 className="w-5 h-5 text-purple-400" />;
    if (n.includes('git')) return <GitBranch className="w-5 h-5 text-orange-400" />;
    if (n.includes('colab') || n.includes('jupyter') || n.includes('code')) return <Monitor className="w-5 h-5 text-emerald-400" />;
    return <Layers className="w-5 h-5 text-cyan-400" />;
  };

  const filteredSkills = activeCategory === 'All'
    ? skills.filter(s => s.visible !== false)
    : skills.filter(s => s.category === activeCategory && s.visible !== false);

  return (
    <section id="skills" className="py-24 relative bg-[#07090e]">
      {/* Background radial highlight */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL KNOWLEDGE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
            Technical <span className="text-gradient-cyan">Skills</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Categorized overview of technical competencies, data science libraries, programming languages, and developer tools.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-105'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <CatIcon className="w-4 h-4" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {filteredSkills.map((skill, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              key={skill.id || skill.name}
              className="glass-panel p-5 rounded-2xl border border-slate-800/80 glass-panel-hover group flex items-center gap-4 relative overflow-hidden"
            >
              {/* Subtle side accent glow */}
              <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Icon Container */}
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-cyan-500/40 group-hover:scale-110 transition-all shadow-md">
                {getSkillIcon(skill.name)}
              </div>

              {/* Info */}
              <div className="flex flex-col">
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </h3>
                <span className="text-[11px] font-mono text-slate-400 mt-0.5">
                  {skill.category}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
