import React from 'react';

const ReservationsUI = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">
          Reservations
        </h1>

        {/* Tabs */}
        <div className="flex gap-6 border-b-2 border-gray-200 mb-8">
          <button className="pb-3 px-1 text-[15px] font-medium relative text-gray-900">
            Upcoming
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
          </button>
          <button className="pb-3 px-1 text-[15px] font-medium text-gray-500 hover:text-gray-900">
            Past
          </button>
          <button className="pb-3 px-1 text-[15px] font-medium text-gray-500 hover:text-gray-900">
            Rejected
          </button>
        </div>

        {/* Reservation Cards */}
        <div className="flex flex-col gap-4">
          {/* Card 1 */}
          <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            {/* Property Image Placeholder */}
            <div className="w-20 h-20 bg-gray-400 rounded-md flex-shrink-0" />

            {/* Reservation Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Fully Furnished Apartment
              </h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-1">
                <span>
                  <span className="font-medium">Check In:</span> Fri 21 Nov 2025
                </span>
                <span>
                  <span className="font-medium">Duration:</span> Long (2 - 5 Years)
                </span>
                <span>
                  <span className="font-medium">Guests:</span> 2 Adults
                </span>
              </div>
              <div className="text-sm text-gray-600">
                By: John Doe
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-shrink-0">
              <button className="px-5 py-2 bg-gray-600 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors">
                Approve
              </button>
              <button className="px-5 py-2 bg-white text-gray-600 text-sm font-medium border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                Reject
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            {/* Property Image Placeholder */}
            <div className="w-20 h-20 bg-gray-400 rounded-md flex-shrink-0" />

            {/* Reservation Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Double Flat with 3 Rooms
              </h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-1">
                <span>
                  <span className="font-medium">Check In:</span> Fri 21 Nov 2025
                </span>
                <span>
                  <span className="font-medium">Duration:</span> Long (2 - 5 Years)
                </span>
                <span>
                  <span className="font-medium">Guests:</span> 2 Adults
                </span>
              </div>
              <div className="text-sm text-gray-600">
                By: Harry Potter
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-shrink-0">
              <button className="px-5 py-2 bg-gray-600 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors">
                Approve
              </button>
              <button className="px-5 py-2 bg-white text-gray-600 text-sm font-medium border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationsUI;