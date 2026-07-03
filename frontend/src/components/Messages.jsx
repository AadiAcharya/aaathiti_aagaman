import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { messageAPI } from "../services/api";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { MessageCircle, Inbox, Home as HomeIcon, ArrowLeft, User } from "lucide-react";

// Avatar for a conversation - a room's photo when the conversation is about a
// room (so guests/hosts can spot the right chat at a glance), else initials.
function ThreadAvatar({ room, fallbackLabel, size = "w-12 h-12" }) {
  if (room?.image) {
    return (
      <img
        src={room.image}
        alt={room.title || "Room"}
        className={`${size} rounded-full object-cover flex-shrink-0 border border-primary/20`}
      />
    );
  }
  return (
    <div
      className={`${size} rounded-full bg-primary/30 flex-shrink-0 flex items-center justify-center border border-primary/20 font-bold text-primary`}
    >
      {fallbackLabel?.[0]?.toUpperCase() || "?"}
    </div>
  );
}

export default function Messages({ embedded = false }) {
  const { theme } = useTheme();
  const { user: currentUser, role, isAuthenticated } = useAuth();
  const isHost = role === "host" || role === "admin";
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [threads, setThreads] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  // Deep-link params from a "Message Host" button, e.g. /messages?to=<hostId>&room=<roomId>&roomTitle=...&hostName=...
  const draftTo = searchParams.get("to");
  const draftRoomId = searchParams.get("room");
  const draftRoomTitle = searchParams.get("roomTitle");
  const draftHostName = searchParams.get("hostName");

  useEffect(() => {
    if (!embedded && !isAuthenticated) navigate("/sign-in");
  }, [embedded, isAuthenticated, navigate]);

  // A conversation is the pair (other person, room) - not just the other person.
  // Two people can be discussing several different rooms at once (a guest asking
  // one host about two of their listings, or messaging several hosts), and each
  // of those needs to stay its own thread instead of merging into one.
  const threadKey = (otherId, roomId) => `${otherId}::${roomId || "general"}`;

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const { messages: data } = await messageAPI.getMine();

        const threadMap = {};
        data.forEach((msg) => {
          const senderId = msg.sender?._id || msg.sender;
          const recipientId = msg.recipient?._id || msg.recipient;
          const iAmSender = senderId === currentUser?._id;
          const otherId = iAmSender ? recipientId : senderId;
          const other = iAmSender ? msg.recipient : msg.sender;
          const roomId = msg.room?._id || msg.room || null;
          const key = threadKey(otherId, roomId);
          if (!threadMap[key]) {
            threadMap[key] = { key, otherId, other, room: msg.room || null, messages: [] };
          }
          threadMap[key].messages.push(msg);
        });

        // Self-heal old data: a message can end up without a room reference (e.g. a
        // reply sent before the backend learned to inherit it), which used to split
        // off into its own "general" thread. If this person only has one real
        // room-thread, fold that stray general thread back into it instead of
        // showing the same conversation twice.
        const byOtherId = {};
        Object.values(threadMap).forEach((t) => {
          if (!byOtherId[t.otherId]) byOtherId[t.otherId] = [];
          byOtherId[t.otherId].push(t);
        });
        Object.values(byOtherId).forEach((group) => {
          const generalThread = group.find((t) => !t.room);
          const roomThreads = group.filter((t) => t.room);
          if (generalThread && roomThreads.length === 1) {
            roomThreads[0].messages.push(...generalThread.messages);
            delete threadMap[generalThread.key];
          }
        });

        Object.values(threadMap).forEach((t) =>
          t.messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)),
        );
        let threadList = Object.values(threadMap).sort((a, b) => {
          const aLast = a.messages[a.messages.length - 1]?.createdAt || 0;
          const bLast = b.messages[b.messages.length - 1]?.createdAt || 0;
          return new Date(bLast) - new Date(aLast);
        });

        // If we arrived via a "Message Host" link and there's no existing thread for
        // that host+room yet, add an empty draft thread so the user can start typing.
        const draftKey = draftTo ? threadKey(draftTo, draftRoomId) : null;
        if (draftKey && !threadMap[draftKey]) {
          threadList = [
            {
              key: draftKey,
              otherId: draftTo,
              other: { _id: draftTo, name: draftHostName || "Host" },
              room: draftRoomId ? { _id: draftRoomId, title: draftRoomTitle } : null,
              messages: [],
              isDraft: true,
            },
            ...threadList,
          ];
        }

        setThreads(threadList);
        // Land on the conversation list first, Messenger-style - only jump
        // straight into a chat when we arrived via an explicit "Message Host" link.
        if (draftKey) setSelectedKey(draftKey);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedKey, threads]);

  const currentThread = threads.find((t) => t.key === selectedKey) || null;

  // Clear the unread badge as soon as a conversation is opened.
  useEffect(() => {
    if (!currentThread) return;
    const unreadIds = currentThread.messages
      .filter((m) => !m.isRead && (m.recipient?._id || m.recipient) === currentUser?._id)
      .map((m) => m._id);
    if (unreadIds.length === 0) return;

    unreadIds.forEach((id) => {
      messageAPI.markRead(id).catch(() => {});
    });
    setThreads((prev) =>
      prev.map((t) =>
        t.key !== currentThread.key
          ? t
          : {
              ...t,
              messages: t.messages.map((m) =>
                unreadIds.includes(m._id) ? { ...m, isRead: true } : m,
              ),
            },
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKey]);

  // Room is the headline identity for a conversation; the "other person" only
  // needs calling out for hosts, who juggle many guests asking about the same
  // room and need to know who's who at a glance.
  const threadLabel = (thread) => {
    const title = thread.room?.title || thread.other?.name || "Conversation";
    // Only show a subtitle when it says something the title doesn't already -
    // a host always needs to see which guest this is, but a guest without a
    // room just has the other person's name as the title, so no need to repeat it.
    const subtitle = isHost ? thread.other?.name || null : null;
    return { title, subtitle };
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !currentThread) return;
    try {
      setSending(true);
      const { message } = await messageAPI.send({
        recipientId: currentThread.otherId,
        content: newMessage.trim(),
        roomId: currentThread.room?._id,
      });
      setThreads((prev) =>
        prev.map((t) =>
          t.key === currentThread.key
            ? { ...t, isDraft: false, messages: [...t.messages, message] }
            : t,
        ),
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
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (!embedded && !isAuthenticated) return null;

  const content = (
    <>
      {!embedded && (
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold mb-2 ${
              theme === "dark" ? "text-text-primary" : "text-gray-900"
            }`}
          >
            Messages
          </h1>
          <p className={theme === "dark" ? "text-text-secondary" : "text-gray-600"}>
            Your conversations
          </p>
        </div>
      )}

      {loading && (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
          </div>
        )}

        {error && <div className="text-center py-16 text-red-500">{error}</div>}

        {!loading && !error && (
          <div
            className={`rounded-xl border overflow-hidden flex flex-col h-[600px] ${
              theme === "dark"
                ? "bg-bg-secondary border-text-muted/20"
                : "bg-white border-gray-200"
            }`}
          >
            {!currentThread ? (
              // ── Profile list: pick a conversation, Messenger-style ──────────
              <>
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
                    <MessageCircle className="w-5 h-5" /> Conversations
                  </h2>
                </div>

                {threads.length === 0 ? (
                  <div
                    className={`flex-1 flex items-center justify-center ${
                      theme === "dark" ? "text-text-secondary" : "text-gray-600"
                    }`}
                  >
                    <div className="text-center px-6">
                      <Inbox className="w-8 h-8 mx-auto mb-2" />
                      <p>No messages yet</p>
                      <p className="text-xs mt-1">
                        Visit a room and tap "Message Host" to start a conversation.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="overflow-y-auto flex-1">
                    {threads.map((thread) => {
                      const last = thread.messages[thread.messages.length - 1];
                      const unread = thread.messages.filter(
                        (m) =>
                          !m.isRead &&
                          (m.recipient?._id || m.recipient) === currentUser?._id,
                      ).length;
                      const { title, subtitle } = threadLabel(thread);
                      return (
                        <div
                          key={thread.key}
                          onClick={() => setSelectedKey(thread.key)}
                          className={`flex items-center gap-3 p-4 cursor-pointer border-b transition ${
                            theme === "dark" ? "border-text-muted/10" : "border-gray-100"
                          } ${
                            theme === "dark" ? "hover:bg-bg-secondary/50" : "hover:bg-gray-50"
                          }`}
                        >
                          <ThreadAvatar room={thread.room} fallbackLabel={title} />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <h3
                                className={`text-sm font-bold truncate ${
                                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                                }`}
                              >
                                {title}
                              </h3>
                              {unread > 0 && (
                                <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center flex-shrink-0">
                                  {unread}
                                </span>
                              )}
                            </div>
                            {subtitle && (
                              <p
                                className={`text-xs truncate flex items-center gap-1 ${
                                  theme === "dark" ? "text-primary" : "text-blue-600"
                                }`}
                              >
                                {isHost ? (
                                  <User className="w-3 h-3" />
                                ) : (
                                  <HomeIcon className="w-3 h-3" />
                                )}{" "}
                                {subtitle}
                              </p>
                            )}
                            <p
                              className={`text-xs truncate ${
                                theme === "dark" ? "text-text-muted" : "text-gray-500"
                              }`}
                            >
                              {last?.content || "No messages yet - say hello!"}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              // ── Chat window for the selected conversation ───────────────────
              <>
                <div
                  className={`p-4 border-b flex items-center gap-3 ${
                    theme === "dark" ? "border-text-muted/20" : "border-gray-200"
                  }`}
                >
                  <button
                    onClick={() => setSelectedKey(null)}
                    className={`p-2 -ml-2 rounded-full transition ${
                      theme === "dark" ? "hover:bg-white/10 text-text-primary" : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <ThreadAvatar
                    room={currentThread.room}
                    fallbackLabel={threadLabel(currentThread).title}
                    size="w-10 h-10"
                  />
                  <div>
                    <h3
                      className={`font-bold ${
                        theme === "dark" ? "text-text-primary" : "text-gray-900"
                      }`}
                    >
                      {threadLabel(currentThread).title}
                    </h3>
                    {threadLabel(currentThread).subtitle && (
                      <p className={`text-xs ${theme === "dark" ? "text-text-muted" : "text-gray-500"}`}>
                        {threadLabel(currentThread).subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {currentThread.messages.length === 0 ? (
                    <div
                      className={`h-full flex items-center justify-center text-center ${
                        theme === "dark" ? "text-text-secondary" : "text-gray-600"
                      }`}
                    >
                      <p>Say hello to {currentThread.other?.name || "the host"}!</p>
                    </div>
                  ) : (
                    currentThread.messages.map((msg, i) => {
                      const senderId = msg.sender?._id || msg.sender;
                      const me = currentUser?._id === senderId;
                      return (
                        <div key={i} className={`flex ${me ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl text-sm ${
                              me
                                ? "bg-primary text-white rounded-br-none"
                                : theme === "dark"
                                  ? "bg-background text-text-primary border border-primary/10 rounded-bl-none"
                                  : "bg-white text-gray-900 border border-primary/10 rounded-bl-none"
                            }`}
                          >
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
                      disabled={sending}
                      placeholder="Type your message... (Enter to send)"
                      className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 ${
                        theme === "dark"
                          ? "bg-background border-text-muted/30 text-text-primary placeholder-text-muted"
                          : "bg-gray-100 border-gray-200 text-gray-900 placeholder-gray-500"
                      }`}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!newMessage.trim() || sending}
                      className="w-11 h-11 rounded-full bg-primary hover:bg-primary-hover flex items-center justify-center flex-shrink-0 transition disabled:opacity-50"
                    >
                      {sending ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
    </>
  );

  if (embedded) return content;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-background" : "bg-gray-50"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">{content}</div>
    </div>
  );
}
