import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { Internship, EligibilityType } from '../types';

interface PostJobModalProps {
  onClose: () => void;
  onPost: (newJob: Internship) => void;
}

export function PostJobModal({ onClose, onPost }: PostJobModalProps) {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('Kuwait City');
  const [eligibility, setEligibility] = useState<EligibilityType>('All');
  const [isRemote, setIsRemote] = useState(false);
  const [isFullTime, setIsFullTime] = useState(true);
  const [isPaid, setIsPaid] = useState(true);
  const [stipend, setStipend] = useState('250 KWD/Month');
  const [duration, setDuration] = useState('3 Months');
  const [description, setDescription] = useState('');
  
  // Custom parsing inputs
  const [qualificationsInput, setQualificationsInput] = useState('');
  const [responsibilitiesInput, setResponsibilitiesInput] = useState('');
  const [aboutCompany, setAboutCompany] = useState('');

  // Success screen
  const [isSuccess, setIsSuccess] = useState(false);

  // Logo background presets
  const logoPresets = [
    'bg-blue-900', 'bg-teal-600', 'bg-rose-500', 'bg-lime-700',
    'bg-indigo-900', 'bg-purple-600', 'bg-emerald-500', 'bg-slate-700'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !company || !location || !description || !aboutCompany) {
      alert('Please fill out all basic company and role fields.');
      return;
    }

    // Parse comma-separated lines
    const qualifications = qualificationsInput
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const responsibilities = responsibilitiesInput
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    // Pick a random logo preset
    const randomLogoBg = logoPresets[Math.floor(Math.random() * logoPresets.length)];

    const newJob: Internship = {
      id: `custom-job-${Date.now()}`,
      title,
      company,
      companyLogoBg: randomLogoBg,
      location,
      eligibility,
      isRemote,
      isFullTime,
      isPaid,
      stipend: isPaid ? stipend : 'Unpaid',
      duration,
      datePosted: new Date().toISOString().split('T')[0], // e.g. "2026-06-28"
      description,
      qualifications: qualifications.length > 0 ? qualifications : [
        'Recent graduate with a relevant Bachelor’s degree',
        'Strong motivation and readiness to learn'
      ],
      responsibilities: responsibilities.length > 0 ? responsibilities : [
        'Assist in daily team projects and operational workflows',
        'Participate in collaborative group sessions'
      ],
      aboutCompany
    };

    onPost(newJob);
    setIsSuccess(true);
  };

  return (
    <div id="post-job-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden border border-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Employers Only</span>
            <h3 className="font-sans font-extrabold text-slate-900 text-lg sm:text-xl">
              Post a New Internship
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* SUCCESS SCREEN */
          <div id="post-success-panel" className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-5 border border-blue-200 shadow-xs">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="font-sans font-extrabold text-xl text-slate-900 mb-2">
              Internship Listing Created!
            </h4>
            <p className="text-slate-600 text-sm max-w-sm mb-6 leading-relaxed">
              Your internship role for <strong>{title}</strong> at <strong>{company}</strong> is now live on the First Intern portal for candidates in Kuwait.
            </p>

            <button
              id="btn-post-success-close"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors cursor-pointer"
            >
              Return to Hub
            </button>
          </div>
        ) : (
          /* FORM BODY */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Job Title */}
              <div>
                <label htmlFor="post-title" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Internship Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="post-title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Marketing Associate Intern"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* Company Name */}
              <div>
                <label htmlFor="post-company" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="post-company"
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="e.g., Company A, Company B, or Tech Startups"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Location */}
              <div>
                <label htmlFor="post-location" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Location (Kuwait District) <span className="text-red-500">*</span>
                </label>
                <input
                  id="post-location"
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Kuwait City, Sharq, Salmiya"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* Duration */}
              <div>
                <label htmlFor="post-duration" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Duration <span className="text-red-500">*</span>
                </label>
                <input
                  id="post-duration"
                  type="text"
                  required
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g., 3 Months, 6 Months"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Quick Badges Flags */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
              {/* Eligibility */}
              <div>
                <label htmlFor="post-eligibility" className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Eligibility Status
                </label>
                <select
                  id="post-eligibility"
                  value={eligibility}
                  onChange={(e) => setEligibility(e.target.value as EligibilityType)}
                  className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white"
                >
                  <option value="All">Open to All</option>
                  <option value="Kuwaiti National">Kuwaiti Nationals Only</option>
                  <option value="Expat Friendly">Expat Friendly</option>
                </select>
              </div>

              {/* Is Fulltime */}
              <div>
                <label htmlFor="post-jobtype" className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Job Type
                </label>
                <select
                  id="post-jobtype"
                  value={isFullTime ? 'true' : 'false'}
                  onChange={(e) => setIsFullTime(e.target.value === 'true')}
                  className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white"
                >
                  <option value="true">Full-Time Hours</option>
                  <option value="false">Flexible / Part-Time</option>
                </select>
              </div>

              {/* Is Remote */}
              <div>
                <label htmlFor="post-remote" className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Workplace
                </label>
                <select
                  id="post-remote"
                  value={isRemote ? 'true' : 'false'}
                  onChange={(e) => setIsRemote(e.target.value === 'true')}
                  className="w-full px-2 py-1.5 border border-slate-200 rounded-lg text-xs text-slate-700 bg-white"
                >
                  <option value="false">On-Site (Kuwait Office)</option>
                  <option value="true">Remote / Hybrid</option>
                </select>
              </div>
            </div>

            {/* Stipend Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="flex items-center space-x-3 h-full pt-4">
                <input
                  id="post-paid-check"
                  type="checkbox"
                  checked={isPaid}
                  onChange={(e) => setIsPaid(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded-sm focus:ring-blue-500"
                />
                <label htmlFor="post-paid-check" className="text-sm font-semibold text-slate-700">
                  This is a paid internship
                </label>
              </div>

              {isPaid && (
                <div>
                  <label htmlFor="post-stipend" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Stipend Amount (KWD/month)
                  </label>
                  <input
                    id="post-stipend"
                    type="text"
                    required={isPaid}
                    value={stipend}
                    onChange={(e) => setStipend(e.target.value)}
                    placeholder="e.g., 250 KWD/Month"
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              )}
            </div>

            {/* Role Overview */}
            <div>
              <label htmlFor="post-desc" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Role Overview & Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="post-desc"
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what the intern will learn, study, and the overall scope..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Qualifications & Requirements */}
            <div>
              <label htmlFor="post-qualifications" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Qualifications & Requirements (One per line)
              </label>
              <textarea
                id="post-qualifications"
                rows={3}
                value={qualificationsInput}
                onChange={(e) => setQualificationsInput(e.target.value)}
                placeholder="e.g., Degree in Business or related fields&#10;Excellent communication skills&#10;Available immediately"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Core Responsibilities */}
            <div>
              <label htmlFor="post-responsibilities" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Key Responsibilities (One per line)
              </label>
              <textarea
                id="post-responsibilities"
                rows={3}
                value={responsibilitiesInput}
                onChange={(e) => setResponsibilitiesInput(e.target.value)}
                placeholder="e.g., Support digital media campaigns&#10;Analyze student outreach analytics&#10;Prepare mock credit slides"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* About Company */}
            <div>
              <label htmlFor="post-company-info" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                About the Company <span className="text-red-500">*</span>
              </label>
              <textarea
                id="post-company-info"
                rows={2}
                required
                value={aboutCompany}
                onChange={(e) => setAboutCompany(e.target.value)}
                placeholder="Describe your corporate vision, culture, and focus on supporting fresh graduates..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Footer Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="btn-post-submit"
                type="submit"
                className="px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs transition-all cursor-pointer"
              >
                Post Internship
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
