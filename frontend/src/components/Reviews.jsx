import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import { reviewsAPI } from "../services/api";

const StarRating = ({ rating, setRating, readOnly = false }) => {
  const { theme } = useTheme();
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            type="button"
            key={starValue}
            className={`text-3xl transition-colors ${
              starValue <= (hover || rating)
                ? "text-yellow-400"
                : theme === "dark"
                  ? "text-gray-600"
                  : "text-gray-300"
            }`}
            onClick={() => !readOnly && setRating(starValue)}
            onMouseEnter={() => !readOnly && setHover(starValue)}
            onMouseLeave={() => !readOnly && setHover(0)}
            disabled={readOnly}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};

const ReviewForm = ({ propertyId, onReviewSubmitted }) => {
  const { theme } = useTheme();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating.");
      return;
    }
    if (!user) {
      setError("You must be logged in to submit a review.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const reviewData = {
        propertyId,
        rating,
        comment,
      };
      await reviewsAPI.create(reviewData);
      setRating(0);
      setComment("");
      onReviewSubmitted();
    } catch (err) {
      setError(err.message || "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-6 rounded-2xl border ${
        theme === "dark"
          ? "bg-bg-secondary border-primary/20"
          : "bg-white border-gray-200"
      }`}
    >
      <h3
        className={`text-xl font-bold mb-4 ${
          theme === "dark" ? "text-text-primary" : "text-gray-900"
        }`}
      >
        Leave a Review
      </h3>
      {error && (
        <div className="bg-red-500/10 text-red-400 text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className={`block text-sm font-semibold mb-2 ${
              theme === "dark" ? "text-text-secondary" : "text-gray-700"
            }`}
          >
            Your Rating
          </label>
          <StarRating rating={rating} setRating={setRating} />
        </div>
        <div>
          <label
            htmlFor="comment"
            className={`block text-sm font-semibold mb-2 ${
              theme === "dark" ? "text-text-secondary" : "text-gray-700"
            }`}
          >
            Your Comment
          </label>
          <textarea
            id="comment"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            className={`w-full p-3 rounded-lg border text-sm ${
              theme === "dark"
                ? "bg-background border-primary/20 text-text-primary placeholder-text-muted"
                : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
            }`}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-hover disabled:opacity-50 transition"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

const ReviewItem = ({ review }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`p-5 rounded-xl border ${
        theme === "dark" ? "border-primary/10" : "border-gray-200"
      }`}
    >
      <div className="flex items-start gap-4">
        <img
          src={
            review.user.avatar ||
            `https://i.pravatar.cc/150?u=${review.user._id}`
          }
          alt={review.user.name}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4
              className={`font-bold ${
                theme === "dark" ? "text-text-primary" : "text-gray-900"
              }`}
            >
              {review.user.name}
            </h4>
            <span
              className={`text-xs ${
                theme === "dark" ? "text-text-muted" : "text-gray-500"
              }`}
            >
              {new Date(review.createdAt).toLocaleDateString()}
            </span>
          </div>
          <StarRating rating={review.rating} readOnly={true} />
          <p
            className={`mt-3 text-sm ${
              theme === "dark" ? "text-text-secondary" : "text-gray-700"
            }`}
          >
            {review.comment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Reviews({ propertyId }) {
  const { theme } = useTheme();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReviews = useCallback(async () => {
    if (!propertyId) return;
    try {
      setLoading(true);
      const fetchedReviews = await reviewsAPI.getForProperty(propertyId);
      setReviews(fetchedReviews);
    } catch (err) {
      console.error(err);
      setError("Failed to load reviews.");
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return (
    <div
      id="reviews"
      className={`py-12 mt-12 border-t ${
        theme === "dark" ? "border-primary/10" : "border-gray-200"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2
            className={`text-3xl font-bold ${
              theme === "dark" ? "text-text-primary" : "text-gray-900"
            }`}
          >
            Reviews ({reviews.length})
          </h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2">
              <StarRating rating={averageRating} readOnly={true} />
              <span
                className={`font-bold text-lg ${
                  theme === "dark" ? "text-text-primary" : "text-gray-800"
                }`}
              >
                {averageRating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {loading && <p>Loading reviews...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && reviews.length === 0 && (
              <div
                className={`text-center p-10 rounded-2xl ${
                  theme === "dark" ? "bg-bg-secondary" : "bg-gray-100"
                }`}
              >
                <p className="text-2xl mb-3">🤔</p>
                <p
                  className={`font-semibold ${
                    theme === "dark" ? "text-text-primary" : "text-gray-800"
                  }`}
                >
                  No reviews yet
                </p>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-text-secondary" : "text-gray-600"
                  }`}
                >
                  Be the first one to share your experience.
                </p>
              </div>
            )}
            {reviews.map((review) => (
              <ReviewItem key={review._id} review={review} />
            ))}
          </div>
          <div className="lg:col-span-1">
            <ReviewForm
              propertyId={propertyId}
              onReviewSubmitted={fetchReviews}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
