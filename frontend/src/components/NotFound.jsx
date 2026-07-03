import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-primary text-white px-6 py-3 rounded-full font-semibold transition hover:bg-primary-hover"
      >
        Back to Home
      </Link>
    </div>
  );
}
