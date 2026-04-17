import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

import {
  Users,
  Home,
  ClipboardList,
  MessageSquareWarning,
  CheckCircle,
  Star,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ShaderBackground from '../components/ui/shader-background';

const About = () => {

  const [reviews, setReviews] = useState([]);

  const [reviewForm, setReviewForm] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
    role: "",
    company: ""
  });

  /* ================= FETCH REVIEWS ================= */

  useEffect(() => {

    const fetchReviews = async () => {

      try {

        const res = await axios.get(
          "http://localhost:8080/api/reviews"
        );

        if (res.data.success) {
          setReviews(res.data.data);
        }

      } catch (err) {

        console.log("Review fetch failed");

      }

    };

    fetchReviews();

  }, []);

  /* ================= FORM HANDLER ================= */

  const handleChange = (e) => {

    setReviewForm({
      ...reviewForm,
      [e.target.name]: e.target.value
    });

  };

  /* ================= SUBMIT REVIEW ================= */

  const submitReview = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:8080/api/reviews",
        reviewForm
      );

      alert("Review Submitted Successfully ✅");

      // Reload Reviews
      const res = await axios.get(
        "http://localhost:8080/api/reviews"
      );

      if (res.data.success) {
        setReviews(res.data.data);
      }

      // Reset Form
      setReviewForm({
        name: "",
        email: "",
        message: "",
        rating: 5,
        role: "",
        company: ""
      });

    } catch (err) {

      alert("Failed to submit review ❌");

    }

  };

  /* ================= FEATURES ================= */

  const features = [

    {
      icon: <Users className="w-8 h-8" />,
      title: "Student Management",
      description:
        "Maintain student records and hostel profiles efficiently."
    },

    {
      icon: <Home className="w-8 h-8" />,
      title: "Room Allocation",
      description:
        "Assign rooms and track availability in real-time."
    },

    {
      icon: <ClipboardList className="w-8 h-8" />,
      title: "Attendance Tracking",
      description:
        "Monitor daily attendance of hostel students."
    },

    {
      icon: <MessageSquareWarning className="w-8 h-8" />,
      title: "Complaint System",
      description:
        "Students can submit complaints easily."
    }

  ];

  /* ================= TEAM ================= */

  const teamMembers = [

    {
      name: "Pratik Salunke",
      role: "Frontend Developer",
      bio:
        "Designed responsive UI for hostel management."
    },

    {
      name: "Pratiksha Salunke",
      role: "Backend Developer",
      bio:
        "Developed APIs and handled backend logic."
    },

    {
      name: "Pranjali Ubale",
      role: "Database Manager",
      bio:
        "Managed hostel database and records."
    },

    {
      name: "Abhishek Kumavat",
      role: "System Analyst",
      bio:
        "Analyzed system workflow and testing."
    }

  ];

  /* ================= WHY CHOOSE ================= */

  const whyChooseUs = [

    "Easy student and room management",
    "Secure hostel data storage",
    "Real-time room availability",
    "Quick complaint resolution",
    "User-friendly dashboard",
    "Reliable system"

  ];

  return (

    <>
      <Navbar />
      <ShaderBackground />

      <div className="min-h-screen text-[#e8f7ff]">

        {/* HERO */}

        <section className="py-24 px-6 max-w-7xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >

            <h1 className="text-5xl font-bold">
              Smart Hostel Management System
            </h1>

            <p className="mt-6 text-lg text-[#b9d6ff]">

              Our hostel provides secure and comfortable
              accommodation with modern facilities.

            </p>

          </motion.div>

        </section>

        {/* HOSTEL INFO */}

        <section className="py-20 px-6 max-w-7xl mx-auto">

          <h2 className="text-3xl font-bold mb-6">
            About Our Hostel
          </h2>

          <p className="text-[#b9d6ff]">

            Our hostel provides safe and secure accommodation
            for students with clean rooms, Wi-Fi, food,
            and study-friendly environment.

          </p>

          <ul className="mt-4 list-disc list-inside text-[#b9d6ff]">

            <li>24/7 Security</li>
            <li>Wi-Fi Facility</li>
            <li>Mess Facility</li>
            <li>Clean Drinking Water</li>
            <li>Regular Cleaning</li>

          </ul>

        </section>

        {/* FEATURES */}

        <section className="py-20 px-6 max-w-7xl mx-auto">

          <h2 className="text-3xl font-bold text-center mb-12">
            Hostel Features
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {features.map((feature, index) => (

              <div
                key={index}
                className="p-6 border rounded-xl bg-[#06101c]"
              >

                {feature.icon}

                <h3 className="mt-4 font-semibold">
                  {feature.title}
                </h3>

                <p className="text-sm mt-2 text-[#b9d6ff]">
                  {feature.description}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* TEAM */}

        <section className="py-20 px-6 max-w-7xl mx-auto">

          <h2 className="text-3xl font-bold text-center mb-12">
            Our Team
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {teamMembers.map((member, index) => (

              <div
                key={index}
                className="p-6 border rounded-xl bg-[#06101c]"
              >

                <h3 className="font-semibold">
                  {member.name}
                </h3>

                <p className="text-cyan-300">
                  {member.role}
                </p>

                <p className="mt-2 text-sm text-[#b9d6ff]">
                  {member.bio}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* WHY CHOOSE */}

        <section className="py-20 px-6 max-w-7xl mx-auto">

          <h2 className="text-3xl font-bold mb-8">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {whyChooseUs.map((reason, index) => (

              <div
                key={index}
                className="flex items-center gap-3"
              >

                <CheckCircle className="w-5 h-5 text-cyan-400" />

                {reason}

              </div>

            ))}

          </div>

        </section>

        {/* ================= REVIEW FORM ================= */}

        <section className="py-20 px-6 max-w-7xl mx-auto">

          <h2 className="text-3xl font-bold text-center mb-12">
            Student Reviews
          </h2>

          {/* FORM */}

          <form
            onSubmit={submitReview}
            className="mb-16 grid md:grid-cols-2 gap-6"
          >

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={reviewForm.name}
              onChange={handleChange}
              required
              className="p-3 rounded bg-[#06101c] border"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={reviewForm.email}
              onChange={handleChange}
              required
              className="p-3 rounded bg-[#06101c] border"
            />

            <input
              type="text"
              name="role"
              placeholder="Role"
              value={reviewForm.role}
              onChange={handleChange}
              className="p-3 rounded bg-[#06101c] border"
            />

            <input
              type="text"
              name="company"
              placeholder="College"
              value={reviewForm.company}
              onChange={handleChange}
              className="p-3 rounded bg-[#06101c] border"
            />

            <select
              name="rating"
              value={reviewForm.rating}
              onChange={handleChange}
              className="p-3 rounded bg-[#06101c] border"
            >
              <option value="5">⭐⭐⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="2">⭐⭐</option>
              <option value="1">⭐</option>
            </select>

            <textarea
              name="message"
              placeholder="Write your review..."
              value={reviewForm.message}
              onChange={handleChange}
              required
              rows="4"
              className="p-3 rounded bg-[#06101c] border md:col-span-2"
            />

            <button
              type="submit"
              className="bg-cyan-500 px-6 py-3 rounded md:col-span-2"
            >
              Submit Review
            </button>

          </form>

          {/* DISPLAY REVIEWS */}

          <div className="grid md:grid-cols-3 gap-6">

            {reviews.map((review, index) => (

              <div
                key={index}
                className="p-6 border rounded-xl bg-[#06101c]"
              >

                <div className="flex gap-1 mb-2">

                  {[...Array(review.rating)].map((_, i) => (

                    <Star
                      key={i}
                      className="w-4 h-4 text-cyan-400"
                    />

                  ))}

                </div>

                <p className="text-[#b9d6ff]">
                  {review.message}
                </p>

                <p className="mt-4 font-semibold">
                  {review.name}
                </p>

                <p className="text-sm text-cyan-300">
                  {review.role}
                </p>

              </div>

            ))}

          </div>

        </section>

        {/* FOOTER */}

        <footer className="border-t border-slate-800 py-12 px-6">

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <h3 className="text-xl font-semibold">
                Hostel Management System
              </h3>

              <p className="mt-4 text-[#b9d6ff]">
                Smart hostel system for modern students.
              </p>

            </div>

            <div>

              <h4>Contact</h4>

              <p className="flex gap-2 items-center">
                <Mail size={16} />
                hostel@gmail.com
              </p>

              <p className="flex gap-2 items-center">
                <Phone size={16} />
                +91 9876543210
              </p>

              <p className="flex gap-2 items-center">
                <MapPin size={16} />
                At-Amalner, Post-Ambi, Tal-Rahuri,
                Dist-A. Nagar, PinCode-413715
              </p>

            </div>

          </div>

        </footer>

      </div>

      <Footer />

    </>
  );

};

export default About;