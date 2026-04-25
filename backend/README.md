# Backend - Aathiti Aagaman

Backend API for the hotel/rental booking website.

---

## 📋 Project Overview

**Current State:** Frontend only (React + Tailwind CSS)  
**Next Phase:** Build Node.js/Express backend with MongoDB

**Frontend URL:** http://localhost:5174  
**Backend URL (to be built):** http://localhost:5000 (or your choice)

---

## 🗄️ Database Schema (MongoDB)

### 1. **Users Collection**

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed with bcrypt),
  phone: String,
  profilePicture: String (URL),
  userType: Enum ["guest", "host", "admin"],
  createdAt: Date,
  updatedAt: Date,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  isVerified: Boolean,
  verificationToken: String (optional)
}
```

### 2. **Properties Collection**

```javascript
{
  _id: ObjectId,
  hostId: ObjectId (ref: Users),
  title: String,
  description: String,
  location: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  bedrooms: Number,
  bathrooms: Number,
  parking: Number,
  pets: Boolean,
  price: Number (per night),
  images: [String] (URLs),
  amenities: [String],
  safetyFeatures: [String],
  category: Enum ["rooms", "flats", "villas", "cottages"],
  rating: Number,
  reviews: Number,
  isTopRated: Boolean,
  isFeatured: Boolean,
  availableDates: [Date],
  bookings: [ObjectId] (ref: Bookings),
  createdAt: Date,
  updatedAt: Date
}
```

### 3. **Rooms Collection**

```javascript
{
  _id: ObjectId,
  propertyId: ObjectId (ref: Properties),
  roomNumber: String,
  title: String,
  description: String,
  type: Enum ["single", "double", "suite"],
  price: Number,
  maxGuests: Number,
  bedType: String,
  size: String,
  amenities: [String],
  safetyFeatures: [String],
  images: [String] (URLs),
  rating: Number,
  reviews: Number,
  isAvailable: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. **Bookings Collection**

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  propertyId: ObjectId (ref: Properties),
  roomId: ObjectId (ref: Rooms),
  checkInDate: Date,
  checkOutDate: Date,
  numberOfGuests: Number,
  totalPrice: Number,
  status: Enum ["pending", "confirmed", "cancelled", "completed"],
  paymentStatus: Enum ["unpaid", "paid", "refunded"],
  specialRequests: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 5. **Reviews Collection**

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  propertyId: ObjectId (ref: Properties),
  bookingId: ObjectId (ref: Bookings),
  rating: Number (1-5),
  comment: String,
  images: [String] (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### 6. **Messages Collection**

```javascript
{
  _id: ObjectId,
  senderId: ObjectId (ref: Users),
  recipientId: ObjectId (ref: Users),
  propertyId: ObjectId (ref: Properties),
  subject: String,
  message: String,
  isRead: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 7. **Favorites Collection** (Optional - or store in Users)

```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: Users),
  propertyIds: [ObjectId] (ref: Properties),
  roomIds: [ObjectId] (ref: Rooms),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Endpoints Required

### **Authentication Endpoints**

```
POST   /api/auth/register          - User registration
POST   /api/auth/login             - User login (returns JWT token)
POST   /api/auth/logout            - User logout
POST   /api/auth/verify-email      - Email verification
POST   /api/auth/forgot-password   - Password reset request
POST   /api/auth/reset-password    - Password reset
```

### **User Endpoints**

```
GET    /api/users/:id              - Get user profile
PUT    /api/users/:id              - Update user profile
DELETE /api/users/:id              - Delete user account
GET    /api/users/:id/bookings     - Get user's bookings
GET    /api/users/:id/favorites    - Get user's favorites
```

### **Property Endpoints**

```
GET    /api/properties             - Get all properties (with filters/search)
GET    /api/properties/:id         - Get property details
POST   /api/properties             - Create property (host only)
PUT    /api/properties/:id         - Update property (host only)
DELETE /api/properties/:id         - Delete property (host only)
GET    /api/properties/search      - Search properties
GET    /api/properties/:id/reviews - Get property reviews
```

### **Room Endpoints**

```
GET    /api/rooms                  - Get all rooms
GET    /api/rooms/:id              - Get room details
POST   /api/rooms                  - Create room (host only)
PUT    /api/rooms/:id              - Update room (host only)
DELETE /api/rooms/:id              - Delete room (host only)
GET    /api/rooms/property/:propertyId - Get rooms by property
```

### **Booking Endpoints**

```
POST   /api/bookings               - Create booking
GET    /api/bookings/:id           - Get booking details
GET    /api/bookings/user/:userId  - Get user's bookings
PUT    /api/bookings/:id           - Update booking status
DELETE /api/bookings/:id           - Cancel booking
```

### **Review Endpoints**

```
POST   /api/reviews                - Create review
GET    /api/reviews/property/:propertyId - Get property reviews
PUT    /api/reviews/:id            - Update review
DELETE /api/reviews/:id            - Delete review
```

### **Message Endpoints**

```
POST   /api/messages               - Send message
GET    /api/messages/user/:userId  - Get user's messages
GET    /api/messages/:id           - Get message details
PUT    /api/messages/:id/read      - Mark message as read
DELETE /api/messages/:id           - Delete message
```

### **Favorites Endpoints**

```
POST   /api/favorites/property     - Add property to favorites
DELETE /api/favorites/property/:id - Remove property from favorites
POST   /api/favorites/room         - Add room to favorites
DELETE /api/favorites/room/:id     - Remove room from favorites
GET    /api/favorites              - Get user's favorites
```

---

## 🛠️ Tech Stack (Recommended)

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Validation:** joi or express-validator
- **File Upload:** multer
- **CORS:** cors package
- **Environment Variables:** dotenv
- **Logging:** morgan or winston
- **Testing:** Jest + Supertest

---

## 📦 Node Modules to Install

```bash
npm install express dotenv mongoose jwt-simple bcryptjs cors multer joi morgan
npm install --save-dev nodemon jest supertest
```

---

## 🏗️ Folder Structure (Recommended)

```
/backend/
├── /routes
│   ├── auth.js
│   ├── users.js
│   ├── properties.js
│   ├── rooms.js
│   ├── bookings.js
│   ├── reviews.js
│   ├── messages.js
│   └── favorites.js
│
├── /controllers
│   ├── authController.js
│   ├── userController.js
│   ├── propertyController.js
│   ├── roomController.js
│   ├── bookingController.js
│   ├── reviewController.js
│   ├── messageController.js
│   └── favoriteController.js
│
├── /models
│   ├── User.js
│   ├── Property.js
│   ├── Room.js
│   ├── Booking.js
│   ├── Review.js
│   ├── Message.js
│   └── Favorite.js
│
├── /middleware
│   ├── auth.js (JWT verification)
│   ├── errorHandler.js
│   └── validation.js
│
├── /config
│   └── db.js (MongoDB connection)
│
├── /uploads
│   └── (store uploaded images)
│
├── .env
├── .env.example
├── package.json
├── server.js (main entry point)
├── postman/ (Postman collections)
├── .postman/ (Postman settings)
└── README.md
```

---

## 🔐 Authentication Flow

1. **Sign Up:**
   - POST `/api/auth/register` → Create user → Hash password → Send verification email

2. **Email Verification:**
   - User clicks verification link → POST `/api/auth/verify-email` → Mark as verified

3. **Sign In:**
   - POST `/api/auth/login` → Verify credentials → Generate JWT token → Return token

4. **Protected Routes:**
   - Include `Authorization: Bearer <token>` in headers
   - Middleware verifies token before allowing access

5. **Password Reset:**
   - POST `/api/auth/forgot-password` → Send reset link
   - User clicks link → POST `/api/auth/reset-password` → Update password

---

## 🔄 Frontend Integration Points

Current Frontend Uses:

- ✅ `localStorage` for favorites (REPLACE with API)
- ✅ `localStorage` for theme (keep local)
- ✅ Mock data from `/frontend/src/data/propertyData.js` (REPLACE with API)
- ✅ Form submissions with alerts only (IMPLEMENT actual API calls)

### Files to Update After Backend Ready:

1. **`/frontend/src/components/sign/SignUp.jsx`**
   - Replace `alert()` with actual API call to `/api/auth/register`

2. **`/frontend/src/components/sign/SignIn.jsx`**
   - Replace `alert()` with actual API call to `/api/auth/login`
   - Store JWT token in localStorage/cookies

3. **`/frontend/src/components/Home.jsx`**
   - Replace `propertyData` with API call to `/api/properties`
   - Replace `localStorage` favorites with API calls

4. **`/frontend/src/components/rooms/Rooms.jsx`**
   - Replace `roomsData` with API call to `/api/rooms`
   - Replace `localStorage` favorites with API calls

5. **`/frontend/src/components/rooms/Room.jsx`**
   - Fetch individual room data from API instead of mock data

6. **`/frontend/src/data/propertyData.js`**
   - This file will become obsolete (DELETE after API ready)

---

## 🚀 Quick Start (When Ready)

```bash
# In /backend folder
npm install
npm run dev
```

---

## 📝 Environment Variables (.env)

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aathiti-aagaman
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5174
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## ✅ Implementation Checklist

- [ ] Setup Node.js + Express server
- [ ] Connect MongoDB
- [ ] Create all database models
- [ ] Implement authentication (JWT)
- [ ] Create all API endpoints
- [ ] Add input validation
- [ ] Add error handling
- [ ] Add CORS support
- [ ] Add file upload for images
- [ ] Create API documentation (Swagger)
- [ ] Add unit & integration tests
- [ ] Implement rate limiting
- [ ] Add logging
- [ ] Deploy to production

---

## 📚 Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [JWT Guide](https://jwt.io/)
- [RESTful API Best Practices](https://restfulapi.net/)
- [Postman Documentation](https://learning.postman.com/)

---

## 🤝 Contributing

1. Create a branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

**Status:** 🔴 Not Started  
**Last Updated:** April 24, 2026
