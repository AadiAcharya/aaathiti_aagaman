import { useParams } from "react-router-dom";
// import { useState } from "react";
import {roomsData} from "../../data/propertyData"

// Icon mapping for amenities
const amenityIcons = {
  'WiFi': '📶',
  'TV': '📺',
  'AC': '❄️',
  'Mini Bar': '🍹',
  'Coffee Maker': '☕',
  'Balcony': '🌴',
  'Kitchen': '🍳',
  'Washer': '🧺',
  'Work Desk': '💼',
  'Fireplace': '🔥',
  'Mountain View': '⛰️',
  'Hot Tub Access': '🛁',
  'City View': '🏙️',
  'Beach Access': '🏖️',
};

const getAmenityIcon = (amenity) => {
  return amenityIcons[amenity] || '✓';
};


 // Get initial favorite state from localStorage
  // const getInitialFavorite = () => {
  //   if (currentRoom) {
  //     const saved = localStorage.getItem('roomFavorites');
  //     const favorites = saved ? JSON.parse(saved) : [];
  //     return favorites.includes(currentRoom.id);
  //   }
  //   return false;
  // };

  // const [isFavorited, setIsFavorited] = useState(getInitialFavorite());

  // if (!currentRoom){
  //   return <div className="text-center p-8 text-text-primary">Room not found</div>
  // }

  // const toggleFavorite = () => {
  //   const saved = localStorage.getItem('roomFavorites');
  //   let favorites = saved ? JSON.parse(saved) : [];
  //   if (isFavorited) {
  //     favorites = favorites.filter(id => id !== currentRoom.id);
  //   } else {
  //     favorites.push(currentRoom.id);
  //   }
  //   localStorage.setItem('roomFavorites', JSON.stringify(favorites));
  //   setIsFavorited(!isFavorited);
  // };

