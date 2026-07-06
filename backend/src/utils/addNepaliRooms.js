/**
 * One-off content script: npm run seed:more
 *
 * Adds ~85 additional Nepal/Himalaya-themed room listings with real
 * photography, on top of whatever already exists — unlike seed.js, this
 * does NOT wipe the database. Safe to run against a live, in-use dataset.
 */
const mongoose = require('mongoose');
const dotenv   = require('dotenv');
dotenv.config();

const Room = require('../models/Room.model');
const User = require('../models/User.model');
const { formatNPR } = require('./currency');

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[rand(0, arr.length - 1)];
const pickN = (arr, n) => {
  const copy = [...arr];
  const out = [];
  for (let i = 0; i < n && copy.length; i++) {
    out.push(copy.splice(rand(0, copy.length - 1), 1)[0]);
  }
  return out;
};

// ── Verified real photography — actual Nepali lodge/villa/heritage building
// exteriors (used as covers, so listings read as real properties rather than
// generic landscapes), plus supporting mountain/lake views and interiors. ──
const BUILDING_PHOTOS = [
  'https://images.unsplash.com/photo-1628128520260-88fcddf4d33a?w=800&h=600&fit=crop', // monastery-style balcony, red brick
  'https://images.unsplash.com/photo-1665394182963-bf61352ce600?w=800&h=600&fit=crop', // white/blue guesthouse, terraced fields
  'https://images.unsplash.com/photo-1782022536393-bd9d666108ee?w=800&h=600&fit=crop', // stone lodge courtyard, snow peaks, prayer flags
  'https://images.unsplash.com/photo-1681018754686-89390ef742f3?w=800&h=600&fit=crop', // colorful lodge with Machapuchare peak behind
  'https://images.unsplash.com/photo-1648031208301-aa38ab57f002?w=800&h=600&fit=crop', // pagoda-tiered heritage building, prayer flags
  'https://images.unsplash.com/photo-1763809678810-b5c9c39b2cb1?w=800&h=600&fit=crop', // traditional brick village house
  'https://images.unsplash.com/photo-1668761598837-f348a7065679?w=800&h=600&fit=crop', // Newari pagoda tower building
  'https://images.unsplash.com/photo-1760366621225-55dceb1a3882?w=800&h=600&fit=crop', // hillside lodge, red roof, blue balcony
  'https://images.unsplash.com/photo-1678501265824-6f2fbc9dbaae?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1680292805555-d4f6d2d71580?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1664360224807-0751368c0c13?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1680421116223-47353f49e08c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1571546010145-1d0ea1b8c6b6?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1750199887675-53b6f8e5c4d3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1721930438680-8cb8ed46c01a?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1763738174308-a3f50f65f95b?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1763738174071-21cf11336b65?w=800&h=600&fit=crop',
];

const SCENERY_PHOTOS = [
  'https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=800&h=600&fit=crop', // houses overlooking mountain range
  'https://images.unsplash.com/photo-1580424917967-a8867a6e676e?w=800&h=600&fit=crop', // green trees & mountains
  'https://images.unsplash.com/photo-1553886334-43d24f24d3bd?w=800&h=600&fit=crop',    // snow-covered mountain
  'https://images.unsplash.com/photo-1636513988093-126e51dee32d?w=800&h=600&fit=crop', // green valley with mountains
  'https://images.unsplash.com/photo-1696388882435-4a8a116dff2c?w=800&h=600&fit=crop', // snow mountain with trees
  'https://images.unsplash.com/photo-1670126426026-9ce4666817e7?w=800&h=600&fit=crop', // snowy mountain, blue sky
  'https://images.unsplash.com/photo-1645788421204-0e4eb1d2a518?w=800&h=600&fit=crop', // mountain range view
  'https://images.unsplash.com/photo-1705602574636-2431474bd895?w=800&h=600&fit=crop', // mountain range in distance
  'https://images.unsplash.com/photo-1573729230078-fdf54ee54241?w=800&h=600&fit=crop', // boat on lake, mountain backdrop
  'https://images.unsplash.com/photo-1738459591439-f129ec0ac684?w=800&h=600&fit=crop', // lake + mountain range
];

