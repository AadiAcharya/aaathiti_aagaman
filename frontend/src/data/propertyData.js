// ============================================
// PROPERTY DATA - Mock data for your hotel website
// ============================================
// This file contains all property listings
// Later you can replace this with real API data

export const properties = [
  // ROOMS Category
  {
    id: 1,
    title: "Luxury Ocean View Suite",
    location: "Miami Beach, Florida, USA",
    bedrooms: "3",
    bathrooms: "2",
    parking: "2",
    pets: "Yes",
    price: "$2500 - 4000 USD",
    category: "rooms",
    isTopRated: true,
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Cozy Mountain Cabin",
    location: "Aspen, Colorado, USA",
    bedrooms: "2",
    bathrooms: "1",
    parking: "1",
    pets: "Yes",
    price: "$1500 - 2500 USD",
    category: "rooms",
    isTopRated: false,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    isFeatured: false,
  },
  {
    id: 3,
    title: "Modern City Loft",
    location: "New York, NY, USA",
    bedrooms: "1",
    bathrooms: "1",
    parking: "0",
    pets: "No",
    price: "$3000 - 5000 USD",
    category: "rooms",
    isTopRated: true,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    isFeatured: true,
  },
  {
    id: 4,
    title: "Beach Front Paradise",
    location: "Malibu, California, USA",
    bedrooms: "4",
    bathrooms: "3",
    parking: "3",
    pets: "Yes",
    price: "$4000 - 7000 USD",
    category: "rooms",
    isTopRated: true,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    isFeatured: false,
  },
  {
    id: 5,
    title: "Tropical Island Suite",
    location: "Hawaii, USA",
    bedrooms: "2",
    bathrooms: "2",
    parking: "1",
    pets: "Yes",
    price: "$3500 - 5500 USD",
    category: "rooms",
    isTopRated: true,
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
    isFeatured: true,
  },
  {
    id: 6,
    title: "Downtown Boutique Room",
    location: "Chicago, Illinois, USA",
    bedrooms: "1",
    bathrooms: "1",
    parking: "1",
    pets: "No",
    price: "$1800 - 2800 USD",
    category: "rooms",
    isTopRated: false,
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
    isFeatured: false,
  },

  // FLATS Category
  {
    id: 7,
    title: "Downtown Executive Flat",
    location: "Chicago, Illinois, USA",
    bedrooms: "2",
    bathrooms: "2",
    parking: "1",
    pets: "No",
    price: "$2000 - 3500 USD",
    category: "flats",
    isTopRated: false,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    isFeatured: false,
  },
  {
    id: 8,
    title: "Family Suburban Flat",
    location: "Portland, Oregon, USA",
    bedrooms: "3",
    bathrooms: "2",
    parking: "2",
    pets: "Yes",
    price: "$1800 - 2800 USD",
    category: "flats",
    isTopRated: true,
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    isFeatured: true,
  },
  {
    id: 9,
    title: "Artistic Studio Flat",
    location: "Austin, Texas, USA",
    bedrooms: "1",
    bathrooms: "1",
    parking: "1",
    pets: "Yes",
    price: "$1200 - 2000 USD",
    category: "flats",
    isTopRated: false,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    isFeatured: false,
  },
  {
    id: 10,
    title: "Riverside Garden Flat",
    location: "Seattle, Washington, USA",
    bedrooms: "2",
    bathrooms: "1",
    parking: "1",
    pets: "Yes",
    price: "$2200 - 3200 USD",
    category: "flats",
    isTopRated: true,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    isFeatured: false,
  },
  {
    id: 11,
    title: "Bright Contemporary Flat",
    location: "Los Angeles, California, USA",
    bedrooms: "2",
    bathrooms: "2",
    parking: "2",
    pets: "Yes",
    price: "$2400 - 3500 USD",
    category: "flats",
    isTopRated: true,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
  },
  {
    id: 12,
    title: "Historic District Flat",
    location: "Boston, Massachusetts, USA",
    bedrooms: "3",
    bathrooms: "2",
    parking: "1",
    pets: "No",
    price: "$2100 - 3300 USD",
    category: "flats",
    isTopRated: false,
    image:
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&h=600&fit=crop",
  },
  {
    id: 13,
    title: "Modern Urban Flat",
    location: "San Francisco, California, USA",
    bedrooms: "1",
    bathrooms: "1",
    parking: "0",
    pets: "Yes",
    price: "$2800 - 3900 USD",
    category: "flats",
    isTopRated: true,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
  },

  // VILLAS Category
  {
    id: 14,
    title: "Mediterranean Dream Villa",
    location: "San Diego, California, USA",
    bedrooms: "5",
    bathrooms: "4",
    parking: "4",
    pets: "Yes",
    price: "$6000 - 10000 USD",
    category: "villas",
    isTopRated: true,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
  },
  {
    id: 15,
    title: "Hilltop Luxury Villa",
    location: "Los Angeles, California, USA",
    bedrooms: "6",
    bathrooms: "5",
    parking: "5",
    pets: "Yes",
    price: "$8000 - 15000 USD",
    category: "villas",
    isTopRated: true,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
  },
  {
    id: 16,
    title: "Tropical Island Villa",
    location: "Key West, Florida, USA",
    bedrooms: "4",
    bathrooms: "3",
    parking: "3",
    pets: "Yes",
    price: "$5000 - 8000 USD",
    category: "villas",
    isTopRated: false,
    image:
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&h=600&fit=crop",
  },
  {
    id: 17,
    title: "Wine Country Estate Villa",
    location: "Napa Valley, California, USA",
    bedrooms: "7",
    bathrooms: "6",
    parking: "6",
    pets: "Yes",
    price: "$10000 - 18000 USD",
    category: "villas",
    isTopRated: true,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
  },
  {
    id: 18,
    title: "Oceanfront Luxury Villa",
    location: "Malibu, California, USA",
    bedrooms: "8",
    bathrooms: "7",
    parking: "8",
    pets: "Yes",
    price: "$12000 - 22000 USD",
    category: "villas",
    isTopRated: true,
    image:
      "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=800&h=600&fit=crop",
  },
  {
    id: 19,
    title: "Mountain Peak Estate",
    location: "Aspen, Colorado, USA",
    bedrooms: "6",
    bathrooms: "5",
    parking: "5",
    pets: "Yes",
    price: "$7500 - 12000 USD",
    category: "villas",
    isTopRated: true,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
  },
  {
    id: 20,
    title: "Downtown Penthouse Villa",
    location: "New York, NY, USA",
    bedrooms: "5",
    bathrooms: "4",
    parking: "2",
    pets: "No",
    price: "$9000 - 16000 USD",
    category: "villas",
    isTopRated: true,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
  },

  // HOSTELS Category
  {
    id: 21,
    title: "Backpacker's Paradise Hostel",
    location: "San Francisco, California, USA",
    bedrooms: "8",
    bathrooms: "4",
    parking: "0",
    pets: "No",
    price: "$30 - 80 USD",
    category: "hostels",
    isTopRated: false,
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
  },
  {
    id: 22,
    title: "Urban Explorer Hostel",
    location: "Boston, Massachusetts, USA",
    bedrooms: "10",
    bathrooms: "5",
    parking: "0",
    pets: "No",
    price: "$40 - 90 USD",
    category: "hostels",
    isTopRated: true,
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
  },
  {
    id: 23,
    title: "Beach Side Hostel",
    location: "Santa Monica, California, USA",
    bedrooms: "6",
    bathrooms: "3",
    parking: "0",
    pets: "No",
    price: "$50 - 100 USD",
    category: "hostels",
    isTopRated: false,
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
  },
  {
    id: 24,
    title: "Mountain Base Camp Hostel",
    location: "Denver, Colorado, USA",
    bedrooms: "12",
    bathrooms: "6",
    parking: "1",
    pets: "No",
    price: "$35 - 75 USD",
    category: "hostels",
    isTopRated: true,
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
  },
  {
    id: 25,
    title: "Downtown City Center Hostel",
    location: "Chicago, Illinois, USA",
    bedrooms: "9",
    bathrooms: "4",
    parking: "0",
    pets: "No",
    price: "$45 - 85 USD",
    category: "hostels",
    isTopRated: true,
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
  },
  {
    id: 26,
    title: "Riverside Social Hostel",
    location: "Portland, Oregon, USA",
    bedrooms: "7",
    bathrooms: "3",
    parking: "0",
    pets: "Yes",
    price: "$40 - 75 USD",
    category: "hostels",
    isTopRated: false,
    image:
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
  },
  {
    id: 27,
    title: "Tropical Backpackers Haven",
    location: "Miami, Florida, USA",
    bedrooms: "8",
    bathrooms: "4",
    parking: "0",
    pets: "No",
    price: "$55 - 95 USD",
    category: "hostels",
    isTopRated: true,
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop",
  },
  {
    id: 28,
    title: "Creative Arts Hostel",
    location: "Austin, Texas, USA",
    bedrooms: "6",
    bathrooms: "3",
    parking: "0",
    pets: "Yes",
    price: "$35 - 70 USD",
    category: "hostels",
    isTopRated: false,
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
  },
];

