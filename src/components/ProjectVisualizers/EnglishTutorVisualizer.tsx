import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Send, Sparkles, CheckCircle2, MessageSquare } from 'lucide-react';

export const EnglishTutorVisualizer: React.FC = () => {
  const [userPrompt, setUserPrompt] = useState("I goes to university yesterday for learn AI.");
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am your AI English Tutor. Send me any sentence to practice grammar, vocabulary, and writing!'
    }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userPrompt.trim() || loading) return;

    const currentText = userPrompt;
    setMessages((prev) => [...prev, { sender: 'user', text: currentText }]);
    setUserPrompt('');
    setLoading(true);

    setTimeout(() => {
      let feedback = '';
      if (currentText.toLowerCase().includes('goes') || currentText.toLowerCase().includes('for learn')) {
        feedback = 'Great effort! Correction: "I went to university yesterday to learn AI." (Use past tense "went" for yesterday and "to learn" for purpose). Grammar Score: 90/100.';
      } else {
        feedback = `Excellent phrasing! Your sentence structure is clear and grammatically sound. Practice score: 95/100. Keep up the great practice!`;
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: feedback }]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full bg-[#0b0e17] rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl flex flex-col h-[320px] font-mono text-xs">
      {/* Header */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-200">AI English Tutor Assistant</div>
            <div className="text-[10px] text-cyan-400 font-semibold">Real-Time Grammar & Conversational Feedback</div>
          </div>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span>Active</span>
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-950/60">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                m.sender === 'user' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-purple-500/20 text-purple-300'
              }`}
            >
              {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-100 rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-purple-400 text-xs italic">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>AI Tutor is analyzing sentence grammar & vocabulary...</span>
          </div>
        )}
      </div>

      {/* Input bar */}
      <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
        <input
          type="text"
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          placeholder="Type a sentence to practice grammar..."
          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 text-slate-200 focus:outline-none focus:border-purple-500/50 text-xs"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-md transition-all"
        >
          <span>Send</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
