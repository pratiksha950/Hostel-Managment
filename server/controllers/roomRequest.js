import Application from "../models/Application.js";
import Room from "../models/Room.js";

// CREATE REQUEST
const createRoomRequest = async (req, res) => {
  try {
    const { roomNumber } = req.body;

    const newRequest = await Application.create({
      studentName: req.user.name,
      email: req.user.email,
      roomNumber,
    });

    res.status(201).json({
      success: true,
      data: newRequest,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET REQUESTS
const getRoomRequests = async (req, res) => {
  try {
    const apps = await Application.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: apps,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching requests" });
  }
};

// UPDATE STATUS
const updateRoomRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};

// GET ROOMS
const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json({ success: true, data: rooms });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export {
  createRoomRequest,
  getRoomRequests,
  updateRoomRequestStatus,
  getRooms,
};