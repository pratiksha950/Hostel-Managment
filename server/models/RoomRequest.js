import { Schema, model } from "mongoose";
import Room from "./Room.js";

const roomRequestSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
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
  preference: {
    type: String,
    default: "",
  },
  reason: {
    type: String,
    default: "",
  },
  rent: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
}, { timestamps: true });

roomRequestSchema.pre("save", async function (next) {
  if (!this.room && this.roomType && this.building) {
    const room = await Room.findOne({
      building: this.building,
      roomType: this.roomType,
      availableRooms: { $gt: 0 },
    });
    if (room) {
      this.room = room._id;
      this.rent = room.rent;
    }
  }
  next();
});

roomRequestSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  this._existingRequest = await this.model.findOne(query);
  next();
});

roomRequestSchema.post("findOneAndUpdate", async function (doc) {
  if (!doc || !this._existingRequest) return;

  const prevStatus = this._existingRequest.status;
  const newStatus = doc.status;

  if (prevStatus !== "Approved" && newStatus === "Approved" && doc.room) {
    await Room.findByIdAndUpdate(doc.room, { $inc: { availableRooms: -1 } });
  }
  if (prevStatus === "Approved" && newStatus !== "Approved" && doc.room) {
    await Room.findByIdAndUpdate(doc.room, { $inc: { availableRooms: 1 } });
  }
});

const RoomRequest = model("RoomRequest", roomRequestSchema);
export default RoomRequest;
