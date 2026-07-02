import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";
import { Home, DollarSign, Star, House, PartyPopper } from "lucide-react";

const STEPS = [
  {
    icon: Home,
    title: "List your space",
    desc: "Share your property with thousands of guests looking for their perfect stay.",
  },
  {
    icon: DollarSign,
    title: "Set your price",
    desc: "You're in full control. Set your own rates and availability calendar.",
  },
  {
    icon: Star,
    title: "Earn & grow",
    desc: "Get paid securely and build your reputation with guest reviews.",
  },
];

export default function BecomeHostModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user, updateUser } = useAuth();
  const [step, setStep] = useState(0); // 0 = intro, 1 = activated
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const isHost = user?.role === "host" || user?.role === "admin";

  const handleSubmit = async () => {
    if (!user) {
      onClose();
      navigate("/sign-in");
      return;
    }
    if (isHost) {
      onClose();
      navigate("/add-property");
      return;
    }
    try {
      setSubmitting(true);
      setError("");
      const { user: updated } = await authAPI.becomeHost();
      updateUser(updated);
      setStep(1);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStartListing = () => {
    onClose();
    navigate("/add-property");
  };

  const handleClose = () => {
    setStep(0);
    setError("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div
        className={`relative rounded-3xl shadow-2xl w-full max-w-lg border overflow-hidden ${
          theme === "dark"
            ? "bg-background border-text-muted/10"
            : "bg-white border-gray-200"
        }`}
      >

        {/* Close button */}
        <button
          onClick={handleClose}
          className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition z-10 ${
            theme === "dark"
              ? "bg-bg-secondary hover:bg-text-muted/20 text-text-secondary"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600"
          }`}
        >
          ✕
        </button>

        {step === 0 ? (
          <>
            {/* Header gradient */}
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 px-8 pt-10 pb-8 text-center">
              <House className="w-12 h-12 mb-4 mx-auto text-primary" />
              <h2
                className={`text-2xl font-bold mb-2 ${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                }`}
              >
                Become a Host
              </h2>
              <p
                className={`text-sm max-w-xs mx-auto ${
                  theme === "dark" ? "text-text-secondary" : "text-gray-600"
                }`}
              >
                Join thousands of hosts earning extra income by sharing their space on Aatithi Aagaman.
              </p>
            </div>

            {/* Steps */}
            <div className="px-8 py-6 space-y-4">
              {STEPS.map((s, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-4 p-4 rounded-2xl border ${
                    theme === "dark"
                      ? "bg-bg-secondary border-text-muted/10"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <s.icon className="w-8 h-8 shrink-0 text-primary" />
                  <div>
                    <p
                      className={`font-bold text-sm ${
                        theme === "dark" ? "text-text-primary" : "text-gray-900"
                      }`}
                    >
                      {s.title}
                    </p>
                    <p
                      className={`text-xs mt-0.5 leading-relaxed ${
                        theme === "dark" ? "text-text-secondary" : "text-gray-600"
                      }`}
                    >
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Already a host nudge */}
            {isHost && (
              <div className="mx-8 mb-4 p-3 bg-primary/10 border border-primary/20 rounded-xl text-center">
                <p className="text-primary text-sm font-semibold">
                  ✓ You're already a host! Go ahead and list a new property.
                </p>
              </div>
            )}

            {!user && (
              <div className="mx-8 mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-center">
                <p className="text-yellow-700 text-sm font-semibold">
                  You'll need to sign in first.
                </p>
              </div>
            )}

            {error && (
              <div className="mx-8 mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-center">
                <p className="text-red-700 text-sm font-semibold">{error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="px-8 pb-8 flex gap-3">
              <button
                onClick={handleClose}
                className={`flex-1 py-3 border-2 rounded-xl font-semibold text-sm transition ${
                  theme === "dark"
                    ? "border-text-muted/20 text-text-secondary hover:border-primary/30"
                    : "border-gray-200 text-gray-600 hover:border-primary/30"
                }`}
              >
                Maybe Later
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-sm transition shadow-lg shadow-primary/20 disabled:opacity-60"
              >
                {submitting
                  ? "Submitting..."
                  : isHost
                    ? "List a Property →"
                    : user
                      ? "Become a Host →"
                      : "Sign In to Continue →"}
              </button>
            </div>
          </>
        ) : (
          /* ── Success screen ───────────────────────────────────────────── */
          <div className="px-8 py-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <PartyPopper className="w-9 h-9 text-green-600" />
            </div>
            <h2
              className={`text-2xl font-bold mb-3 ${
                theme === "dark" ? "text-text-primary" : "text-gray-900"
              }`}
            >
              You're a Host Now!
            </h2>
            <p
              className={`text-sm leading-relaxed mb-8 max-w-xs mx-auto ${
                theme === "dark" ? "text-text-secondary" : "text-gray-600"
              }`}
            >
              Your account has been upgraded. You can list your first property right away.
            </p>

            <div className="space-y-3">
              <button onClick={handleStartListing}
                className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-sm transition shadow-lg shadow-primary/20">
                Start Listing Now →
              </button>
              <button
                onClick={handleClose}
                className={`w-full py-3 border-2 rounded-xl font-semibold text-sm transition ${
                  theme === "dark"
                    ? "border-text-muted/20 text-text-secondary hover:border-primary/30"
                    : "border-gray-200 text-gray-600 hover:border-primary/30"
                }`}
              >
                I'll Do It Later
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
