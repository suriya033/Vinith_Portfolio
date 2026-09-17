import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Brain, ArrowUp, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#04060a] border-t border-slate-900 py-12 text-slate-400 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Brain className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-base tracking-wider font-heading">
              {profile.name || 'VINITH S'}
            </span>
          </div>

          {/* Nav Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400 font-medium">
            <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#education" className="hover:text-cyan-400 transition-colors">Education</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
            <a href="/admin/login" className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 font-mono">
              <ShieldCheck className="w-3 h-3" />
              <span>Admin Panel</span>
            </a>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} Vinith S. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Machine Learning & AI Engineering Portfolio</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
