# Aathiti Aagaman - Hotel/Rental Booking Website

Complete hotel and rental property booking website with frontend, backend, and API documentation.

---

## 🚀 Quick Start

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

**Access:** http://localhost:5176/

---

## 📁 Project Structure

\`\`\`
/aathiti_aagaman/
│
├── 📁 frontend/                ← REACT APPLICATION
│   ├── src/
│   │   ├── components/         ← React components (30+ components)
│   │   ├── data/              ← Mock data (propertyData.js)
│   │   ├── assets/            ← Images & logos
│   │   ├── App.jsx
│   │   └── index.css
│   ├── public/                ← Static files
│   ├── dist/                  ← Build output
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
│
├── 📁 backend/                 ← API (TO BUILD)
│   ├── postman/               ← API test collections
│   ├── .postman/              ← Postman settings
│   └── README.md              ← Backend setup guide (comprehensive)
│
├── 📁 addditional data/        ← Reference files
│
├── package.json               ← Root proxy commands
├── vite.config.js             ← Vite proxy
└── README.md                  ← This file
\`\`\`

---

## ✨ Frontend Features (Complete)

### Pages Built
- ✅ **Home** - Property listings with filtering & sorting
- ✅ **Rooms** - Room listings with amenities & pricing
- ✅ **Room Details** - Individual room information
- ✅ **Search** - Advanced search functionality
- ✅ **Properties** - All properties showcase
- ✅ **Hosting** - Host dashboard
- ✅ **Messages** - Messaging system UI
- ✅ **Account** - User profile management
- ✅ **Wishlist** - Saved favorites
- ✅ **Authentication** - Sign up / Sign in pages

### Features
- 🌓 Dark/Light theme toggle
- 💫 Favorites system (localStorage)
- 🔍 Search & filtering
- 📊 Sorting & pagination
- 📱 Fully responsive design
- ♿ Accessible components
- 🎨 Modern Tailwind CSS UI

### Technology Stack
- **Framework:** React 19
- **Styling:** Tailwind CSS
- **Routing:** React Router v7
- **Build Tool:** Vite
- **Linting:** ESLint

---

## 🔌 Backend (Ready to Build)

Complete backend setup guide with:
- **7 Database schemas** (MongoDB collections)
- **30+ API endpoints** (organized by feature)
- **Authentication** (JWT, bcrypt, email verification)
- **CRUD operations** for all entities
- **Error handling** & validation

### Files Needing API Connection (When Backend Ready)
1. /frontend/src/components/sign/SignUp.jsx
2. /frontend/src/components/sign/SignIn.jsx
3. /frontend/src/components/Home.jsx
4. /frontend/src/components/rooms/Rooms.jsx
5. /frontend/src/components/rooms/Room.jsx

### Files to Delete (When Backend Ready)
- /frontend/src/data/propertyData.js (mock data - will use API instead)

**See /backend/README.md for complete implementation guide.**

---

## 📊 Current Status

| Component | Status | Notes |
|-----------|--------|-------|
| Frontend | ✅ Complete | All UI pages built & working |
| Theme Toggle | ✅ Complete | Dark/Light mode with persistence |
| Favorites | ✅ Complete | Using localStorage (ready for API) |
| Search/Filter | ✅ Complete | Working with mock data |
| Authentication UI | ✅ Complete | Demo only, no backend |
| Backend API | 🔴 Not Started | See /backend/README.md |
| Database | 🔴 Not Started | Schema designed, ready to implement |
| Payment | 🔴 Not Started | Planned feature |

---

## 🎯 Next Steps

### Immediate (Frontend Polish)
- [ ] Fix Room.jsx dynamic data binding
- [ ] Add image gallery functionality
- [ ] Improve error handling
- [ ] Add loading states

### Priority 1 (Backend Core)
- [ ] Setup Node.js + Express server
- [ ] Connect MongoDB database
- [ ] Implement User authentication (JWT)
- [ ] Build Property CRUD API
- [ ] Build Room CRUD API
- [ ] Build Favorites API

### Priority 2 (Integration)
- [ ] Connect frontend to backend APIs
- [ ] Implement real user authentication
- [ ] Remove mock data from frontend
- [ ] Setup Postman collections
- [ ] Add API documentation (Swagger)

### Priority 3 (Advanced)
- [ ] Booking system
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Reviews & ratings
- [ ] Messaging system

---

## 🛠️ Available Commands

\`\`\`bash
# Development
npm run dev          # Start dev server (port 5176)
npm run lint         # Lint code

# Production
npm run build        # Build for production
npm run preview      # Preview production build
\`\`\`

---

## 📂 Data Structure

### Properties Mock Data
Located in /frontend/src/data/propertyData.js:
- **120+ Properties** with details (bedrooms, price, amenities, etc.)
- **18 Rooms** with specifications (type, size, rating, amenities)
- **Blogs** collection
- **Helper functions** for filtering, sorting, searching

### When Backend Ready
- Replace with API calls to /api/properties
- Replace with API calls to /api/rooms
- Use real database queries instead

---

## 🔐 Security Notes

**Current State (Development):**
- ⚠️ No backend authentication
- ⚠️ No password hashing
- ⚠️ localStorage only (demo purposes)
- ⚠️ No API validation

**When Building Backend:**
- ✅ Implement JWT authentication
- ✅ Hash passwords with bcryptjs
- ✅ Add input validation
- ✅ Implement rate limiting
- ✅ Add CORS configuration
- ✅ Secure environment variables

---

## 🚀 Deployment (Future)

### Frontend
- Build: \`npm run build\`
- Deploy to: Vercel, Netlify, or AWS S3
- Build output: /frontend/dist/

### Backend
- Deploy to: Heroku, AWS EC2, DigitalOcean, or Railway
- Database: MongoDB Atlas (cloud)
- Environment variables: Use .env file

---

## 📝 Development Guidelines

### Component Structure
- Use functional components with hooks
- Keep components small and reusable
- Use proper prop validation
- Add comments for complex logic

### Styling
- Use Tailwind CSS classes
- Follow existing design patterns
- Keep responsive design in mind
- Use CSS variables for theming

### Git Workflow
1. Create feature branch: \`git checkout -b feature/feature-name\`
2. Make changes and commit: \`git commit -m "Add feature"\`
3. Push: \`git push origin feature/feature-name\`
4. Create pull request

---

## 🐛 Known Issues

- Room.jsx needs dynamic data binding (in progress)
- Some ports (5173-5175) may be in use, defaulting to 5176
- Mock data in propertyData.js needs API replacement

---

## 📞 Support & Resources

- **React Documentation:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **Vite:** https://vite.dev
- **MongoDB Guide:** See /backend/README.md
- **API Documentation:** See /backend/README.md

---

## 📄 License

MIT License - Feel free to use this project for learning and development.

---

**Last Updated:** April 24, 2026  
**Status:** Frontend Complete ✅ | Backend Ready to Build 🚀
