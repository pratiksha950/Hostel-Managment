import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { getUserData, logoutUser } from "../utils";
import Button from "./Button";
import toast, { Toaster } from "react-hot-toast";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    setUserData(user);

    const handleStorageChange = () => {
      const updatedUser = JSON.parse(localStorage.getItem("userData"));
      setUserData(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartCount(cart.length);
    };

    updateCartCount();

    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <nav className="w-full bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 md:px-6">

        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent cursor-pointer">
            <Link to="/" className="hover:from-purple-600 hover:to-purple-700 transition-all duration-300">
              GiftForYou
            </Link>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/wedding" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group">
            Wedding
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link to="/birthday" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group">
            Birthday
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link to="/valentine" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group">
            Valentine
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link to="/fashion" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group">
            Fashion
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
          </Link>
          <Link to="/cake" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200 relative group">
            Cakes
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 transition-all duration-200 group-hover:w-full"></span>
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* About & Contact - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/about" className="text-gray-600 hover:text-purple-600 text-sm font-medium transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-purple-600 text-sm font-medium transition-colors">
              Contact
            </Link>
          </div>

          {/* User Section */}
          {userData?.name ? (
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/profile" className="flex items-center space-x-2 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
                {userData?.photos?.length > 0 ? (
                  <img
                    src={userData.photos[0]}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-purple-200"
                  />
                ) : (
                  <Avatar name={userData.name} />
                )}
                <span className="text-sm font-medium text-gray-700">
                  Hello, {userData.name}{userData.role ? ` (${userData.role})` : ""}
                </span>
              </Link>
              <Button
                title="Logout"
                variant="secondary"
                onClick={logoutUser}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              />
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden md:block bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md"
            >
              Login
            </Link>
          )}

          {/* Cart */}
          <div className="relative">
            <Link to="/cart" className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
              <span className="text-xl">🛒</span>
            </Link>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                {cartCount}
              </span>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="text-xl">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {/* Navigation Links */}
            <div className="space-y-3">
              <Link to="/wedding" className="block text-gray-700 hover:text-purple-600 font-medium py-2 border-b border-gray-200" onClick={() => setMenuOpen(false)}>
                Wedding
              </Link>
              <Link to="/birthday" className="block text-gray-700 hover:text-purple-600 font-medium py-2 border-b border-gray-200" onClick={() => setMenuOpen(false)}>
                Birthday
              </Link>
              <Link to="/valentine" className="block text-gray-700 hover:text-purple-600 font-medium py-2 border-b border-gray-200" onClick={() => setMenuOpen(false)}>
                Valentine
              </Link>
              <Link to="/fashion" className="block text-gray-700 hover:text-purple-600 font-medium py-2 border-b border-gray-200" onClick={() => setMenuOpen(false)}>
                Fashion
              </Link>
              <Link to="/cake" className="block text-gray-700 hover:text-purple-600 font-medium py-2 border-b border-gray-200" onClick={() => setMenuOpen(false)}>
                Cakes
              </Link>
              <Link to="/about" className="block text-gray-700 hover:text-purple-600 font-medium py-2 border-b border-gray-200" onClick={() => setMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" className="block text-gray-700 hover:text-purple-600 font-medium py-2 border-b border-gray-200" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </div>

            {/* User Section */}
            {userData?.name ? (
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <Link to="/profile" className="flex items-center space-x-3 py-2" onClick={() => setMenuOpen(false)}>
                  {userData?.photos?.length > 0 ? (
                    <img
                      src={userData.photos[0]}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                      {userData.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="font-medium text-gray-700">Hello, {userData.name}</span>
                </Link>
                <button
                  onClick={() => {
                    logoutUser();
                    setMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-4">
                <Link
                  to="/login"
                  className="block w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-lg font-medium text-center hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
      <Toaster />
    </nav>
  );
}

export default Navbar;


