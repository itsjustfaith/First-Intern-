import React from 'react';
import { MapPin, Calendar, Clock, Banknote, Bookmark } from 'lucide-react';
import { Internship } from '../types';

interface JobCardProps {
  key?: string;
  job: Internship;
  isSelected: boolean;
  isSaved: boolean;
  onSelect: () => void;
  onToggleSave: (e: any) => void;
}

export function JobCard({
  job,
  isSelected,
  isSaved,
  onSelect,
  onToggleSave,
}: JobCardProps): React.JSX.Element {
  // Utility for date formatted "X days ago" or similar
  const getDaysAgo = (dateStr: string) => {
    const today = new Date('2026-06-28'); // Consistent reference date as per environment
    const posted = new Date(dateStr);
    const diffTime = Math.abs(today.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0 || isNaN(diffDays)) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  const getEligibilityBadgeColor = (eligibility: string) => {
    switch (eligibility) {
      case 'Kuwaiti National':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Expat Friendly':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-blue-50 text-blue-800 border-blue-200';
    }
  };

  return (
    <div
      id={`job-card-${job.id}`}
      onClick={onSelect}
      className={`group relative p-5 rounded-xl border transition-all duration-200 cursor-pointer text-left bg-white ${
        isSelected
          ? 'border-blue-600 ring-2 ring-blue-500/10 shadow-md'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      {/* Decorative vertical accent for selected item */}
      {isSelected && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l-xl" />
      )}

      {/* Header Info */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-start space-x-3">
          {/* Mock Logo representation */}
          <div className={`w-10 h-10 ${job.companyLogoBg} rounded-lg text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-xs`}>
            {job.company.charAt(0)}
          </div>
          <div>
            <h3 className="font-sans font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
              {job.title}
            </h3>
            <p className="text-sm font-medium text-slate-600">{job.company}</p>
          </div>
        </div>

        {/* Save Icon */}
        <button
          onClick={onToggleSave}
          className={`p-1.5 rounded-full hover:bg-slate-100 transition-colors shrink-0 cursor-pointer ${
            isSaved ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
          }`}
          title={isSaved ? 'Unsave job' : 'Save job'}
        >
          <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Badges / Details */}
      <div className="flex flex-wrap gap-1.5 my-3">
        {/* Eligibility Status */}
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${getEligibilityBadgeColor(job.eligibility)}`}>
          {job.eligibility}
        </span>

        {/* Paid / Unpaid Status */}
        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${
          job.isPaid
            ? 'bg-purple-50 text-purple-800 border-purple-200'
            : 'bg-slate-50 text-slate-600 border-slate-200'
        }`}>
          {job.isPaid ? 'Paid' : 'Unpaid'}
        </span>

        {/* Remote Status */}
        {job.isRemote && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border bg-sky-50 text-sky-800 border-sky-200">
            Remote
          </span>
        )}
      </div>

      {/* Meta Location, Duration, Stipend Info */}
      <div className="space-y-1 text-xs text-slate-500 font-sans border-t border-slate-100 pt-2.5">
        <div className="flex items-center">
          <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-400 shrink-0" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-400 shrink-0" />
            <span>{job.duration}</span>
          </div>
          {job.stipend && (
            <div className="flex items-center text-slate-700 font-medium">
              <Banknote className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{job.stipend}</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center">
          <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
          <span>{getDaysAgo(job.datePosted)}</span>
        </div>
      </div>
    </div>
  );
}
