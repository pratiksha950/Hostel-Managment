import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaGithub, FaTwitter, FaEnvelope, FaHeart } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-white text-gray-700 relative overflow-hidden border-t border-gray-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gray-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gray-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gray-100 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FaHeart className="text-white text-lg" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
                EasyStay
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Simplifying hostel management with smart room allocation,
              complaint tracking, and real-time updates for students and staff.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-purple-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaFacebook className="text-gray-600 hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-purple-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaInstagram className="text-gray-600 hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaTwitter className="text-gray-600 hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                <FaYoutube className="text-gray-600 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-800 border-b border-gray-300 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-600 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-600 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/requests" className="text-gray-600 hover:text-purple-600 transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-600 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Room Requests
                </Link>
              </li>
              <li>
                <Link to="/complaints" className="text-gray-600 hover:text-purple-600 transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-600 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Complaints
                </Link>
              </li>
            </ul>
          </div>

          {/* Hostel Features */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-800 border-b border-gray-300 pb-2">
              Features
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/room-allotment" className="text-gray-600 hover:text-purple-600 transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-600 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Room Allotment
                </Link>
              </li>
              <li>
                <Link to="/maintenance" className="text-gray-600 hover:text-purple-600 transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-600 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Maintenance Requests
                </Link>
              </li>
              <li>
                <Link to="/fees" className="text-gray-600 hover:text-purple-600 transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-600 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Fee Management
                </Link>
              </li>
              <li>
                <Link to="/notices" className="text-gray-600 hover:text-purple-600 transition-colors duration-200 flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-purple-600 transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  Notices
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-gray-800 border-b border-gray-300 pb-2">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Get updates about hostel announcements and notices.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="text-green-500 text-sm mt-2 animate-pulse">
                ✓ Subscribed successfully!
              </p>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-300 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} EasyStay. Made with <FaHeart className="inline text-purple-500 mx-1" /> for better hostel living.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-500 hover:text-purple-600 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-purple-600 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}