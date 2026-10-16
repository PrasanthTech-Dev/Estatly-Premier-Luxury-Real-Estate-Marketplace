import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Layers, 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function PropertyCard({ property, layout = 'grid' }) {
  const { 
    navigateToProperty, 
    toggleWishlist, 
    isInWishlist, 
    addToCompare, 
    isInCompare,
    openScheduleModal
  } = useApp();

  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const images = property.images && property.images.length > 0 
    ? property.images 
    : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'];

  const DEFAULT_ROOM_NAMES = [
    'Exterior & Pool',
    'Grand Living Hall',
    'Master Bedroom Suite',
    'Gourmet Chef Kitchen',
    'Spa Bathroom',
    'Sunset Balcony & Terrace'
  ];

  const currentRoomLabel = property.roomPhotos?.[currentImgIndex]?.room || DEFAULT_ROOM_NAMES[currentImgIndex % DEFAULT_ROOM_NAMES.length];

  const isFavorite = isInWishlist(property.id);
  const isCompared = isInCompare(property.id);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const formatPrice = (price, purpose) => {
    if (purpose === 'rent') {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  // Rough estimate of monthly mortgage (for sale properties)
  const calcEstimatedMonthly = (price, purpose) => {
    if (purpose === 'rent') return 'Available for Lease';
    // 20% down, 6.5% interest, 30 years -> ~0.00505 per dollar financed
    const loanAmount = price * 0.8;
    const monthlyPrincipalInterest = loanAmount * 0.00632;
    const taxesHOA = (price * 0.012) / 12 + 600;
    const total = Math.round(monthlyPrincipalInterest + taxesHOA);
    return `Est. $${total.toLocaleString()}/mo`;
  };

  const isListView = layout === 'list';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`group relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0c1222]/90 border border-slate-800/80 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-950/40 transition-all duration-300 overflow-hidden flex ${
        isListView ? 'flex-col md:flex-row' : 'flex-col'
      }`}
    >
      {/* Property Image Container */}
      <div 
        className={`relative overflow-hidden cursor-pointer select-none ${
          isListView ? 'w-full md:w-2/5 h-64 md:h-auto' : 'w-full h-64 sm:h-72'
        }`}
        onClick={() => navigateToProperty(property.id)}
      >
        <img
          src={images[currentImgIndex] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85'}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85';
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex items-center gap-1.5 flex-wrap">
            {property.tag && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600/90 backdrop-blur-md text-white shadow-md shadow-blue-900/40 border border-blue-400/30">
                {property.tag}
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-slate-950/75 backdrop-blur-md text-slate-300 border border-white/10">
              {property.purpose === 'sale' ? 'For Sale' : 'For Rent'}
            </span>
          </div>

          {/* Quick Action Buttons (Favorite & Compare) */}
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCompare(property.id);
              }}
              className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                isCompared
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                  : 'bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-900/90 border border-white/10'
              }`}
              title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
              aria-label="Compare property"
            >
              <Layers className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(property.id);
              }}
              className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                isFavorite
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/50 scale-105'
                  : 'bg-slate-950/70 text-slate-300 hover:text-rose-400 hover:bg-slate-900/90 border border-white/10'
              }`}
              title={isFavorite ? 'Remove from saved' : 'Save to wishlist'}
              aria-label="Save property"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Active Room Badge Overlay (Bottom Left) */}
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none transition-all duration-300">
          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase bg-slate-950/85 backdrop-blur-md text-blue-200 border border-white/15 shadow-lg flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-blue-400 shrink-0" />
            <span className="truncate max-w-[200px] sm:max-w-[230px]">{currentRoomLabel}</span>
          </span>
        </div>

        {/* Image Slider Controls (Appear on hover) */}
        {images.length > 1 && (
          <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
            <button
              onClick={prevImage}
              className="pointer-events-auto p-1.5 rounded-full bg-slate-950/80 text-white hover:bg-blue-600 transition-all border border-white/20 shadow-md hover:scale-110 active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="pointer-events-auto p-1.5 rounded-full bg-slate-950/80 text-white hover:bg-blue-600 transition-all border border-white/20 shadow-md hover:scale-110 active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Image Dots Indicator (Interactive with Room Tooltips) */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 z-10 pointer-events-auto bg-slate-950/65 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
            {images.map((_, idx) => {
              const dotRoom = property.roomPhotos?.[idx]?.room || DEFAULT_ROOM_NAMES[idx % DEFAULT_ROOM_NAMES.length];
              return (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImgIndex(idx);
                  }}
                  title={dotRoom}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentImgIndex ? 'w-4 bg-blue-400' : 'w-1.5 bg-white/40 hover:bg-white/80'
                  }`}
                  aria-label={`View ${dotRoom}`}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Property Details Container */}
      <div className={`p-5 flex flex-col justify-between ${isListView ? 'w-full md:w-3/5' : 'w-full'}`}>
        <div>
          {/* Price & Monthly estimate */}
          <div className="flex items-baseline justify-between gap-2 mb-2">
            <div>
              <span className="text-2xl font-bold tracking-tight text-white group-hover:text-blue-300 transition-colors">
                {formatPrice(property.price, property.purpose)}
              </span>
              <p className="text-xs text-blue-400/90 font-medium">
                {calcEstimatedMonthly(property.price, property.purpose)}
              </p>
            </div>
            
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
              {property.type}
            </span>
          </div>

          {/* Title & Location */}
          <h3 
            onClick={() => navigateToProperty(property.id)}
            className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1 cursor-pointer mb-1.5"
            title={property.title}
          >
            {property.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
            <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span className="truncate">{property.address}, {property.city}, {property.state}</span>
          </div>

          {/* Quick Room Category Preview Pills */}
          <div className="flex items-center gap-1 mb-3.5 flex-wrap sm:flex-nowrap overflow-x-auto pb-1 scrollbar-none">
            {[
              { label: 'Elevation', idx: 0 },
              { label: 'Living', idx: 1 },
              { label: 'Bedroom', idx: 2 },
              { label: 'Kitchen', idx: 3 },
              { label: 'Bathroom', idx: 4 },
              { label: 'Balcony', idx: 5 }
            ].map((rm) => (
              <button
                key={rm.idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImgIndex(rm.idx);
                }}
                className={`px-2 py-0.5 rounded-lg text-[9.5px] font-semibold transition-all shrink-0 flex items-center gap-1 ${
                  currentImgIndex === rm.idx
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/40 border border-blue-400/30'
                    : 'bg-slate-950/70 text-slate-400 hover:text-white hover:bg-slate-800 border border-white/5'
                }`}
              >
                <span>{rm.label}</span>
              </button>
            ))}
          </div>

          {/* Key Specs Pills */}
          <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-4 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Bed className="w-4 h-4 text-blue-400" />
              <div>
                <span className="font-bold text-white">{property.bedrooms}</span>
                <span className="text-[11px] text-slate-400 ml-1">Beds</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-300 border-x border-slate-800 px-2">
              <Bath className="w-4 h-4 text-blue-400" />
              <div>
                <span className="font-bold text-white">{property.bathrooms}</span>
                <span className="text-[11px] text-slate-400 ml-1">Baths</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <Maximize2 className="w-4 h-4 text-blue-400" />
              <div>
                <span className="font-bold text-white">{property.sqft.toLocaleString()}</span>
                <span className="text-[11px] text-slate-400 ml-1">SqFt</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info: Agent badge & View Details CTA */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
          {property.agent ? (
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={property.agent.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'}
                alt={property.agent.name}
                className="w-7 h-7 rounded-full object-cover border border-blue-400/40 shrink-0"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80';
                }}
              />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">{property.agent.name}</p>
                <p className="text-[10px] text-slate-400 truncate">Senior Luxury Advisor</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-blue-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Listing</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => openScheduleModal(property)}
              className="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              Book Tour
            </button>

            <button
              onClick={() => navigateToProperty(property.id)}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-900/30 group-hover:shadow-blue-600/30"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
