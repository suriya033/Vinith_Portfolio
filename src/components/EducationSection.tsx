import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { GraduationCap, MapPin, Calendar, Award, Sparkles, School } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { education } = usePortfolio();

  return (
    <section id="education" className="py-24 relative bg-[#07090e]">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
            Education <span className="text-gradient-cyan">History</span>
          </h2>
        </div>

        {/* Education Card Container */}
        <div className="space-y-8">
          {education.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-panel rounded-3xl border border-cyan-500/30 p-8 sm:p-10 glass-panel-hover relative overflow-hidden group shadow-2xl"
            >
              {/* Top ambient glowing accent border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Left Side Info */}
                <div className="md:col-span-8 flex flex-col justify-between">
                  <div>
                    {/* Degree & Field */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold mb-4">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{item.degree} in {item.field}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-2 group-hover:text-cyan-300 transition-colors">
                      {item.institution}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300 font-medium mb-6">
                      <div className="flex items-center gap-1.5 text-cyan-400">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                      </div>
                      <span className="text-slate-700">•</span>
                      <div className="flex items-center gap-1.5 text-purple-400">
                        <Calendar className="w-4 h-4" />
                        <span>{item.period}</span>
                      </div>
                    </div>
                  </div>

                  {/* CGPA Badge */}
                  <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-2 text-cyan-300">
                      <Award className="w-5 h-5 text-cyan-400" />
                      <div>
                        <div className="text-[10px] uppercase font-mono text-slate-400">Academic Score</div>
                        <div className="text-base font-extrabold font-mono text-white">CGPA: {item.cgpa}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side Futuristic Graduation Graphic */}
                <div className="md:col-span-4 flex justify-center">
                  <div className="w-40 h-40 rounded-3xl bg-slate-900/90 border border-cyan-500/40 p-6 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(6,182,212,0.2)] group-hover:scale-105 transition-transform">
                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 shadow-inner">
                      <GraduationCap className="w-9 h-9 animate-bounce" />
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-300">AI & DATA SCIENCE</span>
                    <span className="text-[10px] text-slate-400">M.I.E.T</span>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
