import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import Footer from "../components/Footer";
import { getUserData, setPageTitle } from "../utils.jsx";

const initialRequests = [
  {
    id: 1,
    roomType: "Single",
    building: "Block A",
    preference: "Near window",
    status: "Pending",
    appliedOn: "2026-04-15",
  },
  {
    id: 2,
    roomType: "Shared",
    building: "Block C",
    preference: "Lower floor",
    status: "Approved",
    appliedOn: "2026-03-28",
  },
];

const initialComplaints = [
  {
    id: 1,
    category: "Water",
    description: "No water supply in hostel washroom.",
    urgency: "High",
    status: "In Progress",
    submittedOn: "2026-04-10",
  },
  {
    id: 2,
    category: "Furniture",
    description: "Broken study table in room 210.",
    urgency: "Medium",
    status: "Resolved",
    submittedOn: "2026-03-31",
  },
];

function StudentDashboard() {
  const user = getUserData();
  const [requests, setRequests] = useState(initialRequests);
  const [complaints, setComplaints] = useState(initialComplaints);

  useEffect(() => {
    setPageTitle("Hostel Management - Student Dashboard");
  }, []);

  const stats = {
    pendingRequests: requests.filter((item) => item.status === "Pending").length,
    approvedRequests: requests.filter((item) => item.status === "Approved").length,
    rejectedRequests: requests.filter((item) => item.status === "Rejected").length,
    activeComplaints: complaints.filter((item) => item.status !== "Resolved").length,
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-10">
        <section className="rounded-4xl bg-linear-to-r from-purple-600 to-indigo-600 p-10 shadow-2xl text-white">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Heading text={`Welcome back, ${user.name || "Student"}`} />
              <p className="max-w-2xl text-sm text-slate-100/90 mt-2">
                Manage your room allotment application, track approval status, and raise maintenance complaints for water, electricity, or furniture.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-3xl bg-white/10 p-4 text-center backdrop-blur-sm">
                <p className="text-3xl font-semibold">{stats.pendingRequests}</p>
                <p className="text-sm text-slate-200">Pending Requests</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-4 text-center backdrop-blur-sm">
                <p className="text-3xl font-semibold">{stats.approvedRequests}</p>
                <p className="text-sm text-slate-200">Approved</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-4 text-center backdrop-blur-sm">
                <p className="text-3xl font-semibold">{stats.rejectedRequests}</p>
                <p className="text-sm text-slate-200">Rejected</p>
              </div>
              <div className="rounded-3xl bg-white/10 p-4 text-center backdrop-blur-sm">
                <p className="text-3xl font-semibold">{stats.activeComplaints}</p>
                <p className="text-sm text-slate-200">Active Complaints</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-4xl bg-white p-8 shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Request a Room</h2>
                <p className="mt-2 text-sm text-slate-500">Submit a room allotment request and track approval with the warden.</p>
              </div>
              <div className="text-sm font-medium text-purple-600">Student service</div>
            </div>

            <div className="mt-8 space-y-4">
              <p className="text-slate-600">Visit the room rent page to see available hostel rooms, choose your preferred accommodation, and send an application.</p>
              <Link to="/student/room-rent" className="inline-flex items-center justify-center rounded-2xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700">
                Go to Room Rent
              </Link>
            </div>
          </div>

          <div className="rounded-4xl bg-white p-8 shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Submit a Complaint</h2>
                <p className="mt-2 text-sm text-slate-500">Report maintenance issues and let the warden track them until resolution.</p>
              </div>
              <div className="text-sm font-medium text-indigo-600">Maintenance help</div>
            </div>

            <div className="mt-8 space-y-4">
              <p className="text-slate-600">Raise complaints for water, electricity, furniture, or general hostel maintenance directly from the student portal.</p>
              <Link to="/student/complaints" className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
                Go to Complaints
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-10 space-y-6">
          <div className="rounded-4xl bg-white p-8 shadow-lg">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Room Allotment Status</h2>
                <p className="mt-2 text-sm text-slate-500">Track your live room applications and decision status.</p>
              </div>
              <div className="rounded-full bg-purple-50 px-4 py-2 text-sm text-purple-700">Latest update: {requests[0]?.status || "No requests yet"}</div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th className="px-4 py-3">Applied On</th>
                    <th className="px-4 py-3">Building</th>
                    <th className="px-4 py-3">Room Type</th>
                    <th className="px-4 py-3">Preference</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {requests.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-4 py-4 text-slate-600">{item.appliedOn}</td>
                      <td className="px-4 py-4 text-slate-600">{item.building}</td>
                      <td className="px-4 py-4 text-slate-600">{item.roomType}</td>
                      <td className="px-4 py-4 text-slate-600">{item.preference}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "Approved"
                            ? "bg-emerald-100 text-emerald-700"
                            : item.status === "Rejected"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-amber-100 text-amber-700"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-4xl bg-white p-8 shadow-lg">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Maintenance Complaints</h2>
                <p className="mt-2 text-sm text-slate-500">Monitor issue resolution and response progress from the maintenance team.</p>
              </div>
              <div className="rounded-full bg-indigo-50 px-4 py-2 text-sm text-indigo-700">Open cases: {stats.activeComplaints}</div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th className="px-4 py-3">Submitted</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Urgency</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {complaints.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-4 py-4 text-slate-600">{item.submittedOn}</td>
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

export default StudentDashboard;
