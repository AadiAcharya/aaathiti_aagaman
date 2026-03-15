import { useState } from "react";

// Image assets from Figma
const imgEllipse15 =
  "https://www.figma.com/api/mcp/asset/b5103802-e8e5-4764-955a-4fa393457ebd";
const imgEllipse18 =
  "https://www.figma.com/api/mcp/asset/01b0cfc4-eadf-4d2e-bf04-2af6ed45c6ea";

export default function Messages() {
  const [messages] = useState([
    {
      id: 1,
      name: "John Doberman",
      date: "On: 12 Mar 2021",
      avatar: imgEllipse15,
    },
    {
      id: 2,
      name: "John Doberman",
      date: "On: 12 Mar 2021",
      avatar: imgEllipse15,
    },
    {
      id: 3,
      name: "John Doberman",
      date: "On: 12 Mar 2021",
      avatar: imgEllipse15,
    },
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
    <div className="min-h-screen" style={{ backgroundColor: "#eff0f2" }}>
      {/* Messages Section */}
      <div className="px-20 py-40 max-w-full">
        <div
          className="flex gap-0 rounded-3xl overflow-hidden"
          style={{ minHeight: "608px" }}
        >
          {/* Messages List */}
          <div
            className="w-96 rounded-l-3xl"
            style={{ backgroundColor: "#eff0f2" }}
          >
            <div className="px-0">
              {/* All Messages Title */}
              <h2
                className="text-2xl font-bold p-6 pb-4"
                style={{ color: "#484848" }}
              >
                All Messages
              </h2>

              {/* Message Items */}
              <div className="space-y-0">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedMessage(msg)}
                    className={`flex items-center gap-4 px-6 py-5 cursor-pointer transition-colors ${
                      selectedMessage.id === msg.id
                        ? "border-l-4"
                        : "hover:opacity-80"
                    }`}
                    style={{
                      backgroundColor:
                        selectedMessage.id === msg.id
                          ? "#ffffff"
                          : "transparent",
                      borderLeftColor:
                        selectedMessage.id === msg.id
                          ? "#484848"
                          : "transparent",
                    }}
                  >
                    {/* Avatar */}
                    <img
                      src={msg.avatar}
                      alt={msg.name}
                      className="w-16 h-16 rounded-full object-cover shrink-0"
                    />

                    {/* Message Info */}
                    <div className="min-w-0">
                      <p
                        className="font-bold truncate"
                        style={{ color: "#484848" }}
                      >
                        {msg.name}
                      </p>
                      <p className="text-sm" style={{ color: "#9a9a9a" }}>
                        {msg.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Message Body */}
          <div
            className="flex-1 rounded-r-3xl flex flex-col justify-between p-12"
            style={{ backgroundColor: "#eff0f2" }}
          >
            {/* Message Content Area */}
            <div className="flex items-center justify-center mb-8">
              <p
                className="text-6xl font-extrabold"
                style={{ color: "#e0e2e6" }}
              >
                Message Body
              </p>
            </div>

            {/* Message Input */}
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Type your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 border rounded-full px-6 py-4 focus:outline-none transition-all"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#e8eaec",
                  color: "#484848",
                }}
              />

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                className="flex items-center justify-center w-12 h-12 rounded-full shrink-0 relative overflow-hidden"
                style={{ backgroundColor: "#eff0f2" }}
              >
                <img
                  src={imgEllipse18}
                  alt="Send"
                  className="w-full h-full rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
