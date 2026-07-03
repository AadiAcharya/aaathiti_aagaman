const request = require('supertest');
const { app, registerUser, createRoom } = require('./testUtils');

const inDays = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
const inHours = (hours) => new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();

async function setupHostAndRoom() {
  const host = await registerUser({ role: 'host' });
  const room = await createRoom(host.token);
  return { host, room };
}

describe('Bookings', () => {
  test('a guest can create a booking, which blocks the dates on the room', async () => {
    const { room } = await setupHostAndRoom();
    const guest = await registerUser({ role: 'user' });

    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${guest.token}`)
      .send({ roomId: room._id, checkIn: inDays(5), checkOut: inDays(7), guests: 2 });

    expect(res.status).toBe(201);
    expect(res.body.booking.status).toBe('pending');

    const roomRes = await request(app).get(`/api/rooms/${room._id}`);
    expect(roomRes.body.room.bookedDates.length).toBe(1);
  });

  test('rejects overlapping bookings for the same dates', async () => {
    const { room } = await setupHostAndRoom();
    const guest1 = await registerUser({ role: 'user' });
    const guest2 = await registerUser({ role: 'user' });

    await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${guest1.token}`)
      .send({ roomId: room._id, checkIn: inDays(5), checkOut: inDays(7), guests: 1 });

    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${guest2.token}`)
      .send({ roomId: room._id, checkIn: inDays(6), checkOut: inDays(8), guests: 1 });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/already booked/i);
  });

  test('hosts cannot create bookings', async () => {
    const { host, room } = await setupHostAndRoom();
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${host.token}`)
      .send({ roomId: room._id, checkIn: inDays(5), checkOut: inDays(7), guests: 1 });

    expect(res.status).toBe(403);
  });

  test('rejects a booking with a malformed roomId', async () => {
    const guest = await registerUser({ role: 'user' });
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${guest.token}`)
      .send({ roomId: 'not-an-id', checkIn: inDays(5), checkOut: inDays(7), guests: 1 });

    expect(res.status).toBe(400);
  });

  test('a guest can cancel a booking made far enough in advance, freeing the dates', async () => {
    const { room } = await setupHostAndRoom();
    const guest = await registerUser({ role: 'user' });

    const create = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${guest.token}`)
      .send({ roomId: room._id, checkIn: inDays(10), checkOut: inDays(12), guests: 1 });

    const cancel = await request(app)
      .put(`/api/bookings/${create.body.booking._id}/cancel`)
      .set('Authorization', `Bearer ${guest.token}`);

    expect(cancel.status).toBe(200);
    expect(cancel.body.booking.status).toBe('cancelled');

    const roomRes = await request(app).get(`/api/rooms/${room._id}`);
    expect(roomRes.body.room.bookedDates.length).toBe(0);
  });

  test('cannot cancel a booking within the 24-hour cutoff', async () => {
    const { room } = await setupHostAndRoom();
    const guest = await registerUser({ role: 'user' });

    const create = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${guest.token}`)
      .send({ roomId: room._id, checkIn: inHours(12), checkOut: inHours(36), guests: 1 });

    const cancel = await request(app)
      .put(`/api/bookings/${create.body.booking._id}/cancel`)
      .set('Authorization', `Bearer ${guest.token}`);

    expect(cancel.status).toBe(400);
    expect(cancel.body.message).toMatch(/24 hours/i);
  });

  test('another guest cannot cancel someone else\'s booking', async () => {
    const { room } = await setupHostAndRoom();
    const guest1 = await registerUser({ role: 'user' });
    const guest2 = await registerUser({ role: 'user' });

    const create = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${guest1.token}`)
      .send({ roomId: room._id, checkIn: inDays(10), checkOut: inDays(12), guests: 1 });

    const cancel = await request(app)
      .put(`/api/bookings/${create.body.booking._id}/cancel`)
      .set('Authorization', `Bearer ${guest2.token}`);

    expect(cancel.status).toBe(403);
  });

  test('host cannot mark a booking completed before checkout has passed', async () => {
    const { host, room } = await setupHostAndRoom();
    const guest = await registerUser({ role: 'user' });

    const create = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${guest.token}`)
      .send({ roomId: room._id, checkIn: inDays(10), checkOut: inDays(12), guests: 1 });

    await request(app)
      .put(`/api/host/reservations/${create.body.booking._id}`)
      .set('Authorization', `Bearer ${host.token}`)
      .send({ status: 'confirmed' });

    const complete = await request(app)
      .put(`/api/host/reservations/${create.body.booking._id}`)
      .set('Authorization', `Bearer ${host.token}`)
      .send({ status: 'completed' });

    expect(complete.status).toBe(400);
    expect(complete.body.message).toMatch(/until after checkout/i);
  });

  test('host rejecting a booking frees up the blocked dates', async () => {
    const { host, room } = await setupHostAndRoom();
    const guest = await registerUser({ role: 'user' });

    const create = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${guest.token}`)
      .send({ roomId: room._id, checkIn: inDays(10), checkOut: inDays(12), guests: 1 });

    const reject = await request(app)
      .put(`/api/host/reservations/${create.body.booking._id}`)
      .set('Authorization', `Bearer ${host.token}`)
      .send({ status: 'cancelled' });

    expect(reject.status).toBe(200);

    const roomRes = await request(app).get(`/api/rooms/${room._id}`);
    expect(roomRes.body.room.bookedDates.length).toBe(0);
  });
});
