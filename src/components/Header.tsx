import React from 'react';
import { Handshake, PlusCircle, User, LogOut, LogIn, CheckCircle } from 'lucide-react';

interface HeaderProps {
  onPostJobClick: () => void;
  user: { email: string } | null;
  onSignInClick: () => void;
  onSignOutClick: () => void;
  appliedCount: number;
  onHomeClick?: () => void;
}

export function Header({
  onPostJobClick,
  user,
  onSignInClick,
  onSignOutClick,
  appliedCount,
  onHomeClick,
}: HeaderProps) {
  return (
    <header id="app-header" className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Logo and Brand */}
        <div 
          onClick={onHomeClick}
          className="flex items-center space-x-3 shrink-0 cursor-pointer hover:opacity-85 active:scale-[0.98] transition-all select-none"
          title="Go to Home"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-sm font-bold text-xl">
            <Handshake/>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-sans font-bold text-xl tracking-tight text-slate-900">First Intern</span>
            </div>
          </div>
        </div>

        {/* Auth status & Action Buttons */}
        <div className="flex items-center space-x-3">
          
          {user ? (
            <div className="flex items-center space-x-2.5">
              {/* User badge with email */}
              <div className="hidden md:flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span className="max-w-[120px] truncate" title={user.email}>{user.email}</span>
                <span className="bg-emerald-50 text-emerald-700 font-semibold px-1.5 py-0.2 rounded-full border border-emerald-100 flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3 text-emerald-500" />
                  <span>Applied: {appliedCount}</span>
                </span>
              </div>
              
              {/* Sign out button */}
              <button
                onClick={onSignOutClick}
                className="inline-flex items-center px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5 sm:mr-1.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onSignInClick}
              className="inline-flex items-center px-3.5 py-2 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg border border-blue-200 transition-colors cursor-pointer"
            >
              <LogIn className="w-4 h-4 mr-1.5" />
              Sign In
            </button>
          )}

          {/* Post a Job CTA */}
          <button
            id="btn-post-job-header"
            onClick={onPostJobClick}
            className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors shadow-xs hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer whitespace-nowrap"
          >
            <PlusCircle className="w-3.5 h-3.5 mr-1.5" />
            <span className="hidden sm:inline">Post a Job</span>
            <span className="inline sm:hidden">Post</span>
          </button>
        </div>

      </div>
    </header>
  );
}
