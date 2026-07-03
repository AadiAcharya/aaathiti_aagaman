import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { authAPI } from "../../services/api";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

const ResetPassword = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { token } = useParams();
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const { token: authToken, user } = await authAPI.resetPassword(
        token,
        password,
      );
      login(user, authToken);
      navigate("/");
    } catch (err) {
      setError(err.message || "Reset link is invalid or has expired");
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
            Reset Password
          </h2>
          <p
            className={`text-base ${
              theme === "dark" ? "text-text-secondary" : "text-gray-600"
            }`}
          >
            Enter a new password for your account.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className={`block mb-1 ${
                theme === "dark" ? "text-text-secondary" : "text-gray-700"
              }`}
            >
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 ${
                theme === "dark"
                  ? "border-gray-700 bg-background text-text-primary"
                  : "border-gray-300 bg-gray-50 text-gray-900"
              }`}
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label
              className={`block mb-1 ${
                theme === "dark" ? "text-text-secondary" : "text-gray-700"
              }`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 ${
                theme === "dark"
                  ? "border-gray-700 bg-background text-text-primary"
                  : "border-gray-300 bg-gray-50 text-gray-900"
              }`}
              placeholder="Re-enter new password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover disabled:opacity-50 transition duration-300"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

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

export default ResetPassword;
