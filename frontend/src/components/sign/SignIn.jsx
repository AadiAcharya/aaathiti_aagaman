import { Link } from "react-router-dom";
import React, { useState } from "react";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Signed in! (Demo only)");
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
              className="w-full border border-gray-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary bg-background text-text-primary"
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
              className="w-full border border-gray-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary bg-background text-text-primary"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-between items-center">
            <Link to="/sign-up" className="text-primary hover:underline text-sm">
              Don't have an account? Sign Up
            </Link>

            <button
              type="button"
              className="text-text-secondary hover:underline text-sm"
              onClick={() => alert("Password reset coming soon!")}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary-hover transition font-semibold mt-2"
          >
            Sign In
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
          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-700 py-2 rounded-lg hover:bg-bg-secondary bg-background transition">
            Facebook
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-700 py-2 rounded-lg hover:bg-bg-secondary bg-background transition">
            Apple ID
          </button>

          <button className="flex-1 flex items-center justify-center gap-2 border border-gray-700 py-2 rounded-lg hover:bg-bg-secondary bg-background transition">
            Google
          </button>
        </div>

        {/* Footer */}
        <div className="text-xs text-text-secondary text-center mt-4">
          By signing in, you agree to our{" "}
          <span className="underline cursor-pointer">Terms of Service</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </div>

        <div className="text-center mt-2">
          <span className="text-text-muted">
            Demo: Try signing in with any email and password.
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;