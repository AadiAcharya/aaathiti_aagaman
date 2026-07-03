const request = require('supertest');
const { app, registerUser, createRoom } = require('./testUtils');

const inDays = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();

async function setupHostAndRoom() {
  const host = await registerUser({ role: 'host' });
  const room = await createRoom(host.token);
  return { host, room };
}

async function bookRoom(guestToken, roomId) {
  const res = await request(app)
    .post('/api/bookings')
    .set('Authorization', `Bearer ${guestToken}`)
    .send({ roomId, checkIn: inDays(5), checkOut: inDays(7), guests: 1 });
  return res.body.booking;
}

// A stay that has already ended, so it's eligible to be marked "completed"
async function bookPastStay(guestToken, roomId) {
  const res = await request(app)
    .post('/api/bookings')
    .set('Authorization', `Bearer ${guestToken}`)
    .send({ roomId, checkIn: inDays(-5), checkOut: inDays(-3), guests: 1 });
  return res.body.booking;
}

describe('Reviews', () => {
  test('cannot review without a completed booking', async () => {
    const { room } = await setupHostAndRoom();
    const guest = await registerUser({ role: 'user' });
    const booking = await bookRoom(guest.token, room._id); // still pending

    const res = await request(app)
      .post(`/api/rooms/${room._id}/reviews`)
      .set('Authorization', `Bearer ${guest.token}`)
      .send({ rating: 5, comment: 'Great stay!', bookingId: booking._id });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/host has marked it complete/i);
  });

  test('host confirming a booking then marking it completed unlocks the review', async () => {
    const { host, room } = await setupHostAndRoom();
    const guest = await registerUser({ role: 'user' });
    const booking = await bookPastStay(guest.token, room._id);

    await request(app)
      .put(`/api/host/reservations/${booking._id}`)
      .set('Authorization', `Bearer ${host.token}`)
      .send({ status: 'confirmed' });

    await request(app)
      .put(`/api/host/reservations/${booking._id}`)
      .set('Authorization', `Bearer ${host.token}`)
      .send({ status: 'completed' });

    const res = await request(app)
      .post(`/api/rooms/${room._id}/reviews`)
      .set('Authorization', `Bearer ${guest.token}`)
      .send({ rating: 5, comment: 'Amazing host!', bookingId: booking._id });

    expect(res.status).toBe(201);
    expect(res.body.reviews.length).toBe(1);
    expect(res.body.reviews[0].comment).toBe('Amazing host!');
  });

  test('cannot review the same stay twice', async () => {
    const { host, room } = await setupHostAndRoom();
    const guest = await registerUser({ role: 'user' });
    const booking = await bookPastStay(guest.token, room._id);

    await request(app)
      .put(`/api/host/reservations/${booking._id}`)
      .set('Authorization', `Bearer ${host.token}`)
      .send({ status: 'confirmed' });
    await request(app)
      .put(`/api/host/reservations/${booking._id}`)
      .set('Authorization', `Bearer ${host.token}`)
      .send({ status: 'completed' });

    await request(app)
      .post(`/api/rooms/${room._id}/reviews`)
      .set('Authorization', `Bearer ${guest.token}`)
      .send({ rating: 4, comment: 'First review', bookingId: booking._id });

    const res = await request(app)
      .post(`/api/rooms/${room._id}/reviews`)
      .set('Authorization', `Bearer ${guest.token}`)
      .send({ rating: 5, comment: 'Second review attempt', bookingId: booking._id });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/already been reviewed/i);
  });

  test('cannot review a booking that belongs to another guest', async () => {
    const { host, room } = await setupHostAndRoom();
    const guest1 = await registerUser({ role: 'user' });
    const guest2 = await registerUser({ role: 'user' });
    const booking = await bookPastStay(guest1.token, room._id);

    await request(app)
      .put(`/api/host/reservations/${booking._id}`)
      .set('Authorization', `Bearer ${host.token}`)
      .send({ status: 'confirmed' });
    await request(app)
      .put(`/api/host/reservations/${booking._id}`)
      .set('Authorization', `Bearer ${host.token}`)
      .send({ status: 'completed' });

    const res = await request(app)
      .post(`/api/rooms/${room._id}/reviews`)
      .set('Authorization', `Bearer ${guest2.token}`)
      .send({ rating: 5, comment: 'Not my booking', bookingId: booking._id });

    expect(res.status).toBe(404);
  });
});