const TEMPLE_PHOTOS = [
  'https://images.unsplash.com/photo-1529733905113-027ed85d7e33?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1669557582081-274a568aff4d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1614679645089-9710d1752cad?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1616392327822-626a27e24c2e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1572253765558-ed6413a68da5?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1678628103955-3ebaeb4d6d1f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1780546196363-3493ebc8068f?w=800&h=600&fit=crop', // heritage courtyard through carved window
  'https://images.unsplash.com/photo-1760366620629-7bd9b4717eb7?w=800&h=600&fit=crop', // courtyard with stupas
  'https://plus.unsplash.com/premium_photo-1700558684915-4ee912328a07?w=800&h=600&fit=crop',
  'https://plus.unsplash.com/premium_photo-1700558685091-626b62cefdf1?w=800&h=600&fit=crop',
];

const INTERIOR_PHOTOS = [
  'https://images.unsplash.com/photo-1687525023618-0087d9c36d6c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1687525023693-72e254917966?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1664087333667-d594d1fe35d1?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1660800718006-d6cb78e56643?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1643886090436-66267dd04704?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1740989488591-55648f155236?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1661205581050-5f433903720a?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1687068418741-59614c7c43d0?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1687676627083-e7df45578c8a?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1773393877183-ee765dd20fbb?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1665298081101-2b94a1ce22bb?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1676452723275-6484b7847ce1?w=800&h=600&fit=crop',
];

// Cover is always an actual building exterior (villa/lodge/heritage house) so
// listings read as real properties. Supporting shots mix a second building
// angle, room interiors, and one scenery/heritage view from the property.
function buildGallery() {
  const cover = pick(BUILDING_PHOTOS);
  const secondBuilding = pick(BUILDING_PHOTOS.filter((p) => p !== cover));
  const interiors = pickN(INTERIOR_PHOTOS, rand(2, 3));
  const view = pick([...SCENERY_PHOTOS, ...TEMPLE_PHOTOS]);
  const rest = [secondBuilding, ...interiors, view];
  return { image: cover, images: rest };
}

// ── Real Nepali places, spread across regions ──────────────────────────────
const PLACES = [
  ['Thamel', 'Kathmandu'], ['Boudhanath', 'Kathmandu'], ['Swayambhu', 'Kathmandu'],
  ['Kirtipur', 'Kathmandu'], ['Patan', 'Lalitpur'], ['Godawari', 'Lalitpur'],
  ['Bhaktapur Durbar Square', 'Bhaktapur'], ['Changunarayan', 'Bhaktapur'], ['Nagarkot', 'Bhaktapur'],
  ['Dhulikhel', 'Kavrepalanchok'], ['Panauti', 'Kavrepalanchok'], ['Bandipur', 'Tanahun'],
  ['Pokhara Lakeside', 'Kaski'], ['Sarangkot', 'Kaski'], ['Begnas Lake', 'Kaski'], ['Ghandruk', 'Kaski'],
  ['Sauraha', 'Chitwan'], ['Meghauli', 'Chitwan'], ['Lumbini', 'Rupandehi'], ['Butwal', 'Rupandehi'],
  ['Tansen', 'Palpa'], ['Gorkha Bazaar', 'Gorkha'], ['Besisahar', 'Lamjung'],
  ['Ilam Tea Gardens', 'Ilam'], ['Namche Bazaar', 'Solukhumbu'], ['Lukla', 'Solukhumbu'],
  ['Jomsom', 'Mustang'], ['Manang', 'Manang'], ['Rara Lake', 'Mugu'], ['Janakpur', 'Dhanusha'],
  ['Biratnagar', 'Morang'], ['Dharan', 'Sunsari'], ['Hetauda', 'Makwanpur'], ['Daman', 'Makwanpur'],
  ['Trishuli', 'Nuwakot'], ['Syabrubesi', 'Rasuwa'], ['Itahari', 'Sunsari'], ['Birgunj', 'Parsa'],
];

