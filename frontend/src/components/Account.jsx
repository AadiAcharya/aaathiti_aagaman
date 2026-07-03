import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { authAPI, bookingsAPI, roomsAPI } from "../services/api";
import { User, Calendar, Lock, Settings, DoorOpen, Luggage, Star } from "lucide-react";
import { formatNPR } from "../utils/currency";

const TAB_LIST = [
  { id: "profile", label: "Profile", icon: User },
  { id: "bookings", label: "Bookings", icon: Calendar },
  { id: "security", label: "Security", icon: Lock },
  { id: "prefs", label: "Preferences", icon: Settings },
];

export default function Account() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { user, updateUser, logout: authLogout } = useAuth();

  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loadingB, setLoadingB] = useState(false);
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState("");
  const [pwError, setPwError] = useState("");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    location: user?.location || "",
    work: user?.work || "",
    avatar: user?.avatar || "",
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/sign-in");
  }, [user, navigate]);

  // Load bookings when tab opens
  useEffect(() => {
    if (activeTab !== "bookings") return;
    const fetch = async () => {
      try {
        setLoadingB(true);
        const data = await bookingsAPI.getMine();
        const bookingsList = Array.isArray(data)
          ? data
          : data.bookings || data.data?.bookings || [];
        setBookings(bookingsList);
      } catch {
        setBookings([]);
      } finally {
        setLoadingB(false);
      }
    };
    fetch();
  }, [activeTab]);

  if (!user) return null;

  const set = (k, v) => setFormData((p) => ({ ...p, [k]: v }));

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      setSaveMsg("");
      const { user: updated } = await authAPI.updateProfile(formData);
      updateUser(updated);
      setEditMode(false);
      setSaveMsg("Profile updated successfully!");
      setTimeout(() => setSaveMsg(""), 3000);
    } catch (err) {
      setSaveMsg(err.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setPwError("");
    setPwMsg("");
    if (!pwForm.current || !pwForm.next) {
      setPwError("Fill in all fields");
      return;
    }
    if (pwForm.next !== pwForm.confirm) {
      setPwError("Passwords don't match");
      return;
    }
    if (pwForm.next.length < 8) {
      setPwError("Min 8 characters");
      return;
    }
    try {
      await authAPI.changePassword({
        currentPassword: pwForm.current,
        newPassword: pwForm.next,
      });
      setPwMsg("Password changed successfully!");
      setPwForm({ current: "", next: "", confirm: "" });
      setTimeout(() => setPwMsg(""), 3000);
    } catch (err) {
      setPwError(err.message || "Failed to change password");
    }
  };

  const handleLogout = () => {
    authLogout();
    navigate("/");
  };

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-background" : "bg-gray-50"
      }`}
    >
      {/* Page Header */}
      <div
        className={`${
          theme === "dark" ? "bg-bg-secondary" : "bg-white"
        } border-b ${
          theme === "dark" ? "border-primary/10" : "border-gray-200"
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full border-4 border-primary object-cover"
              />
            ) : (
              <div
                className={`w-20 h-20 rounded-full border-4 border-primary flex items-center justify-center text-2xl font-bold ${
                  theme === "dark"
                    ? "bg-primary/20 text-primary"
                    : "bg-primary/10 text-primary"
                }`}
              >
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
            <div>
              <h1
                className={`text-3xl font-bold ${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                }`}
              >
                {user.name}
              </h1>
              <p
                className={`${
                  theme === "dark" ? "text-text-secondary" : "text-gray-600"
                }`}
              >
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div
              className={`p-4 rounded-xl ${
                theme === "dark" ? "bg-bg-secondary" : "bg-white"
              } border ${
                theme === "dark" ? "border-primary/10" : "border-gray-200"
              }`}
            >
              <nav className="space-y-1">
                {TAB_LIST.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg font-semibold text-sm transition ${
                      activeTab === tab.id
                        ? "bg-primary text-white"
                        : theme === "dark"
                          ? "text-text-secondary hover:bg-primary/10 hover:text-text-primary"
                          : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </span>
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  className={`w-full text-left px-4 py-2.5 rounded-lg font-semibold text-sm transition ${
                    theme === "dark"
                      ? "text-red-400 hover:bg-red-500/10"
                      : "text-red-600 hover:bg-red-50"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    <DoorOpen className="w-4 h-4" />
                    Logout
                  </span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-3">
            <div
              className={`p-6 rounded-xl ${
                theme === "dark" ? "bg-bg-secondary" : "bg-white"
              } border ${
                theme === "dark" ? "border-primary/10" : "border-gray-200"
              }`}
            >
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2
                      className={`text-2xl font-bold ${
                        theme === "dark" ? "text-text-primary" : "text-gray-900"
                      }`}
                    >
                      Personal Information
                    </h2>
                    {!editMode && (
                      <button
                        onClick={() => setEditMode(true)}
                        className={`border-2 ${
                          theme === "dark"
                            ? "border-primary text-primary hover:bg-primary hover:text-white"
                            : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                        } px-5 py-2 rounded-full font-semibold transition text-sm`}
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InputField
                      label="Full Name"
                      value={formData.name}
                      onChange={(v) => set("name", v)}
                      disabled={!editMode}
                    />
                    <InputField
                      label="Email Address"
                      value={formData.email}
                      onChange={(v) => set("email", v)}
                      disabled={!editMode}
                      type="email"
                    />
                    <InputField
                      label="Phone Number"
                      value={formData.phone}
                      onChange={(v) => set("phone", v)}
                      disabled={!editMode}
                    />
                    <InputField
                      label="Location"
                      value={formData.location}
                      onChange={(v) => set("location", v)}
                      disabled={!editMode}
                      placeholder="e.g. Kathmandu, Nepal"
                    />
                    <InputField
                      label="Work"
                      value={formData.work}
                      onChange={(v) => set("work", v)}
                      disabled={!editMode}
                      placeholder="e.g. Software Engineer"
                    />
                    <InputField
                      label="Profile Picture URL"
                      value={formData.avatar}
                      onChange={(v) => set("avatar", v)}
                      disabled={!editMode}
                      placeholder="Paste an image link, or leave blank to use your initials"
                    />
                    <div className="sm:col-span-2">
                      <label
                        className={`${
                          theme === "dark"
                            ? "text-text-secondary"
                            : "text-gray-500"
                        } text-xs font-semibold uppercase tracking-wide block mb-2`}
                      >
                        Bio
                      </label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => set("bio", e.target.value)}
                        disabled={!editMode}
                        rows="4"
                        placeholder="Tell us a bit about yourself..."
                        className={`w-full ${
                          theme === "dark"
                            ? "bg-background border-primary/20 text-text-primary"
                            : "bg-gray-100 border-gray-300 text-gray-900"
                        } border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-sm disabled:opacity-70`}
                      />
                    </div>
                  </div>

                  {editMode && (
                    <div className="mt-8 flex items-center gap-4">
                      <button
                        onClick={handleSaveProfile}
                        disabled={saving}
                        className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full font-semibold transition text-sm disabled:opacity-50"
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        onClick={() => {
                          setEditMode(false);
                          setSaveMsg("");
                        }}
                        className={`border-2 ${
                          theme === "dark"
                            ? "border-primary/20 hover:border-primary text-text-secondary"
                            : "border-gray-300 hover:border-gray-400 text-gray-700"
                        } px-6 py-2.5 rounded-full font-semibold transition text-sm`}
                      >
                        Cancel
                      </button>
                      {saveMsg && (
                        <p className="text-sm text-green-500">{saveMsg}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Bookings Tab */}
              {activeTab === "bookings" && (
                <div>
                  <h2
                    className={`text-2xl font-bold ${
                      theme === "dark" ? "text-text-primary" : "text-gray-900"
                    } mb-6`}
                  >
                    My Bookings
                  </h2>
                  {loadingB ? (
                    <div
                      className={`text-center py-10 ${
                        theme === "dark"
                          ? "text-text-secondary"
                          : "text-gray-500"
                      }`}
                    >
                      Loading bookings...
                    </div>
                  ) : bookings.length === 0 ? (
                    <div
                      className={`text-center py-16 rounded-xl ${
                        theme === "dark"
                          ? "bg-primary/5 border-primary/10"
                          : "bg-blue-50 border-blue-100"
                      } border`}
                    >
                      <Luggage className="w-9 h-9 mb-3 mx-auto" />
                      <p
                        className={`font-semibold ${
                          theme === "dark"
                            ? "text-text-primary"
                            : "text-gray-800"
                        } mb-2`}
                      >
                        No bookings yet
                      </p>
                      <p
                        className={`${
                          theme === "dark"
                            ? "text-text-secondary"
                            : "text-gray-600"
                        } mb-6`}
                      >
                        Your booked properties will appear here.
                      </p>
                      <button
                        onClick={() => navigate("/rooms")}
                        className="bg-primary text-white px-6 py-3 rounded-full font-semibold transition hover:bg-primary-hover"
                      >
                        Browse Properties
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {bookings.map((b) => (
                        <BookingCard
                          key={b._id}
                          booking={b}
                          theme={theme}
                          onCancelled={(updated) =>
                            setBookings((prev) =>
                              prev.map((x) => (x._id === updated._id ? updated : x)),
                            )
                          }
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div>
                  <h2
                    className={`text-2xl font-bold ${
                      theme === "dark" ? "text-text-primary" : "text-gray-900"
                    } mb-6`}
                  >
                    Change Password
                  </h2>
                  <div className="max-w-md space-y-4">
                    <InputField
                      label="Current Password"
                      type="password"
                      value={pwForm.current}
                      onChange={(v) => setPwForm((p) => ({ ...p, current: v }))}
                    />
                    <InputField
                      label="New Password"
                      type="password"
                      value={pwForm.next}
                      onChange={(v) => setPwForm((p) => ({ ...p, next: v }))}
                    />
                    <InputField
                      label="Confirm New Password"
                      type="password"
                      value={pwForm.confirm}
                      onChange={(v) => setPwForm((p) => ({ ...p, confirm: v }))}
                    />
                    <div className="pt-2">
                      <button
                        onClick={handleChangePassword}
                        className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full font-semibold transition text-sm"
                      >
                        Update Password
                      </button>
                    </div>
                    {pwError && (
                      <p className="text-sm text-red-500 mt-2">{pwError}</p>
                    )}
                    {pwMsg && (
                      <p className="text-sm text-green-500 mt-2">{pwMsg}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Preferences Tab */}
              {activeTab === "prefs" && (
                <div>
                  <h2
                    className={`text-2xl font-bold ${
                      theme === "dark" ? "text-text-primary" : "text-gray-900"
                    } mb-6`}
                  >
                    Preferences
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3
                          className={`font-semibold ${
                            theme === "dark"
                              ? "text-text-primary"
                              : "text-gray-900"
                          }`}
                        >
                          Email Notifications
                        </h3>
                        <p
                          className={`text-sm ${
                            theme === "dark"
                              ? "text-text-secondary"
                              : "text-gray-600"
                          }`}
                        >
                          Receive updates about your bookings and our
                          newsletter.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-primary dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3
                          className={`font-semibold ${
                            theme === "dark"
                              ? "text-text-primary"
                              : "text-gray-900"
                          }`}
                        >
                          SMS Notifications
                        </h3>
                        <p
                          className={`text-sm ${
                            theme === "dark"
                              ? "text-text-secondary"
                              : "text-gray-600"
                          }`}
                        >
                          Get critical alerts via text message.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-primary dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

const InputField = ({
  label,
  value,
  onChange,
  disabled,
  type = "text",
  placeholder = "",
}) => {
  const { theme } = useTheme();
  return (
    <div>
      <label
        className={`${
          theme === "dark" ? "text-text-secondary" : "text-gray-500"
        } text-xs font-semibold uppercase tracking-wide block mb-2`}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full ${
          theme === "dark"
            ? "bg-background border-primary/20 text-text-primary"
            : "bg-gray-100 border-gray-300 text-gray-900"
        } border rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary text-sm disabled:opacity-70`}
      />
    </div>
  );
};

const CANCELLATION_CUTOFF_HOURS = 24;

const BookingCard = ({ booking, theme, onCancelled }) => {
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState("");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [reviewed, setReviewed] = useState(booking.reviewed);

  const hoursUntilCheckIn =
    (new Date(booking.checkIn).getTime() - Date.now()) / (1000 * 60 * 60);
  const canCancel =
    (booking.status === "pending" || booking.status === "confirmed") &&
    hoursUntilCheckIn >= CANCELLATION_CUTOFF_HOURS;
  const canReview = booking.status === "completed" && !reviewed;

  const handleCancel = async () => {
    if (!window.confirm("Cancel this booking?")) return;
    try {
      setCancelling(true);
      setError("");
      const { booking: updated } = await bookingsAPI.cancel(booking._id);
      onCancelled(updated);
    } catch (err) {
      setError(err.message || "Could not cancel booking");
    } finally {
      setCancelling(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!reviewComment.trim()) {
      setReviewError("Please write a comment");
      return;
    }
    try {
      setReviewSubmitting(true);
      setReviewError("");
      await roomsAPI.addReview(booking.room._id, {
        rating: reviewRating,
        comment: reviewComment.trim(),
        bookingId: booking._id,
      });
      setReviewed(true);
      setReviewOpen(false);
    } catch (err) {
      setReviewError(err.message || "Failed to submit review");
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div
      className={`border ${
        theme === "dark" ? "border-primary/10" : "border-gray-200"
      } rounded-xl p-4 flex flex-col sm:flex-row gap-4`}
    >
      <img
        src={booking.room?.image || "/placeholder.svg"}
        alt={booking.room?.title || "Room"}
        className="w-full sm:w-32 h-32 sm:h-auto object-cover rounded-lg"
      />
      <div className="flex-1">
        <p
          className={`px-2 py-0.5 rounded-full text-xs font-semibold inline-block mb-2 capitalize
        ${
          booking.status === "confirmed"
            ? theme === "dark"
              ? "bg-green-500/20 text-green-400"
              : "bg-green-100 text-green-800"
            : booking.status === "cancelled"
              ? theme === "dark"
                ? "bg-red-500/20 text-red-400"
                : "bg-red-100 text-red-800"
              : theme === "dark"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-yellow-100 text-yellow-800"
        }`}
        >
          {booking.status}
        </p>
        <h3
          className={`font-bold ${
            theme === "dark" ? "text-text-primary" : "text-gray-900"
          } mb-1`}
        >
          {booking.room?.title || "Room unavailable"}
        </h3>
        <p
          className={`text-sm ${
            theme === "dark" ? "text-text-secondary" : "text-gray-600"
          } mb-2`}
        >
          {new Date(booking.checkIn).toLocaleDateString()} -{" "}
          {new Date(booking.checkOut).toLocaleDateString()}
        </p>
        <p
          className={`font-semibold ${
            theme === "dark" ? "text-primary" : "text-blue-600"
          }`}
        >
          {formatNPR(booking.totalPrice)}
        </p>
        {error && <p className="text-xs text-red-500 mt-2">{error}</p>}

        {booking.status === "completed" && reviewed && (
          <p
            className={`text-xs mt-2 font-semibold ${
              theme === "dark" ? "text-text-muted" : "text-gray-500"
            }`}
          >
            ✓ You reviewed this stay
          </p>
        )}

        {reviewOpen && (
          <div
            className={`mt-3 p-3 rounded-lg border ${
              theme === "dark"
                ? "bg-background border-primary/20"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, si) => (
                <button
                  key={si}
                  type="button"
                  onClick={() => setReviewRating(si + 1)}
                  aria-label={`Rate ${si + 1} star`}
                >
                  <Star
                    className={`w-5 h-5 ${
                      si < reviewRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              rows={2}
              placeholder="Share your experience..."
              disabled={reviewSubmitting}
              className={`w-full px-3 py-2 mb-2 text-sm ${
                theme === "dark"
                  ? "bg-bg-secondary border-primary/20 text-text-primary"
                  : "bg-white border-gray-300 text-gray-900"
              } border rounded-lg focus:outline-none focus:border-primary disabled:opacity-60`}
            />
            {reviewError && (
              <p className="text-xs text-red-500 mb-2">{reviewError}</p>
            )}
            <div className="flex gap-2">
              <button
                onClick={handleSubmitReview}
                disabled={reviewSubmitting}
                className="bg-primary hover:bg-primary-hover text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition disabled:opacity-50"
              >
                {reviewSubmitting ? "Submitting..." : "Submit Review"}
              </button>
              <button
                onClick={() => setReviewOpen(false)}
                disabled={reviewSubmitting}
                className={`text-sm font-semibold px-4 py-1.5 rounded-lg transition ${
                  theme === "dark" ? "text-text-secondary" : "text-gray-600"
                }`}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex sm:flex-col justify-between items-end sm:items-center gap-2">
        <p
          className={`text-xs ${
            theme === "dark" ? "text-text-muted" : "text-gray-400"
          }`}
        >
          #{booking._id.slice(-6)}
        </p>
        {canCancel && (
          <button
            onClick={handleCancel}
            disabled={cancelling}
            className={`mt-auto text-sm font-semibold disabled:opacity-50 ${
              theme === "dark"
                ? "text-red-400 hover:text-red-300"
                : "text-red-600 hover:text-red-800"
            }`}
          >
            {cancelling ? "Cancelling..." : "Cancel Booking"}
          </button>
        )}
        {canReview && !reviewOpen && (
          <button
            onClick={() => setReviewOpen(true)}
            className={`mt-auto text-sm font-semibold ${
              theme === "dark"
                ? "text-primary hover:text-primary-hover"
                : "text-blue-600 hover:text-blue-800"
            }`}
          >
            Leave a Review
          </button>
        )}
      </div>
    </div>
  );
};