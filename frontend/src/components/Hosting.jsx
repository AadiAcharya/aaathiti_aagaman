import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function Hosting() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-900 text-slate-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Hosting Info Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative rounded-xl overflow-hidden p-12 ${
              theme === "dark"
                ? "bg-slate-800"
                : "bg-white border border-gray-200"
            }`}
            data-node-id="2:114"
          >
            {/* Content Container */}
            <div className="relative z-10 flex items-center justify-between gap-12">
              {/* Left Side - Text Content */}
              <div className="flex-1 max-w-2xl">
                {/* Main Title */}
                <h1
                  className="font-['Montserrat:Bold',sans-serif] font-bold text-[38px] leading-13 mb-6"
                  data-node-id="2:117"
                >
                  Try Hosting With Us
                </h1>

                {/* Subtitle */}
                <p
                  className={`font-['Montserrat:Medium',sans-serif] font-medium text-[16px] leading-13 mb-8 ${
                    theme === "dark" ? "text-slate-400" : "text-gray-600"
                  }`}
                  data-node-id="2:116"
                >
                  Earn extra just by renting your property...
                </p>

                {/* Become A Host Button */}
                <button
                  onClick={() => navigate("/add-property")}
                  className={`text-white font-['Montserrat:Bold',sans-serif] font-bold text-[15px] px-8 py-3 rounded-full h-15 w-55 transition-colors ${
                    theme === "dark"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  data-node-id="2:118"
                >
                  <span data-node-id="2:119">Become A Host</span>
                </button>
              </div>

              {/* Right Side - Banner Image/Text */}
              <div className="flex-1 flex items-center justify-center">
                <p
                  className={`font-['Montserrat:ExtraBold',sans-serif] font-extrabold text-[100px] leading-none text-right ${
                    theme === "dark" ? "text-slate-700" : "text-gray-200"
                  }`}
                  data-node-id="2:120"
                >
                  BANNER
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Hosting Benefits Section (Optional) */}
      <section
        className={`py-20 px-6 md:px-12 ${
          theme === "dark" ? "bg-slate-800/50" : "bg-gray-100/50"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Host With Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit Card 1 */}
            <div
              className={`rounded-lg p-8 ${
                theme === "dark"
                  ? "bg-slate-800 border border-slate-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3">Earn Extra Income</h3>
              <p
                className={`${
                  theme === "dark" ? "text-slate-400" : "text-gray-600"
                }`}
              >
                Monetize your property and earn passive income by listing with
                us.
              </p>
            </div>

            {/* Benefit Card 2 */}
            <div
              className={`rounded-lg p-8 ${
                theme === "dark"
                  ? "bg-slate-800 border border-slate-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-3">Safe & Secure</h3>
              <p
                className={`${
                  theme === "dark" ? "text-slate-400" : "text-gray-600"
                }`}
              >
                Your property and personal information are protected with our
                security measures.
              </p>
            </div>

            {/* Benefit Card 3 */}
            <div
              className={`rounded-lg p-8 ${
                theme === "dark"
                  ? "bg-slate-800 border border-slate-700"
                  : "bg-white border border-gray-200"
              }`}
            >
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3">Reach Global Guests</h3>
              <p
                className={`${
                  theme === "dark" ? "text-slate-400" : "text-gray-600"
                }`}
              >
                Connect with travelers from around the world and grow your
                network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section (Optional) */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Sign Up",
                description: "Create your account in minutes",
              },
              {
                step: "2",
                title: "List Your Property",
                description: "Add photos and details about your space",
              },
              {
                step: "3",
                title: "Set Your Price",
                description: "Choose your rental rates and availability",
              },
              {
                step: "4",
                title: "Start Earning",
                description: "Welcome guests and earn money",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                    theme === "dark" ? "bg-blue-600" : "bg-blue-500"
                  }`}
                >
                  <span className="text-2xl font-bold text-white">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-slate-400" : "text-gray-600"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section (Optional) */}
      <section
        className={`py-20 px-6 md:px-12 ${
          theme === "dark" ? "bg-slate-800/50" : "bg-gray-100/50"
        }`}
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                question: "How do I list my property?",
                answer:
                  "Click 'Become A Host' and follow our simple listing process. It takes about 20 minutes.",
              },
              {
                question: "What documents do I need?",
                answer:
                  "You'll need proof of ownership or authorization, ID verification, and bank details for payments.",
              },
              {
                question: "How do I get paid?",
                answer:
                  "Payments are transferred to your bank account within 2-3 business days after checkout.",
              },
              {
                question: "What if there's a problem with a guest?",
                answer:
                  "Our 24/7 support team is here to help. We have comprehensive protection policies in place.",
              },
            ].map((item, index) => (
              <details
                key={index}
                className={`group rounded-lg p-6 cursor-pointer transition ${
                  theme === "dark"
                    ? "border border-slate-700 hover:border-blue-500"
                    : "border border-gray-200 hover:border-blue-500"
                }`}
              >
                <summary className="flex justify-between items-center font-bold">
                  {item.question}
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p
                  className={`mt-4 pl-4 ${
                    theme === "dark" ? "text-slate-400" : "text-gray-600"
                  }`}
                >
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