export default function Room() {
  const { roomId } = useParams();
  const currentRoom = roomsData.find((room)=> room.id === parseInt(roomId))
  if (!currentRoom){
    return <div className="text-center p-8 text-text-primary">Room not found</div>
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Image Gallery */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          {/* Main large image - spans 2 columns and 2 rows */}
          <div className="col-span-2 row-span-2">
            <div className="w-full h-full rounded-2xl object-cover shadow-lg shadow-primary/10 bg-bg-secondary flex items-center justify-center border-2 border-dashed border-primary/30">
              <p className="text-text-secondary">Main Image</p>
            </div>
          </div>

          {/* Top right images */}
          <div className="bg-bg-secondary h-40 rounded-lg object-cover border border-primary/10 flex items-center justify-center">
            <p className="text-text-secondary">Image 2</p>
          </div>
          <div className="bg-bg-secondary h-40 rounded-lg object-cover border border-primary/10 flex items-center justify-center">
            <p className="text-text-secondary">Image 3</p>
          </div>

          {/* Bottom right images */}
          <div className="bg-bg-secondary h-40 rounded-lg object-cover border border-primary/10 flex items-center justify-center">
            <p className="text-text-secondary">Image 4</p>
          </div>
          <div className="bg-gradient-to-br from-bg-secondary to-bg-secondary/50 h-40 rounded-lg relative flex flex-col items-center justify-center border border-primary/20 cursor-pointer group">
            <span className="text-4xl font-bold text-accent group-hover:scale-110 transition-transform duration-300">
              +2
            </span>
            <span className="text-sm font-semibold text-text-primary">
              More Photos
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="col-span-2">
            {/* Title Section */}
            <div className="mb-8 flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                 {currentRoom.title}
                </h1>
                <p className="text-text-secondary">Location: {roomId}</p>
              </div>
              <div className="flex gap-4">
                <button className="p-3 hover:bg-primary/10 rounded-lg transition-all duration-300 hover:border-primary/40">
                  <span className="text-2xl">🤍</span>
                </button>
              </div>
            </div>

            {/* Main Amenities */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Main Amenities
              </h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-bg-secondary p-6 rounded-lg text-center border border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer">
                  <span className="text-4xl mb-2 block">🛏️</span>
                  <p className="font-semibold text-text-primary">Bedrooms</p>
                </div>
                <div className="bg-bg-secondary p-6 rounded-lg text-center border border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer">
                  <span className="text-4xl mb-2 block">🚿</span>
                  <p className="font-semibold text-text-primary">Bathrooms</p>
                </div>
                <div className="bg-bg-secondary p-6 rounded-lg text-center border border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer">
                  <span className="text-4xl mb-2 block">🚗</span>
                  <p className="font-semibold text-text-primary">Parking</p>
                </div>
                <div className="bg-bg-secondary p-6 rounded-lg text-center border border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer">
                  <span className="text-4xl mb-2 block">🐾</span>
                  <p className="font-semibold text-text-primary">Pets</p>
                </div>
              </div>
            </div>

            {/* Apartment Description */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Apartment Description
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-4 bg-bg-secondary/50 p-4 rounded-lg border border-primary/10">
               {currentRoom.description}
              </p>
            </div>

            {/* Offered Amenities */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Offered Amenities
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  {currentRoom.amenities.slice(0,Math.ceil(currentRoom.amenities.length /2)).map((amenity, id)=> (
                    <div key={id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-primary/5 transition-colors duration-300">

                    <span className="text-2xl">{getAmenityIcon(amenity)}</span>
                    <span className="text-text-secondary">{amenity}</span>
                  </div>
                  ))}
                  
                </div>
                <div className="space-y-4">
                  {currentRoom.amenities.slice(0, Math.ceil(currentRoom.amenities.length / 2)).map((amenity, id) => (
                     <div key={id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-primary/5 transition-colors duration-300">
                    <span className="text-2xl">{getAmenityIcon(amenity)}</span>
                    <span className="text-text-secondary">
                      {amenity}
                      
                    </span>
                    </div>
                  ))}
                
                </div>
              </div>
              <button className="mt-6 px-6 py-3 border-2 border-accent rounded-lg font-semibold text-accent hover:bg-accent hover:text-background hover:shadow-lg hover:shadow-accent/20 transition-all duration-300">
                Show All Amenities
              </button>
            </div>

            {/* Safety and Hygiene */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Safety and Hygiene
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-primary/5 transition-colors duration-300">
                    <span className="text-2xl">✨</span>
                    <span className="text-text-secondary">Daily Cleaning</span>
                  </div>
                  <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-primary/5 transition-colors duration-300">
                    <span className="text-2xl">🧼</span>
                    <span className="text-text-secondary">
                      Disinfections and Sterilizations
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-primary/5 transition-colors duration-300">
                    <span className="text-2xl">🧯</span>
                    <span className="text-text-secondary">
                      Fire Extinguishers
                    </span>
                  </div>
                  <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-primary/5 transition-colors duration-300">
                    <span className="text-2xl">🚨</span>
                    <span className="text-text-secondary">Smoke Detectors</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Reviews{" "}
                <span className="ml-4 text-2xl font-bold text-accent">5.0</span>
              </h2>
              <div className="space-y-6">
                {/* Review 1 */}
                <div className="flex gap-4 p-4 bg-bg-secondary rounded-lg border border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full shrink-0 object-cover border-2 border-primary/30 bg-primary/20"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-text-primary">
                        Reviewer Name
                      </h3>
                      <div className="flex gap-1">
                        <span className="text-accent">⭐⭐⭐⭐⭐</span>
                      </div>
                    </div>
                    <p className="text-text-secondary text-sm">Review date</p>
                    <p className="text-text-secondary text-sm mt-2">
                      Review comment goes here
                    </p>
                  </div>
                </div>

                {/* Review 2 */}
                <div className="flex gap-4 p-4 bg-bg-secondary rounded-lg border border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full shrink-0 object-cover border-2 border-primary/30 bg-primary/20"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-text-primary">
                        Another Reviewer
                      </h3>
                      <div className="flex gap-1">
                        <span className="text-accent">⭐⭐⭐⭐⭐</span>
                      </div>
                    </div>
                    <p className="text-text-secondary text-sm">Review date</p>
                    <p className="text-text-secondary text-sm mt-2">
                      Another review comment goes here
                    </p>
                  </div>
                </div>
              </div>
              <button className="mt-6 px-6 py-3 border-2 border-accent rounded-lg font-semibold text-accent hover:bg-accent hover:text-background hover:shadow-lg hover:shadow-accent/20 transition-all duration-300">
                Show All Reviews
              </button>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="col-span-1">
            <div className="bg-gradient-to-br from-bg-secondary to-bg-secondary/50 border-2 border-primary/30 rounded-lg p-6 sticky top-32 shadow-xl shadow-primary/10">
              <p className="text-2xl font-bold text-accent mb-6">$0 - $0</p>

              <div className="border-t border-primary/20 py-4 mb-4">
                <p className="text-sm text-text-secondary mb-2">
                  Short Period: $0
                </p>
                <p className="text-sm text-text-secondary mb-2">
                  Medium Period: $0
                </p>
                <p className="text-sm text-text-secondary">Long Period: $0</p>
              </div>

              <button className="w-full bg-primary text-background font-bold py-3 rounded-full mb-4 hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105">
                Reserve Now
              </button>

              <div className="space-y-4">
                <button className="w-full text-left text-sm font-semibold text-accent p-3 border border-accent rounded flex items-center gap-2 hover:bg-accent hover:text-background hover:shadow-lg hover:shadow-accent/20 transition-all duration-300">
                  <span>🏢</span> Property Inquiry
                </button>
                <button className="w-full text-left text-sm font-semibold text-accent p-3 border border-accent rounded flex items-center gap-2 hover:bg-accent hover:text-background hover:shadow-lg hover:shadow-accent/20 transition-all duration-300">
                  <span>📞</span> Contact Host
                </button>
              </div>

              {/* Host Info */}
              <div className="mt-8 pt-8 border-t border-primary/20">
                <p className="text-xs text-text-muted mb-2">Listed By:</p>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full border-2 border-primary/30 bg-primary/20"></div>
                  <h3 className="text-lg font-bold text-text-primary">
                    Host Name
                  </h3>
                </div>
                <p className="text-sm text-text-secondary">For: $0 - $0</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Services */}
        <div className="mt-16 mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Nearby Services
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="bg-bg-secondary border border-primary/20 rounded-lg p-4 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-accent">⭐⭐⭐⭐⭐</span>
              </div>
              <h3 className="font-bold text-text-primary">Service Name</h3>
              <p className="text-sm text-text-secondary">Distance away</p>
            </div>

            {/* Service 2 */}
            <div className="bg-bg-secondary border border-primary/20 rounded-lg p-4 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-accent">⭐⭐⭐⭐⭐</span>
              </div>
              <h3 className="font-bold text-text-primary">Service Name</h3>
              <p className="text-sm text-text-secondary">Distance away</p>
            </div>

            {/* Service 3 */}
            <div className="bg-bg-secondary border border-primary/20 rounded-lg p-4 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-1 mb-2">
                <span className="text-accent">⭐⭐⭐⭐⭐</span>
              </div>
              <h3 className="font-bold text-text-primary">Service Name</h3>
              <p className="text-sm text-text-secondary">Distance away</p>
            </div>
          </div>
          <button className="mt-6 px-8 py-3 bg-primary text-background rounded-full font-semibold hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105">
            Show On Map
          </button>
        </div>
      </div>
    </div>
  );
}
