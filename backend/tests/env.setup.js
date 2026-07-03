require('dotenv').config();

// Run tests against a dedicated database so they never touch dev/prod data
process.env.MONGO_URI = (process.env.MONGO_URI || 'mongodb://localhost:27017/hotel-db')
  .replace(/\/[^/]+$/, '/hotel-test');
process.env.NODE_ENV = 'test';
