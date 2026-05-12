import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api";
import { useTheme } from "../../context/ThemeContext";

const SignUp = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
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
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
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
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
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
    `w-full rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary transition disabled:opacity-60 ${
      theme === "dark"
        ? "bg-background text-text-primary"
        : "bg-gray-50 text-gray-900"
    } ${
      errors[field]
        ? "border-2 border-red-400"
        : `border ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`
    }`;

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-10 ${
        theme === "dark" ? "bg-background" : "bg-gray-50"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-2xl shadow-lg p-8 space-y-5 border ${
          theme === "dark"
            ? "bg-bg-secondary border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Header */}
        <div className="text-center space-y-1">
          <h2
            className={`text-3xl font-bold ${
              theme === "dark" ? "text-text-primary" : "text-gray-900"
            }`}
          >
            Create Account
          </h2>
          <p
            className={`text-sm ${
              theme === "dark" ? "text-text-secondary" : "text-gray-600"
            }`}
          >
            Join us today and start exploring
          </p>
        </div>

        <hr
          className={`${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
        />

        {/* API Error */}
        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label
              className={`block mb-1 text-sm font-medium ${
                theme === "dark" ? "text-text-secondary" : "text-gray-700"
              }`}
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={loading}
              className={inputClass("name")}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              className={`block mb-1 text-sm font-medium ${
                theme === "dark" ? "text-text-secondary" : "text-gray-700"
              }`}
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              className={inputClass("email")}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label
              className={`block mb-1 text-sm font-medium ${
                theme === "dark" ? "text-text-secondary" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
              className={inputClass("password") + " pr-10"}
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-200"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label
              className={`block mb-1 text-sm font-medium ${
                theme === "dark" ? "text-text-secondary" : "text-gray-700"
              }`}
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              className={inputClass("confirmPassword") + " pr-10"}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirmPassword)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-200"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Role Selection */}
          <div>
            <label
              className={`block mb-2 text-sm font-medium ${
                theme === "dark" ? "text-text-secondary" : "text-gray-700"
              }`}
            >
              I want to sign up as a...
            </label>
            <div className="flex gap-4">
              <label
                className={`flex items-center p-3 border rounded-lg cursor-pointer flex-1 ${
                  form.role === "user"
                    ? "border-primary bg-primary/10"
                    : theme === "dark"
                      ? "border-gray-700 hover:border-gray-600"
                      : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={form.role === "user"}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary-hover"
                />
                <span
                  className={`ml-3 font-medium ${
                    theme === "dark" ? "text-text-primary" : "text-gray-800"
                  }`}
                >
                  User
                </span>
              </label>
              <label
                className={`flex items-center p-3 border rounded-lg cursor-pointer flex-1 ${
                  form.role === "host"
                    ? "border-primary bg-primary/10"
                    : theme === "dark"
                      ? "border-gray-700 hover:border-gray-600"
                      : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value="host"
                  checked={form.role === "host"}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary-hover"
                />
                <span
                  className={`ml-3 font-medium ${
                    theme === "dark" ? "text-text-primary" : "text-gray-800"
                  }`}
                >
                  Host
                </span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover disabled:opacity-50 transition duration-300"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>

        {/* Sign In Link */}
        <div className="text-center">
          <p
            className={`text-sm ${
              theme === "dark" ? "text-text-secondary" : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <Link
              to="/signin"
              className={`font-medium ${
                theme === "dark"
                  ? "text-primary hover:text-primary-hover"
                  : "text-blue-600 hover:text-blue-500"
              }`}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
