import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Brain,
  BarChart3,
  Sparkles,
  Code2,
  Database,
  Layers,
  Cpu,
  Check
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { profile } = usePortfolio();

  const statCards = [
    {
      title: 'Machine Learning',
      desc: 'Model development, training & evaluation with Scikit-learn',
      icon: Brain,
      color: 'from-cyan-500/20 to-blue-500/10',
      border: 'border-cyan-500/40',
      iconColor: 'text-cyan-400'
    },
    {
      title: 'Data Analysis',
      desc: 'Exploratory data analysis, cleaning & visualization using Pandas',
      icon: BarChart3,
      color: 'from-blue-500/20 to-purple-500/10',
      border: 'border-blue-500/40',
      iconColor: 'text-blue-400'
    },
    {
      title: 'AI Applications',
      desc: 'Building intelligent code reviewers, predictive models & tutors',
      icon: Sparkles,
      color: 'from-purple-500/20 to-pink-500/10',
      border: 'border-purple-500/40',
      iconColor: 'text-purple-400'
    },
    {
      title: 'Python & SQL',
      desc: 'Core programming languages for data processing & querying',
      icon: Code2,
      color: 'from-emerald-500/20 to-cyan-500/10',
      border: 'border-emerald-500/40',
      iconColor: 'text-emerald-400'
    }
  ];

  const corePillars = [
    'Machine Learning Algorithms',
    'Data Preprocessing & Cleaning',
    'Feature Engineering & Selection',
    'Model Development & Evaluation',
    'Exploratory Data Analysis (EDA)',
    'Data Visualization'
  ];

  return (
    <section id="about" className="py-24 relative bg-[#07090e]">
      {/* Subtle section background blur */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>PORTFOLIO OVERVIEW</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
            About <span className="text-gradient-cyan">Me</span>
          </h2>
        </div>

        {/* Biography & Key Core Competencies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left: Bio card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl relative"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-heading">Machine Learning Engineering Focus</h3>
                <p className="text-xs text-cyan-400 font-mono">B.Tech AI & Data Science</p>
              </div>
            </div>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              {profile.aboutText ||
                'Vinith S is an aspiring Machine Learning Engineer with knowledge of machine learning algorithms, data preprocessing, feature engineering, model development, and evaluation. He is proficient in Python, SQL, Scikit-learn, Pandas, and NumPy, with experience building predictive models and practical AI/ML applications.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800">
              {corePillars.map((pillar, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                  <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Technical Toolkit Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            <div className="p-6 rounded-2xl glass-panel border border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <Database className="w-5 h-5 text-cyan-400" />
                <h4 className="text-base font-bold text-white">Data & Analytics Proficiency</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Experienced in structuring raw datasets, performing feature selection, handling missing values, and generating visual data insights using Matplotlib and Seaborn.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-slate-800">
              <div className="flex items-center gap-3 mb-3">
                <Layers className="w-5 h-5 text-purple-400" />
                <h4 className="text-base font-bold text-white">Model Lifecycle Management</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hands-on model creation lifecycle: from data cleaning and exploratory analysis to classification evaluation and performance validation.
              </p>
            </div>
          </motion.div>
        </div>

        {/* 4 Animated Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`glass-panel p-6 rounded-2xl border ${card.border} bg-gradient-to-br ${card.color} glass-panel-hover flex flex-col justify-between`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center ${card.iconColor} mb-4 shadow-md`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>CORE SKILL</span>
                  <span className="text-cyan-400">PROFICIENT</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
