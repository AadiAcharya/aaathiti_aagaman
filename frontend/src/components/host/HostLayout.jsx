import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { hostAPI, messageAPI } from "../../services/api";
import Logo from "../common/Logo";
import Button from "../ui/Button";
import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  MessageCircle,
  Bell,
  CreditCard,
  Plus,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/host", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/host/listings", label: "Listings", icon: Building2 },
  { to: "/host/reservations", label: "Reservations", icon: ClipboardList, badgeKey: "pending" },
  { to: "/host/messages", label: "Messages", icon: MessageCircle, badgeKey: "messages" },
  { to: "/host/notifications", label: "Notifications", icon: Bell, badgeKey: "notifications" },
  { to: "/host/transactions", label: "Transactions", icon: CreditCard },
];

export default function HostLayout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [badges, setBadges] = useState({});

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [resRes, notifRes, msgRes] = await Promise.all([
          hostAPI.getReservations({ status: "pending" }),
          hostAPI.getNotifications(),
          messageAPI.getMine(),
        ]);
        if (!active) return;
        const unreadMessages = (msgRes.messages || []).filter(
          (m) => !m.isRead && (m.recipient?._id || m.recipient) === user?._id,
        ).length;
        setBadges({
          pending: resRes.reservations?.length || 0,
          notifications: notifRes.unreadCount || 0,
          messages: unreadMessages,
        });
      } catch {
        // Sidebar badges are best-effort — a failed fetch just leaves them blank.
      }
    })();
    return () => {
      active = false;
    };
  }, [user?._id]);

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-bg-elevated">
        <div className="h-16 flex items-center gap-2.5 px-6 border-b border-border">
          <Logo className="w-8 h-8" />
          <span className="font-display font-bold text-text-primary">Aathiti Aagaman</span>
        </div>

        <div className="p-4">
          <Button fullWidth icon={Plus} onClick={() => navigate("/add-property")}>
            Add Property
          </Button>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const badgeValue = item.badgeKey ? badges[item.badgeKey] : null;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center justify-between gap-2 px-3 py-2.5 rounded-[var(--radius-control)] text-sm font-medium
                  transition-colors duration-[var(--duration-fast)]
                  ${isActive ? "bg-primary-subtle text-primary" : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"}`
                }
              >
                <span className="flex items-center gap-2.5">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </span>
                {!!badgeValue && (
                  <span className="min-w-[1.25rem] h-5 px-1 rounded-full bg-primary text-white text-[11px] font-semibold flex items-center justify-center">
                    {badgeValue}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <p className="text-xs text-text-muted">Signed in as</p>
          <p className="text-sm font-semibold text-text-primary truncate">{user?.name}</p>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        {/* Compact top bar for the nav items on narrower desktop widths */}
        <div className="lg:hidden border-b border-border bg-bg-elevated px-4 py-2 flex items-center gap-1 overflow-x-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors
                ${isActive ? "bg-primary text-white" : "text-text-secondary hover:bg-bg-secondary"}`
              }
            >
              <item.icon className="w-3.5 h-3.5" />
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
