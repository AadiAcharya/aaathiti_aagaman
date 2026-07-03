/**
 * Seed script: npm run seed
 *
 * Wipes and repopulates every collection with a realistic, interconnected demo
 * dataset — users (admin/hosts/guests), rooms with real reviews, bookings across
 * every status, matching transactions, message threads, host notifications, and
 * admin reports — so every dashboard (host, admin, guest account) has real data
 * to render instead of empty states.
 */
const mongoose = require('mongoose');
const dotenv   = require('dotenv');
dotenv.config();

const Room         = require('../models/Room.model');
const User         = require('../models/User.model');
const Booking      = require('../models/Booking.model');
const Report       = require('../models/Report.model');
const { Transaction, Message, Notification } = require('../models/extras.model');
const { usdToNpr, formatNPR } = require('./currency');

// ── Helpers ─────────────────────────────────────────────────────────────────
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[rand(0, arr.length - 1)];
const daysFromNow = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
};
// Backdate a document's timestamps after creation. Mongoose marks `createdAt`
// immutable once `timestamps:true` is set, so a normal Model.updateOne()
// silently no-ops on it — go through the raw driver collection to bypass
// that and actually get historical dates (needed for the revenue-trend
// chart to have real month-by-month spread instead of everything on "today").
const backdate = (Model, id, date) =>
  Model.collection.updateOne({ _id: id }, { $set: { createdAt: date, updatedAt: date } });

