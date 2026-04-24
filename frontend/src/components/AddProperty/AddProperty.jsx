import { useNavigate } from "react-router-dom";

export default function AddProperty() {
  const navigate = useNavigate();
  const propertyTypes = [
    { id: 1, name: "Apartment" },
    { id: 2, name: "Flat" },
    { id: 3, name: "Room" },
    { id: 4, name: "Villa" },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16">
          <div className="mb-12">
            <h2 className="text-5xl font-bold text-text-primary mb-4">
              What kind of place will you host?
            </h2>
            <p className="text-lg text-text-secondary">
              Choose the property type that best describes your space
            </p>
          </div>

          {/* Property Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {propertyTypes.map((type) => (
              <div key={type.id} className="group cursor-pointer">
                <div className="relative bg-bg-secondary rounded-xl overflow-hidden border-2 border-text-muted/30 hover:border-primary transition-all duration-300 hover:shadow-lg">
                  {/* Image Placeholder with Icons */}
                  <div className="h-40 bg-gradient-r-b-primary/20 flex items-center justify-center group-hover:shadow-md transition-colors">
                    <div className="text-6xl">
                      {type.id === 1 && "🏢"}
                      {type.id === 2 && "🏠"}
                      {type.id === 3 && "🚪"}
                      {type.id === 4 && "🏰"}
                    </div>
                  </div>
                  {/* Label */}
                  <div className="p-8 text-center">
                    <p className="text-2xl font-bold text-text-primary group-hover:text-primary transition-colors">
                      {type.name}
                    </p>
                    <p className="text-text-secondary text-sm mt-2">
                      {type.id === 1 && "Modern urban living"}
                      {type.id === 2 && "Cozy home experience"}
                      {type.id === 3 && "Private rooms"}
                      {type.id === 4 && "Luxury retreat"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/amenities")}
              className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Next: Select Amenities →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
