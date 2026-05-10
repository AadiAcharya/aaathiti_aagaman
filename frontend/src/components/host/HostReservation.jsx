import { useState, useEffect } from "react";
import { hostAPI } from "../../services/api";

export default function HostReservation() {
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
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-text-primary mb-4">Reservations</h1>
          <p className="text-text-secondary text-lg">Manage your incoming and past bookings</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-text-muted/20 mb-8">
          {["upcoming", "past", "rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 text-[15px] font-medium relative transition ${
                activeTab === tab ? "text-primary" : "text-text-secondary hover:text-text-primary"
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
          <div className="text-center py-16 text-text-secondary">
            <p className="text-4xl mb-4">📭</p>
            <p className="text-xl">No {activeTab} reservations</p>
          </div>
        )}

        {/* Reservation Cards */}
        {!loading && !error && (
          <div className="flex flex-col gap-4">
            {reservations.map((reservation) => (
              <div
                key={reservation._id}
                className="flex items-center gap-4 p-6 bg-bg-secondary border border-text-muted/20 rounded-xl hover:border-primary/50 hover:shadow-lg transition-all"
              >
                {/* Property Image */}
                <div className="w-24 h-24 rounded-lg flex-shrink-0 overflow-hidden border border-primary/20">
                  {reservation.room?.image ? (
                    <img src={reservation.room.image} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-3xl">🏠</div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    {reservation.room?.title || "Room"}
                  </h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-text-secondary mb-2">
                    <span>📅 <span className="font-medium">Check In:</span> {formatDate(reservation.checkIn)}</span>
                    <span>📅 <span className="font-medium">Check Out:</span> {formatDate(reservation.checkOut)}</span>
                    <span>🌙 <span className="font-medium">Nights:</span> {reservation.nights}</span>
                    <span>👥 <span className="font-medium">Guests:</span> {reservation.guests}</span>
                  </div>
                  <div className="flex gap-4 text-sm text-text-muted">
                    <span>👤 By: {reservation.user?.name || reservation.guestName}</span>
                    <span className="font-bold text-accent">💵 ${reservation.grandTotal}</span>
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
                      className="px-6 py-2 bg-bg-secondary border-2 border-text-muted/30 text-text-primary hover:border-primary text-sm font-bold rounded-full transition-all disabled:opacity-50"
                    >
                      ✕ Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}