/**
 * Seed script: npm run seed
 * Seeds rooms and properties from the frontend propertyData into MongoDB.
 */
const mongoose = require('mongoose');
const dotenv   = require('dotenv');
dotenv.config();

const Room     = require('../models/Room.model');
const Property = require('../models/Property.model');
const User     = require('../models/User.model');

// ── Rooms data (from frontend roomsData) ──────────────────────────────────────
const roomsSeed = [
  { title: "Luxury King Suite",       description: "Spacious room with king bed and city views",               price: 180, type: "suite",  bedType: "King",        size: "45 sqm", maxGuests: 2, amenities: ["WiFi","TV","AC","Mini Bar"],                       rating: 4.9, reviews: 124 },
  { title: "Deluxe Double Room",      description: "Comfortable room with two queen beds",                     price: 150, type: "double", bedType: "Queen",       size: "38 sqm", maxGuests: 4, amenities: ["WiFi","TV","AC","Coffee Maker"],                    rating: 4.7, reviews: 98  },
  { title: "Ocean View Suite",        description: "Premium room with breathtaking ocean views",               price: 250, type: "suite",  bedType: "King",        size: "55 sqm", maxGuests: 2, amenities: ["WiFi","TV","AC","Balcony","Mini Bar"],             rating: 5.0, reviews: 156 },
  { title: "Standard Single Room",    description: "Cozy room perfect for solo travelers",                     price: 100, type: "single", bedType: "Single",      size: "25 sqm", maxGuests: 1, amenities: ["WiFi","TV","AC"],                                  rating: 4.5, reviews: 67  },
  { title: "Family Suite",            description: "Large suite ideal for families with children",             price: 280, type: "suite",  bedType: "King + Twin", size: "70 sqm", maxGuests: 6, amenities: ["WiFi","TV","AC","Kitchen","Living Room"],          rating: 4.8, reviews: 142 },
  { title: "Executive Business Room", description: "Professional space with work desk and fast WiFi",          price: 200, type: "double", bedType: "Queen",       size: "35 sqm", maxGuests: 2, amenities: ["WiFi","TV","AC","Work Desk","Coffee Maker"],       rating: 4.6, reviews: 89  },
  { title: "Alpine Mountain Retreat", description: "Cozy mountain room with fireplace and alpine views",       price: 220, type: "double", bedType: "Queen",       size: "42 sqm", maxGuests: 2, amenities: ["WiFi","Fireplace","Mountain View","Hot Tub Access"],rating: 4.7, reviews: 112 },
  { title: "Urban Studio Loft",       description: "Modern downtown studio with floor-to-ceiling windows",     price: 175, type: "single", bedType: "Queen",       size: "30 sqm", maxGuests: 1, amenities: ["WiFi","TV","AC","City View","Work Desk"],          rating: 4.6, reviews: 95  },
  { title: "Seaside Cottage",         description: "Charming beachfront cottage with ocean access",             price: 260, type: "suite",  bedType: "King + Twin", size: "60 sqm", maxGuests: 4, amenities: ["WiFi","Beach Access","Kitchen","Balcony","AC"],   rating: 4.9, reviews: 138 },
  { title: "Garden Villa Suite",      description: "Spacious villa with private garden and terrace",           price: 320, type: "suite",  bedType: "King + Twin", size: "85 sqm", maxGuests: 6, amenities: ["WiFi","Garden","Pool Access","Kitchen","Living Room"], rating: 4.8, reviews: 156 },
  { title: "Romantic Penthouse",      description: "Luxurious penthouse with city skyline views",              price: 350, type: "suite",  bedType: "King",        size: "65 sqm", maxGuests: 2, amenities: ["WiFi","Jacuzzi","Balcony","Mini Bar","City View"],  rating: 5.0, reviews: 178 },
  { title: "Budget Traveler Room",    description: "Comfortable economy room perfect for budget travelers",    price: 85,  type: "single", bedType: "Single",      size: "22 sqm", maxGuests: 1, amenities: ["WiFi","TV","AC","Shared Kitchen"],                 rating: 4.3, reviews: 62  },
  { title: "Luxury Suite Deluxe",     description: "Premium suite with marble bathroom and butler service",    price: 380, type: "suite",  bedType: "King",        size: "75 sqm", maxGuests: 2, amenities: ["WiFi","Marble Bath","Sauna","Mini Bar","24/7 Butler"], rating: 5.0, reviews: 201 },
  { title: "Wellness Spa Suite",      description: "Relaxation-focused room with spa amenities",               price: 280, type: "suite",  bedType: "King",        size: "52 sqm", maxGuests: 2, amenities: ["WiFi","Spa Bath","Sauna","Aromatherapy","Yoga Mat"], rating: 4.8, reviews: 128 },
  { title: "Family Connect Room",     description: "Spacious family room with connecting rooms",               price: 310, type: "suite",  bedType: "King + 2 Singles", size: "95 sqm", maxGuests: 8, amenities: ["WiFi","Kitchen","Living Room","Multiple Beds","AC"], rating: 4.7, reviews: 145 },
];

