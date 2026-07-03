import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { roomsAPI, bookingsAPI } from "../../services/api";
import { formatNPR } from "../../utils/currency";
import { isTopRated } from "../../utils/rating";
import StarRating from "../common/StarRating";
import TopRatedBadge from "../common/TopRatedBadge";
import {
  Wifi,
  Tv,
  Snowflake,
  Wine,
  Coffee,
  Palmtree,
  ChefHat,
  WashingMachine,
  Briefcase,
  Flame,
  Mountain,
  Bath,
  Building2,
  Umbrella,
  CheckCircle,
  Bed,
  Ruler,
  Users,
  Tag,
  Shield,
  Star,
} from "lucide-react";

const amenityIcons = {
  WiFi: Wifi,
  TV: Tv,
  AC: Snowflake,
  "Mini Bar": Wine,
  "Coffee Maker": Coffee,
  Balcony: Palmtree,
  Kitchen: ChefHat,
  Washer: WashingMachine,
  "Work Desk": Briefcase,
  Fireplace: Flame,
  "Mountain View": Mountain,
  "Hot Tub Access": Bath,
  "City View": Building2,
  "Beach Access": Umbrella,
};
const getAmenityIcon = (a) => amenityIcons[a] || CheckCircle;

export default function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { isAuthenticated, user, role } = useAuth();
  const isHost = role === "host" || role === "admin";

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [booking, setBooking] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const [bookingMsg, setBookingMsg] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState("");
  const [statusUpdating, setStatusUpdating] = useState(false);

  const roomHostId = room?.host?._id || room?.host;
  const isOwner = !!(user && roomHostId && roomHostId === user._id);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const { room: data } = await roomsAPI.getById(roomId);
        setRoom(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [roomId]);

  const handleReserve = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
      return;
    }
    if (!checkIn || !checkOut) {
      setBookingMsg({
        type: "error",
        text: "Please select check-in and check-out dates",
      });
      return;
    }

    try {
      setBooking(true);
      setBookingMsg(null);
      const { booking: b } = await bookingsAPI.create({
        roomId: room._id,
        checkIn,
        checkOut,
        guests,
      });
      setBookingMsg({
        type: "success",
        text: `Booking confirmed! Total: ${formatNPR(b.grandTotal)}`,
      });
    } catch (err) {
      setBookingMsg({ type: "error", text: err.message });
    } finally {
      setBooking(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      navigate("/sign-in");
      return;
    }
    if (!reviewComment.trim()) {
      setReviewError("Please write a comment");
      return;
    }
    try {
      setReviewSubmitting(true);
      setReviewError("");
      const { reviews, rating } = await roomsAPI.addReview(roomId, {
        rating: reviewRating,
        comment: reviewComment.trim(),
      });
      setRoom((prev) => ({ ...prev, reviewsArray: reviews, rating }));
      setReviewComment("");
      setReviewRating(5);
    } catch (err) {
      setReviewError(err.message || "Failed to submit review");
    } finally {
      setReviewSubmitting(false);
    }
  };

  const startEdit = () => {
    setEditForm({
      title: room.title || "",
      description: room.description || "",
      price: room.price || 0,
      image: room.image || "",
      location: room.location || "",
      bedrooms: room.bedrooms || "1",
      bathrooms: room.bathrooms || "1",
      maxGuests: room.maxGuests || 1,
      parking: room.parking || "0",
      pets: room.pets || "No",
    });
    setEditError("");
    setEditMode(true);
  };

  const setEditField = (k, v) => setEditForm((p) => ({ ...p, [k]: v }));

  const handleSaveEdit = async () => {
    if (!editForm.title.trim()) {
      setEditError("Title is required");
      return;
    }
    try {
      setEditSaving(true);
      setEditError("");
      const { room: updated } = await roomsAPI.update(roomId, {
        ...editForm,
        price: Number(editForm.price) || 0,
        maxGuests: Number(editForm.maxGuests) || 1,
        priceDisplay: formatNPR(Number(editForm.price) || 0),
      });
      setRoom((prev) => ({ ...prev, ...updated }));
      setEditMode(false);
    } catch (err) {
      setEditError(err.message || "Failed to save changes");
    } finally {
      setEditSaving(false);
    }
  };

  const handleToggleAvailability = async () => {
    try {
      setStatusUpdating(true);
      const { room: updated } = await roomsAPI.update(roomId, {
        isAvailable: !room.isAvailable,
      });
      setRoom((prev) => ({ ...prev, isAvailable: updated.isAvailable }));
    } catch (err) {
      alert(err.message || "Failed to update status");
    } finally {
      setStatusUpdating(false);
    }
  };

  // Night / price calculations
  const nights =
    checkIn && checkOut
      ? Math.ceil(
          (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24),
        )
      : 0;
  const subtotal = room ? room.price * nights : 0;
  const taxes = Math.round(subtotal * 0.1 * 100) / 100;
  const grandTotal = subtotal + taxes;

  if (loading)
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-background" : "bg-gray-100"
        }`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );

  if (error || !room)
    return (
      <div
        className={`text-center p-8 ${
          theme === "dark" ? "text-text-primary" : "text-gray-800"
        }`}
      >
        {error || "Room not found"}
      </div>
    );

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-background" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Image Gallery */}
        <div className="grid grid-cols-4 gap-4 mb-12">
          <div className="col-span-2 row-span-2">
            <img
              src={room.image}
              alt={room.title}
              className="w-full h-full rounded-2xl object-cover shadow-lg shadow-primary/10"
              style={{ minHeight: "320px" }}
            />
          </div>
          {room.images?.slice(0, 2).map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              className={`h-40 w-full rounded-lg object-cover border ${
                theme === "dark" ? "border-primary/10" : "border-gray-200"
              }`}
            />
          ))}
          {Array.from({
            length: Math.max(0, 2 - (room.images?.length || 0)),
          }).map((_, i) => (
            <div
              key={i}
              className={`${
                theme === "dark"
                  ? "bg-bg-secondary border-primary/10"
                  : "bg-gray-100 border-gray-200"
              } h-40 rounded-lg border flex items-center justify-center`}
            >
              <p
                className={`${
                  theme === "dark" ? "text-text-secondary" : "text-gray-500"
                } text-sm`}
              >
                No image
              </p>
            </div>
          ))}
          <div
            className={`${
              theme === "dark"
                ? "bg-gradient-to-br from-bg-secondary to-bg-secondary/50 border-primary/20"
                : "bg-gradient-to-br from-gray-100 to-gray-200/50 border-gray-300"
            } h-40 rounded-lg relative flex flex-col items-center justify-center border cursor-pointer group`}
          >
            <span
              className={`text-4xl font-bold ${
                theme === "dark" ? "text-accent" : "text-blue-600"
              } group-hover:scale-110 transition-transform duration-300`}
            >
              +2
            </span>
            <span
              className={`text-sm font-semibold ${
                theme === "dark" ? "text-text-primary" : "text-gray-800"
              }`}
            >
              More Photos
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* Title */}
            <div className="mb-8 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1
                    className={`text-3xl font-bold ${
                      theme === "dark" ? "text-text-primary" : "text-gray-900"
                    }`}
                  >
                    {room.title}
                  </h1>
                  {isTopRated(room.rating, room.reviews) && <TopRatedBadge />}
                </div>
                <p
                  className={`${
                    theme === "dark" ? "text-text-secondary" : "text-gray-600"
                  }`}
                >
                  {room.type} · {room.bedType} · {room.size} · Up to{" "}
                  {room.maxGuests} guests
                </p>
              </div>
              <StarRating rating={room.rating} reviews={room.reviews} showValue size="w-5 h-5" />
            </div>

            {/* Main Amenities */}
            <div className="mb-12">
              <h2
                className={`text-xl font-bold ${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } mb-4`}
              >
                Main Amenities
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: Bed, label: room.bedType || "Bed" },
                  { icon: Ruler, label: room.size || "Size" },
                  { icon: Users, label: `${room.maxGuests} Guests` },
                  { icon: Tag, label: room.type },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`${
                      theme === "dark"
                        ? "bg-bg-secondary border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
                        : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
                    } p-6 rounded-lg text-center border transition-all duration-300`}
                  >
                    <item.icon
                      className={`w-9 h-9 mb-2 mx-auto ${
                        theme === "dark" ? "text-text-primary" : "text-gray-800"
                      }`}
                    />
                    <p
                      className={`font-semibold ${
                        theme === "dark" ? "text-text-primary" : "text-gray-800"
                      } capitalize`}
                    >
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <h2
                className={`text-xl font-bold ${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } mb-4`}
              >
                Apartment Description
              </h2>
              <p
                className={`${
                  theme === "dark"
                    ? "text-text-secondary bg-bg-secondary/50 border-primary/10"
                    : "text-gray-600 bg-gray-100 border-gray-200"
                } text-sm leading-relaxed p-4 rounded-lg border`}
              >
                {room.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="mb-12">
              <h2
                className={`text-xl font-bold ${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } mb-4`}
              >
                Offered Amenities
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  {room.amenities
                    ?.slice(0, Math.ceil(room.amenities.length / 2))
                    .map((a, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-4 p-2 rounded-lg ${
                          theme === "dark"
                            ? "hover:bg-primary/5"
                            : "hover:bg-gray-100"
                        } transition-colors`}
                      >
                        {(() => {
                          const AmenityIcon = getAmenityIcon(a);
                          return (
                            <AmenityIcon
                              className={`w-6 h-6 shrink-0 ${
                                theme === "dark"
                                  ? "text-text-primary"
                                  : "text-gray-700"
                              }`}
                            />
                          );
                        })()}
                        <span
                          className={`${
                            theme === "dark"
                              ? "text-text-secondary"
                              : "text-gray-700"
                          }`}
                        >
                          {a}
                        </span>
                      </div>
                    ))}
                </div>
                <div className="space-y-4">
                  {room.amenities
                    ?.slice(Math.ceil(room.amenities.length / 2))
                    .map((a, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-4 p-2 rounded-lg ${
                          theme === "dark"
                            ? "hover:bg-primary/5"
                            : "hover:bg-gray-100"
                        } transition-colors`}
                      >
                        {(() => {
                          const AmenityIcon = getAmenityIcon(a);
                          return (
                            <AmenityIcon
                              className={`w-6 h-6 shrink-0 ${
                                theme === "dark"
                                  ? "text-text-primary"
                                  : "text-gray-700"
                              }`}
                            />
                          );
                        })()}
                        <span
                          className={`${
                            theme === "dark"
                              ? "text-text-secondary"
                              : "text-gray-700"
                          }`}
                        >
                          {a}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Safety */}
            {room.safety?.length > 0 && (
              <div className="mb-12">
                <h2
                  className={`text-xl font-bold ${
                    theme === "dark" ? "text-text-primary" : "text-gray-900"
                  } mb-4`}
                >
                  Safety and Hygiene
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {room.safety.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-4 p-2 rounded-lg ${
                        theme === "dark"
                          ? "hover:bg-primary/5"
                          : "hover:bg-gray-100"
                      } transition-colors`}
                    >
                      <Shield
                        className={`w-6 h-6 shrink-0 ${
                          theme === "dark" ? "text-text-primary" : "text-gray-700"
                        }`}
                      />
                      <span
                        className={`${
                          theme === "dark"
                            ? "text-text-secondary"
                            : "text-gray-700"
                        }`}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="mb-12">
              <h2
                className={`text-xl font-bold ${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } mb-4`}
              >
                Reviews{" "}
                <span
                  className={`ml-4 text-2xl font-bold ${
                    theme === "dark" ? "text-primary" : "text-blue-600"
                  }`}
                >
                  {room.rating}
                </span>
              </h2>
              <div className="space-y-6 mb-8">
                {room.reviewsArray?.length === 0 && (
                  <p
                    className={`${
                      theme === "dark" ? "text-text-secondary" : "text-gray-500"
                    }`}
                  >
                    No reviews yet. Be the first!
                  </p>
                )}
                {room.reviewsArray?.map((review, i) => (
                  <div
                    key={i}
                    className={`${
                      theme === "dark"
                        ? "bg-bg-secondary border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
                        : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
                    } flex gap-4 p-4 rounded-lg border transition-all duration-300`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full shrink-0 flex items-center justify-center text-xl font-bold ${
                        theme === "dark"
                          ? "border-2 border-primary/30 bg-primary/20 text-primary"
                          : "border-2 border-blue-200 bg-blue-100 text-blue-700"
                      }`}
                    >
                      {review.name?.[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3
                          className={`font-bold ${
                            theme === "dark"
                              ? "text-text-primary"
                              : "text-gray-900"
                          }`}
                        >
                          {review.name}
                        </h3>
                        <span className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, si) => (
                            <Star
                              key={si}
                              className={`w-4 h-4 ${
                                si < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </span>
                      </div>
                      <p
                        className={`${
                          theme === "dark"
                            ? "text-text-secondary"
                            : "text-gray-500"
                        } text-sm`}
                      >
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </p>
                      <p
                        className={`${
                          theme === "dark"
                            ? "text-text-secondary"
                            : "text-gray-600"
                        } text-sm mt-2`}
                      >
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Write a review - host accounts don't book/review, they'd use a guest account for that */}
              {!isHost && (
                <div
                  className={`p-6 rounded-xl border ${
                    theme === "dark"
                      ? "bg-bg-secondary border-primary/20"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <h3
                    className={`font-bold mb-4 ${
                      theme === "dark" ? "text-text-primary" : "text-gray-900"
                    }`}
                  >
                    Write a Review
                  </h3>
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <button
                        key={si}
                        type="button"
                        onClick={() => setReviewRating(si + 1)}
                        aria-label={`Rate ${si + 1} star`}
                      >
                        <Star
                          className={`w-6 h-6 ${
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
                    rows={3}
                    placeholder={
                      isAuthenticated
                        ? "Share your experience..."
                        : "Sign in to leave a review"
                    }
                    disabled={!isAuthenticated || reviewSubmitting}
                    className={`w-full px-3 py-2 mb-3 ${
                      theme === "dark"
                        ? "bg-background border-primary/20 text-text-primary"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    } border rounded-lg focus:outline-none focus:border-primary disabled:opacity-60`}
                  />
                  {reviewError && (
                    <p className="text-red-500 text-sm mb-3">{reviewError}</p>
                  )}
                  <button
                    onClick={handleSubmitReview}
                    disabled={reviewSubmitting}
                    className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-2 rounded-lg transition disabled:opacity-50"
                  >
                    {reviewSubmitting
                      ? "Submitting..."
                      : isAuthenticated
                        ? "Submit Review"
                        : "Sign In to Review"}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div
            className={`lg:col-span-1 p-8 rounded-2xl border ${
              theme === "dark"
                ? "bg-bg-secondary border-primary/20"
                : "bg-white border-gray-200"
            } h-fit sticky top-28`}
          >
            <p
              className={`text-2xl font-bold ${
                theme === "dark" ? "text-primary" : "text-blue-600"
              } mb-2`}
            >
              {formatNPR(room.price)}
              <span
                className={`text-sm font-normal ${
                  theme === "dark" ? "text-text-secondary" : "text-gray-500"
                }`}
              >
                {" "}
                / night
              </span>
            </p>

            {isOwner ? (
              /* ── Owner view: manage listing instead of booking it ──────── */
              <>
                <div className="flex items-center justify-between mb-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      room.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {room.isAvailable ? "Active" : "Inactive"}
                  </span>
                  <button
                    onClick={handleToggleAvailability}
                    disabled={statusUpdating}
                    className={`text-xs font-semibold underline disabled:opacity-50 ${
                      theme === "dark" ? "text-text-secondary" : "text-gray-600"
                    }`}
                  >
                    {statusUpdating
                      ? "Updating..."
                      : room.isAvailable
                        ? "Deactivate"
                        : "Activate"}
                  </button>
                </div>

                {!editMode ? (
                  <button
                    onClick={startEdit}
                    className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-hover transition"
                  >
                    Edit Listing
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label
                        className={`text-xs ${
                          theme === "dark"
                            ? "text-text-secondary"
                            : "text-gray-500"
                        } font-semibold uppercase tracking-wide`}
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => setEditField("title", e.target.value)}
                        className={`w-full mt-1 px-3 py-2 ${
                          theme === "dark"
                            ? "bg-background border-primary/20 text-text-primary"
                            : "bg-gray-50 border-gray-300 text-gray-900"
                        } border rounded-lg focus:outline-none focus:border-primary`}
                      />
                    </div>
                    <div>
                      <label
                        className={`text-xs ${
                          theme === "dark"
                            ? "text-text-secondary"
                            : "text-gray-500"
                        } font-semibold uppercase tracking-wide`}
                      >
                        Description
                      </label>
                      <textarea
                        value={editForm.description}
                        onChange={(e) =>
                          setEditField("description", e.target.value)
                        }
                        rows={3}
                        className={`w-full mt-1 px-3 py-2 ${
                          theme === "dark"
                            ? "bg-background border-primary/20 text-text-primary"
                            : "bg-gray-50 border-gray-300 text-gray-900"
                        } border rounded-lg focus:outline-none focus:border-primary`}
                      />
                    </div>
                    <div>
                      <label
                        className={`text-xs ${
                          theme === "dark"
                            ? "text-text-secondary"
                            : "text-gray-500"
                        } font-semibold uppercase tracking-wide`}
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        value={editForm.location}
                        onChange={(e) =>
                          setEditField("location", e.target.value)
                        }
                        className={`w-full mt-1 px-3 py-2 ${
                          theme === "dark"
                            ? "bg-background border-primary/20 text-text-primary"
                            : "bg-gray-50 border-gray-300 text-gray-900"
                        } border rounded-lg focus:outline-none focus:border-primary`}
                      />
                    </div>
                    <div>
                      <label
                        className={`text-xs ${
                          theme === "dark"
                            ? "text-text-secondary"
                            : "text-gray-500"
                        } font-semibold uppercase tracking-wide`}
                      >
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={editForm.image}
                        onChange={(e) => setEditField("image", e.target.value)}
                        className={`w-full mt-1 px-3 py-2 ${
                          theme === "dark"
                            ? "bg-background border-primary/20 text-text-primary"
                            : "bg-gray-50 border-gray-300 text-gray-900"
                        } border rounded-lg focus:outline-none focus:border-primary`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          className={`text-xs ${
                            theme === "dark"
                              ? "text-text-secondary"
                              : "text-gray-500"
                          } font-semibold uppercase tracking-wide`}
                        >
                          Price (NRs) / night
                        </label>
                        <input
                          type="number"
                          value={editForm.price}
                          min={0}
                          onChange={(e) =>
                            setEditField("price", e.target.value)
                          }
                          className={`w-full mt-1 px-3 py-2 ${
                            theme === "dark"
                              ? "bg-background border-primary/20 text-text-primary"
                              : "bg-gray-50 border-gray-300 text-gray-900"
                          } border rounded-lg focus:outline-none focus:border-primary`}
                        />
                      </div>
                      <div>
                        <label
                          className={`text-xs ${
                            theme === "dark"
                              ? "text-text-secondary"
                              : "text-gray-500"
                          } font-semibold uppercase tracking-wide`}
                        >
                          Max Guests
                        </label>
                        <input
                          type="number"
                          value={editForm.maxGuests}
                          min={1}
                          onChange={(e) =>
                            setEditField("maxGuests", e.target.value)
                          }
                          className={`w-full mt-1 px-3 py-2 ${
                            theme === "dark"
                              ? "bg-background border-primary/20 text-text-primary"
                              : "bg-gray-50 border-gray-300 text-gray-900"
                          } border rounded-lg focus:outline-none focus:border-primary`}
                        />
                      </div>
                      <div>
                        <label
                          className={`text-xs ${
                            theme === "dark"
                              ? "text-text-secondary"
                              : "text-gray-500"
                          } font-semibold uppercase tracking-wide`}
                        >
                          Bedrooms
                        </label>
                        <input
                          type="text"
                          value={editForm.bedrooms}
                          onChange={(e) =>
                            setEditField("bedrooms", e.target.value)
                          }
                          className={`w-full mt-1 px-3 py-2 ${
                            theme === "dark"
                              ? "bg-background border-primary/20 text-text-primary"
                              : "bg-gray-50 border-gray-300 text-gray-900"
                          } border rounded-lg focus:outline-none focus:border-primary`}
                        />
                      </div>
                      <div>
                        <label
                          className={`text-xs ${
                            theme === "dark"
                              ? "text-text-secondary"
                              : "text-gray-500"
                          } font-semibold uppercase tracking-wide`}
                        >
                          Bathrooms
                        </label>
                        <input
                          type="text"
                          value={editForm.bathrooms}
                          onChange={(e) =>
                            setEditField("bathrooms", e.target.value)
                          }
                          className={`w-full mt-1 px-3 py-2 ${
                            theme === "dark"
                              ? "bg-background border-primary/20 text-text-primary"
                              : "bg-gray-50 border-gray-300 text-gray-900"
                          } border rounded-lg focus:outline-none focus:border-primary`}
                        />
                      </div>
                      <div>
                        <label
                          className={`text-xs ${
                            theme === "dark"
                              ? "text-text-secondary"
                              : "text-gray-500"
                          } font-semibold uppercase tracking-wide`}
                        >
                          Parking
                        </label>
                        <input
                          type="text"
                          value={editForm.parking}
                          onChange={(e) =>
                            setEditField("parking", e.target.value)
                          }
                          className={`w-full mt-1 px-3 py-2 ${
                            theme === "dark"
                              ? "bg-background border-primary/20 text-text-primary"
                              : "bg-gray-50 border-gray-300 text-gray-900"
                          } border rounded-lg focus:outline-none focus:border-primary`}
                        />
                      </div>
                      <div>
                        <label
                          className={`text-xs ${
                            theme === "dark"
                              ? "text-text-secondary"
                              : "text-gray-500"
                          } font-semibold uppercase tracking-wide`}
                        >
                          Pets
                        </label>
                        <input
                          type="text"
                          value={editForm.pets}
                          onChange={(e) =>
                            setEditField("pets", e.target.value)
                          }
                          className={`w-full mt-1 px-3 py-2 ${
                            theme === "dark"
                              ? "bg-background border-primary/20 text-text-primary"
                              : "bg-gray-50 border-gray-300 text-gray-900"
                          } border rounded-lg focus:outline-none focus:border-primary`}
                        />
                      </div>
                    </div>

                    {editError && (
                      <p className="text-red-500 text-sm">{editError}</p>
                    )}

                    <div className="flex gap-3 pt-2">
                      <button
                        onClick={handleSaveEdit}
                        disabled={editSaving}
                        className="flex-1 bg-primary text-white font-bold py-2.5 px-4 rounded-lg hover:bg-primary-hover disabled:opacity-50 transition"
                      >
                        {editSaving ? "Saving..." : "Save Changes"}
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        disabled={editSaving}
                        className={`px-4 py-2.5 rounded-lg font-semibold border-2 transition ${
                          theme === "dark"
                            ? "border-primary/20 text-text-secondary hover:border-primary"
                            : "border-gray-300 text-gray-700 hover:border-gray-400"
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : isHost ? (
              /* ── Host viewing another host's room: no booking/reviewing from a host account ── */
              <div
                className={`p-4 rounded-lg text-sm text-center ${
                  theme === "dark"
                    ? "bg-background text-text-secondary"
                    : "bg-gray-50 text-gray-600"
                }`}
              >
                Host accounts can't book or review rooms. Sign in with a guest
                account to reserve this room.
              </div>
            ) : (
              /* ── Guest view: booking widget ─────────────────────────────── */
              <>
                {/* Date pickers */}
                <div className="space-y-3 mb-4">
                  <div>
                    <label
                      className={`text-xs ${
                        theme === "dark"
                          ? "text-text-secondary"
                          : "text-gray-500"
                      } font-semibold uppercase tracking-wide`}
                    >
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className={`w-full mt-1 px-3 py-2 ${
                        theme === "dark"
                          ? "bg-background border-primary/20 text-text-primary"
                          : "bg-gray-50 border-gray-300 text-gray-900"
                      } border rounded-lg focus:outline-none focus:border-primary`}
                    />
                  </div>
                  <div>
                    <label
                      className={`text-xs ${
                        theme === "dark"
                          ? "text-text-secondary"
                          : "text-gray-500"
                      } font-semibold uppercase tracking-wide`}
                    >
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      min={checkIn || new Date().toISOString().split("T")[0]}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className={`w-full mt-1 px-3 py-2 ${
                        theme === "dark"
                          ? "bg-background border-primary/20 text-text-primary"
                          : "bg-gray-50 border-gray-300 text-gray-900"
                      } border rounded-lg focus:outline-none focus:border-primary`}
                    />
                  </div>
                  <div>
                    <label
                      className={`text-xs ${
                        theme === "dark"
                          ? "text-text-secondary"
                          : "text-gray-500"
                      } font-semibold uppercase tracking-wide`}
                    >
                      Guests
                    </label>
                    <input
                      type="number"
                      value={guests}
                      min={1}
                      max={room.maxGuests}
                      onChange={(e) => setGuests(e.target.value)}
                      className={`w-full mt-1 px-3 py-2 ${
                        theme === "dark"
                          ? "bg-background border-primary/20 text-text-primary"
                          : "bg-gray-50 border-gray-300 text-gray-900"
                      } border rounded-lg focus:outline-none focus:border-primary`}
                    />
                  </div>
                </div>

                {/* Pricing */}
                {nights > 0 && (
                  <div className="border-t border-b border-primary/10 py-3 my-3 space-y-2">
                    <div className="flex justify-between">
                      <p
                        className={`${
                          theme === "dark"
                            ? "text-text-secondary"
                            : "text-gray-600"
                        }`}
                      >
                        {formatNPR(room.price)} x {nights} nights
                      </p>
                      <p
                        className={`${
                          theme === "dark"
                            ? "text-text-secondary"
                            : "text-gray-600"
                        }`}
                      >
                        {formatNPR(subtotal)}
                      </p>
                    </div>
                    <div className="flex justify-between">
                      <p
                        className={`${
                          theme === "dark"
                            ? "text-text-secondary"
                            : "text-gray-600"
                        }`}
                      >
                        Taxes & fees
                      </p>
                      <p
                        className={`${
                          theme === "dark"
                            ? "text-text-secondary"
                            : "text-gray-600"
                        }`}
                      >
                        {formatNPR(taxes)}
                      </p>
                    </div>
                    <div className="flex justify-between font-bold text-text-primary pt-2">
                      <p>Grand Total</p>
                      <p>{formatNPR(grandTotal)}</p>
                    </div>
                  </div>
                )}

                {/* Booking Message */}
                {bookingMsg && (
                  <div
                    className={`p-3 rounded-lg my-3 text-sm ${
                      bookingMsg.type === "error"
                        ? "bg-red-500/10 text-red-500"
                        : "bg-green-500/10 text-green-500"
                    }`}
                  >
                    {bookingMsg.text}
                  </div>
                )}

                <button
                  onClick={handleReserve}
                  disabled={booking}
                  className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-hover disabled:opacity-50 transition"
                >
                  {booking ? "Reserving..." : "Reserve"}
                </button>
                <button
                  onClick={() => {
                    if (!isAuthenticated) {
                      navigate("/sign-in");
                      return;
                    }
                    const params = new URLSearchParams({
                      to: roomHostId || "",
                      room: room._id,
                      roomTitle: room.title,
                      hostName: room.host?.name || "Host",
                    });
                    navigate(`/messages?${params.toString()}`);
                  }}
                  className={`w-full mt-3 py-3 px-4 rounded-lg font-bold border-2 transition ${
                    theme === "dark"
                      ? "border-primary/30 text-text-primary hover:border-primary"
                      : "border-gray-300 text-gray-800 hover:border-primary"
                  }`}
                >
                  Message Host
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
