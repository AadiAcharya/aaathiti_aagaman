import React from 'react';

const Amenities = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        {/* Question */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-12">
          Add amenities available at your place:
        </h1>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {/* Amenity Card 1 */}
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 hover:border-gray-900 cursor-pointer transition-colors">
            <div className="w-16 h-16 bg-gray-300 rounded-lg mb-3"></div>
            <h3 className="text-sm font-medium text-gray-900">Kitchen</h3>
          </div>

          {/* Amenity Card 2 */}
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 hover:border-gray-900 cursor-pointer transition-colors">
            <div className="w-16 h-16 bg-gray-300 rounded-lg mb-3"></div>
            <h3 className="text-sm font-medium text-gray-900">Parking</h3>
          </div>

          {/* Amenity Card 3 */}
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 hover:border-gray-900 cursor-pointer transition-colors">
            <div className="w-16 h-16 bg-gray-300 rounded-lg mb-3"></div>
            <h3 className="text-sm font-medium text-gray-900">Balcony</h3>
          </div>

          {/* Amenity Card 4 */}
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 hover:border-gray-900 cursor-pointer transition-colors">
            <div className="w-16 h-16 bg-gray-300 rounded-lg mb-3"></div>
            <h3 className="text-sm font-medium text-gray-900">Garden</h3>
          </div>

          {/* Amenity Card 5 */}
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 hover:border-gray-900 cursor-pointer transition-colors">
            <div className="w-16 h-16 bg-gray-300 rounded-lg mb-3"></div>
            <h3 className="text-sm font-medium text-gray-900">Wi-Fi</h3>
          </div>

          {/* Amenity Card 6 */}
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 hover:border-gray-900 cursor-pointer transition-colors">
            <div className="w-16 h-16 bg-gray-300 rounded-lg mb-3"></div>
            <h3 className="text-sm font-medium text-gray-900">Pool</h3>
          </div>

          {/* Amenity Card 7 */}
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 hover:border-gray-900 cursor-pointer transition-colors">
            <div className="w-16 h-16 bg-gray-300 rounded-lg mb-3"></div>
            <h3 className="text-sm font-medium text-gray-900">Gym</h3>
          </div>

          {/* Amenity Card 8 */}
          <div className="bg-white border-2 border-gray-300 rounded-lg p-4 hover:border-gray-900 cursor-pointer transition-colors">
            <div className="w-16 h-16 bg-gray-300 rounded-lg mb-3"></div>
            <h3 className="text-sm font-medium text-gray-900">Elevator</h3>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button className="px-6 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
            Back
          </button>
          <button className="px-6 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Amenities;