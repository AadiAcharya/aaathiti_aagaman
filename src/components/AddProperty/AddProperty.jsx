import React from 'react';

const Step1PropertyType = () => {
  return (
    <div className="min-h-screen bg-white flex items-start justify-center p-6 pt-20">
      <div className="w-full max-w-4xl">
        {/* Question */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          What kind of place will you host?
        </h1>

        {/* Property Type Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {/* Card 1 - Apartment */}
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 hover:border-gray-900 cursor-pointer transition-colors">
            <div className="w-16 h-16 bg-gray-300 rounded-lg mb-3"></div>
            <h3 className="text-sm font-medium text-gray-900">Apartment</h3>
          </div>

          {/* Card 2 - Flat */}
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 hover:border-gray-900 cursor-pointer transition-colors">
            <div className="w-16 h-16 bg-gray-300 rounded-lg mb-3"></div>
            <h3 className="text-sm font-medium text-gray-900">Flat</h3>
          </div>

          {/* Card 3 - Room */}
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 hover:border-gray-900 cursor-pointer transition-colors">
            <div className="w-16 h-16 bg-gray-300 rounded-lg mb-3"></div>
            <h3 className="text-sm font-medium text-gray-900">Room</h3>
          </div>

          {/* Card 4 - Villa */}
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 hover:border-gray-900 cursor-pointer transition-colors">
            <div className="w-16 h-16 bg-gray-300 rounded-lg mb-3"></div>
            <h3 className="text-sm font-medium text-gray-900">Villa</h3>
          </div>
        </div>

        {/* Next Button */}
        <div>
          <button className="px-8 py-2 text-white bg-gray-500 rounded-full hover:bg-gray-600 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1PropertyType;