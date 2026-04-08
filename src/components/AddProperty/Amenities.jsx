import React from "react";
import { useNavigate } from "react-router-dom";

const Amenities = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-5xl font-bold text-text-primary mb-4">
            Select Amenities
          </h2>
          <p className="text-lg text-text-secondary mb-12">
            Choose all the amenities available at your place
          </p>

          {/* Amenities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* Amenity Card 1 */}
            <div className="bg-bg-secondary border-2 border-text-muted/30 rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                🍳
              </div>
              <h3 className="text-lg font-bold text-text-primary">Kitchen</h3>
            </div>

            {/* Amenity Card 2 */}
            <div className="bg-bg-secondary border-2 border-text-muted/30 rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                🚗
              </div>
              <h3 className="text-lg font-bold text-text-primary">Parking</h3>
            </div>

            {/* Amenity Card 3 */}
            <div className="bg-bg-secondary border-2 border-text-muted/30 rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                🌳
              </div>
              <h3 className="text-lg font-bold text-text-primary">Balcony</h3>
            </div>

            {/* Amenity Card 4 */}
            <div className="bg-bg-secondary border-2 border-text-muted/30 rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                🌺
              </div>
              <h3 className="text-lg font-bold text-text-primary">Garden</h3>
            </div>

            {/* Amenity Card 5 */}
            <div className="bg-bg-secondary border-2 border-text-muted/30 rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                📶
              </div>
              <h3 className="text-lg font-bold text-text-primary">Wi-Fi</h3>
            </div>

            {/* Amenity Card 6 */}
            <div className="bg-bg-secondary border-2 border-text-muted/30 rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                🏊
              </div>
              <h3 className="text-lg font-bold text-text-primary">Pool</h3>
            </div>

            {/* Amenity Card 7 */}
            <div className="bg-bg-secondary border-2 border-text-muted/30 rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                💪
              </div>
              <h3 className="text-lg font-bold text-text-primary">Gym</h3>
            </div>

            {/* Amenity Card 8 */}
            <div className="bg-bg-secondary border-2 border-text-muted/30 rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                🛗
              </div>
              <h3 className="text-lg font-bold text-text-primary">Elevator</h3>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/add-property")}
            className="px-6 py-3 text-text-primary bg-bg-secondary hover:bg-bg-secondary/80 rounded-lg font-bold border-2 border-text-muted/30 transition-all"
          >
            ← Back
          </button>
          <button
            onClick={() => navigate("/description")}
            className="px-6 py-3 text-white bg-primary hover:bg-primary-hover rounded-lg font-bold transition-all"
          >
            Next: Add Description →
          </button>
        </div>
      </main>
    </div>
  );
};

export default Amenities;
