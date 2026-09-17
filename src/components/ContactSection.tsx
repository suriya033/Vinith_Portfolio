import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { GithubIcon } from './GithubIcon';
import { LinkedinIcon } from './LinkedinIcon';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { profile, sendContactMessage } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!formData.name || !formData.email || !formData.message) {
      setFeedback({ type: 'error', text: 'Please complete all required fields (Name, Email, Message).' });
      return;
    }

    setLoading(true);
    const res = await sendContactMessage(formData);
    setLoading(false);

    if (res.success) {
      setFeedback({ type: 'success', text: res.message });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      setFeedback({ type: 'error', text: res.message });
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-[#07090e]">
      {/* Background illumination */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
            Let's Build Something <span className="text-gradient-cyan">Intelligent</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl mx-auto">
            Have a machine learning project, research inquiry, or career opportunity? Send a direct message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Email Card */}
            <a
              href={`mailto:${profile.email}`}
              className="glass-panel p-6 rounded-2xl border border-slate-800 glass-panel-hover flex items-center gap-4 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform shadow-md shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-mono uppercase text-slate-400">Email Address</div>
                <div className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                  {profile.email}
                </div>
              </div>
            </a>

            {/* Phone Card */}
            <a
              href={`tel:${profile.phone}`}
              className="glass-panel p-6 rounded-2xl border border-slate-800 glass-panel-hover flex items-center gap-4 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shadow-md shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase text-slate-400">Phone Number</div>
                <div className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {profile.phone}
                </div>
              </div>
            </a>

            {/* Location Card */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-md shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase text-slate-400">Location</div>
                <div className="text-sm sm:text-base font-bold text-white">
                  {profile.location}
                </div>
              </div>
            </div>

            {/* Social Links Box */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <div className="text-xs font-mono uppercase text-slate-400 mb-4">Professional Profiles</div>
              <div className="flex items-center gap-3">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 hover:text-cyan-300 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 hover:text-cyan-300 transition-all"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-500/30 shadow-2xl relative"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    YOUR NAME <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    EMAIL ADDRESS <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  SUBJECT
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Machine Learning Collaboration Inquiry"
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-2">
                  MESSAGE <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Vinith, I would like to discuss..."
                  rows={5}
                  required
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 text-sm transition-all resize-none"
                />
              </div>

              {/* Feedback Alerts */}
              {feedback && (
                <div
                  className={`p-4 rounded-xl border text-xs flex items-center gap-2.5 ${
                    feedback.type === 'success'
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                      : 'bg-red-500/10 border-red-500/40 text-red-300'
                  }`}
                >
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  )}
                  <span>{feedback.text}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Processing Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
