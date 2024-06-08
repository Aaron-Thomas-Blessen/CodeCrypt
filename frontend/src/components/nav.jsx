import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../images/logo.png";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between">
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
        {!isAuthPage && user && (
          <>
            <li>
              <a
                href="/encrypt"
                className="text-white font-semibold hover:text-orange-500"
              >
                Encrypt
              </a>
            </li>
            <li>
              <a
                href="/decrypt"
                className="text-white font-semibold hover:text-orange-500"
              >
                Decrypt
              </a>
            </li>
            <li>
              <a
                href="/study"
                className="text-white font-semibold hover:text-orange-500"
              >
                Study
              </a>
            </li>
          </>
        )}
        {!isAuthPage && !user && (
          <>
            <li>
              <a
                href="#discover-cryptographic-techniques"
                className="text-white font-semibold hover:text-orange-500"
              >
                About
              </a>
            </li>
          </>
        )}
      </ul>
      <div>
        {!isAuthPage && (
          <>
            {user ? (
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300">
                <a href="/">LogOut</a>
              </button>
            ) : (
              <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300">
                <a href="/signin">SignIn</a>
              </button>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
