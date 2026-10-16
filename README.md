# Estatly — Premier Luxury Real Estate Marketplace

A modern, professional, and visually stunning Real Estate Marketplace built using **React.js**, **Vite**, and **Tailwind CSS**. Estatly features a sleek dark theme with a sophisticated blue and slate color palette, fluid **Framer Motion** animations, glassmorphic card overlays, and high-performance reusable component architecture.

---

## 🌟 Key Features

### 1. Responsive Landing Page
- **Hero Showcase**: High-impact typography, real-time animated market metrics ($4.8B+ Volume, 12,500+ Verified Portfolios, 99.4% Client Satisfaction).
- **Multi-facet Search Console**: Filter by Purpose (Buy Exclusive, Luxury Lease), Keyword, Enclave, and Architecture Type.
- **Featured Architectural Masterpieces**: Filterable by category (Villas, Penthouses, For Sale, For Lease).
- **Curated Enclaves**: High-resolution destination cards with average pricing (Beverly Hills, Manhattan, Miami Beach, Malibu, Aspen, Seattle).
- **Interactive Mortgage Calculator**: Real-time slider calculations with principal, tax, insurance, and HOA breakdown.
- **Client Commendations**: Testimonials from high-profile buyers and investors.
- **Global Seller Representation Banner**: One-click onboarding for listing estates.

### 2. Property Listings & Spatial Exploration
- **Search & Multi-facet Filtering**:
  - Purpose (All, Buy, Rent)
  - Architectural Style (Villa, Penthouse, Modern Apartment, Townhouse)
  - Location (Beverly Hills, New York, Miami Beach, Malibu, Aspen, Seattle, Austin)
  - Interactive Price Range Slider ($10K/mo up to $30M+)
  - Bedroom & Bathroom Pills (Any, 2, 3, 4, 5+)
  - Amenities Checklist (Private Pool, Smart Home, Wine Cellar, Cinema, Spa, Dock, Elevator)
  - Reset filters with active filter counter badges
- **Sorting Options**: Featured / Curated, Price Low-High, Price High-Low, Newest Architecture, Top Rated, Living Area Largest.
- **Multi-View Modes**:
  - **Grid View** (responsive multi-column layout)
  - **Detailed List View** (horizontal cards with expanded metrics)
  - **Interactive Map Split View** (geocoded interactive map pins with hover tooltips and synchronized card highlights)
- **Pagination**: Configurable items per page, smooth scroll-to-top, and page numbering.

### 3. Property Detail Pages
- **Photo Gallery & Lightbox**: Multi-image gallery with full-screen lightbox modal and thumbnail strip.
- **Key Metrics Strip**: Price, Price/SqFt, Purpose, Beds, Baths, SqFt, Lot Size, Year Built, Garage Spaces.
- **Architectural Highlights & Description**: In-depth overview with verified provenance checklist.
- **Categorized Amenities**: Grouped by Interior Masterworks, Exterior Grounds, Security/Services, and Sustainable Tech.
- **Interactive Floor Plans**: Level switcher (e.g., Main Living, Upper Sanctuary, Rooftop Sky Lounge) with schematic plans and dimensions.
- **Interactive Financing & Debt Service Calculator**: Adjustable Home Price, Down Payment %, Interest Rate %, and Loan Term with monthly payment itemization.
- **Neighborhood Intelligence**: Walk Score, Transit Score, and nearby leisure/schools/airports with distances.
- **Broker Direct Card**: Assigned top 1% advisor profile, direct call/email triggers, and confidential inquiry dispatch.
- **Similar Residences Carousel**: Intelligent recommendations based on city and architectural typology.

### 4. Saved Homes (Wishlist)
- Heart icon toggle on all cards with smooth micro-animations.
- Live badge count in Navbar.
- Dedicated Wishlist view with combined portfolio valuation metrics, average price per square foot, and one-click "Compare All Saved" capability.
- Synchronized with browser `localStorage`.

