import { useState } from "react";
import { useNavigate } from "react-router-dom";

const propertyTypes = [
  { id: "apartment", name: "Apartment", icon: "🏢", desc: "Modern urban living" },
  { id: "flat",      name: "Flat",      icon: "🏠", desc: "Cozy home experience" },
  { id: "room",      name: "Room",      icon: "🚪", desc: "Private rooms" },
  { id: "villa",     name: "Villa",     icon: "🏰", desc: "Luxury retreat" },
  { id: "hostel",    name: "Hostel",    icon: "🛏️", desc: "Budget friendly stays" },
  { id: "cottage",   name: "Cottage",   icon: "🌿", desc: "Countryside getaway" },
];

// ── Step indicator ─────────────────────────────────────────────────────────────
const steps = ["Type", "Amenities", "Description", "Facilities", "Safety", "Post"];
const StepBar = ({ current }) => (
  <div className="max-w-6xl mx-auto px-6 pt-8 pb-2">
    <div className="flex items-center gap-2">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2 flex-1">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
            i < current ? "bg-primary text-white" :
            i === current ? "bg-primary text-white ring-4 ring-primary/20" :
            "bg-bg-secondary text-text-muted border border-text-muted/20"
          }`}>
            {i < current ? "✓" : i + 1}
          </div>
          <span className={`text-xs font-semibold hidden sm:block ${i === current ? "text-primary" : "text-text-muted"}`}>{s}</span>
          {i < steps.length - 1 && <div className={`h-0.5 flex-1 rounded ${i < current ? "bg-primary" : "bg-text-muted/20"}`} />}
        </div>
      ))}
    </div>
  </div>
);

export default function AddProperty() {
  const navigate  = useNavigate();
  const [selected, setSelected] = useState(() => {
    try {
      const saved = localStorage.getItem("addProperty_type");
      return saved ? JSON.parse(saved).type : null;
    } catch { return null; }
  });

  const handleNext = () => {
    if (!selected) return;
    localStorage.setItem("addProperty_type", JSON.stringify({
      type: selected,
      category: selected === "apartment" ? "apartments" :
                selected === "flat"      ? "flats"      :
                selected === "villa"     ? "villas"     :
                selected === "hostel"    ? "hostels"    : "rooms",
    }));
    navigate("/amenities");
  };

  return (
    <div className="bg-background min-h-screen">
      <StepBar current={0} />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-3">
            What kind of place will you host?
          </h2>
          <p className="text-lg text-text-secondary">
            Choose the property type that best describes your space
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {propertyTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => setSelected(type.id)}
              className={`group cursor-pointer rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                selected === type.id
                  ? "border-primary shadow-xl shadow-primary/20 bg-primary/5"
                  : "border-text-muted/30 bg-bg-secondary hover:border-primary/50 hover:shadow-lg"
              }`}
            >
              <div className="h-36 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                <span className={`text-6xl transition-transform duration-300 ${selected === type.id ? "scale-125" : "group-hover:scale-110"}`}>
                  {type.icon}
                </span>
              </div>
              <div className="p-6 text-center">
                <p className={`text-xl font-bold mb-1 transition-colors ${selected === type.id ? "text-primary" : "text-text-primary group-hover:text-primary"}`}>
                  {type.name}
                </p>
                <p className="text-text-secondary text-sm">{type.desc}</p>
                {selected === type.id && (
                  <div className="mt-3 inline-flex items-center gap-1 text-primary text-xs font-bold">
                    <span>✓</span> Selected
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleNext}
            disabled={!selected}
            className="bg-primary hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            Next: Select Amenities →
          </button>
        </div>
        {!selected && <p className="text-text-muted text-sm mt-3">Please select a property type to continue</p>}
      </main>
    </div>
  );
}