// ============================================
// BLOG DATA
// ============================================
export const blogs = [
  {
    id: 1,
    title: "Top 10 Tips for First-Time Renters",
    category: "Guide",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    excerpt:
      "Essential advice for anyone looking to rent their first property.",
    date: "2024-03-01",
  },
  {
    id: 2,
    title: "How to Choose the Perfect Vacation Rental",
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop",
    excerpt: "Find your ideal getaway with these expert selection tips.",
    date: "2024-02-28",
  },
  {
    id: 3,
    title: "Understanding Rental Agreements: A Complete Guide",
    category: "Legal",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
    excerpt: "Everything you need to know about rental contracts and terms.",
    date: "2024-02-25",
  },
  {
    id: 4,
    title: "Pet-Friendly Properties: What to Look For",
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop",
    excerpt: "Finding the perfect home for you and your furry friends.",
    date: "2024-02-20",
  },
  {
    id: 5,
    title: "Maximizing Your Rental Income as a Host",
    category: "Economy",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    excerpt: "Pro strategies to increase your property rental revenue.",
    date: "2024-02-15",
  },
  {
    id: 6,
    title: "Best Neighborhoods for Young Professionals",
    category: "Property",
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
    excerpt: "Top urban areas perfect for career-focused renters.",
    date: "2024-02-10",
  },
  {
    id: 7,
    title: "Interior Design Tips for Small Spaces",
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    excerpt:
      "Make the most of limited square footage with smart design choices.",
    date: "2024-02-08",
  },
  {
    id: 8,
    title: "Remote Work: Best Cities with Great Rental Options",
    category: "Guide",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    excerpt:
      "Discover the best locations for digital nomads and remote workers.",
    date: "2024-02-05",
  },
  {
    id: 9,
    title: "Sustainable Living: Eco-Friendly Rental Properties",
    category: "Property",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    excerpt: "Green housing options that don't compromise on comfort.",
    date: "2024-02-01",
  },
  {
    id: 10,
    title: "Luxury Amenities Worth the Extra Cost",
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop",
    excerpt: "Premium features that enhance your living experience.",
    date: "2024-01-28",
  },
  {
    id: 11,
    title: "Budget-Friendly Cities for Affordable Housing",
    category: "Economy",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    excerpt: "Where to find quality rentals without breaking the bank.",
    date: "2024-01-25",
  },
  {
    id: 12,
    title: "Home Security: Protecting Your Rental Property",
    category: "Guide",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    isFeatured: false,
    excerpt: "Essential security measures for renters and landlords.",
    date: "2024-01-20",
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get properties by category
export const getPropertiesByCategory = (category) => {
  if (category === "all") return properties;
  return properties.filter((property) => property.category === category);
};

// Get top rated properties
export const getTopRatedProperties = () => {
  return properties.filter((property) => property.isTopRated === true);
};

// Get latest properties (first 4)
export const getLatestProperties = () => {
  return properties.slice(0, 4);
};

// Search properties by location
export const searchPropertiesByLocation = (searchTerm) => {
  if (!searchTerm) return properties;
  return properties.filter(
    (property) =>
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};

// ============================================
// ROOMS DATA (Hotel/Guest Rooms)
// ============================================
export const roomsData = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop",
    title: "Luxury King Suite",
    description: "Spacious room with king bed and city views",
    price: 180,
    priceDisplay: "$180",
    amenities: ["WiFi", "TV", "AC", "Mini Bar"],
    rating: 4.9,
    reviews: 124,
    type: "suite",
    maxGuests: 2,
    bedType: "King",
    size: "45 sqm",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop",
    title: "Deluxe Double Room",
    description: "Comfortable room with two queen beds",
    price: 150,
    priceDisplay: "$150",
    amenities: ["WiFi", "TV", "AC", "Coffee Maker"],
    rating: 4.7,
    reviews: 98,
    type: "double",
    maxGuests: 4,
    bedType: "Queen",
    size: "38 sqm",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&h=400&fit=crop",
    title: "Ocean View Suite",
    description: "Premium room with breathtaking ocean views",
    price: 250,
    priceDisplay: "$250",
    amenities: ["WiFi", "TV", "AC", "Balcony", "Mini Bar"],
    rating: 5.0,
    reviews: 156,
    type: "suite",
    maxGuests: 2,
    bedType: "King",
    size: "55 sqm",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
    title: "Standard Single Room",
    description: "Cozy room perfect for solo travelers",
    price: 100,
    priceDisplay: "$100",
    amenities: ["WiFi", "TV", "AC"],
    rating: 4.5,
    reviews: 67,
    type: "single",
    maxGuests: 1,
    bedType: "Single",
    size: "25 sqm",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=400&fit=crop",
    title: "Family Suite",
    description: "Large suite ideal for families with children",
    price: 280,
    priceDisplay: "$280",
    amenities: ["WiFi", "TV", "AC", "Kitchen", "Living Room"],
    rating: 4.8,
    reviews: 142,
    type: "suite",
    maxGuests: 6,
    bedType: "King + Twin",
    size: "70 sqm",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&h=400&fit=crop",
    title: "Executive Business Room",
    description: "Professional space with work desk and fast WiFi",
    price: 200,
    priceDisplay: "$200",
    amenities: ["WiFi", "TV", "AC", "Work Desk", "Coffee Maker"],
    rating: 4.6,
    reviews: 89,
    type: "double",
    maxGuests: 2,
    bedType: "Queen",
    size: "35 sqm",
  },
  {
    id: 101,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    title: "Alpine Mountain Retreat",
    description: "Cozy mountain room with fireplace and alpine views",
    price: 220,
    priceDisplay: "$220",
    amenities: ["WiFi", "Fireplace", "Mountain View", "Hot Tub Access"],
    rating: 4.7,
    reviews: 112,
    type: "double",
    maxGuests: 2,
    bedType: "Queen",
    size: "42 sqm",
  },
  {
    id: 102,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
    title: "Urban Studio Loft",
    description: "Modern downtown studio with floor-to-ceiling windows",
    price: 175,
    priceDisplay: "$175",
    amenities: ["WiFi", "TV", "AC", "City View", "Work Desk"],
    rating: 4.6,
    reviews: 95,
    type: "single",
    maxGuests: 1,
    bedType: "Queen",
    size: "30 sqm",
  },
  {
    id: 103,
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
    title: "Seaside Cottage",
    description: "Charming beachfront cottage with ocean access",
    price: 260,
    priceDisplay: "$260",
    amenities: ["WiFi", "Beach Access", "Kitchen", "Balcony", "AC"],
    rating: 4.9,
    reviews: 138,
    type: "suite",
    maxGuests: 4,
    bedType: "King + Twin",
    size: "60 sqm",
  },
  {
    id: 104,
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=400&fit=crop",
    title: "Garden Villa Suite",
    description: "Spacious villa with private garden and terrace",
    price: 320,
    priceDisplay: "$320",
    amenities: ["WiFi", "Garden", "Pool Access", "Kitchen", "Living Room"],
    rating: 4.8,
    reviews: 156,
    type: "suite",
    maxGuests: 6,
    bedType: "King + Twin",
    size: "85 sqm",
  },
  {
    id: 105,
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&h=400&fit=crop",
    title: "Tech Hub Room",
    description: "High-tech business room with smart home features",
    price: 210,
    priceDisplay: "$210",
    amenities: ["WiFi", "Smart TV", "AC", "Work Desk", "Charging Station"],
    rating: 4.5,
    reviews: 87,
    type: "double",
    maxGuests: 2,
    bedType: "Queen",
    size: "38 sqm",
  },
  {
    id: 106,
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop",
    title: "Romantic Penthouse",
    description: "Luxurious penthouse with city skyline views",
    price: 350,
    priceDisplay: "$350",
    amenities: ["WiFi", "Jacuzzi", "Balcony", "Mini Bar", "City View"],
    rating: 5.0,
    reviews: 178,
    type: "suite",
    maxGuests: 2,
    bedType: "King",
    size: "65 sqm",
  },
  {
    id: 107,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&h=400&fit=crop",
    title: "Budget Traveler Room",
    description: "Comfortable economy room perfect for budget travelers",
    price: 85,
    priceDisplay: "$85",
    amenities: ["WiFi", "TV", "AC", "Shared Kitchen"],
    rating: 4.3,
    reviews: 62,
    type: "single",
    maxGuests: 1,
    bedType: "Single",
    size: "22 sqm",
  },
  {
    id: 108,
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&h=400&fit=crop",
    title: "Luxury Suite Deluxe",
    description: "Premium suite with marble bathroom and butler service",
    price: 380,
    priceDisplay: "$380",
    amenities: ["WiFi", "Marble Bath", "Sauna", "Mini Bar", "24/7 Butler"],
    rating: 5.0,
    reviews: 201,
    type: "suite",
    maxGuests: 2,
    bedType: "King",
    size: "75 sqm",
  },
  {
    id: 109,
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=400&fit=crop",
    title: "Twins Shared Room",
    description: "Budget-friendly room with two separate beds for friends",
    price: 95,
    priceDisplay: "$95",
    amenities: ["WiFi", "TV", "AC", "Shared Bathroom"],
    rating: 4.4,
    reviews: 71,
    type: "double",
    maxGuests: 2,
    bedType: "Twin",
    size: "28 sqm",
  },
  {
    id: 110,
    image:
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&h=400&fit=crop",
    title: "Artist Studio Room",
    description: "Creative space with natural light and art studio setup",
    price: 190,
    priceDisplay: "$190",
    amenities: ["WiFi", "Large Windows", "Work Space", "AC", "Gallery Wall"],
    rating: 4.7,
    reviews: 84,
    type: "single",
    maxGuests: 1,
    bedType: "Queen",
    size: "40 sqm",
  },
  {
    id: 111,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
    title: "Wellness Spa Suite",
    description: "Relaxation-focused room with spa amenities and aromatherapy",
    price: 280,
    priceDisplay: "$280",
    amenities: ["WiFi", "Spa Bath", "Sauna", "Aromatherapy", "Yoga Mat"],
    rating: 4.8,
    reviews: 128,
    type: "suite",
    maxGuests: 2,
    bedType: "King",
    size: "52 sqm",
  },
  {
    id: 112,
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop",
    title: "Family Connect Room",
    description: "Spacious family room with connecting rooms and living area",
    price: 310,
    priceDisplay: "$310",
    amenities: ["WiFi", "Kitchen", "Living Room", "Multiple Beds", "AC"],
    rating: 4.7,
    reviews: 145,
    type: "suite",
    maxGuests: 8,
    bedType: "King + 2 Singles",
    size: "95 sqm",
  },
];

// ============================================
// HELPER FUNCTIONS FOR ROOMS
// ============================================

// Get rooms by type
export const getRoomsByType = (type) => {
  if (type === "all") return roomsData;
  return roomsData.filter((room) => room.type === type);
};

// Get rooms by price range
export const getRoomsByPriceRange = (min, max) => {
  return roomsData.filter((room) => room.price >= min && room.price <= max);
};

// Sort rooms
export const sortRooms = (rooms, sortBy) => {
  const sorted = [...rooms];

  if (sortBy === "price-low") {
    return sorted.sort((a, b) => a.price - b.price);
  }
  if (sortBy === "price-high") {
    return sorted.sort((a, b) => b.price - a.price);
  }
  if (sortBy === "rating") {
    return sorted.sort((a, b) => b.rating - a.rating);
  }

  return sorted;
};
