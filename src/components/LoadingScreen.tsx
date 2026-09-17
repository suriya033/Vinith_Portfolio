import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Terminal, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    'INITIALIZING AI SYSTEM...',
    'LOADING NEURAL NETWORK WEIGHTS...',
    'PARSING ML ALGORITHMS & MODELS...',
    'OPTIMIZING FEATURE PIPELINE...',
    'PORTAL READY'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 18) + 8;
        return next > 100 ? 100 : next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 25) setStatusIndex(0);
    else if (progress < 50) setStatusIndex(1);
    else if (progress < 75) setStatusIndex(2);
    else if (progress < 95) setStatusIndex(3);
    else setStatusIndex(4);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#07090e] text-slate-100 font-mono-code selection:bg-cyan-500/30"
    >
      {/* Background Neural Matrix Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#00f2fe_1px,transparent_1px),linear-gradient(to_bottom,#00f2fe_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">
        {/* Animated AI Logo Icon */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 h-20 rounded-2xl bg-slate-900/80 border border-cyan-500/40 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)] mb-8"
        >
          <Cpu className="w-10 h-10 text-cyan-400" />
        </motion.div>

        {/* Title */}
        <div className="flex items-center gap-2 mb-2 text-cyan-400 text-sm font-semibold tracking-widest uppercase">
          <Sparkles className="w-4 h-4 animate-spin" />
          VINITH S · ML ENGINEER
        </div>

        {/* Terminal Text */}
        <div className="h-10 flex items-center justify-center text-center text-slate-300 text-xs sm:text-sm tracking-wide font-mono">
          <AnimatePresence mode="wait">
            <motion.div
              key={statusIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{statuses[statusIndex]}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-full h-2.5 overflow-hidden p-0.5 mt-6 relative shadow-inner">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        {/* Percentage Counter */}
        <div className="w-full flex justify-between items-center mt-3 text-xs text-slate-400 font-mono">
          <span className="text-cyan-400">v2.4.0-ML</span>
          <span className="font-bold text-cyan-300">{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
};
