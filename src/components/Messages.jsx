import { useState } from "react";

// Image assets from Figma
const imgEllipse15 = "https://www.figma.com/api/mcp/asset/b5103802-e8e5-4764-955a-4fa393457ebd";
const imgEllipse18 = "https://www.figma.com/api/mcp/asset/01b0cfc4-eadf-4d2e-bf04-2af6ed45c6ea";

export default function Messages() {
  const [messages] = useState([
    { id: 1, name: "John Doberman", date: "On: 12 Mar 2021", avatar: imgEllipse15 },
    { id: 2, name: "John Doberman", date: "On: 12 Mar 2021", avatar: imgEllipse15 },
    { id: 3, name: "John Doberman", date: "On: 12 Mar 2021", avatar: imgEllipse15 },
  ]);

  const [selectedMessage, setSelectedMessage] = useState(messages[0]);
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log("Message sent:", messageText);
      setMessageText("");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Messages Section */}
      <div className="px-20 py-40 max-w-full">
        <div className="flex gap-0 rounded-3xl overflow-hidden bg-white" style={{ minHeight: "608px" }}>
          
          {/* Messages List */}
          <div className="w-96 bg-gray-100 rounded-l-3xl">
            <div className="px-0">
              {/* All Messages Title */}
              <h2 className="text-2xl font-bold text-gray-700 p-6 pb-4">All Messages</h2>

              {/* Message Items */}
              <div className="space-y-0">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`flex items-center gap-4 px-6 py-5 cursor-pointer transition-colors ${
                      selectedMessage.id === msg.id
                        ? "bg-white border-l-4 border-blue-500"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {/* Avatar */}
                    <img
                      src={msg.avatar}
                      alt={msg.name}
                      className="w-16 h-16 rounded-full object-cover shrink-0"
                    />

                    {/* Message Info */}
                    <div className="min-w-0">
                      <p className="font-bold text-gray-700 truncate">{msg.name}</p>
                      <p className="text-sm text-gray-500">{msg.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Message Body */}
          <div className="flex-1 bg-gray-100 rounded-r-3xl flex flex-col justify-between p-12">
            {/* Message Content Area */}
            <div className="flex items-center justify-center text-gray-300 mb-8">
              <p className="text-6xl font-extrabold">Message Body</p>
            </div>

            {/* Message Input */}
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Type your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 bg-white border border-gray-300 rounded-full px-6 py-4 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-400 hover:bg-gray-500 transition-colors shrink-0"
              >
                <img src={imgEllipse18} alt="Send" className="w-full h-full rounded-full" />
                <svg
                  className="w-6 h-6 text-white absolute"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.894 2.553a.891.891 0 00-1.788 0l-7 40a.891.891 0 001.169 1.034l5.404-2.961 5.404 2.961a.891.891 0 001.169-1.034l-7-40z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
