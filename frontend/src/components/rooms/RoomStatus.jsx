import { useState, useEffect } from "react";
import { hostAPI, roomsAPI } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function RoomStatus() {
  const navigate = useNavigate();
  const [stats, setStats]       = useState({ totalListings: 0, activeBookings: 0, totalRevenue: "0.00", avgRating: 0 });
  const [listings, setListings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
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
            ? { ...l, isAvailable: !l.isAvailable, status: !l.isAvailable ? "Active" : "Inactive" }
            : l
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
  );

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold text-text-primary mb-4">Your Listings</h1>
            <p className="text-text-secondary text-lg">Manage your properties and bookings</p>
          </div>
          <button
            onClick={() => navigate("/add-property")}
            className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-4 rounded-full transition"
          >
            + Add New Property
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Listings",   value: stats.totalListings },
            { label: "Active Bookings",  value: stats.activeBookings },
            { label: "Total Revenue",    value: `$${stats.totalRevenue}` },
            { label: "Avg. Rating",      value: stats.avgRating },
          ].map((card) => (
            <div key={card.label} className="bg-bg-secondary rounded-lg p-6 border border-primary/10">
              <p className="text-text-secondary text-sm mb-2">{card.label}</p>
              <p className="text-4xl font-bold text-text-primary">{card.value}</p>
            </div>
          ))}
        </div>

        {/* Listings Table */}
        <div className="bg-bg-secondary rounded-lg border border-primary/10 overflow-hidden mb-12">
          {listings.length === 0 ? (
            <div className="text-center py-16 text-text-secondary">
              <p className="text-xl mb-2">No listings yet</p>
              <button onClick={() => navigate("/add-property")} className="text-primary underline">Add your first property</button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background border-b border-primary/10">
                  <tr>
                    {["Property", "Type", "Status", "Price", "Bookings", "Actions"].map((h) => (
                      <th key={h} className="text-left px-6 py-4 text-text-primary font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {listings.map((listing, index) => (
                    <tr
                      key={listing._id}
                      className={`border-b border-primary/10 hover:bg-background transition ${index === listings.length - 1 ? "border-b-0" : ""}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {listing.image && (
                            <img src={listing.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                          )}
                          <p className="font-semibold text-text-primary">{listing.title}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-text-secondary capitalize">{listing.type}</td>
                      <td className="px-6 py-4">
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
                      <td className="px-6 py-4 text-text-primary font-semibold">{listing.priceDisplay}</td>
                      <td className="px-6 py-4 text-text-secondary">{listing.bookingsCount}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-3">
                          <button
                            onClick={() => navigate(`/room/${listing._id}`)}
                            className="text-primary hover:text-primary-hover font-semibold text-sm"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(listing._id)}
                            disabled={deleting === listing._id}
                            className="text-red-500 hover:text-red-700 font-semibold text-sm disabled:opacity-50"
                          >
                            {deleting === listing._id ? "..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: "📊", title: "View Analytics",    desc: "Track your property performance",  action: () => navigate("/reservation"), label: "View Details →" },
            { icon: "📅", title: "Manage Calendar",   desc: "Update availability dates",        action: () => navigate("/reservation"), label: "Open Calendar →" },
            { icon: "💬", title: "Messages",          desc: "Respond to guest inquiries",       action: () => navigate("/message"),     label: "View Messages →" },
          ].map((item) => (
            <div key={item.title} className="bg-bg-secondary rounded-lg p-8 border border-primary/10 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">{item.icon}</span>
              </div>
              <h3 className="font-bold text-text-primary text-lg mb-2">{item.title}</h3>
              <p className="text-text-secondary text-sm mb-4">{item.desc}</p>
              <button onClick={item.action} className="text-primary hover:text-primary-hover font-semibold text-sm">
                {item.label}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}