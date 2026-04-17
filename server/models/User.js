import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: Number,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    whatsappNumber: {
        type: Number,
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
        default: [],
    },
    role: {
        type: String,
        enum: ["student", "warden"],
        default: "student",
    },

}, { timestamps: true })

const User = model("User", userSchema);

export default User