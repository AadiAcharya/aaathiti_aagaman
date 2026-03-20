import React, { useState } from "react";

const imgCarbonUserAvatarFilled =
  "https://www.figma.com/api/mcp/asset/1d3bc9bb-0284-40e6-a302-2326fb0f2edf";
const imgCheckmark =
  "https://www.figma.com/api/mcp/asset/d4935f1f-e5fe-46b1-80a4-74d31a44a19e";
const imgClose =
  "https://www.figma.com/api/mcp/asset/cd41964c-4514-4ca7-b0d5-7b10ab5c2070";

export default function Account() {
  const [formData, setFormData] = useState({
    about: "",
    location: "",
    work: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving profile data:", formData);
  };

  const handleCancel = () => {
    setFormData({ about: "", location: "", work: "" });
  };

  return (
    <div
      className="min-h-screen bg-background"
      data-name="account-edit"
      data-node-id="2:1645"
    >
      {/* Edit Profile Section */}
      <div className="px-16 py-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-bg-secondary rounded-lg p-8 h-fit">
              {/* Profile Avatar */}
              <div className="w-40 h-40 mx-auto mb-6">
                <img
                  alt="User Avatar"
                  className="w-full h-full"
                  src={imgCarbonUserAvatarFilled}
                />
              </div>

              {/* Upload Photo */}
              <p
                className="font-semibold text-[16px] text-text-primary text-center mb-8"
                data-node-id="2:1666"
              >
                Upload a Photo
              </p>

              {/* Name */}
              <p
                className="font-bold text-[22px] text-text-primary mb-4"
                data-node-id="2:1667"
              >
                John Doe
              </p>

              {/* Joined Date */}
              <p
                className="font-medium text-[14px] text-text-secondary mb-6"
                data-node-id="2:1669"
              >
                Joined in 2021
              </p>

              {/* Email Confirmed */}
              <div
                className="flex items-center gap-3 mb-4"
                data-node-id="2:1670"
              >
                <img alt="checkmark" className="w-5 h-5" src={imgCheckmark} />
                <p
                  className="font-medium text-[15px] text-text-secondary"
                  data-node-id="2:1671"
                >
                  Email Confirmed
                </p>
              </div>

              {/* Mobile Confirmed */}
              <div
                className="flex items-center gap-3 mb-6"
                data-node-id="2:1675"
              >
                <img alt="checkmark" className="w-5 h-5" src={imgCheckmark} />
                <p
                  className="font-medium text-[15px] text-text-secondary"
                  data-node-id="2:1676"
                >
                  Mobile Confirmed
                </p>
              </div>

              {/* Identity Verification */}
              <p
                className="font-bold text-[18px] text-text-primary mb-3"
                data-node-id="2:1680"
              >
                Identity Verification
              </p>
              <p
                className="font-normal text-[14px] text-text-secondary leading-5"
                data-node-id="2:1681"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor.
              </p>
            </div>
          </div>

          {/* Right Section - Edit Profile Form */}
          <div className="lg:col-span-3">
            <div>
              {/* Greeting */}
              <p
                className="font-bold text-[28px] text-text-primary mb-2"
                data-node-id="2:1668"
              >
                Hello, John Doe
              </p>
              <p
                className="font-medium text-[14px] text-text-secondary mb-8"
                data-node-id="2:1669"
              >
                Joined in 2021
              </p>

              {/* About Section */}
              <div className="mb-6">
                <label
                  className="font-semibold text-[15px] text-[#484848] mb-2 block"
                  data-node-id="2:1683"
                >
                  About
                </label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  className="w-full h-31 bg-white border border-[#c2c6cc] rounded-lg px-4 py-3 text-[#484848] focus:outline-none focus:ring-2 focus:ring-[#484848]"
                  data-node-id="2:1682"
                />
              </div>

              {/* Location Section */}
              <div className="mb-6">
                <label
                  className="font-semibold text-[15px] text-[#484848] mb-2 block"
                  data-node-id="2:1685"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full h-11 bg-white border border-[#c2c6cc] rounded-lg px-4 py-2 text-[#484848] focus:outline-none focus:ring-2 focus:ring-[#484848]"
                  data-node-id="2:1684"
                />
              </div>

              {/* Work Section */}
              <div className="mb-8">
                <label
                  className="font-semibold text-[15px] text-[#484848] mb-2 block"
                  data-node-id="2:1687"
                >
                  Work
                </label>
                <input
                  type="text"
                  name="work"
                  value={formData.work}
                  onChange={handleInputChange}
                  className="w-full h-11 bg-white border border-[#c2c6cc] rounded-lg px-4 py-2 text-[#484848] focus:outline-none focus:ring-2 focus:ring-[#484848]"
                  data-node-id="2:1686"
                />
              </div>

              {/* Helper Text */}
              <p
                className="font-semibold text-[15px] text-[#9a9a9a] mb-6"
                data-node-id="2:1695"
              >
                All the required user information can be added here...
              </p>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4">
                {/* Cancel Button */}
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 text-[#484848] font-bold text-[15px] hover:opacity-70 transition"
                  data-node-id="2:1691"
                >
                  <img alt="close" className="w-7 h-7" src={imgClose} />
                  Cancel
                </button>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  className="bg-[#9a9a9a] hover:bg-[#7a7a7a] text-white font-bold text-[15px] px-8 py-3 rounded-full transition"
                  data-node-id="2:1688"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
