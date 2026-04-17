import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Heading from "../../components/Heading";
import Button from "../../components/Button";
import Input2 from "../../components/Input2";
import toast from "react-hot-toast";
import { setPageTitle } from "../../utils.jsx";

function RoomRent() {
  const [rooms, setRooms] = useState([]);
  const [requests, setRequests] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [preference, setPreference] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    setPageTitle("Room Rent - Student Dashboard");
    fetchRooms();
    fetchRequests();
  }, []);

  const getToken = () => localStorage.getItem("userJwtToken");

  const fetchRooms = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/rooms`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setRooms(response.data.data || []);
      if (response.data.data?.length) {
        setSelectedRoom(response.data.data[0]._id);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to load rooms");
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/room-requests`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setRequests(response.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Unable to load your requests");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const room = rooms.find((item) => item._id === selectedRoom);
      if (!room) {
        toast.error("Please select a room type");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/room-requests`,
        {
          building: room.building,
          roomType: room.roomType,
          preference,
          reason,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      toast.success("Room request sent to the warden");
      setPreference("");
      setReason("");
      fetchRequests();
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to submit request");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-10">
        <Heading text="Room Rent & Allotment" />

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-4xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-semibold">Available Rooms</h2>
            <p className="mt-2 text-sm text-slate-500">Choose the room type and submit an allotment request.</p>

            <div className="mt-6 space-y-4">
              {rooms.length === 0 ? (
                <p className="text-sm text-slate-500">No rooms available right now.</p>
              ) : (
                rooms.map((room) => (
                  <div key={room._id} className="rounded-3xl border border-slate-200 p-4">
                    <label className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="selectedRoom"
                        value={room._id}
                        checked={selectedRoom === room._id}
                        onChange={() => setSelectedRoom(room._id)}
                        className="mt-1 h-4 w-4 text-purple-600"
                      />
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-lg font-semibold">{room.roomType} - {room.building}</p>
                          <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                            ${room.rent}/month
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-slate-600">Available: {room.availableRooms}</p>
                        <p className="mt-2 text-sm text-slate-500">Amenities: {room.amenities.join(", ") || "Standard"}</p>
                      </div>
                    </label>
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Preference
                <Input2
                  type="text"
                  placeholder="Lower floor, near exit, etc."
                  value={preference}
                  onChange={(e) => setPreference(e.target.value)}
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Reason for allotment
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={4}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm text-slate-700 focus:border-purple-500 focus:outline-none"
                  placeholder="Tell the warden why you need this room"
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <Button title="Apply for Room" type="submit" varient="primary" />
                <Link to="/student/complaints" className="text-sm text-purple-600 hover:underline">
                  Need maintenance instead?
                </Link>
              </div>
            </form>
          </div>

          <div className="rounded-4xl bg-white p-8 shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">Your Requests</h2>
                <p className="mt-2 text-sm text-slate-500">Track all room allotment requests submitted by you.</p>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead>
                  <tr className="text-left text-slate-500">
                    <th className="px-4 py-3">Applied</th>
                    <th className="px-4 py-3">Room</th>
                    <th className="px-4 py-3">Building</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Rent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {requests.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50">
                      <td className="px-4 py-4 text-slate-600">{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-4 text-slate-600">{item.roomType}</td>
                      <td className="px-4 py-4 text-slate-600">{item.building}</td>
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
                      <td className="px-4 py-4 text-slate-600">${item.rent}</td>
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

export default RoomRent;
