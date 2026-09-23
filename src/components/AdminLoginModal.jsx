import React, { useState } from 'react';
import { X, Lock, Eye, EyeOff, ShieldCheck, KeyRound } from 'lucide-react';
import { authenticateAdmin } from '../config/adminAuth';

export function AdminLoginModal({ isOpen, onClose, onSuccess }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    setTimeout(() => {
      const isValid = authenticateAdmin(password);
      if (isValid) {
        setPassword('');
        setError('');
        setIsSubmitting(false);
        if (onSuccess) onSuccess();
      } else {
        setError('Incorrect password. Please verify and try again.');
        setIsSubmitting(false);
      }
    }, 200);
  };

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-[#08004b] text-white rounded-3xl border border-[#cebb78]/40 shadow-2xl p-7 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-3 pt-2">
          <div className="inline-block relative">
            <img
              src="/laylitna-logo.png"
              alt="Laylitna"
              className="w-16 h-16 rounded-full mx-auto object-cover shadow-lg border-2 border-[#cebb78]"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#006989] text-[#cebb78] flex items-center justify-center border border-[#08004b] shadow-sm">
              <KeyRound className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <h3 className="font-serif text-2xl font-bold text-[#cebb78] tracking-wide">
              Laylitna Studio
            </h3>
            <p className="text-xs text-slate-300 font-medium mt-1">
              Admin & Customizer Sign In
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5 text-xs text-slate-300 text-center leading-relaxed">
          Sign in to access template customizations, text styling, and private client invitation link generation.
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Admin Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter password..."
                className={`w-full pl-10 pr-11 py-3 bg-white/10 border rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none transition-all ${
                  error ? 'border-rose-400 focus:border-rose-500' : 'border-slate-600 focus:border-[#cebb78]'
                }`}
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {error && (
              <p className="text-xs text-rose-400 font-medium pt-1 animate-in fade-in">
                {error}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white font-semibold text-xs tracking-wider uppercase transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !password.trim()}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#006989] to-[#005570] hover:from-[#005570] hover:to-[#00445a] text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-black/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShieldCheck className="w-4 h-4 text-[#cebb78]" />
              <span>{isSubmitting ? 'Verifying...' : 'Sign In'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
