import React from "react";
import Header from "./Header";

export default function Account() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Account Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hello greeting */}
        <h1 className="font-['Montserrat:Bold',sans-serif] font-bold text-[28px] text-[#484848] mb-8" data-node-id="2:2026">
          Hello, John Doe
        </h1>

        {/* Profile and Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-[#eff0f2] rounded-lg p-8" data-node-id="2:2028">
              {/* Profile Avatar Placeholder */}
              <div className="bg-gray-400 rounded-full w-40 h-40 mx-auto mb-6 flex items-center justify-center">
                <span className="text-white text-4xl">👤</span>
              </div>

              {/* Upload Photo */}
              <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold text-[16px] text-[#484848] text-center mb-8" data-node-id="2:2032">
                Upload a Photo
              </p>

              {/* Name */}
              <p className="font-['Montserrat:Bold',sans-serif] font-bold text-[22px] text-[#484848] mb-4" data-node-id="2:2034">
                John Doe
              </p>

              {/* Joined Date */}
              <p className="font-['Montserrat:Medium',sans-serif] font-medium text-[14px] text-[#9a9a9a] mb-6" data-node-id="2:2038">
                Joined in 2021
              </p>

              {/* Edit Profile Button */}
              <button 
                className="w-full border-2 border-[#484848] text-[#484848] font-['Montserrat:SemiBold',sans-serif] font-semibold py-3 rounded-lg hover:bg-[#484848] hover:text-white transition-colors mb-8"
                data-node-id="2:2035"
              >
                <span data-node-id="2:2037">Edit Profile</span>
              </button>

              {/* Verification Section */}
              <div className="mb-6">
                <h3 className="font-['Montserrat:Bold',sans-serif] font-bold text-[18px] text-[#484848] mb-2" data-node-id="2:2049">
                  Identity Verification
                </h3>
                <p className="font-['Montserrat:Regular',sans-serif] font-normal text-[14px] text-[#9a9a9a] leading-6" data-node-id="2:2050">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                </p>
              </div>

              {/* Confirmations */}
              <div className="space-y-3">
                {/* Email Confirmed */}
                <div className="flex items-center gap-3" data-node-id="2:2039">
                  <span className="text-green-500 text-lg">✓</span>
                  <p className="font-['Montserrat:Medium',sans-serif] font-medium text-[15px] text-[#9a9a9a]" data-node-id="2:2040">
                    Email Confirmed
                  </p>
                </div>

                {/* Mobile Confirmed */}
                <div className="flex items-center gap-3" data-node-id="2:2044">
                  <span className="text-green-500 text-lg">✓</span>
                  <p className="font-['Montserrat:Medium',sans-serif] font-medium text-[15px] text-[#9a9a9a]" data-node-id="2:2045">
                    Mobile Confirmed
                  </p>
                </div>
              </div>

              {/* Reviews Count */}
              <div className="mt-6 pt-6 border-t border-[#484848]/20">
                <p className="font-['Montserrat:Bold',sans-serif] font-bold text-[18px] text-[#484848]" data-node-id="2:2052">
                  0 Reviews
                </p>
                <p className="font-['Montserrat:SemiBold',sans-serif] font-semibold text-[15px] text-[#484848] underline mt-2" data-node-id="2:2033">
                  Reviewed By You
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Account Details (Placeholder for additional content) */}
          <div className="lg:col-span-2">
            <div className="bg-bg-secondary rounded-lg p-8 border border-text-muted/20">
              <h2 className="font-bold text-2xl text-text-primary mb-6">Account Information</h2>
              
              <div className="space-y-6">
                {/* Personal Information Section */}
                <div>
                  <h3 className="font-semibold text-lg text-text-primary mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-text-secondary block mb-2">First Name</label>
                      <input 
                        type="text" 
                        placeholder="John" 
                        className="w-full bg-background border border-text-muted/20 rounded px-3 py-2 text-text-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-text-secondary block mb-2">Last Name</label>
                      <input 
                        type="text" 
                        placeholder="Doe" 
                        className="w-full bg-background border border-text-muted/20 rounded px-3 py-2 text-text-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div>
                  <h3 className="font-semibold text-lg text-text-primary mb-4">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-text-secondary block mb-2">Email</label>
                      <input 
                        type="email" 
                        placeholder="john.doe@example.com" 
                        className="w-full bg-background border border-text-muted/20 rounded px-3 py-2 text-text-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-text-secondary block mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="+1 234 567 890" 
                        className="w-full bg-background border border-text-muted/20 rounded px-3 py-2 text-text-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Address Information Section */}
                <div>
                  <h3 className="font-semibold text-lg text-text-primary mb-4">Address</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-text-secondary block mb-2">Street Address</label>
                      <input 
                        type="text" 
                        placeholder="100 Smart Street" 
                        className="w-full bg-background border border-text-muted/20 rounded px-3 py-2 text-text-primary"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="text-sm text-text-secondary block mb-2">City</label>
                        <input 
                          type="text" 
                          placeholder="Los Angeles" 
                          className="w-full bg-background border border-text-muted/20 rounded px-3 py-2 text-text-primary"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-text-secondary block mb-2">State</label>
                        <input 
                          type="text" 
                          placeholder="CA" 
                          className="w-full bg-background border border-text-muted/20 rounded px-3 py-2 text-text-primary"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-text-secondary block mb-2">ZIP Code</label>
                        <input 
                          type="text" 
                          placeholder="90001" 
                          className="w-full bg-background border border-text-muted/20 rounded px-3 py-2 text-text-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <button className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-2 rounded transition-colors">
                    Save Changes
                  </button>
                  <button className="border border-primary text-primary hover:bg-primary/10 font-semibold px-6 py-2 rounded transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-12 border-text-muted/20" data-node-id="2:2027" />

        {/* Additional Account Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-bg-secondary rounded-lg p-6 border border-text-muted/20">
            <h3 className="font-bold text-lg text-text-primary mb-2">Account Settings</h3>
            <p className="text-text-secondary text-sm mb-4">Manage your account preferences and security.</p>
            <button className="text-primary hover:underline font-semibold text-sm">
              Go to Settings →
            </button>
          </div>

          <div className="bg-bg-secondary rounded-lg p-6 border border-text-muted/20">
            <h3 className="font-bold text-lg text-text-primary mb-2">Privacy & Security</h3>
            <p className="text-text-secondary text-sm mb-4">Control your privacy and security settings.</p>
            <button className="text-primary hover:underline font-semibold text-sm">
              Go to Privacy →
            </button>
          </div>

          <div className="bg-bg-secondary rounded-lg p-6 border border-text-muted/20">
            <h3 className="font-bold text-lg text-text-primary mb-2">Notification Center</h3>
            <p className="text-text-secondary text-sm mb-4">Manage your notification preferences.</p>
            <button className="text-primary hover:underline font-semibold text-sm">
              Go to Notifications →
            </button>
          </div>
        </div>
      </div>

      {/* Footer would go here */}
    </div>
  );
}
