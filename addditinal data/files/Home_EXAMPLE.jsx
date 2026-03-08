// ============================================
// EXAMPLE: Home.jsx with Data Integration
// ============================================
// This shows you HOW to use the propertyData.js file
// Follow the comments step-by-step!

import { useState } from 'react';

// STEP 1: Import your data and helper functions
import { 
  properties,              // All 16 properties
  blogs,                   // All 6 blog posts
  getLatestProperties,     // Gets first 4 properties
  getTopRatedProperties,   // Gets only 5-star properties
  getPropertiesByCategory  // Filters by rooms/flats/villas/hostels
} from './propertyData';

// Property card component (SAME as before)
const PropertyCard = ({
  title,
  location,
  bedrooms,
  bathrooms,
  parking,
  pets,
  price,
  isTopRated,
  image,
}) => (
  <div className="bg-bg-secondary rounded-lg overflow-hidden hover:shadow-lg transition border border-text-muted/20">
    <div className="bg-text-muted/10 h-48 relative overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover hover:scale-110 transition"
      />
      {isTopRated && (
        <div className="absolute top-3 right-3 bg-accent text-background px-3 py-1 rounded-full text-xs font-semibold">
          ★★★★★
        </div>
      )}
    </div>
    <div className="p-4">
      <p className="text-accent text-sm font-semibold">{price}</p>
      <h3 className="text-text-primary font-bold text-lg mt-2">{title}</h3>
      <p className="text-text-secondary text-sm mt-1">{location}</p>
      <div className="flex gap-4 mt-4 text-text-secondary text-sm">
        <span>🛏️ {bedrooms}</span>
        <span>🚿 {bathrooms}</span>
        <span>🚗 {parking}</span>
        <span>🐾 {pets}</span>
      </div>
    </div>
  </div>
);

// Blog card component (SAME as before)
const BlogCard = ({ title, category, image }) => (
  <div className="rounded-lg overflow-hidden hover:transform hover:scale-105 transition">
    <img
      src={image}
      alt={title}
      className="w-full h-48 object-cover rounded-lg"
    />
    <h3 className="text-text-primary font-bold text-lg mt-3">{title}</h3>
    <p className="text-accent text-sm font-semibold">{category}</p>
  </div>
);

