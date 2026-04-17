import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { getUserData, logoutUser } from "../utils";
import Button from "./Button";
import toast, { Toaster } from "react-hot-toast";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
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

  const dashboardLink = userData?.role === "warden" ? "/warden-dashboard" : "/student-dashboard";
  const isStudent = userData?.role === "student";
  const isWarden = userData?.role === "warden";

  return (
    <nav className="w-full bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 md:px-6">

        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent cursor-pointer">
            <Link to="/" className="hover:from-purple-600 hover:to-purple-700 transition-all duration-300">
              EasyStay
            </Link>
          </h1>    
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
            Home
          </Link>
          {userData?.name && (
            <Link to={dashboardLink} className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
              Dashboard
            </Link>
          )}
          {isStudent && (
            <Link to="/room-rent" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
              Room Requests
            </Link>
          )}
          {isStudent && (
            <Link to="/student/complaints" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
              Complaints
            </Link>
          )}
          {isWarden && (
            <Link to="/warden-dashboard" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
              Applications
            </Link>
          )}
          <Link to="/about" className="text-gray-700 hover:text-purple-600 font-medium transition-colors duration-200">
            About
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* About - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
        
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
              className="hidden md:block bg-linear-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md"
            >
              Login
            </Link>
          )}

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
              <Link to="/" className="block text-gray-700 hover:text-purple-600 font-medium py-2 border-b border-gray-200" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
              {userData?.name && (
                <Link to={dashboardLink} className="block text-gray-700 hover:text-purple-600 font-medium py-2 border-b border-gray-200" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
              )}
              {isStudent && (
                <Link to="/student/room-rent" className="block text-gray-700 hover:text-purple-600 font-medium py-2 border-b border-gray-200" onClick={() => setMenuOpen(false)}>
                  Room Requests
                </Link>
              )}
              {isStudent && (
                <Link to="/student/complaints" className="block text-gray-700 hover:text-purple-600 font-medium py-2 border-b border-gray-200" onClick={() => setMenuOpen(false)}>
                  Complaints
                </Link>
              )}
              {isWarden && (
                <Link to="/warden-dashboard" className="block text-gray-700 hover:text-purple-600 font-medium py-2 border-b border-gray-200" onClick={() => setMenuOpen(false)}>
                  Applications
                </Link>
              )}
              <Link to="/about" className="block text-gray-700 hover:text-purple-600 font-medium py-2 border-b border-gray-200" onClick={() => setMenuOpen(false)}>
                About
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
                  className="w-full bg-linear-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-4">
                <Link
                  to="/login"
                  className="block w-full bg-linear-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-lg font-medium text-center hover:from-purple-600 hover:to-purple-700 transition-all duration-200"
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


