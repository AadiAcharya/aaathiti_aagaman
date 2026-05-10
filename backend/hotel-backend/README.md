# Hotel Backend — MERN Stack API

## Quick Start

### 1. Install dependencies
```bash
cd hotel-backend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env — set MONGO_URI, JWT_SECRET, STRIPE_SECRET_KEY
```

### 3. Seed the database
```bash
npm run seed
# Creates admin/host users + all rooms & properties from your frontend data
# Admin:  admin@hotel.com / admin123
# Host:   host@hotel.com  / host1234
```

### 4. Start the server
```bash
npm run dev   # development (nodemon)
npm start     # production
```

Server runs on **http://localhost:5000**

---

## API Reference

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | — | Register user/host |
| POST | `/api/auth/login` | — | Login → returns JWT |
| GET | `/api/auth/me` | ✅ | Get current user |
| PUT | `/api/auth/update-profile` | ✅ | Update name/phone/avatar |
| PUT | `/api/auth/change-password` | ✅ | Change password |
| POST | `/api/auth/wishlist/:roomId` | ✅ | Toggle wishlist |

### Rooms
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/rooms` | — | List rooms (filters: type, priceRange, sortBy, page, limit, search) |
| GET | `/api/rooms/:id` | — | Room detail |
| GET | `/api/rooms/:id/availability` | — | Check dates available |
| POST | `/api/rooms` | host/admin | Create room |
| PUT | `/api/rooms/:id` | host/admin | Update room |
| DELETE | `/api/rooms/:id` | host/admin | Delete room |
| POST | `/api/rooms/:id/reviews` | ✅ | Add review |

### Properties
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/properties` | — | List (filters: category, isTopRated, isFeatured, search) |
| GET | `/api/properties/:id` | — | Property detail |
| POST | `/api/properties` | host/admin | Create |
| PUT | `/api/properties/:id` | host/admin | Update |
| DELETE | `/api/properties/:id` | host/admin | Delete |

### Bookings
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/bookings` | ✅ | Create booking |
| GET | `/api/bookings/my` | ✅ | My bookings |
| GET | `/api/bookings/:id` | ✅ | Booking detail |
| PUT | `/api/bookings/:id/cancel` | ✅ | Cancel booking |

### Payments (Stripe)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/payments/create-intent` | ✅ | Create Stripe PaymentIntent |
| POST | `/api/payments/confirm` | ✅ | Confirm payment after Stripe |
| POST | `/api/payments/webhook` | — | Stripe webhook |
| GET | `/api/payments/transactions` | ✅ | My transaction history |

### Host Dashboard
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/host/dashboard` | host | Stats (listings, bookings, revenue, rating) |
| GET | `/api/host/listings` | host | My room listings |
| GET | `/api/host/reservations` | host | All reservations |
| PUT | `/api/host/reservations/:id` | host | Update reservation status |
| GET | `/api/host/transactions` | host | Transaction history |
| GET | `/api/host/messages` | host | Messages inbox |
| POST | `/api/host/messages` | host | Send message |
| GET | `/api/host/notifications` | host | Notifications |
| PUT | `/api/host/notifications/read-all` | host | Mark all read |

### Admin
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/stats` | admin | Platform stats |
| GET | `/api/admin/users` | admin | All users |
| PUT | `/api/admin/users/:id` | admin | Update user/role |
| DELETE | `/api/admin/users/:id` | admin | Delete user |
| GET | `/api/admin/bookings` | admin | All bookings |

---

## Connect to your React frontend

Copy `src/utils/api.frontend.js` → your frontend `src/services/api.js`

Add to your frontend `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

Example usage:
```js
import { authAPI, roomsAPI, bookingsAPI } from './services/api';

// Login
const { token, user } = await authAPI.login({ email, password });
localStorage.setItem('token', token);

// Fetch rooms with filters
const { rooms, total } = await roomsAPI.getAll({ type: 'suite', priceRange: '150-250', sortBy: 'price-low' });

// Create booking
const { booking } = await bookingsAPI.create({
  roomId, checkIn, checkOut, guests: 2
});

// Pay with Stripe
const { clientSecret } = await paymentsAPI.createIntent(booking._id);
// Use clientSecret with Stripe Elements on frontend
```

## Stripe Setup
1. Get your keys from https://dashboard.stripe.com
2. Add `STRIPE_SECRET_KEY` to `.env`
3. For webhooks in dev: `stripe listen --forward-to localhost:5000/api/payments/webhook`
4. Add `STRIPE_WEBHOOK_SECRET` to `.env`
