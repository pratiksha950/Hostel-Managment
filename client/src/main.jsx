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

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/warden-dashboard" element={<WardenDashboard />} />
    </Routes>
  </BrowserRouter>
);
