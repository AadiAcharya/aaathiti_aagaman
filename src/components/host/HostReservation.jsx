import React, { useState } from 'react';

const ReservationsUI = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingReservations = [
    {
      id: 1,
      title: 'Fully Furnished Apartment',
      checkIn: 'Fri 21 Nov 2025',
      duration: 'Long (2 - 5 Years)',
      guests: '2 Adults',
      guestName: 'John Doe'
    },
    {
      id: 2,
      title: 'Double Flat with 3 Rooms',
      checkIn: 'Fri 21 Nov 2025',
      duration: 'Long (2 - 5 Years)',
      guests: '2 Adults',
      guestName: 'Harry Potter'
    }
  ];

  const handleApprove = (title) => {
    alert(`Approved: ${title}`);
  };

  const handleReject = (title) => {
    if (window.confirm(`Are you sure you want to reject "${title}"?`)) {
      alert(`Rejected: ${title}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">
          Reservations
        </h1>

        {/* Tabs */}
        <div className="flex gap-6 border-b-2 border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-3 px-1 text-[15px] font-medium relative transition-colors ${
              activeTab === 'upcoming'
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Upcoming
            {activeTab === 'upcoming' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`pb-3 px-1 text-[15px] font-medium relative transition-colors ${
              activeTab === 'past'
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Past
            {activeTab === 'past' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('rejected')}
            className={`pb-3 px-1 text-[15px] font-medium relative transition-colors ${
              activeTab === 'rejected'
                ? 'text-gray-900'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Rejected
            {activeTab === 'rejected' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'upcoming' && (
          <div className="flex flex-col gap-4">
            {upcomingReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                {/* Property Image Placeholder */}
                <div className="w-20 h-20 bg-gray-400 rounded-md flex-shrink-0" />

                {/* Reservation Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {reservation.title}
                  </h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-1">
                    <span>
                      <span className="font-medium">Check In:</span> {reservation.checkIn}
                    </span>
                    <span>
                      <span className="font-medium">Duration:</span> {reservation.duration}
                    </span>
                    <span>
                      <span className="font-medium">Guests:</span> {reservation.guests}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    By: {reservation.guestName}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 flex-shrink-0">
                  <button
                    onClick={() => handleApprove(reservation.title)}
                    className="px-5 py-2 bg-gray-600 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(reservation.title)}
                    className="px-5 py-2 bg-white text-gray-600 text-sm font-medium border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'past' && (
          <div className="text-center py-16 text-gray-400">
            <p>No past reservations</p>
          </div>
        )}

        {activeTab === 'rejected' && (
          <div className="text-center py-16 text-gray-400">
            <p>No rejected reservations</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationsUI;