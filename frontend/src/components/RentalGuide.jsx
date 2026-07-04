import { useNavigate } from "react-router-dom";
import {
  Backpack,
  ClipboardList,
  Shield,
  Sparkles,
  Smile,
  Flag,
  CreditCard,
  Plane,
  CheckCircle,
  XCircle,
  BookOpen,
  Map,
  MessageCircle,
  Siren,
  Banknote,
  Star,
  Lightbulb,
} from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";

const guides = [
  { category: "Packing Tips", icon: Backpack, tips: [
    "Check the weather forecast for your destination",
    "Pack versatile clothing that can be mixed and matched",
    "Bring essential documents: ID, booking confirmation, insurance",
    "Include medications and first-aid supplies",
    "Pack a power bank and universal adapter",
    "Bring comfortable walking shoes",
  ]},
  { category: "Before Check-In", icon: ClipboardList, tips: [
    "Review the house rules and house manual provided by the host",
    "Check parking information and where to park",
    "Confirm check-in time and get access instructions",
    "Ask about Wi-Fi password and utility controls",
    "Know the location of important items: trash bins, laundry, etc.",
    "Take photos of the property condition on arrival",
  ]},
  { category: "Safety & Security", icon: Shield, tips: [
    "Lock doors and windows when leaving",
    "Don't share your access code with others",
    "Keep valuables secure or in safe",
    "Know the location of fire exits",
    "Inform someone you trust of your location",
    "Use the host's 24/7 emergency contact if needed",
  ]},
  { category: "Keeping It Clean", icon: Sparkles, tips: [
    "Follow the cleaning expectations in the listing description",
    "Wash dishes after meals",
    "Take out trash when full",
    "Don't leave wet towels on furniture",
    "Vacuum if you spill something",
    "Leave the property as clean as you found it",
  ]},
  { category: "During Your Stay", icon: Smile, tips: [
    "Respect quiet hours (usually 10 PM - 8 AM)",
    "Keep noise levels reasonable, especially at night",
    "Don't host unauthorized parties",
    "Follow smoking and pet policies",
    "Report any issues to the host immediately",
    "Communicate with the host if you need help",
  ]},
  { category: "Check-Out Process", icon: Flag, tips: [
    "Return keys or access codes as instructed",
    "Turn off lights and air conditioning",
    "Lock all windows and doors",
    "Leave contact information with the host",
    "Review your booking confirmation for final instructions",
    "Leave honest feedback about your stay",
  ]},
  { category: "Payment & Booking", icon: CreditCard, tips: [
    "Read the cancellation policy before booking",
    "Book early for better rates and availability",
    "Consider booking multiple rooms for groups",
    "Check for seasonal discounts and promotions",
    "Make sure you understand what's included in the price",
    "Save booking confirmation and payment receipts",
  ]},
  { category: "First Time Travel", icon: Plane, tips: [
    "Research the area and attractions beforehand",
    "Get local transportation information",
    "Exchange currency or find ATMs in advance",
    "Learn basic phrases in the local language",
    "Check visa requirements",
    "Register with your embassy if traveling internationally",
  ]},
];

const dosDonts = [
  { title: "DO's", titleIcon: CheckCircle, tone: "success", items: [
    "Communicate with your host",
    "Leave the property clean",
    "Respect house rules",
    "Report damages immediately",
    "Check out on time",
    "Leave honest reviews",
  ]},
  { title: "DON'Ts", titleIcon: XCircle, tone: "danger", items: [
    "Smoke unless permitted",
    "Host parties or unauthorized guests",
    "Damage property intentionally",
    "Share access codes",
    "Leave trash or clutter",
    "Make false damage claims",
  ]},
];

const resources = [
  { icon: Backpack, title: "Travel Essentials", description: "A complete checklist of items to pack for your stay" },
  { icon: Map, title: "Local Guides", description: "Find attractions, restaurants, and activities near your rental" },
  { icon: MessageCircle, title: "Communication", description: "How to contact your host and resolve any issues" },
  { icon: Siren, title: "Emergency Contact", description: "24/7 emergency support number and procedures" },
  { icon: Banknote, title: "Pricing Policy", description: "Understand fees, deposits, and cancellation policies" },
  { icon: Star, title: "Reviews", description: "Read guest reviews and ratings for properties" },
];

