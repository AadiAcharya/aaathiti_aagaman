import React from 'react';

const NotificationsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-gray-100 border-b border-gray-300">
            <h2 className="text-lg font-semibold text-gray-900">All Notifications</h2>
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-gray-200">
            {/* Notification Item 1 */}
            <div className="flex items-start justify-between p-4 hover:bg-gray-50">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  New Reservation Alert
                </h3>
                <p className="text-xs text-gray-500">12 Nov 2021</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 ml-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Notification Item 2 */}
            <div className="flex items-start justify-between p-4 hover:bg-gray-50">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Connect to your Facebook account.
                </h3>
                <p className="text-xs text-gray-500">12 Nov 2021</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 ml-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Notification Item 3 */}
            <div className="flex items-start justify-between p-4 hover:bg-gray-50">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  You have rejected the reservation.
                </h3>
                <p className="text-xs text-gray-500">12 Nov 2021</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 ml-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Notification Item 4 */}
            <div className="flex items-start justify-between p-4 hover:bg-gray-50">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  John Doe cancelled the reservations.
                </h3>
                <p className="text-xs text-gray-500">12 Nov 2021</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600 ml-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;