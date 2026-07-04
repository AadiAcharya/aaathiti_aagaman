import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI, bookingsAPI, roomsAPI } from "../services/api";
import {
  User,
  Calendar,
  Lock,
  DoorOpen,
  Luggage,
  Star,
  ShieldCheck,
  ShieldAlert,
  Heart,
  Wallet,
  CalendarClock,
} from "lucide-react";
import { formatNPR } from "../utils/currency";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Badge from "./ui/Badge";
import Table from "./ui/Table";
import Tabs from "./ui/Tabs";
import EmptyState from "./ui/EmptyState";
import ConfirmDialog from "./ui/ConfirmDialog";
import Spinner from "./ui/Spinner";
import { useToast } from "./ui/useToast";

const TAB_LIST = [
  { id: "profile", label: "Profile", icon: User },
  { id: "bookings", label: "Bookings", icon: Calendar },
  { id: "security", label: "Security", icon: Lock },
];

const BOOKING_FILTERS = [
  { id: "all", label: "All" },
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

const CANCELLATION_CUTOFF_HOURS = 24;
const STATUS_TONE = { confirmed: "success", cancelled: "danger", pending: "warning", completed: "default" };

export default function Account() {
  const navigate = useNavigate();
  const { user, updateUser, logout: authLogout } = useAuth();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState("profile");
  const [bookingFilter, setBookingFilter] = useState("all");
  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loadingB, setLoadingB] = useState(true);
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwMsg, setPwMsg] = useState("");
  const [pwError, setPwError] = useState("");

  // Bookings tab interaction state
  const [reviewRowId, setReviewRowId] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    location: user?.location || "",
    work: user?.work || "",
    avatar: user?.avatar || "",
  });

  useEffect(() => {
    if (!user) navigate("/sign-in");
  }, [user, navigate]);

  // Refresh from the server once on load — older sessions may predate fields
  // (bio/location/work/createdAt) added to the profile since they last logged in.
  useEffect(() => {
    authAPI
      .getMe()
      .then(({ user: fresh }) => {
        updateUser(fresh);
        setFormData((p) => ({
          ...p,
          bio: fresh.bio || "",
          location: fresh.location || "",
          work: fresh.work || "",
        }));
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetched once up front (not lazily on tab switch) so the profile card's
  // quick stats have real numbers immediately.
  useEffect(() => {
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
  }, []);

  const filteredBookings = useMemo(() => {
    if (bookingFilter === "all") return bookings;
    if (bookingFilter === "upcoming") return bookings.filter((b) => b.status === "pending" || b.status === "confirmed");
    return bookings.filter((b) => b.status === bookingFilter);
  }, [bookings, bookingFilter]);

  const bookingStats = useMemo(() => {
    const active = bookings.filter((b) => b.status !== "cancelled");
    return {
      total: bookings.length,
      spent: active.reduce((s, b) => s + (b.totalPrice || 0), 0),
      upcoming: bookings.filter((b) => b.status === "pending" || b.status === "confirmed").length,
    };
  }, [bookings]);

  if (!user) return null;

  const set = (k, v) => setFormData((p) => ({ ...p, [k]: v }));

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : null;

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

  const canCancelBooking = (booking) => {
    const hoursUntilCheckIn = (new Date(booking.checkIn).getTime() - Date.now()) / (1000 * 60 * 60);
    return (
      (booking.status === "pending" || booking.status === "confirmed") &&
      hoursUntilCheckIn >= CANCELLATION_CUTOFF_HOURS
    );
  };

  const handleConfirmCancel = async () => {
    if (!cancelTarget) return;
    try {
      setCancelling(true);
      const { booking: updated } = await bookingsAPI.cancel(cancelTarget._id);
      setBookings((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
      toast("Booking cancelled", { type: "success" });
    } catch (err) {
      toast(err.message || "Could not cancel booking", { type: "error" });
    } finally {
      setCancelling(false);
      setCancelTarget(null);
    }
  };

  const openReview = (booking) => {
    setReviewRowId(booking._id);
    setReviewRating(5);
    setReviewComment("");
    setReviewError("");
  };

  const handleSubmitReview = async (booking) => {
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
      setBookings((prev) => prev.map((b) => (b._id === booking._id ? { ...b, reviewed: true } : b)));
      setReviewRowId(null);
      toast("Review submitted — thank you!", { type: "success" });
    } catch (err) {
      setReviewError(err.message || "Failed to submit review");
    } finally {
      setReviewSubmitting(false);
    }
  };

  const bookingColumns = [
    {
      key: "room",
      label: "Room",
      sortable: false,
      render: (b) => (
        <button
          type="button"
          disabled={!b.room?._id}
          onClick={() => navigate(`/room/${b.room._id}`)}
          className="flex items-center gap-3 text-left disabled:cursor-default"
        >
          <img
            src={b.room?.image || "/placeholder.svg"}
            alt=""
            className="w-12 h-12 rounded-[var(--radius-control)] object-cover shrink-0"
          />
          <div className="min-w-0">
            <p
              className={`font-medium truncate ${
                b.room?._id ? "text-text-primary hover:text-primary hover:underline" : "text-text-primary"
              }`}
            >
              {b.room?.title || "Room unavailable"}
            </p>
            <p className="text-xs text-text-muted">#{b._id.slice(-6)}</p>
          </div>
        </button>
      ),
    },
    {
      key: "checkIn",
      label: "Dates",
      render: (b) => (
        <span className="text-text-secondary text-sm">
          {new Date(b.checkIn).toLocaleDateString()} → {new Date(b.checkOut).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (b) => (
        <div className="flex items-center gap-1.5">
          <Badge tone={STATUS_TONE[b.status] || "default"}>{b.status}</Badge>
          {b.paymentStatus === "refunded" && <Badge tone="info">Refunded</Badge>}
        </div>
      ),
    },
    {
      key: "totalPrice",
      label: "Total",
      render: (b) => <span className="font-semibold text-text-primary">{formatNPR(b.totalPrice)}</span>,
    },
    {
      key: "actions",
      label: "",
      sortable: false,
      render: (b) => {
        const cancellable = canCancelBooking(b);
        const showCancel = b.status === "pending" || b.status === "confirmed";
        const showReview = b.status === "completed" && !b.reviewed;
        const showPay =
          (b.status === "pending" || b.status === "confirmed") && b.paymentStatus !== "paid";
        return (
          <div className="flex items-center justify-end gap-4">
            {showPay && (
              <button
                onClick={() => navigate(`/payment/${b._id}`)}
                className="text-primary hover:text-primary-hover text-sm font-semibold"
              >
                Pay Now
              </button>
            )}
            {showReview && (
              <button
                onClick={() => openReview(b)}
                className="text-primary hover:text-primary-hover text-sm font-semibold"
              >
                Leave a Review
              </button>
            )}
            {b.status === "completed" && b.reviewed && (
              <span className="text-xs text-text-muted font-medium">Reviewed</span>
            )}
            {showCancel && (
              <button
                onClick={() => cancellable && setCancelTarget(b)}
                disabled={!cancellable}
                title={
                  cancellable
                    ? undefined
                    : `Bookings can only be cancelled at least ${CANCELLATION_CUTOFF_HOURS}h before check-in`
                }
                className="text-danger hover:text-danger/80 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-hover">
        <div className="absolute -right-10 -top-16 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 relative">
          <div className="flex flex-wrap items-center gap-5">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full border-4 border-white/30 object-cover" />
            ) : (
              <div className="w-20 h-20 rounded-full border-4 border-white/30 flex items-center justify-center text-2xl font-bold bg-white/15 text-white">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-display font-bold text-white">{user.name}</h1>
              <p className="text-white/80">{user.email}</p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <Badge tone="default" className="!bg-white/15 !text-white !border-transparent capitalize">
                  {user.role}
                </Badge>
                {user.isVerified ? (
                  <Badge tone="default" className="!bg-white/15 !text-white !border-transparent">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </Badge>
                ) : (
                  <Badge tone="default" className="!bg-white/15 !text-white !border-transparent">
                    <ShieldAlert className="w-3 h-3" /> Unverified
                  </Badge>
                )}
                {memberSince && (
                  <span className="text-white/70 text-xs">Member since {memberSince}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1 space-y-4">
            <Card padding="p-4">
              <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-border">
                <div>
                  <p className="text-lg font-semibold text-text-primary flex items-center gap-1.5">
                    <Luggage className="w-4 h-4 text-primary" /> {bookingStats.total}
                  </p>
                  <p className="text-[11px] text-text-muted uppercase tracking-wide">Bookings</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-text-primary flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-primary" /> {user.wishlist?.length ?? 0}
                  </p>
                  <p className="text-[11px] text-text-muted uppercase tracking-wide">Wishlist</p>
                </div>
              </div>
              <nav className="space-y-1">
                {TAB_LIST.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-[var(--radius-control)] font-medium text-sm transition-colors duration-[var(--duration-fast)] ${
                      activeTab === tab.id
                        ? "bg-primary text-white"
                        : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"
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
                  className="w-full text-left px-4 py-2.5 rounded-[var(--radius-control)] font-medium text-sm text-danger hover:bg-danger-subtle transition-colors duration-[var(--duration-fast)]"
                >
                  <span className="inline-flex items-center gap-2">
                    <DoorOpen className="w-4 h-4" />
                    Logout
                  </span>
                </button>
              </nav>
            </Card>
          </aside>

          <main className="md:col-span-3">
            <Card>
              {activeTab === "profile" && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-display font-bold text-text-primary">Personal Information</h2>
                    {!editMode && (
                      <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                        Edit Profile
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input label="Full Name" value={formData.name} onChange={(e) => set("name", e.target.value)} disabled={!editMode} />
                    <Input label="Email Address" type="email" value={formData.email} onChange={(e) => set("email", e.target.value)} disabled={!editMode} />
                    <Input label="Phone Number" value={formData.phone} onChange={(e) => set("phone", e.target.value)} disabled={!editMode} />
                    <Input label="Location" value={formData.location} onChange={(e) => set("location", e.target.value)} disabled={!editMode} placeholder="e.g. Kathmandu, Nepal" />
                    <Input label="Work" value={formData.work} onChange={(e) => set("work", e.target.value)} disabled={!editMode} placeholder="e.g. Software Engineer" />
                    <Input label="Profile Picture URL" value={formData.avatar} onChange={(e) => set("avatar", e.target.value)} disabled={!editMode} placeholder="Paste an image link, or leave blank to use your initials" />
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1.5">Bio</label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => set("bio", e.target.value)}
                        disabled={!editMode}
                        rows="4"
                        placeholder="Tell us a bit about yourself..."
                        className="w-full rounded-[var(--radius-control)] border border-border bg-bg-sunken text-text-primary placeholder-text-muted px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-70"
                      />
                    </div>
                  </div>

                  {editMode && (
                    <div className="mt-8 flex items-center gap-4">
                      <Button loading={saving} onClick={handleSaveProfile}>
                        Save Changes
                      </Button>
                      <Button variant="secondary" onClick={() => { setEditMode(false); setSaveMsg(""); }}>
                        Cancel
                      </Button>
                      {saveMsg && <p className="text-sm text-success">{saveMsg}</p>}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "bookings" && (
                <div>
                  <h2 className="text-xl font-display font-bold text-text-primary mb-6">My Bookings</h2>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="rounded-card border border-border px-4 py-3">
                      <p className="text-lg font-semibold text-text-primary flex items-center gap-1.5">
                        <Luggage className="w-4 h-4 text-primary" /> {bookingStats.total}
                      </p>
                      <p className="text-[11px] text-text-muted uppercase tracking-wide">Total Bookings</p>
                    </div>
                    <div className="rounded-card border border-border px-4 py-3">
                      <p className="text-lg font-semibold text-text-primary flex items-center gap-1.5">
                        <Wallet className="w-4 h-4 text-primary" /> {formatNPR(bookingStats.spent)}
                      </p>
                      <p className="text-[11px] text-text-muted uppercase tracking-wide">Total Spent</p>
                    </div>
                    <div className="rounded-card border border-border px-4 py-3">
                      <p className="text-lg font-semibold text-text-primary flex items-center gap-1.5">
                        <CalendarClock className="w-4 h-4 text-primary" /> {bookingStats.upcoming}
                      </p>
                      <p className="text-[11px] text-text-muted uppercase tracking-wide">Upcoming</p>
                    </div>
                  </div>

                  {loadingB ? (
                    <div className="flex justify-center py-16">
                      <Spinner size="lg" />
                    </div>
                  ) : bookings.length === 0 ? (
                    <EmptyState
                      icon={Luggage}
                      title="No bookings yet"
                      description="Your booked properties will appear here."
                      action={
                        <Button size="sm" onClick={() => navigate("/rooms")}>
                          Browse Properties
                        </Button>
                      }
                    />
                  ) : (
                    <>
                      <Tabs
                        variant="pill"
                        tabs={BOOKING_FILTERS}
                        active={bookingFilter}
                        onChange={setBookingFilter}
                        className="mb-4"
                      />
                      {filteredBookings.length === 0 ? (
                        <EmptyState icon={Luggage} title={`No ${bookingFilter} bookings`} />
                      ) : (
                        <Table
                          columns={bookingColumns}
                          data={filteredBookings}
                          expandedRowRender={(b) =>
                            reviewRowId === b._id ? (
                              <tr>
                                <td colSpan={bookingColumns.length} className="bg-bg-secondary px-4 py-4">
                                  <div className="flex items-center gap-1 mb-2">
                                    {Array.from({ length: 5 }).map((_, si) => (
                                      <button key={si} type="button" onClick={() => setReviewRating(si + 1)} aria-label={`Rate ${si + 1} star`}>
                                        <Star className={`w-5 h-5 ${si < reviewRating ? "fill-accent text-accent" : "text-text-muted"}`} />
                                      </button>
                                    ))}
                                  </div>
                                  <textarea
                                    value={reviewComment}
                                    onChange={(e) => setReviewComment(e.target.value)}
                                    rows={2}
                                    placeholder="Share your experience..."
                                    disabled={reviewSubmitting}
                                    className="w-full px-3.5 py-2.5 mb-2 text-sm rounded-[var(--radius-control)] border border-border bg-bg-sunken text-text-primary outline-none focus:border-primary disabled:opacity-60"
                                  />
                                  {reviewError && <p className="text-xs text-danger mb-2">{reviewError}</p>}
                                  <div className="flex gap-2">
                                    <Button size="sm" loading={reviewSubmitting} onClick={() => handleSubmitReview(b)}>
                                      Submit Review
                                    </Button>
                                    <Button size="sm" variant="ghost" disabled={reviewSubmitting} onClick={() => setReviewRowId(null)}>
                                      Cancel
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            ) : null
                          }
                        />
                      )}
                    </>
                  )}
                </div>
              )}

              {activeTab === "security" && (
                <div>
                  <h2 className="text-xl font-display font-bold text-text-primary mb-6">Security</h2>

                  <div className="rounded-card border border-border px-5 py-4 mb-8 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-text-primary">{user.email}</p>
                      <p className="text-xs text-text-muted mt-0.5">
                        {memberSince ? `Member since ${memberSince}` : "Account details"}
                      </p>
                    </div>
                    {user.isVerified ? (
                      <Badge tone="success">
                        <ShieldCheck className="w-3 h-3" /> Email verified
                      </Badge>
                    ) : (
                      <Badge tone="warning">
                        <ShieldAlert className="w-3 h-3" /> Email unverified
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wide mb-4">
                    Change Password
                  </h3>
                  <div className="max-w-md space-y-4">
                    <Input label="Current Password" type="password" value={pwForm.current} onChange={(e) => setPwForm((p) => ({ ...p, current: e.target.value }))} />
                    <Input label="New Password" type="password" value={pwForm.next} onChange={(e) => setPwForm((p) => ({ ...p, next: e.target.value }))} hint="Minimum 8 characters" />
                    <Input label="Confirm New Password" type="password" value={pwForm.confirm} onChange={(e) => setPwForm((p) => ({ ...p, confirm: e.target.value }))} />
                    <div className="pt-2">
                      <Button onClick={handleChangePassword}>Update Password</Button>
                    </div>
                    {pwError && <p className="text-sm text-danger mt-2">{pwError}</p>}
                    {pwMsg && <p className="text-sm text-success mt-2">{pwMsg}</p>}
                  </div>
                </div>
              )}
            </Card>
          </main>
        </div>
      </div>

      <ConfirmDialog
        open={!!cancelTarget}
        title="Cancel this booking?"
        description="This action cannot be undone."
        confirmLabel="Cancel Booking"
        danger
        loading={cancelling}
        onConfirm={handleConfirmCancel}
        onCancel={() => setCancelTarget(null)}
      />
    </div>
  );
}
