/**
 * src/services/api.js
 * Central API service — all backend calls go through here.
 */

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const getToken = () => localStorage.getItem("token");

const request = async (endpoint, options = {}) => {
  const token = getToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

// ─── UPLOAD ───────────────────────────────────────────────────────────────────
// Separate from request() since file uploads use multipart/form-data,
// not JSON — the browser sets the Content-Type boundary automatically.
export const uploadAPI = {
  uploadImage: async (file) => {
    const token = getToken();
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${BASE_URL}/upload`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Upload failed");
    return data;
  },
};

// ─── AUTH ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (body) =>
    request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login: (body) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  googleLogin: (credential) =>
    request("/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential }),
    }),
  getMe: () => request("/auth/me"),
  updateProfile: (body) =>
    request("/auth/update-profile", {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  changePassword: (body) =>
    request("/auth/change-password", {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  becomeHost: (body) =>
    request("/auth/become-host", { method: "PUT", body: JSON.stringify(body) }),
  toggleWishlist: (roomId) =>
    request(`/auth/wishlist/${roomId}`, { method: "POST" }),
  forgotPassword: (email) =>
    request("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
  resetPassword: (token, password) =>
    request(`/auth/reset-password/${token}`, {
      method: "PUT",
      body: JSON.stringify({ password }),
    }),
};

// ─── ROOMS ────────────────────────────────────────────────────────────────────
export const roomsAPI = {
  getAll: (params = {}) => request("/rooms?" + new URLSearchParams(params)),
  getById: (id) => request(`/rooms/${id}`),
  checkAvailability: (id, checkIn, checkOut) =>
    request(
      `/rooms/${id}/availability?checkIn=${checkIn}&checkOut=${checkOut}`,
    ),
  create: (body) =>
    request("/rooms", { method: "POST", body: JSON.stringify(body) }),
  update: (id, body) =>
    request(`/rooms/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  delete: (id) => request(`/rooms/${id}`, { method: "DELETE" }),
  addReview: (id, body) =>
    request(`/rooms/${id}/reviews`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
};

// ─── BOOKINGS ─────────────────────────────────────────────────────────────────
export const bookingsAPI = {
  create: (body) =>
    request("/bookings", { method: "POST", body: JSON.stringify(body) }),
  getMine: () => request("/bookings/my"),
  getById: (id) => request(`/bookings/${id}`),
  cancel: (id) => request(`/bookings/${id}/cancel`, { method: "PUT" }),
};

// ─── PAYMENTS ─────────────────────────────────────────────────────────────────
export const paymentsAPI = {
  createIntent: (bookingId) =>
    request("/payments/create-intent", {
      method: "POST",
      body: JSON.stringify({ bookingId }),
    }),
  confirmPayment: (body) =>
    request("/payments/confirm", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  // eSewa payment methods
  initiateEsewa: (bookingId) =>
    request("/payments/esewa/initiate", {
      method: "POST",
      body: JSON.stringify({ bookingId }),
    }),
  verifyEsewa: (refId, pid) =>
    request(`/payments/esewa/verify?refId=${refId}&pid=${pid}`),
  getTransactions: () => request("/payments/transactions"),
};

// ─── HOST ─────────────────────────────────────────────────────────────────────
export const hostAPI = {
  getDashboard: () => request("/host/dashboard"),
  getListings: () => request("/host/listings"),
  getReservations: (params = {}) =>
    request("/host/reservations?" + new URLSearchParams(params)),
  updateReservation: (id, body) =>
    request(`/host/reservations/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  getTransactions: (params = {}) =>
    request("/host/transactions?" + new URLSearchParams(params)),
  getNotifications: () => request("/host/notifications"),
  markAllRead: () => request("/host/notifications/read-all", { method: "PUT" }),
};

// ─── ADMIN ────────────────────────────────────────────────────────────────────
export const adminAPI = {
  getStats: () => request("/admin/stats"),
  getUsers: (params = {}) =>
    request("/admin/users?" + new URLSearchParams(params)),
  updateUser: (id, body) =>
    request(`/admin/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  deleteUser: (id) => request(`/admin/users/${id}`, { method: "DELETE" }),
  getBookings: (params = {}) =>
    request("/admin/bookings?" + new URLSearchParams(params)),
  getReports: (params = {}) =>
    request("/reports?" + new URLSearchParams(params)),
  updateReport: (id, body) =>
    request(`/reports/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  getListings: (params = {}) =>
    request("/admin/listings?" + new URLSearchParams(params)),
  updateListing: (id, body) =>
    request(`/admin/listings/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    }),
  deleteListing: (id) => request(`/admin/listings/${id}`, { method: "DELETE" }),
  deleteListingReview: (id, reviewId) =>
    request(`/admin/listings/${id}/reviews/${reviewId}`, { method: "DELETE" }),
};

// ─── MESSAGES (guest/host/admin - any authenticated user) ────────────────────
export const messageAPI = {
  getMine: () => request("/messages"),
  send: (body) =>
    request("/messages", { method: "POST", body: JSON.stringify(body) }),
  markRead: (id) => request(`/messages/${id}/read`, { method: "PUT" }),
};

// ─── REPORTS ──────────────────────────────────────────────────────────────────
export const reportAPI = {
  create: (body) =>
    request("/reports", { method: "POST", body: JSON.stringify(body) }),
};

// ─── BOOKINGS ─────────────────────────────────────────────────────────────────
