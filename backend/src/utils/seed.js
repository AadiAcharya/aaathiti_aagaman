/**
 * Seed script: npm run seed
 * Seeds rooms from the frontend propertyData into MongoDB.
 */
const mongoose = require('mongoose');
const dotenv   = require('dotenv');
// const bcrypt   = require('bcryptjs');
dotenv.config();

const Room     = require('../models/Room.model');
const User     = require('../models/User.model');
const { usdToNpr, formatNPR } = require('./currency');

// ── Rooms data (price is legacy USD-scale, converted to rounded NRS at insert) ─
const roomsSeed = [
  { title: "Luxury King Suite",       image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop", description: "Spacious room with king bed and city views",               price: 180, type: "suite",  bedType: "King",             size: "45 sqm", maxGuests: 2, location: "Thamel, Kathmandu, Nepal",      bedrooms: "1", bathrooms: "1", parking: "1", pets: "No",  amenities: ["WiFi","TV","AC","Mini Bar"],                              rating: 4.9, reviews: 124 },
  { title: "Deluxe Double Room",      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop", description: "Comfortable room with two queen beds",                     price: 150, type: "double", bedType: "Queen",            size: "38 sqm", maxGuests: 4, location: "Lakeside, Pokhara, Nepal",      bedrooms: "2", bathrooms: "1", parking: "1", pets: "No",  amenities: ["WiFi","TV","AC","Coffee Maker"],                         rating: 4.7, reviews: 98  },
  { title: "Riverside View Suite",    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop", description: "Premium room with breathtaking river views",               price: 250, type: "suite",  bedType: "King",             size: "55 sqm", maxGuests: 2, location: "Sauraha, Chitwan, Nepal",       bedrooms: "1", bathrooms: "1", parking: "1", pets: "Yes", amenities: ["WiFi","TV","AC","Balcony","Mini Bar"],                  rating: 5.0, reviews: 156 },
  { title: "Standard Single Room",    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop", description: "Cozy room perfect for solo travelers",                     price: 100, type: "single", bedType: "Single",           size: "25 sqm", maxGuests: 1, location: "Patan, Lalitpur, Nepal",        bedrooms: "1", bathrooms: "1", parking: "0", pets: "No",  amenities: ["WiFi","TV","AC"],                                       rating: 4.5, reviews: 67  },
  { title: "Family Suite",            image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop", description: "Large suite ideal for families with children",             price: 280, type: "suite",  bedType: "King + Twin",      size: "70 sqm", maxGuests: 6, location: "Bhaktapur Durbar Square, Nepal",bedrooms: "3", bathrooms: "2", parking: "1", pets: "No",  amenities: ["WiFi","TV","AC","Kitchen","Living Room"],               rating: 4.8, reviews: 142 },
  { title: "Executive Business Room", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=600&fit=crop", description: "Professional space with work desk and fast WiFi",          price: 200, type: "double", bedType: "Queen",            size: "35 sqm", maxGuests: 2, location: "New Baneshwor, Kathmandu, Nepal",bedrooms: "1", bathrooms: "1", parking: "1", pets: "No", amenities: ["WiFi","TV","AC","Work Desk","Coffee Maker"],            rating: 4.6, reviews: 89  },
  { title: "Nagarkot Mountain Retreat", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop", description: "Cozy mountain room with fireplace and Himalayan views",   price: 220, type: "double", bedType: "Queen",            size: "42 sqm", maxGuests: 2, location: "Nagarkot, Bhaktapur, Nepal",    bedrooms: "1", bathrooms: "1", parking: "1", pets: "Yes", amenities: ["WiFi","Fireplace","Mountain View","Hot Tub Access"],    rating: 4.7, reviews: 112 },
  { title: "Urban Studio Loft",       image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop", description: "Modern downtown studio with floor-to-ceiling windows",     price: 175, type: "single", bedType: "Queen",            size: "30 sqm", maxGuests: 1, location: "Durbarmarg, Kathmandu, Nepal",  bedrooms: "1", bathrooms: "1", parking: "0", pets: "No",  amenities: ["WiFi","TV","AC","City View","Work Desk"],               rating: 4.6, reviews: 95  },
  { title: "Bandipur Heritage Cottage", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop", description: "Charming hillside cottage with valley access",           price: 260, type: "suite",  bedType: "King + Twin",      size: "60 sqm", maxGuests: 4, location: "Bandipur, Tanahun, Nepal",      bedrooms: "2", bathrooms: "1", parking: "1", pets: "Yes", amenities: ["WiFi","Mountain View","Kitchen","Balcony","AC"],        rating: 4.9, reviews: 138 },
  { title: "Garden Villa Suite",      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop", description: "Spacious villa with private garden and terrace",           price: 320, type: "suite",  bedType: "King + Twin",      size: "85 sqm", maxGuests: 6, location: "Godawari, Lalitpur, Nepal",     bedrooms: "3", bathrooms: "2", parking: "2", pets: "Yes", amenities: ["WiFi","Garden","Pool Access","Kitchen","Living Room"],  rating: 4.8, reviews: 156 },
  { title: "Lumbini Garden Penthouse",image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop", description: "Luxurious penthouse near the sacred garden",               price: 350, type: "suite",  bedType: "King",             size: "65 sqm", maxGuests: 2, location: "Lumbini, Rupandehi, Nepal",     bedrooms: "1", bathrooms: "1", parking: "1", pets: "No",  amenities: ["WiFi","Jacuzzi","Balcony","Mini Bar","City View"],      rating: 5.0, reviews: 178 },
  { title: "Budget Traveler Room",    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop", description: "Comfortable economy room for budget travelers",             price: 85,  type: "single", bedType: "Single",           size: "22 sqm", maxGuests: 1, location: "Sundhara, Kathmandu, Nepal",    bedrooms: "1", bathrooms: "1", parking: "0", pets: "No",  amenities: ["WiFi","TV","AC","Shared Kitchen"],                      rating: 4.3, reviews: 62  },
  { title: "Luxury Suite Deluxe",     image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop", description: "Premium suite with marble bathroom and butler service",    price: 380, type: "suite",  bedType: "King",             size: "75 sqm", maxGuests: 2, location: "Pokhara Lakeside, Nepal",       bedrooms: "1", bathrooms: "1", parking: "1", pets: "No",  amenities: ["WiFi","Marble Bath","Sauna","Mini Bar","24/7 Butler"],  rating: 5.0, reviews: 201 },
  { title: "Wellness Spa Suite",      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop", description: "Relaxation-focused room with spa amenities",               price: 280, type: "suite",  bedType: "King",             size: "52 sqm", maxGuests: 2, location: "Dhulikhel, Kavre, Nepal",       bedrooms: "1", bathrooms: "1", parking: "1", pets: "No",  amenities: ["WiFi","Spa Bath","Sauna","Aromatherapy","Yoga Mat"],    rating: 4.8, reviews: 128 },
  { title: "Family Connect Room",     image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop", description: "Spacious family room with connecting rooms",                price: 310, type: "suite",  bedType: "King + 2 Singles", size: "95 sqm", maxGuests: 8, location: "Itahari, Sunsari, Nepal",       bedrooms: "4", bathrooms: "2", parking: "2", pets: "Yes", amenities: ["WiFi","Kitchen","Living Room","Multiple Beds","AC"],   rating: 4.7, reviews: 145 },
];

// ── Seed function ─────────────────────────────────────────────────────────────
const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // ── Users ──────────────────────────────────────────────────────────────
   // ── Users ──────────────────────────────────────────────────────────────
await User.deleteMany({ email: { $in: ['admin@hotel.com', 'host@hotel.com'] } });

const admin = await User.create({
  name: 'Admin User', email: 'admin@hotel.com',
  password: 'admin123', role: 'admin',
});
console.log('✅ Admin created: admin@hotel.com / admin123');

const host = await User.create({
  name: 'Hotel Host', email: 'host@hotel.com',
  password: 'host1234', role: 'host',
});
console.log('✅ Host created: host@hotel.com / host1234');

    // ── Rooms ──────────────────────────────────────────────────────────────
    await Room.deleteMany({});
    const rooms = await Room.insertMany(
      roomsSeed.map((r) => {
        const nprPrice = usdToNpr(r.price);
        return {
          ...r,
          price: nprPrice,
          priceDisplay: formatNPR(nprPrice),
          host: host._id,
          safety: ['Daily Cleaning', 'Fire Extinguishers', 'Smoke Detectors'],
        };
      })
    );
    console.log(`✅ ${rooms.length} rooms seeded`);

    console.log('\n🎉 Seed complete!\n');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  }
};

seed();