### 5. Property Comparison Matrix
- Side-by-side comparison matrix supporting up to 4 residences simultaneously.
- Floating bottom dock bar showing active comparison thumbnails and quick actions.
- Dedicated `/compare` page and modal comparison view.
- "Highlight Differences" toggle, remove individual properties, and direct "Book Tour" buttons.

### 6. Premier Advisor Profiles
- Directory of top real estate advisors with experience, active listings, transaction volume, and client ratings.
- Specialty filter (Waterfront, Penthouses, Modernist, Alpine).
- Confidential consultation booking modal with direct messaging.

### 7. Property Submission Form ("List Your Property")
- Multi-step wizard:
  - **Step 1: Listing Essentials & Pricing**
  - **Step 2: Specifications & Prime Enclave Location**
  - **Step 3: High-Definition Photography & Amenities** (includes curated luxury presets and custom image URL support)
  - **Step 4: Confidential Review & Verification**
- Newly submitted properties immediately integrate into the active marketplace search, filters, and detail views.

### 8. Authentication UI
- Sleek modal with Sign In and Create VIP Account tabs.
- 1-Click Fast Demo Logins ("Demo Buyer" and "Demo Broker") for immediate feature testing.
- User profile dropdown in Navbar with avatar, email, role badge, and sign out.

### 9. Private Viewing Scheduler
- Interactive modal to schedule VIP in-person tours or live 3D virtual walkthroughs.
- Preferred date selection, time slot selection (Morning, Mid-Day, Sunset Golden Hour, Twilight Illumination).
- Instant reservation confirmation screen.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Typography**: Plus Jakarta Sans (Google Fonts)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd Estatly

# Install dependencies
npm install

# Start local development server
npm run dev
```

The app will be available at `http://localhost:5173/`.

### Production Build
```bash
npm run build
npm run preview
```

---

## 📁 Project Architecture

```
src/
├── components/
│   ├── AuthModal.jsx                 # Login / Register modal with demo logins
│   ├── Footer.jsx                    # Luxury footer with newsletter & links
│   ├── Navbar.jsx                    # Sticky navigation with wishlist/compare badges
│   ├── PropertyCard.jsx              # Reusable card with image carousel & badges
│   ├── PropertyComparisonModal.jsx   # Floating dock & side-by-side matrix modal
│   ├── ScheduleViewingModal.jsx      # VIP viewing reservation modal
│   └── ToastContainer.jsx            # Framer Motion animated toast alert system
├── context/
│   └── AppContext.jsx                # Global marketplace state management
├── data/
│   └── properties.js                 # Dataset of properties, agents, cities, testimonials
├── pages/
│   ├── AgentsPage.jsx                # Premier advisor directory & consultation
│   ├── ComparePage.jsx               # Dedicated property benchmark comparison page
│   ├── HomePage.jsx                  # Hero, featured listings, mortgage estimator, cities
│   ├── ListingsPage.jsx              # Search, multi-facet filters, sorting, map split view
│   ├── PropertyDetailPage.jsx        # Gallery, floor plans, mortgage calculator, agent card
│   ├── PropertySubmissionPage.jsx    # "List Property" multi-step submission wizard
│   └── WishlistPage.jsx              # Saved properties & portfolio valuation summary
├── App.jsx                           # Root router and modal orchestrator
├── index.css                         # Tailwind CSS v4 imports, dark tokens, glassmorphism
└── main.jsx                          # React application entry point
```

---

## 🎨 Design Philosophy
- **Dark Elegance**: Deep midnight obsidian base (`#060913`, `#0c1222`) paired with sapphire and electric azure highlights (`#3b82f6`, `#60a5fa`).
- **Glassmorphism**: Subtle translucent glass cards with backdrop blurs, glow rings, and border accents.
- **Dynamic Interactions**: Micro-animations on hover, smooth layout transitions with Framer Motion, and instant reactive state updates.
