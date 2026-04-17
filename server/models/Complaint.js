import { Schema, model } from "mongoose";

const complaintSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    enum: ["Water", "Electricity", "Furniture", "Other"],
    required: true,
  },
  urgency: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Open", "In Progress", "Resolved"],
    default: "Open",
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

const Complaint = model("Complaint", complaintSchema);
export default Complaint;
