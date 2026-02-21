import { Link } from "react-router-dom";
import shield from "../assets/icon/shield-2-icon.svg";
import heart from "../assets/icon/favorite-icon.svg";
import globe from "../assets/icon/globe-icon.svg";
import award from "../assets/icon/quality-icon.svg";
import users from "../assets/icon/users-icon.svg";
import target from "../assets/icon/target-icon.svg";
import { useUser } from "../UserContext";

export default function About() {
  const { user } = useUser();
  const isLoggedIn = !!user;
  const isHost = user?.isHost;
  const values = [
  {
    title: "Trust & Safety",
    desc: "Every car and user is verified to ensure a safe experience.",
    icon: shield
  },
  {
    title: "Customer First",
    desc: "Simple booking with support whenever you need it.",
    icon: heart
  },
  {
    title: "Sustainability",
    desc: "Encouraging car sharing to reduce environmental impact.",
    icon: globe
  },
  {
    title: "Quality Vehicles",
    desc: "Only well-maintained cars make it to Rentify.",
    icon: award
  },
  {
    title: "Community",
    desc: "Connecting hosts and renters through trust.",
    icon: users
  },
  {
    title: "Innovation",
    desc: "Always improving to make renting easier.",
    icon: target
  }
];


  return (
    <div className="pt-20 md:pt-28 px-4">

      <div className="max-w-3xl md:max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-900 leading-tight">
            About Rentify
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Smart car rentals made simple
          </p>
        </div>

        {/* Intro */}
        <div className="bg-white shadow-sm md:shadow rounded-2xl p-4 md:p-8 mb-6 md:mb-10 transition">
          <p className="text-gray-600 leading-relaxed text-center text-sm md:text-base">
            Rentify is a modern car rental platform designed to help users easily find, compare,
            and book cars based on their needs. Whether it’s a short city ride or a long journey,
            Rentify makes the process fast, transparent, and convenient.
          </p>
        </div>

        {/* Mission + Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

          <div className="bg-white shadow-sm md:shadow rounded-2xl p-4 md:p-6 transition text-center">
            <h3 className="text-lg md:text-xl font-semibold text-blue-900 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              To provide a simple and reliable car rental experience by combining modern
              technology with user-friendly design.
            </p>
          </div>

          <div className="bg-white shadow-sm md:shadow rounded-2xl p-4 md:p-6 transition text-center">
            <h3 className="text-lg md:text-xl font-semibold text-blue-900 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              To become a trusted platform where anyone can rent cars easily and confidently.
            </p>
          </div>
        </div>

      </div>

      {/* OUR VALUES SECTION */}
<div className="bg-gray-50 py-12 md:py-20">

  <div className="max-w-7xl mx-auto px-4 md:px-40">

    <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
      <span className="text-blue-700 font-medium text-sm uppercase tracking-wider">
        Our Values
      </span>

      <h2 className="text-2xl md:text-3xl font-bold text-black-900 mt-2">
        What We Stand For
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">


      {values.map((item, i) => (
        <div
          key={i}
          className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition text-center"
        >

          {/* Icon box */}
          <div className="w-12 h-12 md:w-14 md:h-14 mx-auto rounded-lg bg-gray-100 flex items-center justify-center mb-3 md:mb-4">
              <img src={item.icon} alt="" className="w-6 h-6 md:w-7 md:h-7 opacity-90" />
          </div>


          <h3 className="text-base md:text-lg font-semibold text-black-900 mb-1 md:mb-2">
            {item.title}
          </h3>

          <p className="text-gray-500 text-sm md:text-sm">
            {item.desc}
          </p>

        </div>
      ))}

    </div>

  </div>
      </div>

      {/* CTA */}
<div className="py-16">

  <div className="max-w-4xl mx-auto text-center px-4">

    <h2 className="text-3xl font-bold text-black-900 mb-3">
      Ready to Get Started?
    </h2>

    <p className="text-gray-500 mb-8">
      Join thousands of users already exploring Rentify.
    </p>

    <div className="flex justify-center gap-4">

      <Link
        to="/cars"
        className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition"
      >
        Browse Cars
      </Link>

      {/* ⭐ SMART CTA */}
      {!isLoggedIn ? (
        <Link
          to="/auth"
          className="border border-blue-900 text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-900 hover:text-white transition"
        >
          Become a Host
        </Link>
      ) : !isHost ? (
        <Link
          to="/host"
          className="border border-blue-900 text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-900 hover:text-white transition"
        >
          Become a Host
        </Link>
      ) : (
        <Link
          to="/dashboard/manage-cars"
          className="border border-blue-900 text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-900 hover:text-white transition"
        >
          Manage Cars
        </Link>
      )}

    </div>

  </div>

</div>

    </div>
  );
}
