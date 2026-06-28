import { Filter } from 'lucide-react';

interface FilterTagsProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  counts: {
    all: number;
    kuwaiti: number;
    expat: number;
    remote: number;
    fullTime: number;
  };
}

export function FilterTags({ selectedFilter, onFilterChange, counts }: FilterTagsProps) {
  const filters = [
    { id: 'All', label: 'All Eligibility', count: counts.all },
    { id: 'Kuwaiti National', label: 'Kuwaiti National Only', count: counts.kuwaiti },
    { id: 'Expat Friendly', label: 'Expat Friendly', count: counts.expat },
    { id: 'Remote', label: 'Remote / Virtual', count: counts.remote },
    { id: 'Full-time', label: 'Full-time Hours', count: counts.fullTime },
  ];

  return (
    <div id="filter-section" className="bg-white border-b border-slate-100 py-3.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Label & Icon */}
        <div className="flex items-center space-x-2 text-slate-500 shrink-0">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold uppercase tracking-wider font-sans">Filter by:</span>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {filters.map((f) => {
            const isActive = selectedFilter === f.id;
            return (
              <button
                key={f.id}
                id={`filter-pill-${f.id.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => onFilterChange(f.id)}
                className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all border cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-800'
                }`}
              >
                {f.label}
                <span
                  className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-blue-100 text-blue-800' : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {f.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
