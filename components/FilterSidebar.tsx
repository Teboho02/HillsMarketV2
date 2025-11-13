import React from 'react';

interface FilterSidebarProps {
  universities: string[];
  categories: string[];
  universityFilter: string;
  setUniversityFilter: (filter: string) => void;
  categoryFilter: string;
  setCategoryFilter: (filter: string) => void;
  priceRange: number;
  setPriceRange: (range: number) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  universities,
  categories,
  universityFilter,
  setUniversityFilter,
  categoryFilter,
  setCategoryFilter,
  priceRange,
  setPriceRange,
}) => {
  return (
    <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
        <h2 className="text-2xl font-display font-bold text-slate-800 mb-6">Filters</h2>

        <div className="mb-6">
          <label htmlFor="university" className="block text-sm font-medium text-slate-700 mb-2">University</label>
          <select
            id="university"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition text-slate-900"
            value={universityFilter}
            onChange={(e) => setUniversityFilter(e.target.value)}
          >
            <option>All</option>
            {universities.map(uni => <option key={uni}>{uni}</option>)}
          </select>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-slate-700 mb-3">Category</h3>
          <div className="flex flex-wrap gap-2">
            {['All', ...categories].map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-left px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                  categoryFilter === cat
                    ? 'bg-brand-primary text-white font-semibold shadow'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-2">
            Max Price: <span className="font-bold text-brand-primary">R{priceRange}</span>
          </label>
          <input
            id="price"
            type="range"
            min="0"
            max="2000"
            step="50"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
          />
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;