import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import connectDB from "./db.js";
import { checkJWT } from "./middleware/jwt.js";
import { postSignUp, postLogin } from "./controllers/auth.js";
import { getHome, getHealth } from "./controllers/health.js";
import { getAbout } from "./controllers/about.js";
import { updateUser } from "./controllers/auth.js";
import ImageKit from "@imagekit/nodejs";
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

app.post("/Signup", postSignUp)
app.post("/login", postLogin)

app.put("/profile", checkJWT, updateUser);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB()
});
