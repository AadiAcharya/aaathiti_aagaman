import { useNavigate } from "react-router-dom";

export default function RentalGuide() {

const navigate = useNavigate()


  const guides = [
    {
      category: "🧳 Packing Tips",
      icon: "🎒",
      tips: [
        "Check the weather forecast for your destination",
        "Pack versatile clothing that can be mixed and matched",
        "Bring essential documents: ID, booking confirmation, insurance",
        "Include medications and first-aid supplies",
        "Pack a power bank and universal adapter",
        "Bring comfortable walking shoes",
      ],
    },
    {
      category: "🏡 Before Check-In",
      icon: "📋",
      tips: [
        "Review the house rules and house manual provided by the host",
        "Check parking information and where to park",
        "Confirm check-in time and get access instructions",
        "Ask about Wi-Fi password and utility controls",
        "Know the location of important items: trash bins, laundry, etc.",
        "Take photos of the property condition on arrival",
      ],
    },
    {
      category: "🔐 Safety & Security",
      icon: "🛡️",
      tips: [
        "Lock doors and windows when leaving",
        "Don't share your access code with others",
        "Keep valuables secure or in safe",
        "Know the location of fire exits",
        "Inform someone you trust of your location",
        "Use the host's 24/7 emergency contact if needed",
      ],
    },
    {
      category: "🧹 Keeping It Clean",
      icon: "✨",
      tips: [
        "Follow the cleaning expectations in the listing description",
        "Wash dishes after meals",
        "Take out trash when full",
        "Don't leave wet towels on furniture",
        "Vacuum if you spill something",
        "Leave the property as clean as you found it",
      ],
    },
    {
      category: "🎉 During Your Stay",
      icon: "😊",
      tips: [
        "Respect quiet hours (usually 10 PM - 8 AM)",
        "Keep noise levels reasonable, especially at night",
        "Don't host unauthorized parties",
        "Follow smoking and pet policies",
        "Report any issues to the host immediately",
        "Communicate with the host if you need help",
      ],
    },
    {
      category: "🚪 Check-Out Process",
      icon: "🏁",
      tips: [
        "Return keys or access codes as instructed",
        "Turn off lights and air conditioning",
        "Lock all windows and doors",
        "Leave contact information with the host",
        "Review your booking confirmation for final instructions",
        "Leave honest feedback about your stay",
      ],
    },
    {
      category: "💰 Payment & Booking",
      icon: "💳",
      tips: [
        "Read the cancellation policy before booking",
        "Book early for better rates and availability",
        "Consider booking multiple rooms for groups",
        "Check for seasonal discounts and promotions",
        "Make sure you understand what's included in the price",
        "Save booking confirmation and payment receipts",
      ],
    },
    {
      category: "🌍 First Time Travel",
      icon: "✈️",
      tips: [
        "Research the area and attractions beforehand",
        "Get local transportation information",
        "Exchange currency or find ATMs in advance",
        "Learn basic phrases in the local language",
        "Check visa requirements",
        "Register with your embassy if traveling internationally",
      ],
    },
  ];

  const dosDonts = [
    {
      title: "DO's ✅",
      color: "green",
      items: [
        "✓ Communicate with your host",
        "✓ Leave the property clean",
        "✓ Respect house rules",
        "✓ Report damages immediately",
        "✓ Check out on time",
        "✓ Leave honest reviews",
      ],
    },
    {
      title: "DON'Ts ❌",
      color: "red",
      items: [
        "✗ Smoke unless permitted",
        "✗ Host parties or unauthorized guests",
        "✗ Damage property intentionally",
        "✗ Share access codes",
        "✗ Leave trash or clutter",
        "✗ Make false damage claims",
      ],
    },
  ];

  return (

    <div className="min-h-screen bg-background text-text-primary">
      {/* Header Section */}
      <div className="bg-linear-to-r from-primary-dark to-primary-accent py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Rental Guide</h1>
          <p className="text-xl text-text-muted">
            Everything you need to know for a perfect stay
          </p>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="bg-secondary-dark/50 border-b border-gray-700 py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-text-muted text-center mb-6">Jump to a section:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {guides.map((guide, idx) => (
              <a
                key={idx}
                href={`#guide-${idx}`}
                className="px-4 py-2 bg-primary-accent/10 border border-primary-accent/30 rounded-full hover:bg-primary-accent/20 transition-all duration-300 text-sm"
              >
                {guide.icon} {guide.category.split(" ")[0]}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Do's and Don'ts */}
      <div className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Quick Reference: Do's & Don'ts
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {dosDonts.map((section, idx) => (
              <div
                key={idx}
                className="bg-secondary-dark border border-gray-700 rounded-lg p-8"
              >
                <h3 className="text-2xl font-bold mb-6">{section.title}</h3>
                <div className="space-y-3">
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0">
                        {item.includes("✓") ? "✅" : "❌"}
                      </span>
                      <p className="text-text-muted">
                        {item.replace("✓ ", "").replace("✗ ", "")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Guides */}
      <div className="py-16 px-4 md:px-8 bg-secondary-dark/50">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            {guides.map((guide, idx) => (
              <div
                key={idx}
                id={`guide-${idx}`}
                className="bg-secondary-dark border border-gray-700 rounded-lg p-8 hover:border-primary-accent/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-4xl">{guide.icon}</span>
                  <h3 className="text-2xl font-bold">{guide.category}</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {guide.tips.map((tip, tipIdx) => (
                    <div key={tipIdx} className="flex gap-3">
                      <span className="text-primary-accent text-xl shrink-0">
                        •
                      </span>
                      <p className="text-text-muted">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Resources */}
      <div className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            📚 Additional Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🎒",
                title: "Travel Essentials",
                description:
                  "A complete checklist of items to pack for your stay",
              },
              {
                icon: "🗺️",
                title: "Local Guides",
                description:
                  "Find attractions, restaurants, and activities near your rental",
              },
              {
                icon: "💬",
                title: "Communication",
                description: "How to contact your host and resolve any issues",
              },
              {
                icon: "🚨",
                title: "Emergency Contact",
                description: "24/7 emergency support number and procedures",
              },
              {
                icon: "💵",
                title: "Pricing Policy",
                description:
                  "Understand fees, deposits, and cancellation policies",
              },
              {
                icon: "⭐",
                title: "Reviews",
                description: "Read guest reviews and ratings for properties",
              },
            ].map((resource, idx) => (
              <div
                key={idx}
                className="bg-linear-to-br from-primary-accent/5 to-primary-dark/5 border border-primary-accent/20 rounded-lg p-6 hover:border-primary-accent/50 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{resource.icon}</div>
                <h4 className="text-lg font-bold mb-2">{resource.title}</h4>
                <p className="text-text-muted text-sm">
                  {resource.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="py-16 px-4 md:px-8 bg-linear-to-r from-primary-accent/5 to-primary-dark/5 border-t border-gray-700">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            💡 Pro Tips for Best Stays
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                tip: "Book in advance",
                detail: "Get better rates and more property choices",
              },
              {
                tip: "Read reviews carefully",
                detail:
                  "Look for comments about cleanliness and host responsiveness",
              },
              {
                tip: "Ask questions early",
                detail: "Don't hesitate to message the host before booking",
              },
              {
                tip: "Arrive early",
                detail:
                  "Give yourself time to settle and familiarize with the area",
              },
              {
                tip: "Take photos",
                detail: "Document the property condition on check-in",
              },
              {
                tip: "Leave feedback",
                detail: "Your honest reviews help other travelers decide",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-secondary-dark border border-gray-700 rounded-lg p-6"
              >
                <h4 className="text-lg font-bold mb-2 text-primary-accent">
                  {item.tip}
                </h4>
                <p className="text-text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto bg-linear-to-r from-primary-accent to-primary-dark border border-primary-accent/30 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Stay?</h2>
          <p className="text-lg text-text-muted mb-8">
            Explore thousands of unique properties and find your perfect rental
          </p>
          <button className="px-8 py-3 bg-primary text-primary-dark font-bold rounded-lg hover:bg-text-muted transition-all duration-300"
          onClick={()=> navigate("/properties")}>
            Browse Properties →
          </button>
        </div>
      </div>
    </div>
  );
}
