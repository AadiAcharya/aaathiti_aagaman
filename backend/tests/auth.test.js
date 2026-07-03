const request = require('supertest');
const { app } = require('./testUtils');

describe('Auth', () => {
  test('registers a new user and returns a token', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
    });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeTruthy();
    expect(res.body.user.email).toBe('jane@example.com');
    expect(res.body.user.role).toBe('user');
  });

  test('rejects registration with an invalid email', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Jane Doe',
      email: 'not-an-email',
      password: 'password123',
    });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test('rejects registration with a short password', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Jane Doe',
      email: 'jane2@example.com',
      password: '123',
    });
    expect(res.status).toBe(400);
  });

  test('rejects duplicate email registration', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Jane Doe',
      email: 'dup@example.com',
      password: 'password123',
    });
    const res = await request(app).post('/api/auth/register').send({
      name: 'Jane Doe 2',
      email: 'dup@example.com',
      password: 'password123',
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/already registered/i);
  });

  test('logs in with correct credentials', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Login Test',
      email: 'login@example.com',
      password: 'password123',
    });
    const res = await request(app).post('/api/auth/login').send({
      email: 'login@example.com',
      password: 'password123',
    });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
  });

  test('rejects login with wrong password', async () => {
    await request(app).post('/api/auth/register').send({
      name: 'Login Test 2',
      email: 'login2@example.com',
      password: 'password123',
    });
    const res = await request(app).post('/api/auth/login').send({
      email: 'login2@example.com',
      password: 'wrongpassword',
    });
    expect(res.status).toBe(401);
  });

  test('GET /api/auth/me requires authentication', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
  });
});
