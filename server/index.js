import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import connectDB from "./db.js";
import { checkJWT } from "./middleware/jwt.js";
import { postSignUp, postLogin, updateUser } from "./controllers/auth.js";
import { getHome, getHealth } from "./controllers/health.js";
import { getAbout } from "./controllers/about.js";
import { createRoomRequest, getRoomRequests, updateRoomRequestStatus, getRooms } from "./controllers/roomRequest.js";
import { createComplaint, getComplaints, updateComplaintStatus } from "./controllers/complaint.js";
import ImageKit from "@imagekit/nodejs";

import { addReview, getReview, updateReview, deleteReview } from "./controllers/review.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

const PORT = process.env.PORT || 8080;

app.get("/health", getHealth)
app.get("/", getHome)
app.get("/api/about", getAbout)

app.get('/auth', function (req, res) {
  const { token, expire, signature } = client.helper.getAuthenticationParameters();
  res.send({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY });
});

app.post("/signup", postSignUp)
app.post("/login", postLogin)

app.post("/api/room-requests", checkJWT, createRoomRequest)
app.get("/api/room-requests", checkJWT, getRoomRequests)
app.patch("/api/room-requests/:id/status", checkJWT, updateRoomRequestStatus)
app.get("/api/rooms", checkJWT, getRooms)

app.post("/api/complaints", checkJWT, createComplaint)
app.get("/api/complaints", checkJWT, getComplaints)
app.patch("/api/complaints/:id/status", checkJWT, updateComplaintStatus)

app.put("/profile", checkJWT, updateUser);




app.post("/api/reviews", addReview);
app.get("/api/reviews", getReview);
app.put("/api/reviews/:id", updateReview);
app.delete("/api/reviews/:id", deleteReview);

const fetchRooms = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/rooms`,
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );

    console.log("ROOMS DATA 👉", res.data); // 👈 ADD THIS

    setRooms(res.data.data || []);
  } catch (err) {
    console.error(err);
    toast.error("Unable to load rooms");
  }
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB()
});
