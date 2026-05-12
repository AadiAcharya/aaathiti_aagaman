import { useTheme } from "../context/ThemeContext";

export default function HowItWorks() {
  const { theme } = useTheme();
  const stepsForGuests = [
    {
      number: 1,
      title: "Search & Browse",
      description:
        "Explore thousands of unique properties and rooms on our platform",
      icon: "🔍",
      details:
        "Use our advanced filters to find exactly what you're looking for",
    },
    {
      number: 2,
      title: "View Details",
      description: "Check out high-quality photos, descriptions, and reviews",
      icon: "📸",
      details: "Get all the information you need before making a decision",
    },
    {
      number: 3,
      title: "Check Availability",
      description: "View the calendar and select your desired dates",
      icon: "📅",
      details: "See real-time availability and book instantly",
    },
    {
      number: 4,
      title: "Make Payment",
      description: "Secure payment processing with multiple options",
      icon: "💳",
      details: "Your payment information is fully protected",
    },
    {
      number: 5,
      title: "Confirm Booking",
      description: "Receive confirmation and details from the host",
      icon: "✅",
      details: "Get check-in instructions and host contact info",
    },
    {
      number: 6,
      title: "Enjoy Your Stay",
      description: "Have an amazing experience and share your feedback",
      icon: "🎉",
      details: "Leave a review to help other travelers",
    },
  ];

  const stepsForHosts = [
    {
      number: 1,
      title: "Join as Host",
      description: "Create an account and get verified as a property host",
      icon: "🏠",
      details: "Complete your profile with ID verification",
    },
    {
      number: 2,
      title: "List Your Property",
      description: "Add your property details, photos, and pricing",
      icon: "📝",
      details: "Choose from various property types and room configurations",
    },
    {
      number: 3,
      title: "Set Up Calendar",
      description: "Control availability and set your pricing rates",
      icon: "💰",
      details: "Dynamic pricing for different seasons available",
    },
    {
      number: 4,
      title: "Receive Bookings",
      description: "Get notified when guests book your property",
      icon: "📬",
      details: "Accept or decline bookings based on your preferences",
    },
    {
      number: 5,
      title: "Welcome Guests",
      description: "Meet your guests and provide excellent service",
      icon: "👋",
      details: "Communication tools available through the platform",
    },
    {
      number: 6,
      title: "Earn Money",
      description: "Receive payments and manage your earnings",
      icon: "💵",
      details: "Track income and download financial reports",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-900 text-slate-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header Section */}
      <div
        className={`py-16 px-4 md:px-8 ${
          theme === "dark"
            ? "bg-gradient-to-r from-slate-800 to-slate-900"
            : "bg-gradient-to-r from-gray-100 to-gray-200"
        }`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h1>
          <p
            className={`text-xl mb-8 ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}
          >
            Your journey with us is simple, secure, and straightforward
          </p>
        </div>
      </div>

      {/* For Guests Section */}
      <div className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2 flex items-center">
              👥 For Guests
            </h2>
            <p
              className={`text-lg ${
                theme === "dark" ? "text-slate-400" : "text-gray-600"
              }`}
            >
              Book your perfect stay in 6 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stepsForGuests.map((step) => (
              <div
                key={step.number}
                className={`rounded-lg p-6 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-slate-800 border border-slate-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
                    : "bg-white border border-gray-200 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
                }`}
              >
                <div className="mb-4">
                  <span className="text-5xl">{step.icon}</span>
                  <div
                    className={`mt-3 inline-block rounded-full w-10 h-10 flex items-center justify-center font-bold text-white ${
                      theme === "dark" ? "bg-blue-600" : "bg-blue-500"
                    }`}
                  >
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p
                  className={`mb-3 ${
                    theme === "dark" ? "text-slate-400" : "text-gray-600"
                  }`}
                >
                  {step.description}
                </p>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-slate-500" : "text-gray-500"
                  }`}
                >
                  {step.details}
                </p>
              </div>
            ))}
          </div>

          {/* Guest Tips */}
          <div
            className={`mt-12 rounded-lg p-8 ${
              theme === "dark"
                ? "bg-gradient-to-r from-blue-500/10 to-slate-800/10 border border-blue-500/20"
                : "bg-gradient-to-r from-blue-500/10 to-gray-100/10 border border-blue-500/20"
            }`}
          >
            <h3 className="text-2xl font-bold mb-4">💡 Tips for Guests</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <span className="text-2xl flex-shrink-0">🔒</span>
                <div>
                  <p className="font-semibold">Always verify the host</p>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    Check reviews and host ratings
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl flex-shrink-0">📸</span>
                <div>
                  <p className="font-semibold">Check photos carefully</p>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    Look for recent photos and 360° views
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl flex-shrink-0">🗨️</span>
                <div>
                  <p className="font-semibold">Message before booking</p>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    Ask questions to clarify any doubts
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl flex-shrink-0">⭐</span>
                <div>
                  <p className="font-semibold">Leave honest reviews</p>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    Help other travelers make decisions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div
        className={`border-t ${
          theme === "dark" ? "border-slate-700" : "border-gray-200"
        }`}
      ></div>

      {/* For Hosts Section */}
      <div className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-2 flex items-center">
              🏘️ For Hosts
            </h2>
            <p
              className={`text-lg ${
                theme === "dark" ? "text-slate-400" : "text-gray-600"
              }`}
            >
              Start earning by sharing your property in 6 steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stepsForHosts.map((step) => (
              <div
                key={step.number}
                className={`rounded-lg p-6 transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-slate-800 border border-slate-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
                    : "bg-white border border-gray-200 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
                }`}
              >
                <div className="mb-4">
                  <span className="text-5xl">{step.icon}</span>
                  <div
                    className={`mt-3 inline-block rounded-full w-10 h-10 flex items-center justify-center font-bold text-white ${
                      theme === "dark" ? "bg-blue-600" : "bg-blue-500"
                    }`}
                  >
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p
                  className={`mb-3 ${
                    theme === "dark" ? "text-slate-400" : "text-gray-600"
                  }`}
                >
                  {step.description}
                </p>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-slate-500" : "text-gray-500"
                  }`}
                >
                  {step.details}
                </p>
              </div>
            ))}
          </div>

          {/* Host Tips */}
          <div
            className={`mt-12 rounded-lg p-8 ${
              theme === "dark"
                ? "bg-gradient-to-r from-blue-500/10 to-slate-800/10 border border-blue-500/20"
                : "bg-gradient-to-r from-blue-500/10 to-gray-100/10 border border-blue-500/20"
            }`}
          >
            <h3 className="text-2xl font-bold mb-4">💡 Tips for Hosts</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <span className="text-2xl flex-shrink-0">📷</span>
                <div>
                  <p className="font-semibold">Professional photos matter</p>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    Use natural lighting and showcase all rooms
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl flex-shrink-0">💬</span>
                <div>
                  <p className="font-semibold">Respond quickly</p>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    Quick responses increase booking chances
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl flex-shrink-0">🏆</span>
                <div>
                  <p className="font-semibold">Provide excellent service</p>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    High ratings lead to more bookings
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="text-2xl flex-shrink-0">💵</span>
                <div>
                  <p className="font-semibold">Price competitively</p>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-slate-400" : "text-gray-600"
                    }`}
                  >
                    Research similar properties in your area
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div
        className={`py-16 px-4 md:px-8 ${
          theme === "dark" ? "bg-slate-800/50" : "bg-gray-100/50"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                q: "Is it safe to book through Aathiti Aagaman?",
                a: "Yes! We use secure payment processing, verified hosts, and guest reviews to ensure a safe experience.",
              },
              {
                q: "What if I need to cancel my booking?",
                a: "Check the cancellation policy before booking. Most properties offer flexible cancellation up to 7 days before arrival.",
              },
              {
                q: "How do I become a verified host?",
                a: "Complete your profile, provide government-issued ID, and follow our community guidelines. Verification takes 24-48 hours.",
              },
              {
                q: "Are there any hidden fees?",
                a: "No hidden fees! All costs are clearly displayed before checkout: nightly rate, service fee, and taxes.",
              },
              {
                q: "Can I modify my reservation?",
                a: "Yes, you can modify dates or cancel based on the property's cancellation policy. Just log in to your dashboard.",
              },
              {
                q: "How quickly will I receive my earnings?",
                a: "Payments are processed 48 hours after guest check-out and transferred to your bank account within 5-7 business days.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className={`rounded-lg p-6 ${
                  theme === "dark"
                    ? "bg-slate-800 border border-slate-700"
                    : "bg-white border border-gray-200"
                }`}
              >
                <h4
                  className={`text-lg font-bold mb-3 ${
                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {faq.q}
                </h4>
                <p
                  className={`${
                    theme === "dark" ? "text-slate-400" : "text-gray-600"
                  }`}
                >
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
