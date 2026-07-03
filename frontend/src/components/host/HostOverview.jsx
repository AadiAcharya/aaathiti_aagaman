import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useAuth } from "../../context/AuthContext";
import { hostAPI } from "../../services/api";
import { formatNPR } from "../../utils/currency";
import Card from "../ui/Card";
import Button from "../ui/Button";
import StatCard from "../ui/StatCard";
import EmptyState from "../ui/EmptyState";
import Skeleton from "../ui/Skeleton";
import {
  Building2,
  CalendarCheck,
  Wallet,
  Star,
  BarChart3,
  Plus,
  CalendarClock,
  Inbox,
} from "lucide-react";

const STATUS_META = {
  pending: { label: "Pending", color: "var(--color-warning)" },
  confirmed: { label: "Confirmed", color: "var(--color-primary)" },
  completed: { label: "Completed", color: "var(--color-success)" },
  cancelled: { label: "Cancelled", color: "var(--color-danger)" },
};

export default function HostOverview() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalListings: 0,
    activeBookings: 0,
    totalRevenue: "0.00",
    avgRating: 0,
  });
  const [listingBreakdown, setListingBreakdown] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [bookingStatusBreakdown, setBookingStatusBreakdown] = useState(null);
  const [upcomingCheckIns, setUpcomingCheckIns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const dashRes = await hostAPI.getDashboard();
        setStats(dashRes.stats);
        setListingBreakdown(dashRes.listingBreakdown || []);
        setMonthlyRevenue(dashRes.monthlyRevenue || []);
        setBookingStatusBreakdown(dashRes.bookingStatusBreakdown || null);
        setUpcomingCheckIns(dashRes.upcomingCheckIns || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const hasRevenue = monthlyRevenue.some((m) => m.total > 0);

  // Real month-over-month delta, computed from the same series driving the
  // chart — no fabricated numbers.
  let revenueTrend = null;
  if (monthlyRevenue.length >= 2) {
    const current = monthlyRevenue[monthlyRevenue.length - 1].total;
    const previous = monthlyRevenue[monthlyRevenue.length - 2].total;
    if (previous > 0) {
      const pct = Math.round(((current - previous) / previous) * 100);
      revenueTrend = { direction: pct >= 0 ? "up" : "down", label: `${pct >= 0 ? "+" : ""}${pct}% vs last month` };
    } else if (current > 0) {
      revenueTrend = { direction: "up", label: "New this month" };
    }
  }

  const totalStatusCount = bookingStatusBreakdown
    ? Object.values(bookingStatusBreakdown).reduce((s, v) => s + v, 0)
    : 0;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-card bg-gradient-to-br from-primary to-primary-hover px-8 py-8">
        <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute right-16 bottom-0 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-display font-bold text-white">
              Welcome back, {user?.name?.split(" ")[0] || "Host"}
            </h1>
            <p className="text-white/80 text-sm mt-1">
              Everything you need to manage your hosting is right here.
            </p>
          </div>
          <Button
            icon={Plus}
            className="!bg-white !text-primary hover:!bg-white/90 shrink-0"
            onClick={() => navigate("/add-property")}
          >
            Add Property
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-[var(--radius-control)] bg-danger-subtle border border-danger/30 text-danger px-4 py-3 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="h-[92px]">
              <Skeleton className="h-4 w-2/3 mb-3" />
              <Skeleton className="h-6 w-1/2" />
            </Card>
          ))
        ) : (
          <>
            <StatCard label="Total Listings" value={stats.totalListings} icon={Building2} />
            <StatCard label="Active Bookings" value={stats.activeBookings} icon={CalendarCheck} />
            <StatCard
              label="Total Revenue"
              value={formatNPR(stats.totalRevenue)}
              icon={Wallet}
              trend={revenueTrend}
            />
            <StatCard label="Avg. Rating" value={stats.avgRating || "—"} icon={Star} />
          </>
        )}
      </div>

      {!loading && stats.totalListings > 0 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <h3 className="font-semibold text-text-primary mb-4">Revenue — Last 6 Months</h3>
              {!hasRevenue ? (
                <EmptyState icon={BarChart3} title="No revenue yet" description="Completed bookings will show up here." />
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={monthlyRevenue} margin={{ left: 0, right: 0 }}>
                    <defs>
                      <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                    <XAxis dataKey="label" stroke="var(--color-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="var(--color-text-muted)"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      width={56}
                      tickFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : v)}
                    />
                    <Tooltip
                      cursor={{ stroke: "var(--color-primary)", strokeWidth: 1, strokeDasharray: "3 3" }}
                      contentStyle={{
                        background: "var(--color-bg-elevated)",
                        border: "1px solid var(--color-border)",
                        borderRadius: 10,
                        fontSize: 13,
                      }}
                      labelStyle={{ color: "var(--color-text-primary)", fontWeight: 600 }}
                      formatter={(value) => [formatNPR(value), "Revenue"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="var(--color-primary)"
                      strokeWidth={2.5}
                      fill="url(#revenueFill)"
                      dot={{ r: 3, fill: "var(--color-primary)", strokeWidth: 0 }}
                      activeDot={{ r: 5 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </Card>

            <Card>
              <h3 className="font-semibold text-text-primary mb-4">Booking Status</h3>
              {!bookingStatusBreakdown || totalStatusCount === 0 ? (
                <EmptyState icon={CalendarCheck} title="No bookings yet" />
              ) : (
                <div className="space-y-4">
                  <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-bg-secondary">
                    {Object.entries(bookingStatusBreakdown).map(([key, count]) =>
                      count > 0 ? (
                        <div
                          key={key}
                          style={{ width: `${(count / totalStatusCount) * 100}%`, background: STATUS_META[key].color }}
                        />
                      ) : null,
                    )}
                  </div>
                  <div className="space-y-2.5">
                    {Object.entries(bookingStatusBreakdown).map(([key, count]) => (
                      <div key={key} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-text-secondary">
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: STATUS_META[key].color }} />
                          {STATUS_META[key].label}
                        </span>
                        <span className="font-semibold text-text-primary">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                <CalendarClock className="w-4 h-4 text-primary" /> Upcoming Check-ins
              </h3>
              {upcomingCheckIns.length === 0 ? (
                <EmptyState icon={Inbox} title="No check-ins this week" description="Confirmed stays starting soon will show up here." />
              ) : (
                <div className="space-y-1">
                  {upcomingCheckIns.map((c) => (
                    <div
                      key={c.bookingId}
                      className="flex items-center gap-3 py-2.5 border-b border-border last:border-b-0"
                    >
                      <div className="w-9 h-9 rounded-full bg-primary-subtle text-primary flex items-center justify-center text-sm font-semibold shrink-0">
                        {c.guestName.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text-primary truncate">{c.guestName}</p>
                        <p className="text-xs text-text-muted truncate">{c.roomTitle}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-semibold text-text-primary">{formatDate(c.checkIn)}</p>
                        <p className="text-xs text-text-muted">{c.guests} guest{c.guests === 1 ? "" : "s"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card>
              <h3 className="font-semibold text-text-primary mb-4">Listing Performance</h3>
              {listingBreakdown.length === 0 ? (
                <EmptyState icon={Building2} title="No listings yet" description="Add a property to start tracking performance." />
              ) : (
                <div className="space-y-1">
                  {listingBreakdown.slice(0, 5).map((l) => (
                    <div
                      key={l.roomId}
                      className="flex items-center justify-between gap-3 text-sm py-2.5 border-b border-border last:border-b-0"
                    >
                      <span className="truncate text-text-primary font-medium">{l.title}</span>
                      <span className="flex items-center gap-3 shrink-0 text-text-secondary">
                        <span>
                          {l.bookingsCount} booking{l.bookingsCount === 1 ? "" : "s"}
                        </span>
                        <span className="font-semibold text-primary">{formatNPR(l.revenue)}</span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </>
      )}

      {!loading && stats.totalListings === 0 && (
        <Card>
          <EmptyState
            icon={Building2}
            title="No listings yet"
            description="List your first property to start receiving bookings."
            action={
              <Button size="sm" icon={Plus} onClick={() => navigate("/add-property")}>
                Add your first property
              </Button>
            }
          />
        </Card>
      )}
    </div>
  );
}
