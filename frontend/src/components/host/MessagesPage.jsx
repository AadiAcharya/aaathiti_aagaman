import React, { useState } from 'react';

const MessagesPage = () => {
  const [selectedMessage, setSelectedMessage] = useState(0);

  const messages = [
    { id: 1, name: '👤 John Doberman', date: 'Jun 12 Nov 2021' },
    { id: 2, name: '👤 Sarah Smith', date: 'Jun 11 Nov 2021' },
    { id: 3, name: '👤 Mike Johnson', date: 'Jun 10 Nov 2021' },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
        {/* Left Sidebar - Messages List */}
        <div className="lg:col-span-1 bg-bg-secondary rounded-xl border border-text-muted/20 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-text-muted/20 bg-gradient-to-r from-bg-secondary to-bg-secondary/70">
            <h2 className="text-xl font-bold text-text-primary">💬 All Messages</h2>
          </div>

          {/* Messages List */}
          <div className="overflow-y-auto flex-1">
            {messages.map((msg, idx) => (
              <div
                key={msg.id}
                onClick={() => setSelectedMessage(idx)}
                className={`flex items-center gap-3 p-4 cursor-pointer border-b border-text-muted/10 transition ${
                  selectedMessage === idx
                    ? 'bg-primary/20 border-primary'
                    : 'hover:bg-bg-secondary/50'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-primary/30 flex-shrink-0 flex items-center justify-center border border-primary/20 text-lg">👤</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-text-primary">{msg.name}</h3>
                  <p className="text-xs text-text-muted">{msg.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Message Body */}
        <div className="lg:col-span-2 bg-bg-secondary rounded-xl border border-text-muted/20 flex flex-col">
          {/* Message Display Area */}
          <div className="flex-1 flex items-center justify-center p-8 border-b border-text-muted/20">
            <div className="text-center">
              <p className="text-5xl mb-4">💬</p>
              <h2 className="text-2xl font-bold text-text-primary mb-2">Message Body</h2>
              <p className="text-text-muted">Select a message to view</p>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4">
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-bg-secondary border border-text-muted/30 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="w-11 h-11 rounded-full bg-primary hover:bg-primary-hover flex items-center justify-center flex-shrink-0 transition">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
