import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [showPassword, setShowPassword]         = useState(false);
  const [showConfirmPassword, setShowConfirm]   = useState(false);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
    if (apiError) setApiError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim())            newErrors.name            = "Name is required";
    if (!form.email.trim())           newErrors.email           = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                      newErrors.email           = "Invalid email format";
    if (!form.password)               newErrors.password        = "Password is required";
    else if (form.password.length < 8) newErrors.password       = "Password must be at least 8 characters";
    if (!form.confirmPassword)        newErrors.confirmPassword = "Please confirm your password";
    else if (form.password !== form.confirmPassword)
                                      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      setApiError("");
      const { token, user } = await authAPI.register({
        name:     form.name,
        email:    form.email,
        password: form.password,
        role:     form.role,
      });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "host") navigate("/room-status");
      else navigate("/");
    } catch (err) {
      setApiError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary transition bg-background text-text-primary ${
      errors[field] ? "border-2 border-red-400" : "border border-gray-700"
    } disabled:opacity-60`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text-primary py-10">
      <div className="w-full max-w-md bg-bg-secondary rounded-2xl shadow-lg p-8 space-y-5 border border-gray-700">

        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-3xl font-bold text-text-primary">Create Account</h2>
          <p className="text-sm text-text-secondary">Join us today and start exploring</p>
        </div>

        <hr className="border-gray-700" />

        {/* API Error */}
        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-text-secondary">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
              className={inputClass("name")}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-text-secondary">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              className={inputClass("email")}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1 text-sm font-medium text-text-secondary">I want to</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary border border-gray-700 bg-background text-text-primary disabled:opacity-60"
            >
              <option value="user">Book properties (Guest)</option>
              <option value="host">List my property (Host)</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-text-secondary">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                disabled={loading}
                className={inputClass("password") + " pr-10"}
                placeholder="At least 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-lg text-text-secondary transition hover:text-text-primary"
              >
                {showPassword ? "🙈" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-text-secondary">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                className={inputClass("confirmPassword") + " pr-10"}
                placeholder="Re-enter your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-lg text-text-secondary transition hover:text-text-primary"
              >
                {showConfirmPassword ? "🙈" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white rounded-full px-6 py-3 font-semibold transition hover:bg-primary-hover disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating account...
              </>
            ) : "Sign Up"}
          </button>
        </form>

        <hr className="border-gray-700" />

        <div className="text-center">
          <p className="text-sm text-text-secondary">
            Already have an account?{" "}
            <Link to="/sign-in" className="font-semibold hover:underline text-primary">
              Sign In
            </Link>
          </p>
        </div>

        <div className="text-xs text-text-secondary text-center">
          By signing up, you agree to our{" "}
          <span className="underline cursor-pointer">Terms of Service</span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </div>
      </div>
    </div>
  );
};

export default SignUp;