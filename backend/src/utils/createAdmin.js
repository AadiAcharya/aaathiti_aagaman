/**
 * One-time script: creates a single admin account without touching any other
 * data (unlike seed.js, which wipes rooms). Safe to run on a live database.
 *
 *   node src/utils/createAdmin.js
 *
 * Uses fixed demo credentials below - change the password after logging in,
 * or edit the constants before running if you'd rather set it up yourself.
 */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/User.model');

const ADMIN_NAME = 'Admin';
const ADMIN_EMAIL = 'admin@aatithiaagaman.com';
const ADMIN_PASSWORD = 'Admin@12345';

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      if (existing.role !== 'admin') {
        existing.role = 'admin';
        await existing.save();
        console.log(`✅ Existing user ${ADMIN_EMAIL} promoted to admin.`);
      } else {
        console.log(`ℹ️  Admin account ${ADMIN_EMAIL} already exists - nothing to do.`);
      }
      process.exit(0);
    }

    await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin',
      isVerified: true,
    });

    console.log('\n✅ Admin account created:');
    console.log(`   Email:    ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log('   Please change this password after your first login.\n');
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err.message);
    process.exit(1);
  }
};

run();
