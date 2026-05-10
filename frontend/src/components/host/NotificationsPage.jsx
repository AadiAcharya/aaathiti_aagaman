import { useState, useEffect } from "react";
import { hostAPI } from "../../services/api";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount]     = useState(0);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const { notifications: data, unreadCount: count } = await hostAPI.getNotifications();
        setNotifications(data);
        setUnreadCount(count);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await hostAPI.markAllRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  const typeIcon = (type) => {
    const icons = { booking: "🔔", payment: "💳", message: "💬", review: "⭐", system: "⚙️" };
    return icons[type] || "🔔";
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold text-text-primary mb-2">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-text-secondary">
                You have <span className="font-bold text-primary">{unreadCount}</span> unread notifications
              </p>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="px-6 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-hover transition"
            >
              ✓ Mark All Read
            </button>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
          </div>
        )}

        {/* Error */}
        {error && <div className="text-center py-16 text-red-500">{error}</div>}

        {/* Empty */}
        {!loading && !error && notifications.length === 0 && (
          <div className="text-center py-16 text-text-secondary">
            <p className="text-4xl mb-4">🔕</p>
            <p className="text-xl">No notifications yet</p>
          </div>
        )}

        {/* Notifications List */}
        {!loading && !error && notifications.length > 0 && (
          <div className="bg-bg-secondary rounded-xl border border-text-muted/20 overflow-hidden">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-bg-secondary to-bg-secondary/70 border-b border-text-muted/20">
              <h2 className="text-xl font-bold text-text-primary">🔔 All Notifications</h2>
            </div>

            <div className="divide-y divide-text-muted/10">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`flex items-start justify-between p-6 transition border-b border-text-muted/10 last:border-b-0 ${
                    !notification.isRead ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-primary/5"
                  }`}
                >
                  <div className="flex gap-4 flex-1">
                    <span className="text-2xl mt-0.5">{typeIcon(notification.type)}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-text-primary">{notification.title}</h3>
                        {!notification.isRead && (
                          <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-text-secondary mb-1">{notification.message}</p>
                      <p className="text-xs text-text-muted">📅 {formatDate(notification.createdAt)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDismiss(notification._id)}
                    className="text-text-muted hover:text-primary hover:bg-primary/20 p-2 rounded-lg transition ml-4 flex-shrink-0"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}