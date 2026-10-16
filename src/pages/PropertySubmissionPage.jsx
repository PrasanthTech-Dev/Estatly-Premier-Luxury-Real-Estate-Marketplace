import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  MapPin, 
  DollarSign, 
  Home, 
  Bed, 
  Bath, 
  Maximize2, 
  ShieldCheck, 
  Check, 
  Image as ImageIcon,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const PRESET_PHOTO_COLLECTIONS = [
  {
    name: 'Modern Glass Architectural Estate',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85'
    ]
  },
  {
    name: 'Coastal Waterfront Infinity Villa',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85'
    ]
  },
  {
    name: 'Manhattan Sky Penthouse',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85'
    ]
  }
];

export default function PropertySubmissionPage() {
  const { addProperty, setActivePage } = useApp();

  const [step, setStep] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    purpose: 'sale',
    type: 'Villa',
    price: 12500000,
    tag: 'Exclusive',
    bedrooms: 5,
    bathrooms: 6,
    sqft: 7500,
    lotSize: '1.2 Acres',
    yearBuilt: 2024,
    garage: 3,
    hoaFee: 850,
    address: '',
    city: 'Beverly Hills',
    state: 'CA',
    zip: '90210',
    description: '',
    highlights: [
      'Panoramic sunset views',
      'Infinity edge swimming pool',
      'Smart home crest automation'
    ],
    selectedAmenities: [
      'Pool',
      'Smart Home',
      'Wine Cellar',
      'Spa'
    ],
    images: PRESET_PHOTO_COLLECTIONS[0].images,
    customImageUrl: ''
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (amenity) => {
    const exists = formData.selectedAmenities.includes(amenity);
    if (exists) {
      updateField('selectedAmenities', formData.selectedAmenities.filter(a => a !== amenity));
    } else {
      updateField('selectedAmenities', [...formData.selectedAmenities, amenity]);
    }
  };

  const addCustomImage = () => {
    if (!formData.customImageUrl) return;
    updateField('images', [...formData.images, formData.customImageUrl]);
    updateField('customImageUrl', '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedProperty = {
      title: formData.title || 'Untitled Architectural Masterpiece',
      purpose: formData.purpose,
      type: formData.type,
      price: Number(formData.price),
      pricePerSqft: Math.round(Number(formData.price) / Number(formData.sqft || 5000)),
      tag: formData.tag,
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      sqft: Number(formData.sqft),
      lotSize: formData.lotSize,
      yearBuilt: Number(formData.yearBuilt),
      garage: Number(formData.garage),
      hoaFee: Number(formData.hoaFee),
      annualTaxes: Math.round(Number(formData.price) * 0.012),
      address: formData.address || '100 Ocean Crest Way',
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      images: formData.images.length > 0 ? formData.images : PRESET_PHOTO_COLLECTIONS[0].images,
      description: formData.description || 'A rare architectural marvel curated for refined luxury living. Designed with premier materials, custom finishes, and panoramic vistas.',
      highlights: formData.highlights,
      amenities: {
        interior: formData.selectedAmenities.filter(a => ['Wine Cellar', 'Cinema', 'Smart Home'].includes(a)),
        exterior: formData.selectedAmenities.filter(a => ['Pool', 'Dock', 'Garage'].includes(a)),
        luxury: formData.selectedAmenities.filter(a => ['Spa', 'Helipad', 'Elevator'].includes(a)),
        eco: ['High-Performance Glazing', 'Solar Ready Array']
      },
      neighborhood: {
        walkScore: 82,
        transitScore: 75,
        nearby: [
          { name: 'Private Country Club', type: 'Golf & Leisure', distance: '1.4 miles' },
          { name: 'Elite Academy', type: 'Education', distance: '2.0 miles' },
          { name: 'Fine Dining Row', type: 'Michelin Dining', distance: '1.1 miles' }
        ]
      }
    };

    addProperty(formattedProperty);
  };

  const totalSteps = 4;

  return (
    <div className="min-h-screen text-slate-100 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Marketplace Representation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            List Your Property on Estatly
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            Reach high-net-worth buyers and family offices worldwide. Complete the confidential listing brief below.
          </p>

          {/* Stepper Progress Bar */}
          <div className="max-w-md mx-auto mt-8">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
              <span className={step >= 1 ? 'text-blue-400' : ''}>1. Basic Info</span>
              <span className={step >= 2 ? 'text-blue-400' : ''}>2. Specs & Location</span>
              <span className={step >= 3 ? 'text-blue-400' : ''}>3. Imagery & Amenities</span>
              <span className={step >= 4 ? 'text-blue-400' : ''}>4. Review & Publish</span>
            </div>
            <div className="h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600"
                initial={{ width: '25%' }}
                animate={{ width: `${(step / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>

        {/* Wizard Card Body */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-blue-500/30 shadow-2xl">
          
          {/* STEP 1: BASIC INFO */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                Step 1: Listing Essentials & Pricing
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Estate Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="E.g., The Bel Air Skyline Glass Villa"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Listing Purpose
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) => updateField('purpose', e.target.value)}
                    className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="sale">For Sale (Acquisition)</option>
                    <option value="rent">For Lease (Seasonal / Annual)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Architecture Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => updateField('type', e.target.value)}
                    className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Villa">Luxury Villa</option>
                    <option value="Penthouse">Sky Penthouse</option>
                    <option value="Modern Apartment">Modern Apartment</option>
                    <option value="Townhouse">Prime Townhouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Listing Price ({formData.purpose === 'sale' ? '$ USD' : '$ USD/mo'})
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => updateField('price', e.target.value)}
                    className="w-full px-3 py-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Comprehensive Architectural Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the architectural pedigree, views, light orientation, materials (travertine, teak, steel), and primary suite amenities..."
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  className="w-full p-3 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
            </motion.div>
          )}

          {/* STEP 2: SPECS & LOCATION */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                Step 2: Specifications & Prime Enclave Location
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={formData.bedrooms}
                    onChange={(e) => updateField('bedrooms', e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={25}
                    value={formData.bathrooms}
                    onChange={(e) => updateField('bathrooms', e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Living Area (Sq Ft)
                  </label>
                  <input
                    type="number"
                    value={formData.sqft}
                    onChange={(e) => updateField('sqft', e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Year Built
                  </label>
                  <input
                    type="number"
                    value={formData.yearBuilt}
                    onChange={(e) => updateField('yearBuilt', e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Lot Dimension / Acreage
                  </label>
                  <input
                    type="text"
                    value={formData.lotSize}
                    onChange={(e) => updateField('lotSize', e.target.value)}
                    placeholder="E.g., 1.4 Acres"
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Garage Capacity
                  </label>
                  <input
                    type="number"
                    value={formData.garage}
                    onChange={(e) => updateField('garage', e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Monthly HOA Dues ($)
                  </label>
                  <input
                    type="number"
                    value={formData.hoaFee}
                    onChange={(e) => updateField('hoaFee', e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              {/* Address details */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., 1042 Ocean Crest Ridge"
                    value={formData.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      City / Enclave
                    </label>
                    <select
                      value={formData.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white"
                    >
                      <option value="Beverly Hills">Beverly Hills, CA</option>
                      <option value="New York">New York, NY</option>
                      <option value="Miami Beach">Miami Beach, FL</option>
                      <option value="Malibu">Malibu, CA</option>
                      <option value="Aspen">Aspen, CO</option>
                      <option value="Seattle">Seattle, WA</option>
                      <option value="Austin">Austin, TX</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => updateField('state', e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={formData.zip}
                      onChange={(e) => updateField('zip', e.target.value)}
                      className="w-full p-2.5 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: IMAGERY & AMENITIES */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                Step 3: High-Definition Photography & Amenities
              </h3>

              {/* Ready-to-use photography presets */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Select Architectural Photography Theme (or upload custom)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PRESET_PHOTO_COLLECTIONS.map((preset, idx) => (
                    <div
                      key={idx}
                      onClick={() => updateField('images', preset.images)}
                      className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                        formData.images[0] === preset.images[0]
                          ? 'bg-blue-600/20 border-blue-500 shadow-lg'
                          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <img
                        src={preset.images[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'}
                        alt={preset.name}
                        className="w-full h-24 object-cover rounded-xl mb-2"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <p className="text-xs font-bold text-white line-clamp-1">{preset.name}</p>
                      <p className="text-[10px] text-blue-400 mt-0.5">{preset.images.length} High-Res Shots</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Image URL addition */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Add Custom High-Resolution Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={formData.customImageUrl}
                    onChange={(e) => updateField('customImageUrl', e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={addCustomImage}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
                  >
                    Add Photo
                  </button>
                </div>
              </div>

              {/* Current photos preview strip */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Current Selected Gallery ({formData.images.length} Photos)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {formData.images.map((img, i) => (
                    <div key={i} className="relative h-20 rounded-xl overflow-hidden border border-slate-800 group">
                      <img 
                        src={img || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => updateField('images', formData.images.filter((_, idx) => idx !== i))}
                        className="absolute top-1 right-1 p-1 rounded-full bg-slate-950/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove photo"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities chips */}
              <div className="pt-4 border-t border-slate-800">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                  Signature Luxury Amenities
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Pool',
                    'Smart Home',
                    'Wine Cellar',
                    'Cinema',
                    'Spa',
                    'Dock',
                    'Elevator',
                    'Garage',
                    'Fireplace',
                    'Helipad',
                    'Security Guardhouse',
                    'Zen Garden'
                  ].map((amenity) => {
                    const isChecked = formData.selectedAmenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          isChecked
                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                            : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                        <span>{amenity}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: REVIEW & PUBLISH */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                Step 4: Confidential Review & Verification
              </h3>

              {/* Listing Preview Card */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-blue-500/40">
                <div className="flex flex-col sm:flex-row gap-5">
                  <img
                    src={formData.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'}
                    alt={formData.title}
                    className="w-full sm:w-48 h-36 object-cover rounded-xl"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="flex-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-600/20 text-blue-300">
                      {formData.type} • {formData.purpose === 'sale' ? 'For Sale' : 'For Lease'}
                    </span>
                    <h4 className="text-xl font-bold text-white mt-1">
                      {formData.title || 'Bel Air Skyline Glass Villa'}
                    </h4>
                    <p className="text-sm font-black text-blue-400 mt-1">
                      ${Number(formData.price).toLocaleString()}
                      {formData.purpose === 'rent' && '/mo'}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {formData.address || 'Bellagio Crest Road'}, {formData.city}, {formData.state}
                    </p>

                    <div className="flex items-center gap-4 mt-3 text-xs text-slate-300">
                      <span>{formData.bedrooms} Beds</span>
                      <span>•</span>
                      <span>{formData.bathrooms} Baths</span>
                      <span>•</span>
                      <span>{Number(formData.sqft).toLocaleString()} Sq Ft</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/20 text-xs text-slate-300 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <p>
                  By publishing, this estate will immediately be integrated into the active Estatly database, accessible via search, comparison matrices, and spatial maps.
                </p>
              </div>
            </motion.div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {step < totalSteps ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 1 && !formData.title) {
                    updateField('title', 'Modern Architectural Sanctuary');
                  }
                  setStep(step + 1);
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
              >
                <span>Continue to Step {step + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-extrabold shadow-xl shadow-blue-600/40 transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>Publish Estate to Marketplace</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
