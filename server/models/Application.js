import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  studentName: String,
  email: String,
  roomNumber: String,
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
}, { timestamps: true });

export default mongoose.model("Application", applicationSchema);