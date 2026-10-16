import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import PropertyComparisonModal from './components/PropertyComparisonModal';
import AuthModal from './components/AuthModal';
import ScheduleViewingModal from './components/ScheduleViewingModal';

import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AgentsPage from './pages/AgentsPage';
import PropertySubmissionPage from './pages/PropertySubmissionPage';
import WishlistPage from './pages/WishlistPage';
import ComparePage from './pages/ComparePage';

function AppContent() {
  const { activePage } = useApp();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'listings':
        return <ListingsPage />;
      case 'property-detail':
        return <PropertyDetailPage />;
      case 'agents':
        return <AgentsPage />;
      case 'submit-property':
        return <PropertySubmissionPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'compare':
        return <ComparePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white antialiased">
      {/* Sticky Glass Navbar */}
      <Navbar />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Global Modals & Overlays */}
      <PropertyComparisonModal />
      <AuthModal />
      <ScheduleViewingModal />
      <ToastContainer />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
