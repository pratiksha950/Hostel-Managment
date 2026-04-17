import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Heading from "../../components/Heading";
import Button from "../../components/Button";
import toast from "react-hot-toast";
import { setPageTitle } from "../../utils.jsx";

function RoomRent() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [preference, setPreference] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    setPageTitle("Room Rent");
    fetchRooms();
  }, []);

  const getToken = () => localStorage.getItem("userJwtToken");

  const fetchRooms = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/rooms`,
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );
      setRooms(res.data.data || []);
    } catch (err) {
      toast.error("Failed to load rooms");
    }
  };

  const handleApply = async () => {
    if (!selectedRoom) {
      toast.error("Select a room first");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/room-requests`,
        {
          building: selectedRoom.building,
          roomType: selectedRoom.roomType,
          preference,
          reason,
        },
        {
          headers: { Authorization: `Bearer ${getToken()}` },
        }
      );

      toast.success("Room request sent ✅");
      setSelectedRoom(null);
      setPreference("");
      setReason("");
    } catch (err) {
      toast.error("Failed to apply");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-10">
        <Heading text="Available Rooms" />

        {/* ROOM CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {rooms.map((room) => (
            <div
              key={room._id}
              className={`bg-white rounded-3xl shadow-lg overflow-hidden transition hover:scale-105 ${
                selectedRoom?._id === room._id
                  ? "border-2 border-purple-600"
                  : ""
              }`}
            >
              {/* IMAGE */}
              <img
                src={
                  room.image ||
                  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
                }
                alt="room"
                className="w-full h-48 object-cover"
              />

              {/* CONTENT */}
              <div className="p-5">
                <h2 className="text-xl font-bold">{room.name}</h2>

                <p className="text-sm text-gray-500">
                  {room.roomType} • {room.building}
                </p>

                <p className="mt-2 text-purple-600 font-semibold">
                  ₹{room.rent}/month
                </p>

                <p className="text-sm mt-2">
                  Available: {room.availableRooms}/{room.totalRooms}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  {room.amenities.join(", ") || "Basic"}
                </p>

                {/* SELECT BUTTON */}
                <button
                  onClick={() => setSelectedRoom(room)}
                  className={`mt-4 w-full py-2 rounded-xl ${
                    selectedRoom?._id === room._id
                      ? "bg-green-500 text-white"
                      : "bg-purple-600 text-white"
                  }`}
                >
                  {selectedRoom?._id === room._id
                    ? "Selected"
                    : "Select Room"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* APPLY FORM */}
        {selectedRoom && (
          <div className="mt-10 max-w-xl mx-auto bg-white p-6 rounded-3xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Apply for {selectedRoom.name}
            </h2>

            <input
              type="text"
              placeholder="Preference (optional)"
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
              className="w-full border rounded-xl px-4 py-2 mb-4"
            />

            <textarea
              placeholder="Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border rounded-xl px-4 py-2 mb-4"
            />

            <Button title="Apply Now" onClick={handleApply} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default RoomRent;