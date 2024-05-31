import React from "react";
import logo from "../images/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 mb-4 flex items-center justify-between">
      <div className="flex-shrink-0">
        <img src={logo} alt="Logo" className="h-10" />
      </div>
      <ul className="hidden md:flex space-x-6">
        <li>
          <a
            href="/"
            className="text-white font-semibold hover:text-orange-500"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/about"
            className="text-white font-semibold hover:text-orange-500"
          >
            About
          </a>
        </li>
      </ul>
      <div>
      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">
          <a href="/">LogOut</a>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
