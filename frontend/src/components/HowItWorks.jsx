import {
  Search,
  Camera,
  Calendar,
  CreditCard,
  CheckCircle,
  PartyPopper,
  Home,
  Pencil,
  DollarSign,
  Mail,
  Hand,
  Banknote,
  Users,
  Building2,
  Lightbulb,
  Lock,
  MessageSquare,
  Star,
  MessageCircle,
  Trophy,
} from "lucide-react";
import Card from "./ui/Card";

const stepsForGuests = [
  { number: 1, title: "Search & Browse", description: "Explore thousands of unique properties and rooms on our platform", icon: Search, details: "Use our advanced filters to find exactly what you're looking for" },
  { number: 2, title: "View Details", description: "Check out high-quality photos, descriptions, and reviews", icon: Camera, details: "Get all the information you need before making a decision" },
  { number: 3, title: "Check Availability", description: "View the calendar and select your desired dates", icon: Calendar, details: "See real-time availability and book instantly" },
  { number: 4, title: "Make Payment", description: "Secure payment processing with multiple options", icon: CreditCard, details: "Your payment information is fully protected" },
  { number: 5, title: "Confirm Booking", description: "Receive confirmation and details from the host", icon: CheckCircle, details: "Get check-in instructions and host contact info" },
  { number: 6, title: "Enjoy Your Stay", description: "Have an amazing experience and share your feedback", icon: PartyPopper, details: "Leave a review to help other travelers" },
];

const stepsForHosts = [
  { number: 1, title: "Join as Host", description: "Create an account and get verified as a property host", icon: Home, details: "Complete your profile with ID verification" },
  { number: 2, title: "List Your Property", description: "Add your property details, photos, and pricing", icon: Pencil, details: "Choose from various property types and room configurations" },
  { number: 3, title: "Set Up Calendar", description: "Control availability and set your pricing rates", icon: DollarSign, details: "Dynamic pricing for different seasons available" },
  { number: 4, title: "Receive Bookings", description: "Get notified when guests book your property", icon: Mail, details: "Accept or decline bookings based on your preferences" },
  { number: 5, title: "Welcome Guests", description: "Meet your guests and provide excellent service", icon: Hand, details: "Communication tools available through the platform" },
  { number: 6, title: "Earn Money", description: "Receive payments and manage your earnings", icon: Banknote, details: "Track income and download financial reports" },
];

const guestTips = [
  { icon: Lock, title: "Always verify the host", detail: "Check reviews and host ratings" },
  { icon: Camera, title: "Check photos carefully", detail: "Look for recent photos and 360° views" },
  { icon: MessageSquare, title: "Message before booking", detail: "Ask questions to clarify any doubts" },
  { icon: Star, title: "Leave honest reviews", detail: "Help other travelers make decisions" },
];

const hostTips = [
  { icon: Camera, title: "Professional photos matter", detail: "Use natural lighting and showcase all rooms" },
  { icon: MessageCircle, title: "Respond quickly", detail: "Quick responses increase booking chances" },
  { icon: Trophy, title: "Provide excellent service", detail: "High ratings lead to more bookings" },
  { icon: Banknote, title: "Price competitively", detail: "Research similar properties in your area" },
];

const faqs = [
  { q: "Is it safe to book through Aathiti Aagaman?", a: "Yes! We use secure payment processing, verified hosts, and guest reviews to ensure a safe experience." },
  { q: "What if I need to cancel my booking?", a: "Check the cancellation policy before booking. Most properties offer flexible cancellation up to 7 days before arrival." },
  { q: "How do I become a verified host?", a: "Complete your profile, provide government-issued ID, and follow our community guidelines. Verification takes 24-48 hours." },
  { q: "Are there any hidden fees?", a: "No hidden fees! All costs are clearly displayed before checkout: nightly rate, service fee, and taxes." },
  { q: "Can I modify my reservation?", a: "Yes, you can modify dates or cancel based on the property's cancellation policy. Just log in to your dashboard." },
  { q: "How quickly will I receive my earnings?", a: "Payments are processed 48 hours after guest check-out and transferred to your bank account within 5-7 business days." },
];

function StepGrid({ steps }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {steps.map((step) => (
        <Card key={step.number} hoverable>
          <div className="mb-4">
            <step.icon className="w-9 h-9 text-primary" />
            <div className="mt-3 rounded-full w-9 h-9 flex items-center justify-center font-bold text-white bg-primary">
              {step.number}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">{step.title}</h3>
          <p className="text-text-secondary mb-3">{step.description}</p>
          <p className="text-sm text-text-muted">{step.details}</p>
        </Card>
      ))}
    </div>
  );
}

function TipsCard({ title, tips }) {
  return (
    <Card className="mt-12 bg-primary-subtle border-primary/20">
      <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-primary" /> {title}
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        {tips.map((tip) => (
          <div key={tip.title} className="flex gap-3">
            <tip.icon className="w-5 h-5 shrink-0 text-primary" />
            <div>
              <p className="font-semibold text-text-primary">{tip.title}</p>
              <p className="text-sm text-text-secondary">{tip.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-background">
      <div className="py-16 px-4 md:px-8 bg-bg-secondary">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">
            How It Works
          </h1>
          <p className="text-xl text-text-secondary">
            Your journey with us is simple, secure, and straightforward
          </p>
        </div>
      </div>

      <div className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-display font-bold text-text-primary mb-2 flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" /> For Guests
            </h2>
            <p className="text-lg text-text-secondary">Book your perfect stay in 6 simple steps</p>
          </div>
          <StepGrid steps={stepsForGuests} />
          <TipsCard title="Tips for Guests" tips={guestTips} />
        </div>
      </div>

      <div className="border-t border-border" />

      <div className="py-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-2xl font-display font-bold text-text-primary mb-2 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-primary" /> For Hosts
            </h2>
            <p className="text-lg text-text-secondary">Start earning by sharing your property in 6 steps</p>
          </div>
          <StepGrid steps={stepsForHosts} />
          <TipsCard title="Tips for Hosts" tips={hostTips} />
        </div>
      </div>

      <div className="py-16 px-4 md:px-8 bg-bg-secondary">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq) => (
              <Card key={faq.q}>
                <h4 className="text-base font-semibold text-primary mb-2">{faq.q}</h4>
                <p className="text-text-secondary text-sm">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
