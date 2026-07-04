import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { paymentsAPI } from "../../services/api";
import Spinner from "../ui/Spinner";
import Button from "../ui/Button";

// eSewa redirects the browser here (success_url and failure_url both point
// here) with a `?data=` param — a base64 JSON blob, signed with our shared
// secret. We hand it to the backend to verify before trusting any of it,
// then forward to the booking's payment page either way.
export default function EsewaReturn() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying"); // "verifying" | "error"
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const data = params.get("data");

      if (!data) {
        setStatus("error");
        setError("eSewa did not return any payment data — the payment may have been cancelled.");
        return;
      }

      try {
        const res = await paymentsAPI.verifyEsewaReturn(data);
        navigate(`/payment/${res.booking._id}`, { replace: true });
      } catch (err) {
        setStatus("error");
        setError(err.message || "Could not verify the eSewa payment");
      }
    })();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        {status === "verifying" ? (
          <>
            <Spinner size="lg" className="mx-auto mb-4" />
            <p className="text-text-primary font-medium">Verifying your eSewa payment…</p>
          </>
        ) : (
          <>
            <p className="text-danger font-semibold mb-2">Payment verification failed</p>
            <p className="text-text-secondary text-sm mb-6">{error}</p>
            <Button variant="secondary" onClick={() => navigate("/account")}>
              Go to My Bookings
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
