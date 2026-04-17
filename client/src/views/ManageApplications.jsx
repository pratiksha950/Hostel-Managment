"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

function ManageApplications() {
  const [apps, setApps] = useState([]);
  const token = localStorage.getItem("userJwtToken");

  const fetchApps = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/room-requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApps(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load requests");
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/room-requests/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(`Request ${status}`);
      fetchApps();
    } catch (err) {
      toast.error("Action failed");
    }
  };

  const getStatusStyle = (status) => {
    if (status === "Accepted")
      return "bg-green-500/20 text-green-400 border-green-500/30";
    if (status === "Rejected")
      return "bg-red-500/20 text-red-400 border-red-500/30";
    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">

      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-16">

        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-10"
        >
          Manage Room Applications
        </motion.h1>

        {/* Empty State */}
        {apps.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-lg">No applications yet 🚫</p>
          </div>
        ) : (

          <div className="grid gap-6">

            {apps.map((app) => (
              <motion.div
                key={app._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition"
              >

                {/* Top Row */}
                <div className="flex justify-between items-center mb-4">

                  <div>
                    <h2 className="text-xl font-semibold">
                      {app.studentName}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      {app.email}
                    </p>
                 
                  </div>

                  <span
                    className={`px-4 py-1 text-sm rounded-full border ${getStatusStyle(app.status)}`}
                  >
                    {app.status}
                  </span>

                </div>

                {/* Room Info */}
                <div className="mb-4 text-gray-300">
                  Room Number:{" "}
                  <span className="font-semibold text-white">
                    {app.roomNumber}
                  </span>
                </div>

                {/* Actions */}
                {app.status === "Pending" && (
                  <div className="flex gap-3">

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        updateStatus(app._id, "Accepted")
                      }
                      className="flex-1 py-2 rounded-lg bg-green-500 hover:bg-green-600 font-semibold"
                    >
                      Accept
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        updateStatus(app._id, "Rejected")
                      }
                      className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 font-semibold"
                    >
                      Reject
                    </motion.button>

                  </div>
                )}

              </motion.div>
            ))}

          </div>
        )}

      </div>

      <Footer />
    </div>
  );
}

export default ManageApplications;