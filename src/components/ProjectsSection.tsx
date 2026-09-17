import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import type { ProjectItem } from '../types';
import { CodeReviewVisualizer } from './ProjectVisualizers/CodeReviewVisualizer';
import { CancerMLVisualizer } from './ProjectVisualizers/CancerMLVisualizer';
import { EnglishTutorVisualizer } from './ProjectVisualizers/EnglishTutorVisualizer';
import { GithubIcon } from './GithubIcon';
import {
  FolderGit2,
  ExternalLink,
  Sparkles,
  Maximize2,
  X,
  Tag,
  CheckCircle2,
  Terminal,
  Cpu
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { projects } = usePortfolio();
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const getVisualizer = (id: string) => {
    if (id.includes('1') || id.includes('code')) return <CodeReviewVisualizer />;
    if (id.includes('2') || id.includes('cancer')) return <CancerMLVisualizer />;
    if (id.includes('3') || id.includes('english') || id.includes('tutor')) return <EnglishTutorVisualizer />;
    return <CodeReviewVisualizer />;
  };

  return (
    <section id="projects" className="py-24 relative bg-[#07090e]">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>FEATURED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
            Machine Learning <span className="text-gradient-cyan">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Practical AI applications, predictive healthcare ML models, and interactive intelligent tutoring systems.
          </p>
        </div>

        {/* Projects Cards List */}
        <div className="space-y-16">
          {projects.filter(p => p.published !== false).map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="glass-panel rounded-3xl border border-slate-800 p-6 lg:p-8 glass-panel-hover relative overflow-hidden group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Side Details */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full">
                  <div>
                    {/* Category Pill */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
                        {proj.category || 'AI / ML'}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-4 group-hover:text-cyan-300 transition-colors">
                      {proj.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                      "{proj.description}"
                    </p>

                    {/* Highlighted Feature Bullets */}
                    <div className="space-y-2.5 mb-6">
                      {proj.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    {/* Technology Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {proj.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions: GitHub & Live Demo & Expand */}
                    <div className="flex flex-wrap items-center gap-4">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 text-xs font-semibold transition-all hover:scale-105"
                        >
                          <GithubIcon className="w-4 h-4" />
                          <span>GitHub Repository</span>
                        </a>
                      )}

                      <button
                        onClick={() => setSelectedProject(proj)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-300 text-xs font-semibold transition-all hover:scale-105 cursor-pointer"
                      >
                        <Maximize2 className="w-4 h-4" />
                        <span>Expand Full Specs</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Side Live Interactive ML Simulation */}
                <div className="lg:col-span-6 relative">
                  {getVisualizer(proj.id)}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Expanded Modal Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0c0f1d] border border-cyan-500/40 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold mb-4 inline-block">
                {selectedProject.category}
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 font-heading">
                {selectedProject.title}
              </h3>

              <div className="text-slate-300 text-sm leading-relaxed mb-6 space-y-3">
                <p>"{selectedProject.description}"</p>
                {selectedProject.longDescription && (
                  <p className="text-slate-400 text-xs leading-relaxed">{selectedProject.longDescription}</p>
                )}
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  Key Features & Architecture
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProject.features.map((feat, fIdx) => (
                    <div key={fIdx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-bold text-white mb-3">Technologies Employed</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((t, idx) => (
                    <span key={idx} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 flex justify-end gap-3">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold hover:border-cyan-400 flex items-center gap-2"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
