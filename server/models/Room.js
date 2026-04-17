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
}, { timestamps: true });

export default mongoose.model("Room", roomSchema);