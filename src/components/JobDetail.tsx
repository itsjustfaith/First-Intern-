import {
  MapPin,
  Calendar,
  Banknote,
  Clock,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Building2,
  Bookmark,
  Share2,
  ArrowLeft,
} from 'lucide-react';
import { Internship } from '../types';

interface JobDetailProps {
  job: Internship | undefined;
  isSaved: boolean;
  onToggleSave: () => void;
  onApplyClick: () => void;
  hasApplied: boolean;
  onShareClick: () => void;
  onBackToListings?: () => void;
}

export function JobDetail({
  job,
  isSaved,
  onToggleSave,
  onApplyClick,
  hasApplied,
  onShareClick,
  onBackToListings,
}: JobDetailProps) {
  if (!job) {
    return (
      <div id="job-detail-empty" className="h-full flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl border border-slate-200">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-4 animate-pulse">
          <Briefcase className="w-8 h-8" />
        </div>
        <h3 className="font-sans font-bold text-lg text-slate-800 mb-1">No Internship Selected</h3>
        <p className="text-sm text-slate-500 max-w-sm">
          Select an internship from the feed to view detailed description, qualifications, and start your application.
        </p>
        {onBackToListings && (
          <button
            onClick={onBackToListings}
            className="mt-4 inline-flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back to Feed
          </button>
        )}
      </div>
    );
  }

  const getEligibilityLabel = (eligibility: string) => {
    switch (eligibility) {
      case 'Kuwaiti National':
        return 'Kuwaiti Nationals Only';
      case 'Expat Friendly':
        return 'Expat Friendly (All Nationalities)';
      default:
        return 'Open to All Nationalities';
    }
  };

  const getEligibilityBadgeColor = (eligibility: string) => {
    switch (eligibility) {
      case 'Kuwaiti National':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Expat Friendly':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      default:
        return 'bg-blue-100 text-blue-900 border-blue-300';
    }
  };

  return (
    <div id={`job-detail-panel-${job.id}`} className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col h-full overflow-hidden">
      
      {/* Back button row if onBackToListings is available */}
      {onBackToListings && (
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <button
            onClick={onBackToListings}
            className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer py-1"
          >
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Internship Feed
          </button>
          <span className="text-slate-400 text-xs font-medium font-mono">Detailed View</span>
        </div>
      )}

      {/* Sticky Header inside Detail View */}
      <div className="p-6 border-b border-slate-100 bg-white">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start space-x-4">
            {/* Logo */}
            <div className={`w-14 h-14 ${job.companyLogoBg} rounded-xl text-white font-extrabold flex items-center justify-center text-xl shrink-0 shadow-md`}>
              {job.company.charAt(0)}
            </div>
            <div>
              <h2 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-900 leading-tight">
                {job.title}
              </h2>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                <span className="font-semibold text-blue-600 hover:underline cursor-pointer">{job.company}</span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center text-sm text-slate-500">
                  <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                  {job.location}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onShareClick}
              className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
              title="Share internship"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onToggleSave}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isSaved
                  ? 'border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-700'
              }`}
              title={isSaved ? 'Unsave job' : 'Save job'}
            >
              <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Highlight Details Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
          <div>
            <p className="text-xs text-slate-400 font-medium">Stipend</p>
            <div className="flex items-center mt-1 text-slate-800 font-semibold text-sm">
              <Banknote className="w-4 h-4 mr-1 text-slate-500 shrink-0" />
              <span>{job.stipend || 'Unpaid / Certificate'}</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Duration</p>
            <div className="flex items-center mt-1 text-slate-800 font-semibold text-sm">
              <Calendar className="w-4 h-4 mr-1 text-slate-500 shrink-0" />
              <span>{job.duration}</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Eligibility</p>
            <div className="flex items-center mt-1 text-slate-800 font-semibold text-sm">
              <GraduationCap className="w-4 h-4 mr-1 text-slate-500 shrink-0" />
              <span className="line-clamp-1">{job.eligibility}</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-400 font-medium">Type</p>
            <div className="flex items-center mt-1 text-slate-800 font-semibold text-sm">
              <Briefcase className="w-4 h-4 mr-1 text-slate-500 shrink-0" />
              <span>{job.isFullTime ? 'Full-Time' : 'Flexible Hours'}</span>
            </div>
          </div>
        </div>

        {/* Action Button Strip */}
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getEligibilityBadgeColor(job.eligibility)}`}>
              {getEligibilityLabel(job.eligibility)}
            </span>
            {job.isRemote && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border bg-sky-100 text-sky-900 border-sky-300">
                Remote Friendly
              </span>
            )}
          </div>

          {hasApplied ? (
            <div className="flex items-center bg-emerald-50 text-emerald-800 px-4 py-2.5 rounded-lg border border-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mr-2 shrink-0" />
              <span className="text-sm font-semibold">Application Submitted</span>
            </div>
          ) : (
            <button
              id={`btn-apply-now-${job.id}`}
              onClick={onApplyClick}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Details Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Description Section */}
        <div>
          <h4 className="font-sans font-bold text-slate-900 text-lg mb-2">Role Overview</h4>
          <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-line">
            {job.description}
          </p>
        </div>

        {/* Qualifications Section */}
        {job.qualifications && job.qualifications.length > 0 && (
          <div className="border-t border-slate-100 pt-6">
            <h4 className="font-sans font-bold text-slate-900 text-lg mb-3">Qualifications & Requirements</h4>
            <ul className="space-y-2.5">
              {job.qualifications.map((qual, idx) => (
                <li key={idx} className="flex items-start text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-3 shrink-0" />
                  <span className="leading-relaxed">{qual}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Responsibilities Section */}
        {job.responsibilities && job.responsibilities.length > 0 && (
          <div className="border-t border-slate-100 pt-6">
            <h4 className="font-sans font-bold text-slate-900 text-lg mb-3">Core Responsibilities</h4>
            <ul className="space-y-2.5">
              {job.responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start text-sm text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 mr-3 shrink-0" />
                  <span className="leading-relaxed">{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* About Company Section */}
        <div className="border-t border-slate-100 pt-6 bg-slate-50 -mx-6 -mb-6 p-6">
          <div className="flex items-center space-x-2.5 mb-3">
            <Building2 className="w-5 h-5 text-slate-400" />
            <h4 className="font-sans font-bold text-slate-900 text-base">About {job.company}</h4>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            {job.aboutCompany}
          </p>
          <div className="mt-4 flex items-center space-x-1.5 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Job posted on First Intern on {new Date(job.datePosted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
