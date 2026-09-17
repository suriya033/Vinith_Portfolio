import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { FileText, Download, Eye, X, ExternalLink, CheckCircle2, ShieldCheck } from 'lucide-react';

export const ResumeSection: React.FC = () => {
  const { resume } = usePortfolio();
  const [viewingResume, setViewingResume] = useState(false);

  return (
    <section id="resume" className="py-20 relative bg-[#07090e]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/30 text-center relative overflow-hidden shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
              <FileText className="w-8 h-8" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-3">
              My <span className="text-gradient-cyan">Resume</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg mb-8">
              Explore my education, experience, projects, and technical skills in detail.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setViewingResume(true)}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-cyan-300 bg-slate-900 border border-cyan-500/40 hover:bg-cyan-500/10 hover:border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all hover:scale-105 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>View Resume</span>
              </button>

              <a
                href={resume.fileUrl}
                download={resume.fileName || 'Vinith_S_ML_Engineer_Resume.pdf'}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all hover:scale-105 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume PDF</span>
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-center gap-2 text-xs text-slate-400 font-mono">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Verified Document · Active: {resume.fileName || 'Vinith_S_ML_Engineer_Resume.pdf'}</span>
            </div>
          </div>
        </div>

      </div>

      {/* PDF Viewing Modal */}
      <AnimatePresence>
        {viewingResume && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b0e1a] border border-cyan-500/40 rounded-3xl max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden shadow-2xl relative"
            >
              {/* Modal Header */}
              <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-200 font-bold text-sm font-mono">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>{resume.fileName || 'Vinith_S_ML_Engineer_Resume.pdf'}</span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={resume.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-cyan-400 hover:underline"
                  >
                    <span>Open in new tab</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setViewingResume(false)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* PDF Viewer Frame or fallback prompt */}
              <div className="flex-1 bg-slate-950 relative p-4 flex flex-col items-center justify-center">
                <iframe
                  src={resume.fileUrl}
                  className="w-full h-full rounded-xl border border-slate-800"
                  title="Vinith S Resume"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
