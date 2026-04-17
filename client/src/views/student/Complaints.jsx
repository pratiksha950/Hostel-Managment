import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Heading from "../../components/Heading";
import Button from "../../components/Button";
import Input2 from "../../components/Input2";
import toast from "react-hot-toast";
import { setPageTitle } from "../../utils.jsx";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [category, setCategory] = useState("Water");
  const [urgency, setUrgency] = useState("Medium");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setPageTitle("Student Complaints");
    fetchComplaints();
  }, []);

  const getToken = () => localStorage.getItem("userJwtToken");

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/complaints`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setComplaints(response.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load complaints");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/complaints`,
        { category, urgency, description },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      toast.success("Complaint submitted successfully");
      setCategory("Water");
      setUrgency("Medium");
      setDescription("");
      fetchComplaints();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to submit complaint");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 text-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <Heading text="Maintenance Complaints" />

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-4xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-semibold">New Complaint</h2>
            <p className="mt-2 text-sm text-slate-500">Report a water, electricity, or furniture issue to the warden.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Category
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-700 focus:border-purple-500 focus:outline-none"
                >
                  <option>Water</option>
                  <option>Electricity</option>
                  <option>Furniture</option>
                  <option>Other</option>
                </select>
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Urgency
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-700 focus:border-purple-500 focus:outline-none"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Description
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-700 focus:border-purple-500 focus:outline-none"
                  placeholder="Describe the issue so the warden can prioritize it"
                />
              </label>

              <div className="flex justify-end">
                <Button title="Submit Complaint" type="submit" varient="primary" />
              </div>
            </form>
          </div>

          <div className="rounded-4xl bg-white p-8 shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Your Complaints</h2>
                <p className="mt-2 text-sm text-slate-500">View all complaint requests and their progress.</p>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Urgency</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {complaints.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50">
                      <td className="px-4 py-4 text-slate-600">{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-4 text-slate-600">{item.category}</td>
                      <td className="px-4 py-4 text-slate-600">{item.urgency}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "Resolved"
                            ? "bg-emerald-100 text-emerald-700"
                            : item.status === "In Progress"
                            ? "bg-sky-100 text-sky-700"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-slate-600">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Complaints;
