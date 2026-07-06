/**
 * One-off fixup: npm run seed:more:photos
 *
 * Reassigns the image/images gallery for rooms created by addNepaliRooms.js
 * (identified by the "Style — Place" title format) to use the updated photo
 * pool — covers are now real lodge/villa/heritage building exteriors instead
 * of pure landscape shots. Does not touch any other room data.
 */
const mongoose = require('mongoose');
const dotenv   = require('dotenv');
dotenv.config();

const Room = require('../models/Room.model');
const { buildGallery } = require('./addNepaliRooms');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const rooms = await Room.find({ title: { $regex: / — / } }, '_id title');
  console.log(`Found ${rooms.length} Nepal-themed rooms to update`);

  for (const room of rooms) {
    const gallery = buildGallery();
    await Room.updateOne({ _id: room._id }, { $set: { image: gallery.image, images: gallery.images } });
  }

  console.log(`Updated photo galleries for ${rooms.length} rooms.`);
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
