import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Home, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  Calculator, 
  Star, 
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CITIES, TESTIMONIALS } from '../data/properties';
import PropertyCard from '../components/PropertyCard';

export default function HomePage() {
  const { 
    properties, 
    setActivePage, 
    setFilters
  } = useApp();

  // Local hero search state
  const [heroPurpose, setHeroPurpose] = useState('all');
  const [heroCity, setHeroCity] = useState('all');
  const [heroType, setHeroType] = useState('all');
  const [heroQuery, setHeroQuery] = useState('');

  // Featured category filter tab
  const [featuredTab, setFeaturedTab] = useState('all');

  // Quick Mortgage Calculator State on Homepage
  const [calcHomePrice, setCalcHomePrice] = useState(14000000);
  const [calcDownPaymentPercent, setCalcDownPaymentPercent] = useState(20);
  const [calcInterestRate, setCalcInterestRate] = useState(6.25);
  const calcLoanTermYears = 30;

  // Mortgage calculation logic
  const loanAmount = calcHomePrice * (1 - calcDownPaymentPercent / 100);
  const monthlyRate = calcInterestRate / 100 / 12;
  const totalMonths = calcLoanTermYears * 12;
  const monthlyPrincipalInterest = loanAmount > 0 
    ? Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1))
    : 0;
  const estimatedTax = Math.round((calcHomePrice * 0.012) / 12);
  const estimatedInsurance = Math.round((calcHomePrice * 0.0035) / 12);
  const estimatedHOA = 850;
  const totalMonthlyPayment = monthlyPrincipalInterest + estimatedTax + estimatedInsurance + estimatedHOA;

  const handleHeroSearch = (e) => {
    e.preventDefault();
    setFilters(prev => ({
      ...prev,
      query: heroQuery,
      purpose: heroPurpose,
      city: heroCity,
      type: heroType
    }));
    setActivePage('listings');
  };

  const handleCityClick = (cityName) => {
    setFilters(prev => ({ ...prev, city: cityName }));
    setActivePage('listings');
  };

  const filteredFeatured = properties.filter((p) => {
    if (featuredTab === 'all') return true;
    if (featuredTab === 'sale') return p.purpose === 'sale';
    if (featuredTab === 'rent') return p.purpose === 'rent';
    if (featuredTab === 'villa') return p.type === 'Villa';
    if (featuredTab === 'penthouse') return p.type === 'Penthouse';
    return true;
  }).slice(0, 6);

  return (
    <div className="min-h-screen text-slate-100 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden">
        {/* Background Visual Layer */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Architectural Estate"
            className="w-full h-full object-cover object-center filter brightness-[0.25] scale-105 animate-pulse-slow"
          />
          {/* Radial Dark Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#060913]/90 via-[#060913]/70 to-[#060913]" />
          <div className="absolute inset-0 bg-radial-glow opacity-80" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md mb-6 shadow-lg shadow-blue-950/40"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>The Next Generation of Prime Real Estate</span>
            </motion.div>

            {/* Giant Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
            >
              Extraordinary Living.{' '}
              <span className="text-gradient">Architecturally Refined.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-xl text-slate-300 leading-relaxed font-normal mb-10 max-w-2xl mx-auto"
            >
              Discover curated luxury residences, waterfront estates, and sky penthouses across the world's most sought-after enclaves.
            </motion.p>

          </div>

          {/* Interactive Search Console Widget */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="p-4 sm:p-5 rounded-3xl bg-slate-950/80 backdrop-blur-2xl border border-blue-500/25 shadow-2xl shadow-blue-950/80">
              
              {/* Search Purpose Tabs */}
              <div className="flex items-center gap-2 mb-4 border-b border-slate-800/80 pb-3">
                {[
                  { id: 'all', label: 'All Inventory' },
                  { id: 'sale', label: 'Buy Exclusive' },
                  { id: 'rent', label: 'Luxury Lease' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setHeroPurpose(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      heroPurpose === tab.id
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                        : 'text-slate-400 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Multi-facet Quick Form */}
              <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                {/* Search Text / Keyword */}
                <div className="relative">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Keyword / Address
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-blue-400" />
                    <input
                      type="text"
                      value={heroQuery}
                      onChange={(e) => setHeroQuery(e.target.value)}
                      placeholder="E.g. Bel Air, Infinity Pool, Glass"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Location / City Dropdown */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Location Enclave
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-blue-400" />
                    <select
                      value={heroCity}
                      onChange={(e) => setHeroCity(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="all">All Prime Enclaves</option>
                      <option value="Beverly Hills">Beverly Hills, CA</option>
                      <option value="New York">New York, NY (Tribeca / West Village)</option>
                      <option value="Miami Beach">Miami Beach, FL</option>
                      <option value="Malibu">Malibu, CA</option>
                      <option value="Aspen">Aspen, CO</option>
                      <option value="Seattle">Seattle / Mercer Island, WA</option>
                      <option value="Austin">Austin, TX</option>
                    </select>
                  </div>
                </div>

                {/* Property Type Dropdown */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Architecture Type
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-2.5 w-4 h-4 text-blue-400" />
                    <select
                      value={heroType}
                      onChange={(e) => setHeroType(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700/80 text-white focus:outline-none focus:border-blue-500 cursor-pointer"
                    >
                      <option value="all">All Architecture</option>
                      <option value="Villa">Luxury Villa</option>
                      <option value="Penthouse">Sky Penthouse</option>
                      <option value="Modern Apartment">Modern Apartment</option>
                      <option value="Townhouse">Prime Townhouse</option>
                    </select>
                  </div>
                </div>

                {/* Search Submit Button */}
                <div className="flex flex-col justify-end">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white text-xs font-bold shadow-lg shadow-blue-600/40 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search Residences</span>
                  </button>
                </div>

              </form>

            </div>
          </motion.div>

          {/* Social Proof / Key Metrics Counter */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { value: '$4.8B+', label: 'Transaction Volume', sub: 'Verified Escrow' },
              { value: '12,500+', label: 'Private Portfolios', sub: 'Across 18 Enclaves' },
              { value: '99.4%', label: 'Client Satisfaction', sub: 'High Net Worth Rating' },
              { value: '450+', label: 'Top 1% Brokers', sub: 'Global Representation' }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="p-4 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800/80 text-center"
              >
                <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{stat.value}</p>
                <p className="text-xs font-semibold text-blue-300 mt-1">{stat.label}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FEATURED PROPERTIES SECTION */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Handpicked Masterpieces</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Featured Properties
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Premier architectural residences vetted for design significance, pedigree, and prime location.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
              {[
                { id: 'all', label: 'All Curated' },
                { id: 'sale', label: 'For Sale' },
                { id: 'rent', label: 'For Lease' },
                { id: 'villa', label: 'Villas' },
                { id: 'penthouse', label: 'Penthouses' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFeaturedTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    featuredTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFeatured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* View All Listings CTA */}
          <div className="mt-12 text-center">
            <button
              onClick={() => setActivePage('listings')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold border border-blue-500/30 shadow-lg shadow-blue-950/50 hover:border-blue-500/60 transition-all hover:scale-105"
            >
              <span>Explore All Available Inventory</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </button>
          </div>

        </div>
      </section>

      {/* EXPLORE PRIME ENCLAVES / CITIES */}
      <section className="py-20 bg-slate-950/60 border-y border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center justify-center gap-1.5 mb-2">
              <Compass className="w-4 h-4" />
              <span>World-Class Locations</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Explore Premier Destinations
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              From the coastal cliffs of Malibu to Manhattan’s skyline and Aspen’s alpine valleys.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CITIES.map((city) => (
              <div
                key={city.name}
                onClick={() => handleCityClick(city.name)}
                className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer border border-slate-800 hover:border-blue-500/50 shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <img
                  src={city.image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'}
                  alt={city.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-end">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/80 backdrop-blur-md text-blue-300 border border-white/10">
                      {city.tag}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {city.name}
                    </h3>
                    <p className="text-xs text-slate-300 mb-2">{city.state}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                      <span className="text-slate-400">{city.propertiesCount} Active Properties</span>
                      <span className="text-blue-400 font-bold">Avg {city.avgPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* WHY CHOOSE ESTATLY / VALUE PROPOSITIONS */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>The Estatly Distinction</span>
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
                Engineered for Discretion, Transparency & Speed.
              </h2>
              <p className="text-base text-slate-300 leading-relaxed mb-8">
                Traditional real estate platforms rely on outdated listings and slow intermediaries. Estatly pairs cutting-edge 3D visualization, verified cryptographic title verification, and world-class concierge service to deliver a seamless acquisition experience.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: 'Confidential & Off-Market Portfolio Access',
                    desc: 'Private listings shielded from public MLS indexing, available exclusively to verified high-net-worth buyers.'
                  },
                  {
                    title: 'Real-Time Financial & Mortgage Modeling',
                    desc: 'Calculate debt service, HOA assessments, and tax yields with bank-grade precision.'
                  },
                  {
                    title: 'VIP 3D Spatial Walkthroughs & Drone Imagery',
                    desc: 'Inspect architectural elevations, sunlight orientation, and material finishes from anywhere.'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                    <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 mt-0.5 shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual Interactive Card */}
            <div className="relative">
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-[#0c1222] to-slate-950 border border-blue-500/30 shadow-2xl relative z-10">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Interactive Mortgage Estimator</h4>
                      <p className="text-xs text-slate-400">Live financing simulation for luxury assets</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300">
                    30-Yr Fixed
                  </span>
                </div>

                {/* Live inputs */}
                <div className="space-y-4 text-xs">
                  <div>
                    <div className="flex justify-between font-semibold mb-1">
                      <span className="text-slate-400">Property Valuation</span>
                      <span className="text-white">${calcHomePrice.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={2000000}
                      max={35000000}
                      step={500000}
                      value={calcHomePrice}
                      onChange={(e) => setCalcHomePrice(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 font-semibold mb-1 block">Down Payment ({calcDownPaymentPercent}%)</label>
                      <input
                        type="range"
                        min={10}
                        max={50}
                        step={5}
                        value={calcDownPaymentPercent}
                        onChange={(e) => setCalcDownPaymentPercent(Number(e.target.value))}
                        className="w-full"
                      />
                      <span className="text-[11px] text-blue-400 block mt-1">
                        ${Math.round(calcHomePrice * (calcDownPaymentPercent / 100)).toLocaleString()}
                      </span>
                    </div>

                    <div>
                      <label className="text-slate-400 font-semibold mb-1 block">Interest Rate ({calcInterestRate}%)</label>
                      <input
                        type="range"
                        min={4.0}
                        max={8.5}
                        step={0.25}
                        value={calcInterestRate}
                        onChange={(e) => setCalcInterestRate(Number(e.target.value))}
                        className="w-full"
                      />
                      <span className="text-[11px] text-slate-400 block mt-1">Prime Jumbo Rate</span>
                    </div>
                  </div>
                </div>

                {/* Calculation Output Box */}
                <div className="mt-6 p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-300">Estimated Total Monthly</span>
                    <span className="text-2xl font-black text-white text-gradient">
                      ${totalMonthlyPayment.toLocaleString()}/mo
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-blue-500/20 text-[11px]">
                    <div>
                      <p className="text-slate-400">Principal & Int.</p>
                      <p className="text-white font-bold">${monthlyPrincipalInterest.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Est. Taxes</p>
                      <p className="text-white font-bold">${estimatedTax.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Insurance & HOA</p>
                      <p className="text-white font-bold">${(estimatedInsurance + estimatedHOA).toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActivePage('listings')}
                  className="w-full mt-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30"
                >
                  Explore Homes within this Budget
                </button>
              </div>

              {/* Decorative background glow */}
              <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            </div>

          </div>

        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section className="py-20 bg-slate-950/70 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center justify-center gap-1.5 mb-2">
              <Star className="w-4 h-4 fill-blue-400" />
              <span>Client Commendations</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Trusted by Discerning Investors Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                  <img
                    src={t.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-blue-400/40"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                    }}
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <p className="text-xs text-blue-400">{t.role}</p>
                    <p className="text-[10px] text-slate-500">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CALL TO ACTION: LIST YOUR PROPERTY */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-blue-900/80 via-blue-950 to-indigo-950 border border-blue-500/30 p-8 sm:p-14 overflow-hidden shadow-2xl">
            
            {/* Glow lights */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-2xl relative z-10">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-blue-500/20 text-blue-300 border border-blue-400/30 inline-block mb-4">
                Global Seller Representation
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                Ready to Present Your Masterwork to Qualified Buyers?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                List your luxury property on Estatly and connect with our global syndicate of verified investors, family offices, and architectural collectors.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => setActivePage('submit-property')}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 text-xs sm:text-sm font-extrabold shadow-xl transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>Submit Property for Review</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActivePage('agents')}
                  className="px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Consult with a Senior Broker</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
