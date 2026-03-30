// import { useState } from "react";

// // Image assets from Figma
// const imgEllipse15 =
//   "https://www.figma.com/api/mcp/asset/b5103802-e8e5-4764-955a-4fa393457ebd";
// const imgEllipse18 =
//   "https://www.figma.com/api/mcp/asset/01b0cfc4-eadf-4d2e-bf04-2af6ed45c6ea";

// export default function Messages() {
//   const [messages] = useState([
//     {
//       id: 1,
//       name: "John Doberman",
//       date: "On: 12 Mar 2021",
//       avatar: imgEllipse15,
//     },
//     {
//       id: 2,
//       name: "John Doberman",
//       date: "On: 12 Mar 2021",
//       avatar: imgEllipse15,
//     },
//     {
//       id: 3,
//       name: "John Doberman",
//       date: "On: 12 Mar 2021",
//       avatar: imgEllipse15,
//     },
//   ]);

//   const [selectedMessage, setSelectedMessage] = useState(messages[0]);
//   const [messageText, setMessageText] = useState("");

//   const handleSendMessage = () => {
//     if (messageText.trim()) {
//       console.log("Message sent:", messageText);
//       setMessageText("");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Messages Section */}
//       <div className="px-20 py-40 max-w-full">
//         <div
//           className="flex gap-0 rounded-3xl overflow-hidden"
//           style={{ minHeight: "608px" }}
//         >
//           {/* Messages List */}
//           <div className="w-96 rounded-l-3xl bg-bg-secondary">
//             <div className="px-0">
//               {/* All Messages Title */}
//               <h2 className="text-2xl font-bold p-6 pb-4 text-text-primary">
//                 All Messages
//               </h2>

//               {/* Message Items */}
//               <div className="space-y-0">
//                 {messages.map((msg) => (
//                   <div
//                     key={msg.id}
//                     onClick={() => setSelectedMessage(msg)}
//                     className={`flex items-center gap-4 px-6 py-5 cursor-pointer transition-colors ${
//                       selectedMessage.id === msg.id
//                         ? "border-l-4"
//                         : "hover:opacity-80"
//                     }`}
//                     style={{
//                       backgroundColor:
//                         selectedMessage.id === msg.id
//                           ? "var(--color-bg-secondary)"
//                           : "transparent",
//                       borderLeftColor:
//                         selectedMessage.id === msg.id
//                           ? "var(--color-primary)"
//                           : "transparent",
//                     }}
//                   >
//                     {/* Avatar */}
//                     <img
//                       src={msg.avatar}
//                       alt={msg.name}
//                       className="w-16 h-16 rounded-full object-cover shrink-0"
//                     />

//                     {/* Message Info */}
//                     <div className="min-w-0">
//                       <p className="font-bold truncate text-text-primary">
//                         {msg.name}
//                       </p>
//                       <p className="text-sm text-text-secondary">{msg.date}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Message Body */}
//           <div className="flex-1 rounded-r-3xl flex flex-col justify-between p-12 bg-bg-secondary">
//             {/* Message Content Area */}
//             <div className="flex items-center justify-center mb-8">
//               <p className="text-6xl font-extrabold text-text-muted">
//                 Message Body
//               </p>
//             </div>

//             {/* Message Input */}
//             <div className="flex items-center gap-4">
//               <input
//                 type="text"
//                 placeholder="Type your message..."
//                 value={messageText}
//                 onChange={(e) => setMessageText(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 className="flex-1 border border-primary/30 rounded-full px-6 py-4 bg-background text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary transition-all"
//               />

//               {/* Send Button */}
//               <button
//                 onClick={handleSendMessage}
//                 className="flex items-center justify-center w-12 h-12 rounded-full shrink-0 relative overflow-hidden bg-primary"
//               >
//                 <img
//                   src={imgEllipse18}
//                   alt="Send"
//                   className="w-full h-full rounded-full"
//                 />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



export default function Messages() {
  const conversations = [
    {
      id: 1,
      name: "John Smith",
      property: "Modern Downtown Apartment",
      lastMessage: "Is the property still available for next weekend?",
      time: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      property: "Cozy Beach House",
      lastMessage: "Thank you! Looking forward to my stay.",
      time: "5 hours ago",
      unread: false,
    },
    {
      id: 3,
      name: "Mike Wilson",
      property: "Mountain View Cabin",
      lastMessage: "Can I bring my pet?",
      time: "1 day ago",
      unread: true,
    },
    {
      id: 4,
      name: "Emily Davis",
      property: "Modern Downtown Apartment",
      lastMessage: "The photos look amazing!",
      time: "2 days ago",
      unread: false,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-text-primary mb-4">
            Messages
          </h1>
          <p className="text-text-secondary text-lg">
            Communicate with your guests
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <div className="bg-bg-secondary rounded-lg border border-primary/10 overflow-hidden">
              <div className="p-4 border-b border-primary/10">
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full px-4 py-2 bg-background border border-text-muted/30 rounded-lg focus:outline-none focus:border-primary text-text-primary"
                />
              </div>
              <div className="divide-y divide-primary/10">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 cursor-pointer hover:bg-background transition ${
                      conversation.unread ? "bg-primary/5" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold">
                          {conversation.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-bold text-text-primary truncate">
                            {conversation.name}
                          </p>
                          <span className="text-xs text-text-secondary flex-shrink-0 ml-2">
                            {conversation.time}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary mb-1 truncate">
                          {conversation.property}
                        </p>
                        <p
                          className={`text-sm truncate ${
                            conversation.unread
                              ? "text-text-primary font-semibold"
                              : "text-text-secondary"
                          }`}
                        >
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2">
            <div className="bg-bg-secondary rounded-lg border border-primary/10 h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-primary/10 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">J</span>
                  </div>
                  <div>
                    <p className="font-bold text-text-primary">John Smith</p>
                    <p className="text-sm text-text-secondary">
                      Modern Downtown Apartment
                    </p>
                  </div>
                </div>
                <button className="text-text-secondary hover:text-text-primary">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {/* Received Message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm font-bold">J</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-background rounded-lg rounded-tl-none p-4 inline-block max-w-md">
                      <p className="text-text-primary">
                        Hi! I'm interested in booking your property for next
                        weekend. Is it still available?
                      </p>
                    </div>
                    <p className="text-xs text-text-secondary mt-1">
                      2 hours ago
                    </p>
                  </div>
                </div>

                {/* Sent Message */}
                <div className="flex gap-3 justify-end">
                  <div className="flex-1 text-right">
                    <div className="bg-primary rounded-lg rounded-tr-none p-4 inline-block max-w-md">
                      <p className="text-white">
                        Hello John! Yes, the property is available. I'd be happy
                        to host you. Would you like to proceed with the booking?
                      </p>
                    </div>
                    <p className="text-xs text-text-secondary mt-1">
                      1 hour ago
                    </p>
                  </div>
                </div>

                {/* Received Message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm font-bold">J</span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-background rounded-lg rounded-tl-none p-4 inline-block max-w-md">
                      <p className="text-text-primary">
                        Perfect! I'll book it now. One more question - is parking
                        included?
                      </p>
                    </div>
                    <p className="text-xs text-text-secondary mt-1">
                      30 minutes ago
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-primary/10">
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 bg-background border border-text-muted/30 rounded-lg focus:outline-none focus:border-primary text-text-primary"
                  />
                  <button className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-semibold transition">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}