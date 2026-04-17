import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema(
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
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Suggestion = mongoose.model("Suggestion", suggestionSchema);
export default Suggestion;