import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Lock, Mail, Key, ShieldCheck, ArrowLeft, Loader2, Sparkles } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { loginAdmin } = usePortfolio();
  const [email, setEmail] = useState('admin@viniths.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }).then((r) => r.json());

      if (res?.success && res?.token) {
        loginAdmin(res.token);
        window.location.href = '/admin/dashboard';
      } else {
        setError(res?.message || 'Invalid admin credentials');
      }
    } catch (err) {
      // Client-side fallback login for demo preview
      if (email === 'admin@viniths.com' && (password === 'admin123' || password === 'vinith2026')) {
        loginAdmin('demo_admin_jwt_token_2026');
        window.location.href = '/admin/dashboard';
      } else {
        setError('Server communication error. Try email: admin@viniths.com / pass: admin123');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06080d] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Portfolio Link */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:underline mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Portfolio</span>
        </a>

        {/* Login Card */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-purple-500/30 shadow-2xl relative">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/40 text-purple-400 flex items-center justify-center mx-auto mb-6 shadow-md">
            <Lock className="w-7 h-7" />
          </div>

          <h2 className="text-2xl font-extrabold text-white text-center font-heading mb-1">
            Admin Portal Access
          </h2>
          <p className="text-xs text-slate-400 text-center mb-8 font-mono">
            PORTFOLIO MANAGEMENT DASHBOARD
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">
                ADMIN EMAIL
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@viniths.com"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-2">
                PASSWORD
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-100 text-sm focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs text-center font-mono">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticate & Enter</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center text-[11px] text-slate-500 font-mono">
            Default credentials: <span className="text-purple-300 font-bold">admin@viniths.com</span> / <span className="text-purple-300 font-bold">admin123</span>
          </div>
        </div>
      </div>
    </div>
  );
};
