import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function AdminApplications() {
  const [requests, setRequests] = useState([]);

  const token = localStorage.getItem("userJwtToken");

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/room-requests`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRequests(res.data.data);
    } catch {
      toast.error("Failed to load requests");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (id, status) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/room-requests/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(`Request ${status}`);
      fetchRequests();
    } catch {
      toast.error("Action failed");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">
        Room Applications
      </h1>

      <div className="bg-white p-6 rounded-3xl shadow-lg">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-gray-500 text-left">
              <th className="py-3">Student</th>
              <th>Room</th>
              <th>Building</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((r) => (
              <tr key={r._id} className="border-b hover:bg-gray-50">
                <td className="py-3">{r.student?.name}</td>
                <td>{r.roomType}</td>
                <td>{r.building}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      r.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : r.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>

                <td className="flex gap-2 py-2">
                  {r.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleAction(r._id, "Approved")}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleAction(r._id, "Rejected")}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminApplications;