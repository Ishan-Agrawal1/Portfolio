import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Eye, EyeOff, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect
  if (isAuthenticated) {
    navigate('/admin/projects', { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/admin/projects', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#e9c176]/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Glass card */}
        <div className="relative border border-white/10 rounded-2xl bg-[#111111]/80 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden">
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e9c176]/50 to-transparent" />

          <div className="p-8 sm:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#e9c176]/10 border border-[#e9c176]/20 mb-4"
              >
                <Shield className="text-[#e9c176]" size={24} />
              </motion.div>
              <h1 className="text-xl font-semibold text-white tracking-tight">
                Admin Access
              </h1>
              <p className="mt-1 text-sm text-gray-500 font-mono text-[11px] tracking-wider uppercase">
                Authorized personnel only
              </p>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 mb-6 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
              >
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono tracking-widest uppercase text-gray-400 block">
                  Email
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="admin@portfolio.dev"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#e9c176]/50 focus:ring-1 focus:ring-[#e9c176]/20 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono tracking-widest uppercase text-gray-400 block">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-12 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#e9c176]/50 focus:ring-1 focus:ring-[#e9c176]/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                id="admin-login-btn"
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-mono text-[11px] tracking-widest uppercase transition-all duration-300 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed bg-[#e9c176] text-black hover:bg-[#d4a956] font-semibold"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>

          {/* Bottom subtle gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>

        {/* Subtle hint text */}
        <p className="text-center mt-6 text-[10px] text-gray-600 font-mono tracking-wider">
          THIS PAGE IS NOT LINKED FROM THE PUBLIC SITE
        </p>
      </motion.div>
    </div>
  );
}
