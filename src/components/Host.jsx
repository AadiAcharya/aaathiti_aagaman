import React from "react";

const Body = () => {
  return (
    <div className="bg-gray-100 text-gray-800">

      {/* HERO SECTION */}
      <section className="h-[70vh] flex flex-col justify-center px-16 bg-gray-200">
        <h1 className="text-4xl font-bold mb-4">
          Try Hosting With Us
        </h1>

        <p className="text-gray-500 max-w-lg mb-6">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
          praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.
        </p>

        <button className="bg-gray-700 text-white px-6 py-3 rounded-full w-fit hover:bg-gray-800 transition">
          Lets Get Started
        </button>
      </section>

      {/* INFO SECTION */}
      <section className="grid grid-cols-2 gap-10 px-16 py-16">

        {/* Image placeholder */}
        <div className="bg-gray-300 rounded-xl h-80"></div>

        {/* Text */}
        <div className="flex flex-col justify-center space-y-4">
          <h2 className="text-3xl font-semibold">Some Title Here</h2>

          <p className="text-gray-500">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.
          </p>

          <p className="text-gray-500">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.
          </p>

          <p className="text-gray-500">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.
          </p>
        </div>
      </section>

      {/* CARDS SECTION */}
      <section className="px-16 pb-16">

        <h2 className="text-2xl font-semibold mb-8">
          Hosting Tips & Guides
        </h2>

        <div className="grid grid-cols-3 gap-6">

          {/* CARD */}
          <div>
            <div className="bg-gray-300 h-48 rounded-lg mb-3"></div>
            <h3 className="font-semibold">Choose the right property!</h3>
            <p className="text-sm text-gray-500">Economy</p>
          </div>

          {/* CARD */}
          <div>
            <div className="bg-gray-300 h-48 rounded-lg mb-3"></div>
            <h3 className="font-semibold">Best environment for rental</h3>
            <p className="text-sm text-gray-500">Lifestyle</p>
          </div>

          {/* CARD */}
          <div>
            <div className="bg-gray-300 h-48 rounded-lg mb-3"></div>
            <h3 className="font-semibold">Boys Hostel Apartment</h3>
            <p className="text-sm text-gray-500">Property</p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Body;