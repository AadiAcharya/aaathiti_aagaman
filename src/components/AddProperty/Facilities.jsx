import React from 'react';

const Facilities = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Question */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-12">
          Add facilities available at your place:
        </h1>

        {/* Facilities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {/* Facility Item 1 */}
          <div className="flex items-center gap-3 p-4 bg-white border-2 border-gray-300 rounded-lg hover:border-gray-900 cursor-pointer transition-colors">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
            />
            <span className="text-base text-gray-900">Kitchen</span>
          </div>

          {/* Facility Item 2 */}
          <div className="flex items-center gap-3 p-4 bg-white border-2 border-gray-300 rounded-lg hover:border-gray-900 cursor-pointer transition-colors">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
            />
            <span className="text-base text-gray-900">Parking</span>
          </div>

          {/* Facility Item 3 */}
          <div className="flex items-center gap-3 p-4 bg-white border-2 border-gray-300 rounded-lg hover:border-gray-900 cursor-pointer transition-colors">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
            />
            <span className="text-base text-gray-900">Balcony</span>
          </div>

          {/* Facility Item 4 */}
          <div className="flex items-center gap-3 p-4 bg-white border-2 border-gray-300 rounded-lg hover:border-gray-900 cursor-pointer transition-colors">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
            />
            <span className="text-base text-gray-900">Wi-Fi</span>
          </div>

          {/* Facility Item 5 */}
          <div className="flex items-center gap-3 p-4 bg-white border-2 border-gray-300 rounded-lg hover:border-gray-900 cursor-pointer transition-colors">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
            />
            <span className="text-base text-gray-900">Garden</span>
          </div>

          {/* Facility Item 6 */}
          <div className="flex items-center gap-3 p-4 bg-white border-2 border-gray-300 rounded-lg hover:border-gray-900 cursor-pointer transition-colors">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
            />
            <span className="text-base text-gray-900">Pool</span>
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

export default Facilities;