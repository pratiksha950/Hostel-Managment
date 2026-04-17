import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Eye,
  CheckCircle,
  Star,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/about");
        setAboutData(res.data);
      } catch {
        setError("Failed to load about data");
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Error</h2>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  const features = [
    { icon: Users, title: "Collaboration", desc: "Work with teams in real time." },
    { icon: Target, title: "Goal Tracking", desc: "Track progress with clarity." },
    { icon: CheckCircle, title: "Task System", desc: "Organize work efficiently." },
    { icon: Star, title: "Insights", desc: "Understand productivity better." },
  ];

  return (
    <div className="bg-white text-gray-900">

      {/* HERO */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-28 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold"
          >
            About {aboutData?.projectName || "Our Platform"}
          </motion.h1>

          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            {aboutData?.tagline ||
              "A modern platform designed to help teams build, collaborate, and grow faster."}
          </p>

          <button className="mt-8 bg-white text-indigo-700 px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
            Get Started <ArrowRight className="inline w-4 h-4 ml-2" />
          </button>
        </div>
      </section>

      {/* STORY */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-bold mb-4">The Problem</h2>
          <p className="text-gray-600 leading-relaxed">
            {aboutData?.problem ||
              "Teams struggle with scattered tools, poor communication, and slow workflows."}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Our Solution</h2>
          <p className="text-gray-600 leading-relaxed">
            {aboutData?.solution ||
              "We unify collaboration, tasks, and analytics into one clean platform."}
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">What We Offer</h2>

          <div className="grid md:grid-cols-4 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl border hover:shadow-md transition"
                >
                  <Icon className="w-6 h-6 text-indigo-600 mx-auto" />
                  <h3 className="mt-4 font-semibold">{f.title}</h3>
                  <p className="text-sm text-gray-500 mt-2">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MISSION + VISION */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10">
        <div className="p-6 border rounded-xl">
          <Target className="text-indigo-600" />
          <h3 className="text-xl font-bold mt-3">Mission</h3>
          <p className="text-gray-600 mt-2">
            {aboutData?.mission ||
              "Empower teams with simple and powerful tools."}
          </p>
        </div>

        <div className="p-6 border rounded-xl">
          <Eye className="text-purple-600" />
          <h3 className="text-xl font-bold mt-3">Vision</h3>
          <p className="text-gray-600 mt-2">
            {aboutData?.vision ||
              "To become the most trusted collaboration platform."}
          </p>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Meet the Team</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {aboutData?.team?.map((m, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl border hover:shadow-md transition"
              >
                <div className="w-14 h-14 mx-auto bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                  {m.name?.charAt(0)}
                </div>
                <h3 className="mt-4 font-semibold">{m.name}</h3>
                <p className="text-indigo-600 text-sm">{m.role}</p>
                <p className="text-gray-500 text-sm mt-2">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white py-12 mt-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg">
              {aboutData?.projectName || "Platform"}
            </h3>
            <p className="text-gray-400 mt-2">
              {aboutData?.description || "Modern team collaboration tool."}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <div className="space-y-2 text-gray-400">
              <p className="flex items-center gap-2">
                <Mail size={16} /> email@domain.com
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} /> +91 00000 00000
              </p>
              <p className="flex items-center gap-2">
                <MapPin size={16} /> India
              </p>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 mt-10 text-sm">
          © {new Date().getFullYear()} All rights reserved
        </div>
      </footer>
    </div>
  );
};

export default About;