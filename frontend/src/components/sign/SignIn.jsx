import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { authAPI } from "../../services/api";
import { useTheme } from "../../context/ThemeContext";

const SignIn = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const { token, user } = await authAPI.login(form);
      localStorage.setItem("token", token);

      // Add verification fields for BecomeHostModal
      const userWithVerification = {
        ...user,
        emailVerified: true,
        phoneVerified: true,
        idVerified: true,
        age: user.age || 25, // default age if not provided
      };
      localStorage.setItem("user", JSON.stringify(userWithVerification));

      // Redirect based on role
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "host") navigate("/room-status");
      else navigate("/");
    } catch (err) {
      setError(err.message || "Invalid email or password");
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
        {/* Header */}
        <div className="text-center">
          <h2
            className={`text-3xl font-bold mb-2 ${
              theme === "dark" ? "text-text-primary" : "text-gray-900"
            }`}
          >
            Welcome Back!
          </h2>
          <p
            className={`text-base ${
              theme === "dark" ? "text-text-secondary" : "text-gray-600"
            }`}
          >
            Sign in to access your account, manage bookings, and enjoy
            personalized recommendations.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
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
              name="email"
              value={form.email}
              onChange={handleChange}
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

          <div>
            <label
              className={`block mb-1 ${
                theme === "dark" ? "text-text-secondary" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={loading}
              className={`w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary disabled:opacity-60 ${
                theme === "dark"
                  ? "border-gray-700 bg-background text-text-primary"
                  : "border-gray-300 bg-gray-50 text-gray-900"
              }`}
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary-hover border-gray-600 rounded"
              />
              <label
                htmlFor="remember-me"
                className={`ml-2 block text-sm ${
                  theme === "dark" ? "text-text-secondary" : "text-gray-700"
                }`}
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className={`font-medium ${
                  theme === "dark"
                    ? "text-primary hover:text-primary-hover"
                    : "text-blue-600 hover:text-blue-500"
                }`}
              >
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover disabled:opacity-50 transition duration-300"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center">
          <div
            className={`w-full h-px ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
            }`}
          ></div>
          <p
            className={`mx-4 text-sm ${
              theme === "dark" ? "text-text-secondary" : "text-gray-500"
            }`}
          >
            OR
          </p>
          <div
            className={`w-full h-px ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
            }`}
          ></div>
        </div>

        {/* Social Logins */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center gap-3 border border-gray-700 rounded-lg px-3 py-2 hover:bg-gray-800 transition duration-300">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-6 h-6"
            />
            <span
              className={`${
                theme === "dark" ? "text-text-primary" : "text-gray-900"
              }`}
            >
              Sign in with Google
            </span>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p
            className={`text-sm ${
              theme === "dark" ? "text-text-secondary" : "text-gray-600"
            }`}
          >
            Don't have an account?{" "}
            <Link
              to="/signup"
              className={`font-medium ${
                theme === "dark"
                  ? "text-primary hover:text-primary-hover"
                  : "text-blue-600 hover:text-blue-500"
              }`}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
