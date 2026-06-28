import React, { useState, useEffect } from 'react';
import { INITIAL_INTERNSHIPS } from './data/initialJobs';
import { Internship } from './types';
import { Header } from './components/Header';
import { SearchHero } from './components/SearchHero';
import { FilterTags } from './components/FilterTags';
import { JobCard } from './components/JobCard';
import { JobDetail } from './components/JobDetail';
import { ApplyModal } from './components/ApplyModal';
import { PostJobModal } from './components/PostJobModal';
import { AuthModal } from './components/AuthModal';
import {
  Search,
  Bookmark,
  Briefcase,
  Layers,
  Sparkles,
  ChevronRight,
  Info,
  CheckCircle,
  TrendingUp,
  LogIn,
  ArrowLeft,
  BriefcaseIcon,
} from 'lucide-react';

export default function App() {
  // --- USER AUTHENTICATION STATE ---
  const [currentUser, setCurrentUser] = useState<{ email: string } | null>(() => {
    const saved = localStorage.getItem('kuwait_current_user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'signin' | 'signup'>('signin');

  // --- JOB DATA PERSISTENCE ---
  const [internships, setInternships] = useState<Internship[]>(() => {
    const saved = localStorage.getItem('kuwait_internships_v2');
    if (saved) {
      try {
        const parsed: Internship[] = JSON.parse(saved);
        // Map stored ones, but if they match an initial internship ID, override it with the latest INITIAL_INTERNSHIPS data to ensure anonymized names (Company A, B, etc) are correctly used.
        return parsed.map((job) => {
          const initialMatch = INITIAL_INTERNSHIPS.find(i => i.id === job.id);
          return initialMatch ? initialMatch : job;
        });
      } catch (e) {
        console.error('Failed to parse internships from localStorage', e);
      }
    } else {
      // Migrate from older version if exists and clean it up
      const legacySaved = localStorage.getItem('kuwait_internships');
      if (legacySaved) {
        try {
          const parsed: Internship[] = JSON.parse(legacySaved);
          return parsed.map((job) => {
            const initialMatch = INITIAL_INTERNSHIPS.find(i => i.id === job.id);
            return initialMatch ? initialMatch : job;
          });
        } catch {
          // ignore
        }
      }
    }
    return INITIAL_INTERNSHIPS;
  });

  // User-specific states
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    const savedUser = localStorage.getItem('kuwait_current_user');
    let email = 'guest';
    if (savedUser) {
      try {
        email = JSON.parse(savedUser).email;
      } catch {}
    }
    const savedJobsKey = `kuwait_saved_jobs_${email}`;
    const savedJobsData = localStorage.getItem(savedJobsKey);
    return savedJobsData ? JSON.parse(savedJobsData) : [];
  });

  const [appliedJobIds, setAppliedJobIds] = useState<string[]>(() => {
    const savedUser = localStorage.getItem('kuwait_current_user');
    let email = 'guest';
    if (savedUser) {
      try {
        email = JSON.parse(savedUser).email;
      } catch {}
    }
    const appliedJobsKey = `kuwait_applied_jobs_${email}`;
    const appliedJobsData = localStorage.getItem(appliedJobsKey);
    return appliedJobsData ? JSON.parse(appliedJobsData) : [];
  });

  // Helper to load lists on-demand cleanly on authentication changes
  const loadUserLists = (email: string) => {
    const savedJobsKey = `kuwait_saved_jobs_${email}`;
    const savedJobsData = localStorage.getItem(savedJobsKey);
    setSavedJobIds(savedJobsData ? JSON.parse(savedJobsData) : []);

    const appliedJobsKey = `kuwait_applied_jobs_${email}`;
    const appliedJobsData = localStorage.getItem(appliedJobsKey);
    setAppliedJobIds(appliedJobsData ? JSON.parse(appliedJobsData) : []);
  };

  // View state: 'feed' (main listings page) vs 'detail' (focused full-screen internship information page)
  const [currentView, setCurrentView] = useState<'feed' | 'detail'>('feed');

  // General persistence of custom-posted internships
  useEffect(() => {
    localStorage.setItem('kuwait_internships_v2', JSON.stringify(internships));
  }, [internships]);

  // Search Inputs
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  // Active filters applied to the feed
  const [activeKeyword, setActiveKeyword] = useState('');
  const [activeLocation, setActiveLocation] = useState('');
  const [selectedEligibility, setSelectedEligibility] = useState('All');

  // Selected Internship for the focused detailed view
  const [selectedJobId, setSelectedJobId] = useState<string>(() => {
    return INITIAL_INTERNSHIPS[0]?.id || '';
  });

  // Modal control states
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isPostJobModalOpen, setIsPostJobModalOpen] = useState(false);

  // Tab state for feed list: 'all' | 'saved' | 'applied'
  const [feedTab, setFeedTab] = useState<'all' | 'saved' | 'applied'>('all');

  // Custom visual toast state for beautiful non-blocking alerts
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // --- TRIGGER SEARCH ---
  const handleSearch = () => {
    setActiveKeyword(searchKeyword);
    setActiveLocation(searchLocation);
    // Switch to listings view if we execute search from elsewhere
    setCurrentView('feed');
  };

  // Clear search parameters
  const handleClearSearch = () => {
    setSearchKeyword('');
    setSearchLocation('');
    setActiveKeyword('');
    setActiveLocation('');
  };

  // --- DYNAMIC FILTERING LOGIC ---
  const filteredInternships = internships.filter((job) => {
    // 1. Keyword check
    if (activeKeyword) {
      const q = activeKeyword.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCompany = job.company.toLowerCase().includes(q);
      const matchDesc = job.description.toLowerCase().includes(q);
      const matchQuals = job.qualifications.some(qf => qf.toLowerCase().includes(q));
      if (!matchTitle && !matchCompany && !matchDesc && !matchQuals) {
        return false;
      }
    }

    // 2. Location check
    if (activeLocation) {
      const loc = activeLocation.toLowerCase();
      const matchLoc = job.location.toLowerCase().includes(loc);
      if (!matchLoc) return false;
    }

    // 3. Tab filter check
    if (feedTab === 'saved') {
      if (!savedJobIds.includes(job.id)) return false;
    } else if (feedTab === 'applied') {
      if (!appliedJobIds.includes(job.id)) return false;
    }

    // 4. Eligibility Filter Pills check
    if (selectedEligibility !== 'All') {
      if (selectedEligibility === 'Kuwaiti National') {
        return job.eligibility === 'Kuwaiti National';
      }
      if (selectedEligibility === 'Expat Friendly') {
        return job.eligibility === 'Expat Friendly' || job.eligibility === 'All';
      }
      if (selectedEligibility === 'Remote') {
        return job.isRemote === true;
      }
      if (selectedEligibility === 'Full-time') {
        return job.isFullTime === true;
      }
    }

    return true;
  });

  // Calculate dynamic counts based on filters
  const getFilterCounts = () => {
    const baseList = internships.filter((job) => {
      if (activeKeyword) {
        const q = activeKeyword.toLowerCase();
        const matchTitle = job.title.toLowerCase().includes(q);
        const matchCompany = job.company.toLowerCase().includes(q);
        const matchDesc = job.description.toLowerCase().includes(q);
        const matchQuals = job.qualifications.some(qf => qf.toLowerCase().includes(q));
        if (!matchTitle && !matchCompany && !matchDesc && !matchQuals) return false;
      }
      if (activeLocation) {
        const loc = activeLocation.toLowerCase();
        if (!job.location.toLowerCase().includes(loc)) return false;
      }
      if (feedTab === 'saved') {
        if (!savedJobIds.includes(job.id)) return false;
      } else if (feedTab === 'applied') {
        if (!appliedJobIds.includes(job.id)) return false;
      }
      return true;
    });

    return {
      all: baseList.length,
      kuwaiti: baseList.filter((j) => j.eligibility === 'Kuwaiti National').length,
      expat: baseList.filter((j) => j.eligibility === 'Expat Friendly' || j.eligibility === 'All').length,
      remote: baseList.filter((j) => j.isRemote).length,
      fullTime: baseList.filter((j) => j.isFullTime).length,
    };
  };

  const counts = getFilterCounts();

  // Current active job inside detail view
  const activeJob = internships.find((job) => job.id === selectedJobId) || filteredInternships[0] || internships[0];

  // --- ACTIONS ---
  const handleToggleSave = (id: string) => {
    const userEmail = currentUser ? currentUser.email : 'guest';
    let newSaved: string[];
    if (savedJobIds.includes(id)) {
      newSaved = savedJobIds.filter(item => item !== id);
      triggerToast('Removed from saved internships');
    } else {
      newSaved = [...savedJobIds, id];
      triggerToast('Saved internship successfully!');
    }
    setSavedJobIds(newSaved);
    localStorage.setItem(`kuwait_saved_jobs_${userEmail}`, JSON.stringify(newSaved));
  };

  const handleApplyClick = () => {
    if (!currentUser) {
      triggerToast('Please Sign In or Register to submit your application and save your progress.');
      setAuthInitialMode('signin');
      setIsAuthModalOpen(true);
      return;
    }
    setIsApplyModalOpen(true);
  };

  const handleApplySubmit = (data: any) => {
    if (selectedJobId && !appliedJobIds.includes(selectedJobId)) {
      const newApplied = [...appliedJobIds, selectedJobId];
      setAppliedJobIds(newApplied);
      const userEmail = currentUser ? currentUser.email : 'guest';
      localStorage.setItem(`kuwait_applied_jobs_${userEmail}`, JSON.stringify(newApplied));
    }
    // Success flow triggers send back to main listings
    triggerToast('Application submitted successfully!');
    setIsApplyModalOpen(false);
    setCurrentView('feed');
  };

  const handlePostJob = (newJob: Internship) => {
    setInternships([newJob, ...internships]);
    setSelectedJobId(newJob.id);
    setCurrentView('detail');
    triggerToast('New internship posted successfully!');
  };

  const handleShare = () => {
    if (activeJob) {
      const shareUrl = `${window.location.origin}/?job=${activeJob.id}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        triggerToast('Shareable link copied to clipboard!');
      }).catch(() => {
        triggerToast('Failed to copy link.');
      });
    }
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. NAVIGATION BAR */}
      <Header
        onPostJobClick={() => setIsPostJobModalOpen(true)}
        user={currentUser}
        onSignInClick={() => {
          setAuthInitialMode('signin');
          setIsAuthModalOpen(true);
        }}
        onSignOutClick={() => {
          localStorage.removeItem('kuwait_current_user');
          setCurrentUser(null);
          loadUserLists('guest');
          triggerToast('Logged out successfully.');
        }}
        appliedCount={appliedJobIds.length}
        onHomeClick={() => {
          setCurrentView('feed');
          setFeedTab('all');
          setSearchKeyword('');
          setSearchLocation('');
          setActiveKeyword('');
          setActiveLocation('');
          setSelectedEligibility('All');
        }}
      />

      {/* 2. SIMPLE SEARCH HERO */}
      <SearchHero
        keyword={searchKeyword}
        setKeyword={setSearchKeyword}
        location={searchLocation}
        setLocation={setSearchLocation}
        onSearch={handleSearch}
      />

      {/* 3. CLEAN FILTER TAGS */}
      <FilterTags
        selectedFilter={selectedEligibility}
        onFilterChange={setSelectedEligibility}
        counts={counts}
      />

      {/* SUB-HEADER / BANNER STATS */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          
          {/* Active Search Summary */}
          <div className="text-sm text-slate-600 flex items-center flex-wrap gap-2">
            <span className="font-bold text-slate-800">
              {filteredInternships.length} internship{filteredInternships.length === 1 ? '' : 's'} found
            </span>
            {(activeKeyword || activeLocation || selectedEligibility !== 'All' || feedTab !== 'all') && (
              <span className="text-slate-400">for matching criteria</span>
            )}
            {activeKeyword && (
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-xs font-semibold">
                "{activeKeyword}"
              </span>
            )}
            {activeLocation && (
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-xs font-semibold">
                in {activeLocation}
              </span>
            )}
            {selectedEligibility !== 'All' && (
              <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md text-xs font-semibold">
                {selectedEligibility}
              </span>
            )}
            {(activeKeyword || activeLocation || selectedEligibility !== 'All' || feedTab !== 'all') && (
              <button
                onClick={handleClearSearch}
                className="text-xs text-blue-600 hover:text-blue-800 font-bold hover:underline cursor-pointer ml-1"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Feed tab filters */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setFeedTab('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                feedTab === 'all'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              All Listings
            </button>
            <button
              onClick={() => setFeedTab('saved')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center space-x-1 cursor-pointer ${
                feedTab === 'saved'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved ({savedJobIds.length})</span>
            </button>
            <button
              onClick={() => setFeedTab('applied')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all flex items-center space-x-1 cursor-pointer ${
                feedTab === 'applied'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Applied ({appliedJobIds.length})</span>
            </button>
          </div>

        </div>
      </div>

      {/* 4. MAIN LAYOUT (DYNAMIC VIEW SWITCHER) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {currentView === 'feed' ? (
          /* ================= LISTINGS FEED GRID VIEW ================= */
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h2 className="font-sans font-bold text-slate-900 text-lg flex items-center">
                <Layers className="w-4.5 h-4.5 mr-2 text-slate-400" />
                <span>Explore Internships</span>
              </h2>
              <span className="text-xs text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-md shadow-2xs font-medium">
                Showing {filteredInternships.length} of {internships.length} roles
              </span>
            </div>

            {/* If checking Applied Jobs while not signed in */}
            {feedTab === 'applied' && !currentUser ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center space-y-4 max-w-md mx-auto shadow-sm animate-scale-in my-8">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto border border-blue-100 shadow-xs">
                  <LogIn className="w-6 h-6" />
                </div>
                <h3 className="font-sans font-extrabold text-slate-800 text-lg">Sign In to View Applied Jobs</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Your applied jobs section is secure and personalized. Please sign in or create an account with email and password to track your applications.
                </p>
                <button
                  onClick={() => {
                    setAuthInitialMode('signin');
                    setIsAuthModalOpen(true);
                  }}
                  className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  Sign In Now
                </button>
              </div>
            ) : filteredInternships.length === 0 ? (
              /* EMPTY FILTER STATE */
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4 max-w-lg mx-auto shadow-xs">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 mx-auto border border-slate-100">
                  <Briefcase className="w-8 h-8" />
                </div>
                <div>
                  <p className="font-sans font-extrabold text-slate-800 text-lg">No Internships Found</p>
                  <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                    {feedTab === 'saved'
                      ? "You haven't saved any internships yet. Browse the feed and click the bookmark icon to save roles!"
                      : feedTab === 'applied'
                      ? "You haven't applied to any internships yet. Click any role, read the overview, and click 'Apply Now'!"
                      : "Try widening your keyword search, selecting another location, or clear existing filters to find more graduate roles."}
                  </p>
                </div>
                <div className="pt-2 flex justify-center space-x-3">
                  <button
                    onClick={handleClearSearch}
                    className="text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                  >
                    Reset Filters
                  </button>
                  {feedTab !== 'all' && (
                    <button
                      onClick={() => setFeedTab('all')}
                      className="text-sm font-bold text-slate-600 hover:text-slate-800 hover:underline cursor-pointer"
                    >
                      Browse All Listings
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* COMFORTABLE GRID LAYOUT */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInternships.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isSelected={selectedJobId === job.id}
                    isSaved={savedJobIds.includes(job.id)}
                    onSelect={() => {
                      setSelectedJobId(job.id);
                      setCurrentView('detail');
                    }}
                    onToggleSave={(e) => {
                      e.stopPropagation();
                      handleToggleSave(job.id);
                    }}
                  />
                ))}
              </div>
            )}

            {/* Quick tips card for recent graduates */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 text-left shadow-2xs mt-8">
              <div className="flex items-center space-x-2 text-blue-800">
                <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">JUST SO YOU KNOW</span>
              </div>
              <div className="mt-2.5 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <p className="font-bold text-slate-800 text-sm">🌐 Bilingual Advantage</p>
                  <p className="text-xs text-slate-600 leading-relaxed">Most private employers in Kuwait prefer candidates fluent in both English and Arabic.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-slate-800 text-sm">📊 Business Literacy</p>
                  <p className="text-xs text-slate-600 leading-relaxed">Excel competency is the most requested hard skill for banking & administrative roles in Sharq.</p>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-slate-800 text-sm">🤝 Fresh Talent Focus</p>
                  <p className="text-xs text-slate-600 leading-relaxed">Many companies offer direct conversion options into permanent graduate staff positions post-internship.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ================= DEDICATED FULL DETAIL PAGE VIEW ================= */
          <div className="max-w-4xl mx-auto space-y-4 animate-scale-in">
            <JobDetail
              job={activeJob}
              isSaved={activeJob ? savedJobIds.includes(activeJob.id) : false}
              onToggleSave={() => activeJob && handleToggleSave(activeJob.id)}
              onApplyClick={handleApplyClick}
              hasApplied={activeJob ? appliedJobIds.includes(activeJob.id) : false}
              onShareClick={handleShare}
              onBackToListings={() => setCurrentView('feed')}
            />
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-600">First Intern © 2026</span>
            <span>•</span>
            <span>Empowering Fresh Graduates in Kuwait</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600">Terms of Service</a>
            <a href="#" className="hover:text-slate-600">Employer Guidelines</a>
            <a href="#" className="hover:text-slate-600">Contact Support</a>
          </div>
        </div>
      </footer>

      {/* --- MODALS --- */}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <AuthModal
          initialMode={authInitialMode}
          onClose={() => setIsAuthModalOpen(false)}
          onSuccess={(email) => {
            localStorage.setItem('kuwait_current_user', JSON.stringify({ email }));
            setCurrentUser({ email });
            loadUserLists(email);
            triggerToast(`Successfully signed in as ${email}`);
          }}
        />
      )}

      {/* Apply Modal */}
      {isApplyModalOpen && activeJob && (
        <ApplyModal
          job={activeJob}
          onClose={() => setIsApplyModalOpen(false)}
          onSubmit={handleApplySubmit}
          initialEmail={currentUser?.email}
        />
      )}

      {/* Post Job Modal */}
      {isPostJobModalOpen && (
        <PostJobModal
          onClose={() => setIsPostJobModalOpen(false)}
          onPost={handlePostJob}
        />
      )}

      {/* TOAST SYSTEM */}
      {toastMessage && (
        <div
          id="custom-toast-notification"
          className="fixed bottom-6 right-6 z-50 flex items-center bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg space-x-2.5 border border-slate-700 animate-slide-in text-sm font-medium"
        >
          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
