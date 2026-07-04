import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PawPrint, Ban, Upload, Loader2, X, Link2 } from "lucide-react";
import { uploadAPI } from "../../services/api";
import { forwardGeocode, reverseGeocode } from "../../utils/geocode";
import LocationPicker from "./LocationPicker";
import StepBar from "./StepBar";
import Button from "../ui/Button";
import Select from "../ui/Select";

const MAX_ADDITIONAL_PHOTOS = 5; // + 1 cover photo = 6 total

export default function Description() {
  const navigate = useNavigate();

  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem("addProperty_description");
      return saved ? JSON.parse(saved) : {
        title: "", location: "", description: "",
        price: "", bedrooms: "1", bathrooms: "1",
        parking: "0", pets: "No", image: "", images: [],
        lat: null, lng: null,
      };
    } catch {
      return {
        title: "", location: "", description: "",
        price: "", bedrooms: "1", bathrooms: "1",
        parking: "0", pets: "No", image: "", images: [],
        lat: null, lng: null,
      };
    }
  });

  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [coverMode, setCoverMode] = useState("upload");

  const set = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      setErrors((prev) => ({ ...prev, image: "" }));
      const { url } = await uploadAPI.uploadImage(file);
      set("image", url);
    } catch (err) {
      setErrors((prev) => ({ ...prev, image: err.message || "Upload failed" }));
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const remainingSlots = MAX_ADDITIONAL_PHOTOS - (form.images?.length || 0);
    const toUpload = files.slice(0, remainingSlots);
    try {
      setGalleryUploading(true);
      setErrors((prev) => ({ ...prev, images: "" }));
      const uploaded = await Promise.all(toUpload.map((f) => uploadAPI.uploadImage(f)));
      setForm((prev) => ({ ...prev, images: [...(prev.images || []), ...uploaded.map((r) => r.url)] }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, images: err.message || "Upload failed" }));
    } finally {
      setGalleryUploading(false);
      e.target.value = "";
    }
  };

  const removeGalleryImage = (index) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  // Called when the host clicks/drags the pin on the map, or uses "Use my location".
  const handlePickLocation = async (lat, lng) => {
    setForm((prev) => ({ ...prev, lat, lng }));
    if (!form.location.trim()) {
      const address = await reverseGeocode(lat, lng);
      if (address) set("location", address);
    }
  };

  // Called when the host types an address and clicks "Find on map".
  const handleFindOnMap = async () => {
    if (!form.location.trim()) return;
    setLocating(true);
    const coords = await forwardGeocode(form.location);
    setLocating(false);
    if (coords) setForm((prev) => ({ ...prev, lat: coords.lat, lng: coords.lng }));
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
            <div className="flex gap-2">
              <input
                value={form.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="e.g. Kathmandu, Nepal"
                className={inputClass("location")}
              />
              <button
                type="button"
                onClick={handleFindOnMap}
                disabled={locating || !form.location.trim()}
                className="shrink-0 px-4 py-3 rounded-xl border-2 border-text-muted/30 text-text-secondary font-semibold text-sm hover:border-primary hover:text-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {locating ? "Finding..." : "Find on map"}
              </button>
            </div>
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}

            <div className="mt-3">
              <LocationPicker lat={form.lat} lng={form.lng} onPick={handlePickLocation} />
            </div>
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
            <label className="text-text-primary font-semibold text-sm block mb-2">Price per Night (NRs) *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-bold">Rs</span>
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
              <Select
                key={key}
                label={label}
                value={form[key]}
                onChange={(e) => set(key, e.target.value)}
              >
                {Array.from({ length: max + 1 }, (_, i) => (
                  <option key={i} value={String(i)}>{i}</option>
                ))}
              </Select>
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
                  {opt === "Yes" ? (
                    <span className="inline-flex items-center gap-1.5"><PawPrint className="w-4 h-4" /> Yes</span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5"><Ban className="w-4 h-4" /> No</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Cover Photo */}
          <div>
            <label className="text-text-primary font-semibold text-sm block mb-2">Cover Photo</label>

            <div className="inline-flex items-center gap-1 rounded-full bg-bg-secondary p-1 mb-3">
              {[
                { id: "upload", label: "Upload file", icon: Upload },
                { id: "url", label: "Image URL", icon: Link2 },
              ].map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setCoverMode(mode.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    coverMode === mode.id
                      ? "bg-primary text-white"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  <mode.icon className="w-3.5 h-3.5" />
                  {mode.label}
                </button>
              ))}
            </div>

            {coverMode === "upload" ? (
              <label
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer transition text-sm font-semibold w-fit ${
                  uploading ? "opacity-60 pointer-events-none" : "hover:border-primary"
                } border-text-muted/30 text-text-secondary`}
              >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {uploading ? "Uploading..." : form.image ? "Replace photo" : "Choose a file"}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </label>
            ) : (
              <input
                value={form.image}
                onChange={(e) => set("image", e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className={inputClass("image")}
              />
            )}
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
            {form.image && (
              <div className="mt-3 h-40 rounded-xl overflow-hidden border border-text-muted/20">
                <img src={form.image} alt="preview" className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = "none"; }} />
              </div>
            )}
          </div>

          {/* Additional Photos */}
          <div>
            <label className="text-text-primary font-semibold text-sm block mb-2">
              Additional Photos
              <span className="text-text-muted font-normal"> — more photos help guests decide ({(form.images || []).length}/{MAX_ADDITIONAL_PHOTOS})</span>
            </label>

            {(form.images || []).length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-3">
                {form.images.map((img, i) => (
                  <div key={i} className="relative h-24 rounded-lg overflow-hidden border border-text-muted/20 group">
                    <img src={img} alt={`Additional ${i + 1}`} className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = "none"; }} />
                    <button type="button" onClick={() => removeGalleryImage(i)}
                      className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {(form.images || []).length < MAX_ADDITIONAL_PHOTOS && (
              <label className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed cursor-pointer transition text-sm font-semibold w-fit ${
                galleryUploading ? "opacity-60 pointer-events-none" : "hover:border-primary"
              } border-text-muted/30 text-text-secondary`}>
                {galleryUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {galleryUploading ? "Uploading..." : "Add more photos"}
                <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple
                  onChange={handleGalleryUpload} disabled={galleryUploading} className="hidden" />
              </label>
            )}
            {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
          </div>
        </div>

        <div className="flex gap-4 mt-10">
          <Button variant="secondary" size="lg" onClick={() => navigate("/amenities")}>
            ← Back
          </Button>
          <Button size="lg" onClick={handleNext}>
            Next: Add Facilities →
          </Button>
        </div>
      </main>
    </div>
  );
}