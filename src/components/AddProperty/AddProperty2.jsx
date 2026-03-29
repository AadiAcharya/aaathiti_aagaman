export default function AddPropertyDescription() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <h1 className="text-2xl font-bold text-gray-800">LOGO</h1>
            <nav className="hidden md:flex gap-8">
              <p className="text-gray-700 text-sm cursor-pointer hover:text-gray-900">
                Find a Property
              </p>
              <p className="text-gray-700 text-sm cursor-pointer hover:text-gray-900">
                Share Stories
              </p>
              <p className="text-gray-700 text-sm cursor-pointer hover:text-gray-900">
                Rental Guides
              </p>
              <p className="text-gray-700 text-sm cursor-pointer hover:text-gray-900">
                Download Mobile App
              </p>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-700 transition">
              Become A Host
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-3xl">
          {/* Title */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Add a short description of your place.
            </h2>
          </div>

          {/* Description Textarea */}
          <div className="mb-8">
            <textarea
              className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none text-gray-700"
              placeholder="Enter description..."
            ></textarea>
          </div>

          {/* Property Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Rental Unit */}
            <div className="border-2 border-blue-500 rounded-lg p-6 cursor-pointer hover:bg-blue-50 transition">
              <h3 className="font-bold text-gray-800 mb-2">Rental unit</h3>
              <p className="text-sm text-gray-600">
                A rental place within a multi-unit residential building or
                complex.
              </p>
            </div>

            {/* Shared Unit */}
            <div className="border-2 border-gray-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
              <h3 className="font-bold text-gray-800 mb-2">Shared unit</h3>
              <p className="text-sm text-gray-600">
                A shared place within a multi-unit residential building or
                complex.
              </p>
            </div>
          </div>

          {/* Next Button */}
          <div>
            <button className="bg-gray-400 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-500 transition">
              Next
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo & Description */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">LOGO</h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="flex gap-3">
                <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm font-medium text-gray-700 flex items-center gap-2 transition">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  PlayStore
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm font-medium text-gray-700 flex items-center gap-2 transition">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                  AppleStore
                </button>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold text-gray-800 mb-4 text-sm">COMPANY</h4>
              <ul className="space-y-2">
                <li>
                  <p className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                    About Us
                  </p>
                </li>
                <li>
                  <p className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                    Legal Information
                  </p>
                </li>
                <li>
                  <p className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                    Contact Us
                  </p>
                </li>
                <li>
                  <p className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                    Blogs
                  </p>
                </li>
              </ul>
            </div>

            {/* Help Center */}
            <div>
              <h4 className="font-bold text-gray-800 mb-4 text-sm">
                HELP CENTER
              </h4>
              <ul className="space-y-2">
                <li>
                  <p className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                    Find a Property
                  </p>
                </li>
                <li>
                  <p className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                    How To Host?
                  </p>
                </li>
                <li>
                  <p className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                    Why Us?
                  </p>
                </li>
                <li>
                  <p className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                    FAQs
                  </p>
                </li>
                <li>
                  <p className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
                    Rental Guides
                  </p>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-gray-800 mb-4 text-sm">
                CONTACT INFO
              </h4>
              <ul className="space-y-2 mb-6">
                <li>
                  <p className="text-sm text-gray-600">Phone: 1234567890</p>
                </li>
                <li>
                  <p className="text-sm text-gray-600">
                    Email: company@email.com
                  </p>
                </li>
                <li>
                  <p className="text-sm text-gray-600">
                    Location: 100 Smart Street, LA, USA
                  </p>
                </li>
              </ul>
              {/* Social Icons */}
              <div className="flex gap-4">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
            <p>© 2022 thecreation.design | All rights reserved</p>
            <p>
              Created with love by{" "}
              <span className="font-bold">thecreation.design</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}