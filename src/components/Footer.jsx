import React, { useState } from 'react';
import { 
  Building2, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Headphones, 
  Award, 
  MapPin, 
  Phone, 
  Globe, 
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { setActivePage, setFilters, showToast } = useApp();
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Please enter a valid email address', 'warning');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to Estatly Private Market Insights!', 'success');
  };

  const navigateToCity = (cityName) => {
    setFilters(prev => ({ ...prev, city: cityName }));
    setActivePage('listings');
  };

  const navigateToType = (typeName) => {
    setFilters(prev => ({ ...prev, type: typeName }));
    setActivePage('listings');
  };

  return (
    <footer className="relative bg-[#050811] border-t border-slate-800/80 pt-16 pb-12 text-slate-400 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-blue-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Feature Highlights Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-14 border-b border-slate-800/80">
          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base mb-1">Confidential & Verified</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                All high-net-worth properties undergo title deed audits and cryptographic proof of authenticity.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base mb-1">24/7 Private Client Concierge</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated luxury concierge facilitating private aviation charters, showings, and legal advisory.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-base mb-1">Top 1% Global Brokers</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Represented by globally recognized brokers with over $2.5B in combined closed transaction volume.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-900 border border-blue-400/30 text-white">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">ESTATLY</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              The premier marketplace for extraordinary residential masterworks, coastal estates, and high-rise penthouses. Redefining modern real estate through technology and design.
            </p>
            
            <div className="flex items-center gap-3">
              <a href="#instagram" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#linkedin" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#twitter" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-colors" aria-label="X Twitter">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
              </a>
              <a href="#youtube" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
              </a>
            </div>
          </div>

          {/* Premier Destinations */}
          <div>
            <h5 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Prime Markets</h5>
            <ul className="space-y-2.5 text-sm">
              {['Beverly Hills', 'New York', 'Miami Beach', 'Malibu', 'Aspen', 'Seattle'].map((city) => (
                <li key={city}>
                  <button 
                    onClick={() => navigateToCity(city)} 
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    {city}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h5 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Architecture</h5>
            <ul className="space-y-2.5 text-sm">
              {[
                { name: 'Ultra-Luxury Villas', value: 'Villa' },
                { name: 'Sky Penthouses', value: 'Penthouse' },
                { name: 'Modern Apartments', value: 'Modern Apartment' },
                { name: 'Prime Townhouses', value: 'Townhouse' }
              ].map((item) => (
                <li key={item.value}>
                  <button 
                    onClick={() => navigateToType(item.value)} 
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => setActivePage('listings')} 
                  className="text-blue-400 hover:underline flex items-center gap-1 mt-2"
                >
                  <span>View All 240+ Listings</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Market Intelligence */}
          <div>
            <h5 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Market Intel</h5>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Receive confidential off-market inventory alerts, quarterly wealth reports, and architectural previews.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>You're enrolled in Estatly Private Intelligence.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="vip.client@domain.com"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Subscribe Privately</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Estatly Inc. Equal Housing Opportunity. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Representation</span>
            <span className="hover:text-slate-400 cursor-pointer">Sitemap</span>
            <div className="flex items-center gap-1 text-slate-400 border border-slate-800 px-2.5 py-1 rounded-lg bg-slate-900">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>USD ($)</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
