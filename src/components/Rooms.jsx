import { roomsData } from "../data/roomsData";

// Image constants
const imgBed =
  "https://www.figma.com/api/mcp/asset/0e308834-acae-475c-918d-38b21a24a4d4";
const imgVector =
  "https://www.figma.com/api/mcp/asset/6789c0d2-c48f-402f-b4b1-90851ea33f80";
const imgGroup1 =
  "https://www.figma.com/api/mcp/asset/3991e4d2-36e1-4bdd-ae38-981b53806acd";
const imgPetIcon =
  "https://www.figma.com/api/mcp/asset/b14e61ae-0770-497a-8370-525cc45b9af5";
const imgWifi =
  "https://www.figma.com/api/mcp/asset/651e17f4-9008-4a89-a309-88f5771f4c7b";
const imgTv =
  "https://www.figma.com/api/mcp/asset/88f67b98-2403-4ef9-8fd3-aeb452921bef";
const imgKitchen =
  "https://www.figma.com/api/mcp/asset/fb483f69-c319-4442-b2b5-d548397136e3";
const imgLaundry1 =
  "https://www.figma.com/api/mcp/asset/027c5590-f72e-4a58-a395-b64ace893b27";
const imgBalcony1 =
  "https://www.figma.com/api/mcp/asset/5dfb74c3-e10d-4dbb-8de8-a61f9d20cca2";
const imgHeart =
  "https://www.figma.com/api/mcp/asset/6392ca5c-d96f-4669-a1a3-aa651385f4cc";
const imgShare =
  "https://www.figma.com/api/mcp/asset/df3aa4f8-82f5-42b1-b130-f7b7f92f7f37";
const imgFiveStars =
  "https://www.figma.com/api/mcp/asset/88a472d9-b26e-4f17-920e-dcebc043ade8";

