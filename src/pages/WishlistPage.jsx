import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Trash2, 
  Layers, 
  ArrowRight, 
  Building2, 
  Sparkles,
  DollarSign,
  Maximize2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';

export default function WishlistPage() {
  const { 
    properties, 
    wishlist, 
    clearWishlist, 
    setActivePage, 
    setCompareModalOpen, 
    compareList, 
    addToCompare 
  } = useApp();

  const savedProperties = properties.filter((p) => wishlist.includes(p.id));

  // Compute portfolio metrics
  const totalValuation = savedProperties.reduce((sum, p) => sum + (p.price || 0), 0);
  const avgPricePerSqft = savedProperties.length > 0
    ? Math.round(totalValuation / savedProperties.reduce((sum, p) => sum + (p.sqft || 1), 0))
    : 0;

  const handleCompareAll = () => {
    savedProperties.slice(0, 4).forEach((p) => {
      if (!compareList.includes(p.id)) {
        addToCompare(p.id);
      }
    });
    setCompareModalOpen(true);
  };

  return (
    <div className="min-h-screen text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase text-rose-400 mb-2">
              <Heart className="w-4 h-4 fill-rose-400" />
              <span>Personal Portfolio Wishlist</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Saved Residences
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Privately bookmarked luxury residences saved for consultation and comparison.
            </p>
          </div>

          {savedProperties.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCompareAll}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all hover:scale-105"
              >
                <Layers className="w-4 h-4" />
                <span>Compare Saved ({Math.min(4, savedProperties.length)})</span>
              </button>

              <button
                onClick={clearWishlist}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-rose-500/10 text-rose-400 text-xs font-semibold transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Wishlist</span>
              </button>
            </div>
          )}
        </div>

        {/* Portfolio Valuation Summary Strip */}
        {savedProperties.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
              <p className="text-xs uppercase font-bold text-slate-400">Total Bookmarked</p>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">
                {savedProperties.length} Properties
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
              <p className="text-xs uppercase font-bold text-slate-400">Combined Portfolio Value</p>
              <p className="text-2xl sm:text-3xl font-black text-blue-400 mt-1">
                ${(totalValuation / 1000000).toFixed(1)} Million
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center">
              <p className="text-xs uppercase font-bold text-slate-400">Average Price / Sq Ft</p>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">
                ${avgPricePerSqft.toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* Saved Properties Grid */}
        {savedProperties.length === 0 ? (
          <div className="text-center py-20 p-8 rounded-3xl bg-slate-900/40 border border-slate-800">
            <Heart className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-1">Your Wishlist is Empty</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
              You haven't bookmarked any residences yet. Click the heart icon on any property card to save it for quick reference.
            </p>
            <button
              onClick={() => setActivePage('listings')}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30"
            >
              Explore Available Estates
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
