import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage =
    location.pathname === "/signin" || location.pathname === "/signup";
  const isHomePage = location.pathname === "/";

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between">
      <div
        className="flex-shrink-0 cursor-pointer"
        onClick={() => navigate("/")}
      >
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
        {isHomePage && (
          <li>
            <a
              href="#discover-cryptographic-techniques"
              className="text-white font-semibold hover:text-orange-500"
            >
              About
            </a>
          </li>
        )}
        {!isHomePage && user && !isAuthPage && (
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
      </ul>
      <div className="flex items-center">
        {user && !isAuthPage && (
          <button
            onClick={() => navigate("/profile")}
            className="rounded-full border border-gray-300 bg-gray-300 text-white font-bold py-2 px-2 uppercase tracking-wider transition-transform duration-200 ease-in-out transform hover:scale-105 focus:outline-none"
          >
            <img
              src={user.profilePictureUrl}
              alt="Profile"
              className="rounded-full h-8 w-8 object-cover"
            />
          </button>
        )}
        {isAuthPage ? (
          location.pathname === "/signin" ? (
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300"
              onClick={() => navigate("/signup")}
            >
              SignUp
            </button>
          ) : (
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300"
              onClick={() => navigate("/signin")}
            >
              SignIn
            </button>
          )
        ) : user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
          >
            LogOut
          </button>
        ) : (
          <button
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-300"
            onClick={() => navigate("/signin")}
          >
            SignIn
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
