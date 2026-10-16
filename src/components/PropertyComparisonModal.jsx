import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Layers, 
  Check, 
  Minus, 
  ArrowRight, 
  Trash2, 
  Maximize2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PropertyComparisonModal() {
  const { 
    properties, 
    compareList, 
    removeFromCompare, 
    clearCompare, 
    compareModalOpen, 
    setCompareModalOpen, 
    navigateToProperty,
    openScheduleModal,
    setActivePage,
    activePage
  } = useApp();

  const [highlightDiff, setHighlightDiff] = useState(false);
  const [dockDismissed, setDockDismissed] = useState(false);

  // If user adds another property to compare, re-open the dock in case it was dismissed
  const prevCountRef = useRef(compareList.length);
  useEffect(() => {
    if (compareList.length > prevCountRef.current) {
      setDockDismissed(false);
    }
    prevCountRef.current = compareList.length;
  }, [compareList.length]);

  const comparedProperties = properties.filter((p) => compareList.includes(p.id));

  // The dock ONLY shows when user has active comparison items, modal is not open, not on compare page, and not dismissed
  const showFloatingDock = 
    compareList.length > 0 && 
    !compareModalOpen && 
    activePage !== 'compare' && 
    !dockDismissed;

  return (
    <>
      {/* Floating Bottom Comparison Dock - Only shows when user compares */}
      <AnimatePresence>
        {showFloatingDock && (
          <motion.div
            key="floating-compare-dock"
            initial={{ y: 80, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 80, opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-2xl"
          >
            <div className="p-3.5 rounded-2xl bg-slate-950/90 backdrop-blur-2xl border border-blue-500/30 shadow-2xl shadow-blue-950/60 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-bold text-white">Compare Homes</p>
                  <p className="text-xs text-blue-400">{compareList.length} of 4 selected</p>
                </div>

                {/* Thumbnails preview */}
                <div className="flex items-center -space-x-2">
                  {comparedProperties.map((prop) => (
                    <div key={prop.id} className="relative group/thumb">
                      <img
                        src={prop.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80'}
                        alt={prop.title}
                        className="w-10 h-10 rounded-xl object-cover border-2 border-slate-900 shadow-md"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                      <button
                        onClick={() => removeFromCompare(prop.id)}
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity"
                        title="Remove"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={clearCompare}
                  className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Clear
                </button>

                <button
                  onClick={() => setCompareModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-105 cursor-pointer"
                >
                  <span>View Comparison</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => setDockDismissed(true)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-0.5 cursor-pointer"
                  title="Hide compare bar"
                  aria-label="Hide compare bar"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Screen Comparison Modal */}
      <AnimatePresence>
        {compareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCompareModalOpen(false)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-slate-950 border border-blue-500/25 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-900/60">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Side-by-Side Property Comparison</h3>
                    <p className="text-xs text-slate-400">
                      Comparing {comparedProperties.length} luxury residences across key metrics
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
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
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-lg border border-rose-500/20"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>

                  <button
                    onClick={() => setCompareModalOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Comparison Table / Grid */}
              <div className="flex-1 overflow-auto p-6">
                <div className="min-w-[700px]">
                  
                  {/* Top Property Cards Row */}
                  <div className="grid grid-cols-5 gap-4 pb-6 border-b border-slate-800">
                    <div className="col-span-1 flex flex-col justify-end p-2">
                      <p className="text-xs uppercase font-bold text-blue-400 tracking-wider">Properties</p>
                      <p className="text-xs text-slate-400 mt-1">Select up to 4 homes to benchmark specifications</p>
                    </div>

                    {comparedProperties.map((property) => (
                      <div key={property.id} className="col-span-1 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 relative group">
                        <button
                          onClick={() => removeFromCompare(property.id)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/80 text-slate-400 hover:text-rose-400 border border-slate-700 z-10"
                          title="Remove property"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <img
                          src={property.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
                          alt={property.title}
                          className="w-full h-32 object-cover rounded-xl mb-3 cursor-pointer"
                          onClick={() => {
                            setCompareModalOpen(false);
                            navigateToProperty(property.id);
                          }}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                          }}
                        />

                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-600/30 text-blue-300">
                          {property.tag || property.type}
                        </span>

                        <h4 
                          onClick={() => {
                            setCompareModalOpen(false);
                            navigateToProperty(property.id);
                          }}
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
                            onClick={() => {
                              setCompareModalOpen(false);
                              openScheduleModal(property);
                            }}
                            className="w-full py-1.5 px-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                          >
                            Book VIP Tour
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Placeholder Slot if < 4 properties */}
                    {Array.from({ length: 4 - comparedProperties.length }).map((_, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => {
                          setCompareModalOpen(false);
                          setActivePage('listings');
                        }}
                        className="col-span-1 border-2 border-dashed border-slate-800 rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:border-blue-500/40 hover:bg-slate-900/30 transition-all"
                      >
                        <Layers className="w-8 h-8 text-slate-600 mb-2" />
                        <p className="text-xs font-semibold text-slate-400">Add Property</p>
                        <p className="text-[10px] text-slate-600 mt-0.5">Select from listings</p>
                      </div>
                    ))}
                  </div>

                  {/* Comparison Rows */}
                  {[
                    { label: 'Location & City', key: 'city', format: (p) => `${p.city}, ${p.state}` },
                    { label: 'Property Type', key: 'type', format: (p) => p.type },
                    { label: 'Bedrooms', key: 'bedrooms', format: (p) => `${p.bedrooms} Beds` },
                    { label: 'Bathrooms', key: 'bathrooms', format: (p) => `${p.bathrooms} Baths` },
                    { label: 'Living Area', key: 'sqft', format: (p) => `${p.sqft.toLocaleString()} Sq Ft` },
                    { label: 'Price / Sq Ft', key: 'pricePerSqft', format: (p) => `$${p.pricePerSqft?.toLocaleString() || Math.round(p.price/p.sqft)}` },
                    { label: 'Lot Size', key: 'lotSize', format: (p) => p.lotSize || 'N/A' },
                    { label: 'Year Built', key: 'yearBuilt', format: (p) => p.yearBuilt },
                    { label: 'Garage Spaces', key: 'garage', format: (p) => `${p.garage} Vehicles` },
                    { label: 'HOA Monthly', key: 'hoaFee', format: (p) => p.hoaFee ? `$${p.hoaFee.toLocaleString()}/mo` : 'No HOA' },
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
                  ].map((row, rIdx) => {
                    const values = comparedProperties.map(p => row.format(p));
                    const isDifferent = new Set(values).size > 1;

                    return (
                      <div
                        key={rIdx}
                        className={`grid grid-cols-5 gap-4 py-3.5 px-2 text-xs border-b border-slate-800/60 items-center ${
                          highlightDiff && isDifferent ? 'bg-blue-950/20 text-blue-200' : 'text-slate-300'
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

                        {/* Blank placeholders */}
                        {Array.from({ length: 4 - comparedProperties.length }).map((_, idx) => (
                          <div key={idx} className="col-span-1 text-slate-600">-</div>
                        ))}
                      </div>
                    );
                  })}

                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Tip: Use this benchmark matrix to analyze price efficiencies and architectural value.
                </p>
                <button
                  onClick={() => setCompareModalOpen(false)}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                >
                  Close Matrix
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
