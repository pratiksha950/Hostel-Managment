import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  building: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    enum: ["Single", "Shared", "VIP"],
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
  availableRooms: {
    type: Number,
    default: 1,
  },
  amenities: {
    type: [String],
    default: [],
  },

  // ✅ ADD THIS
  image: {
    type: String,
    default: "",
  }

}, { timestamps: true });

const Room = model("Room", roomSchema);
export default Room;
