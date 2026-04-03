import React from 'react';

const MessagesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[600px]">
          {/* Left Sidebar - Messages List */}
          <div className="lg:col-span-1 bg-white rounded-lg border border-gray-300 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">All Messages</h2>
            </div>

            {/* Messages List */}
            <div className="overflow-y-auto">
              {/* Message Item 1 */}
              <div className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gray-400 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900">John Doberman</h3>
                  <p className="text-xs text-gray-500">Jun 12 Nov 2021</p>
                </div>
              </div>

              {/* Message Item 2 */}
              <div className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gray-400 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900">John Doberman</h3>
                  <p className="text-xs text-gray-500">Jun 12 Nov 2021</p>
                </div>
              </div>

              {/* Message Item 3 */}
              <div className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gray-400 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900">John Doberman</h3>
                  <p className="text-xs text-gray-500">Jun 12 Nov 2021</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Message Body */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-300 flex flex-col">
            {/* Message Display Area */}
            <div className="flex-1 flex items-center justify-center p-8">
              <h2 className="text-4xl font-bold text-gray-200">Message Body</h2>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center flex-shrink-0 hover:bg-gray-500">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;