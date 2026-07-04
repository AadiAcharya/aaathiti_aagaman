import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { bookingsAPI, paymentsAPI } from "../../services/api";
import { formatNPR } from "../../utils/currency";
import { useToast } from "../ui/useToast";
import Card from "../ui/Card";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import Skeleton from "../ui/Skeleton";
import { CreditCard, Wallet, CheckCircle2, ImageOff, ArrowLeft, ShieldCheck } from "lucide-react";

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });

export default function PaymentConfirm() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [method, setMethod] = useState("esewa"); // "esewa" | "card"
  const [card, setCard] = useState({ name: "", number: "", expiry: "", cvv: "" });
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const { booking: b } = await bookingsAPI.getById(bookingId);
        setBooking(b);
        setPaid(b.paymentStatus === "paid");
      } catch (err) {
        setError(err.message || "Booking not found");
      } finally {
        setLoading(false);
      }
    })();
  }, [bookingId, navigate]);

  const payWithEsewa = async () => {
    try {
      setPaying(true);
      setError("");
      const { payload, esewaUrl } = await paymentsAPI.initiateEsewa(bookingId);

      // eSewa expects a real HTML form POST, not a fetch/XHR — build one and submit it.
      const form = document.createElement("form");
      form.method = "POST";
      form.action = esewaUrl;
      Object.entries(payload).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      setError(err.message || "Could not start eSewa payment");
      setPaying(false);
    }
  };

  const payWithCard = async (e) => {
    e.preventDefault();
    try {
      setPaying(true);
      setError("");
      // No live Stripe key is configured for this project — this simulates a
      // successful charge the same way the rest of the app treats card payments.
      const { booking: updated } = await paymentsAPI.confirmPayment({
        bookingId,
        paymentIntentId: `demo_${Date.now()}`,
      });
      setBooking(updated);
      setPaid(true);
      toast("Payment successful", { type: "success" });
    } catch (err) {
      setError(err.message || "Payment failed");
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-40 w-full" />
        </div>
        <Skeleton className="h-72 w-full" />
      </div>
    );
  }

  if (error && !booking) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center">
        <p className="text-danger font-semibold mb-4">{error}</p>
        <Button variant="secondary" onClick={() => navigate("/rooms")}>
          Back to Rooms
        </Button>
      </div>
    );
  }

  const room = booking.room || {};

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-text-secondary hover:text-text-primary text-sm font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <h1 className="text-3xl font-display font-bold text-text-primary mb-1">
        {paid ? "Payment Complete" : "Confirm & Pay"}
      </h1>
      <p className="text-text-secondary mb-10">
        {paid
          ? "Your booking is confirmed — a receipt is below."
          : "Review your stay and choose how you'd like to pay."}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment options — left */}
        <div className="lg:col-span-2 space-y-6">
          {paid ? (
            <Card className="flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-success shrink-0" />
              <div>
                <p className="font-semibold text-text-primary">Payment successful</p>
                <p className="text-text-secondary text-sm mt-1">
                  A confirmation has been sent to the host. You can view this booking anytime from your account.
                </p>
                <Button size="sm" className="mt-4" onClick={() => navigate("/account")}>
                  View My Bookings
                </Button>
              </div>
            </Card>
          ) : (
            <Card>
              <h2 className="font-semibold text-text-primary mb-4">Choose a payment method</h2>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  onClick={() => setMethod("esewa")}
                  className={`flex items-center gap-3 rounded-[var(--radius-control)] border-2 px-4 py-3.5 text-left transition-colors ${
                    method === "esewa" ? "border-primary bg-primary-subtle" : "border-border hover:border-border-strong"
                  }`}
                >
                  <Wallet className={`w-5 h-5 shrink-0 ${method === "esewa" ? "text-primary" : "text-text-muted"}`} />
                  <div>
                    <p className="font-semibold text-text-primary text-sm">eSewa</p>
                    <p className="text-text-muted text-xs">Nepal's digital wallet</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setMethod("card")}
                  className={`flex items-center gap-3 rounded-[var(--radius-control)] border-2 px-4 py-3.5 text-left transition-colors ${
                    method === "card" ? "border-primary bg-primary-subtle" : "border-border hover:border-border-strong"
                  }`}
                >
                  <CreditCard className={`w-5 h-5 shrink-0 ${method === "card" ? "text-primary" : "text-text-muted"}`} />
                  <div>
                    <p className="font-semibold text-text-primary text-sm">Card</p>
                    <p className="text-text-muted text-xs">Test mode — no real charge</p>
                  </div>
                </button>
              </div>

              {error && (
                <div className="mb-4 rounded-[var(--radius-control)] bg-danger-subtle border border-danger/30 text-danger px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              {method === "esewa" ? (
                <div>
                  <p className="text-text-secondary text-sm mb-4">
                    You'll be redirected to eSewa to complete this payment securely, then returned here.
                  </p>
                  <Button fullWidth loading={paying} onClick={payWithEsewa}>
                    Pay {formatNPR(booking.grandTotal)} with eSewa
                  </Button>
                </div>
              ) : (
                <form onSubmit={payWithCard} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1.5">
                      Name on Card
                    </label>
                    <input
                      required
                      value={card.name}
                      onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
                      placeholder="Guest Name"
                      className="w-full rounded-[var(--radius-control)] border border-border bg-bg-sunken text-text-primary placeholder-text-muted px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1.5">
                      Card Number
                    </label>
                    <input
                      required
                      inputMode="numeric"
                      pattern="[0-9 ]{12,19}"
                      value={card.number}
                      onChange={(e) => setCard((c) => ({ ...c, number: e.target.value }))}
                      placeholder="4242 4242 4242 4242"
                      className="w-full rounded-[var(--radius-control)] border border-border bg-bg-sunken text-text-primary placeholder-text-muted px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1.5">
                        Expiry
                      </label>
                      <input
                        required
                        pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                        value={card.expiry}
                        onChange={(e) => setCard((c) => ({ ...c, expiry: e.target.value }))}
                        placeholder="MM/YY"
                        className="w-full rounded-[var(--radius-control)] border border-border bg-bg-sunken text-text-primary placeholder-text-muted px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1.5">
                        CVV
                      </label>
                      <input
                        required
                        inputMode="numeric"
                        pattern="[0-9]{3,4}"
                        value={card.cvv}
                        onChange={(e) => setCard((c) => ({ ...c, cvv: e.target.value }))}
                        placeholder="123"
                        className="w-full rounded-[var(--radius-control)] border border-border bg-bg-sunken text-text-primary placeholder-text-muted px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                  <Button type="submit" fullWidth loading={paying}>
                    Pay {formatNPR(booking.grandTotal)}
                  </Button>
                </form>
              )}

              <p className="flex items-center gap-1.5 text-text-muted text-xs mt-5">
                <ShieldCheck className="w-3.5 h-3.5" /> Your payment details are never stored on our servers.
              </p>
            </Card>
          )}
        </div>

        {/* Receipt — right, sticky */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <div className="flex gap-3 mb-5 pb-5 border-b border-border">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-bg-secondary shrink-0">
                {room.image ? (
                  <img src={room.image} alt={room.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-text-muted">
                    <ImageOff className="w-5 h-5" />
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-text-primary truncate">{room.title || "Room"}</p>
                <p className="text-text-muted text-xs mt-0.5">Booking #{booking._id.slice(-6)}</p>
                <Badge tone={paid ? "success" : "warning"} className="mt-1.5">
                  {paid ? "Paid" : "Payment Pending"}
                </Badge>
              </div>
            </div>

            <div className="space-y-2.5 text-sm mb-5 pb-5 border-b border-border">
              <div className="flex justify-between">
                <span className="text-text-secondary">Check-in</span>
                <span className="text-text-primary font-medium">{formatDate(booking.checkIn)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Check-out</span>
                <span className="text-text-primary font-medium">{formatDate(booking.checkOut)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Guests</span>
                <span className="text-text-primary font-medium">{booking.guests}</span>
              </div>
            </div>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  {formatNPR(booking.pricePerNight)} × {booking.nights} night{booking.nights === 1 ? "" : "s"}
                </span>
                <span className="text-text-primary">{formatNPR(booking.totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Taxes</span>
                <span className="text-text-primary">{formatNPR(booking.taxes)}</span>
              </div>
              <div className="flex justify-between pt-2.5 border-t border-border font-semibold text-text-primary">
                <span>Total</span>
                <span>{formatNPR(booking.grandTotal)}</span>
              </div>
            </div>

            {!paid && (
              <Link
                to="/account"
                className="block text-center text-text-muted hover:text-text-primary text-xs mt-5"
              >
                Pay later from My Bookings
              </Link>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
