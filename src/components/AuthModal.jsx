import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, authMode, setAuthMode, login } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Investor / Buyer');

  if (!authModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    login({
      id: `usr-${Date.now()}`,
      name: name || email.split('@')[0],
      email: email,
      role: role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    });
  };

  const loginDemoBuyer = () => {
    login({
      id: 'demo-buyer',
      name: 'Alexander Croft',
      email: 'alexander.croft@venture.co',
      role: 'Private Investor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    });
  };

  const loginDemoAgent = () => {
    login({
      id: 'demo-agent',
      name: 'Elena Rostova',
      email: 'elena.rostova@estatly.com',
      role: 'Luxury Broker',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setAuthModalOpen(false)}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-md bg-slate-950 border border-blue-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 overflow-hidden"
        >
          {/* Subtle top glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-blue-600/25 blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={() => setAuthModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-900 border border-blue-400/30 text-white shadow-lg shadow-blue-600/30 mb-3">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              {authMode === 'login' ? 'Welcome to Estatly' : 'Create VIP Account'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Access off-market estates, confidential portfolios & private viewings
            </p>
          </div>

          {/* 1-Click Fast Demo Login Presets */}
          <div className="mb-6 p-3.5 rounded-2xl bg-blue-950/20 border border-blue-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Demo Access</span>
              </span>
              <span className="text-[10px] text-slate-400">One-click test</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={loginDemoBuyer}
                className="p-2 rounded-xl bg-slate-900 hover:bg-blue-900/40 border border-slate-800 hover:border-blue-500/40 text-left transition-all group"
              >
                <p className="text-xs font-bold text-white group-hover:text-blue-300">Demo Buyer</p>
                <p className="text-[10px] text-slate-400">Alexander Croft (VIP)</p>
              </button>

              <button
                type="button"
                onClick={loginDemoAgent}
                className="p-2 rounded-xl bg-slate-900 hover:bg-blue-900/40 border border-slate-800 hover:border-blue-500/40 text-left transition-all group"
              >
                <p className="text-xs font-bold text-white group-hover:text-blue-300">Demo Broker</p>
                <p className="text-[10px] text-slate-400">Elena Rostova (Top 1%)</p>
              </button>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 mb-5">
            <button
              onClick={() => setAuthMode('login')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                authMode === 'login'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`py-2 text-xs font-bold rounded-lg transition-all ${
                authMode === 'register'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authMode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Legal Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Lord Sterling or Vivienne Vance"
                    className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Work / Personal Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@executive.com"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-slate-300">Password</label>
                {authMode === 'login' && (
                  <button type="button" className="text-[11px] text-blue-400 hover:underline">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {authMode === 'register' && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Profile Classification</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Private Investor">Private Investor / High Net Worth Individual</option>
                  <option value="Family Office">Family Office Representative</option>
                  <option value="Luxury Broker">Luxury Real Estate Broker</option>
                  <option value="Architect / Developer">Architect / Property Developer</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <span>{authMode === 'login' ? 'Sign In Privately' : 'Complete VIP Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Security footnote */}
          <div className="mt-5 text-center flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit SSL Encrypted End-to-End Privacy</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
