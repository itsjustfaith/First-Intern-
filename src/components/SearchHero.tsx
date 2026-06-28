import React from 'react';
import { Search, MapPin, X } from 'lucide-react';

interface SearchHeroProps {
  keyword: string;
  setKeyword: (val: string) => void;
  location: string;
  setLocation: (val: string) => void;
  onSearch: () => void;
}

export function SearchHero({
  keyword,
  setKeyword,
  location,
  setLocation,
  onSearch,
}: SearchHeroProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div id="search-hero-section" className="bg-slate-50 border-b border-slate-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="font-sans font-bold text-3xl sm:text-4xl tracking-tight text-slate-900 mb-3">
          Start your internship journey in Kuwait
        </h1>
        <p className="text-base text-slate-600 mb-8 max-w-xl mx-auto">
          Kickstart your career with internships tailored for recent Kuwaiti and expat graduates. Simple, transparent, and direct.
        </p>

        {/* Indeed-style Side-by-Side Search Bar */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-2 md:p-3 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-stretch gap-2 md:gap-0 md:divide-x md:divide-slate-200">
            {/* Keyword Input */}
            <div className="flex-1 flex items-center px-3 relative">
              <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
              <input
                id="search-input-keyword"
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Job title, keywords, or company..."
                className="w-full py-3 text-slate-800 placeholder-slate-400 focus:outline-none text-sm sm:text-base bg-transparent"
              />
              {keyword && (
                <button
                  onClick={() => setKeyword('')}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  title="Clear keywords"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Location Input */}
            <div className="flex-1 flex items-center px-3 relative">
              <MapPin className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
              <input
                id="search-input-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Location (e.g., Kuwait City, Sharq, Salmiya)"
                className="w-full py-3 text-slate-800 placeholder-slate-400 focus:outline-none text-sm sm:text-base bg-transparent"
              />
              {location && (
                <button
                  onClick={() => setLocation('')}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  title="Clear location"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Find Internships Button */}
            <div className="flex justify-end pl-0 md:pl-3 shrink-0">
              <button
                id="btn-find-internships"
                onClick={onSearch}
                className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-lg transition-colors shadow-xs cursor-pointer text-sm sm:text-base"
              >
                Find Internships
              </button>
            </div>
          </div>
        </div>

        {/* Quick Location Tags */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
          <span>Popular searches:</span>
          {['Sharq', 'Salmiya', 'Shuwaikh', 'Kuwait City'].map((loc) => (
            <button
              key={loc}
              onClick={() => {
                setLocation(loc);
                // Trigger a slight timeout to let state update then search
                setTimeout(() => onSearch(), 50);
              }}
              className="text-blue-600 hover:underline font-medium cursor-pointer"
            >
              {loc}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