// ── Listing archetypes: title style, room type, typical amenities/pricing ──
const ARCHETYPES = [
  { style: 'Newari Heritage Homestay', type: 'double', bed: 'Queen', amen: ['WiFi', 'Kitchen', 'City View'], price: [2200, 4500] },
  { style: 'Himalayan View Lodge', type: 'suite', bed: 'King', amen: ['WiFi', 'Mountain View', 'Fireplace'], price: [3500, 7500] },
  { style: 'Pagoda Courtyard Suite', type: 'suite', bed: 'King', amen: ['WiFi', 'TV', 'City View'], price: [4000, 8500] },
  { style: 'Sherpa Trail Guesthouse', type: 'single', bed: 'Single', amen: ['WiFi', 'Mountain View'], price: [1200, 2500] },
  { style: 'Rhododendron Valley Cottage', type: 'double', bed: 'Twin', amen: ['Mountain View', 'Kitchen', 'Balcony'], price: [2800, 5000] },
  { style: 'Terai Riverside Bungalow', type: 'double', bed: 'Queen', amen: ['WiFi', 'AC', 'Balcony'], price: [2500, 4800] },
  { style: 'Namaste Garden Homestay', type: 'single', bed: 'Single', amen: ['WiFi', 'Kitchen'], price: [1500, 2800] },
  { style: 'Stupa View Studio', type: 'single', bed: 'Queen', amen: ['WiFi', 'TV', 'City View'], price: [1800, 3200] },
  { style: 'Rice Terrace Retreat', type: 'suite', bed: 'King + Twin', amen: ['WiFi', 'Mountain View', 'Kitchen'], price: [3200, 6000] },
  { style: 'Prayer Flag Terrace Suite', type: 'suite', bed: 'King', amen: ['WiFi', 'Mountain View', 'Balcony'], price: [4500, 9000] },
  { style: 'Yeti Mountain Lodge', type: 'double', bed: 'Twin', amen: ['Fireplace', 'Mountain View'], price: [2000, 4200] },
  { style: 'Tea Garden Cottage', type: 'double', bed: 'Queen', amen: ['WiFi', 'Balcony', 'Mountain View'], price: [2600, 4800] },
  { style: 'Khukuri Heritage Suite', type: 'suite', bed: 'King', amen: ['WiFi', 'TV', 'AC'], price: [3800, 7000] },
  { style: 'Dhaka Weave Family Room', type: 'suite', bed: 'King + 2 Singles', amen: ['WiFi', 'Kitchen', 'TV'], price: [4200, 8000] },
  { style: 'Boutique Pagoda Hotel Room', type: 'double', bed: 'Queen', amen: ['WiFi', 'TV', 'AC', 'Work Desk'], price: [3000, 5500] },
  { style: 'Lakeside Reflection Suite', type: 'suite', bed: 'King', amen: ['WiFi', 'Balcony', 'City View'], price: [4000, 8500] },
  { style: 'Eco Trekkers Lodge', type: 'single', bed: 'Single', amen: ['Mountain View'], price: [900, 2000] },
  { style: 'Durbar Square Heritage Room', type: 'double', bed: 'Queen', amen: ['WiFi', 'City View'], price: [2400, 4500] },
  { style: 'Valley Sunrise Cottage', type: 'double', bed: 'Twin', amen: ['Mountain View', 'Balcony'], price: [2200, 4000] },
  { style: 'Momo House Homestay', type: 'single', bed: 'Single', amen: ['WiFi', 'Kitchen'], price: [1300, 2400] },
];

const REVIEW_COMMENTS = [
  'Beautiful views every morning — worth the trip alone.',
  'Host welcomed us with tea and made us feel right at home.',
  'Traditional decor was gorgeous, exactly like the photos.',
  'Great base for exploring the area, quiet and peaceful.',
  'Loved the local breakfast the host prepared for us.',
  'Simple but very clean, and the location was unbeatable.',
  'One of the best stays we had in Nepal — highly recommend.',
  'The mountain view from the room was unforgettable.',
  'Warm hospitality, would happily stay again.',
  'Great value, friendly host, beautiful surroundings.',
];

