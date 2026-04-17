import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Profile from "./views/Profile";
import About from "./views/About";
import StudentDashboard from "./views/StudentDashboard";
import WardenDashboard from "./views/WardenDashboard";
import RoomRent from "./views/BookRoom";
import Complaints from "./views/student/Complaints";
import ManageApplications from "./views/ManageApplications";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/student/complaints" element={<Complaints />} />
      <Route path="/warden-dashboard" element={<WardenDashboard />} />

      <Route path="/room-rent" element={<RoomRent />} />
      <Route path="/manage-applications" element={<ManageApplications />} />
    </Routes>
  </BrowserRouter>
);
