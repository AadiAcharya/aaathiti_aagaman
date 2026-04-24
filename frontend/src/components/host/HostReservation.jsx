import React, { useState } from 'react';

const ReservationsUI = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const reservations = [
    { id: 1, title: '🏢 Fully Furnished Apartment', user: 'John Doe' },
    { id: 2, title: '🏠 Double Flat with 3 Rooms', user: 'Harry Potter' },
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-6 border-b border-text-muted/20 mb-8">
        {['upcoming', 'past', 'rejected'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-1 text-[15px] font-medium relative transition ${
              activeTab === tab
                ? 'text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      {/* Reservation Cards */}
      <div className="flex flex-col gap-4">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="flex items-center gap-4 p-6 bg-bg-secondary border border-text-muted/20 rounded-xl hover:border-primary/50 hover:shadow-lg transition-all">
            {/* Property Image */}
            <div className="w-24 h-24 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg flex-shrink-0 flex items-center justify-center border border-primary/20 text-3xl">
              🏠
            </div>

            {/* Reservation Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-text-primary mb-2">
                {reservation.title}
              </h3>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-text-secondary mb-2">
                <span>📅 <span className="font-medium">Check In:</span> Fri 21 Nov 2025</span>
                <span>⏱️ <span className="font-medium">Duration:</span> Long (2 - 5 Years)</span>
                <span>👥 <span className="font-medium">Guests:</span> 2 Adults</span>
              </div>
              <div className="text-sm text-text-muted">👤 By: {reservation.user}</div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-shrink-0">
              <button className="px-6 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-full transition-all">
                ✓ Approve
              </button>
              <button className="px-6 py-2 bg-bg-secondary border-2 border-text-muted/30 text-text-primary hover:border-primary text-sm font-bold rounded-full transition-all">
                ✕ Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationsUI;
