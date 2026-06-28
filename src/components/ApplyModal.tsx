import React, { useState } from 'react';
import { X, Upload, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { Internship, ApplicationInput } from '../types';

interface ApplyModalProps {
  job: Internship;
  onClose: () => void;
  onSubmit: (data: ApplicationInput) => void;
  initialEmail?: string;
}

export function ApplyModal({ job, onClose, onSubmit, initialEmail }: ApplyModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(initialEmail || '');
  const [phone, setPhone] = useState('');
  const [university, setUniversity] = useState('');
  const [major, setMajor] = useState('');
  const [graduationYear, setGraduationYear] = useState('2026');
  const [coverLetter, setCoverLetter] = useState('');
  
  // File drag/upload simulator states
  const [resumeName, setResumeName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  
  // Submission success animation
  const [isSuccess, setIsSuccess] = useState(false);

  // Suggested universities in Kuwait
  const kuwaitUniversities = [
    'Kuwait University (KU)',
    'Gulf University for Science & Technology (GUST)',
    'American University of Kuwait (AUK)',
    'American College of the Middle East (ACM)',
    'Australian University (AU)',
    'Box Hill College Kuwait',
    'Arab Open University (AOU)',
    'Other / International University'
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setResumeName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResumeName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !university || !major || !resumeName) {
      alert('Please fill out all required fields and upload a mock resume.');
      return;
    }

    const application: ApplicationInput = {
      fullName,
      email,
      phone,
      university,
      major,
      graduationYear,
      resumeName,
      coverLetter
    };

    onSubmit(application);
    setIsSuccess(true);
  };

  return (
    <div id="apply-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-100 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">Internship Application</span>
            <h3 className="font-sans font-extrabold text-slate-900 text-lg sm:text-xl line-clamp-1">
              {job.title}
            </h3>
            <p className="text-xs text-slate-500">{job.company}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            title="Close application modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          /* SUCCESS STATE PANEL */
          <div id="apply-success-panel" className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-5 border border-emerald-200 shadow-xs animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="font-sans font-extrabold text-xl text-slate-900 mb-2">
              Application Sent!
            </h4>
            <p className="text-slate-600 text-sm max-w-sm mb-6 leading-relaxed">
              Congratulations, <strong>{fullName}</strong>! Your application for the <strong>{job.title}</strong> role has been successfully transmitted to the hiring managers at <strong>{job.company}</strong>.
            </p>

            {/* Simulated process tracker */}
            <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 text-left mb-6 space-y-3.5">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Next Application Steps:</p>
              <div className="flex items-start space-x-3 text-xs">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">1</span>
                <div>
                  <p className="font-bold text-slate-800">CV Received (Instant)</p>
                  <p className="text-slate-500">A confirmation receipt was routed to {email}.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-xs">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold shrink-0">2</span>
                <div>
                  <p className="font-bold text-slate-800">Recruiter Screening (Within 3 days)</p>
                  <p className="text-slate-500">The team will review your {major} qualifications and your attached PDF.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-xs">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold shrink-0">3</span>
                <div>
                  <p className="font-bold text-slate-800">Interview Stage</p>
                  <p className="text-slate-500">Qualified candidates will receive a phone invitation for a video screen.</p>
                </div>
              </div>
            </div>

            <button
              id="btn-apply-success-done"
              onClick={onClose}
              className="w-full inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors cursor-pointer"
            >
              Back to Internship Feed
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        ) : (
          /* APPLICATION FORM PANEL */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Full Name */}
            <div>
              <label htmlFor="apply-name" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="apply-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g., Sarah Al-Mutairi"
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="apply-email" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="apply-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., sarah@gmail.com"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="apply-phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Kuwait Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="apply-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g., +965 9999 8888"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Academic Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="apply-university" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  University / College <span className="text-red-500">*</span>
                </label>
                <select
                  id="apply-university"
                  required
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                >
                  <option value="">-- Select Institution --</option>
                  {kuwaitUniversities.map((uni) => (
                    <option key={uni} value={uni}>
                      {uni}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="apply-major" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Major / Field of Study <span className="text-red-500">*</span>
                </label>
                <input
                  id="apply-major"
                  type="text"
                  required
                  value={major}
                  onChange={(e) => setMajor(e.target.value)}
                  placeholder="e.g., Finance, Computer Science"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Graduation Year */}
            <div>
              <label htmlFor="apply-grad-year" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Graduation Year <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['2024', '2025', '2026', '2027'].map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setGraduationYear(year)}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold border text-center transition-all cursor-pointer ${
                      graduationYear === year
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            {/* Resume Upload - Supporting Drag & Drop / Click Upload simulation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Upload Resume / CV (PDF or Word) <span className="text-red-500">*</span>
              </label>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-5 text-center transition-all cursor-pointer ${
                  resumeName
                    ? 'border-blue-300 bg-blue-50/20'
                    : isDragging
                    ? 'border-blue-500 bg-blue-50/40'
                    : 'border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                }`}
              >
                <input
                  id="apply-resume-input"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {resumeName ? (
                  <div className="flex items-center justify-center space-x-2 text-slate-800">
                    <FileText className="w-8 h-8 text-blue-500 shrink-0" />
                    <div className="text-left">
                      <p className="text-sm font-bold text-slate-800 line-clamp-1">{resumeName}</p>
                      <p className="text-xs text-blue-600 font-medium">Click or drag new file to replace</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1 text-slate-500">
                    <Upload className="w-8 h-8 mx-auto text-slate-400 mb-1" />
                    <p className="text-sm font-semibold text-slate-700">
                      Drag & drop your resume, or <span className="text-blue-600 underline">browse</span>
                    </p>
                    <p className="text-xs text-slate-400">PDF, DOC, DOCX up to 5MB (simulated upload)</p>
                  </div>
                )}
              </div>
            </div>

            {/* Cover Letter Note (Optional) */}
            <div>
              <label htmlFor="apply-cover-letter" className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Brief Note or Cover Letter (Optional)
              </label>
              <textarea
                id="apply-cover-letter"
                rows={3}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Introduce yourself briefly to the team..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="btn-apply-submit"
                type="submit"
                className="px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg shadow-xs transition-all cursor-pointer"
              >
                Submit Application
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
