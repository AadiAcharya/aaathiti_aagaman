const request = require('supertest');
const { app, registerUser } = require('./testUtils');

describe('Rooms', () => {
  test('a host can create a room', async () => {
    const { token } = await registerUser({ role: 'host' });
    const res = await request(app)
      .post('/api/rooms')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Cozy Cabin', description: 'Nice place', price: 500, type: 'single' });

    expect(res.status).toBe(201);
    expect(res.body.room.title).toBe('Cozy Cabin');
  });

  test('a regular user cannot create a room', async () => {
    const { token } = await registerUser({ role: 'user' });
    const res = await request(app)
      .post('/api/rooms')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Cozy Cabin', description: 'Nice place', price: 500, type: 'single' });

    expect(res.status).toBe(403);
  });

  test('rejects room creation with an invalid type', async () => {
    const { token } = await registerUser({ role: 'host' });
    const res = await request(app)
      .post('/api/rooms')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Cozy Cabin', description: 'Nice place', price: 500, type: 'mansion' });

    expect(res.status).toBe(400);
  });

  test('rejects room creation with a negative price', async () => {
    const { token } = await registerUser({ role: 'host' });
    const res = await request(app)
      .post('/api/rooms')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Cozy Cabin', description: 'Nice place', price: -10, type: 'single' });

    expect(res.status).toBe(400);
  });

  test('lists rooms publicly without authentication', async () => {
    const { token } = await registerUser({ role: 'host' });
    await request(app)
      .post('/api/rooms')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Public Room', description: 'Visible to all', price: 300, type: 'double' });

    const res = await request(app).get('/api/rooms');
    expect(res.status).toBe(200);
    expect(res.body.rooms.length).toBeGreaterThan(0);
  });
});
