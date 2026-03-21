import React from "react";

export default function Hosting() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hosting Info Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div
            className="relative bg-bg-secondary rounded-xl overflow-hidden p-12"
            data-node-id="2:114"
          >
            {/* Background Rectangle */}
            <div
              className="absolute inset-0 bg-bg-secondary rounded-xl"
              data-node-id="2:115"
            ></div>

            {/* Content Container */}
            <div className="relative z-10 flex items-center justify-between gap-12">
              {/* Left Side - Text Content */}
              <div className="flex-1 max-w-2xl">
                {/* Main Title */}
                <h1
                  className="font-['Montserrat:Bold',sans-serif] font-bold text-[38px] text-text-primary leading-13 mb-6"
                  data-node-id="2:117"
                >
                  Try Hosting With Us
                </h1>

                {/* Subtitle */}
                <p
                  className="font-['Montserrat:Medium',sans-serif] font-medium text-[16px] text-text-secondary leading-13 mb-8"
                  data-node-id="2:116"
                >
                  Earn extra just by renting your property...
                </p>

                {/* Become A Host Button */}
                <button
                  className="bg-primary hover:bg-primary-hover text-white font-['Montserrat:Bold',sans-serif] font-bold text-[15px] px-8 py-3 rounded-full h-15 w-55 transition-colors"
                  data-node-id="2:118"
                >
                  <span data-node-id="2:119">Become A Host</span>
                </button>
              </div>

              {/* Right Side - Banner Image/Text */}
              <div className="flex-1 flex items-center justify-center">
                <p
                  className="font-['Montserrat:ExtraBold',sans-serif] font-extrabold text-[100px] text-text-muted leading-none text-right"
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
      <section className="py-20 px-6 md:px-12 bg-bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
            Why Host With Us?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit Card 1 */}
            <div className="bg-bg-secondary rounded-lg p-8 border border-text-muted/20">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                Earn Extra Income
              </h3>
              <p className="text-text-secondary">
                Monetize your property and earn passive income by listing with
                us.
              </p>
            </div>

            {/* Benefit Card 2 */}
            <div className="bg-bg-secondary rounded-lg p-8 border border-text-muted/20">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                Safe & Secure
              </h3>
              <p className="text-text-secondary">
                Your property and personal information are protected with our
                security measures.
              </p>
            </div>

            {/* Benefit Card 3 */}
            <div className="bg-bg-secondary rounded-lg p-8 border border-text-muted/20">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-text-primary mb-3">
                Reach Global Guests
              </h3>
              <p className="text-text-secondary">
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
          <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
            How It Works
          </h2>

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
                <div className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section (Optional) */}
      <section className="py-20 px-6 md:px-12 bg-bg-secondary/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">
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
                className="group border border-text-muted/20 rounded-lg p-6 cursor-pointer hover:border-primary transition"
              >
                <summary className="flex justify-between items-center font-bold text-text-primary">
                  {item.question}
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="text-text-secondary mt-4 pl-4">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
