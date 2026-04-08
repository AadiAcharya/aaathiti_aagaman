import React from "react";
import { useNavigate } from "react-router-dom";

const Safety = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-5xl font-bold text-text-primary mb-4">
            Add Safety Features
          </h2>
          <p className="text-lg text-text-secondary mb-12">
            Let guests know what safety measures you have in place
          </p>

          {/* Safety Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* Safety Card 1 */}
            <div className="bg-bg-secondary border-2 border-text-muted/30 rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                🧯
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Fire Extinguisher
              </h3>
            </div>

            {/* Safety Card 2 */}
            <div className="bg-bg-secondary border-2 border-text-muted/30 rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                🏥
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                First Aid Kit
              </h3>
            </div>

            {/* Safety Card 3 */}
            <div className="bg-bg-secondary border-2 border-text-muted/30 rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                🔔
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Smoke Alarm
              </h3>
            </div>

            {/* Safety Card 4 */}
            <div className="bg-bg-secondary border-2 border-text-muted/30 rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                📹
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Security Camera
              </h3>
            </div>

            {/* Safety Card 5 */}
            <div className="bg-bg-secondary border-2 border-text-muted/30 rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                ⚠️
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Carbon Monoxide Alarm
              </h3>
            </div>

            {/* Safety Card 6 */}
            <div className="bg-bg-secondary border-2 border-text-muted/30 rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                🚪
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Emergency Exit
              </h3>
            </div>

            {/* Safety Card 7 */}
            <div className="bg-bg-secondary border-2 border-text-muted/30 rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                🔐
              </div>
              <h3 className="text-lg font-bold text-text-primary">
                Lock on Bedroom
              </h3>
            </div>

            {/* Safety Card 8 */}
            <div className="bg-bg-secondary border-2 border-text-muted/30 rounded-xl p-8 hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                💰
              </div>
              <h3 className="text-lg font-bold text-text-primary">Safe</h3>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/facilities")}
            className="px-6 py-3 text-text-primary bg-bg-secondary hover:bg-bg-secondary/80 rounded-lg font-bold border-2 border-text-muted/30 transition-all"
          >
            ← Back
          </button>
          <button
            onClick={() => navigate("/post")}
            className="px-6 py-3 text-white bg-primary hover:bg-primary-hover rounded-lg font-bold transition-all"
          >
            Next: Review & Post →
          </button>
        </div>
      </main>
    </div>
  );
};

export default Safety;
