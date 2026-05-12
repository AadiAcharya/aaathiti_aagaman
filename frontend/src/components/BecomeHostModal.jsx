import { useState } from "react";
import { useNavigate } from "react-router-dom";

const STEPS = [
  {
    icon: "🏠",
    title: "List your space",
    desc: "Share your property with thousands of guests looking for their perfect stay.",
  },
  {
    icon: "💰",
    title: "Set your price",
    desc: "You're in full control. Set your own rates and availability calendar.",
  },
  {
    icon: "⭐",
    title: "Earn & grow",
    desc: "Get paid securely and build your reputation with guest reviews.",
  },
];

export default function BecomeHostModal({ isOpen, onClose }) {
  const navigate   = useNavigate();
  const [step, setStep] = useState(0); // 0 = intro, 1 = submitted

  if (!isOpen) return null;

  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user")) || null; }
    catch { return null; }
  })();

  const handleSubmit = () => {
    if (!user) {
      onClose();
      navigate("/sign-in");
      return;
    }
    // If already a host just go to listing flow
    if (user.role === "host") {
      onClose();
      navigate("/add-property");
      return;
    }
    // Save pending request
    localStorage.setItem("hostRequest", JSON.stringify({
      userId:      user._id || user.id,
      status:      "pending",
      submittedAt: new Date().toISOString(),
    }));
    setStep(1);
  };

  const handleStartListing = () => {
    onClose();
    navigate("/add-property");
  };

  const handleClose = () => {
    setStep(0);
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
      <div className="relative bg-background rounded-3xl shadow-2xl w-full max-w-lg border border-text-muted/10 overflow-hidden">

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-bg-secondary hover:bg-text-muted/20 text-text-secondary transition z-10"
        >
          ✕
        </button>

        {step === 0 ? (
          <>
            {/* Header gradient */}
            <div className="bg-gradient-to-br from-primary/20 to-accent/10 px-8 pt-10 pb-8 text-center">
              <div className="text-5xl mb-4">🏡</div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Become a Host
              </h2>
              <p className="text-text-secondary text-sm max-w-xs mx-auto">
                Join thousands of hosts earning extra income by sharing their space on Aatithi Aagaman.
              </p>
            </div>

            {/* Steps */}
            <div className="px-8 py-6 space-y-4">
              {STEPS.map((s, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-bg-secondary rounded-2xl border border-text-muted/10">
                  <div className="text-3xl shrink-0">{s.icon}</div>
                  <div>
                    <p className="font-bold text-text-primary text-sm">{s.title}</p>
                    <p className="text-text-secondary text-xs mt-0.5 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Already a host nudge */}
            {user?.role === "host" && (
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

            {/* Actions */}
            <div className="px-8 pb-8 flex gap-3">
              <button onClick={handleClose}
                className="flex-1 py-3 border-2 border-text-muted/20 text-text-secondary rounded-xl font-semibold text-sm hover:border-primary/30 transition">
                Maybe Later
              </button>
              <button onClick={handleSubmit}
                className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-sm transition shadow-lg shadow-primary/20">
                {user?.role === "host" ? "List a Property →" : user ? "Submit Request →" : "Sign In to Continue →"}
              </button>
            </div>
          </>
        ) : (
          /* ── Success screen ───────────────────────────────────────────── */
          <div className="px-8 py-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
              🎉
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-3">
              Request Submitted!
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-8 max-w-xs mx-auto">
              Your host application is under review. You'll be notified once approved — usually within 24 hours.
            </p>

            <div className="space-y-3">
              <button onClick={handleStartListing}
                className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-sm transition shadow-lg shadow-primary/20">
                Start Listing Now →
              </button>
              <button onClick={handleClose}
                className="w-full py-3 border-2 border-text-muted/20 text-text-secondary rounded-xl font-semibold text-sm hover:border-primary/30 transition">
                I'll Do It Later
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}