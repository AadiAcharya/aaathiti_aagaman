import { useState, useEffect } from "react";
import { hostAPI } from "../../services/api";
import { useTheme } from "../../context/ThemeContext";
import { formatNPR } from "../../utils/currency";
import { Home, Calendar, Moon, Users, User, Banknote, Inbox } from "lucide-react";

export default function HostReservation() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab]         = useState("upcoming");
  const [reservations, setReservations]   = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [updating, setUpdating]           = useState(null);

  const tabToStatus = {
    upcoming: "confirmed",
    past:     "completed",
    rejected: "cancelled",
  };

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        setError(null);
        const { reservations: data } = await hostAPI.getReservations({
          status: tabToStatus[activeTab],
        });
        setReservations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [activeTab]);

  const handleAction = async (id, status) => {
    try {
      setUpdating(id);
      await hostAPI.updateReservation(id, { status });
      setReservations((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

  return (
    <div>
        <div className="mb-12">
          <h1
            className={`text-2xl font-bold mb-4 ${
              theme === "dark" ? "text-text-primary" : "text-gray-900"
            }`}
          >
            Reservations
          </h1>
          <p
            className={`text-lg ${
              theme === "dark" ? "text-text-secondary" : "text-gray-600"
            }`}
          >
            Manage your incoming and past bookings
          </p>
        </div>

        {/* Tabs */}
        <div
          className={`flex gap-6 border-b mb-8 ${
            theme === "dark" ? "border-text-muted/20" : "border-gray-200"
          }`}
        >
          {["upcoming", "past", "rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 text-[15px] font-medium relative transition ${
                activeTab === tab
                  ? "text-primary"
                  : theme === "dark"
                    ? "text-text-secondary hover:text-text-primary"
                    : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-16 text-red-500">{error}</div>
        )}

        {/* Empty */}
        {!loading && !error && reservations.length === 0 && (
          <div
            className={`text-center py-16 ${
              theme === "dark" ? "text-text-secondary" : "text-gray-600"
            }`}
          >
            <Inbox className="w-9 h-9 mx-auto mb-4" />
            <p className="text-xl">No {activeTab} reservations</p>
          </div>
        )}

        {/* Reservation Cards */}
        {!loading && !error && (
          <div className="flex flex-col gap-4">
            {reservations.map((reservation) => (
              <div
                key={reservation._id}
                className={`flex items-center gap-4 p-6 border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all ${
                  theme === "dark"
                    ? "bg-bg-secondary border-text-muted/20"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                {/* Property Image */}
                <div className="w-24 h-24 rounded-lg flex-shrink-0 overflow-hidden border border-primary/20">
                  {reservation.room?.image ? (
                    <img src={reservation.room.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                      <Home className="w-8 h-8" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`text-lg font-bold mb-2 ${
                      theme === "dark" ? "text-text-primary" : "text-gray-900"
                    }`}
                  >
                    {reservation.room?.title || "Room"}
                  </h3>
                  <div
                    className={`flex flex-wrap gap-x-6 gap-y-1 text-sm mb-2 ${
                      theme === "dark" ? "text-text-secondary" : "text-gray-600"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4" /> <span className="font-medium">Check In:</span> {formatDate(reservation.checkIn)}</span>
                    <span className="inline-flex items-center gap-1.5"><Calendar className="w-4 h-4" /> <span className="font-medium">Check Out:</span> {formatDate(reservation.checkOut)}</span>
                    <span className="inline-flex items-center gap-1.5"><Moon className="w-4 h-4" /> <span className="font-medium">Nights:</span> {reservation.nights}</span>
                    <span className="inline-flex items-center gap-1.5"><Users className="w-4 h-4" /> <span className="font-medium">Guests:</span> {reservation.guests}</span>
                  </div>
                  <div
                    className={`flex gap-4 text-sm ${
                      theme === "dark" ? "text-text-muted" : "text-gray-500"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5"><User className="w-4 h-4" /> By: {reservation.user?.name || reservation.guestName}</span>
                    <span className="font-bold text-primary inline-flex items-center gap-1.5"><Banknote className="w-4 h-4" /> {formatNPR(reservation.grandTotal)}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      reservation.paymentStatus === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {reservation.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Actions — only show for pending/upcoming */}
                {activeTab === "upcoming" && (
                  <div className="flex gap-3 flex-shrink-0">
                    <button
                      onClick={() => handleAction(reservation._id, "confirmed")}
                      disabled={updating === reservation._id}
                      className="px-6 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-full transition-all disabled:opacity-50"
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => handleAction(reservation._id, "cancelled")}
                      disabled={updating === reservation._id}
                      className={`px-6 py-2 border-2 text-sm font-bold rounded-full transition-all disabled:opacity-50 hover:border-primary ${
                        theme === "dark"
                          ? "bg-bg-secondary border-text-muted/30 text-text-primary"
                          : "bg-gray-50 border-gray-200 text-gray-900"
                      }`}
                    >
                      ✕ Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
