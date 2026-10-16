import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  SlidersHorizontal, 
  Grid3X3, 
  List, 
  Map, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  X, 
  MapPin, 
  Filter,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';

const ALL_AMENITIES = [
  'Pool',
  'Smart Home',
  'Wine Cellar',
  'Cinema',
  'Spa',
  'Dock',
  'Elevator',
  'Garage',
  'Fireplace'
];

export default function ListingsPage() {
  const { 
    properties, 
    filters, 
    setFilters, 
    resetFilters,
    navigateToProperty
  } = useApp();

  // Layout view modes: 'grid' | 'list' | 'map'
  const [viewMode, setViewMode] = useState('grid');
  
  // Mobile filter drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Map active property highlight
  const [activeMapPropId, setActiveMapPropId] = useState(null);

  // Filter logic
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      // Keyword query
      if (filters.query) {
        const q = filters.query.toLowerCase();
        const matchesTitle = p.title?.toLowerCase().includes(q);
        const matchesCity = p.city?.toLowerCase().includes(q);
        const matchesAddress = p.address?.toLowerCase().includes(q);
        const matchesDesc = p.description?.toLowerCase().includes(q);
        const matchesTag = p.tag?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCity && !matchesAddress && !matchesDesc && !matchesTag) {
          return false;
        }
      }

      // Purpose
      if (filters.purpose !== 'all' && p.purpose !== filters.purpose) {
        return false;
      }

      // Type
      if (filters.type !== 'all' && p.type !== filters.type) {
        return false;
      }

      // City
      if (filters.city !== 'all' && p.city !== filters.city) {
        return false;
      }

      // Min/Max Price
      if (p.price < filters.minPrice || p.price > filters.maxPrice) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms !== 'all') {
        const reqBeds = parseInt(filters.bedrooms);
        if (p.bedrooms < reqBeds) return false;
      }

      // Bathrooms
      if (filters.bathrooms !== 'all') {
        const reqBaths = parseInt(filters.bathrooms);
        if (p.bathrooms < reqBaths) return false;
      }

      // Amenities checklist
      if (filters.amenities && filters.amenities.length > 0) {
        const allPropAmenities = [
          ...(p.amenities?.interior || []),
          ...(p.amenities?.exterior || []),
          ...(p.amenities?.luxury || []),
          ...(p.amenities?.eco || [])
        ].join(' ').toLowerCase();

        const hasAllAmenities = filters.amenities.every((amenity) =>
          allPropAmenities.includes(amenity.toLowerCase())
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'newest') return (b.yearBuilt || 0) - (a.yearBuilt || 0);
      if (filters.sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (filters.sortBy === 'sqft-desc') return b.sqft - a.sqft;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [properties, filters]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage) || 1;
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const toggleAmenity = (amenity) => {
    const current = filters.amenities || [];
    if (current.includes(amenity)) {
      setFilters(prev => ({ ...prev, amenities: current.filter(a => a !== amenity) }));
    } else {
      setFilters(prev => ({ ...prev, amenities: [...current, amenity] }));
    }
    setCurrentPage(1);
  };

  // Active filter count
  const activeFilterCount = [
    filters.query ? 1 : 0,
    filters.purpose !== 'all' ? 1 : 0,
    filters.type !== 'all' ? 1 : 0,
    filters.city !== 'all' ? 1 : 0,
    filters.minPrice > 0 || filters.maxPrice < 30000000 ? 1 : 0,
    filters.bedrooms !== 'all' ? 1 : 0,
    filters.bathrooms !== 'all' ? 1 : 0,
    (filters.amenities && filters.amenities.length > 0) ? filters.amenities.length : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold uppercase tracking-wider mb-2">
            <span>Portfolio Database</span>
            <span>•</span>
            <span>Prime Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Explore Luxury Properties
          </h1>
          <p className="text-sm text-slate-400 mt-2">
            Filter through private estates, contemporary waterfronts, and penthouses.
          </p>
        </div>

        {/* Top Control Bar: Search & View Toggles & Sort */}
        <div className="p-4 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search Query Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-blue-400" />
            <input
              type="text"
              value={filters.query}
              onChange={(e) => {
                setFilters(prev => ({ ...prev, query: e.target.value }));
                setCurrentPage(1);
              }}
              placeholder="Search by location, estate name, architect, keyword..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            {filters.query && (
              <button
                onClick={() => setFilters(prev => ({ ...prev, query: '' }))}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right Controls: Sort & Views & Mobile filter button */}
          <div className="flex items-center gap-2.5 justify-between md:justify-end flex-wrap">
            
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 text-xs font-semibold"
            >
              <Filter className="w-4 h-4" />
              <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 hidden sm:inline">Sort:</span>
              <select
                value={filters.sortBy}
                onChange={(e) => {
                  setFilters(prev => ({ ...prev, sortBy: e.target.value }));
                  setCurrentPage(1);
                }}
                className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="featured">Featured / Curated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Architecture</option>
                <option value="rating">Top Rated</option>
                <option value="sqft-desc">Living Area: Largest</option>
              </select>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>

              <button
                onClick={() => setViewMode('map')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'map' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Interactive Map Split View"
              >
                <Map className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Main Content Area: Sidebar Filter + Results Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28 p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-bold text-white">Refine Search</span>
                </div>
                {activeFilterCount > 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Purpose (Buy / Rent) */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Transaction Purpose
                </label>
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold">
                  {['all', 'sale', 'rent'].map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setFilters(prev => ({ ...prev, purpose: p }));
                        setCurrentPage(1);
                      }}
                      className={`py-1.5 rounded-lg capitalize transition-colors ${
                        filters.purpose === p
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {p === 'all' ? 'All' : p === 'sale' ? 'Buy' : 'Rent'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Architecture Type */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Architecture Type
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => {
                    setFilters(prev => ({ ...prev, type: e.target.value }));
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Styles</option>
                  <option value="Villa">Luxury Villa</option>
                  <option value="Penthouse">Sky Penthouse</option>
                  <option value="Modern Apartment">Modern Apartment</option>
                  <option value="Townhouse">Prime Townhouse</option>
                </select>
              </div>

              {/* City Enclave */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Prime Enclave
                </label>
                <select
                  value={filters.city}
                  onChange={(e) => {
                    setFilters(prev => ({ ...prev, city: e.target.value }));
                    setCurrentPage(1);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Locations</option>
                  <option value="Beverly Hills">Beverly Hills, CA</option>
                  <option value="New York">New York, NY</option>
                  <option value="Miami Beach">Miami Beach, FL</option>
                  <option value="Malibu">Malibu, CA</option>
                  <option value="Aspen">Aspen, CO</option>
                  <option value="Seattle">Seattle, WA</option>
                  <option value="Austin">Austin, TX</option>
                </select>
              </div>

              {/* Price Range Slider */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <label className="font-bold text-slate-300 uppercase tracking-wider">Price Range</label>
                  <span className="text-blue-400 font-semibold">
                    Up to ${(filters.maxPrice / 1000000).toFixed(1)}M
                  </span>
                </div>
                <input
                  type="range"
                  min={10000}
                  max={30000000}
                  step={500000}
                  value={filters.maxPrice}
                  onChange={(e) => {
                    setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }));
                    setCurrentPage(1);
                  }}
                  className="w-full"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>$10K/mo</span>
                  <span>$30M+</span>
                </div>
              </div>

              {/* Bedrooms Filter Pills */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Bedrooms
                </label>
                <div className="grid grid-cols-5 gap-1 text-xs">
                  {['all', '2', '3', '4', '5+'].map((beds) => (
                    <button
                      key={beds}
                      onClick={() => {
                        setFilters(prev => ({ ...prev, bedrooms: beds }));
                        setCurrentPage(1);
                      }}
                      className={`py-1.5 rounded-lg font-semibold transition-all ${
                        filters.bedrooms === beds
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {beds === 'all' ? 'Any' : beds}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bathrooms Filter Pills */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Bathrooms
                </label>
                <div className="grid grid-cols-5 gap-1 text-xs">
                  {['all', '2', '3', '4', '5+'].map((baths) => (
                    <button
                      key={baths}
                      onClick={() => {
                        setFilters(prev => ({ ...prev, bathrooms: baths }));
                        setCurrentPage(1);
                      }}
                      className={`py-1.5 rounded-lg font-semibold transition-all ${
                        filters.bathrooms === baths
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {baths === 'all' ? 'Any' : baths}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amenities Checklist */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Signature Amenities
                </label>
                <div className="space-y-1.5">
                  {ALL_AMENITIES.map((amenity) => {
                    const isChecked = filters.amenities?.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
                          isChecked
                            ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
                            : 'text-slate-400 hover:text-white hover:bg-slate-950'
                        }`}
                      >
                        <span>{amenity}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 text-blue-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </aside>

          {/* RESULTS DISPLAY CONTAINER */}
          <main className={viewMode === 'map' ? 'lg:col-span-3' : 'lg:col-span-3'}>
            
            {/* Results Count & Badges */}
            <div className="flex items-center justify-between mb-4 text-xs text-slate-400">
              <p>
                Showing <strong className="text-white">{filteredProperties.length}</strong> available properties
              </p>
              {activeFilterCount > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All ({activeFilterCount})</span>
                </button>
              )}
            </div>

            {/* Empty State */}
            {filteredProperties.length === 0 ? (
              <div className="text-center py-20 p-8 rounded-3xl bg-slate-900/40 border border-slate-800">
                <Search className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-1">No Matching Properties Found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
                  We could not find any residences matching your specific search filters. Try widening your price range or clearing specific tags.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === 'map' ? (
              /* MAP SPLIT VIEW */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left side: scrollable cards */}
                <div className="space-y-4 max-h-[780px] overflow-y-auto pr-2">
                  {paginatedProperties.map((property) => (
                    <div
                      key={property.id}
                      onMouseEnter={() => setActiveMapPropId(property.id)}
                      className={`transition-all rounded-2xl ${
                        activeMapPropId === property.id ? 'ring-2 ring-blue-500 shadow-xl' : ''
                      }`}
                    >
                      <PropertyCard property={property} layout="grid" />
                    </div>
                  ))}
                </div>

                {/* Right side: Interactive Simulated Luxury Map View */}
                <div className="sticky top-28 h-[780px] rounded-3xl overflow-hidden border border-blue-500/30 relative bg-[#070e1c] shadow-2xl">
                  {/* Stylized vector map grid background */}
                  <div 
                    className="absolute inset-0 opacity-40 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:24px_24px]"
                  />

                  {/* Stylized terrain contours & streets */}
                  <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
                    <path d="M 0 100 Q 200 150 400 80 T 800 200" stroke="#3b82f6" strokeWidth="2" fill="none" />
                    <path d="M 50 0 Q 150 300 350 400 T 600 800" stroke="#3b82f6" strokeWidth="1.5" fill="none" />
                    <path d="M 100 700 Q 300 500 500 650 T 800 500" stroke="#1d4ed8" strokeWidth="2" fill="none" />
                  </svg>

                  {/* Top Map Header HUD */}
                  <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between p-3 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-bold text-white">Interactive Spatial Navigator</span>
                    </div>
                    <span className="text-slate-400">{filteredProperties.length} Geocoded Pins</span>
                  </div>

                  {/* Interactive Property Map Pins */}
                  <div className="absolute inset-0 p-8 flex items-center justify-center">
                    {filteredProperties.slice(0, 8).map((prop, idx) => {
                      // Distributed coordinates on simulated map
                      const offsets = [
                        { top: '25%', left: '30%' },
                        { top: '35%', left: '68%' },
                        { top: '55%', left: '40%' },
                        { top: '70%', left: '75%' },
                        { top: '48%', left: '20%' },
                        { top: '20%', left: '72%' },
                        { top: '75%', left: '28%' },
                        { top: '60%', left: '55%' }
                      ];
                      const pos = offsets[idx % offsets.length];
                      const isActive = activeMapPropId === prop.id;

                      return (
                        <div
                          key={prop.id}
                          style={{ top: pos.top, left: pos.left }}
                          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                          onClick={() => navigateToProperty(prop.id)}
                          onMouseEnter={() => setActiveMapPropId(prop.id)}
                        >
                          <div
                            className={`px-3 py-1.5 rounded-full font-bold text-xs shadow-xl transition-all flex items-center gap-1.5 ${
                              isActive
                                ? 'bg-blue-600 text-white scale-125 z-30 shadow-blue-500/60 ring-4 ring-blue-400/30'
                                : 'bg-slate-950/90 text-blue-300 border border-blue-500/40 hover:bg-blue-600 hover:text-white'
                            }`}
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            <span>
                              {prop.purpose === 'rent'
                                ? `$${(prop.price / 1000).toFixed(0)}k/mo`
                                : `$${(prop.price / 1000000).toFixed(1)}M`}
                            </span>
                          </div>

                          {/* Hover Tooltip Card */}
                          <div className={`absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2 rounded-xl bg-slate-950 border border-blue-500/40 shadow-2xl pointer-events-none transition-all ${
                            isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                          }`}>
                            <img 
                              src={prop.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'} 
                              alt={prop.title} 
                              className="w-full h-20 object-cover rounded-lg mb-1.5" 
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80';
                              }}
                            />
                            <p className="text-[11px] font-bold text-white truncate">{prop.title}</p>
                            <p className="text-[10px] text-blue-400">{prop.city}, {prop.state}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Map Legend */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 p-2.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Click any price badge to inspect full estate prospectus.</span>
                    <span className="text-blue-400 font-semibold">Map View</span>
                  </div>
                </div>
              </div>
            ) : (
              /* GRID OR LIST VIEW */
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-2'
                    : 'grid-cols-1'
                }`}
              >
                {paginatedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    layout={viewMode === 'list' ? 'list' : 'grid'}
                  />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-between border-t border-slate-800 pt-6">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNum = idx + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                          currentPage === pageNum
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                            : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </main>

        </div>

      </div>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilterOpen(false)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xs bg-slate-950 border-l border-slate-800 h-full p-6 overflow-y-auto z-10 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="text-base font-bold text-white">Filter Residences</h3>
                  <button onClick={() => setMobileFilterOpen(false)} className="text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Purpose */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Purpose</label>
                  <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-xl text-xs">
                    {['all', 'sale', 'rent'].map((p) => (
                      <button
                        key={p}
                        onClick={() => setFilters(prev => ({ ...prev, purpose: p }))}
                        className={`py-1.5 rounded-lg capitalize ${
                          filters.purpose === p ? 'bg-blue-600 text-white' : 'text-slate-400'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Style</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full p-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white"
                  >
                    <option value="all">All Styles</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Modern Apartment">Apartment</option>
                    <option value="Townhouse">Townhouse</option>
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Location</label>
                  <select
                    value={filters.city}
                    onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full p-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white"
                  >
                    <option value="all">All Locations</option>
                    <option value="Beverly Hills">Beverly Hills</option>
                    <option value="New York">New York</option>
                    <option value="Miami Beach">Miami Beach</option>
                    <option value="Malibu">Malibu</option>
                    <option value="Aspen">Aspen</option>
                    <option value="Seattle">Seattle</option>
                  </select>
                </div>

                {/* Max Price */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Max Price: ${(filters.maxPrice / 1000000).toFixed(1)}M
                  </label>
                  <input
                    type="range"
                    min={10000}
                    max={30000000}
                    step={500000}
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full py-3 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-600/30"
                >
                  Apply Filters ({filteredProperties.length} Homes)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
