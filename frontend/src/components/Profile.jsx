import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Profile() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [formData, setFormData] = useState(user || {});

  // Redirect if not logged in
  if (!user) {
    navigate("/");
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveProfile = () => {
    const updatedUser = { ...user, ...formData };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setEditMode(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setEditMode(false);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-900 text-slate-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header Banner */}
      <div
        className={`h-40 ${
          theme === "dark"
            ? "bg-gradient-to-r from-blue-600 to-blue-800"
            : "bg-gradient-to-r from-blue-500 to-blue-700"
        }`}
      ></div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        {/* Profile Header */}
        <div className="relative -mt-20 mb-8">
          <div
            className={`rounded-2xl p-6 shadow-xl border ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end">
              {/* Avatar */}
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl font-bold text-white ${
                  theme === "dark" ? "bg-blue-600" : "bg-blue-500"
                }`}
              >
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
                <p
                  className={`text-sm mb-3 ${
                    theme === "dark" ? "text-slate-400" : "text-gray-600"
                  }`}
                >
                  Member since{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "2024"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {user.emailVerified && (
                    <span className="px-3 py-1 bg-green-500/20 text-green-600 rounded-full text-xs font-semibold">
                      ✅ Email Verified
                    </span>
                  )}
                  {user.role === "host" && (
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-600 rounded-full text-xs font-semibold">
                      🏠 Host
                    </span>
                  )}
                  {user.role === "admin" && (
                    <span className="px-3 py-1 bg-red-500/20 text-red-600 rounded-full text-xs font-semibold">
                      👑 Admin
                    </span>
                  )}
                </div>
              </div>

              {/* Edit Button */}
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className={`px-6 py-2 rounded-lg font-semibold transition ${
                    theme === "dark"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  ✏️ Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          className={`flex gap-4 mb-6 border-b ${
            theme === "dark" ? "border-slate-700" : "border-gray-200"
          }`}
        >
          {["personal", "preferences", "security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold capitalize border-b-2 transition ${
                activeTab === tab
                  ? theme === "dark"
                    ? "border-blue-600 text-blue-400"
                    : "border-blue-500 text-blue-600"
                  : theme === "dark"
                    ? "border-transparent text-slate-400 hover:text-slate-300"
                    : "border-transparent text-gray-600 hover:text-gray-700"
              }`}
            >
              {tab === "personal" && "👤 Personal Info"}
              {tab === "preferences" && "⚙️ Preferences"}
              {tab === "security" && "🔒 Security"}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div
          className={`rounded-2xl p-8 shadow-lg border ${
            theme === "dark"
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-gray-200"
          }`}
        >
          {/* Personal Info Tab */}
          {activeTab === "personal" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Personal Information</h2>

              {editMode ? (
                <>
                  <div>
                    <label className="block font-semibold mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                      className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                        theme === "dark"
                          ? "bg-slate-700 border-slate-600 focus:ring-blue-600"
                          : "bg-gray-50 border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                        theme === "dark"
                          ? "bg-slate-700 border-slate-600 focus:ring-blue-600"
                          : "bg-gray-50 border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                        theme === "dark"
                          ? "bg-slate-700 border-slate-600 focus:ring-blue-600"
                          : "bg-gray-50 border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio || ""}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself..."
                      rows="4"
                      className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                        theme === "dark"
                          ? "bg-slate-700 border-slate-600 focus:ring-blue-600"
                          : "bg-gray-50 border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSaveProfile}
                      className={`px-6 py-2 rounded-lg font-semibold transition text-white ${
                        theme === "dark"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      ✅ Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className={`px-6 py-2 rounded-lg font-semibold transition ${
                        theme === "dark"
                          ? "bg-slate-700 hover:bg-slate-600 text-slate-200"
                          : "bg-gray-300 hover:bg-gray-400 text-gray-800"
                      }`}
                    >
                      ❌ Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p
                        className={`text-sm font-semibold uppercase tracking-wide ${
                          theme === "dark" ? "text-slate-400" : "text-gray-600"
                        }`}
                      >
                        Email
                      </p>
                      <p className="text-lg mt-1">{user.email}</p>
                    </div>
                    <div>
                      <p
                        className={`text-sm font-semibold uppercase tracking-wide ${
                          theme === "dark" ? "text-slate-400" : "text-gray-600"
                        }`}
                      >
                        Phone
                      </p>
                      <p className="text-lg mt-1">
                        {user.phone || "Not provided"}
                      </p>
                    </div>
                  </div>

                  {user.bio && (
                    <div className="mt-6">
                      <p
                        className={`text-sm font-semibold uppercase tracking-wide ${
                          theme === "dark" ? "text-slate-400" : "text-gray-600"
                        }`}
                      >
                        Bio
                      </p>
                      <p className="text-base mt-2 leading-relaxed">
                        {user.bio}
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Preferences</h2>

              <div className="space-y-4">
                <div
                  className={`p-4 rounded-lg border flex items-center justify-between ${
                    theme === "dark"
                      ? "bg-slate-700/50 border-slate-600"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div>
                    <p className="font-semibold">Email Notifications</p>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-slate-400" : "text-gray-600"
                      }`}
                    >
                      Receive updates about your bookings
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>

                <div
                  className={`p-4 rounded-lg border flex items-center justify-between ${
                    theme === "dark"
                      ? "bg-slate-700/50 border-slate-600"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div>
                    <p className="font-semibold">Marketing Communications</p>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-slate-400" : "text-gray-600"
                      }`}
                    >
                      Get special offers and new property alerts
                    </p>
                  </div>
                  <input type="checkbox" className="w-5 h-5 cursor-pointer" />
                </div>

                <div
                  className={`p-4 rounded-lg border flex items-center justify-between ${
                    theme === "dark"
                      ? "bg-slate-700/50 border-slate-600"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div>
                    <p className="font-semibold">Message Notifications</p>
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-slate-400" : "text-gray-600"
                      }`}
                    >
                      Get notified when hosts or guests message you
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold mb-4">Language & Region</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold mb-2">Language</label>
                    <select
                      className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                        theme === "dark"
                          ? "bg-slate-700 border-slate-600 focus:ring-blue-600"
                          : "bg-gray-50 border-gray-300 focus:ring-blue-500"
                      }`}
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>Hindi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-2">Currency</label>
                    <select
                      className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                        theme === "dark"
                          ? "bg-slate-700 border-slate-600 focus:ring-blue-600"
                          : "bg-gray-50 border-gray-300 focus:ring-blue-500"
                      }`}
                    >
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>INR (₹)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Security & Privacy</h2>

              <div className="space-y-4">
                <div
                  className={`p-4 rounded-lg border ${
                    theme === "dark"
                      ? "bg-slate-700/50 border-slate-600"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">Change Password</p>
                      <p
                        className={`text-sm ${
                          theme === "dark" ? "text-slate-400" : "text-gray-600"
                        }`}
                      >
                        Update your password regularly for security
                      </p>
                    </div>
                  </div>
                  <button
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      theme === "dark"
                        ? "bg-slate-700 hover:bg-slate-600 text-slate-200"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  >
                    Update Password
                  </button>
                </div>

                <div
                  className={`p-4 rounded-lg border ${
                    theme === "dark"
                      ? "bg-slate-700/50 border-slate-600"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">Two-Factor Authentication</p>
                      <p
                        className={`text-sm ${
                          theme === "dark" ? "text-slate-400" : "text-gray-600"
                        }`}
                      >
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <button
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      theme === "dark"
                        ? "bg-slate-700 hover:bg-slate-600 text-slate-200"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  >
                    Enable 2FA
                  </button>
                </div>

                <div
                  className={`p-4 rounded-lg border ${
                    theme === "dark"
                      ? "bg-slate-700/50 border-slate-600"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold">Login Activity</p>
                      <p
                        className={`text-sm ${
                          theme === "dark" ? "text-slate-400" : "text-gray-600"
                        }`}
                      >
                        View your recent login activity
                      </p>
                    </div>
                  </div>
                  <button
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      theme === "dark"
                        ? "bg-slate-700 hover:bg-slate-600 text-slate-200"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  >
                    View Activity
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-bold mb-4 text-red-600">
                  Danger Zone
                </h3>
                <button
                  className={`px-6 py-2 rounded-lg font-semibold transition text-white ${
                    theme === "dark"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  🗑️ Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
