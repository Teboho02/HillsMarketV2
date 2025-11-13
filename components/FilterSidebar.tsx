import React from 'react';

export type SortOption = 'newest' | 'oldest' | 'price-low' | 'price-high';

interface FilterSidebarProps {
  universities: string[];
  categories: string[];
  universityFilter: string;
  setUniversityFilter: (filter: string) => void;
  categoryFilter: string;
  setCategoryFilter: (filter: string) => void;
  priceRange: number;
  setPriceRange: (range: number) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  onResetFilters: () => void;
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
  sortBy,
  setSortBy,
  onResetFilters,
}) => {
  const hasActiveFilters = universityFilter !== 'All' || categoryFilter !== 'All' || priceRange !== 2000;

  return (
    <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-slate-800">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="text-xs font-medium text-brand-primary hover:text-sky-600 transition-colors"
              aria-label="Reset all filters"
            >
              Reset All
            </button>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="sort" className="block text-sm font-medium text-slate-700 mb-2">Sort By</label>
          <select
            id="sort"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition text-slate-900"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

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
                aria-pressed={categoryFilter === cat}
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
            aria-label={`Maximum price: R${priceRange}`}
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>R0</span>
            <span>R2000</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;