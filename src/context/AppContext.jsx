import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PROPERTIES, AGENTS } from '../data/properties';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Properties state (supports dynamic additions)
  const [properties, setProperties] = useState(() => {
    try {
      const saved = localStorage.getItem('estatly_custom_properties');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...INITIAL_PROPERTIES, ...parsed];
      }
    } catch {
      // fallback
    }
    return INITIAL_PROPERTIES;
  });

  // Navigation
  const [activePage, setActivePageRaw] = useState('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState(INITIAL_PROPERTIES[0].id);
  const [selectedAgentId, setSelectedAgentId] = useState(null);

  const setActivePage = (page) => {
    setActivePageRaw(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProperty = (propertyId) => {
    setSelectedPropertyId(propertyId);
    setActivePage('property-detail');
  };

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('estatly_wishlist');
      return saved ? JSON.parse(saved) : ['est-001', 'est-003'];
    } catch {
      return ['est-001', 'est-003'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('estatly_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const toggleWishlist = (propertyId) => {
    const prop = properties.find(p => p.id === propertyId);
    if (wishlist.includes(propertyId)) {
      setWishlist(prev => prev.filter(id => id !== propertyId));
      showToast(`Removed "${prop?.title || 'Property'}" from saved favorites`, 'info');
    } else {
      setWishlist(prev => [...prev, propertyId]);
      showToast(`Added "${prop?.title || 'Property'}" to your wishlist!`, 'success');
    }
  };

  const isInWishlist = (propertyId) => wishlist.includes(propertyId);

  const clearWishlist = () => {
    setWishlist([]);
    showToast('Wishlist cleared', 'info');
  };

  // Property Comparison (max 4) - only active when user explicitly compares
  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem('estatly_compare');
      if (saved) {
        const parsed = JSON.parse(saved);
        // If it matches the legacy hardcoded mock sample ['est-001', 'est-002'], discard and clear it
        if (
          Array.isArray(parsed) &&
          parsed.length === 2 &&
          parsed.includes('est-001') &&
          parsed.includes('est-002')
        ) {
          localStorage.removeItem('estatly_compare');
          return [];
        }
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch {
      return [];
    }
  });

  const [compareModalOpen, setCompareModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('estatly_compare', JSON.stringify(compareList));
    } catch {
      // ignore
    }
  }, [compareList]);

  const addToCompare = (propertyId) => {
    if (compareList.includes(propertyId)) {
      setCompareList(prev => prev.filter(id => id !== propertyId));
      showToast('Removed from property comparison', 'info');
      return;
    }
    if (compareList.length >= 4) {
      showToast('You can compare a maximum of 4 properties simultaneously', 'warning');
      return;
    }
    setCompareList(prev => [...prev, propertyId]);
    showToast('Added to comparison matrix', 'success');
  };

  const removeFromCompare = (propertyId) => {
    setCompareList(prev => prev.filter(id => id !== propertyId));
    showToast('Removed from comparison', 'info');
  };

  const clearCompare = () => {
    setCompareList([]);
    showToast('Cleared comparison list', 'info');
  };

  const isInCompare = (propertyId) => compareList.includes(propertyId);

  // Search & Filter State
  const defaultFilters = {
    query: '',
    purpose: 'all', // 'all' | 'sale' | 'rent'
    type: 'all',    // 'all' | 'Villa' | 'Penthouse' | 'Modern Apartment' | 'Townhouse'
    city: 'all',
    minPrice: 0,
    maxPrice: 30000000,
    bedrooms: 'all',
    bathrooms: 'all',
    amenities: [],
    sortBy: 'featured' // 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating' | 'sqft-desc'
  };

  const [filters, setFilters] = useState(defaultFilters);

  const resetFilters = () => {
    setFilters(defaultFilters);
    showToast('Filters reset to default', 'info');
  };

  // Auth State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('estatly_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  const login = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem('estatly_user', JSON.stringify(userData));
    } catch {
      // ignore
    }
    showToast(`Welcome back, ${userData.name}!`, 'success');
    setAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('estatly_user');
    } catch {
      // ignore
    }
    showToast('You have signed out', 'info');
  };

  // Schedule Viewing Modal
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [scheduleProperty, setScheduleProperty] = useState(null);

  const openScheduleModal = (property) => {
    setScheduleProperty(property);
    setScheduleModalOpen(true);
  };

  const closeScheduleModal = () => {
    setScheduleModalOpen(false);
    setScheduleProperty(null);
  };

  // Property Submission
  const addProperty = (newProperty) => {
    const formatted = {
      ...newProperty,
      id: `est-user-${Date.now()}`,
      slug: (newProperty.title || 'luxury-property').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      rating: 5.0,
      reviewsCount: 1,
      featured: false,
      tag: 'New Listing',
      agent: AGENTS[0]
    };

    setProperties(prev => [formatted, ...prev]);

    try {
      const saved = localStorage.getItem('estatly_custom_properties');
      const existing = saved ? JSON.parse(saved) : [];
      localStorage.setItem('estatly_custom_properties', JSON.stringify([formatted, ...existing]));
    } catch {
      // ignore
    }

    showToast('Your luxury property was published successfully!', 'success');
    navigateToProperty(formatted.id);
  };

  // Toasts
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        properties,
        activePage,
        setActivePage,
        selectedPropertyId,
        setSelectedPropertyId,
        navigateToProperty,
        selectedAgentId,
        setSelectedAgentId,
        wishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        compareModalOpen,
        setCompareModalOpen,
        filters,
        setFilters,
        resetFilters,
        user,
        login,
        logout,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode,
        scheduleModalOpen,
        scheduleProperty,
        openScheduleModal,
        closeScheduleModal,
        addProperty,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
