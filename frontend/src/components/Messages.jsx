import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { messageAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { MessageCircle, Inbox, Home as HomeIcon, ArrowLeft, User, Send } from "lucide-react";
import Spinner from "./ui/Spinner";
import IconButton from "./ui/IconButton";

// Avatar for a conversation - a room's photo when the conversation is about a
// room (so guests/hosts can spot the right chat at a glance), else initials.
function ThreadAvatar({ room, fallbackLabel, size = "w-12 h-12" }) {
  if (room?.image) {
    return (
      <img
        src={room.image}
        alt={room.title || "Room"}
        className={`${size} rounded-full object-cover flex-shrink-0 border border-border`}
      />
    );
  }
  return (
    <div
      className={`${size} rounded-full bg-primary-subtle flex-shrink-0 flex items-center justify-center border border-border font-bold text-primary`}
    >
      {fallbackLabel?.[0]?.toUpperCase() || "?"}
    </div>
  );
}

export default function Messages({ embedded = false }) {
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
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-1">Messages</h1>
          <p className="text-text-secondary">Your conversations</p>
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      )}

      {error && <div className="text-center py-16 text-danger">{error}</div>}

      {!loading && !error && (
        <div className="rounded-card border border-border bg-bg-elevated overflow-hidden flex h-[calc(100vh-16rem)] min-h-[480px]">
          {/* Thread list — always visible at desktop widths; on mobile, hidden once a thread is open */}
          <div
            className={`w-full lg:w-80 shrink-0 border-r border-border flex-col ${
              currentThread ? "hidden lg:flex" : "flex"
            }`}
          >
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-base font-semibold text-text-primary flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-primary" /> Conversations
              </h2>
            </div>

            {threads.length === 0 ? (
              <div className="flex-1 flex items-center justify-center text-text-secondary">
                <div className="text-center px-6">
                  <Inbox className="w-7 h-7 mx-auto mb-2 text-text-muted" />
                  <p className="text-sm">No messages yet</p>
                  <p className="text-xs mt-1 text-text-muted">
                    Visit a room and tap "Message Host" to start a conversation.
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-y-auto flex-1">
                {threads.map((thread) => {
                  const last = thread.messages[thread.messages.length - 1];
                  const unread = thread.messages.filter(
                    (m) => !m.isRead && (m.recipient?._id || m.recipient) === currentUser?._id,
                  ).length;
                  const { title, subtitle } = threadLabel(thread);
                  const active = thread.key === selectedKey;
                  return (
                    <div
                      key={thread.key}
                      onClick={() => setSelectedKey(thread.key)}
                      className={`flex items-center gap-3 p-4 cursor-pointer border-b border-border transition-colors duration-[var(--duration-fast)] ${
                        active ? "bg-primary-subtle" : "hover:bg-bg-secondary"
                      }`}
                    >
                      <ThreadAvatar room={thread.room} fallbackLabel={title} />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center gap-2">
                          <h3 className="text-sm font-semibold truncate text-text-primary">{title}</h3>
                          {unread > 0 && (
                            <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center flex-shrink-0">
                              {unread}
                            </span>
                          )}
                        </div>
                        {subtitle && (
                          <p className="text-xs truncate flex items-center gap-1 text-primary">
                            {isHost ? <User className="w-3 h-3" /> : <HomeIcon className="w-3 h-3" />} {subtitle}
                          </p>
                        )}
                        <p className="text-xs truncate text-text-muted">
                          {last?.content || "No messages yet — say hello!"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Chat window */}
          <div className={`flex-1 flex-col min-w-0 ${currentThread ? "flex" : "hidden lg:flex"}`}>
            {!currentThread ? (
              <div className="flex-1 flex items-center justify-center text-text-secondary">
                <div className="text-center">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 text-text-muted" />
                  <p className="text-sm">Select a conversation to start chatting</p>
                </div>
              </div>
            ) : (
              <>
                <div className="p-4 border-b border-border flex items-center gap-3">
                  <IconButton
                    icon={ArrowLeft}
                    label="Back to conversations"
                    className="lg:hidden -ml-2"
                    onClick={() => setSelectedKey(null)}
                  />
                  <ThreadAvatar room={currentThread.room} fallbackLabel={threadLabel(currentThread).title} size="w-10 h-10" />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-text-primary truncate">{threadLabel(currentThread).title}</h3>
                    {threadLabel(currentThread).subtitle && (
                      <p className="text-xs text-text-muted truncate">{threadLabel(currentThread).subtitle}</p>
                    )}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {currentThread.messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-center text-text-secondary">
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
                                ? "bg-primary text-white rounded-br-md"
                                : "bg-bg-secondary text-text-primary border border-border rounded-bl-md"
                            }`}
                          >
                            <p>{msg.content}</p>
                            <p className={`text-xs mt-1 ${me ? "text-white/70" : "text-text-muted"}`}>
                              {formatTime(msg.createdAt)}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={bottomRef} />
                </div>

                <div className="p-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      disabled={sending}
                      placeholder="Type your message… (Enter to send)"
                      className="flex-1 px-4 py-3 rounded-[var(--radius-control)] border border-border bg-bg-sunken text-text-primary placeholder-text-muted outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!newMessage.trim() || sending}
                      className="w-11 h-11 rounded-full bg-primary hover:bg-primary-hover flex items-center justify-center flex-shrink-0 transition-colors duration-[var(--duration-fast)] disabled:opacity-50"
                    >
                      {sending ? <Spinner size="sm" className="text-white" /> : <Send className="w-4 h-4 text-white" />}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );

  if (embedded) return content;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">{content}</div>
    </div>
  );
}