export default function Home() {
  // STEP 2: Add state for tab selection
  const [selectedTab, setSelectedTab] = useState('rooms');
  
  // STEP 3: Get filtered properties based on selected tab
  const filteredProperties = getPropertiesByCategory(selectedTab);
  
  return (
    <div className="w-full bg-background min-h-screen">
      {/* Banner Section */}
      <div className="bg-bg-secondary py-24">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-6xl font-bold text-text-muted opacity-20 mb-8">
            DISCOVER LUXURY
          </h1>

          {/* Search Bar */}
          <div className="bg-background border border-primary/30 rounded-3xl p-8 shadow-lg">
            {/* Search Tabs */}
            <div className="flex gap-8 mb-8">
              <div className="flex flex-col">
                <p className="text-text-secondary font-semibold text-sm mb-2">
                  FIND
                </p>
                <div className="flex gap-6">
                  {/* 
                    STEP 4: Add onClick to change selectedTab 
                    When user clicks, it calls setSelectedTab('rooms')
                    This updates the state, which triggers re-render
                    Re-render calls getPropertiesByCategory with new tab
                    Properties update automatically!
                  */}
                  <button 
                    onClick={() => setSelectedTab('rooms')}
                    className={`capitalize font-semibold pb-2 transition ${
                      selectedTab === 'rooms'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-text-secondary hover:text-primary'
                    }`}
                  >
                    rooms
                  </button>
                  <button 
                    onClick={() => setSelectedTab('flats')}
                    className={`capitalize font-semibold pb-2 transition ${
                      selectedTab === 'flats'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-text-secondary hover:text-primary'
                    }`}
                  >
                    flats
                  </button>
                  <button 
                    onClick={() => setSelectedTab('villas')}
                    className={`capitalize font-semibold pb-2 transition ${
                      selectedTab === 'villas'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-text-secondary hover:text-primary'
                    }`}
                  >
                    villas
                  </button>
                  <button 
                    onClick={() => setSelectedTab('hostels')}
                    className={`capitalize font-semibold pb-2 transition ${
                      selectedTab === 'hostels'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-text-secondary hover:text-primary'
                    }`}
                  >
                    hostels
                  </button>
                </div>
              </div>
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div>
                <label className="text-text-secondary text-sm font-semibold block mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Which city do you prefer?"
                  className="w-full bg-bg-secondary text-text-primary placeholder-text-muted rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-text-secondary text-sm font-semibold block mb-2">
                  Check In
                </label>
                <input
                  type="text"
                  placeholder="Add Dates"
                  className="w-full bg-bg-secondary text-text-primary placeholder-text-muted rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-text-secondary text-sm font-semibold block mb-2">
                  Check Out
                </label>
                <input
                  type="text"
                  placeholder="Add Dates"
                  className="w-full bg-bg-secondary text-text-primary placeholder-text-muted rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-text-secondary text-sm font-semibold block mb-2">
                  Guests
                </label>
                <input
                  type="text"
                  placeholder="Add Guests"
                  className="w-full bg-bg-secondary text-text-primary placeholder-text-muted rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button className="bg-primary hover:bg-primary-hover text-white rounded-full px-8 py-3 font-semibold transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 
        STEP 5: Latest Properties Section 
        OLD: 4 hardcoded <PropertyCard> components
        NEW: Use .map() to generate cards from data
      */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Latest on the Property Listing
          </h2>
          <div className="w-32 h-1.5 bg-primary rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 
            WHAT HAPPENS HERE:
            1. getLatestProperties() returns array of 4 properties
            2. .map() loops through each property
            3. For EACH property, create a PropertyCard
            4. key={property.id} - React needs this for performance
            5. {...property} - Spreads all properties (title, location, etc.)
          */}
          {getLatestProperties().map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
            />
          ))}
        </div>
      </div>

      {/* STEP 6: Top Rated Properties */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Top Rated Properties
          </h2>
          <div className="w-32 h-1.5 bg-primary rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Only show properties where isTopRated === true */}
          {getTopRatedProperties().slice(0, 4).map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
            />
          ))}
        </div>
      </div>

      {/* STEP 7: Featured Properties (filtered by selected tab) */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Featured {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} on our Listing
          </h2>
          <div className="w-32 h-1.5 bg-primary rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Shows properties based on selected tab (rooms/flats/villas/hostels) */}
          {filteredProperties.slice(0, 3).map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
            />
          ))}
        </div>
      </div>

      {/* Try Hosting */}
      <div className="bg-bg-secondary py-20 my-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-text-primary mb-4">
                Try Hosting With Us
              </h2>
              <p className="text-text-secondary mb-8">
                Earn extra just by renting your property...
              </p>
              <button className="bg-accent hover:bg-primary text-background hover:text-white px-8 py-3 rounded-full font-semibold transition">
                Become A Host
              </button>
            </div>
            <div className="h-96 bg-background rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                alt="Start Hosting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* STEP 8: Blog Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-text-primary mb-4">
            Property Rental Guides & Tips
          </h2>
          <div className="w-32 h-1.5 bg-primary rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Show first 3 blogs using .slice(0, 3) */}
          {blogs.slice(0, 3).map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              category={blog.category}
              image={blog.image}
            />
          ))}
        </div>

        <div className="text-center">
          <button className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-semibold transition">
            View All Blogs
          </button>
        </div>
      </div>

      {/* Rest of sections... (keeping them as-is for now) */}
      
      {/* Newsletter */}
      <div className="bg-bg-secondary py-12 my-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-text-primary">
                NEWSLETTER
              </h3>
              <p className="text-text-secondary">Stay Upto Date</p>
            </div>
            <div className="flex-1 flex gap-4">
              <input
                type="email"
                placeholder="Your Email..."
                className="flex-1 bg-background text-text-primary placeholder-text-muted rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary hover:bg-primary-hover text-white rounded-full px-8 font-semibold transition">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
  ============================================
  YOUR TASKS:
  ============================================
  
  1. ✅ Copy this file structure
  2. ✅ Make sure propertyData.js is in same folder
  3. ✅ Test the tab switching - click rooms/flats/villas/hostels
  4. ✅ Open browser console - check for errors
  5. ✅ Inspect the cards - data should be different for each
  
  ============================================
  UNDERSTANDING CHECK:
  ============================================
  
  Before moving on, make sure you understand:
  
  Q: What does .map() do?
  A: Loops through array and creates JSX for each item
  
  Q: What is {...property}?
  A: Spreads all property keys as props (title={}, location={}, etc.)
  
  Q: Why do we need key={property.id}?
  A: React uses keys to track which items changed/added/removed
  
  Q: What does getPropertiesByCategory do?
  A: Filters properties array to show only selected category
  
  Q: How does tab switching work?
  A: onClick → setSelectedTab → state updates → component re-renders → new data shows
  
  ============================================
  NEXT STEPS:
  ============================================
  
  Once this works:
  1. Add search functionality (filter by location)
  2. Add "Nearby Properties" with different data
  3. Try fetching from a real API
  4. Add loading states
  
  You're learning REAL React patterns! 🎯
*/
