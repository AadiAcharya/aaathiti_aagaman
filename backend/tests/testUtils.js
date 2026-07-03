const request = require('supertest');
const app = require('../src/app');

let counter = 0;

// Registers a fresh user/host and returns { token, user }
async function registerUser({ role = 'user', password = 'password123' } = {}) {
  counter += 1;
  const email = `test${Date.now()}${counter}@example.com`;
  const res = await request(app).post('/api/auth/register').send({
    name: 'Test User',
    email,
    password,
    role,
  });
  return { ...res.body, password, email };
}

async function createRoom(hostToken, overrides = {}) {
  const res = await request(app)
    .post('/api/rooms')
    .set('Authorization', `Bearer ${hostToken}`)
    .send({
      title: 'Test Room',
      description: 'A room for testing',
      price: 1000,
      type: 'single',
      ...overrides,
    });
  return res.body.room;
}

module.exports = { app, registerUser, createRoom };
