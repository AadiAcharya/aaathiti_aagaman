import { useState, useEffect } from "react";
import { hostAPI } from "../../services/api";
import { useTheme } from "../../context/ThemeContext";
import { Bell, BellOff, CreditCard, MessageCircle, Star, Settings, Calendar } from "lucide-react";

export default function NotificationsPage() {
  const { theme } = useTheme();
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
    const icons = { booking: Bell, payment: CreditCard, message: MessageCircle, review: Star, system: Settings };
    return icons[type] || Bell;
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div>
      <div>
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1
              className={`text-2xl font-bold mb-2 ${
                theme === "dark" ? "text-text-primary" : "text-gray-900"
              }`}
            >
              Notifications
            </h1>
            {unreadCount > 0 && (
              <p className={theme === "dark" ? "text-text-secondary" : "text-gray-600"}>
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
          <div className={`text-center py-16 ${theme === "dark" ? "text-text-secondary" : "text-gray-600"}`}>
            <BellOff className="w-9 h-9 mx-auto mb-4" />
            <p className="text-xl">No notifications yet</p>
          </div>
        )}

        {/* Notifications List */}
        {!loading && !error && notifications.length > 0 && (
          <div
            className={`rounded-xl border overflow-hidden ${
              theme === "dark" ? "bg-bg-secondary border-text-muted/20" : "bg-white border-gray-200"
            }`}
          >
            {/* Header */}
            <div
              className={`p-6 border-b ${
                theme === "dark"
                  ? "bg-gradient-to-r from-bg-secondary to-bg-secondary/70 border-text-muted/20"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <h2
                className={`text-xl font-bold flex items-center gap-2 ${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                }`}
              >
                <Bell className="w-5 h-5" /> All Notifications
              </h2>
            </div>

            <div className={`divide-y ${theme === "dark" ? "divide-text-muted/10" : "divide-gray-200"}`}>
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  className={`flex items-start justify-between p-6 transition border-b last:border-b-0 ${
                    theme === "dark" ? "border-text-muted/10" : "border-gray-200"
                  } ${
                    !notification.isRead ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-primary/5"
                  }`}
                >
                  <div className="flex gap-4 flex-1">
                    {(() => {
                      const Icon = typeIcon(notification.type);
                      return <Icon className="w-6 h-6 mt-0.5 flex-shrink-0" />;
                    })()}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className={`text-sm font-bold ${
                            theme === "dark" ? "text-text-primary" : "text-gray-900"
                          }`}
                        >
                          {notification.title}
                        </h3>
                        {!notification.isRead && (
                          <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className={`text-sm mb-1 ${theme === "dark" ? "text-text-secondary" : "text-gray-600"}`}>
                        {notification.message}
                      </p>
                      <p
                        className={`text-xs inline-flex items-center gap-1.5 ${
                          theme === "dark" ? "text-text-muted" : "text-gray-500"
                        }`}
                      >
                        <Calendar className="w-4 h-4" /> {formatDate(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDismiss(notification._id)}
                    className={`hover:text-primary hover:bg-primary/20 p-2 rounded-lg transition ml-4 flex-shrink-0 ${
                      theme === "dark" ? "text-text-muted" : "text-gray-500"
                    }`}
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
      </div>
    </div>
  );
}
