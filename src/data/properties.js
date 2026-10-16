export const AGENTS = [
  {
    id: 'agent-1',
    name: 'Elena Rostova',
    title: 'Senior Luxury Real Estate Advisor',
    specialty: 'Ultra-Luxury Estates & Waterfront',
    experience: '14+ Years',
    phone: '+1 (310) 849-2910',
    email: 'elena.rostova@estatly.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    rating: 4.98,
    reviewsCount: 142,
    salesVolume: '$420M+',
    activeListingsCount: 8,
    license: 'DRE #01928471',
    languages: ['English', 'French', 'Russian'],
    bio: 'Specializing in Beverly Hills, Bel Air, and Malibu ultra-prime residential architecture. Recognized in the Top 1% of luxury brokers worldwide.'
  },
  {
    id: 'agent-2',
    name: 'Marcus Vance',
    title: 'Managing Director & Penthouse Specialist',
    specialty: 'High-Rise Penthouses & Lofts',
    experience: '12+ Years',
    phone: '+1 (212) 650-8431',
    email: 'marcus.vance@estatly.com',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    rating: 4.95,
    reviewsCount: 118,
    salesVolume: '$380M+',
    activeListingsCount: 6,
    license: 'NY-RE #4928172',
    languages: ['English', 'German', 'Spanish'],
    bio: 'Dedicated to architectural masterworks in Manhattan, Tribeca, and Miami. Trusted by global leaders, venture capitalists, and family offices.'
  },
  {
    id: 'agent-3',
    name: 'Sophia Chen-Alvarez',
    title: 'Modern Architecture & Coastal Specialist',
    specialty: 'Modernist Villas & Oceanfront',
    experience: '9+ Years',
    phone: '+1 (305) 914-7260',
    email: 'sophia.chen@estatly.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    rating: 4.96,
    reviewsCount: 97,
    salesVolume: '$290M+',
    activeListingsCount: 7,
    license: 'FL-RE #3829104',
    languages: ['English', 'Mandarin', 'Spanish'],
    bio: 'Passionate about sustainable luxury architecture, floor-to-ceiling glass design, and exclusive private island residences across Miami and Southern California.'
  },
  {
    id: 'agent-4',
    name: 'Julian Sterling',
    title: 'Private Wealth & Alpine Portfolio Director',
    specialty: 'Chalet Estates & Equestrian Ranches',
    experience: '16+ Years',
    phone: '+1 (970) 520-9942',
    email: 'julian.sterling@estatly.com',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    rating: 4.99,
    reviewsCount: 164,
    salesVolume: '$510M+',
    activeListingsCount: 5,
    license: 'CO-RE #1092837',
    languages: ['English', 'Italian'],
    bio: 'Representing rare mountain retreats, historic legacy ranches, and private ski-in/ski-out estates across Aspen, Vail, and Pacific Northwest.'
  }
];

