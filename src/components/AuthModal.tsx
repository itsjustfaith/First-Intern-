import React, { useState } from 'react';
import { X, Mail, Lock, LogIn, Sparkles, CheckCircle } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
  onSuccess: (email: string) => void;
  initialMode?: 'signin' | 'signup';
}

export function AuthModal({ onClose, onSuccess, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Please fill in all fields.');
      return;
    }

    if (password.length < 5) {
      setErrorMessage('Password must be at least 5 characters long.');
      return;
    }

    // Get current registered users database from localStorage
    const usersJson = localStorage.getItem('kuwait_registered_users');
    const users: Record<string, string> = usersJson ? JSON.parse(usersJson) : {};

    const normalizedEmail = email.toLowerCase().trim();

    if (mode === 'signup') {
      // Check if user already exists
      if (users[normalizedEmail]) {
        setErrorMessage('This email is already registered. Please sign in.');
        return;
      }

      // Save user
      users[normalizedEmail] = password;
      localStorage.setItem('kuwait_registered_users', JSON.stringify(users));
      
      setSuccessMessage('Account created successfully! Logging you in...');
      setTimeout(() => {
        onSuccess(normalizedEmail);
        onClose();
      }, 1200);
    } else {
      // Sign in check
      const storedPassword = users[normalizedEmail];
      if (!storedPassword) {
        // To make it easy for beginners/users to play around, let's auto-register them if the account does not exist!
        // "make sure the user can sign in with email and password, so that each job they apply to saves into their applied jobs section"
        // Let's explain to them or prompt them. Or we can auto-register or keep standard credential validation. Let's do standard credentials, but give a clear hint that if they don't have an account, they can switch to Sign Up!
        setErrorMessage('Email not found. Click "Create an Account" below to register this email.');
        return;
      }

      if (storedPassword !== password) {
        setErrorMessage('Incorrect password. Please try again.');
        return;
      }

      setSuccessMessage('Welcome back! Logging you in...');
      setTimeout(() => {
        onSuccess(normalizedEmail);
        onClose();
      }, 1000);
    }
  };

  return (
    <div id="auth-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-100 animate-scale-in">
        
        {/* Banner header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full bg-black/10 hover:bg-black/20 text-white/90 hover:text-white transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3 border border-white/20 shadow-xs">
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </div>
          
          <h3 className="font-sans font-extrabold text-xl">
            {mode === 'signin' ? 'Sign In to First Intern' : 'Create Your Profile'}
          </h3>
          <p className="text-xs text-blue-100 mt-1 max-w-xs mx-auto">
            Save your applied jobs history, track application status, and view deep internship specifications.
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 bg-rose-50 text-rose-800 text-xs font-semibold rounded-lg border border-rose-200">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200 flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-emerald-500 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  placeholder="e.g., student@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Password
                </label>
                {mode === 'signin' && (
                  <span className="text-[11px] text-slate-400">Min. 5 characters</span>
                )}
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center py-2.5 px-4 font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer text-sm"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {mode === 'signin' ? 'Sign In' : 'Create First Intern Account'}
            </button>
          </form>

          {/* Quick instructions / Help */}
          <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 leading-relaxed">
            <span className="font-bold text-slate-700">💡 Testing Tip:</span> You can sign up with any email (e.g., <code className="bg-slate-200 px-1 py-0.2 rounded-sm text-slate-800">user@kuwait.com</code>) and any password to test different profiles and their isolated applied history!
          </div>

          {/* Switch toggle link */}
          <div className="mt-5 pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            {mode === 'signin' ? (
              <p>
                Don't have a profile yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMessage('');
                  }}
                  className="text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Create an Account
                </button>
              </p>
            ) : (
              <p>
                Already have a profile?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setErrorMessage('');
                  }}
                  className="text-blue-600 font-bold hover:underline cursor-pointer"
                >
                  Sign In here
                </button>
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
