import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Home, DoorClosed, Castle, Bed, Leaf, Check } from "lucide-react";
import StepBar from "./StepBar";
import Button from "../ui/Button";

const propertyTypes = [
  { id: "apartment", name: "Apartment", icon: Building2,  desc: "Modern urban living" },
  { id: "flat",      name: "Flat",      icon: Home,       desc: "Cozy home experience" },
  { id: "room",      name: "Room",      icon: DoorClosed, desc: "Private rooms" },
  { id: "villa",     name: "Villa",     icon: Castle,     desc: "Luxury retreat" },
  { id: "hostel",    name: "Hostel",    icon: Bed,        desc: "Budget friendly stays" },
  { id: "cottage",   name: "Cottage",   icon: Leaf,       desc: "Countryside getaway" },
];

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
                <type.icon className={`w-14 h-14 text-primary transition-transform duration-300 ${selected === type.id ? "scale-125" : "group-hover:scale-110"}`} />
              </div>
              <div className="p-6 text-center">
                <p className={`text-xl font-bold mb-1 transition-colors ${selected === type.id ? "text-primary" : "text-text-primary group-hover:text-primary"}`}>
                  {type.name}
                </p>
                <p className="text-text-secondary text-sm">{type.desc}</p>
                {selected === type.id && (
                  <div className="mt-3 inline-flex items-center gap-1 text-primary text-xs font-bold">
                    <Check className="w-3.5 h-3.5" /> Selected
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button size="lg" disabled={!selected} onClick={handleNext}>
            Next: Select Amenities →
          </Button>
        </div>
        {!selected && <p className="text-text-muted text-sm mt-3">Please select a property type to continue</p>}
      </main>
    </div>
  );
}