export default function Rooms() {
  const currentRoom = roomsData[0];

  return (
    <div className="bg-background min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Image Gallery */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="col-span-1 row-span-2">
            <img
              src={currentRoom.image}
              alt="main"
              className="w-full h-96 rounded-2xl object-cover"
            />
          </div>
          <div className="bg-bg-secondary h-40 rounded-lg"></div>
          <div className="bg-bg-secondary h-40 rounded-lg"></div>
          <div className="bg-bg-secondary h-40 rounded-lg"></div>
          <div className="bg-bg-secondary h-40 rounded-lg relative flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-accent">+2</span>
            <span className="text-sm font-semibold text-text-primary">
              More Photos
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="col-span-2">
            {/* Title Section */}
            <div className="mb-8 flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">
                  {currentRoom.name}
                </h1>
                <p className="text-text-secondary">{currentRoom.location}</p>
              </div>
              <div className="flex gap-4">
                <button className="p-2 hover:opacity-80">
                  <img src={imgHeart} alt="like" className="w-6 h-6" />
                </button>
                <button className="p-2 hover:opacity-80">
                  <img src={imgShare} alt="share" className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Main Amenities */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Main Amenities
              </h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-bg-secondary p-6 rounded-lg text-center border border-text-muted/20">
                  <img
                    src={imgBed}
                    alt="bedrooms"
                    className="w-10 h-10 mx-auto mb-2"
                  />
                  <p className="font-semibold text-text-primary">
                    {currentRoom.bedrooms} Bedrooms
                  </p>
                </div>
                <div className="bg-bg-secondary p-6 rounded-lg text-center border border-text-muted/20">
                  <img
                    src={imgVector}
                    alt="bathrooms"
                    className="w-10 h-10 mx-auto mb-2"
                  />
                  <p className="font-semibold text-text-primary">
                    {currentRoom.bathrooms} Bathrooms
                  </p>
                </div>
                <div className="bg-bg-secondary p-6 rounded-lg text-center border border-text-muted/20">
                  <img
                    src={imgGroup1}
                    alt="parking"
                    className="w-10 h-10 mx-auto mb-2"
                  />
                  <p className="font-semibold text-text-primary">
                    {currentRoom.parking}
                  </p>
                </div>
                <div className="bg-bg-secondary p-6 rounded-lg text-center border border-text-muted/20">
                  <img
                    src={imgPetIcon}
                    alt="pets"
                    className="w-10 h-10 mx-auto mb-2"
                  />
                  <p className="font-semibold text-text-primary">
                    {currentRoom.pets} Pets
                  </p>
                </div>
              </div>
            </div>

            {/* Apartment Description */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Apartment Description
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {currentRoom.description}
              </p>
            </div>

            {/* Offered Amenities */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Offered Amenities
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img src={imgKitchen} alt="kitchen" className="w-6 h-6" />
                    <span className="text-text-secondary">Kitchen</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <img src={imgVector} alt="ac" className="w-6 h-6" />
                    <span className="text-text-secondary">Air Conditioner</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <img src={imgLaundry1} alt="washer" className="w-6 h-6" />
                    <span className="text-text-secondary">Washer</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <img src={imgTv} alt="tv" className="w-6 h-6" />
                    <span className="text-text-secondary">
                      Television with Netflix
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <img src={imgWifi} alt="wifi" className="w-6 h-6" />
                    <span className="text-text-secondary">
                      Free Wireless Internet
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <img src={imgBalcony1} alt="balcony" className="w-6 h-6" />
                    <span className="text-text-secondary">
                      Balcony or Patio
                    </span>
                  </div>
                </div>
              </div>
              <button className="mt-6 px-6 py-3 border-2 border-accent rounded-lg font-semibold text-accent hover:bg-accent hover:text-background">
                Show All 10 Amenities
              </button>
            </div>

            {/* Safety and Hygiene */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Safety and Hygiene
              </h2>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-text-muted rounded"></div>
                    <span className="text-text-secondary">Daily Cleaning</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-text-muted rounded"></div>
                    <span className="text-text-secondary">
                      Disinfections and Sterilizations
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-text-muted rounded"></div>
                    <span className="text-text-secondary">
                      Fire Extinguishers
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-text-muted rounded"></div>
                    <span className="text-text-secondary">Smoke Detectors</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-text-primary mb-4">
                Reviews{" "}
                <span className="ml-4 text-2xl font-bold text-accent">5.0</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    name: "John Doberman",
                    date: "Mar 12 2020",
                    review:
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                  },
                  {
                    name: "Jane Smith",
                    date: "Apr 5 2020",
                    review:
                      "Excellent property with great amenities and friendly host.",
                  },
                ].map((reviewer, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 p-4 bg-bg-secondary rounded-lg border border-text-muted/20"
                  >
                    <div className="w-16 h-16 bg-text-muted rounded-full shrink-0"></div>
                    <div>
                      <h3 className="font-bold text-text-primary">
                        {reviewer.name}
                      </h3>
                      <p className="text-text-secondary text-sm">
                        {reviewer.date}
                      </p>
                      <p className="text-text-secondary text-sm mt-2">
                        {reviewer.review}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-6 px-6 py-3 border-2 border-accent rounded-lg font-semibold text-accent hover:bg-accent hover:text-background">
                Show All Reviews
              </button>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="col-span-1">
            <div className="bg-bg-secondary border-2 border-text-muted/20 rounded-lg p-6 sticky top-32">
              <p className="text-2xl font-bold text-accent mb-6">
                ${currentRoom.priceMin} - ${currentRoom.priceMax}
              </p>

              <div className="border-t border-text-muted/20 py-4 mb-4">
                <p className="text-sm text-text-secondary mb-2">
                  Short Period: ${currentRoom.shortPeriod}
                </p>
                <p className="text-sm text-text-secondary mb-2">
                  Medium Period: ${currentRoom.mediumPeriod}
                </p>
                <p className="text-sm text-text-secondary">
                  Long Period: ${currentRoom.longPeriod}
                </p>
              </div>

              <button className="w-full bg-primary text-background font-bold py-3 rounded-full mb-4 hover:bg-primary-hover">
                Reserve Now
              </button>

              <div className="space-y-4">
                <button className="w-full text-left text-sm font-semibold text-accent p-3 border border-accent rounded flex items-center gap-2 hover:bg-accent hover:text-background">
                  <span>🏢</span> Property Inquiry
                </button>
                <button className="w-full text-left text-sm font-semibold text-accent p-3 border border-accent rounded flex items-center gap-2 hover:bg-accent hover:text-background">
                  <span>📞</span> Contact Host
                </button>
              </div>

              {/* Host Info */}
              <div className="mt-8 pt-8 border-t border-text-muted/20">
                <p className="text-xs text-text-muted mb-2">Listed By:</p>
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  {currentRoom.listedBy}
                </h3>
                <p className="text-sm text-text-secondary">
                  For: ${currentRoom.priceMin} - ${currentRoom.priceMax}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Services */}
        <div className="mt-16 mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Nearby Services
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { name: "Grill Restro & Bar", distance: "100 meters away" },
              { name: "Coffee House", distance: "150 meters away" },
              { name: "Supermarket", distance: "200 meters away" },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-bg-secondary border border-text-muted/20 rounded-lg p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={imgFiveStars} alt="stars" className="w-16" />
                </div>
                <h3 className="font-bold text-text-primary">{service.name}</h3>
                <p className="text-sm text-text-secondary">
                  {service.distance}
                </p>
              </div>
            ))}
          </div>
          <button className="mt-6 px-8 py-3 bg-primary text-background rounded-full font-semibold hover:bg-primary-hover">
            Show On Map
          </button>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-bg-secondary py-8 mt-12 border-t border-text-muted/20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-text-primary">
                NEWSLETTER
              </h3>
              <p className="text-sm text-text-secondary">Stay Updated</p>
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Your Email..."
                className="px-6 py-3 rounded-full bg-background text-text-primary border border-text-muted/20 w-96 placeholder-text-muted focus:outline-none focus:border-accent"
              />
              <button className="px-6 py-3 bg-primary text-background rounded-full font-semibold hover:bg-primary-hover">
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
