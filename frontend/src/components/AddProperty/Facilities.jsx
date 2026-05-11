import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ALL_FACILITIES = [
  { id: "Air Conditioning", icon: "❄️" },
  { id: "Heating",          icon: "🔥" },
  { id: "Washing Machine",  icon: "🧺" },
  { id: "Television",       icon: "📺" },
  { id: "Bedding",          icon: "🛏️" },
  { id: "Dining Area",      icon: "🍽️" },
  { id: "Microwave",        icon: "📡" },
  { id: "Refrigerator",     icon: "🧊" },
  { id: "Hair Dryer",       icon: "💨" },
  { id: "Iron",             icon: "👔" },
  { id: "Work Desk",        icon: "💼" },
  { id: "Coffee Maker",     icon: "☕" },
];

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

export default function Facilities() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(() => {
    try {
      const saved = localStorage.getItem("addProperty_facilities");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const toggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  const handleNext = () => {
    localStorage.setItem("addProperty_facilities", JSON.stringify(selected));
    navigate("/safety");
  };

  return (
    <div className="bg-background min-h-screen">
      <StepBar current={3} />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-3">Select Facilities</h2>
          <p className="text-lg text-text-secondary">
            Choose the facilities available at your property
            {selected.length > 0 && <span className="ml-2 text-primary font-bold">({selected.length} selected)</span>}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {ALL_FACILITIES.map((item) => {
            const isSelected = selected.includes(item.id);
            return (
              <div key={item.id} onClick={() => toggle(item.id)}
                className={`cursor-pointer rounded-2xl border-2 p-8 text-center transition-all duration-300 group relative ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
                    : "border-text-muted/30 bg-bg-secondary hover:border-primary/50 hover:shadow-md"
                }`}>
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>
                )}
                <div className={`text-5xl mb-4 transition-transform duration-300 ${isSelected ? "scale-110" : "group-hover:scale-110"}`}>
                  {item.icon}
                </div>
                <h3 className={`text-lg font-bold transition-colors ${isSelected ? "text-primary" : "text-text-primary"}`}>{item.id}</h3>
              </div>
            );
          })}
        </div>

        <div className="flex gap-4">
          <button onClick={() => navigate("/description")}
            className="px-6 py-3 text-text-primary bg-bg-secondary hover:bg-bg-secondary/80 rounded-xl font-bold border-2 border-text-muted/30 transition-all">
            ← Back
          </button>
          <button onClick={handleNext}
            className="px-8 py-3 text-white bg-primary hover:bg-primary-hover rounded-xl font-bold transition-all shadow-lg">
            Next: Add Safety Features →
          </button>
        </div>
      </main>
    </div>
  );
}