"use client";
import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

function BookRoom() {
  const [form, setForm] = useState({
    studentName: "",
    email: "",
    roomNumber: "",
  });

  const token = localStorage.getItem("userJwtToken");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/room-requests`,
        {
          studentName: form.studentName,
          email: form.email,
          roomNumber: form.roomNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("✅ Application submitted (Pending)");

      setForm({
        studentName: "",
        email: "",
        roomNumber: "",
      });
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("❌ Failed: " + (err.response?.data?.message || "Error"));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-purple-500/20 rounded-2xl p-8 shadow-2xl"
        >
          <h2 className="text-3xl font-bold text-center mb-6">
            Book Your Room
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              name="studentName"
              value={form.studentName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600"
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600"
            />

            <input
              name="roomNumber"
              value={form.roomNumber}
              onChange={handleChange}
              placeholder="Room Number"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 rounded-lg bg-purple-500 hover:bg-purple-600 font-semibold"
            >
              Apply for Room
            </motion.button>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}

export default BookRoom;
