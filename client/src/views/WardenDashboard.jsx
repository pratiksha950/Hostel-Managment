import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import Footer from "../components/Footer";

function WardenDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getToken = () => localStorage.getItem("userJwtToken");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const complaintsRes = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/complaints`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      setComplaints(complaintsRes.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateComplaintStatus = async (complaintId, status) => {
    await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/api/complaints/${complaintId}/status`,
      { status },
      { headers: { Authorization: `Bearer ${getToken()}` } }
    );
    fetchDashboardData();
  };

  return (
    <div className="min-h-screen bg-slate-800 text-slate-900">
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 py-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Heading text="Warden Dashboard" />
        </motion.div>

        {/* ONLY COMPLAINTS NOW */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2 justify-center">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl bg-white p-6 shadow-lg lg:col-span-2"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Complaints</h2>
              <span className="bg-indigo-100 px-3 py-1 rounded-full text-indigo-700 text-sm">
                {complaints.length}
              </span>
            </div>

            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <div className="space-y-3">
                {complaints.map((comp, i) => (
                  <motion.div
                    key={comp._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition shadow-sm"
                  >
                    <div>
                      <p className="font-semibold">
                        {comp.student?.name || "Student"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {comp.category} • {comp.urgency}
                      </p>
                    </div>

                    <span className="text-xs px-3 py-1 rounded-full bg-blue-100 w-fit">
                      {comp.status}
                    </span>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          updateComplaintStatus(comp._id, "In Progress")
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Progress
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          updateComplaintStatus(comp._id, "Resolved")
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Resolve
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.main>

      <Footer />
    </div>
  );
}

export default WardenDashboard;