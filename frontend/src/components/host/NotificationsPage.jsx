import { useState, useEffect } from "react";
import { hostAPI } from "../../services/api";
import Card from "../ui/Card";
import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import Spinner from "../ui/Spinner";
import EmptyState from "../ui/EmptyState";
import { useToast } from "../ui/useToast";
import { Bell, BellOff, CreditCard, MessageCircle, Star, Settings, Calendar, EyeOff } from "lucide-react";

const TYPE_ICON = { booking: Bell, payment: CreditCard, message: MessageCircle, review: Star, system: Settings };

export default function NotificationsPage() {
  const toast = useToast();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      toast(err.message, { type: "error" });
    }
  };

  // Hiding is client-side only today — there's no dismiss/delete endpoint yet,
  // so the notification will reappear on reload. Label it honestly rather than
  // implying it's gone for good.
  const handleHide = (id) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary">Notifications</h1>
          {unreadCount > 0 && (
            <p className="text-text-secondary text-sm mt-1">
              You have <span className="font-semibold text-primary">{unreadCount}</span> unread
            </p>
          )}
        </div>
        {unreadCount > 0 && (
          <Button size="sm" variant="secondary" onClick={handleMarkAllRead}>
            Mark All Read
          </Button>
        )}
      </div>

      {loading && (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      )}

      {error && <div className="text-center py-16 text-danger text-sm">{error}</div>}

      {!loading && !error && notifications.length === 0 && (
        <Card>
          <EmptyState icon={BellOff} title="No notifications yet" />
        </Card>
      )}

      {!loading && !error && notifications.length > 0 && (
        <Card padding="p-0" className="overflow-hidden">
          <div className="divide-y divide-border">
            {notifications.map((notification) => {
              const Icon = TYPE_ICON[notification.type] || Bell;
              return (
                <div
                  key={notification._id}
                  className={`flex items-start justify-between gap-4 p-5 transition-colors duration-[var(--duration-fast)]
                    ${!notification.isRead ? "bg-primary-subtle" : "hover:bg-bg-secondary"}`}
                >
                  <div className="flex gap-3.5 flex-1 min-w-0">
                    <Icon className="w-5 h-5 mt-0.5 shrink-0 text-text-secondary" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-text-primary">{notification.title}</h3>
                        {!notification.isRead && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                      </div>
                      <p className="text-sm text-text-secondary mb-1">{notification.message}</p>
                      <p className="text-xs text-text-muted inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {formatDate(notification.createdAt)}
                      </p>
                    </div>
                  </div>
                  <IconButton
                    icon={EyeOff}
                    label="Hide for now"
                    size="sm"
                    onClick={() => handleHide(notification._id)}
                  />
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}
