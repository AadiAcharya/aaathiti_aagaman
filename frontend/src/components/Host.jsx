import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hostAPI, roomsAPI } from "../services/api";
import HostReservation from "./host/HostReservation";
import Messages from "./Messages";
import NotificationsPage from "./host/NotificationsPage";
import TransactionHistory from "./host/TransactionHistory";
import StarRating from "./common/StarRating";
import TopRatedBadge from "./common/TopRatedBadge";
import { useTheme } from "../context/ThemeContext";
import { formatNPR } from "../utils/currency";
import { isTopRated } from "../utils/rating";
import {
  Home,
  Building2,
  ClipboardList,
  MessageCircle,
  Bell,
  CreditCard,
  Plus,
} from "lucide-react";

export default function Host() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("listings");

  const [stats, setStats] = useState({
    totalListings: 0,
    activeBookings: 0,
    totalRevenue: "0.00",
    avgRating: 0,
  });
  const [listings, setListings] = useState([]);
  const [listingBreakdown, setListingBreakdown] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const [dashRes, listRes] = await Promise.all([
          hostAPI.getDashboard(),
          hostAPI.getListings(),
        ]);
        setStats(dashRes.stats);
        setListingBreakdown(dashRes.listingBreakdown || []);
        setMonthlyRevenue(dashRes.monthlyRevenue || []);
        setListings(listRes.listings);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this listing?")) return;
    try {
      setDeleting(id);
      await roomsAPI.delete(id);
      setListings((prev) => prev.filter((l) => l._id !== id));
      setStats((prev) => ({ ...prev, totalListings: prev.totalListings - 1 }));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(null);
    }
  };

  const handleToggleStatus = async (room) => {
    try {
      await roomsAPI.update(room._id, { isAvailable: !room.isAvailable });
      setListings((prev) =>
        prev.map((l) =>
          l._id === room._id
            ? {
                ...l,
                isAvailable: !l.isAvailable,
                status: !l.isAvailable ? "Active" : "Inactive",
              }
            : l,
        ),
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const tabs = [
    { id: "listings", label: "Listings", icon: Building2 },
    { id: "reservation", label: "Reservations", icon: ClipboardList },
    { id: "messages", label: "Messages", icon: MessageCircle },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "transactions", label: "Transactions", icon: CreditCard },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-900 text-slate-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative rounded-2xl overflow-hidden p-12 border ${
              theme === "dark"
                ? "bg-gradient-to-br from-slate-800 to-slate-900 border-blue-500/20"
                : "bg-gradient-to-br from-gray-100 to-gray-200 border-gray-200"
            }`}
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div
                className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl ${
                  theme === "dark" ? "bg-blue-600" : "bg-blue-400"
                }`}
              ></div>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="font-bold text-5xl md:text-6xl mb-3">
                  <span className="inline-flex items-center gap-3">
                    <Home className="w-12 h-12 md:w-14 md:h-14" />
                    Host Dashboard
                  </span>
                </h1>
                <p
                  className={`text-xl mb-2 ${
                    theme === "dark" ? "text-slate-300" : "text-gray-700"
                  }`}
                >
                  Manage your listings, reservations, messages, and
                  transactions
                </p>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-slate-400" : "text-gray-500"
                  }`}
                >
                  Welcome back! Everything you need to manage your hosting is
                  right here
                </p>
              </div>
              <button
                onClick={() => navigate("/add-property")}
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-6 py-3 rounded-full transition shrink-0"
              >
                <Plus className="w-5 h-5" /> Add New Property
              </button>
            </div>
          </div>
        </div>
      </section>

      {error && (
        <section className="px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          </div>
        </section>
      )}

      {/* Stats Overview - real data */}
      <section className="py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: "Total Listings", value: stats.totalListings },
              { label: "Active Bookings", value: stats.activeBookings },
              { label: "Total Revenue", value: formatNPR(stats.totalRevenue) },
              { label: "Avg. Rating", value: stats.avgRating },
            ].map((card) => (
              <div
                key={card.label}
                className={`rounded-xl p-6 transition ${
                  theme === "dark"
                    ? "bg-slate-800 border border-slate-700 hover:border-blue-500/50"
                    : "bg-white border border-gray-200 hover:border-blue-500/50"
                }`}
              >
                <p
                  className={`text-sm mb-2 ${
                    theme === "dark" ? "text-slate-400" : "text-gray-600"
                  }`}
                >
                  {loading ? "..." : card.label}
                </p>
                <p
                  className={`text-2xl font-bold ${
                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {loading ? "…" : card.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics: revenue trend + per-listing performance */}
      {!loading && stats.totalListings > 0 && (
        <section className="px-6 md:px-12 pb-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue trend */}
            <div
              className={`rounded-xl p-6 border ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3 className="font-bold mb-4">Revenue — Last 6 Months</h3>
              {monthlyRevenue.every((m) => m.total === 0) ? (
                <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`}>
                  No completed transactions yet.
                </p>
              ) : (
                <div className="flex items-end justify-between gap-2 h-40">
                  {monthlyRevenue.map((m) => {
                    const max = Math.max(...monthlyRevenue.map((x) => x.total), 1);
                    const heightPct = Math.max((m.total / max) * 100, 2);
                    return (
                      <div key={m.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                        <span className={`text-xs font-semibold ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                          {m.total > 0 ? formatNPR(m.total) : ""}
                        </span>
                        <div
                          style={{ height: `${heightPct}%` }}
                          className={`w-full rounded-t-md min-h-[4px] ${
                            theme === "dark" ? "bg-blue-500" : "bg-blue-500"
                          }`}
                        />
                        <span className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`}>
                          {m.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Per-listing performance */}
            <div
              className={`rounded-xl p-6 border ${
                theme === "dark"
                  ? "bg-slate-800 border-slate-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <h3 className="font-bold mb-4">Listing Performance</h3>
              {listingBreakdown.length === 0 ? (
                <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`}>
                  No listings yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {listingBreakdown.slice(0, 5).map((l) => (
                    <div key={l.roomId} className="flex items-center justify-between gap-3 text-sm">
                      <span className={`truncate ${theme === "dark" ? "text-slate-200" : "text-gray-800"}`}>
                        {l.title}
                      </span>
                      <span className="flex items-center gap-3 shrink-0">
                        <span className={theme === "dark" ? "text-slate-400" : "text-gray-500"}>
                          {l.bookingsCount} booking{l.bookingsCount === 1 ? "" : "s"}
                        </span>
                        <span className={`font-semibold ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}>
                          {formatNPR(l.revenue)}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Host Dashboard Section */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div
            className={`flex gap-2 mb-8 overflow-x-auto ${
              theme === "dark" ? "border-b border-slate-700" : "border-b"
            }`}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 font-semibold transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? theme === "dark"
                      ? "text-blue-400 border-b-2 border-blue-400 bg-slate-800/30"
                      : "text-blue-600 border-b-2 border-blue-600 bg-gray-100/30"
                    : theme === "dark"
                      ? "text-slate-400 hover:text-white hover:bg-slate-800/20"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/20"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div
            className={`rounded-2xl p-8 border backdrop-blur-sm ${
              theme === "dark"
                ? "bg-slate-800/30 border-slate-700"
                : "bg-white/30 border-gray-200"
            }`}
          >
            <div className="animate-fadeIn">
              {activeTab === "listings" &&
                (loading ? (
                  <div className="flex justify-center py-16">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
                  </div>
                ) : listings.length === 0 ? (
                  <div
                    className={`text-center py-16 ${
                      theme === "dark" ? "text-slate-400" : "text-gray-500"
                    }`}
                  >
                    <p className="text-xl mb-2">No listings yet</p>
                    <button
                      onClick={() => navigate("/add-property")}
                      className="text-primary underline"
                    >
                      Add your first property
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead
                        className={`border-b ${
                          theme === "dark"
                            ? "border-slate-700"
                            : "border-gray-200"
                        }`}
                      >
                        <tr>
                          {[
                            "Property",
                            "Type",
                            "Status",
                            "Price",
                            "Rating",
                            "Bookings",
                            "Actions",
                          ].map((h) => (
                            <th
                              key={h}
                              className="text-left px-4 py-3 font-bold"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {listings.map((listing) => (
                          <tr
                            key={listing._id}
                            className={`border-b transition ${
                              theme === "dark"
                                ? "border-slate-700 hover:bg-slate-800/50"
                                : "border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                {listing.image && (
                                  <img
                                    src={listing.image}
                                    alt=""
                                    className="w-12 h-12 rounded-lg object-cover"
                                  />
                                )}
                                <p className="font-semibold">
                                  {listing.title}
                                </p>
                              </div>
                            </td>
                            <td
                              className={`px-4 py-3 capitalize ${
                                theme === "dark"
                                  ? "text-slate-400"
                                  : "text-gray-600"
                              }`}
                            >
                              {listing.type}
                            </td>
                            <td className="px-4 py-3">
                              <button
                                onClick={() => handleToggleStatus(listing)}
                                className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                                  listing.isAvailable
                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                {listing.isAvailable ? "Active" : "Inactive"}
                              </button>
                            </td>
                            <td className="px-4 py-3 font-semibold">
                              {listing.priceDisplay}
                            </td>
                            <td className="px-4 py-3">
                              {listing.reviews > 0 ? (
                                <div className="flex flex-col gap-1">
                                  <StarRating
                                    rating={listing.rating}
                                    reviews={listing.reviews}
                                    showValue
                                    size="w-3.5 h-3.5"
                                  />
                                  {isTopRated(listing.rating, listing.reviews) && (
                                    <TopRatedBadge />
                                  )}
                                </div>
                              ) : (
                                <span
                                  className={`text-sm ${
                                    theme === "dark"
                                      ? "text-slate-500"
                                      : "text-gray-400"
                                  }`}
                                >
                                  No reviews yet
                                </span>
                              )}
                            </td>
                            <td
                              className={`px-4 py-3 ${
                                theme === "dark"
                                  ? "text-slate-400"
                                  : "text-gray-600"
                              }`}
                            >
                              {listing.bookingsCount}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex gap-3">
                                <button
                                  onClick={() =>
                                    navigate(`/room/${listing._id}`)
                                  }
                                  className="text-primary hover:text-primary-hover font-semibold text-sm"
                                >
                                  View
                                </button>
                                <button
                                  onClick={() => handleDelete(listing._id)}
                                  disabled={deleting === listing._id}
                                  className="text-red-500 hover:text-red-700 font-semibold text-sm disabled:opacity-50"
                                >
                                  {deleting === listing._id
                                    ? "..."
                                    : "Delete"}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              {activeTab === "reservation" && <HostReservation />}
              {activeTab === "messages" && <Messages embedded />}
              {activeTab === "notifications" && <NotificationsPage />}
              {activeTab === "transactions" && <TransactionHistory />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