export const INITIAL_PROPERTIES = [
  {
    id: 'est-001',
    title: 'The Bel Air Grand Horizon Villa',
    slug: 'bel-air-grand-horizon-villa',
    tag: 'Exclusive',
    featured: true,
    price: 18500000,
    pricePerSqft: 1762,
    purpose: 'sale',
    type: 'Villa',
    bedrooms: 6,
    bathrooms: 8,
    sqft: 10500,
    lotSize: '1.4 Acres',
    yearBuilt: 2024,
    garage: 5,
    hoaFee: 1250,
    annualTaxes: 148000,
    address: '10842 Bellagio Crest Road',
    city: 'Beverly Hills',
    state: 'CA',
    zip: '90210',
    coordinates: { lat: 34.0837, lng: -118.4412 },
    rating: 4.98,
    reviewsCount: 29,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=85'
    ],
    roomPhotos: [
      { room: 'Main Elevation & Infinity Pool', category: 'exterior', url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Grand Living Hall & Lounge', category: 'living', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Master Bedroom Suite', category: 'bedroom', url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Gourmet Chef Kitchen', category: 'kitchen', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Marble Spa Bathroom', category: 'bathroom', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Sunset Balcony & Sky Terrace', category: 'balcony', url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=85' }
    ],
    description: 'An architectural tour de force crowning Bel Air with unobstructed 270-degree jetliner vistas from Downtown LA to the Pacific Ocean. Designed with cantilevered infinity pools, disappearing automated glass walls, and imported Italian travertine surfaces. Includes a 1,200-bottle climate-controlled wine gallery, state-of-the-art Dolby Atmos screening theater, and an executive wellness spa with cold plunge and Finnish sauna.',
    highlights: [
      'Panoramic 270° Ocean-to-City Jetliner Views',
      'Double Cantilevered Edge Infinity Pool & Fire Lounge',
      '1,200 Bottle Wine Cellar & Tasting Salon',
      'Dolby Atmos 14-Seat Private Screening Theater',
      'Executive Spa with Cold Plunge, Sauna & Steam',
      'Subterranean 5-Car Gallery Garage'
    ],
    amenities: {
      interior: ['Smart Home Automation', 'Custom Wine Cellar', 'Private Cinema', 'Chef Kitchen with Gaggenau Appliances', 'Walk-in Dressing Rooms', 'Fireplaces in Master & Living', 'Home Automation Creston OS'],
      exterior: ['Infinity Edge Pool', 'Sunken Fire Pit Lounge', 'Outdoor Kitchen & BBQ Pavilion', 'Landscaped Zen Garden', 'Rooftop Stargazing Deck', 'Private Security Gate'],
      luxury: ['Helipad Access', 'Elevator to All 3 Levels', 'Private Guardhouse', 'Staff Quarters', 'Commercial Grade Backup Generator'],
      eco: ['Tesla Solar Roof Array', 'Rainwater Harvesting System', 'Dual EV Fast Chargers', 'Triple Glazed Acoustical Glass']
    },
    floorPlans: [
      { level: 'Ground Floor & Entertainment', beds: 2, baths: 3, sqft: 4800, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
      { level: 'Upper Level & Master Sanctuary', beds: 4, baths: 4, sqft: 4200, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80' },
      { level: 'Rooftop Sky Lounge', beds: 0, baths: 1, sqft: 1500, image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' }
    ],
    neighborhood: {
      walkScore: 78,
      transitScore: 65,
      nearby: [
        { name: 'Bel-Air Country Club', type: 'Golf & Leisure', distance: '1.2 miles' },
        { name: 'Rodeo Drive Boutiques', type: 'Luxury Shopping', distance: '3.8 miles' },
        { name: 'Beverly Hills Hotel', type: 'Dining & Hospitality', distance: '2.9 miles' },
        { name: 'Harvard-Westlake School', type: 'Private Education', distance: '3.1 miles' }
      ]
    },
    agent: AGENTS[0]
  },
  {
    id: 'est-002',
    title: 'The TriBeCa Glass Crown Penthouse',
    slug: 'tribeca-glass-crown-penthouse',
    tag: 'Featured',
    featured: true,
    price: 14200000,
    pricePerSqft: 2184,
    purpose: 'sale',
    type: 'Penthouse',
    bedrooms: 4,
    bathrooms: 5,
    sqft: 6500,
    lotSize: 'N/A',
    yearBuilt: 2023,
    garage: 2,
    hoaFee: 3100,
    annualTaxes: 122000,
    address: '68 Franklin Street, PH 28',
    city: 'New York',
    state: 'NY',
    zip: '10013',
    coordinates: { lat: 40.7185, lng: -74.0084 },
    rating: 4.95,
    reviewsCount: 22,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1600&q=85'
    ],
    roomPhotos: [
      { room: 'Iconic Penthouse Facade & Skyline', category: 'exterior', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Double-Height Gallery Living Hall', category: 'living', url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Primary Master Suite', category: 'bedroom', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Custom Poliform Kitchen', category: 'kitchen', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Dornbracht Master Spa Bath', category: 'bathroom', url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Wraparound Sky Balcony & Plunge Pool', category: 'balcony', url: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1600&q=85' }
    ],
    description: 'Occupying the top two levels of TriBeCa’s most iconic modern tower, this duplex penthouse features 22-foot double-height ceilings, a 1,800 sq ft wrap-around private terrace with heated plunge pool, and museum-grade finishes throughout. Direct keyed elevator entry opens into a light-drenched gallery space framed by floor-to-ceiling curtain glass walls.',
    highlights: [
      '22-Foot Double-Height Living Room Gallery',
      '1,800 Sq Ft Wraparound Terrace with Heated Plunge Pool',
      'Direct Private Keyed Elevator Entry',
      'Custom Poliform Kitchen with Calacatta Gold Marble',
      '24/7 White-Glove Doorman & Concierge Services',
      'Two Dedicated Deeded Valet Parking Spaces'
    ],
    amenities: {
      interior: ['Private Keyed Elevator', 'Gas Fireplace in Living & Master', 'Custom Poliform Millwork', 'Wine Storage for 400 Bottles', 'Dornbracht & Boffi Bathrooms', 'Lutron Smart Lighting'],
      exterior: ['Wraparound Rooftop Terrace', 'Private Plunge Pool', 'Outdoor Gas Fire Pit', 'Summer Kitchenette with Sub-Zero BBQ'],
      luxury: ['24/7 White-Glove Concierge', 'Residents Private Health Club', '75-Foot Indoor Lap Pool', 'Chauffeur Lounge'],
      eco: ['LEED Gold Certified Building', 'Acoustic Double-Pane Curtain Wall', 'Energy Recovery Ventilation']
    },
    floorPlans: [
      { level: 'Lower Living & Entertaining Level', beds: 1, baths: 2, sqft: 3600, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80' },
      { level: 'Upper Suite Sanctuary & Terrace', beds: 3, baths: 3, sqft: 2900, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80' }
    ],
    neighborhood: {
      walkScore: 99,
      transitScore: 100,
      nearby: [
        { name: 'Hudson River Park & Piers', type: 'Parks & Waterfront', distance: '0.3 miles' },
        { name: 'Locanda Verde', type: 'Fine Dining', distance: '0.2 miles' },
        { name: 'Whole Foods Market TriBeCa', type: 'Gourmet Grocery', distance: '0.4 miles' },
        { name: 'The Odeon', type: 'Historic Dining', distance: '0.2 miles' }
      ]
    },
    agent: AGENTS[1]
  },
  {
    id: 'est-003',
    title: 'Star Island Modern Waterfront Sanctuary',
    slug: 'star-island-modern-waterfront-sanctuary',
    tag: 'Waterfront',
    featured: true,
    price: 24900000,
    pricePerSqft: 2165,
    purpose: 'sale',
    type: 'Villa',
    bedrooms: 7,
    bathrooms: 9,
    sqft: 11500,
    lotSize: '0.9 Acres',
    yearBuilt: 2024,
    garage: 6,
    hoaFee: 1800,
    annualTaxes: 185000,
    address: '42 Star Island Drive',
    city: 'Miami Beach',
    state: 'FL',
    zip: '33139',
    coordinates: { lat: 25.7781, lng: -80.1504 },
    rating: 4.99,
    reviewsCount: 35,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85',
      '/images/star-island-hall.jpg',
      '/images/star-island-bedroom.jpg',
      '/images/star-island-kitchen.jpg',
      '/images/star-island-bathroom.jpg',
      '/images/star-island-balcony.jpg'
    ],
    roomPhotos: [
      { room: 'Front Elevation & Pool', category: 'exterior', url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Tropical Sunken Living Hall', category: 'living', url: '/images/star-island-hall.jpg' },
      { room: 'Waterfront Master Bedroom Suite', category: 'bedroom', url: '/images/star-island-bedroom.jpg' },
      { room: 'Italian Double Island Chef Kitchen', category: 'kitchen', url: '/images/star-island-kitchen.jpg' },
      { room: 'Garden Spa Bathroom & Soaking Tub', category: 'bathroom', url: '/images/star-island-bathroom.jpg' },
      { room: 'Cantilevered Sunset Sky Balcony', category: 'balcony', url: '/images/star-island-balcony.jpg' }
    ],
    description: 'A signature modern estate directly situated on Miami Beach’s prestigious guarded Star Island. Boasts 110 feet of deepwater frontage capable of accommodating a 125-foot mega-yacht with direct ocean access and no fixed bridges. Tropical architectural landscaping, reflecting water gardens, rooftop terrace, and resort-level wellness amenities.',
    highlights: [
      '110-Foot Deepwater Frontage for Mega-Yacht Dockage',
      'Guarded 24/7 Gated Island Security',
      'Zero-Edge Saltwater Pool & Swim-Up Bar',
      'Rooftop Sky Deck with 360° Biscayne Bay Views',
      'Guest House with Full Suite & Kitchenette',
      'Indoor-Outdoor Motor Court for 10 Vehicles'
    ],
    amenities: {
      interior: ['Floor-to-Ceiling Impact Glass', 'Italian Kitchen with Double Islands', 'Private Cinema Room', 'Wine Tasting Lounge', 'Master Suite with Dual Baths & Spa'],
      exterior: ['110 Ft Private Dock', 'Zero-Edge Pool', 'Swim-Up Wet Bar', 'Summer Kitchen & BBQ Gazebo', 'Covered Loggias'],
      luxury: ['24/7 Armed Island Security', 'Detached 2-Bedroom Guest House', 'Steam Room & Sauna Suite', 'High-Speed Boat Lift'],
      eco: ['Solar Photovoltaic System', 'Impact-Rated High Efficiency Glazing', 'Smart Irrigation Controller']
    },
    floorPlans: [
      { level: 'Main Villa Level', beds: 3, baths: 4, sqft: 6200, image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80' },
      { level: 'Second Level Master & Suites', beds: 4, baths: 5, sqft: 4100, image: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=800&q=80' },
      { level: 'Detached Waterfront Guest House', beds: 1, baths: 1, sqft: 1200, image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=800&q=80' }
    ],
    neighborhood: {
      walkScore: 62,
      transitScore: 55,
      nearby: [
        { name: 'South Beach Ocean Drive', type: 'Nightlife & Culture', distance: '1.5 miles' },
        { name: 'Miami Beach Marina', type: 'Yacht Club & Boating', distance: '1.1 miles' },
        { name: 'Carbone Miami', type: 'Culinary Dining', distance: '1.9 miles' },
        { name: 'Miami International Airport', type: 'Aviation', distance: '11 miles' }
      ]
    },
    agent: AGENTS[2]
  },
  {
    id: 'est-004',
    title: 'Malibu Pacific Horizon Cliffside Estate',
    slug: 'malibu-pacific-horizon-cliffside-estate',
    tag: 'Just Listed',
    featured: true,
    price: 32000,
    pricePerSqft: 6,
    purpose: 'rent',
    type: 'Villa',
    bedrooms: 5,
    bathrooms: 6,
    sqft: 7200,
    lotSize: '2.1 Acres',
    yearBuilt: 2022,
    garage: 3,
    hoaFee: 0,
    annualTaxes: 0,
    address: '32410 Pacific Coast Highway',
    city: 'Malibu',
    state: 'CA',
    zip: '90265',
    coordinates: { lat: 34.0259, lng: -118.7798 },
    rating: 4.97,
    reviewsCount: 19,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      '/images/malibu-cliffside-hall.jpg',
      '/images/malibu-cliffside-bedroom.jpg',
      '/images/malibu-cliffside-kitchen.jpg',
      '/images/malibu-cliffside-bathroom.jpg',
      '/images/malibu-cliffside-balcony.jpg'
    ],
    roomPhotos: [
      { room: 'Blufftop Elevation & Infinity Edge', category: 'exterior', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Oceanfront Grand Living Hall', category: 'living', url: '/images/malibu-cliffside-hall.jpg' },
      { room: 'Cliffside Master Bedroom Suite', category: 'bedroom', url: '/images/malibu-cliffside-bedroom.jpg' },
      { room: 'White Quartz Gourmet Chef Kitchen', category: 'kitchen', url: '/images/malibu-cliffside-kitchen.jpg' },
      { room: 'Oceanfront Panoramic Spa Bathroom', category: 'bathroom', url: '/images/malibu-cliffside-bathroom.jpg' },
      { room: 'Pacific Sunset Cliff Balcony & Terrace', category: 'balcony', url: '/images/malibu-cliffside-balcony.jpg' }
    ],
    description: 'Set upon a private bluff directly above Broad Beach in Malibu, this organic modern architectural marvel blends warm teak, board-formed concrete, and expanses of frameless glass. Private funicular and staircase lead directly down to secluded sandy beach cove. Available for luxury seasonal or annual lease.',
    highlights: [
      'Direct Private Beach Access via Funicular & Steps',
      'Cantilevered Heated Infinity Pool Overlooking Surf',
      'Warm Organic Architectural Finishes (Teak & Concrete)',
      'Gourmet Outdoor Pizza Oven & Teppanyaki Grill',
      'Primary Suite with Ocean-View Outdoor Soaking Tub',
      'Fully Furnished by Renowned Designer Studio'
    ],
    amenities: {
      interior: ['Designer Furnishings Included', 'Soundproof Media Screening Room', 'Wine Room', 'Custom Cedar Sauna', 'Fireplace in Master Suite'],
      exterior: ['Infinity Edge Pool & Hot Tub', 'Private Funicular to Beach', 'Oceanfront Dining Pavilion', 'Outdoor Fire Pit', 'Surfboard & Water Toys Storage'],
      luxury: ['Full Concierge & Maid Service Option', 'Private Security Gated Drive', 'Beach Butler Service Available'],
      eco: ['Geothermal Heating System', 'Low-E Acoustic Glass', 'EV Charger Station']
    },
    floorPlans: [
      { level: 'Main Surf Living Level', beds: 2, baths: 2, sqft: 3900, image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80' },
      { level: 'Upper Master & Ocean Suites', beds: 3, baths: 4, sqft: 3300, image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=800&q=80' }
    ],
    neighborhood: {
      walkScore: 45,
      transitScore: 30,
      nearby: [
        { name: 'Broad Beach / El Matador', type: 'Beach & Nature', distance: '0.1 miles' },
        { name: 'Nobu Malibu', type: 'Iconic Ocean Dining', distance: '7.8 miles' },
        { name: 'Malibu Country Mart', type: 'Boutique Shopping', distance: '6.5 miles' }
      ]
    },
    agent: AGENTS[0]
  },
  {
    id: 'est-005',
    title: 'The Aspen Alpine Sanctuary Chalet',
    slug: 'aspen-alpine-sanctuary-chalet',
    tag: 'Exclusive',
    featured: false,
    price: 19800000,
    pricePerSqft: 2250,
    purpose: 'sale',
    type: 'Villa',
    bedrooms: 6,
    bathrooms: 7,
    sqft: 8800,
    lotSize: '3.4 Acres',
    yearBuilt: 2023,
    garage: 4,
    hoaFee: 950,
    annualTaxes: 110000,
    address: '450 Red Mountain Road',
    city: 'Aspen',
    state: 'CO',
    zip: '81611',
    coordinates: { lat: 39.1911, lng: -106.8175 },
    rating: 4.99,
    reviewsCount: 31,
    images: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85',
      '/images/aspen-chalet-hall.jpg',
      '/images/aspen-chalet-bedroom.jpg',
      '/images/aspen-chalet-kitchen.jpg',
      '/images/aspen-chalet-bathroom.jpg',
      '/images/aspen-chalet-balcony.jpg'
    ],
    roomPhotos: [
      { room: 'Alpine Chalet Elevation & Pines', category: 'exterior', url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Cathedral Beamed Great Living Hall', category: 'living', url: '/images/aspen-chalet-hall.jpg' },
      { room: 'Fireplace Master Bedroom Sanctuary', category: 'bedroom', url: '/images/aspen-chalet-bedroom.jpg' },
      { room: 'Mountain Granite Gourmet Chef Kitchen', category: 'kitchen', url: '/images/aspen-chalet-kitchen.jpg' },
      { room: 'Heated Natural Stone Spa Bathroom', category: 'bathroom', url: '/images/aspen-chalet-bathroom.jpg' },
      { room: 'Snow-Peak View Heated Sunset Balcony', category: 'balcony', url: '/images/aspen-chalet-balcony.jpg' }
    ],
    description: 'An architectural legacy on Aspen’s world-renowned Red Mountain, dubbed “Billionaire Mountain”. Direct ski-in / ski-out access, majestic cathedral-beamed great room with monumental Colorado granite fireplace, heated stone motor court, and an all-season indoor-outdoor heated spa with unobstructed views of Ajax Mountain.',
    highlights: [
      'Direct Ski-In / Ski-Out Access to Aspen Slopes',
      'Unrivaled Panoramic Views of Ajax Mountain',
      'Heated Stone Driveway & 4-Car Heated Garage',
      'Ski Locker Room with Boot Warmers & Espresso Bar',
      'Indoor/Outdoor All-Season Heated Swimming Pavilion',
      'Private 3.4-Acre Mountain Pine Sanctuary'
    ],
    amenities: {
      interior: ['Radiant Heated Floors Throughout', 'Monumental Stone Fireplaces (4)', 'Custom Ski Locker Room', 'Wine Tasting Grotto', 'Bunk Room for 8', 'Home Theater'],
      exterior: ['Heated Terrace & Fire Lounges', 'All-Season Heated Pool & Spa', 'Outdoor Stone BBQ Kitchen', 'Snow-Melt Driveway System'],
      luxury: ['Private Ski Valet Service', 'Wine Cellar for 800 Bottles', 'Steam Shower & Cold Plunge Spa'],
      eco: ['High-Performance Thermal Envelope', 'Geothermal Heating System', 'Solar Assisted Domestic Hot Water']
    },
    floorPlans: [
      { level: 'Ski Level & Wellness Spa', beds: 2, baths: 3, sqft: 3800, image: '/images/aspen-chalet-bathroom.jpg' },
      { level: 'Main Grand Great Room', beds: 1, baths: 2, sqft: 3200, image: '/images/aspen-chalet-hall.jpg' },
      { level: 'Upper Suite Wing', beds: 3, baths: 2, sqft: 1800, image: '/images/aspen-chalet-bedroom.jpg' }
    ],
    neighborhood: {
      walkScore: 40,
      transitScore: 50,
      nearby: [
        { name: 'Aspen Mountain Gondola', type: 'Ski & Adventure', distance: '1.4 miles' },
        { name: 'Matsuhisa Aspen', type: 'Fine Dining', distance: '1.2 miles' },
        { name: 'Hotel Jerome', type: 'Historic Luxury', distance: '1.3 miles' },
        { name: 'Aspen Pitkin County Airport', type: 'Private Jet Center', distance: '4.8 miles' }
      ]
    },
    agent: AGENTS[3]
  },
  {
    id: 'est-006',
    title: 'The Hudson Riverfront Modern Loft',
    slug: 'hudson-riverfront-modern-loft',
    tag: 'Price Drop',
    featured: false,
    price: 18500,
    pricePerSqft: 6,
    purpose: 'rent',
    type: 'Modern Apartment',
    bedrooms: 3,
    bathrooms: 3.5,
    sqft: 3200,
    lotSize: 'N/A',
    yearBuilt: 2021,
    garage: 1,
    hoaFee: 0,
    annualTaxes: 0,
    address: '150 Charles Street, Apt 11B',
    city: 'New York',
    state: 'NY',
    zip: '10014',
    coordinates: { lat: 40.7335, lng: -74.0091 },
    rating: 4.94,
    reviewsCount: 16,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1600&q=85'
    ],
    roomPhotos: [
      { room: 'West Village Modern Facade', category: 'exterior', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Open Plan Sunset Living Hall', category: 'living', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Minimalist Oak Master Bedroom Suite', category: 'bedroom', url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Molteni Bespoke Kitchen & Marble Bar', category: 'kitchen', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Freestanding Deep Tub Spa Bathroom', category: 'bathroom', url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Private Loggia Sunset Balcony', category: 'balcony', url: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1600&q=85' }
    ],
    description: 'Premier West Village living overlooking Hudson River Park. Featuring wide-plank Bavarian oak flooring, floor-to-ceiling casement windows with dramatic river sunsets, and a Molteni kitchen equipped with dual Sub-Zero refrigerators and marble breakfast bar.',
    highlights: [
      'Unobstructed West-Facing Hudson River Sunset Views',
      'Bespoke Molteni Designer Kitchen with Marble Islands',
      'West Village Prime Location next to River Walkways',
      'Full Service Condominium with 24-Hour Concierge & Valet',
      '75-Ft Lap Pool, Fitness Center, and Spa'
    ],
    amenities: {
      interior: ['Motorized Window Shades', 'Smart Lighting by Lutron', 'Dual Zone Central Air', 'Wine Refrigerator', 'Custom California Closets'],
      exterior: ['Private Loggia Balcony', 'Residents Landscaped Courtyard'],
      luxury: ['Full Service Concierge', '75-Foot Indoor Pool', 'State-of-the-art Gym', 'Cold Storage for Deliveries'],
      eco: ['Energy Star Appliances', 'LEED Silver Certified']
    },
    floorPlans: [
      { level: 'Single Level Loft Plan', beds: 3, baths: 3.5, sqft: 3200, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' }
    ],
    neighborhood: {
      walkScore: 98,
      transitScore: 96,
      nearby: [
        { name: 'Hudson River Park', type: 'Parks & Recreation', distance: '0.1 miles' },
        { name: 'The Spotted Pig Legacy District', type: 'Village Cafes', distance: '0.3 miles' },
        { name: 'Whitney Museum of American Art', type: 'Art & Culture', distance: '0.6 miles' }
      ]
    },
    agent: AGENTS[1]
  },
  {
    id: 'est-007',
    title: 'The Seattle Waterfront Glass Haven',
    slug: 'seattle-waterfront-glass-haven',
    tag: 'Featured',
    featured: true,
    price: 9850000,
    pricePerSqft: 1539,
    purpose: 'sale',
    type: 'Modern Apartment',
    bedrooms: 4,
    bathrooms: 5,
    sqft: 6400,
    lotSize: '0.6 Acres',
    yearBuilt: 2023,
    garage: 3,
    hoaFee: 650,
    annualTaxes: 84000,
    address: '3820 West Mercer Way',
    city: 'Seattle',
    state: 'WA',
    zip: '98040',
    coordinates: { lat: 47.5707, lng: -122.2221 },
    rating: 4.96,
    reviewsCount: 18,
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=85'
    ],
    roomPhotos: [
      { room: 'Lakefront Architectural Glass Haven', category: 'exterior', url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Glass Atrium Panoramic Living Hall', category: 'living', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Lake-Facing Master Bedroom Suite', category: 'bedroom', url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Sub-Zero Designer Chef Kitchen', category: 'kitchen', url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Japanese Cedar & Marble Spa Bathroom', category: 'bathroom', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Covered Heated Waterfront Balcony', category: 'balcony', url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=85' }
    ],
    description: 'An architectural statement on Mercer Island offering 90 feet of private Lake Washington shoreline. Sweeping views of the Seattle skyline and Mount Rainier. Features an automated yacht slip, cedar hot tub pavilion, and multi-level outdoor terraces designed for seamless indoor-outdoor Pacific Northwest living.',
    highlights: [
      '90 Ft Private Lake Washington Shoreline with Deepwater Dock',
      'Seattle Skyline & Mt. Rainier Unobstructed Vistas',
      'Hydronic Radiant Heated Floors Throughout',
      'Indoor Glass Atrium with Living Japanese Maple',
      'Wine Grotto with Sommelier Tasting Bar'
    ],
    amenities: {
      interior: ['Radiant Floor Heating', 'Indoor Atrium', 'Smart Home Control4', 'Sub-Zero & Wolf Kitchen', 'Custom Sauna & Steam'],
      exterior: ['Private Deepwater Dock with Yacht Lift', 'Cedar Hot Tub Pavilion', 'Covered Heated Terrace', 'Kayaks & Jet Ski Launch'],
      luxury: ['Wine Grotto', 'Heated 3-Car Garage with EV Chargers', 'Private Security Gate'],
      eco: ['Solar Microgrid', 'High-Efficiency Heat Pumps', 'Rainwater Garden']
    },
    floorPlans: [
      { level: 'Lakefront Living & Lounge', beds: 2, baths: 2, sqft: 3400, image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80' },
      { level: 'Upper Suite Sanctuary', beds: 2, baths: 3, sqft: 3000, image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80' }
    ],
    neighborhood: {
      walkScore: 68,
      transitScore: 60,
      nearby: [
        { name: 'Mercer Island Town Center', type: 'Dining & Shopping', distance: '1.2 miles' },
        { name: 'Downtown Seattle / Pike Place', type: 'Urban Core', distance: '6.5 miles' },
        { name: 'Bellevue Downtown Park', type: 'Tech Hub & Retail', distance: '4.8 miles' }
      ]
    },
    agent: AGENTS[2]
  },
  {
    id: 'est-008',
    title: 'The Austin Hillside Architectural Manor',
    slug: 'austin-hillside-architectural-manor',
    tag: 'Investment Pick',
    featured: false,
    price: 8450000,
    pricePerSqft: 1126,
    purpose: 'sale',
    type: 'Villa',
    bedrooms: 5,
    bathrooms: 6,
    sqft: 7500,
    lotSize: '1.8 Acres',
    yearBuilt: 2024,
    garage: 4,
    hoaFee: 400,
    annualTaxes: 72000,
    address: '2411 Westlake Highlands Pass',
    city: 'Austin',
    state: 'TX',
    zip: '78746',
    coordinates: { lat: 30.2785, lng: -97.8012 },
    rating: 4.95,
    reviewsCount: 14,
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      '/images/austin-manor-hall.jpg',
      '/images/austin-manor-bedroom.jpg',
      '/images/austin-manor-kitchen.jpg',
      '/images/austin-manor-bathroom.jpg',
      '/images/austin-manor-balcony.jpg'
    ],
    roomPhotos: [
      { room: 'Hillside Modern Manor & Lawn Courtyard', category: 'exterior', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Double-Volume Great Living Hall', category: 'living', url: '/images/austin-manor-hall.jpg' },
      { room: 'Upper Level Master Suite Sanctuary', category: 'bedroom', url: '/images/austin-manor-bedroom.jpg' },
      { room: 'Indoor-Outdoor Marble Chef Kitchen', category: 'kitchen', url: '/images/austin-manor-kitchen.jpg' },
      { room: 'Natural Bamboo Garden Spa Bathroom', category: 'bathroom', url: '/images/austin-manor-bathroom.jpg' },
      { room: 'Hill Country Sunset Upper Terrace', category: 'balcony', url: '/images/austin-manor-balcony.jpg' }
    ],
    description: 'Perched on high ridge in Westlake Hills, blending Texas limestone with warm walnut woods and clean steel accents. Includes negative-edge pool overlooking the Hill Country, detached creative studio, and a commercial-grade outdoor BBQ kitchen under shaded oak canopies.',
    highlights: [
      'Hill Country Sunset Views from Every Primary Room',
      'Negative-Edge Swimming Pool & Sunken Fire Pit',
      'Detached 800 Sq Ft Creative Studio / Guest House',
      'Top-Ranked Eanes Independent School District',
      'Oversized 4-Car Garage with Workshop & Storage'
    ],
    amenities: {
      interior: ['Texas Limestone & Walnut Walls', 'Linear Fireplaces', 'Chef Scullery Pantry', 'Game Room with Wet Bar', 'Master Suite with Steam Shower'],
      exterior: ['Negative-Edge Pool', 'Sunken Fire Pit', 'Outdoor Kitchen with Built-in Smoker', 'Covered Porch with Fans'],
      luxury: ['Detached Studio / Office', 'Gated Driveway', 'Whole-Home Audio System'],
      eco: ['Spray Foam Insulation', 'High-SEER Multi-Stage AC', 'Native Drought-Tolerant Landscaping']
    },
    floorPlans: [
      { level: 'Main Level Living & Suites', beds: 3, baths: 4, sqft: 5200, image: '/images/austin-manor-hall.jpg' },
      { level: 'Upper Entertainment & Suites', beds: 2, baths: 2, sqft: 2300, image: '/images/austin-manor-bedroom.jpg' }
    ],
    neighborhood: {
      walkScore: 55,
      transitScore: 40,
      nearby: [
        { name: 'Lake Austin Marina', type: 'Boating & Dining', distance: '2.1 miles' },
        { name: 'Downtown Austin / Lady Bird Lake', type: 'City Center', distance: '5.2 miles' },
        { name: 'Barton Creek Country Club', type: 'Golf & Spa', distance: '3.4 miles' }
      ]
    },
    agent: AGENTS[2]
  },
  {
    id: 'est-009',
    title: 'The Mayfair Heritage Modern Townhouse',
    slug: 'mayfair-heritage-modern-townhouse',
    tag: 'Exclusive',
    featured: true,
    price: 16800000,
    pricePerSqft: 2400,
    purpose: 'sale',
    type: 'Townhouse',
    bedrooms: 5,
    bathrooms: 6,
    sqft: 7000,
    lotSize: 'N/A',
    yearBuilt: 2022,
    garage: 2,
    hoaFee: 1100,
    annualTaxes: 135000,
    address: '14 Upper Grosvenor Street',
    city: 'Beverly Hills',
    state: 'CA',
    zip: '90212',
    coordinates: { lat: 34.0689, lng: -118.4053 },
    rating: 4.97,
    reviewsCount: 20,
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      '/images/mayfair-courtyard-hall.jpg',
      '/images/mayfair-courtyard-bedroom.jpg',
      '/images/mayfair-courtyard-kitchen.jpg',
      '/images/mayfair-courtyard-bathroom.jpg',
      '/images/mayfair-courtyard-balcony.jpg'
    ],
    roomPhotos: [
      { room: 'European Classical Modern Facade', category: 'exterior', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85' },
      { room: 'Courtyard Pool View Living Hall', category: 'living', url: '/images/mayfair-courtyard-hall.jpg' },
      { room: 'Modern Courtyard Master Suite', category: 'bedroom', url: '/images/mayfair-courtyard-bedroom.jpg' },
      { room: 'Indoor-Outdoor Marble Chef Kitchen', category: 'kitchen', url: '/images/mayfair-courtyard-kitchen.jpg' },
      { room: 'Courtyard Glass Spa Bathroom & Tub', category: 'bathroom', url: '/images/mayfair-courtyard-bathroom.jpg' },
      { room: 'Upper Poolside Panorama Balcony', category: 'balcony', url: '/images/mayfair-courtyard-balcony.jpg' }
    ],
    description: 'An ultra-exclusive 4-level urban mansion combining grand classical European proportions with cutting-edge bespoke interiors. Private passenger elevator connecting all four floors, an indoor heated plunge spa, private landscaped atrium garden, and rooftop cocktail lounge.',
    highlights: [
      'Internal Glass Elevator Accessing All 4 Levels',
      'Indoor Subterranean Heated Spa & Wellness Suite',
      'Private Landscaped Atrium Courtyard',
      'Rooftop Terrace with Gas Fireplace & Wet Bar',
      'Secured 2-Car Garage with Turntable'
    ],
    amenities: {
      interior: ['Private Glass Elevator', 'Marble Slab Fireplaces', 'Bespoke Poliform Wardrobes', 'Home Cinema', 'Indoor Heated Pool'],
      exterior: ['Courtyard Garden', 'Rooftop Solarium', 'Heated Terrace Floors'],
      luxury: ['Staff Quarters', 'Biometric Security Access', 'Wine Tasting Cellar'],
      eco: ['Triple Glazed Windows', 'Acoustic Insulation', 'Solar Hot Water']
    },
    floorPlans: [
      { level: 'Lower Ground & Spa Level', beds: 1, baths: 2, sqft: 1800, image: '/images/mayfair-courtyard-bathroom.jpg' },
      { level: 'Ground Floor & Reception', beds: 0, baths: 1, sqft: 1800, image: '/images/mayfair-courtyard-hall.jpg' },
      { level: 'First & Second Floor Suites', beds: 4, baths: 3, sqft: 3400, image: '/images/mayfair-courtyard-bedroom.jpg' }
    ],
    neighborhood: {
      walkScore: 94,
      transitScore: 88,
      nearby: [
        { name: 'Beverly Gardens Park', type: 'Parks & Sculpture', distance: '0.4 miles' },
        { name: 'Spago Beverly Hills', type: 'Iconic Dining', distance: '0.5 miles' },
        { name: 'Rodeo Drive', type: 'High Fashion', distance: '0.3 miles' }
      ]
    },
    agent: AGENTS[0]
  }
];

export const CITIES = [
  {
    name: 'Beverly Hills',
    state: 'California',
    propertiesCount: 38,
    avgPrice: '$16.2M',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
    tag: 'Ultra-Prime Estates'
  },
  {
    name: 'New York',
    state: 'New York',
    propertiesCount: 54,
    avgPrice: '$11.8M',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    tag: 'High-Rise Penthouses'
  },
  {
    name: 'Miami Beach',
    state: 'Florida',
    propertiesCount: 42,
    avgPrice: '$14.5M',
    image: 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80',
    tag: 'Waterfront Living'
  },
  {
    name: 'Malibu',
    state: 'California',
    propertiesCount: 29,
    avgPrice: '$21.4M',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    tag: 'Coastal Sanctuaries'
  },
  {
    name: 'Aspen',
    state: 'Colorado',
    propertiesCount: 21,
    avgPrice: '$18.9M',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    tag: 'Alpine Ski Estates'
  },
  {
    name: 'Seattle',
    state: 'Washington',
    propertiesCount: 33,
    avgPrice: '$8.6M',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    tag: 'Pacific Northwest'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Alexander & Vivienne Croft',
    role: 'Tech Founders & Art Collectors',
    location: 'Purchased in Bel Air, CA',
    quote: 'Estatly delivered an unmatched level of confidentiality, architectural insight, and swift transaction execution. The virtual 3D tour and private drone footage made acquiring our estate effortless even while traveling abroad.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 2,
    name: 'David K. Henderson',
    role: 'Private Equity Managing Partner',
    location: 'Acquired Penthouse in TriBeCa, NY',
    quote: 'The level of market intelligence provided by Estatly’s advisors surpassed any private brokerage we have engaged in London or New York. The side-by-side comparison tool and verified HOA metrics gave us complete clarity.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 3,
    name: 'Gabriella Santos-Dumont',
    role: 'Architectural Director & Investor',
    location: 'Listed & Sold on Star Island, Miami',
    quote: 'Listing our waterfront residence on Estatly resulted in qualified global buyers within two weeks. The photography presentation and curated VIP viewing booking system set an entirely new benchmark for luxury real estate.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80'
  }
];
