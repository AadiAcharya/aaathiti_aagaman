import { useState, useEffect } from "react";
import { hostAPI } from "../../services/api";
import { formatNPR } from "../../utils/currency";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Tabs from "../ui/Tabs";
import Spinner from "../ui/Spinner";
import EmptyState from "../ui/EmptyState";
import { useToast } from "../ui/useToast";
import { Home, Calendar, Moon, Users, User, Banknote, Inbox } from "lucide-react";

const TAB_TO_STATUS = {
  pending: "pending",
  upcoming: "confirmed",
  past: "completed",
  rejected: "cancelled",
};

const TABS = [
  { id: "pending", label: "Pending" },
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
  { id: "rejected", label: "Rejected" },
];

export default function HostReservation() {
  const toast = useToast();
  const [activeTab, setActiveTab] = useState("pending");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        setError(null);
        const { reservations: data } = await hostAPI.getReservations({
          status: TAB_TO_STATUS[activeTab],
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
    const messages = {
      confirmed: "Reservation approved",
      cancelled: "Reservation rejected",
      completed: "Stay marked as completed",
    };
    try {
      setUpdating(id);
      await hostAPI.updateReservation(id, { status });
      setReservations((prev) => prev.filter((r) => r._id !== id));
      toast(messages[status], { type: "success" });
    } catch (err) {
      toast(err.message, { type: "error" });
    } finally {
      setUpdating(null);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-text-primary">Reservations</h1>
        <p className="text-text-secondary text-sm mt-1">
          Manage your incoming and past bookings
        </p>
      </div>

      <Tabs tabs={TABS} active={activeTab} onChange={setActiveTab} />

      {loading && (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      )}

      {error && <div className="text-center py-16 text-danger text-sm">{error}</div>}

      {!loading && !error && reservations.length === 0 && (
        <EmptyState icon={Inbox} title={`No ${activeTab} reservations`} />
      )}

      {!loading && !error && reservations.length > 0 && (
        <div className="flex flex-col gap-4">
          {reservations.map((reservation) => (
            <Card key={reservation._id} hoverable className="flex flex-wrap md:flex-nowrap items-center gap-4">
              <div className="w-24 h-24 rounded-[var(--radius-control)] shrink-0 overflow-hidden bg-bg-secondary">
                {reservation.room?.image ? (
                  <img src={reservation.room.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Home className="w-8 h-8 text-text-muted" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-base font-semibold text-text-primary mb-2">
                  {reservation.room?.title || "Room"}
                </h3>
                <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-text-secondary mb-2">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {formatDate(reservation.checkIn)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {formatDate(reservation.checkOut)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Moon className="w-3.5 h-3.5" /> {reservation.nights} nights
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> {reservation.guests} guests
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="inline-flex items-center gap-1.5 text-text-muted">
                    <User className="w-3.5 h-3.5" /> {reservation.user?.name || reservation.guestName}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                    <Banknote className="w-3.5 h-3.5" /> {formatNPR(reservation.grandTotal)}
                  </span>
                  <Badge tone={reservation.paymentStatus === "paid" ? "success" : "warning"}>
                    {reservation.paymentStatus}
                  </Badge>
                </div>
              </div>

              {activeTab === "pending" && (
                <div className="flex gap-2 shrink-0">
                  <Button
                    size="sm"
                    onClick={() => handleAction(reservation._id, "confirmed")}
                    loading={updating === reservation._id}
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={updating === reservation._id}
                    onClick={() => handleAction(reservation._id, "cancelled")}
                  >
                    Reject
                  </Button>
                </div>
              )}

              {activeTab === "upcoming" && new Date(reservation.checkOut) <= new Date() && (
                <Button
                  size="sm"
                  loading={updating === reservation._id}
                  onClick={() => handleAction(reservation._id, "completed")}
                  className="shrink-0"
                >
                  Confirm Stay Completed
                </Button>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
