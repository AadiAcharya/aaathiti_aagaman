import { useState, useEffect, useRef } from "react";
import { hostAPI } from "../../services/api";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { MessageCircle, Inbox } from "lucide-react";

export default function MessagesPage() {
  const { theme } = useTheme();
  const { user: currentUser } = useAuth();
  const [messages, setMessages]           = useState([]);
  const [threads, setThreads]             = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [newMessage, setNewMessage]       = useState("");
  const [loading, setLoading]             = useState(true);
  const [sending, setSending]             = useState(false);
  const [error, setError]                 = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const { messages: data } = await hostAPI.getMessages();
        setMessages(data);

        // Group by threadId (sender)
        const threadMap = {};
        data.forEach((msg) => {
          const key = msg.sender?._id || msg.sender;
          if (!threadMap[key]) {
            threadMap[key] = { senderId: key, sender: msg.sender, messages: [] };
          }
          threadMap[key].messages.push(msg);
        });
        const threadList = Object.values(threadMap);
        setThreads(threadList);
        if (threadList.length > 0) setSelectedThread(0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedThread, messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || selectedThread === null) return;
    const thread = threads[selectedThread];
    try {
      setSending(true);
      const { message } = await hostAPI.sendMessage({
        recipientId: thread.senderId,
        content:     newMessage.trim(),
      });
      // Append to thread locally
      setThreads((prev) =>
        prev.map((t, i) =>
          i === selectedThread ? { ...t, messages: [...t.messages, message] } : t
        )
      );
      setNewMessage("");
    } catch (err) {
      alert(err.message);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) =>
    new Date(date).toLocaleString("en-US", {
      month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  const currentThread = selectedThread !== null ? threads[selectedThread] : null;

  return (
    <div>
      <div>
        <div className="mb-8">
          <h1
            className={`text-2xl font-bold mb-2 ${
              theme === "dark" ? "text-text-primary" : "text-gray-900"
            }`}
          >
            Messages
          </h1>
          <p className={theme === "dark" ? "text-text-secondary" : "text-gray-600"}>
            Communicate with your guests
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
          </div>
        )}

        {error && <div className="text-center py-16 text-red-500">{error}</div>}

        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">

            {/* Left: Thread List */}
            <div
              className={`lg:col-span-1 rounded-xl border overflow-hidden flex flex-col ${
                theme === "dark"
                  ? "bg-bg-secondary border-text-muted/20"
                  : "bg-white border-gray-200"
              }`}
            >
              <div
                className={`p-6 border-b ${
                  theme === "dark"
                    ? "border-text-muted/20 bg-gradient-to-r from-bg-secondary to-bg-secondary/70"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <h2
                  className={`text-xl font-bold flex items-center gap-2 ${
                    theme === "dark" ? "text-text-primary" : "text-gray-900"
                  }`}
                >
                  <MessageCircle className="w-5 h-5" /> All Messages
                </h2>
              </div>

              {threads.length === 0 ? (
                <div
                  className={`flex-1 flex items-center justify-center ${
                    theme === "dark" ? "text-text-secondary" : "text-gray-600"
                  }`}
                >
                  <div className="text-center">
                    <Inbox className="w-8 h-8 mx-auto mb-2" />
                    <p>No messages yet</p>
                  </div>
                </div>
              ) : (
                <div className="overflow-y-auto flex-1">
                  {threads.map((thread, idx) => {
                    const last = thread.messages[thread.messages.length - 1];
                    const unread = thread.messages.filter((m) => !m.isRead).length;
                    return (
                      <div
                        key={thread.senderId}
                        onClick={() => setSelectedThread(idx)}
                        className={`flex items-center gap-3 p-4 cursor-pointer border-b transition ${
                          theme === "dark" ? "border-text-muted/10" : "border-gray-100"
                        } ${
                          selectedThread === idx
                            ? "bg-primary/20 border-l-2 border-l-primary"
                            : theme === "dark"
                              ? "hover:bg-bg-secondary/50"
                              : "hover:bg-gray-50"
                        }`}
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/30 flex-shrink-0 flex items-center justify-center border border-primary/20 font-bold text-primary">
                          {thread.sender?.name?.[0]?.toUpperCase() || "?"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h3
                              className={`text-sm font-bold truncate ${
                                theme === "dark" ? "text-text-primary" : "text-gray-900"
                              }`}
                            >
                              {thread.sender?.name || "Guest"}
                            </h3>
                            {unread > 0 && (
                              <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center flex-shrink-0">
                                {unread}
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-xs truncate ${
                              theme === "dark" ? "text-text-muted" : "text-gray-500"
                            }`}
                          >
                            {last?.content}
                          </p>
                          <p className={`text-xs ${theme === "dark" ? "text-text-muted" : "text-gray-500"}`}>
                            {formatTime(last?.createdAt)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right: Chat Window */}
            <div
              className={`lg:col-span-2 rounded-xl border flex flex-col ${
                theme === "dark"
                  ? "bg-bg-secondary border-text-muted/20"
                  : "bg-white border-gray-200"
              }`}
            >

              {/* Chat Header */}
              {currentThread ? (
                <div
                  className={`p-4 border-b flex items-center gap-3 ${
                    theme === "dark" ? "border-text-muted/20" : "border-gray-200"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center font-bold text-primary">
                    {currentThread.sender?.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <h3 className={`font-bold ${theme === "dark" ? "text-text-primary" : "text-gray-900"}`}>
                      {currentThread.sender?.name || "Guest"}
                    </h3>
                    <p className={`text-xs ${theme === "dark" ? "text-text-muted" : "text-gray-500"}`}>
                      {currentThread.sender?.email}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  className={`p-4 border-b ${
                    theme === "dark" ? "border-text-muted/20" : "border-gray-200"
                  }`}
                >
                  <h3 className={`font-bold ${theme === "dark" ? "text-text-primary" : "text-gray-900"}`}>
                    Select a conversation
                  </h3>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {!currentThread ? (
                  <div
                    className={`h-full flex items-center justify-center text-center ${
                      theme === "dark" ? "text-text-secondary" : "text-gray-600"
                    }`}
                  >
                    <div>
                      <MessageCircle className="w-12 h-12 mx-auto mb-4" />
                      <p className="text-xl">Select a message to view</p>
                    </div>
                  </div>
                ) : (
                  currentThread.messages.map((msg, i) => {
                    const me = currentUser?._id === (msg.sender?._id || msg.sender);
                    return (
                      <div key={i} className={`flex ${me ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl text-sm ${
                          me
                            ? "bg-primary text-white rounded-br-none"
                            : theme === "dark"
                              ? "bg-background text-text-primary border border-primary/10 rounded-bl-none"
                              : "bg-white text-gray-900 border border-primary/10 rounded-bl-none"
                        }`}>
                          <p>{msg.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              me ? "text-white/70" : theme === "dark" ? "text-text-muted" : "text-gray-500"
                            }`}
                          >
                            {formatTime(msg.createdAt)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div
                className={`p-4 border-t ${
                  theme === "dark" ? "border-text-muted/20" : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={!currentThread || sending}
                    placeholder={currentThread ? "Type your message... (Enter to send)" : "Select a conversation first"}
                    className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 ${
                      theme === "dark"
                        ? "bg-background border-text-muted/30 text-text-primary placeholder-text-muted"
                        : "bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500"
                    }`}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!currentThread || !newMessage.trim() || sending}
                    className="w-11 h-11 rounded-full bg-primary hover:bg-primary-hover flex items-center justify-center flex-shrink-0 transition disabled:opacity-50"
                  >
                    {sending ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
