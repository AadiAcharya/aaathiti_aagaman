import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { reportAPI } from "../services/api";
import {
  Home,
  Calendar,
  Building2,
  KeyRound,
  MessageCircle,
  HelpCircle,
  Mail,
  Phone,
  ShieldAlert,
  Search,
  ChevronDown,
} from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Modal from "./ui/Modal";
import EmptyState from "./ui/EmptyState";

const CATEGORIES = [
  {
    title: "Finding Properties",
    icon: Home,
    items: [
      "How to search for properties",
      "Filtering and sorting options",
      "Understanding property listings",
      "Viewing property details",
      "Adding properties to wishlist",
    ],
  },
  {
    title: "Booking & Reservations",
    icon: Calendar,
    items: [
      "How to make a booking",
      "Check-in and check-out process",
      "Modifying your reservation",
      "Cancellation policy",
      "Payment methods",
    ],
  },
  {
    title: "Hosting Properties",
    icon: Building2,
    items: [
      "How to become a host",
      "Listing your property",
      "Setting prices and availability",
      "Managing guest requests",
      "Earning and payouts",
    ],
  },
  {
    title: "Account & Security",
    icon: KeyRound,
    items: [
      "Creating an account",
      "Resetting your password",
      "Updating profile information",
      "Verification process",
      "Privacy & safety",
    ],
  },
  {
    title: "Messages & Communication",
    icon: MessageCircle,
    items: [
      "Messaging hosts and guests",
      "Resolving communication issues",
      "Response times",
      "Report inappropriate behavior",
    ],
  },
  {
    title: "General Questions",
    icon: HelpCircle,
    items: [
      "What is Aatithi Aagaman?",
      "How does it work?",
      "Fees and charges",
      "Terms of service",
      "Contact support",
    ],
  },
];

const FAQS = [
  {
    q: "How do I get started on Aatithi Aagaman?",
    a: 'Simply create an account, browse available properties, and start booking. If you want to host, go to "Become A Host" to list your property.',
  },
  {
    q: "Is it safe to book through Aatithi Aagaman?",
    a: "Yes! All users are verified, and we have secure payment processing. Guest and host reviews ensure transparency and accountability.",
  },
  {
    q: "What are the cancellation policies?",
    a: "Cancellation policies vary by listing. Check each property's specific policy before booking. We offer flexible, moderate, and strict cancellation options.",
  },
  {
    q: "How do I become a host?",
    a: 'Click "Become A Host" in the header, complete the verification process, list your property with photos and details, set your prices, and start accepting bookings.',
  },
  {
    q: "How do I communicate with hosts or guests?",
    a: 'Use our in-app messaging feature to communicate directly. Go to "Messages" in your account to view all conversations.',
  },
  {
    q: "How do I report a problem or inappropriate behavior?",
    a: "Contact our support team through the Help Center or report the user directly from their profile. We take all reports seriously and investigate promptly.",
  },
];

