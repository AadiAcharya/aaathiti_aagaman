import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function Description() {
  const navigate = useNavigate();

  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem("addProperty_description");
      return saved ? JSON.parse(saved) : {
        title: "", location: "", description: "",
        price: "", bedrooms: "1", bathrooms: "1",
        parking: "0", pets: "No", image: "",
      };
    } catch {
      return {
        title: "", location: "", description: "",
        price: "", bedrooms: "1", bathrooms: "1",
        parking: "0", pets: "No", image: "",
      };
    }
  });

  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim())       e.title       = "Title is required";
    if (!form.location.trim())    e.location    = "Location is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.price)              e.price       = "Price is required";
    return e;
  };

  const handleNext = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    localStorage.setItem("addProperty_description", JSON.stringify(form));
    navigate("/facilities");
  };

  const inputClass = (key) =>
    `w-full bg-bg-secondary border-2 rounded-xl px-4 py-3 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary transition text-sm ${
      errors[key] ? "border-red-400" : "border-text-muted/30 focus:border-primary"
    }`;

  return (
    <div className="bg-background min-h-screen">
      <StepBar current={2} />
      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-3">
            Describe Your Place
          </h2>
          <p className="text-lg text-text-secondary">
            Give guests a clear picture of what to expect
          </p>
        </div>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="text-text-primary font-semibold text-sm block mb-2">Property Title *</label>
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Cozy Mountain Cabin with Fireplace"
              className={inputClass("title")}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="text-text-primary font-semibold text-sm block mb-2">Location *</label>
            <input
              value={form.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="e.g. Kathmandu, Nepal"
              className={inputClass("location")}
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="text-text-primary font-semibold text-sm block mb-2">Description *</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe your property — what makes it special, nearby attractions, house rules..."
              rows={5}
              className={inputClass("description") + " resize-none"}
            />
            <p className="text-text-muted text-xs mt-1">{form.description.length}/500 characters</p>
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          {/* Price */}
          <div>
            <label className="text-text-primary font-semibold text-sm block mb-2">Price per Month (USD) *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold">$</span>
              <input
                type="number"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                placeholder="1500"
                min="0"
                className={inputClass("price") + " pl-8"}
              />
            </div>
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>

          {/* Bedrooms / Bathrooms / Parking */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { key: "bedrooms",  label: "Bedrooms",  max: 20 },
              { key: "bathrooms", label: "Bathrooms", max: 10 },
              { key: "parking",   label: "Parking Spots", max: 10 },
            ].map(({ key, label, max }) => (
              <div key={key}>
                <label className="text-text-primary font-semibold text-sm block mb-2">{label}</label>
                <select
                  value={form[key]}
                  onChange={(e) => set(key, e.target.value)}
                  className="w-full bg-bg-secondary border-2 border-text-muted/30 focus:border-primary rounded-xl px-4 py-3 text-text-primary focus:outline-none text-sm"
                >
                  {Array.from({ length: max + 1 }, (_, i) => (
                    <option key={i} value={String(i)}>{i}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Pets */}
          <div>
            <label className="text-text-primary font-semibold text-sm block mb-2">Pets Allowed?</label>
            <div className="flex gap-4">
              {["Yes", "No"].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => set("pets", opt)}
                  className={`flex-1 py-3 rounded-xl border-2 font-semibold text-sm transition ${
                    form.pets === opt
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-text-muted/30 text-text-secondary hover:border-primary/50"
                  }`}
                >
                  {opt === "Yes" ? "🐾 Yes" : "🚫 No"}
                </button>
              ))}
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="text-text-primary font-semibold text-sm block mb-2">Image URL (optional)</label>
            <input
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className={inputClass("image")}
            />
            {form.image && (
              <div className="mt-3 h-40 rounded-xl overflow-hidden border border-text-muted/20">
                <img src={form.image} alt="preview" className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = "none"; }} />
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-10">
          <button onClick={() => navigate("/amenities")}
            className="px-6 py-3 text-text-primary bg-bg-secondary hover:bg-bg-secondary/80 rounded-xl font-bold border-2 border-text-muted/30 transition-all">
            ← Back
          </button>
          <button onClick={handleNext}
            className="px-8 py-3 text-white bg-primary hover:bg-primary-hover rounded-xl font-bold transition-all shadow-lg">
            Next: Add Facilities →
          </button>
        </div>
      </main>
    </div>
  );
}