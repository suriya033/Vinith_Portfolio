import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { HeroCanvas } from './HeroCanvas';
import { GithubIcon } from './GithubIcon';
import { LinkedinIcon } from './LinkedinIcon';
import {
  ArrowRight,
  FileText,
  Mail,
  Sparkles,
  Terminal,
  Activity,
  Cpu,
  CheckCircle2
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { profile, resume } = usePortfolio();

  const handleScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[#07090e]">
      {/* Neural particle canvas */}
      <HeroCanvas />

      {/* Decorative gradient glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Headline & Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>AVAILABLE FOR ML OPPORTUNITIES</span>
          </motion.div>

          {/* Name & Title */}
          <div className="mb-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-heading">
              {profile.name || 'VINITH S'}
            </h1>
            <div className="text-xl sm:text-2xl font-bold tracking-wider text-cyan-400 font-mono mt-1 flex items-center gap-2">
              <Cpu className="w-6 h-6 text-cyan-400 animate-pulse" />
              <span>{profile.title || 'ML ENGINEER'}</span>
            </div>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-200 tracking-tight leading-snug mb-4">
            {profile.headline || 'Building Intelligent Systems with Machine Learning & AI'}
          </h2>

          {/* Supporting Text strictly from resume */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
            "{profile.summary || 'An aspiring Machine Learning Engineer with experience in machine learning algorithms, data preprocessing, feature engineering, model development, and evaluation.'}"
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => handleScroll('#projects')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={resume.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-cyan-300 bg-slate-900/80 border border-cyan-500/40 hover:bg-cyan-500/10 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all hover:scale-105 active:scale-95"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={() => handleScroll('#contact')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-slate-900/60 border border-slate-700/80 hover:border-slate-500 hover:text-white transition-all hover:scale-105 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-slate-400" />
              <span>Contact Me</span>
            </button>
          </div>

          {/* Secondary Social & Direct Contact Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80 w-full">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">Connect:</span>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <span className="text-slate-700">•</span>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <span className="text-slate-700">•</span>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-cyan-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Interactive Futuristic AI Visualizer & Code Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="lg:col-span-5 relative flex justify-center"
        >
          {/* Glowing Glass Container */}
          <div className="w-full max-w-md rounded-2xl glass-panel p-6 border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.2)] relative group hover:border-cyan-400/60 transition-all duration-500">
            {/* Header bar */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800 font-mono text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                <span className="ml-2 text-cyan-300 font-bold">vinith_ml_pipeline.py</span>
              </div>
              <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>

            {/* Code Block Snippet */}
            <div className="font-mono-code text-xs leading-relaxed space-y-2 text-slate-300">
              <div>
                <span className="text-purple-400">import</span> <span className="text-cyan-300">numpy</span> <span className="text-purple-400">as</span> np
              </div>
              <div>
                <span className="text-purple-400">from</span> <span className="text-cyan-300">sklearn.model_selection</span> <span className="text-purple-400">import</span> train_test_split
              </div>
              <div>
                <span className="text-purple-400">from</span> <span className="text-cyan-300">sklearn.ensemble</span> <span className="text-purple-400">import</span> RandomForestClassifier
              </div>
              <div className="pt-2 text-slate-500"># Initializing ML Model Pipeline</div>
              <div>
                <span className="text-blue-400">model</span> = RandomForestClassifier(n_estimators=<span className="text-amber-300">100</span>)
              </div>
              <div>
                <span className="text-blue-400">model</span>.fit(X_train, y_train)
              </div>
              <div className="text-green-400 pt-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                <span>Model evaluation completed successfully</span>
              </div>
            </div>

            {/* Live Interactive Metrics Pill */}
            <div className="mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 gap-3 text-center">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] uppercase font-mono text-slate-400">Focus Area</div>
                <div className="text-xs font-bold text-cyan-300 font-mono mt-0.5">Machine Learning</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] uppercase font-mono text-slate-400">Primary Language</div>
                <div className="text-xs font-bold text-cyan-300 font-mono mt-0.5">Python & SQL</div>
              </div>
            </div>

            {/* Floating 3D Badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-5 -right-5 px-4 py-2.5 rounded-xl glass-panel border border-cyan-400/50 shadow-lg flex items-center gap-2.5"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <div className="text-xs">
                <div className="font-bold text-white">Algorithm Evaluation</div>
                <div className="text-[10px] text-cyan-300 font-mono">Scikit-learn & EDA</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
