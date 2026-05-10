import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authAPI } from "../../services/api";

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

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
      localStorage.setItem("user", JSON.stringify(user));
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
    <div className="min-h-screen flex items-center justify-center bg-background text-text-primary">
      <div className="w-full max-w-md bg-bg-secondary rounded-2xl shadow-lg p-8 space-y-6 border border-gray-700">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-text-secondary text-base">
            Sign in to access your account, manage bookings, and enjoy personalized recommendations.
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
            <label className="block text-text-secondary mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border border-gray-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary bg-background text-text-primary disabled:opacity-60"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-text-secondary mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full border border-gray-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary bg-background text-text-primary disabled:opacity-60"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-between items-center">
            <Link to="/sign-up" className="text-primary hover:underline text-sm">
              Don't have an account? Sign Up
            </Link>
            <button type="button" className="text-text-secondary hover:underline text-sm">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary-hover transition font-semibold mt-2 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </>
            ) : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 text-sm text-text-secondary">
          <hr className="flex-1 border-gray-700" />
          <span className="whitespace-nowrap">or continue with</span>
          <hr className="flex-1 border-gray-700" />
        </div>

        {/* Social Buttons */}
        <div className="flex gap-2 text-text-secondary">
          {["Facebook", "Apple ID", "Google"].map((provider) => (
            <button
              key={provider}
              className="flex-1 flex items-center justify-center gap-2 border border-gray-700 py-2 rounded-lg hover:bg-bg-secondary bg-background transition text-sm"
            >
              {provider}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-xs text-text-secondary text-center">
          By signing in, you agree to our{" "}
          <span className="underline cursor-pointer">Terms of Service</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </div>

        <div className="text-center text-xs text-text-muted">
          Demo seed accounts: <strong>host@hotel.com</strong> / host1234 &nbsp;|&nbsp; <strong>admin@hotel.com</strong> / admin123
        </div>
      </div>
    </div>
  );
};

export default SignIn;