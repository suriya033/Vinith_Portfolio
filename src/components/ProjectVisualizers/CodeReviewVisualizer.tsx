import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle2, AlertTriangle, Sparkles, Code2, Bug, Lightbulb } from 'lucide-react';

export const CodeReviewVisualizer: React.FC = () => {
  const sampleCode = `def calculate_average(numbers):
    total = 0
    for n in numbers:
        total += n
    return total / len(numbers) # Warning: Potential ZeroDivisionError if empty!`;

  const [code, setCode] = useState(sampleCode);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const handleRunAnalysis = () => {
    setAnalyzing(true);
    setAnalyzed(false);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 1200);
  };

  return (
    <div className="w-full bg-[#0b0e17] rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl font-mono text-xs">
      {/* Window Header */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-slate-300 font-bold ml-2">code_analyzer.py</span>
        </div>
        <button
          onClick={handleRunAnalysis}
          disabled={analyzing}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-all cursor-pointer shadow-[0_0_12px_rgba(6,182,212,0.4)]"
        >
          {analyzing ? <Sparkles className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{analyzing ? 'Scanning Code...' : 'Analyze with AI'}</span>
        </button>
      </div>

      {/* Editor & AI Result grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 p-4 gap-4">
        {/* Input Code */}
        <div className="flex flex-col gap-2">
          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Python Source Code Input:</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-36 bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-cyan-500/50 resize-none font-mono text-xs leading-relaxed"
          />
        </div>

        {/* AI Output Scanner */}
        <div className="flex flex-col gap-2 justify-center">
          {!analyzing && !analyzed && (
            <div className="h-36 flex flex-col items-center justify-center text-slate-500 text-center p-4 border border-dashed border-slate-800 rounded-xl">
              <Sparkles className="w-8 h-8 text-cyan-500/40 mb-2" />
              <span>Click "Analyze with AI" to test the automated code reviewer system.</span>
            </div>
          )}

          {analyzing && (
            <div className="h-36 flex flex-col items-center justify-center text-cyan-400 text-center p-4 border border-slate-800 rounded-xl bg-slate-950/60">
              <Sparkles className="w-8 h-8 animate-spin text-cyan-400 mb-2" />
              <span className="animate-pulse">Parsing AST & detecting potential bug patterns...</span>
            </div>
          )}

          <AnimatePresence>
            {analyzed && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-2.5 h-36 overflow-y-auto"
              >
                <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-amber-300">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-xs">Issue Detected: Unhandled ZeroDivisionError</div>
                    <div className="text-[11px] opacity-90 mt-0.5">Line 5: `len(numbers)` can be 0 if empty list passed.</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-start gap-2.5 text-cyan-300">
                  <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-cyan-400" />
                  <div>
                    <div className="font-bold text-xs">AI Refactoring Suggestion:</div>
                    <div className="text-[11px] text-slate-300 font-mono mt-0.5">`if not numbers: return 0.0`</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
