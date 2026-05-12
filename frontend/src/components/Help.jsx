import { useTheme } from "../context/ThemeContext";

export default function Help() {
  const { theme } = useTheme();

  return (
    <div
      className={`${
        theme === "dark" ? "bg-background" : "bg-white"
      } min-h-screen`}
    >
      {/* Header */}
      <div
        className={`${
          theme === "dark"
            ? "bg-bg-secondary border-b border-primary/10"
            : "bg-gray-100 border-b border-gray-200"
        } py-16`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h1
            className={`text-5xl font-bold ${
              theme === "dark" ? "text-text-primary" : "text-gray-900"
            } mb-4`}
          >
            Help Center
          </h1>
          <p
            className={`${
              theme === "dark" ? "text-text-secondary" : "text-gray-600"
            } text-lg`}
          >
            Find answers to your questions about Aatithi Aagaman
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        {/* Search Bar */}
        <div className="mb-20">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help..."
              className={`w-full ${
                theme === "dark"
                  ? "bg-bg-secondary border-primary/30 text-text-primary placeholder-text-secondary"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              } border rounded-lg px-6 py-4 focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg transition">
              Search
            </button>
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {/* Finding Properties */}
          <div
            className={`${
              theme === "dark"
                ? "bg-bg-secondary border-primary/10 hover:border-primary/30"
                : "bg-white border-gray-200 hover:border-gray-300"
            } rounded-lg p-8 border transition`}
          >
            <h3
              className={`text-2xl font-bold ${
                theme === "dark" ? "text-text-primary" : "text-gray-900"
              } mb-4`}
            >
              🏠 Finding Properties
            </h3>
            <ul
              className={`space-y-3 ${
                theme === "dark" ? "text-text-secondary" : "text-gray-600"
              }`}
            >
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • How to search for properties
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Filtering and sorting options
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Understanding property listings
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Viewing property details
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Adding properties to wishlist
              </li>
            </ul>
          </div>

          {/* Booking & Reservations */}
          <div
            className={`${
              theme === "dark"
                ? "bg-bg-secondary border-primary/10 hover:border-primary/30"
                : "bg-white border-gray-200 hover:border-gray-300"
            } rounded-lg p-8 border transition`}
          >
            <h3
              className={`text-2xl font-bold ${
                theme === "dark" ? "text-text-primary" : "text-gray-900"
              } mb-4`}
            >
              📅 Booking & Reservations
            </h3>
            <ul
              className={`space-y-3 ${
                theme === "dark" ? "text-text-secondary" : "text-gray-600"
              }`}
            >
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • How to make a booking
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Check-in and check-out process
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Modifying your reservation
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Cancellation policy
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Payment methods
              </li>
            </ul>
          </div>

          {/* Hosting Properties */}
          <div
            className={`${
              theme === "dark"
                ? "bg-bg-secondary border-primary/10 hover:border-primary/30"
                : "bg-white border-gray-200 hover:border-gray-300"
            } rounded-lg p-8 border transition`}
          >
            <h3
              className={`text-2xl font-bold ${
                theme === "dark" ? "text-text-primary" : "text-gray-900"
              } mb-4`}
            >
              🏢 Hosting Properties
            </h3>
            <ul
              className={`space-y-3 ${
                theme === "dark" ? "text-text-secondary" : "text-gray-600"
              }`}
            >
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • How to become a host
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Listing your property
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Setting prices and availability
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Managing guest requests
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Earning and payouts
              </li>
            </ul>
          </div>

          {/* Account & Security */}
          <div
            className={`${
              theme === "dark"
                ? "bg-bg-secondary border-primary/10 hover:border-primary/30"
                : "bg-white border-gray-200 hover:border-gray-300"
            } rounded-lg p-8 border transition`}
          >
            <h3
              className={`text-2xl font-bold ${
                theme === "dark" ? "text-text-primary" : "text-gray-900"
              } mb-4`}
            >
              🔐 Account & Security
            </h3>
            <ul
              className={`space-y-3 ${
                theme === "dark" ? "text-text-secondary" : "text-gray-600"
              }`}
            >
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Creating an account
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Resetting your password
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Updating profile information
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Verification process
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Privacy & safety
              </li>
            </ul>
          </div>

          {/* Messages & Communication */}
          <div
            className={`${
              theme === "dark"
                ? "bg-bg-secondary border-primary/10 hover:border-primary/30"
                : "bg-white border-gray-200 hover:border-gray-300"
            } rounded-lg p-8 border transition`}
          >
            <h3
              className={`text-2xl font-bold ${
                theme === "dark" ? "text-text-primary" : "text-gray-900"
              } mb-4`}
            >
              💬 Messages & Communication
            </h3>
            <ul
              className={`space-y-3 ${
                theme === "dark" ? "text-text-secondary" : "text-gray-600"
              }`}
            >
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Messaging hosts and guests
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Resolving communication issues
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Response times
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Notification settings
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Report inappropriate behavior
              </li>
            </ul>
          </div>

          {/* General Questions */}
          <div
            className={`${
              theme === "dark"
                ? "bg-bg-secondary border-primary/10 hover:border-primary/30"
                : "bg-white border-gray-200 hover:border-gray-300"
            } rounded-lg p-8 border transition`}
          >
            <h3
              className={`text-2xl font-bold ${
                theme === "dark" ? "text-text-primary" : "text-gray-900"
              } mb-4`}
            >
              ❓ General Questions
            </h3>
            <ul
              className={`space-y-3 ${
                theme === "dark" ? "text-text-secondary" : "text-gray-600"
              }`}
            >
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • What is Aatithi Aagaman?
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • How does it work?
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Fees and charges
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Terms of service
              </li>
              <li
                className={`hover:${
                  theme === "dark" ? "text-text-primary" : "text-gray-900"
                } cursor-pointer transition`}
              >
                • Contact support
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ Section */}
        <div
          className={`${
            theme === "dark"
              ? "bg-bg-secondary border-primary/10"
              : "bg-white border-gray-200"
          } rounded-lg p-12 border mb-20`}
        >
          <h2
            className={`text-3xl font-bold ${
              theme === "dark" ? "text-text-primary" : "text-gray-900"
            } mb-8`}
          >
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <details
              className={`group ${
                theme === "dark" ? "border-b border-primary/10" : "border-b"
              } pb-6`}
            >
              <summary
                className={`cursor-pointer flex justify-between items-center font-semibold ${
                  theme === "dark"
                    ? "text-text-primary hover:text-accent"
                    : "text-gray-900 hover:text-primary"
                } transition`}
              >
                <span>How do I get started on Aatithi Aagaman?</span>
                <span className="text-xl group-open:rotate-180 transition">
                  ▼
                </span>
              </summary>
              <p
                className={`${
                  theme === "dark" ? "text-text-secondary" : "text-gray-600"
                } mt-4 ml-4`}
              >
                Simply create an account, browse available properties, and start
                booking. If you want to host, go to "Become A Host" to list your
                property.
              </p>
            </details>

            <details
              className={`group ${
                theme === "dark" ? "border-b border-primary/10" : "border-b"
              } pb-6`}
            >
              <summary
                className={`cursor-pointer flex justify-between items-center font-semibold ${
                  theme === "dark"
                    ? "text-text-primary hover:text-accent"
                    : "text-gray-900 hover:text-primary"
                } transition`}
              >
                <span>Is it safe to book through Aatithi Aagaman?</span>
                <span className="text-xl group-open:rotate-180 transition">
                  ▼
                </span>
              </summary>
              <p
                className={`${
                  theme === "dark" ? "text-text-secondary" : "text-gray-600"
                } mt-4 ml-4`}
              >
                Yes! All users are verified, and we have secure payment
                processing. Guest and host reviews ensure transparency and
                accountability.
              </p>
            </details>

            <details
              className={`group ${
                theme === "dark" ? "border-b border-primary/10" : "border-b"
              } pb-6`}
            >
              <summary
                className={`cursor-pointer flex justify-between items-center font-semibold ${
                  theme === "dark"
                    ? "text-text-primary hover:text-accent"
                    : "text-gray-900 hover:text-primary"
                } transition`}
              >
                <span>What are the cancellation policies?</span>
                <span className="text-xl group-open:rotate-180 transition">
                  ▼
                </span>
              </summary>
              <p
                className={`${
                  theme === "dark" ? "text-text-secondary" : "text-gray-600"
                } mt-4 ml-4`}
              >
                Cancellation policies vary by listing. Check each property's
                specific policy before booking. We offer flexible, moderate, and
                strict cancellation options.
              </p>
            </details>

            <details
              className={`group ${
                theme === "dark" ? "border-b border-primary/10" : "border-b"
              } pb-6`}
            >
              <summary
                className={`cursor-pointer flex justify-between items-center font-semibold ${
                  theme === "dark"
                    ? "text-text-primary hover:text-accent"
                    : "text-gray-900 hover:text-primary"
                } transition`}
              >
                <span>How do I become a host?</span>
                <span className="text-xl group-open:rotate-180 transition">
                  ▼
                </span>
              </summary>
              <p
                className={`${
                  theme === "dark" ? "text-text-secondary" : "text-gray-600"
                } mt-4 ml-4`}
              >
                Click "Become A Host" in the header, complete the verification
                process, list your property with photos and details, set your
                prices, and start accepting bookings.
              </p>
            </details>

            <details
              className={`group ${
                theme === "dark" ? "border-b border-primary/10" : "border-b"
              } pb-6`}
            >
              <summary
                className={`cursor-pointer flex justify-between items-center font-semibold ${
                  theme === "dark"
                    ? "text-text-primary hover:text-accent"
                    : "text-gray-900 hover:text-primary"
                } transition`}
              >
                <span>How do I communicate with hosts or guests?</span>
                <span className="text-xl group-open:rotate-180 transition">
                  ▼
                </span>
              </summary>
              <p
                className={`${
                  theme === "dark" ? "text-text-secondary" : "text-gray-600"
                } mt-4 ml-4`}
              >
                Use our in-app messaging feature to communicate directly. Go to
                "Messages" in your account to view all conversations.
              </p>
            </details>

            <details className="group pb-6">
              <summary
                className={`cursor-pointer flex justify-between items-center font-semibold ${
                  theme === "dark"
                    ? "text-text-primary hover:text-accent"
                    : "text-gray-900 hover:text-primary"
                } transition`}
              >
                <span>
                  How do I report a problem or inappropriate behavior?
                </span>
                <span className="text-xl group-open:rotate-180 transition">
                  ▼
                </span>
              </summary>
              <p
                className={`${
                  theme === "dark" ? "text-text-secondary" : "text-gray-600"
                } mt-4 ml-4`}
              >
                Contact our support team through the Help Center or report the
                user directly from their profile. We take all reports seriously
                and investigate promptly.
              </p>
            </details>
          </div>
        </div>

        {/* Contact Support Section */}
        <div
          className={`${
            theme === "dark"
              ? "bg-primary/10 border-primary/30"
              : "bg-gray-100 border-gray-200"
          } border rounded-lg p-12 text-center`}
        >
          <h2
            className={`text-3xl font-bold ${
              theme === "dark" ? "text-text-primary" : "text-gray-900"
            } mb-4`}
          >
            Still Need Help?
          </h2>
          <p
            className={`${
              theme === "dark" ? "text-text-secondary" : "text-gray-600"
            } text-lg mb-8`}
          >
            Can't find the answer you're looking for? Our support team is here
            to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary hover:bg-primary-hover text-white font-semibold px-8 py-3 rounded-lg transition">
              Contact Support
            </button>
            <button
              className={`${
                theme === "dark"
                  ? "bg-bg-secondary hover:bg-bg-secondary/80 text-text-primary border-primary/30"
                  : "bg-white hover:bg-gray-50 text-gray-900 border-gray-300"
              } font-semibold px-8 py-3 rounded-lg border transition`}
            >
              Email Us
            </button>
          </div>
          <p
            className={`${
              theme === "dark" ? "text-text-secondary" : "text-gray-600"
            } text-sm mt-6`}
          >
            📧 Email: aadityaacharya156@gmail.com
            <br />
            📞 Phone: +977 9865004688
            <br />
            💬 Live Chat: Available 24/7
          </p>
        </div>
      </main>
    </div>
  );
}
