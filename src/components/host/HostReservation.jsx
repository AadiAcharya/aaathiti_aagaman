import React from "react";

const HostReservation = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">
          Reservations
        </h1>

        {/* Hidden radio inputs */}
        <input
          type="radio"
          name="tab"
          id="upcoming"
          className="hidden peer/upcoming"
          defaultChecked
        />
        <input type="radio" name="tab" id="past" className="hidden peer/past" />
        <input
          type="radio"
          name="tab"
          id="rejected"
          className="hidden peer/rejected"
        />

        {/* Tabs */}
        <div className="flex gap-6 border-b-2 border-gray-200 mb-8">
          <label
            htmlFor="upcoming"
            className="cursor-pointer pb-3 text-gray-500 peer-checked/upcoming:text-gray-900 relative"
          >
            Upcoming
          </label>
          <label
            htmlFor="past"
            className="cursor-pointer pb-3 text-gray-500 peer-checked/past:text-gray-900 relative"
          >
            Past
          </label>
          <label
            htmlFor="rejected"
            className="cursor-pointer pb-3 text-gray-500 peer-checked/rejected:text-gray-900 relative"
          >
            Rejected
          </label>
        </div>

        {/* Content */}
        <div>
          {/* Upcoming */}
          <div className="hidden peer-checked/upcoming:block flex flex-col gap-4">
            {/* Card 1 */}
            <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-gray-400 rounded-md flex-shrink-0" />

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  Fully Furnished Apartment
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-1">
                  <span>
                    <span className="font-medium">Check In:</span> Fri 21 Nov
                    2025
                  </span>
                  <span>
                    <span className="font-medium">Duration:</span> Long (2 - 5
                    Years)
                  </span>
                  <span>
                    <span className="font-medium">Guests:</span> 2 Adults
                  </span>
                </div>
                <div className="text-sm text-gray-600">By: John Doe</div>
              </div>

              <div className="flex gap-3 flex-shrink-0">
                <button className="px-5 py-2 bg-gray-600 text-white text-sm font-medium rounded-full">
                  Approve
                </button>
                <button className="px-5 py-2 bg-white text-gray-600 text-sm font-medium border border-gray-300 rounded-full">
                  Reject
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-gray-400 rounded-md flex-shrink-0" />

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  Double Flat with 3 Rooms
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-1">
                  <span>
                    <span className="font-medium">Check In:</span> Fri 21 Nov
                    2025
                  </span>
                  <span>
                    <span className="font-medium">Duration:</span> Long (2 - 5
                    Years)
                  </span>
                  <span>
                    <span className="font-medium">Guests:</span> 2 Adults
                  </span>
                </div>
                <div className="text-sm text-gray-600">By: Harry Potter</div>
              </div>

              <div className="flex gap-3 flex-shrink-0">
                <button className="px-5 py-2 bg-gray-600 text-white text-sm font-medium rounded-full">
                  Approve
                </button>
                <button className="px-5 py-2 bg-white text-gray-600 text-sm font-medium border border-gray-300 rounded-full">
                  Reject
                </button>
              </div>
            </div>
          </div>

          {/* Past */}
          <div className="hidden peer-checked/past:block text-center py-16 text-gray-400">
            <p>No past reservations</p>
          </div>

          {/* Rejected */}
          <div className="hidden peer-checked/rejected:block text-center py-16 text-gray-400">
            <p>No rejected reservations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostReservation;
