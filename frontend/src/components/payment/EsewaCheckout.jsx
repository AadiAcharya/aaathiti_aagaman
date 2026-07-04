import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bookingsAPI, paymentsAPI } from "../../services/api";
import { formatNPR } from "../../utils/currency";
import PasswordInput from "../common/PasswordInput";
import Skeleton from "../ui/Skeleton";
import { Loader2 } from "lucide-react";

// A lookalike of eSewa's hosted checkout page, built for demo purposes —
// this project has no live merchant credentials for the real gateway, so
// any ID/password submitted here simply confirms the booking's payment,
// the same way the "Card" option on the payment page does.
export default function EsewaCheckout() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [esewaId, setEsewaId] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState("login"); // "login" | "processing"
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
      return;
    }
    (async () => {
      try {
        const { booking: b } = await bookingsAPI.getById(bookingId);
        setBooking(b);
      } catch (err) {
        setError(err.message || "Booking not found");
      } finally {
        setLoading(false);
      }
    })();
  }, [bookingId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!esewaId.trim() || !password.trim()) {
      setError("Please enter your eSewa ID and password");
      return;
    }
    setError("");
    setStep("processing");
    try {
      await paymentsAPI.confirmPayment({
        bookingId,
        paymentIntentId: `esewa_demo_${Date.now()}`,
      });
      // A short, deliberate pause so the "processing" state reads as real.
      setTimeout(() => navigate(`/payment/${bookingId}`), 1200);
    } catch (err) {
      setStep("login");
      setError(err.message || "Payment failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f2f2f2]">
        <Skeleton className="h-96 w-full max-w-sm" />
      </div>
    );
  }

  if (error && !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f2f2f2] px-6">
        <p className="text-danger font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2f2f2] flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-9 h-9 rounded-full bg-[#60bb46] flex items-center justify-center text-white font-bold text-lg">
            e
          </div>
          <span className="text-2xl font-bold text-[#333]">
            e<span className="text-[#60bb46]">Sewa</span>
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#60bb46] px-6 py-4 text-white">
            <p className="text-xs opacity-90">Paying</p>
            <p className="text-xl font-bold">{formatNPR(booking.grandTotal)}</p>
            <p className="text-xs opacity-90 mt-1">to Aathiti Aagaman</p>
          </div>

          {step === "processing" ? (
            <div className="px-6 py-14 flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 text-[#60bb46] animate-spin" />
              <p className="text-[#333] font-medium text-sm">Verifying your payment…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
              {error && (
                <div className="rounded-md bg-red-50 border border-red-200 text-red-600 px-3 py-2 text-xs">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-xs font-semibold text-[#555] mb-1.5">
                  eSewa ID (Mobile Number)
                </label>
                <input
                  value={esewaId}
                  onChange={(e) => setEsewaId(e.target.value)}
                  placeholder="98XXXXXXXX"
                  className="w-full rounded-md border border-[#ccc] px-3 py-2.5 text-sm text-[#333] outline-none focus:border-[#60bb46] focus:ring-2 focus:ring-[#60bb46]/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#555] mb-1.5">Password</label>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-md border border-[#ccc] px-3 py-2.5 text-sm text-[#333] outline-none focus:border-[#60bb46] focus:ring-2 focus:ring-[#60bb46]/20"
                  iconColorClass="text-[#999] hover:text-[#666]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#60bb46] hover:bg-[#549e3d] text-white font-semibold text-sm rounded-md py-3 transition-colors"
              >
                Login &amp; Pay {formatNPR(booking.grandTotal)}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/payment/${bookingId}`)}
                className="w-full text-center text-xs text-[#888] hover:text-[#555] pt-1"
              >
                Cancel and go back
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-[10px] text-[#999] mt-6">
          Demo checkout — no real eSewa account is used or contacted.
        </p>
      </div>
    </div>
  );
}
