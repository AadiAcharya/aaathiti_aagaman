import React from "react";
import { useNavigate } from "react-router-dom";

const Description = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-5xl font-bold text-text-primary mb-4">
            Describe Your Place
          </h2>
          <p className="text-lg text-text-secondary">
            Help guests understand what makes your place special
          </p>
        </div>

        {/* Description Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left - Form */}
          <div className="bg-bg-secondary rounded-xl p-8 border border-text-muted/20">
            <div className="mb-6">
              <label className="block text-lg font-bold text-text-primary mb-4">
                Property Title
              </label>
              <input
                type="text"
                placeholder="e.g., Cozy Apartment near Downtown"
                className="w-full bg-background border-2 border-text-muted/30 rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none transition"
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-bold text-text-primary mb-4">
                Description
              </label>
              <textarea
                placeholder="Write a compelling description of your property..."
                rows="6"
                className="w-full bg-background border-2 border-text-muted/30 rounded-lg px-4 py-3 text-text-primary placeholder-text-secondary focus:border-primary focus:outline-none transition resize-none"
              ></textarea>
            </div>
          </div>

          {/* Right - Preview */}
          <div className="bg-bg-secondary rounded-xl p-8 border border-text-muted/20">
            <h3 className="text-2xl font-bold text-text-primary mb-6">
              Preview
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-text-secondary text-sm">Title</p>
                <p className="text-lg font-bold text-text-primary">
                  Your property title here
                </p>
              </div>
              <div className="border-t border-text-muted/20 pt-4">
                <p className="text-text-secondary text-sm mb-2">Description</p>
                <p className="text-text-secondary leading-relaxed">
                  Your description will appear here as guests read about your
                  amazing place...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/amenities")}
            className="px-6 py-3 text-text-primary bg-bg-secondary hover:bg-bg-secondary/80 rounded-lg font-bold border-2 border-text-muted/30 transition-all"
          >
            ← Back
          </button>
          <button
            onClick={() => navigate("/facilities")}
            className="px-6 py-3 text-white bg-primary hover:bg-primary-hover rounded-lg font-bold transition-all"
          >
            Next: Add Facilities →
          </button>
        </div>
      </main>
    </div>
  );
};

export default Description;
