import React from 'react';

const TransactionHistory = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-300 p-6">
        {/* Header with Tabs and Download Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Transaction History
            </h1>
            
            {/* Tabs */}
            <div className="flex gap-2">
              <button className="px-4 py-1.5 text-sm font-medium text-gray-900 bg-white border border-gray-900 rounded">
                Completed
              </button>
              <button className="px-4 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded hover:border-gray-400">
                Upcoming
              </button>
              <button className="px-4 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded hover:border-gray-400">
                Gross Earning
              </button>
            </div>
          </div>

          {/* Download Button */}
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
        </div>

        {/* Transaction Cards */}
        <div className="flex flex-col gap-3">
          {/* Transaction Card 1 */}
          <div className="flex items-center justify-between p-4 border border-dashed border-gray-300 rounded">
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Transaction Title
              </h3>
              <p className="text-sm text-gray-500">
                15 Nov 2021 at 2:00 PM
              </p>
            </div>
            <div className="text-lg font-semibold text-gray-900">
              $ 1000 USD
            </div>
          </div>

          {/* Transaction Card 2 */}
          <div className="flex items-center justify-between p-4 border border-dashed border-gray-300 rounded">
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Transaction Title
              </h3>
              <p className="text-sm text-gray-500">
                15 Nov 2021 at 2:00 PM
              </p>
            </div>
            <div className="text-lg font-semibold text-gray-900">
              $ 1000 USD
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;