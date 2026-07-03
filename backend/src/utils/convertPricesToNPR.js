/**
 * One-time migration: converts existing Room documents' USD-scale prices
 * to rounded NRS amounts. Run once after deploying the NRS currency change:
 *
 *   node src/utils/convertPricesToNPR.js
 *
 * Safe to run only once — running it a second time will re-convert already-NRS
 * prices as if they were still USD, inflating them. If you're unsure whether
 * it's already been run, check a room's price in the DB first.
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Room = require('../models/Room.model');
const { usdToNpr, formatNPR } = require('./currency');

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const rooms = await Room.find({});
    console.log(`Found ${rooms.length} room(s) to convert`);

    for (const room of rooms) {
      const nprPrice = usdToNpr(room.price);
      room.price = nprPrice;
      room.priceDisplay = formatNPR(nprPrice);
      await room.save();
      console.log(`  ${room.title}: → ${room.priceDisplay}`);
    }

    console.log(`\n✅ Converted ${rooms.length} room(s) to NRS.\n`);
    process.exit(0);
  } catch (err) {
    console.error('Migration error:', err.message);
    process.exit(1);
  }
};

run();
