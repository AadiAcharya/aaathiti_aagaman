import React from 'react';

const Step2Description = () => {
  return (
    <div className="min-h-screen bg-white flex items-start justify-center p-6 pt-20">
      <div className="w-full max-w-4xl">
        {/* Question */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Add a short description of your place.
        </h1>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {/* Option 1 - Rental unit */}
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 hover:border-gray-900 cursor-pointer transition-colors">
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="unitType"
                className="w-5 h-5 mt-1 text-gray-900 focus:ring-gray-900"
              />
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Rental unit
                </h3>
                <p className="text-sm text-gray-600">
                  A standalone unit in a multiunit residential building or complex.
                </p>
              </div>
            </div>
          </div>

          {/* Option 2 - Shared unit */}
          <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 hover:border-gray-900 cursor-pointer transition-colors">
            <div className="flex items-start gap-3">
              <input
                type="radio"
                name="unitType"
                className="w-5 h-5 mt-1 text-gray-900 focus:ring-gray-900"
              />
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  Shared unit
                </h3>
                <p className="text-sm text-gray-600">
                  A shared room within a multiunit residential building or complex.
                </p>
              </div>
            </div>
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

export default Step2Description;