// ── Rooms data (price is legacy USD-scale, converted to rounded NRS at insert) ─
const roomsSeed = [
  { title: "Luxury King Suite",       image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop", description: "Spacious room with king bed and city views",               price: 180, type: "suite",  bedType: "King",             size: "45 sqm", maxGuests: 2, location: "Thamel, Kathmandu, Nepal",      bedrooms: "1", bathrooms: "1", parking: "1", pets: "No",  amenities: ["WiFi","TV","AC","Mini Bar"] },
  { title: "Deluxe Double Room",      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop", description: "Comfortable room with two queen beds",                     price: 150, type: "double", bedType: "Queen",            size: "38 sqm", maxGuests: 4, location: "Lakeside, Pokhara, Nepal",      bedrooms: "2", bathrooms: "1", parking: "1", pets: "No",  amenities: ["WiFi","TV","AC","Coffee Maker"] },
  { title: "Riverside View Suite",    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop", description: "Premium room with breathtaking river views",               price: 250, type: "suite",  bedType: "King",             size: "55 sqm", maxGuests: 2, location: "Sauraha, Chitwan, Nepal",       bedrooms: "1", bathrooms: "1", parking: "1", pets: "Yes", amenities: ["WiFi","TV","AC","Balcony","Mini Bar"] },
  { title: "Standard Single Room",    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop", description: "Cozy room perfect for solo travelers",                     price: 100, type: "single", bedType: "Single",           size: "25 sqm", maxGuests: 1, location: "Patan, Lalitpur, Nepal",        bedrooms: "1", bathrooms: "1", parking: "0", pets: "No",  amenities: ["WiFi","TV","AC"] },
  { title: "Family Suite",            image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop", description: "Large suite ideal for families with children",             price: 280, type: "suite",  bedType: "King + Twin",      size: "70 sqm", maxGuests: 6, location: "Bhaktapur Durbar Square, Nepal",bedrooms: "3", bathrooms: "2", parking: "1", pets: "No",  amenities: ["WiFi","TV","AC","Kitchen","Living Room"] },
  { title: "Executive Business Room", image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&h=600&fit=crop", description: "Professional space with work desk and fast WiFi",          price: 200, type: "double", bedType: "Queen",            size: "35 sqm", maxGuests: 2, location: "New Baneshwor, Kathmandu, Nepal",bedrooms: "1", bathrooms: "1", parking: "1", pets: "No", amenities: ["WiFi","TV","AC","Work Desk","Coffee Maker"] },
  { title: "Nagarkot Mountain Retreat", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop", description: "Cozy mountain room with fireplace and Himalayan views",   price: 220, type: "double", bedType: "Queen",            size: "42 sqm", maxGuests: 2, location: "Nagarkot, Bhaktapur, Nepal",    bedrooms: "1", bathrooms: "1", parking: "1", pets: "Yes", amenities: ["WiFi","Fireplace","Mountain View","Hot Tub Access"] },
  { title: "Urban Studio Loft",       image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop", description: "Modern downtown studio with floor-to-ceiling windows",     price: 175, type: "single", bedType: "Queen",            size: "30 sqm", maxGuests: 1, location: "Durbarmarg, Kathmandu, Nepal",  bedrooms: "1", bathrooms: "1", parking: "0", pets: "No",  amenities: ["WiFi","TV","AC","City View","Work Desk"] },
  { title: "Bandipur Heritage Cottage", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop", description: "Charming hillside cottage with valley access",           price: 260, type: "suite",  bedType: "King + Twin",      size: "60 sqm", maxGuests: 4, location: "Bandipur, Tanahun, Nepal",      bedrooms: "2", bathrooms: "1", parking: "1", pets: "Yes", amenities: ["WiFi","Mountain View","Kitchen","Balcony","AC"] },
  { title: "Garden Villa Suite",      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop", description: "Spacious villa with private garden and terrace",           price: 320, type: "suite",  bedType: "King + Twin",      size: "85 sqm", maxGuests: 6, location: "Godawari, Lalitpur, Nepal",     bedrooms: "3", bathrooms: "2", parking: "2", pets: "Yes", amenities: ["WiFi","Garden","Pool Access","Kitchen","Living Room"] },
  { title: "Lumbini Garden Penthouse",image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop", description: "Luxurious penthouse near the sacred garden",               price: 350, type: "suite",  bedType: "King",             size: "65 sqm", maxGuests: 2, location: "Lumbini, Rupandehi, Nepal",     bedrooms: "1", bathrooms: "1", parking: "1", pets: "No",  amenities: ["WiFi","Jacuzzi","Balcony","Mini Bar","City View"] },
  { title: "Budget Traveler Room",    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop", description: "Comfortable economy room for budget travelers",             price: 85,  type: "single", bedType: "Single",           size: "22 sqm", maxGuests: 1, location: "Sundhara, Kathmandu, Nepal",    bedrooms: "1", bathrooms: "1", parking: "0", pets: "No",  amenities: ["WiFi","TV","AC","Shared Kitchen"] },
  { title: "Luxury Suite Deluxe",     image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop", description: "Premium suite with marble bathroom and butler service",    price: 380, type: "suite",  bedType: "King",             size: "75 sqm", maxGuests: 2, location: "Pokhara Lakeside, Nepal",       bedrooms: "1", bathrooms: "1", parking: "1", pets: "No",  amenities: ["WiFi","Marble Bath","Sauna","Mini Bar","24/7 Butler"] },
  { title: "Wellness Spa Suite",      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop", description: "Relaxation-focused room with spa amenities",               price: 280, type: "suite",  bedType: "King",             size: "52 sqm", maxGuests: 2, location: "Dhulikhel, Kavre, Nepal",       bedrooms: "1", bathrooms: "1", parking: "1", pets: "No",  amenities: ["WiFi","Spa Bath","Sauna","Aromatherapy","Yoga Mat"] },
  { title: "Family Connect Room",     image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop", description: "Spacious family room with connecting rooms",                price: 310, type: "suite",  bedType: "King + 2 Singles", size: "95 sqm", maxGuests: 8, location: "Itahari, Sunsari, Nepal",       bedrooms: "4", bathrooms: "2", parking: "2", pets: "Yes", amenities: ["WiFi","Kitchen","Living Room","Multiple Beds","AC"] },
];

const hostsSeed = [
  { name: "Hotel Host",  email: "host@hotel.com",       phone: "+977 9800000001", address: "Thamel, Kathmandu",  propertyType: "Hotel" },
  { name: "Sita Rai",    email: "sita.host@hotel.com",   phone: "+977 9800000002", address: "Lakeside, Pokhara",  propertyType: "Guesthouse" },
  { name: "Amit Gurung", email: "amit.host@hotel.com",   phone: "+977 9800000003", address: "Sauraha, Chitwan",   propertyType: "Villa" },
];

const guestNames = [
  "Priya Shrestha", "Karan Thapa", "Nisha Koirala", "Rajesh Adhikari", "Anita Magar",
  "Bikash Tamang", "Sunita Gurung", "Dipesh Basnet",
];

const REVIEW_COMMENTS = [
  "Absolutely loved our stay — clean, comfortable, and great location.",
  "Host was very responsive and the room matched the photos perfectly.",
  "Good value for money. Would book again.",
  "The view was stunning and the bed was so comfortable.",
  "A few minor issues but the host resolved them quickly.",
  "Perfect for a weekend getaway. Highly recommend.",
  "WiFi was fast and the amenities were exactly as listed.",
  "Quiet neighborhood, easy check-in, would stay again.",
  "Beautiful property, better than expected!",
  "Great communication from the host throughout our stay.",
];

const REPORT_SUBJECTS = [
  { subject: "Host not responding to messages", message: "I messaged the host three days ago about check-in instructions and haven't heard back." },
  { subject: "Room condition didn't match listing", message: "The room was smaller and less clean than the photos suggested." },
  { subject: "Request for refund", message: "We had to cancel due to a family emergency and would like to discuss a refund." },
  { subject: "Inappropriate behavior from guest", message: "The guest left the property in poor condition and was disrespectful during checkout." },
  { subject: "Billing discrepancy", message: "I was charged more than the listed price for my booking." },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    console.log('Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Room.deleteMany({}),
      Booking.deleteMany({}),
      Transaction.deleteMany({}),
      Message.deleteMany({}),
      Notification.deleteMany({}),
      Report.deleteMany({}),
    ]);

    // ── Users ────────────────────────────────────────────────────────────────
    const admin = await User.create({
      name: 'Admin User', email: 'admin@hotel.com',
      password: 'admin123', role: 'admin', isVerified: true,
    });
    console.log('Admin created: admin@hotel.com / admin123');

    const hosts = [];
    for (const h of hostsSeed) {
      const host = await User.create({
        name: h.name, email: h.email, password: 'host1234', role: 'host',
        phone: h.phone, isVerified: true,
        hostProfile: { phone: h.phone, address: h.address, governmentId: 'GOV-' + rand(100000, 999999), propertyType: h.propertyType, submittedAt: daysFromNow(-rand(30, 300)) },
      });
      hosts.push(host);
    }
    console.log(`${hosts.length} hosts created (password: host1234)`);

    const guests = [];
    for (let i = 0; i < guestNames.length; i++) {
      const guest = await User.create({
        name: guestNames[i], email: `guest${i + 1}@test.com`, password: 'guest1234', role: 'user',
        phone: `+977 98${rand(10000000, 99999999)}`, isVerified: true,
      });
      guests.push(guest);
    }
    console.log(`${guests.length} guests created (password: guest1234)`);

    // ── Rooms ────────────────────────────────────────────────────────────────
    const rooms = [];
    for (let i = 0; i < roomsSeed.length; i++) {
      const r = roomsSeed[i];
      const host = hosts[i % hosts.length];
      const nprPrice = usdToNpr(r.price);

      // Generate real reviews so rating/review-count are backed by actual data.
      const reviewCount = rand(3, 8);
      const reviewsArray = Array.from({ length: reviewCount }, () => {
        const reviewer = pick(guests);
        return {
          user: reviewer._id,
          name: reviewer.name,
          rating: rand(3, 5),
          comment: pick(REVIEW_COMMENTS),
          createdAt: daysFromNow(-rand(5, 200)),
        };
      });
      const avgRating = reviewsArray.reduce((s, rv) => s + rv.rating, 0) / reviewsArray.length;

      const room = await Room.create({
        ...r,
        price: nprPrice,
        priceDisplay: formatNPR(nprPrice),
        host: host._id,
        safety: ['Daily Cleaning', 'Fire Extinguishers', 'Smoke Detectors'],
        reviewsArray,
        rating: Math.round(avgRating * 10) / 10,
        reviews: reviewsArray.length,
      });
      rooms.push(room);
    }
    console.log(`${rooms.length} rooms seeded across ${hosts.length} hosts, each with real reviews`);

    // ── Bookings + matching transactions ────────────────────────────────────
    const STATUS_WEIGHTS = [
      { status: 'completed', weight: 35 },
      { status: 'confirmed-upcoming', weight: 25 },
      { status: 'confirmed-past', weight: 15 },
      { status: 'pending', weight: 15 },
      { status: 'cancelled', weight: 10 },
    ];
    const pickStatus = () => {
      const total = STATUS_WEIGHTS.reduce((s, w) => s + w.weight, 0);
      let r = rand(1, total);
      for (const w of STATUS_WEIGHTS) {
        if (r <= w.weight) return w.status;
        r -= w.weight;
      }
      return 'pending';
    };

    let bookingCount = 0;
    let transactionCount = 0;

    for (const room of rooms) {
      const numBookings = rand(2, 5);
      for (let i = 0; i < numBookings; i++) {
        const guest = pick(guests);
        const kind = pickStatus();
        const nights = rand(1, 5);
        let checkIn, checkOut, status, paymentStatus, reviewed = false;

        if (kind === 'completed') {
          checkIn = daysFromNow(-rand(10, 179));
          checkOut = new Date(checkIn); checkOut.setDate(checkOut.getDate() + nights);
          status = 'completed'; paymentStatus = 'paid';
          reviewed = Math.random() < 0.6;
        } else if (kind === 'confirmed-past') {
          checkIn = daysFromNow(-rand(3, 9));
          checkOut = new Date(checkIn); checkOut.setDate(checkOut.getDate() + nights);
          status = 'confirmed'; paymentStatus = 'paid';
        } else if (kind === 'confirmed-upcoming') {
          checkIn = daysFromNow(rand(3, 60));
          checkOut = new Date(checkIn); checkOut.setDate(checkOut.getDate() + nights);
          status = 'confirmed'; paymentStatus = 'paid';
        } else if (kind === 'pending') {
          checkIn = daysFromNow(rand(2, 20));
          checkOut = new Date(checkIn); checkOut.setDate(checkOut.getDate() + nights);
          status = 'pending'; paymentStatus = 'unpaid';
        } else {
          checkIn = daysFromNow(rand(-60, 30));
          checkOut = new Date(checkIn); checkOut.setDate(checkOut.getDate() + nights);
          status = 'cancelled'; paymentStatus = Math.random() < 0.7 ? 'refunded' : 'unpaid';
        }

        const totalPrice = room.price * nights;
        const taxes = Math.round(totalPrice * 0.10);
        const grandTotal = totalPrice + taxes;

        const booking = await Booking.create({
          user: guest._id, room: room._id, host: room.host,
          checkIn, checkOut, guests: rand(1, Math.min(4, room.maxGuests || 4)),
          pricePerNight: room.price, totalPrice, taxes, grandTotal,
          status, paymentStatus, paymentMethod: pick(['stripe', 'esewa']),
          guestName: guest.name, guestEmail: guest.email, guestPhone: guest.phone,
          reviewed,
        });
        bookingCount++;

        // Booking is "created" a few days before check-in (or right away for walk-in-ish cancellations)
        const bookedAt = new Date(Math.min(checkIn.getTime() - rand(1, 5) * 86400000, Date.now()));
        await backdate(Booking, booking._id, bookedAt);

        // One ledger transaction per paid/refunded booking, attributed to the host —
        // this single record feeds both the host revenue chart and the admin total.
        if (paymentStatus === 'paid') {
          const tx = await Transaction.create({
            user: room.host, booking: booking._id, amount: grandTotal,
            type: 'charge', status: 'completed',
            description: `Booking payment — ${room.title}`,
          });
          await backdate(Transaction, tx._id, bookedAt);
          transactionCount++;
        } else if (paymentStatus === 'refunded') {
          const tx = await Transaction.create({
            user: room.host, booking: booking._id, amount: grandTotal,
            type: 'refund', status: 'completed',
            description: `Refund — ${room.title}`,
          });
          await backdate(Transaction, tx._id, daysFromNow(-rand(0, 30)));
          transactionCount++;
        }
      }
    }
    console.log(`${bookingCount} bookings seeded across every status`);

    // Payouts + a couple pending transactions per host, for the Transactions "Earnings"/"Upcoming" tabs
    for (const host of hosts) {
      for (let i = 0; i < 2; i++) {
        const tx = await Transaction.create({
          user: host._id, amount: rand(5000, 30000), type: 'payout', status: 'completed',
          description: 'Payout to bank account',
        });
        await backdate(Transaction, tx._id, daysFromNow(-rand(5, 150)));
        transactionCount++;
      }
      const pendingTx = await Transaction.create({
        user: host._id, amount: rand(3000, 15000), type: 'charge', status: 'pending',
        description: 'Payment processing',
      });
      await backdate(Transaction, pendingTx._id, daysFromNow(-rand(0, 3)));
      transactionCount++;
    }
    console.log(`${transactionCount} transactions seeded total`);

    // ── Notifications (host-facing) ─────────────────────────────────────────
    const notifTemplates = [
      { type: 'booking', title: 'New Booking Request', message: 'You have a new pending reservation request.' },
      { type: 'payment', title: 'Payment Received', message: 'A guest payment has been processed successfully.' },
      { type: 'message', title: 'New Message', message: 'You have a new message from a guest.' },
      { type: 'review', title: 'New Review', message: 'A guest left a review on one of your listings.' },
      { type: 'system', title: 'Welcome to Hosting', message: 'Your host account is fully set up and verified.' },
    ];
    let notifCount = 0;
    for (const host of hosts) {
      const count = rand(5, 8);
      for (let i = 0; i < count; i++) {
        const t = pick(notifTemplates);
        const notif = await Notification.create({
          user: host._id, title: t.title, message: t.message, type: t.type,
          isRead: Math.random() < 0.5,
        });
        await backdate(Notification, notif._id, daysFromNow(-rand(0, 45)));
        notifCount++;
      }
    }
    console.log(`${notifCount} host notifications seeded`);

    // ── Messages (guest <-> host threads) ───────────────────────────────────
    let messageCount = 0;
    for (let i = 0; i < 10; i++) {
      const room = pick(rooms);
      const guest = pick(guests);
      const host = hosts.find((h) => h._id.equals(room.host));
      const threadMessages = [
        { from: guest, to: host, content: `Hi! Is "${room.title}" available for a stay next month?` },
        { from: host, to: guest, content: `Hi ${guest.name.split(' ')[0]}, yes it's available — happy to answer any questions!` },
        { from: guest, to: host, content: "Great, does the price include breakfast?" },
        { from: host, to: guest, content: "It doesn't, but there are great cafes within walking distance." },
      ];
      const numMessages = rand(2, threadMessages.length);
      for (let m = 0; m < numMessages; m++) {
        const msg = threadMessages[m];
        const message = await Message.create({
          sender: msg.from._id, recipient: msg.to._id, room: room._id,
          content: msg.content,
          isRead: m < numMessages - 1 ? true : Math.random() < 0.5,
        });
        await backdate(Message, message._id, daysFromNow(-rand(0, 20) + m));
        messageCount++;
      }
    }
    console.log(`${messageCount} messages seeded across 10 conversation threads`);

    // ── Reports (admin moderation queue) ────────────────────────────────────
    let reportCount = 0;
    for (const r of REPORT_SUBJECTS) {
      const reporter = pick(guests);
      const reportedHost = pick(hosts);
      const room = rooms.find((rm) => rm.host.equals(reportedHost._id));
      const report = await Report.create({
        reporter: reporter._id, reportedUser: reportedHost._id, room: room?._id,
        subject: r.subject, message: r.message,
        status: pick(['open', 'open', 'resolved', 'dismissed']),
      });
      await backdate(Report, report._id, daysFromNow(-rand(1, 60)));
      reportCount++;
    }
    console.log(`${reportCount} reports seeded`);

    console.log('\nSeed complete! Login credentials:');
    console.log('  Admin: admin@hotel.com / admin123');
    hosts.forEach((h) => console.log(`  Host:  ${h.email} / host1234  (${h.name})`));
    console.log(`  Guest: guest1@test.com ... guest${guests.length}@test.com / guest1234`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
