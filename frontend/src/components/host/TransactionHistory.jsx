import React, { useState } from 'react';

const TransactionHistory = () => {
  const [activeTab, setActiveTab] = useState('completed');

  const transactions = [
    { id: 1, title: '💰 Booking Payment', date: '15 Nov 2021 at 2:00 PM', amount: '$1000' },
    { id: 2, title: '💰 Monthly Payout', date: '14 Nov 2021 at 10:30 AM', amount: '$2500' },
  ];

  return (
    <div>
      {/* Header with Tabs and Download Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <h1 className="text-3xl font-bold text-text-primary">💳 Transaction History</h1>
          
          {/* Tabs */}
          <div className="flex gap-2 flex-wrap">
            {['completed', 'upcoming', 'earning'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition ${
                  activeTab === tab
                    ? 'bg-primary text-white'
                    : 'bg-bg-secondary text-text-secondary hover:text-text-primary border border-text-muted/30'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Download Button */}
        <button className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-lg transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          📥 Download
        </button>
      </div>

      {/* Transaction Cards */}
      <div className="flex flex-col gap-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-6 bg-bg-secondary border border-text-muted/20 rounded-xl hover:border-primary/50 hover:shadow-lg transition">
            <div>
              <h3 className="text-lg font-bold text-text-primary mb-2">
                {transaction.title}
              </h3>
              <p className="text-sm text-text-muted">📅 {transaction.date}</p>
            </div>
            <div className="text-2xl font-bold text-primary">
              {transaction.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
