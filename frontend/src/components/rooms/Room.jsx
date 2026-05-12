import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { roomsAPI, bookingsAPI } from "../../services/api";

const amenityIcons = {
  WiFi: "📶",
  TV: "📺",
  AC: "❄️",
  "Mini Bar": "🍹",
  "Coffee Maker": "☕",
  Balcony: "🌴",
  Kitchen: "🍳",
  Washer: "🧺",
  "Work Desk": "💼",
  Fireplace: "🔥",
  "Mountain View": "⛰️",
  "Hot Tub Access": "🛁",
  "City View": "🏙️",
  "Beach Access": "🏖️",
};
const getAmenityIcon = (a) => amenityIcons[a] || "✓";

export default function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Booking form state
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [booking, setBooking] = useState(false);
  const [bookingMsg, setBookingMsg] = useState(null);

  // Review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

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
        text: `Booking confirmed! Total: $${b.grandTotal}`,
      });
    } catch (err) {
      setBookingMsg({ type: "error", text: err.message });
    } finally {
      setBooking(false);
    }
  };

  const handleReview = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in");
      return;
    }
    if (!reviewComment.trim()) return;

    try {
      setSubmittingReview(true);
      const { reviews, rating } = await roomsAPI.addReview(room._id, {
        rating: reviewRating,
        comment: reviewComment,
      });
      setRoom((prev) => ({ ...prev, reviewsArray: reviews, rating }));
      setReviewComment("");
      setReviewRating(5);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmittingReview(false);
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

        <div className="grid grid-cols-3 gap-8">
          {/* Left column */}
          <div className="col-span-2">
            {/* Title */}
            <div className="mb-8 flex justify-between items-start">
              <div>
                <h1
                  className={`text-3xl font-bold ${
                    theme === "dark" ? "text-text-primary" : "text-gray-900"
                  } mb-2`}
                >
                  {room.title}
                </h1>
                <p
                  className={`${
                    theme === "dark" ? "text-text-secondary" : "text-gray-600"
                  }`}
                >
                  {room.type} · {room.bedType} · {room.size} · Up to{" "}
                  {room.maxGuests} guests
                </p>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-yellow-500 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <span
                  className={`font-bold ${
                    theme === "dark" ? "text-text-primary" : "text-gray-800"
                  }`}
                >
                  {room.rating}
                </span>
                <span
                  className={`${
                    theme === "dark" ? "text-text-secondary" : "text-gray-500"
                  }`}
                >
                  ({room.reviews} reviews)
                </span>
              </div>
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
                  { icon: "🛏️", label: room.bedType || "Bed" },
                  { icon: "📐", label: room.size || "Size" },
                  { icon: "👥", label: `${room.maxGuests} Guests` },
                  { icon: "🏷️", label: room.type },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`${
                      theme === "dark"
                        ? "bg-bg-secondary border-primary/20 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
                        : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
                    } p-6 rounded-lg text-center border transition-all duration-300`}
                  >
                    <span className="text-4xl mb-2 block">{item.icon}</span>
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
                        <span className="text-2xl">{getAmenityIcon(a)}</span>
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
                        <span className="text-2xl">{getAmenityIcon(a)}</span>
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
                      <span className="text-2xl">🛡️</span>
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
                    theme === "dark" ? "text-accent" : "text-blue-600"
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
                        <span className="text-accent">
                          {"⭐".repeat(review.rating)}
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

              {/* Add Review */}
              {localStorage.getItem("token") && (
                <div
                  className={`${
                    theme === "dark"
                      ? "bg-bg-secondary border-primary/20"
                      : "bg-white border-gray-200"
                  } p-6 rounded-lg border`}
                >
                  <h3
                    className={`font-bold ${
                      theme === "dark" ? "text-text-primary" : "text-gray-900"
                    } mb-4`}
                  >
                    Leave a Review
                  </h3>
                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setReviewRating(star)}
                        className={`text-2xl transition ${star <= reviewRating ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share your experience..."
                    rows={3}
                    className={`w-full px-4 py-3 ${
                      theme === "dark"
                        ? "bg-background border-primary/20 text-text-primary placeholder-text-secondary"
                        : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                    } border rounded-lg focus:outline-none focus:border-primary resize-none mb-4`}
                  />
                  <button
                    onClick={handleReview}
                    disabled={submittingReview || !reviewComment.trim()}
                    className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-hover transition disabled:opacity-50"
                  >
                    {submittingReview ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar — Booking */}
          <div className="col-span-1">
            <div
              className={`${
                theme === "dark"
                  ? "bg-gradient-to-br from-bg-secondary to-bg-secondary/50 border-primary/30 shadow-xl shadow-primary/10"
                  : "bg-gradient-to-br from-white to-gray-100/50 border-gray-200 shadow-lg"
              } border-2 rounded-lg p-6 sticky top-32`}
            >
              <p
                className={`text-2xl font-bold ${
                  theme === "dark" ? "text-accent" : "text-blue-600"
                } mb-2`}
              >
                ${room.price}
                <span
                  className={`text-sm font-normal ${
                    theme === "dark" ? "text-text-secondary" : "text-gray-500"
                  }`}
                >
                  {" "}
                  / night
                </span>
              </p>

              {/* Date pickers */}
              <div className="space-y-3 mb-4">
                <div>
                  <label
                    className={`text-xs ${
                      theme === "dark" ? "text-text-secondary" : "text-gray-500"
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
                      theme === "dark" ? "text-text-secondary" : "text-gray-500"
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
                      theme === "dark" ? "text-text-secondary" : "text-gray-500"
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
                      ${room.price} x {nights} nights
                    </p>
                    <p
                      className={`${
                        theme === "dark"
                          ? "text-text-secondary"
                          : "text-gray-600"
                      }`}
                    >
                      ${subtotal}
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
                      ${taxes}
                    </p>
                  </div>
                  <div className="flex justify-between font-bold text-text-primary pt-2">
                    <p>Grand Total</p>
                    <p>${grandTotal}</p>
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
                className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-hover transition disabled:opacity-50"
              >
                {booking ? "Reserving..." : "Reserve"}
              </button>
            </div>
          </div>
        </div>

        {/* Nearby Services placeholder */}
        <div className="mt-16 mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Nearby Services
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {["Restaurant", "Gym", "Spa"].map((s) => (
              <div
                key={s}
                className="bg-bg-secondary border border-primary/20 rounded-lg p-4 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-accent">⭐⭐⭐⭐⭐</span>
                </div>
                <h3 className="font-bold text-text-primary">{s}</h3>
                <p className="text-sm text-text-secondary">0.3 km away</p>
              </div>
            ))}
          </div>
          <button className="mt-6 px-8 py-3 bg-primary text-background rounded-full font-semibold hover:bg-primary-hover hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105">
            Show On Map
          </button>
        </div>
      </div>
    </div>
  );
}
