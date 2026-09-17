import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { GithubIcon } from './GithubIcon';
import { LinkedinIcon } from './LinkedinIcon';
import {
  FileText,
  Menu,
  X,
  Brain,
  Moon,
  Sun,
  ShieldCheck
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { profile, resume, theme, setTheme, isAdminLoggedIn } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07090e]/85 backdrop-blur-md border-b border-cyan-500/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">
            <Brain className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-wider text-base sm:text-lg text-slate-100 group-hover:text-cyan-300 transition-colors">
              {profile.name || 'VINITH S'}
            </span>
            <span className="text-[10px] tracking-widest text-cyan-400 font-mono font-semibold uppercase">
              ML ENGINEER
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors relative py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Desktop Right Side CTA & Social Icons */}
        <div className="hidden lg:flex items-center gap-3">
          {/* GitHub */}
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all hover:scale-105"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          {/* LinkedIn */}
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all hover:scale-105"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          {/* Resume PDF Download */}
          <a
            href={resume.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)] transition-all hover:scale-105"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Resume</span>
          </a>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'cyber' : 'dark')}
            title="Toggle theme mode"
            className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-all"
          >
            {theme === 'dark' ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-yellow-400" />}
          </button>

          {/* Admin Indicator */}
          {isAdminLoggedIn && (
            <a
              href="/admin/dashboard"
              className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-purple-500/20 border border-purple-500/40 text-purple-300 font-mono"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Admin</span>
            </a>
          )}
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'cyber' : 'dark')}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
          >
            {theme === 'dark' ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-yellow-400" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 hover:text-cyan-400 transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#07090e]/95 backdrop-blur-xl border-b border-slate-800 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-base font-medium text-slate-200 hover:text-cyan-400 py-1 transition-colors"
                >
                  {link.name}
                </a>
              ))}

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                </div>

                <a
                  href={resume.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-cyan-500 text-slate-950 font-bold"
                >
                  <FileText className="w-4 h-4" />
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
