import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Cpu,
  Building2,
  Tag
} from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  const { experiences } = usePortfolio();

  return (
    <section id="experience" className="py-24 relative bg-[#07090e]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER PATHWAY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
            Internship & <span className="text-gradient-cyan">Experience</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Practical hands-on industry experience in Machine Learning model development, IoT sensors, and microcontroller systems.
          </p>
        </div>

        {/* Vertical Animated Timeline */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 lg:ml-32 space-y-12 pl-6 sm:pl-10">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="relative group"
            >
              {/* Glowing Node Dot on Timeline */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-[#07090e] border-2 border-cyan-400 flex items-center justify-center group-hover:scale-125 transition-transform shadow-[0_0_12px_rgba(6,182,212,0.6)]">
                <div className="w-2 h-2 rounded-full bg-cyan-400" />
              </div>

              {/* Main Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 glass-panel-hover relative overflow-hidden">
                {/* Accent top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-60 group-hover:opacity-100 transition-opacity" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800/80">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white font-heading group-hover:text-cyan-300 transition-colors">
                      {exp.position}
                    </h3>
                    <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold mt-1">
                      <Building2 className="w-4 h-4" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 shrink-0">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Bullet Responsibilities strictly from resume */}
                <div className="space-y-3 mb-6">
                  {exp.responsibilities.map((resp, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-1" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>

                {/* Technology Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800/60">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mr-2">
                    <Tag className="w-3.5 h-3.5 text-purple-400" />
                    <span>Technologies:</span>
                  </div>
                  {exp.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-lg bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-200 hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
