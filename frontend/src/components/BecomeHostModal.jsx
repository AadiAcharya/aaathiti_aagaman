import { useState } from "react";

export default function BecomeHostModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);

  const checkVerification = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const checks = {
        isLoggedIn: !!user.id,
      };

      const allVerified = checks.isLoggedIn;

      return { checks, allVerified };
    } catch {
      return {
        checks: {
          isLoggedIn: false,
        },
        allVerified: false,
      };
    }
  };

  const handleSubmit = () => {
    const { checks } = checkVerification();

    if (!checks.isLoggedIn) {
      alert("Please sign in first to become a host");
      return;
    }

    // Save host request to localStorage (will be sent to backend)
    const hostRequest = {
      userId: JSON.parse(localStorage.getItem("user")).id,
      status: "pending",
      submittedAt: new Date().toISOString(),
      message: "Your request to become a host is under review",
    };
    localStorage.setItem("hostRequest", JSON.stringify(hostRequest));
    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-8 max-w-md w-full mx-4 border border-primary/20">
        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold text-text-primary mb-4">
              Become a Host
            </h2>

            <p className="text-text-secondary mb-6">
              Ready to start hosting? Click the button below to submit your
              request. Our team will review your application and get back to you
              soon.
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-primary/30 text-text-secondary rounded-lg hover:bg-primary/5 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 rounded-lg font-semibold transition bg-accent text-background hover:bg-accent/90"
              >
                Submit Request
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-text-primary mb-3">
                Request Submitted!
              </h2>
              <p className="text-text-secondary mb-6">
                Your request to become a host has been submitted and is under
                review. You'll be notified once approved.
              </p>
              <button
                onClick={onClose}
                className="w-full px-4 py-2 bg-primary text-background rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
