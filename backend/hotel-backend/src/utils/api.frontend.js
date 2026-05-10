/**
 * api.js — drop this into your React frontend src/services/api.js
 * Replace BASE_URL if your backend runs on a different port.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Helper ───────────────────────────────────────────────────────────────────
const getToken = () => localStorage.getItem('token');

const request = async (endpoint, options = {}) => {
  const token = getToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

// ─── AUTH ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  register:        (body)   => request('/auth/register',        { method: 'POST', body: JSON.stringify(body) }),
  login:           (body)   => request('/auth/login',           { method: 'POST', body: JSON.stringify(body) }),
  getMe:           ()       => request('/auth/me'),
  updateProfile:   (body)   => request('/auth/update-profile',  { method: 'PUT',  body: JSON.stringify(body) }),
  changePassword:  (body)   => request('/auth/change-password', { method: 'PUT',  body: JSON.stringify(body) }),
  toggleWishlist:  (roomId) => request(`/auth/wishlist/${roomId}`, { method: 'POST' }),
};

// ─── ROOMS ────────────────────────────────────────────────────────────────────
export const roomsAPI = {
  // params: { type, priceRange, sortBy, page, limit, search }
  getAll:          (params = {}) => request('/rooms?' + new URLSearchParams(params)),
  getById:         (id)          => request(`/rooms/${id}`),
  checkAvailability: (id, checkIn, checkOut) =>
    request(`/rooms/${id}/availability?checkIn=${checkIn}&checkOut=${checkOut}`),
  create:          (body)  => request('/rooms',          { method: 'POST',   body: JSON.stringify(body) }),
  update:          (id, body) => request(`/rooms/${id}`, { method: 'PUT',    body: JSON.stringify(body) }),
  delete:          (id)    => request(`/rooms/${id}`,    { method: 'DELETE' }),
  addReview:       (id, body) => request(`/rooms/${id}/reviews`, { method: 'POST', body: JSON.stringify(body) }),
};

// ─── PROPERTIES ───────────────────────────────────────────────────────────────
export const propertiesAPI = {
  // params: { category, isTopRated, isFeatured, search, page, limit }
  getAll:   (params = {}) => request('/properties?' + new URLSearchParams(params)),
  getById:  (id)          => request(`/properties/${id}`),
  create:   (body)        => request('/properties',       { method: 'POST',   body: JSON.stringify(body) }),
  update:   (id, body)    => request(`/properties/${id}`, { method: 'PUT',    body: JSON.stringify(body) }),
  delete:   (id)          => request(`/properties/${id}`, { method: 'DELETE' }),
};

// ─── BOOKINGS ─────────────────────────────────────────────────────────────────
export const bookingsAPI = {
  create:   (body) => request('/bookings',           { method: 'POST', body: JSON.stringify(body) }),
  getMine:  ()     => request('/bookings/my'),
  getById:  (id)   => request(`/bookings/${id}`),
  cancel:   (id)   => request(`/bookings/${id}/cancel`, { method: 'PUT' }),
};

// ─── PAYMENTS ─────────────────────────────────────────────────────────────────
export const paymentsAPI = {
  createIntent:     (bookingId) => request('/payments/create-intent', { method: 'POST', body: JSON.stringify({ bookingId }) }),
  confirmPayment:   (body)      => request('/payments/confirm',        { method: 'POST', body: JSON.stringify(body) }),
  getTransactions:  ()          => request('/payments/transactions'),
};

// ─── HOST ─────────────────────────────────────────────────────────────────────
export const hostAPI = {
  getDashboard:       ()         => request('/host/dashboard'),
  getListings:        ()         => request('/host/listings'),
  getReservations:    (params={})=> request('/host/reservations?' + new URLSearchParams(params)),
  updateReservation:  (id, body) => request(`/host/reservations/${id}`, { method: 'PUT', body: JSON.stringify(body) }),
  getTransactions:    (params={})=> request('/host/transactions?' + new URLSearchParams(params)),
  getMessages:        ()         => request('/host/messages'),
  sendMessage:        (body)     => request('/host/messages',  { method: 'POST', body: JSON.stringify(body) }),
  getNotifications:   ()         => request('/host/notifications'),
  markAllRead:        ()         => request('/host/notifications/read-all', { method: 'PUT' }),
};

// ─── ADMIN ────────────────────────────────────────────────────────────────────
export const adminAPI = {
  getStats:     ()         => request('/admin/stats'),
  getUsers:     (params={})=> request('/admin/users?' + new URLSearchParams(params)),
  updateUser:   (id, body) => request(`/admin/users/${id}`, { method: 'PUT',    body: JSON.stringify(body) }),
  deleteUser:   (id)       => request(`/admin/users/${id}`, { method: 'DELETE' }),
  getBookings:  (params={})=> request('/admin/bookings?' + new URLSearchParams(params)),
};
