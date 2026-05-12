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
        theme === "dark" ? "bg-background" : "bg-gray-50"
      }`}
    >
      {/* Header Banner */}
      <div
        className={`h-40 ${
          theme === "dark"
            ? "bg-gradient-to-r from-primary to-primary-hover"
            : "bg-gradient-to-r from-blue-500 to-blue-600"
        }`}
      ></div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        {/* Profile Header */}
        <div className="relative -mt-20 mb-8">
          <div
            className={`rounded-2xl p-6 shadow-xl border ${
              theme === "dark"
                ? "bg-bg-secondary border-primary/10"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-end">
              {/* Avatar */}
              <div
                className={`w-24 h-24 rounded-full flex items-center justify-center text-5xl font-bold text-white ${
                  theme === "dark" ? "bg-primary" : "bg-blue-500"
                }`}
              >
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h1
                  className={`text-4xl font-bold mb-2 ${
                    theme === "dark" ? "text-text-primary" : "text-gray-900"
                  }`}
                >
                  {user.name}
                </h1>
                <p
                  className={`text-sm mb-3 ${
                    theme === "dark" ? "text-text-secondary" : "text-gray-600"
                  }`}
                >
                  Member since{" "}
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "2024"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {user.emailVerified && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        theme === "dark"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      ✅ Email Verified
                    </span>
                  )}
                  {user.role === "host" && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        theme === "dark"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      🏠 Host
                    </span>
                  )}
                  {user.role === "admin" && (
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        theme === "dark"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      👑 Admin
                    </span>
                  )}
                </div>
              </div>

              {/* Edit Button */}
              {!editMode && (
                <button
                  onClick={() => setEditMode(true)}
                  className={`px-6 py-2 rounded-lg font-semibold transition text-white ${
                    theme === "dark"
                      ? "bg-primary hover:bg-primary-hover"
                      : "bg-blue-500 hover:bg-blue-600"
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
            theme === "dark" ? "border-primary/10" : "border-gray-200"
          }`}
        >
          {["personal", "preferences", "security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold capitalize border-b-2 transition ${
                activeTab === tab
                  ? theme === "dark"
                    ? "border-primary text-primary"
                    : "border-blue-500 text-blue-600"
                  : theme === "dark"
                    ? "border-transparent text-text-secondary hover:text-text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
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
              ? "bg-bg-secondary border-primary/10"
              : "bg-white border-gray-200"
          }`}
        >
          {/* Personal Info Tab */}
          {activeTab === "personal" && (
            <div className="space-y-6">
              <h2
                className={`text-2xl font-bold mb-6 ${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                }`}
              >
                Personal Information
              </h2>

              {editMode ? (
                <>
                  <div>
                    <label
                      className={`block font-semibold mb-2 ${
                        theme === "dark"
                          ? "text-text-secondary"
                          : "text-gray-700"
                      }`}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                      className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                        theme === "dark"
                          ? "bg-background border-primary/20 focus:ring-primary text-text-primary"
                          : "bg-gray-50 border-gray-300 focus:ring-blue-500 text-gray-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block font-semibold mb-2 ${
                        theme === "dark"
                          ? "text-text-secondary"
                          : "text-gray-700"
                      }`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleInputChange}
                      className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                        theme === "dark"
                          ? "bg-background border-primary/20 focus:ring-primary text-text-primary"
                          : "bg-gray-50 border-gray-300 focus:ring-blue-500 text-gray-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block font-semibold mb-2 ${
                        theme === "dark"
                          ? "text-text-secondary"
                          : "text-gray-700"
                      }`}
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone || ""}
                      onChange={handleInputChange}
                      className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                        theme === "dark"
                          ? "bg-background border-primary/20 focus:ring-primary text-text-primary"
                          : "bg-gray-50 border-gray-300 focus:ring-blue-500 text-gray-900"
                      }`}
                    />
                  </div>

                  <div>
                    <label
                      className={`block font-semibold mb-2 ${
                        theme === "dark"
                          ? "text-text-secondary"
                          : "text-gray-700"
                      }`}
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleInputChange}
                      className={`w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ${
                        theme === "dark"
                          ? "bg-background border-primary/20 focus:ring-primary text-text-primary"
                          : "bg-gray-50 border-gray-300 focus:ring-blue-500 text-gray-900"
                      }`}
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleSaveProfile}
                      className={`px-6 py-2 rounded-lg font-semibold transition text-white ${
                        theme === "dark"
                          ? "bg-primary hover:bg-primary-hover"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className={`px-6 py-2 rounded-lg font-semibold transition ${
                        theme === "dark"
                          ? "bg-primary/20 text-primary hover:bg-primary/30"
                          : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <InfoItem label="Full Name" value={user.name} />
                  <InfoItem label="Email Address" value={user.email} />
                  <InfoItem label="Phone Number" value={user.phone} />
                  <InfoItem label="Address" value={user.address} />
                </div>
              )}
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === "preferences" && (
            <div className="space-y-8">
              <h2
                className={`text-2xl font-bold mb-6 ${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                }`}
              >
                Preferences
              </h2>
              <PreferenceItem
                label="Language"
                description="Choose your preferred language"
                value="English"
              />
              <PreferenceItem
                label="Currency"
                description="Set your default currency for payments"
                value="USD"
              />
              <TogglePreference
                label="Email Notifications"
                description="Receive updates about your bookings and account"
                enabled={true}
              />
              <TogglePreference
                label="Promotional Emails"
                description="Get news, special offers, and travel tips"
                enabled={false}
              />
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-8">
              <h2
                className={`text-2xl font-bold mb-6 ${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                }`}
              >
                Security
              </h2>
              <SecurityItem
                label="Change Password"
                description="Update your password regularly to keep your account secure"
                actionText="Change"
                onAction={() => alert("Redirect to change password page")}
              />
              <SecurityItem
                label="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
                actionText="Enable"
                onAction={() => alert("Show 2FA setup modal")}
              />
              <SecurityItem
                label="Login History"
                description="Review recent login activity on your account"
                actionText="View History"
                onAction={() => alert("Show login history")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const InfoItem = ({ label, value }) => {
  const { theme } = useTheme();
  return (
    <div>
      <p
        className={`text-sm font-semibold mb-1 ${
          theme === "dark" ? "text-text-secondary" : "text-gray-600"
        }`}
      >
        {label}
      </p>
      <p
        className={`text-lg ${
          theme === "dark" ? "text-text-primary" : "text-gray-900"
        }`}
      >
        {value || "Not set"}
      </p>
    </div>
  );
};

const PreferenceItem = ({ label, description, value }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`flex justify-between items-center p-4 rounded-lg ${
        theme === "dark" ? "bg-background" : "bg-gray-50"
      } border ${theme === "dark" ? "border-primary/10" : "border-gray-200"}`}
    >
      <div>
        <p
          className={`font-semibold ${
            theme === "dark" ? "text-text-primary" : "text-gray-900"
          }`}
        >
          {label}
        </p>
        <p
          className={`text-sm ${
            theme === "dark" ? "text-text-secondary" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <p
          className={`font-semibold ${
            theme === "dark" ? "text-text-primary" : "text-gray-800"
          }`}
        >
          {value}
        </p>
        <button
          className={`text-sm font-semibold ${
            theme === "dark"
              ? "text-primary hover:underline"
              : "text-blue-600 hover:underline"
          }`}
        >
          Change
        </button>
      </div>
    </div>
  );
};

const TogglePreference = ({ label, description, enabled }) => {
  const { theme } = useTheme();
  const [isEnabled, setIsEnabled] = useState(enabled);

  return (
    <div
      className={`flex justify-between items-center p-4 rounded-lg ${
        theme === "dark" ? "bg-background" : "bg-gray-50"
      } border ${theme === "dark" ? "border-primary/10" : "border-gray-200"}`}
    >
      <div>
        <p
          className={`font-semibold ${
            theme === "dark" ? "text-text-primary" : "text-gray-900"
          }`}
        >
          {label}
        </p>
        <p
          className={`text-sm ${
            theme === "dark" ? "text-text-secondary" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      </div>
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        className={`w-14 h-8 rounded-full p-1 transition-colors ${
          isEnabled
            ? theme === "dark"
              ? "bg-primary"
              : "bg-blue-600"
            : theme === "dark"
              ? "bg-slate-600"
              : "bg-gray-300"
        }`}
      >
        <span
          className={`block w-6 h-6 rounded-full bg-white transform transition-transform ${
            isEnabled ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

const SecurityItem = ({ label, description, actionText, onAction }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`flex justify-between items-center p-4 rounded-lg ${
        theme === "dark" ? "bg-background" : "bg-gray-50"
      } border ${theme === "dark" ? "border-primary/10" : "border-gray-200"}`}
    >
      <div>
        <p
          className={`font-semibold ${
            theme === "dark" ? "text-text-primary" : "text-gray-900"
          }`}
        >
          {label}
        </p>
        <p
          className={`text-sm ${
            theme === "dark" ? "text-text-secondary" : "text-gray-600"
          }`}
        >
          {description}
        </p>
      </div>
      <button
        onClick={onAction}
        className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${
          theme === "dark"
            ? "bg-primary/20 text-primary hover:bg-primary/30"
            : "bg-blue-100 text-blue-800 hover:bg-blue-200"
        }`}
      >
        {actionText}
      </button>
    </div>
  );
};