const proTips = [
  { tip: "Book in advance", detail: "Get better rates and more property choices" },
  { tip: "Read reviews carefully", detail: "Look for comments about cleanliness and host responsiveness" },
  { tip: "Ask questions early", detail: "Don't hesitate to message the host before booking" },
  { tip: "Arrive early", detail: "Give yourself time to settle and familiarize with the area" },
  { tip: "Take photos", detail: "Document the property condition on check-in" },
  { tip: "Leave feedback", detail: "Your honest reviews help other travelers decide" },
];

export default function RentalGuide() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="py-16 px-4 md:px-8 bg-bg-secondary">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">
            Rental Guide
          </h1>
          <p className="text-xl text-text-secondary">
            Everything you need to know for a perfect stay
          </p>
        </div>
      </div>

      <div className="py-8 px-4 md:px-8 bg-bg-secondary/50 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <p className="text-center mb-6 text-text-secondary">Jump to a section:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {guides.map((guide, idx) => (
              <a
                key={idx}
                href={`#guide-${idx}`}
                className="px-4 py-2 rounded-full text-sm bg-primary-subtle border border-primary/20 text-primary hover:bg-primary/20 transition-colors duration-[var(--duration-fast)]"
              >
                <span className="inline-flex items-center gap-1.5">
                  <guide.icon className="w-4 h-4" />
                  {guide.category.split(" ")[0]}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-12 text-center">
            Quick Reference: Do's & Don'ts
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {dosDonts.map((section) => (
              <Card key={section.title}>
                <h3 className="text-xl font-semibold text-text-primary mb-5 flex items-center gap-2">
                  <section.titleIcon
                    className={`w-5 h-5 ${section.tone === "success" ? "text-success" : "text-danger"}`}
                  />
                  {section.title}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <section.titleIcon
                        className={`w-4 h-4 mt-0.5 shrink-0 ${section.tone === "success" ? "text-success" : "text-danger"}`}
                      />
                      <p className="text-text-secondary text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 px-4 md:px-8 bg-bg-secondary/50">
        <div className="max-w-6xl mx-auto space-y-8">
          {guides.map((guide, idx) => (
            <Card key={idx} id={`guide-${idx}`} hoverable>
              <div className="flex items-center gap-3 mb-6">
                <guide.icon className="w-7 h-7 text-primary" />
                <h3 className="text-xl font-semibold text-text-primary">{guide.category}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {guide.tips.map((tip) => (
                  <div key={tip} className="flex gap-3">
                    <span className="text-primary shrink-0">•</span>
                    <p className="text-text-secondary text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-12 text-center flex items-center justify-center gap-3">
            <BookOpen className="w-7 h-7 text-primary" />
            Additional Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Card key={resource.title} hoverable>
                <resource.icon className="w-7 h-7 mb-3 text-primary" />
                <h4 className="text-base font-semibold text-text-primary mb-2">{resource.title}</h4>
                <p className="text-sm text-text-secondary">{resource.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 px-4 md:px-8 border-t border-border bg-bg-secondary/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-12 text-center flex items-center justify-center gap-3">
            <Lightbulb className="w-7 h-7 text-primary" />
            Pro Tips for Best Stays
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proTips.map((item) => (
              <Card key={item.tip}>
                <h4 className="text-base font-semibold text-primary mb-2">{item.tip}</h4>
                <p className="text-text-secondary text-sm">{item.detail}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 px-4 md:px-8">
        <div className="max-w-4xl mx-auto rounded-card p-12 text-center bg-gradient-to-br from-primary to-primary-hover">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-white">
            Ready to Book Your Stay?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Explore thousands of unique properties and find your perfect rental
          </p>
          <Button
            size="lg"
            className="!bg-white !text-primary hover:!bg-white/90"
            onClick={() => navigate("/rooms")}
          >
            Browse Properties →
          </Button>
        </div>
      </div>
    </div>
  );
}
