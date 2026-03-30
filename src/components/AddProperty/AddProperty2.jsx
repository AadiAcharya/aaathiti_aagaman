export default function Hosting() {
  const listings = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      location: "New York, NY",
      status: "Active",
      price: "$150/night",
      bookings: 12,
    },
    {
      id: 2,
      title: "Cozy Beach House",
      location: "Miami, FL",
      status: "Active",
      price: "$200/night",
      bookings: 8,
    },
    {
      id: 3,
      title: "Mountain View Cabin",
      location: "Denver, CO",
      status: "Inactive",
      price: "$120/night",
      bookings: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-bold text-text-primary mb-4">
              Your Listings
            </h1>
            <p className="text-text-secondary text-lg">
              Manage your properties and bookings
            </p>
          </div>
          <button className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-4 rounded-full transition">
            + Add New Property
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-bg-secondary rounded-lg p-6 border border-primary/10">
            <p className="text-text-secondary text-sm mb-2">Total Listings</p>
            <p className="text-4xl font-bold text-text-primary">3</p>
          </div>
          <div className="bg-bg-secondary rounded-lg p-6 border border-primary/10">
            <p className="text-text-secondary text-sm mb-2">Active Bookings</p>
            <p className="text-4xl font-bold text-text-primary">25</p>
          </div>
          <div className="bg-bg-secondary rounded-lg p-6 border border-primary/10">
            <p className="text-text-secondary text-sm mb-2">Total Revenue</p>
            <p className="text-4xl font-bold text-text-primary">$4,250</p>
          </div>
          <div className="bg-bg-secondary rounded-lg p-6 border border-primary/10">
            <p className="text-text-secondary text-sm mb-2">Avg. Rating</p>
            <p className="text-4xl font-bold text-text-primary">4.8</p>
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-bg-secondary rounded-lg border border-primary/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background border-b border-primary/10">
                <tr>
                  <th className="text-left px-6 py-4 text-text-primary font-bold">
                    Property
                  </th>
                  <th className="text-left px-6 py-4 text-text-primary font-bold">
                    Location
                  </th>
                  <th className="text-left px-6 py-4 text-text-primary font-bold">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-text-primary font-bold">
                    Price
                  </th>
                  <th className="text-left px-6 py-4 text-text-primary font-bold">
                    Bookings
                  </th>
                  <th className="text-left px-6 py-4 text-text-primary font-bold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing, index) => (
                  <tr
                    key={listing.id}
                    className={`border-b border-primary/10 hover:bg-background transition ${
                      index === listings.length - 1 ? "border-b-0" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-text-primary">
                        {listing.title}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">
                      {listing.location}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          listing.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {listing.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-primary font-semibold">
                      {listing.price}
                    </td>
                    <td className="px-6 py-4 text-text-secondary">
                      {listing.bookings}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button className="text-primary hover:text-primary-hover font-semibold text-sm">
                          Edit
                        </button>
                        <button className="text-red-500 hover:text-red-700 font-semibold text-sm">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-bg-secondary rounded-lg p-8 border border-primary/10 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-text-primary text-lg mb-2">
              View Analytics
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Track your property performance
            </p>
            <button className="text-primary hover:text-primary-hover font-semibold text-sm">
              View Details →
            </button>
          </div>

          <div className="bg-bg-secondary rounded-lg p-8 border border-primary/10 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-text-primary text-lg mb-2">
              Manage Calendar
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Update availability dates
            </p>
            <button className="text-primary hover:text-primary-hover font-semibold text-sm">
              Open Calendar →
            </button>
          </div>

          <div className="bg-bg-secondary rounded-lg p-8 border border-primary/10 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-text-primary text-lg mb-2">
              Messages
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Respond to guest inquiries
            </p>
            <button className="text-primary hover:text-primary-hover font-semibold text-sm">
              View Messages →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}