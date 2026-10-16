import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Trash2, 
  Check, 
  Minus, 
  ArrowRight, 
  X, 
  Plus, 
  Sparkles,
  Bed,
  Bath,
  Maximize2,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ComparePage() {
  const { 
    properties, 
    compareList, 
    removeFromCompare, 
    clearCompare, 
    addToCompare, 
    setActivePage, 
    navigateToProperty, 
    openScheduleModal 
  } = useApp();

  const [highlightDiff, setHighlightDiff] = useState(false);

  const comparedProperties = properties.filter((p) => compareList.includes(p.id));

  // Quick preset adder if empty
  const addDefaultPreset = () => {
    properties.slice(0, 3).forEach((p) => {
      if (!compareList.includes(p.id)) {
        addToCompare(p.id);
      }
    });
  };

  const rows = [
    { label: 'Enclave & City', key: 'city', format: (p) => `${p.city}, ${p.state}` },
    { label: 'Architecture Type', key: 'type', format: (p) => p.type },
    { label: 'Transaction Type', key: 'purpose', format: (p) => p.purpose === 'sale' ? 'For Sale' : 'For Lease' },
    { label: 'Bedrooms', key: 'bedrooms', format: (p) => `${p.bedrooms} Beds` },
    { label: 'Bathrooms', key: 'bathrooms', format: (p) => `${p.bathrooms} Baths` },
    { label: 'Living Area', key: 'sqft', format: (p) => `${p.sqft.toLocaleString()} Sq Ft` },
    { label: 'Price / Sq Ft', key: 'pricePerSqft', format: (p) => `$${p.pricePerSqft?.toLocaleString() || Math.round(p.price/p.sqft)}` },
    { label: 'Lot Dimension', key: 'lotSize', format: (p) => p.lotSize || 'N/A' },
    { label: 'Year Built', key: 'yearBuilt', format: (p) => p.yearBuilt },
    { label: 'Garage Spaces', key: 'garage', format: (p) => `${p.garage} Vehicles` },
    { label: 'HOA Monthly Dues', key: 'hoaFee', format: (p) => p.hoaFee ? `$${p.hoaFee.toLocaleString()}/mo` : 'No HOA' },
    { label: 'Walk Score', key: 'walkScore', format: (p) => `${p.neighborhood?.walkScore || 80} / 100` },
    { 
      label: 'Private Pool', 
      key: 'pool', 
      format: (p) => p.amenities?.exterior?.some(a => a.toLowerCase().includes('pool')) ? 'Included' : 'No Pool' 
    },
    { 
      label: 'Smart Home Automation', 
      key: 'smartHome', 
      format: (p) => p.amenities?.interior?.some(a => a.toLowerCase().includes('smart') || a.toLowerCase().includes('automation')) ? 'Installed' : 'Standard' 
    },
    { 
      label: 'Private Wine Storage', 
      key: 'wine', 
      format: (p) => p.amenities?.interior?.some(a => a.toLowerCase().includes('wine')) ? 'Custom Cellar' : 'No' 
    }
  ];

  return (
    <div className="min-h-screen text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase text-blue-400 mb-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Side-by-Side Architectural Benchmark</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Property Comparison
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Compare architectural metrics, pricing efficiencies, and luxury specifications.
            </p>
          </div>

          {comparedProperties.length > 0 && (
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl">
                <input
                  type="checkbox"
                  checked={highlightDiff}
                  onChange={(e) => setHighlightDiff(e.target.checked)}
                  className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-0"
                />
                <span>Highlight Differences</span>
              </label>

              <button
                onClick={clearCompare}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl border border-rose-500/20"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {/* Empty state */}
        {comparedProperties.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-3xl bg-slate-900/40 border border-slate-800">
            <Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-1">No Properties Selected for Comparison</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
              Select up to 4 residences from our collection to inspect differences side by side.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={addDefaultPreset}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30"
              >
                Compare Top 3 Featured Estates
              </button>
              <button
                onClick={() => setActivePage('listings')}
                className="px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold"
              >
                Browse Listings
              </button>
            </div>
          </div>
        ) : (
          /* Comparison Matrix Table */
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-blue-500/20 shadow-2xl overflow-x-auto">
            <div className="min-w-[850px]">
              
              {/* Properties Top Row */}
              <div className="grid grid-cols-5 gap-4 pb-6 border-b border-slate-800">
                <div className="col-span-1 flex flex-col justify-end p-2">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Residences</span>
                  <p className="text-xs text-slate-400 mt-1">Benchmarking {comparedProperties.length} of 4</p>
                </div>

                {comparedProperties.map((property) => (
                  <div key={property.id} className="col-span-1 p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 relative group">
                    <button
                      onClick={() => removeFromCompare(property.id)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/90 text-slate-400 hover:text-rose-400 border border-slate-700 z-10"
                      title="Remove from comparison"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <img
                      src={property.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
                      alt={property.title}
                      className="w-full h-32 object-cover rounded-xl mb-3 cursor-pointer"
                      onClick={() => navigateToProperty(property.id)}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                      }}
                    />

                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-600/30 text-blue-300">
                      {property.tag || property.type}
                    </span>

                    <h4
                      onClick={() => navigateToProperty(property.id)}
                      className="text-sm font-bold text-white mt-1.5 line-clamp-1 hover:text-blue-400 cursor-pointer"
                    >
                      {property.title}
                    </h4>

                    <p className="text-base font-extrabold text-blue-400 mt-1">
                      {property.purpose === 'rent'
                        ? `$${property.price.toLocaleString()}/mo`
                        : `$${property.price.toLocaleString()}`}
                    </p>

                    <div className="mt-3 flex flex-col gap-1.5">
                      <button
                        onClick={() => openScheduleModal(property)}
                        className="w-full py-1.5 px-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                      >
                        Book VIP Tour
                      </button>
                    </div>
                  </div>
                ))}

                {/* Blank Slot Adder */}
                {Array.from({ length: 4 - comparedProperties.length }).map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActivePage('listings')}
                    className="col-span-1 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:border-blue-500/40 hover:bg-slate-900/30 transition-all"
                  >
                    <Plus className="w-8 h-8 text-slate-600 mb-2" />
                    <p className="text-xs font-semibold text-slate-400">Add Property</p>
                    <p className="text-[10px] text-slate-600 mt-0.5">Select from inventory</p>
                  </div>
                ))}
              </div>

              {/* Rows Comparison */}
              {rows.map((row, rIdx) => {
                const values = comparedProperties.map(p => row.format(p));
                const isDifferent = new Set(values).size > 1;

                return (
                  <div
                    key={rIdx}
                    className={`grid grid-cols-5 gap-4 py-3.5 px-2 text-xs border-b border-slate-800/60 items-center ${
                      highlightDiff && isDifferent ? 'bg-blue-950/25 text-blue-200' : 'text-slate-300'
                    }`}
                  >
                    <div className="col-span-1 font-semibold text-slate-400">
                      {row.label}
                    </div>

                    {comparedProperties.map((p) => {
                      const val = row.format(p);
                      return (
                        <div key={p.id} className="col-span-1 font-medium text-white flex items-center gap-1.5">
                          {val === 'Included' || val === 'Installed' || val === 'Custom Cellar' ? (
                            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                              <Check className="w-3.5 h-3.5" />
                              <span>{val}</span>
                            </span>
                          ) : val === 'No' || val === 'No Pool' ? (
                            <span className="flex items-center gap-1 text-slate-500">
                              <Minus className="w-3.5 h-3.5" />
                              <span>{val}</span>
                            </span>
                          ) : (
                            <span>{val}</span>
                          )}
                        </div>
                      );
                    })}

                    {Array.from({ length: 4 - comparedProperties.length }).map((_, idx) => (
                      <div key={idx} className="col-span-1 text-slate-600">-</div>
                    ))}
                  </div>
                );
              })}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