// ── Properties data (from frontend properties array) ──────────────────────────
const propertiesSeed = [
  { title: "Luxury Ocean View Suite",     location: "Miami Beach, Florida, USA",       bedrooms: "3", bathrooms: "2", parking: "2", pets: "Yes", price: "$2500 - 4000 USD", priceMin: 2500, priceMax: 4000, category: "rooms",   isTopRated: true,  isFeatured: true  },
  { title: "Cozy Mountain Cabin",         location: "Aspen, Colorado, USA",            bedrooms: "2", bathrooms: "1", parking: "1", pets: "Yes", price: "$1500 - 2500 USD", priceMin: 1500, priceMax: 2500, category: "rooms",   isTopRated: false, isFeatured: false },
  { title: "Modern City Loft",            location: "New York, NY, USA",               bedrooms: "1", bathrooms: "1", parking: "0", pets: "No",  price: "$3000 - 5000 USD", priceMin: 3000, priceMax: 5000, category: "rooms",   isTopRated: true,  isFeatured: true  },
  { title: "Mediterranean Dream Villa",   location: "San Diego, California, USA",      bedrooms: "5", bathrooms: "4", parking: "4", pets: "Yes", price: "$6000 - 10000 USD",priceMin: 6000, priceMax: 10000,category: "villas",  isTopRated: true,  isFeatured: false },
  { title: "Hilltop Luxury Villa",        location: "Los Angeles, California, USA",    bedrooms: "6", bathrooms: "5", parking: "5", pets: "Yes", price: "$8000 - 15000 USD",priceMin: 8000, priceMax: 15000,category: "villas",  isTopRated: true,  isFeatured: false },
  { title: "Downtown Executive Flat",     location: "Chicago, Illinois, USA",          bedrooms: "2", bathrooms: "2", parking: "1", pets: "No",  price: "$2000 - 3500 USD", priceMin: 2000, priceMax: 3500, category: "flats",   isTopRated: false, isFeatured: false },
  { title: "Family Suburban Flat",        location: "Portland, Oregon, USA",           bedrooms: "3", bathrooms: "2", parking: "2", pets: "Yes", price: "$1800 - 2800 USD", priceMin: 1800, priceMax: 2800, category: "flats",   isTopRated: true,  isFeatured: true  },
  { title: "Backpacker's Paradise Hostel",location: "San Francisco, California, USA",  bedrooms: "8", bathrooms: "4", parking: "0", pets: "No",  price: "$30 - 80 USD",     priceMin: 30,   priceMax: 80,   category: "hostels", isTopRated: false, isFeatured: false },
  { title: "Urban Explorer Hostel",       location: "Boston, Massachusetts, USA",      bedrooms:"10", bathrooms: "5", parking: "0", pets: "No",  price: "$40 - 90 USD",     priceMin: 40,   priceMax: 90,   category: "hostels", isTopRated: true,  isFeatured: false },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Create a default admin user
    let admin = await User.findOne({ email: 'admin@hotel.com' });
    if (!admin) {
      admin = await User.create({
        name: 'Admin User',
        email: 'admin@hotel.com',
        password: 'admin123',
        role: 'admin',
      });
      console.log('✅ Admin created: admin@hotel.com / admin123');
    }

    // Create a default host user
    let host = await User.findOne({ email: 'host@hotel.com' });
    if (!host) {
      host = await User.create({
        name: 'Hotel Host',
        email: 'host@hotel.com',
        password: 'host1234',
        role: 'host',
      });
      console.log('✅ Host created: host@hotel.com / host1234');
    }

    // Seed rooms
    await Room.deleteMany({});
    const rooms = await Room.insertMany(
      roomsSeed.map((r) => ({
        ...r,
        priceDisplay: `$${r.price}`,
        host: host._id,
        safety: ['Daily Cleaning', 'Fire Extinguishers', 'Smoke Detectors'],
      }))
    );
    console.log(`✅ ${rooms.length} rooms seeded`);

    // Seed properties
    await Property.deleteMany({});
    const props = await Property.insertMany(
      propertiesSeed.map((p) => ({ ...p, host: host._id }))
    );
    console.log(`✅ ${props.length} properties seeded`);

    console.log('\n🎉 Seed complete!\n');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seed();
