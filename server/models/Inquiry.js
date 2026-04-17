import { Schema, model } from "mongoose";

const inquirySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },

    status: {
      type: String,
      enum: ["new", "in-progress", "resolved"],
      default: "new",
    },

    source: {
      type: String,
      default: "contact_form",
    },
  },
  { timestamps: true }
);

const Inquiry = model("Inquiry", inquirySchema);

export default Inquiry;