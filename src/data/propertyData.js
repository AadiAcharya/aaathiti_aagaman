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
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop"
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
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop"
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
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop"
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
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop"
  },

  // FLATS Category
  {
    id: 5,
    title: "Downtown Executive Flat",
    location: "Chicago, Illinois, USA",
    bedrooms: "2",
    bathrooms: "2",
    parking: "1",
    pets: "No",
    price: "$2000 - 3500 USD",
    category: "flats",
    isTopRated: false,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"
  },
  {
    id: 6,
    title: "Family Suburban Flat",
    location: "Portland, Oregon, USA",
    bedrooms: "3",
    bathrooms: "2",
    parking: "2",
    pets: "Yes",
    price: "$1800 - 2800 USD",
    category: "flats",
    isTopRated: true,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"
  },
  {
    id: 7,
    title: "Artistic Studio Flat",
    location: "Austin, Texas, USA",
    bedrooms: "1",
    bathrooms: "1",
    parking: "1",
    pets: "Yes",
    price: "$1200 - 2000 USD",
    category: "flats",
    isTopRated: false,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
  },
  {
    id: 8,
    title: "Riverside Garden Flat",
    location: "Seattle, Washington, USA",
    bedrooms: "2",
    bathrooms: "1",
    parking: "1",
    pets: "Yes",
    price: "$2200 - 3200 USD",
    category: "flats",
    isTopRated: true,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop"
  },

  // VILLAS Category
  {
    id: 9,
    title: "Mediterranean Dream Villa",
    location: "San Diego, California, USA",
    bedrooms: "5",
    bathrooms: "4",
    parking: "4",
    pets: "Yes",
    price: "$6000 - 10000 USD",
    category: "villas",
    isTopRated: true,
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop"
  },
  {
    id: 10,
    title: "Hilltop Luxury Villa",
    location: "Los Angeles, California, USA",
    bedrooms: "6",
    bathrooms: "5",
    parking: "5",
    pets: "Yes",
    price: "$8000 - 15000 USD",
    category: "villas",
    isTopRated: true,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"
  },
  {
    id: 11,
    title: "Tropical Island Villa",
    location: "Key West, Florida, USA",
    bedrooms: "4",
    bathrooms: "3",
    parking: "3",
    pets: "Yes",
    price: "$5000 - 8000 USD",
    category: "villas",
    isTopRated: false,
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=800&h=600&fit=crop"
  },
  {
    id: 12,
    title: "Wine Country Estate Villa",
    location: "Napa Valley, California, USA",
    bedrooms: "7",
    bathrooms: "6",
    parking: "6",
    pets: "Yes",
    price: "$10000 - 18000 USD",
    category: "villas",
    isTopRated: true,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
  },

  // HOSTELS Category
  {
    id: 13,
    title: "Backpacker's Paradise Hostel",
    location: "San Francisco, California, USA",
    bedrooms: "8",
    bathrooms: "4",
    parking: "0",
    pets: "No",
    price: "$30 - 80 USD",
    category: "hostels",
    isTopRated: false,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop"
  },
  {
    id: 14,
    title: "Urban Explorer Hostel",
    location: "Boston, Massachusetts, USA",
    bedrooms: "10",
    bathrooms: "5",
    parking: "0",
    pets: "No",
    price: "$40 - 90 USD",
    category: "hostels",
    isTopRated: true,
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop"
  },
  {
    id: 15,
    title: "Beach Side Hostel",
    location: "Santa Monica, California, USA",
    bedrooms: "6",
    bathrooms: "3",
    parking: "0",
    pets: "No",
    price: "$50 - 100 USD",
    category: "hostels",
    isTopRated: false,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop"
  },
  {
    id: 16,
    title: "Mountain Base Camp Hostel",
    location: "Denver, Colorado, USA",
    bedrooms: "12",
    bathrooms: "6",
    parking: "1",
    pets: "No",
    price: "$35 - 75 USD",
    category: "hostels",
    isTopRated: true,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop"
  }
];

// ============================================
// BLOG DATA
// ============================================
export const blogs = [
  {
    id: 1,
    title: "Top 10 Tips for First-Time Renters",
    category: "Guide",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    excerpt: "Essential advice for anyone looking to rent their first property.",
    date: "2024-03-01"
  },
  {
    id: 2,
    title: "How to Choose the Perfect Vacation Rental",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop",
    excerpt: "Find your ideal getaway with these expert selection tips.",
    date: "2024-02-28"
  },
  {
    id: 3,
    title: "Understanding Rental Agreements: A Complete Guide",
    category: "Legal",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop",
    excerpt: "Everything you need to know about rental contracts and terms.",
    date: "2024-02-25"
  },
  {
    id: 4,
    title: "Pet-Friendly Properties: What to Look For",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&h=600&fit=crop",
    excerpt: "Finding the perfect home for you and your furry friends.",
    date: "2024-02-20"
  },
  {
    id: 5,
    title: "Maximizing Your Rental Income as a Host",
    category: "Economy",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    excerpt: "Pro strategies to increase your property rental revenue.",
    date: "2024-02-15"
  },
  {
    id: 6,
    title: "Best Neighborhoods for Young Professionals",
    category: "Property",
    image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
    excerpt: "Top urban areas perfect for career-focused renters.",
    date: "2024-02-10"
  }
];

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get properties by category
export const getPropertiesByCategory = (category) => {
  if (category === 'all') return properties;
  return properties.filter(property => property.category === category);
};

// Get top rated properties
export const getTopRatedProperties = () => {
  return properties.filter(property => property.isTopRated === true);
};

// Get latest properties (first 4)
export const getLatestProperties = () => {
  return properties.slice(0, 4);
};

// Search properties by location
export const searchPropertiesByLocation = (searchTerm) => {
  if (!searchTerm) return properties;
  return properties.filter(property => 
    property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
};