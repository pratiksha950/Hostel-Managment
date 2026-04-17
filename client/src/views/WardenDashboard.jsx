import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import Footer from "../components/Footer";

function WardenDashboard() {
  const [roomRequests, setRoomRequests] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const getToken = () => localStorage.getItem("userJwtToken");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [requestsRes, complaintsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/room-requests`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/complaints`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        }),
      ]);
      setRoomRequests(requestsRes.data.data || []);
      setComplaints(complaintsRes.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateRoomRequestStatus = async (requestId, status) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/room-requests/${requestId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      fetchDashboardData();
    } catch (error) {
      console.error(error);
    }
  };

  const updateComplaintStatus = async (complaintId, status) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/complaints/${complaintId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      fetchDashboardData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-10">
        <Heading text="Warden Dashboard" />
        <p className="max-w-3xl text-slate-600">
          Review and manage student room requests and maintenance complaints. Approve, reject, or resolve requests directly from this panel.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-4xl bg-white p-8 shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Room Allotment Requests</h2>
                <p className="mt-2 text-sm text-slate-500">Approve or reject student room allotment applications.</p>
              </div>
              <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">{roomRequests.length} total</span>
            </div>

            {loading ? (
              <p className="mt-6 text-sm text-slate-500">Loading requests…</p>
            ) : (
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead>
                    <tr className="text-left text-slate-500">
                      <th className="px-4 py-3">Student</th>
                      <th className="px-4 py-3">Building</th>
                      <th className="px-4 py-3">Room Type</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {roomRequests.map((request) => (
                      <tr key={request._id} className="hover:bg-slate-50">
                        <td className="px-4 py-4 text-slate-600">{request.student?.name || request.student?.email || "Student"}</td>
                        <td className="px-4 py-4 text-slate-600">{request.building}</td>
                        <td className="px-4 py-4 text-slate-600">{request.roomType}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            request.status === "Approved"
                              ? "bg-emerald-100 text-emerald-700"
                              : request.status === "Rejected"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-amber-100 text-amber-700"
                          }`}>
                            {request.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 space-x-2">
                          <button
                            onClick={() => updateRoomRequestStatus(request._id, "Approved")}
                            className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateRoomRequestStatus(request._id, "Rejected")}
                            className="rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-700"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="rounded-4xl bg-white p-8 shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Maintenance Complaints</h2>
                <p className="mt-2 text-sm text-slate-500">View student issues and update status to track progress.</p>
              </div>
              <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">{complaints.length} open</span>
            </div>

            {loading ? (
              <p className="mt-6 text-sm text-slate-500">Loading complaints…</p>
            ) : (
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead>
                    <tr className="text-left text-slate-500">
                      <th className="px-4 py-3">Student</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Urgency</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {complaints.map((complaint) => (
                      <tr key={complaint._id} className="hover:bg-slate-50">
                        <td className="px-4 py-4 text-slate-600">{complaint.student?.name || complaint.student?.email || "Student"}</td>
                        <td className="px-4 py-4 text-slate-600">{complaint.category}</td>
                        <td className="px-4 py-4 text-slate-600">{complaint.urgency}</td>
                        <td className="px-4 py-4">
                          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            complaint.status === "Resolved"
                              ? "bg-emerald-100 text-emerald-700"
                              : complaint.status === "In Progress"
                              ? "bg-sky-100 text-sky-700"
                              : "bg-amber-100 text-amber-700"
                          }`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 space-x-2">
                          <button
                            onClick={() => updateComplaintStatus(complaint._id, "In Progress")}
                            className="rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold text-white hover:bg-sky-700"
                          >
                            In Progress
                          </button>
                          <button
                            onClick={() => updateComplaintStatus(complaint._id, "Resolved")}
                            className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
                          >
                            Resolve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default WardenDashboard;
