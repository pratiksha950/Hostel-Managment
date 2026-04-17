import RoomRequest from "../models/RoomRequest.js";
import Room from "../models/Room.js";

const createRoomRequest = async (req, res) => {
  try {
    const { building, roomType, preference, reason } = req.body;
    const studentId = req.user?.id;

    if (!studentId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const room = await Room.findOne({
      building,
      roomType,
      availableRooms: { $gt: 0 },
    });

    const request = new RoomRequest({
      student: studentId,
      room: room?._id,
      building,
      roomType,
      preference,
      reason,
      rent: room?.rent || 0,
    });

    const savedRequest = await request.save();
    return res.json({ success: true, message: "Room request submitted", data: savedRequest });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getRoomRequests = async (req, res) => {
  try {
    if (req.user.role === "warden") {
      const requests = await RoomRequest.find().populate("student", "name email").populate("room");
      return res.json({ success: true, data: requests });
    }

    const studentId = req.user?.id;
    const requests = await RoomRequest.find({ student: studentId }).populate("room");
    return res.json({ success: true, data: requests });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateRoomRequestStatus = async (req, res) => {
  try {
    if (req.user.role !== "warden") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const updatedRequest = await RoomRequest.findOneAndUpdate(
      { _id: id },
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: "Room request not found" });
    }

    return res.json({ success: true, message: "Request status updated", data: updatedRequest });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    return res.json({ success: true, data: rooms });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { createRoomRequest, getRoomRequests, updateRoomRequestStatus, getRooms };
