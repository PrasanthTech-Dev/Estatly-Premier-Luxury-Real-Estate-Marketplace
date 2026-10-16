import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Heart, 
  Layers, 
  PlusCircle, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { 
    activePage, 
    setActivePage, 
    wishlist, 
    compareList, 
    setCompareModalOpen, 
    user, 
    logout, 
    setAuthModalOpen, 
    setAuthMode 
  } = useApp();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'listings', label: 'Explore Properties' },
    { id: 'agents', label: 'Premier Agents' },
    { id: 'wishlist', label: 'Saved Homes', badge: wishlist.length },
    { id: 'compare', label: 'Comparison', badge: compareList.length }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#070b14]/95 backdrop-blur-xl border-b border-blue-500/15 shadow-xl shadow-blue-950/20 py-3.5' 
          : 'bg-[#070b14]/80 backdrop-blur-md border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <button 
            id="nav-logo"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 border border-blue-400/30 shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6 text-white" />
              <div className="absolute -inset-0.5 rounded-xl bg-blue-500/20 blur-sm group-hover:bg-blue-400/30 transition-all" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-extrabold tracking-tight text-white group-hover:text-blue-300 transition-colors">
                  ESTATLY
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              </div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-blue-400/80 -mt-0.5">
                Luxury Marketplace
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  id={`nav-${link.id}`}
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer select-none ${
                    isActive 
                      ? 'text-white bg-blue-600/20 border border-blue-500/40 shadow-inner' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs font-bold rounded-full bg-blue-600 text-white min-w-4 text-center">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div 
                      layoutId="navPill" 
                      className="absolute inset-0 rounded-lg bg-blue-500/10 -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Quick Compare Trigger */}
            {compareList.length > 0 && (
              <button
                onClick={() => setCompareModalOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-900 border border-blue-500/30 text-blue-300 hover:bg-blue-900/30 transition-colors shadow-sm"
                title="Open Comparison Matrix"
              >
                <Layers className="w-4 h-4 text-blue-400" />
                <span>Compare ({compareList.length})</span>
              </button>
            )}

            {/* List Your Property CTA */}
            <button
              id="nav-submit"
              onClick={() => handleNavClick('submit-property')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activePage === 'submit-property'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-900/30 hover:shadow-blue-600/30 hover:scale-[1.02]'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Property</span>
            </button>

            {/* Authentication / User Profile */}
            {user ? (
              <div className="relative">
                <button
                  id="nav-user-dropdown"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-slate-900/80 border border-slate-700/60 hover:border-blue-500/50 transition-all text-slate-200 cursor-pointer"
                >
                  <img 
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full object-cover border border-blue-400/40"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                    }}
                  />
                  <span className="text-xs font-medium max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-blue-500/20 shadow-2xl p-2 z-50 text-sm"
                    >
                      <div className="p-3 border-b border-slate-800">
                        <p className="font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-blue-400">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold uppercase rounded-full bg-blue-500/20 text-blue-300">
                          {user.role}
                        </span>
                      </div>

                      <div className="py-1">
                        <button
                          onClick={() => handleNavClick('wishlist')}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors text-left cursor-pointer"
                        >
                          <Heart className="w-4 h-4 text-rose-400" />
                          <span>Wishlist ({wishlist.length})</span>
                        </button>
                        <button
                          onClick={() => handleNavClick('submit-property')}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors text-left cursor-pointer"
                        >
                          <PlusCircle className="w-4 h-4 text-blue-400" />
                          <span>Submit New Listing</span>
                        </button>
                      </div>

                      <div className="pt-1 border-t border-slate-800">
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-400 hover:bg-rose-500/10 transition-colors text-left cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                id="nav-signin"
                onClick={() => {
                  setAuthMode('login');
                  setAuthModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-slate-900/80 border border-slate-700/80 text-slate-200 hover:text-white hover:border-blue-500/50 hover:bg-slate-800/80 transition-all cursor-pointer"
              >
                <User className="w-4 h-4 text-blue-400" />
                <span>Sign In</span>
              </button>
            )}

          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('wishlist')}
              className="relative p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300"
              aria-label="View Saved Homes"
            >
              <Heart className="w-5 h-5 text-rose-400" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-200 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-blue-500/20 px-4 pt-3 pb-6 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    activePage === link.id
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                      : 'text-slate-300 hover:bg-slate-900/80 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white">
                      {link.badge}
                    </span>
                  )}
                </button>
              ))}

              <div className="pt-4 mt-2 border-t border-slate-800/80 flex flex-col gap-2.5">
                <button
                  onClick={() => handleNavClick('submit-property')}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-lg shadow-blue-600/30"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>List Your Property</span>
                </button>

                {user ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="flex items-center gap-3">
                      <img 
                        src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'} 
                        alt={user.name} 
                        className="w-9 h-9 rounded-full object-cover" 
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                        }}
                      />
                      <div className="text-left">
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="p-2 text-rose-400 hover:bg-rose-500/10 rounded-lg"
                      title="Sign Out"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setAuthModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold hover:border-blue-500/40"
                  >
                    <User className="w-5 h-5 text-blue-400" />
                    <span>Sign In or Register</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
