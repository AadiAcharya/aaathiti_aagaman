import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChefHat, Car, Trees, Flower2, Wifi, Waves,
  Dumbbell, MoveVertical, Umbrella, Bath, Flame, UtensilsCrossed, Check,
} from "lucide-react";
import StepBar from "./StepBar";
import Button from "../ui/Button";

const ALL_AMENITIES = [
  { id: "Kitchen",       icon: ChefHat },
  { id: "Parking",       icon: Car },
  { id: "Balcony",       icon: Trees },
  { id: "Garden",        icon: Flower2 },
  { id: "Wi-Fi",         icon: Wifi },
  { id: "Pool",          icon: Waves },
  { id: "Gym",           icon: Dumbbell },
  { id: "Elevator",      icon: MoveVertical },
  { id: "Beach Access",  icon: Umbrella },
  { id: "Hot Tub",       icon: Bath },
  { id: "Fireplace",     icon: Flame },
  { id: "BBQ Grill",     icon: UtensilsCrossed },
];

export default function Amenities() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(() => {
    try {
      const saved = localStorage.getItem("addProperty_amenities");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const toggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );

  const handleNext = () => {
    localStorage.setItem("addProperty_amenities", JSON.stringify(selected));
    navigate("/description");
  };

  return (
    <div className="bg-background min-h-screen">
      <StepBar current={1} />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-3">
            Select Amenities
          </h2>
          <p className="text-lg text-text-secondary">
            Choose all the amenities available at your place
            {selected.length > 0 && (
              <span className="ml-2 text-primary font-bold">({selected.length} selected)</span>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {ALL_AMENITIES.map((item) => {
            const isSelected = selected.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggle(item.id)}
                className={`cursor-pointer rounded-2xl border-2 p-8 text-center transition-all duration-300 group relative ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
                    : "border-text-muted/30 bg-bg-secondary hover:border-primary/50 hover:shadow-md"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                )}
                <div className={`flex justify-center mb-4 transition-transform duration-300 ${isSelected ? "scale-110" : "group-hover:scale-110"}`}>
                  <item.icon className="w-12 h-12 text-primary" />
                </div>
                <h3 className={`text-lg font-bold transition-colors ${isSelected ? "text-primary" : "text-text-primary"}`}>
                  {item.id}
                </h3>
              </div>
            );
          })}
        </div>

        <div className="flex gap-4">
          <Button variant="secondary" size="lg" onClick={() => navigate("/add-property")}>
            ← Back
          </Button>
          <Button size="lg" onClick={handleNext}>
            Next: Add Description →
          </Button>
        </div>
      </main>
    </div>
  );
}