const TARGET_COUNT = 85;
const NEW_HOSTS_SEED = [
  { name: 'Prakash Shrestha', place: 'Thamel, Kathmandu' },
  { name: 'Kamala Tamang', place: 'Nagarkot, Bhaktapur' },
  { name: 'Rabin Gurung', place: 'Pokhara Lakeside' },
  { name: 'Sarita Rai', place: 'Ilam' },
  { name: 'Dinesh Magar', place: 'Bandipur, Tanahun' },
  { name: 'Mina Lama', place: 'Sauraha, Chitwan' },
  { name: 'Suresh Thapa', place: 'Namche Bazaar' },
  { name: 'Gita Adhikari', place: 'Janakpur' },
  { name: 'Bikram Chettri', place: 'Tansen, Palpa' },
];

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  // Reuse existing demo hosts if present, plus create a batch of new Nepali hosts for variety
  let hosts = await User.find({ role: 'host' });
  const existingEmails = new Set(hosts.map((h) => h.email));

  for (const h of NEW_HOSTS_SEED) {
    const email = `${h.name.toLowerCase().replace(/\s+/g, '.')}@host.com`;
    if (existingEmails.has(email)) continue;
    const host = await User.create({
      name: h.name, email, password: 'host1234', role: 'host', isVerified: true,
      hostProfile: { phone: `+977 98${rand(10000000, 99999999)}`, address: h.place, governmentId: `GOV-${rand(100000, 999999)}`, propertyType: 'Homestay', submittedAt: new Date() },
    });
    hosts.push(host);
  }
  console.log(`${hosts.length} hosts available (existing + newly added)`);

  const guests = await User.find({ role: 'user' }).limit(20);
  console.log(`${guests.length} guest accounts available for review authorship`);

  let created = 0;
  for (let i = 0; i < TARGET_COUNT; i++) {
    const archetype = ARCHETYPES[i % ARCHETYPES.length];
    const [place, district] = PLACES[rand(0, PLACES.length - 1)];
    const host = hosts[rand(0, hosts.length - 1)];
    const price = rand(archetype.price[0], archetype.price[1]);
    const maxGuests = archetype.type === 'suite' ? rand(3, 6) : archetype.type === 'double' ? rand(2, 4) : rand(1, 2);
    const gallery = buildGallery();

    let reviewsArray = [];
    if (guests.length) {
      const reviewCount = rand(2, 6);
      reviewsArray = Array.from({ length: reviewCount }, () => {
        const reviewer = pick(guests);
        return {
          user: reviewer._id, name: reviewer.name,
          rating: rand(3, 5), comment: pick(REVIEW_COMMENTS),
        };
      });
    }
    const avgRating = reviewsArray.length
      ? reviewsArray.reduce((s, r) => s + r.rating, 0) / reviewsArray.length
      : 0;

    await Room.create({
      title: `${archetype.style} — ${place}`,
      description: `A ${archetype.style.toLowerCase()} nestled in ${place}, ${district}. Soak in authentic Nepali hospitality with easy access to the area's best sights.`,
      image: gallery.image,
      images: gallery.images,
      price,
      priceDisplay: formatNPR(price),
      type: archetype.type,
      bedType: archetype.bed,
      size: `${rand(20, 90)} sqm`,
      maxGuests,
      location: `${place}, ${district}, Nepal`,
      bedrooms: String(archetype.type === 'suite' ? rand(1, 3) : 1),
      bathrooms: String(archetype.type === 'suite' ? rand(1, 2) : 1),
      parking: String(rand(0, 1)),
      pets: Math.random() < 0.4 ? 'Yes' : 'No',
      amenities: archetype.amen,
      safety: ['Daily Cleaning', 'Fire Extinguishers', 'Smoke Detectors'],
      host: host._id,
      isAvailable: true,
      reviewsArray,
      rating: Math.round(avgRating * 10) / 10,
      reviews: reviewsArray.length,
    });
    created++;
  }

  console.log(`\n${created} new Nepal-themed rooms created.`);
  const total = await Room.countDocuments();
  console.log(`Total rooms in database now: ${total}`);
  await mongoose.disconnect();
}

if (require.main === module) {
  run().catch((err) => {
    console.error('Failed:', err);
    process.exit(1);
  });
}

module.exports = { buildGallery, BUILDING_PHOTOS, SCENERY_PHOTOS, TEMPLE_PHOTOS, INTERIOR_PHOTOS };
