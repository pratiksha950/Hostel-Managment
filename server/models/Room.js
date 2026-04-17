import { Schema, model } from "mongoose";

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
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
  totalRooms: {
    type: Number,
    required: true,
    default: 1,
  },
  availableRooms: {
    type: Number,
    required: true,
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