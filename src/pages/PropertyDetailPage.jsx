import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Heart, 
  Layers, 
  Share2, 
  MapPin, 
  Bed, 
  Bath, 
  Maximize2, 
  Calendar, 
  Car, 
  ShieldCheck, 
  Sparkles, 
  Calculator, 
  Phone, 
  Mail, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Compass,
  Star,
  Home,
  Utensils,
  Sun,
  Eye
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyCard from '../components/PropertyCard';

const DEFAULT_ROOM_NAMES = [
  'Main Elevation & Infinity Pool',
  'Grand Living Hall & Lounge',
  'Master Bedroom Suite',
  'Gourmet Chef Kitchen',
  'Marble Spa Bathroom',
  'Sunset Balcony & Sky Terrace'
];

const FALLBACK_PROPERTY_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85';
const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80';

export default function PropertyDetailPage() {
  const { 
    properties, 
    selectedPropertyId, 
    setActivePage, 
    toggleWishlist, 
    isInWishlist, 
    addToCompare, 
    isInCompare, 
    openScheduleModal,
    showToast 
  } = useApp();

  const property = properties.find((p) => p.id === selectedPropertyId) || properties[0];

  // Active gallery image index
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  // Full-screen lightbox modal
  const [lightboxOpen, setLightboxOpen] = useState(false);
  // Active room category filter
  const [selectedRoomCategory, setSelectedRoomCategory] = useState('all');
  // Floor plan active level
  const [activeFloorIdx, setActiveFloorIdx] = useState(0);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') setActiveImgIdx((prev) => (prev + 1) % property.images.length);
      if (e.key === 'ArrowLeft') setActiveImgIdx((prev) => (prev - 1 + property.images.length) % property.images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, property.images.length]);

  // Mortgage Calculator state
  const [calcPrice, setCalcPrice] = useState(property.price || 15000000);
  const [calcDownPercent, setCalcDownPercent] = useState(20);
  const [calcInterestRate, setCalcInterestRate] = useState(6.25);
  const [calcLoanTerm, setCalcLoanTerm] = useState(30);

  // Agent inquiry form
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState(
    `Hello, I am interested in scheduling a confidential viewing of "${property.title}". Please send me the private prospectus.`
  );
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const isFavorite = isInWishlist(property.id);
  const isCompared = isInCompare(property.id);

  // Mortgage formula
  const loanAmt = calcPrice * (1 - calcDownPercent / 100);
  const monthlyRate = calcInterestRate / 100 / 12;
  const numPayments = calcLoanTerm * 12;
  const monthlyPrincipal = loanAmt > 0
    ? Math.round((loanAmt * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1))
    : 0;
  const monthlyTax = Math.round((calcPrice * 0.012) / 12);
  const monthlyInsurance = Math.round((calcPrice * 0.0035) / 12);
  const monthlyHOA = property.hoaFee || 600;
  const totalMonthly = monthlyPrincipal + monthlyTax + monthlyInsurance + monthlyHOA;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Listing URL copied to clipboard!', 'success');
    } else {
      showToast('Sharing link prepared', 'info');
    }
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setInquirySubmitted(true);
    showToast(`Inquiry dispatched to ${property.agent?.name || 'Exclusive Advisor'}!`, 'success');
  };

  const similarProperties = properties
    .filter((p) => p.id !== property.id && (p.city === property.city || p.type === property.type))
    .slice(0, 3);

  return (
    <div className="min-h-screen text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <button
            onClick={() => setActivePage('listings')}
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Residences</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs font-semibold transition-all"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Share</span>
            </button>

            <button
              onClick={() => addToCompare(property.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                isCompared
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{isCompared ? 'Compared' : 'Compare'}</span>
            </button>

            <button
              onClick={() => toggleWishlist(property.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                isFavorite
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-rose-400'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-400 text-rose-400' : ''}`} />
              <span>{isFavorite ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={() => openScheduleModal(property)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all hover:scale-105"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Tour</span>
            </button>
          </div>
        </div>

        {/* Property Title & Pricing Strip */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600 text-white">
                {property.tag || 'Exclusive'}
              </span>
              <span className="px-3 py-0.5 rounded-full text-xs font-semibold uppercase bg-slate-900 text-slate-300 border border-slate-700">
                {property.purpose === 'sale' ? 'For Sale' : 'For Lease'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-2">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-slate-400">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>{property.address}, {property.city}, {property.state} {property.zip}</span>
            </div>
          </div>

          <div className="text-left lg:text-right">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">
              {property.purpose === 'sale' ? 'Offered At' : 'Monthly Lease'}
            </p>
            <div className="text-3xl sm:text-4xl font-extrabold text-white text-gradient">
              {property.purpose === 'rent'
                ? `$${property.price.toLocaleString()}/mo`
                : `$${property.price.toLocaleString()}`}
            </div>
            <p className="text-xs text-blue-400 mt-1 font-semibold">
              ${property.pricePerSqft?.toLocaleString() || Math.round(property.price / property.sqft)} / Sq Ft
            </p>
          </div>
        </div>

        {/* ROOM FILTER TABS BAR */}
        <div className="mb-4">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Explore Residence Rooms</span>
            </span>
            <span className="text-xs text-blue-400/90 font-medium hidden sm:inline">
              Click any room to view full-resolution photo
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'All Photos', icon: Layers, idx: 0 },
              { id: 'living', label: 'Living Hall', icon: Sparkles, idx: 1 },
              { id: 'bedroom', label: 'Master Bedroom', icon: Bed, idx: 2 },
              { id: 'kitchen', label: 'Chef Kitchen', icon: Utensils, idx: 3 },
              { id: 'bathroom', label: 'Spa Bathroom', icon: Bath, idx: 4 },
              { id: 'balcony', label: 'Sunset Balcony', icon: Sun, idx: 5 },
              { id: 'exterior', label: 'Exterior & Pool', icon: Home, idx: 0 },
            ].map((cat) => {
              const isSelected = selectedRoomCategory === cat.id;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedRoomCategory(cat.id);
                    if (cat.idx < (property.images?.length || 0)) {
                      setActiveImgIdx(cat.idx);
                    }
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40 border border-blue-400/40 scale-[1.02]'
                      : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-400'}`} />
                  <span>{cat.label}</span>
                  {cat.id === 'all' && (
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-blue-200">
                      {property.images.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* LUXURY IMAGE GALLERY (Mosaic Grid or Room Spotlight) */}
        <div className="mb-10">
          {selectedRoomCategory === 'all' ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 h-[420px] sm:h-[520px]">
              {/* Primary Hero Image */}
              <div 
                onClick={() => {
                  setActiveImgIdx(0);
                  setLightboxOpen(true);
                }}
                className="lg:col-span-2 relative h-full rounded-3xl overflow-hidden cursor-pointer group border border-slate-800 shadow-xl"
              >
                <img
                  src={property.images[0] || FALLBACK_PROPERTY_IMAGE}
                  alt={property.roomPhotos?.[0]?.room || property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_PROPERTY_IMAGE;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md text-xs font-semibold text-white border border-white/15 shadow-xl">
                  <Home className="w-3.5 h-3.5 text-blue-400" />
                  <span>{property.roomPhotos?.[0]?.room || 'Exterior & Pool'}</span>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity px-2.5 py-1 rounded-lg bg-blue-600/90 backdrop-blur-sm text-[11px] font-bold text-white shadow-lg flex items-center gap-1">
                  <Maximize2 className="w-3 h-3" />
                  <span>Expand</span>
                </div>
              </div>

              {/* Secondary Image Grid */}
              <div className="hidden lg:grid col-span-2 grid-cols-2 gap-3 h-full">
                {property.images.slice(1, 5).map((imgUrl, i) => {
                  const photoIdx = i + 1;
                  const roomTitle = property.roomPhotos?.[photoIdx]?.room || DEFAULT_ROOM_NAMES[photoIdx % DEFAULT_ROOM_NAMES.length];
                  return (
                    <div
                      key={i}
                      onClick={() => {
                        setActiveImgIdx(photoIdx);
                        setLightboxOpen(true);
                      }}
                      className="relative rounded-2xl overflow-hidden cursor-pointer group border border-slate-800"
                    >
                      <img
                        src={imgUrl || FALLBACK_PROPERTY_IMAGE}
                        alt={roomTitle}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = FALLBACK_PROPERTY_IMAGE;
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-85 group-hover:opacity-60 transition-opacity" />
                      
                      {/* Room Title Pill Badge */}
                      <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
                        <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide uppercase bg-slate-950/85 backdrop-blur-md text-blue-200 border border-white/15 shadow-md flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-blue-400 shrink-0" />
                          <span className="truncate max-w-[130px] sm:max-w-[150px]">{roomTitle}</span>
                        </span>
                      </div>

                      {i === 3 && property.images.length > 5 && (
                        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center gap-1 z-20 group-hover:bg-slate-950/70 transition-colors">
                          <span className="text-sm font-bold text-white flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <span>+{property.images.length - 4} More Rooms</span>
                          </span>
                          <span className="text-[11px] text-blue-300 font-medium">Balcony & Terraces</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Selected Room Spotlight View */
            <div 
              onClick={() => setLightboxOpen(true)}
              className="relative w-full h-[420px] sm:h-[520px] rounded-3xl overflow-hidden cursor-pointer group border border-blue-500/40 shadow-2xl"
            >
              <img
                src={property.images[activeImgIdx] || FALLBACK_PROPERTY_IMAGE}
                alt={property.roomPhotos?.[activeImgIdx]?.room || DEFAULT_ROOM_NAMES[activeImgIdx % DEFAULT_ROOM_NAMES.length]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_PROPERTY_IMAGE;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-black/30" />

              {/* Room Details Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-blue-600 text-white shadow-lg shadow-blue-600/40 border border-blue-400/40 inline-flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Featured Room View</span>
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {property.roomPhotos?.[activeImgIdx]?.room || DEFAULT_ROOM_NAMES[activeImgIdx % DEFAULT_ROOM_NAMES.length]}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-xl">
                    High-definition architectural view of {property.title}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRoomCategory('all');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-900/80 backdrop-blur-md text-xs font-semibold text-slate-300 hover:text-white border border-white/10 hover:border-slate-700 transition-colors"
                  >
                    View All Rooms Mosaic
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white shadow-lg shadow-blue-600/40 transition-all flex items-center gap-1.5"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Full Lightbox</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Gallery Bar below */}
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {property.images.map((img, idx) => {
                const roomTitle = property.roomPhotos?.[idx]?.room || DEFAULT_ROOM_NAMES[idx % DEFAULT_ROOM_NAMES.length];
                const isActive = activeImgIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveImgIdx(idx);
                    }}
                    title={roomTitle}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 group ${
                      isActive ? 'border-blue-500 scale-105 shadow-md shadow-blue-500/40' : 'border-slate-800 opacity-70 hover:opacity-100 hover:border-slate-600'
                    }`}
                  >
                    <img 
                      src={img || FALLBACK_PROPERTY_IMAGE} 
                      alt={roomTitle} 
                      className="w-full h-full object-cover" 
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = FALLBACK_PROPERTY_IMAGE;
                      }}
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-slate-950/85 text-[9px] text-blue-200 truncate px-1 py-0.5 text-center font-semibold">
                      {roomTitle.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setLightboxOpen(true)}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shrink-0 flex items-center justify-center gap-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Fullscreen Lightbox ({property.images.length} Rooms)</span>
            </button>
          </div>
        </div>

        {/* KEY PROPERTY SPECS STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 sm:p-5 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 mb-12 text-center">
          <div className="p-2 border-r border-slate-800/80">
            <div className="flex items-center justify-center gap-1.5 text-blue-400 mb-1">
              <Bed className="w-4 h-4" />
              <span className="text-xs uppercase font-bold text-slate-400">Bedrooms</span>
            </div>
            <p className="text-xl font-bold text-white">{property.bedrooms}</p>
          </div>

          <div className="p-2 border-r border-slate-800/80">
            <div className="flex items-center justify-center gap-1.5 text-blue-400 mb-1">
              <Bath className="w-4 h-4" />
              <span className="text-xs uppercase font-bold text-slate-400">Bathrooms</span>
            </div>
            <p className="text-xl font-bold text-white">{property.bathrooms}</p>
          </div>

          <div className="p-2 sm:border-r border-slate-800/80">
            <div className="flex items-center justify-center gap-1.5 text-blue-400 mb-1">
              <Maximize2 className="w-4 h-4" />
              <span className="text-xs uppercase font-bold text-slate-400">Living Area</span>
            </div>
            <p className="text-xl font-bold text-white">{property.sqft.toLocaleString()} Sq Ft</p>
          </div>

          <div className="p-2 border-r border-slate-800/80">
            <div className="flex items-center justify-center gap-1.5 text-blue-400 mb-1">
              <Compass className="w-4 h-4" />
              <span className="text-xs uppercase font-bold text-slate-400">Lot Size</span>
            </div>
            <p className="text-xl font-bold text-white">{property.lotSize || 'N/A'}</p>
          </div>

          <div className="p-2 border-r border-slate-800/80">
            <div className="flex items-center justify-center gap-1.5 text-blue-400 mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-xs uppercase font-bold text-slate-400">Year Built</span>
            </div>
            <p className="text-xl font-bold text-white">{property.yearBuilt}</p>
          </div>

          <div className="p-2">
            <div className="flex items-center justify-center gap-1.5 text-blue-400 mb-1">
              <Car className="w-4 h-4" />
              <span className="text-xs uppercase font-bold text-slate-400">Garage</span>
            </div>
            <p className="text-xl font-bold text-white">{property.garage} Vehicles</p>
          </div>
        </div>

        {/* TWO-COLUMN CONTENT LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* LEFT 2-COLUMNS: DETAILS, AMENITIES, FLOORPLANS, CALCULATOR */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Overview & Description */}
            <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800">
              <h2 className="text-2xl font-bold text-white mb-4">Architectural Overview</h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-6">
                {property.description}
              </p>

              {/* Highlights Bullet Matrix */}
              <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400 mb-3">
                Key Architectural Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.highlights?.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-slate-200">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AMENITIES & FEATURES */}
            <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800">
              <h2 className="text-2xl font-bold text-white mb-6">Features & Signature Amenities</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Interior Features */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Interior Masterworks</span>
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {property.amenities?.interior?.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exterior & Grounds */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2">
                    <Compass className="w-4 h-4" />
                    <span>Exterior Grounds & Pools</span>
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {property.amenities?.exterior?.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Luxury & Security */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Security & Private Services</span>
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {property.amenities?.luxury?.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Eco & Sustainability */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Sustainable Technology</span>
                  </h4>
                  <ul className="space-y-2 text-xs">
                    {property.amenities?.eco?.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* INTERACTIVE FLOOR PLANS */}
            {property.floorPlans && property.floorPlans.length > 0 && (
              <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Interactive Floor Plans</h2>
                    <p className="text-xs text-slate-400">Architectural spatial elevations and dimensions</p>
                  </div>

                  {/* Level Switcher */}
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800">
                    {property.floorPlans.map((fp, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveFloorIdx(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          activeFloorIdx === idx
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {fp.level.split('&')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Level Card */}
                {property.floorPlans[activeFloorIdx] && (
                  <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/80">
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {property.floorPlans[activeFloorIdx].level}
                        </h4>
                        <p className="text-xs text-blue-400">
                          {property.floorPlans[activeFloorIdx].sqft.toLocaleString()} Sq Ft • {property.floorPlans[activeFloorIdx].beds} Beds • {property.floorPlans[activeFloorIdx].baths} Baths
                        </p>
                      </div>

                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-600/20 text-blue-300">
                        Level {activeFloorIdx + 1}
                      </span>
                    </div>

                    <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden border border-slate-800">
                      <img
                        src={property.floorPlans[activeFloorIdx].image || FALLBACK_PROPERTY_IMAGE}
                        alt="Floor Plan Level"
                        className="w-full h-full object-cover filter contrast-125"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = FALLBACK_PROPERTY_IMAGE;
                        }}
                      />
                      <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />
                      <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md text-xs text-slate-300 border border-white/10">
                        Schematic Blueprint View
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MORTGAGE & DEBT SERVICE CALCULATOR */}
            <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Mortgage & Financing Calculator</h2>
                  <p className="text-xs text-slate-400">Simulate debt service, taxes, and monthly allocation</p>
                </div>
                <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <Calculator className="w-6 h-6" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span className="text-slate-400">Total Purchase Price</span>
                      <span className="text-white">${calcPrice.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={1000000}
                      max={40000000}
                      step={500000}
                      value={calcPrice}
                      onChange={(e) => setCalcPrice(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span className="text-slate-400">Down Payment ({calcDownPercent}%)</span>
                      <span className="text-blue-400">
                        ${Math.round(calcPrice * (calcDownPercent / 100)).toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={50}
                      step={5}
                      value={calcDownPercent}
                      onChange={(e) => setCalcDownPercent(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 font-semibold mb-1 block">Interest Rate (%)</label>
                      <input
                        type="number"
                        step={0.05}
                        value={calcInterestRate}
                        onChange={(e) => setCalcInterestRate(Number(e.target.value))}
                        className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 font-semibold mb-1 block">Loan Term</label>
                      <select
                        value={calcLoanTerm}
                        onChange={(e) => setCalcLoanTerm(Number(e.target.value))}
                        className="w-full p-2 rounded-xl bg-slate-950 border border-slate-800 text-white"
                      >
                        <option value={30}>30 Years Fixed</option>
                        <option value={15}>15 Years Fixed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Calculation Breakdown Result Box */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/30 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-slate-400 uppercase font-semibold">Total Estimated Monthly</span>
                    <div className="text-3xl font-extrabold text-white text-gradient mt-1 mb-4">
                      ${totalMonthly.toLocaleString()}/mo
                    </div>

                    <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Principal & Interest</span>
                        <span className="text-white font-semibold">${monthlyPrincipal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Property Taxes</span>
                        <span className="text-white font-semibold">${monthlyTax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Homeowner Insurance</span>
                        <span className="text-white font-semibold">${monthlyInsurance.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">HOA Assessment</span>
                        <span className="text-white font-semibold">${monthlyHOA.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-500 mt-4 leading-relaxed">
                    * Estimates based on prevailing jumbo conforming interest rates. Title and closing escrows calculated separately.
                  </p>
                </div>
              </div>
            </div>

            {/* NEIGHBORHOOD & NEARBY AMENITIES */}
            <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800">
              <h2 className="text-2xl font-bold text-white mb-2">Location & Neighborhood Enclave</h2>
              <p className="text-xs text-slate-400 mb-6">
                Situated in one of the world's most secure and prominent residential corridors.
              </p>

              {/* Walk scores */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <p className="text-3xl font-black text-blue-400">{property.neighborhood?.walkScore || 85}</p>
                  <p className="text-xs font-bold text-white mt-1">Walk Score</p>
                  <p className="text-[10px] text-slate-400">Very Walkable Enclave</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <p className="text-3xl font-black text-blue-400">{property.neighborhood?.transitScore || 78}</p>
                  <p className="text-xs font-bold text-white mt-1">Transit & Aviation Access</p>
                  <p className="text-[10px] text-slate-400">Excellent Accessibility</p>
                </div>
              </div>

              {/* Nearby Points of Interest */}
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">
                Key Points of Interest
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.neighborhood?.nearby?.map((poi, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white">{poi.name}</p>
                      <p className="text-[10px] text-slate-400">{poi.type}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-lg bg-blue-500/10 text-blue-400 font-semibold">
                      {poi.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT 1-COLUMN: AGENT CONTACT CARD & TOUR BOOKING */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Broker Direct Card */}
            <div className="sticky top-28 p-6 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-blue-500/30 shadow-2xl">
              
              <div className="flex items-center gap-3.5 pb-5 border-b border-slate-800">
                <img
                  src={property.agent?.avatar || FALLBACK_AVATAR}
                  alt={property.agent?.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-400/40 shadow-lg"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = FALLBACK_AVATAR;
                  }}
                />
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">
                    Listing Broker
                  </span>
                  <h3 className="text-lg font-bold text-white">{property.agent?.name || 'Elena Rostova'}</h3>
                  <p className="text-xs text-slate-400">{property.agent?.title || 'Senior Luxury Advisor'}</p>
                  <div className="flex items-center gap-1 text-amber-400 text-xs mt-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold">{property.agent?.rating || 4.98}</span>
                    <span className="text-slate-500">({property.agent?.reviewsCount || 142} sales)</span>
                  </div>
                </div>
              </div>

              {/* Direct Quick Contact Buttons */}
              <div className="grid grid-cols-2 gap-2 my-4">
                <a
                  href={`tel:${property.agent?.phone || '+13108492910'}`}
                  className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/40 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>Call Broker</span>
                </a>

                <a
                  href={`mailto:${property.agent?.email || 'advisor@estatly.com'}`}
                  className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/40 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span>Email</span>
                </a>
              </div>

              {/* VIP Tour Booking Trigger */}
              <button
                onClick={() => openScheduleModal(property)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] mb-6"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Confidential Tour</span>
              </button>

              {/* Direct Inquiry Form */}
              <div className="border-t border-slate-800 pt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  Direct Private Inquiry
                </h4>

                {inquirySubmitted ? (
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs text-center">
                    <Check className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                    <p className="font-bold">Inquiry Dispatched</p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Our broker will contact you via your preferred channel within 2 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />

                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />

                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />

                    <textarea
                      rows={3}
                      value={inquiryMsg}
                      onChange={(e) => setInquiryMsg(e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 resize-none"
                    />

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
                    >
                      Request Private Prospectus
                    </button>
                  </form>
                )}
              </div>

              {/* Security Footnote */}
              <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Protected by Estatly Non-Disclosure Charter</span>
              </div>

            </div>

          </div>

        </div>

        {/* SIMILAR RECOMMENDED PROPERTIES */}
        {similarProperties.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white">Similar Luxury Residences</h3>
                <p className="text-xs text-slate-400">Comparable architecture in {property.city} and surrounding enclaves</p>
              </div>

              <button
                onClick={() => setActivePage('listings')}
                className="text-xs text-blue-400 hover:underline font-semibold"
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxOpen && (
          <div 
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md cursor-pointer"
          >
            {/* Top Bar with Room Label */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 pointer-events-auto cursor-default"
            >
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-xl bg-blue-600/90 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-blue-400/30 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{property.roomPhotos?.[activeImgIdx]?.room || DEFAULT_ROOM_NAMES[activeImgIdx % DEFAULT_ROOM_NAMES.length]}</span>
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  Photo {activeImgIdx + 1} of {property.images.length} • {property.title}
                </span>
              </div>

              <button
                onClick={() => setLightboxOpen(false)}
                className="p-3 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors border border-white/10"
                aria-label="Close fullscreen gallery"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Prev Image */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImgIdx((prev) => (prev - 1 + property.images.length) % property.images.length);
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 text-white hover:bg-blue-600 transition-colors z-20 border border-white/10"
              aria-label="Previous room photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Lightbox Image & Room Title */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl max-h-[85vh] relative flex flex-col items-center cursor-default"
            >
              <img
                src={property.images[activeImgIdx] || FALLBACK_PROPERTY_IMAGE}
                alt={property.roomPhotos?.[activeImgIdx]?.room || 'Room photo'}
                className="max-w-full max-h-[68vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_PROPERTY_IMAGE;
                }}
              />
              <div className="mt-3 text-center">
                <p className="text-white text-sm font-semibold">
                  {property.roomPhotos?.[activeImgIdx]?.room || DEFAULT_ROOM_NAMES[activeImgIdx % DEFAULT_ROOM_NAMES.length]}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">
                  {property.title} • {property.city}, {property.state}
                </p>
              </div>
            </div>

            {/* Next Image */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveImgIdx((prev) => (prev + 1) % property.images.length);
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 text-white hover:bg-blue-600 transition-colors z-20 border border-white/10"
              aria-label="Next room photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Bottom Room Jump Pills Bar */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-6 inset-x-0 flex items-center justify-center gap-2 px-4 overflow-x-auto z-20 pointer-events-auto scrollbar-none cursor-default"
            >
              {property.images.map((_, idx) => {
                const roomTitle = property.roomPhotos?.[idx]?.room || DEFAULT_ROOM_NAMES[idx % DEFAULT_ROOM_NAMES.length];
                const isActive = activeImgIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40 scale-105 border border-blue-400/40'
                        : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-white/10'
                    }`}
                  >
                    {roomTitle}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
