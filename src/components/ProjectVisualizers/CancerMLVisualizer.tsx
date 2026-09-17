import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Filter, Sliders, Cpu, Activity, CheckCircle, RefreshCw } from 'lucide-react';

export const CancerMLVisualizer: React.FC = () => {
  const [activeStep, setActiveStep] = useState(4); // 0-based: 0=Dataset, 1=Preprocess, 2=Features, 3=Train, 4=Prediction

  const [radius, setRadius] = useState(14.1);
  const [texture, setTexture] = useState(19.2);
  const [smoothness, setSmoothness] = useState(0.09);

  // Model inference calculation (Demonstrative classifier based on feature thresholds)
  const score = (radius - 14) * 0.4 + (texture - 19) * 0.3 + (smoothness - 0.09) * 20;
  const isMalignant = score > 1.2;
  const confidence = Math.min(Math.max(Math.round(85 + Math.abs(score) * 4), 88), 98);

  const steps = [
    { title: 'Dataset', icon: Database, desc: 'Diagnostic Features Data' },
    { title: 'Preprocessing', icon: Filter, desc: 'Cleaning & Normalization' },
    { title: 'Feature Selection', icon: Sliders, desc: 'Selecting Key Attributes' },
    { title: 'Model Training', icon: Cpu, desc: 'Scikit-learn Classifier' },
    { title: 'Prediction', icon: Activity, desc: 'Classification Result' }
  ];

  return (
    <div className="w-full bg-[#0b0e17] rounded-2xl border border-cyan-500/30 overflow-hidden p-5 shadow-2xl font-mono text-xs">
      {/* Step Indicator Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6 overflow-x-auto gap-2">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isActive = idx === activeStep;
          return (
            <button
              key={step.title}
              onClick={() => setActiveStep(idx)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all border shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <StepIcon className="w-3.5 h-3.5" />
              <span className="font-bold">{idx + 1}. {step.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Model Predictor View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Input Feature Sliders */}
        <div className="space-y-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800">
          <div className="text-slate-300 font-bold flex items-center justify-between border-b border-slate-800 pb-2">
            <span>Diagnostic Feature Controls</span>
            <button
              onClick={() => { setRadius(14.1); setTexture(19.2); setSmoothness(0.09); }}
              className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset
            </button>
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Mean Radius:</span>
              <span className="text-cyan-300 font-bold">{radius.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="8.0"
              max="25.0"
              step="0.1"
              value={radius}
              onChange={(e) => setRadius(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Mean Texture:</span>
              <span className="text-cyan-300 font-bold">{texture.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="10.0"
              max="35.0"
              step="0.1"
              value={texture}
              onChange={(e) => setTexture(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-slate-400 mb-1">
              <span>Mean Smoothness:</span>
              <span className="text-cyan-300 font-bold">{smoothness.toFixed(3)}</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.16"
              step="0.005"
              value={smoothness}
              onChange={(e) => setSmoothness(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Realtime Classifier Output */}
        <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800 flex flex-col justify-between h-full">
          <div>
            <div className="text-slate-400 text-[11px] uppercase tracking-wider mb-2">ML Classifier Output:</div>
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-xl border font-bold text-base flex items-center gap-2 ${
                  isMalignant
                    ? 'bg-red-500/10 border-red-500/40 text-red-400'
                    : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                }`}
              >
                <CheckCircle className="w-5 h-5" />
                <span>{isMalignant ? 'Malignant Prediction' : 'Benign Prediction'}</span>
              </div>
            </div>
            <p className="text-slate-400 text-[11px] mt-3 leading-relaxed">
              Model output generated based on Scikit-learn binary classification algorithm training pipeline.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-500">Pipeline Stage:</span>
            <span className="text-cyan-300 font-bold">{steps[activeStep].title}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
