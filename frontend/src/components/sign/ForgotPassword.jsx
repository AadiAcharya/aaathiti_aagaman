import { Link } from "react-router-dom";
import { useState } from "react";
import { authAPI } from "../../services/api";
import { useTheme } from "../../context/ThemeContext";

const ForgotPassword = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    try {
      setLoading(true);
      setError("");
      await authAPI.forgotPassword(email);
      setSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        theme === "dark" ? "bg-background" : "bg-gray-50"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-2xl shadow-lg p-8 space-y-6 border ${
          theme === "dark"
            ? "bg-bg-secondary border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="text-center">
          <h2
            className={`text-3xl font-bold mb-2 ${
              theme === "dark" ? "text-text-primary" : "text-gray-900"
            }`}
          >
            Forgot Password?
          </h2>
          <p
            className={`text-base ${
              theme === "dark" ? "text-text-secondary" : "text-gray-600"
            }`}
          >
            Enter your email and we'll send you a link to reset your
            password.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {sent ? (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
            If an account with that email exists, a reset link has been
            sent. Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className={`block mb-1 ${
                  theme === "dark" ? "text-text-secondary" : "text-gray-700"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 ${
                  theme === "dark"
                    ? "border-gray-700 bg-background text-text-primary"
                    : "border-gray-300 bg-gray-50 text-gray-900"
                }`}
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover disabled:opacity-50 transition duration-300"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        )}

        <div className="text-center">
          <Link
            to="/sign-in"
            className={`text-sm font-medium ${
              theme === "dark"
                ? "text-primary hover:text-primary-hover"
                : "text-blue-600 hover:text-blue-500"
            }`}
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