export default function Help() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [contactOpen, setContactOpen] = useState(false);
  const [form, setForm] = useState({ subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [searchQuery]);

  const searchFor = (term) => {
    setSearchQuery(term);
    document.getElementById("faq-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openContact = () => {
    if (!isAuthenticated) {
      navigate("/sign-in");
      return;
    }
    setSubmitted(false);
    setSubmitError("");
    setForm({ subject: "", message: "" });
    setContactOpen(true);
  };

  const handleSubmitReport = async () => {
    if (!form.subject.trim() || !form.message.trim()) {
      setSubmitError("Please fill in both fields");
      return;
    }
    try {
      setSubmitting(true);
      setSubmitError("");
      await reportAPI.create({ subject: form.subject, message: form.message });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || "Failed to send. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-bg-secondary border-b border-border py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary mb-4">Help Center</h1>
          <p className="text-text-secondary text-lg">Find answers to your questions about Aatithi Aagaman</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-16">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchFor(searchQuery)}
              placeholder="Search for help..."
              className="w-full rounded-[var(--radius-control)] border border-border bg-bg-sunken text-text-primary placeholder-text-muted pl-11 pr-28 py-3.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <Button size="sm" className="absolute right-2 top-1/2 -translate-y-1/2" onClick={() => searchFor(searchQuery)}>
              Search
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {CATEGORIES.map((cat) => (
            <Card key={cat.title} hoverable>
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <cat.icon className="w-5 h-5 text-primary" /> {cat.title}
              </h3>
              <ul className="space-y-2.5">
                {cat.items.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => searchFor(item)}
                      className="text-left text-sm text-text-secondary hover:text-primary transition-colors duration-[var(--duration-fast)]"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <Card padding="p-8 md:p-12" className="mb-16" id="faq-section">
          <div className="flex items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary">
              Frequently Asked Questions
            </h2>
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-sm text-primary hover:underline shrink-0">
                Clear search
              </button>
            )}
          </div>

          {filteredFaqs.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No matching questions"
              description="Try a different search term, or contact support directly."
              action={
                <Button size="sm" onClick={openContact}>
                  Contact Support
                </Button>
              }
            />
          ) : (
            <div className="space-y-1">
              {filteredFaqs.map((faq, i) => (
                <details key={faq.q} className={`group py-5 ${i < filteredFaqs.length - 1 ? "border-b border-border" : ""}`}>
                  <summary className="cursor-pointer flex justify-between items-center gap-4 font-semibold text-text-primary hover:text-primary transition-colors list-none">
                    <span>{faq.q}</span>
                    <ChevronDown className="w-4 h-4 shrink-0 text-text-muted group-open:rotate-180 transition-transform" />
                  </summary>
                  <p className="text-text-secondary mt-3">{faq.a}</p>
                </details>
              ))}
            </div>
          )}
        </Card>

        <Card padding="p-8 md:p-12" className="text-center bg-primary-subtle border-primary/20">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary mb-4">Still Need Help?</h2>
          <p className="text-text-secondary text-lg mb-8">
            Can't find the answer you're looking for? Our support team is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={openContact}>
              Contact Support
            </Button>
            <Button size="lg" variant="secondary" as="a" href="mailto:aadityaacharya156@gmail.com">
              Email Us
            </Button>
          </div>
          <div className="text-text-secondary text-sm mt-8 space-y-1.5">
            <p className="inline-flex items-center gap-2">
              <Mail className="w-4 h-4" /> aadityaacharya156@gmail.com
            </p>
            <p className="inline-flex items-center gap-2">
              <Phone className="w-4 h-4" /> +977 9865004688
            </p>
            <p className="inline-flex items-center gap-2">
              <MessageCircle className="w-4 h-4" /> Live Chat: Available 24/7
            </p>
          </div>
        </Card>
      </main>

      <Modal open={contactOpen} onClose={() => setContactOpen(false)} size="md">
        {submitted ? (
          <div className="text-center py-10 px-6">
            <h3 className="text-xl font-semibold text-text-primary mb-2">Report sent</h3>
            <p className="text-text-secondary">
              Our admin team has received your message and will get back to you as soon as possible.
            </p>
            <Button className="mt-6" onClick={() => setContactOpen(false)}>
              Close
            </Button>
          </div>
        ) : (
          <>
            <Modal.Header title="Contact Admin" onClose={() => setContactOpen(false)} />
            <Modal.Body className="space-y-4">
              <p className="text-sm text-text-secondary flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                Having an issue with a host or guest that hasn't been resolved through messaging? Let us know and an
                admin will step in.
              </p>
              <Input
                label="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="e.g. Host not responding about booking"
              />
              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1.5">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  placeholder="Describe what happened, including any relevant booking or room details"
                  className="w-full rounded-[var(--radius-control)] border border-border bg-bg-sunken text-text-primary placeholder-text-muted px-3.5 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>
              {submitError && <p className="text-danger text-sm">{submitError}</p>}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="ghost" onClick={() => setContactOpen(false)}>
                Cancel
              </Button>
              <Button loading={submitting} onClick={handleSubmitReport}>
                Send Report
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}
