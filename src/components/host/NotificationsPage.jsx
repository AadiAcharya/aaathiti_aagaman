import React from 'react';

const NotificationsPage = () => {
  const notifications = [
    { id: 1, title: '🔔 New Reservation Alert', date: '12 Nov 2021' },
    { id: 2, title: '📱 Connect to your Facebook account', date: '12 Nov 2021' },
    { id: 3, title: '❌ You have rejected the reservation', date: '12 Nov 2021' },
    { id: 4, title: '⚠️ John Doe cancelled the reservations', date: '12 Nov 2021' },
  ];

  return (
    <div>
      <div className="bg-bg-secondary rounded-xl border border-text-muted/20 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-bg-secondary to-bg-secondary/70 border-b border-text-muted/20">
          <h2 className="text-xl font-bold text-text-primary">🔔 All Notifications</h2>
        </div>

        {/* Notifications List */}
        <div className="divide-y divide-text-muted/10">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start justify-between p-6 hover:bg-primary/10 transition border-b border-text-muted/10 last:border-b-0">
              <div className="flex-1">
                <h3 className="text-sm font-bold text-text-primary mb-2">
                  {notification.title}
                </h3>
                <p className="text-xs text-text-muted">📅 {notification.date}</p>
              </div>
              <button className="text-text-muted hover:text-primary hover:bg-primary/20 p-2 rounded-lg transition ml-4 flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
