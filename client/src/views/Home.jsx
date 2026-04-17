"use client";
import { SplineScene } from "../components/ui/Spline";
import { Spotlight } from "../components/ui/Spotlight";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { MessageSquareWarning } from "lucide-react";

import {
  Users,

  ClipboardList,
  ShieldCheck
} from "lucide-react";


import Footer from "../components/Footer";


const FeatureCard = ({
  icon: Icon,
  title,
  desc
}) => {
  return (

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="
      bg-white/5
      backdrop-blur-lg
      border border-purple-500/20
      rounded-xl
      p-6
      text-center
      shadow-xl"
    >

      <Icon
        className="
        mx-auto
        mb-4
        text-purple-400"
        size={40}
      />

      <h3
        className="
        text-xl
        font-semibold
        text-white"
      >
        {title}
      </h3>

      <p
        className="
        text-gray-400
        mt-2"
      >
        {desc}
      </p>

    </motion.div>

  );
};


/* =========================
   MAIN HOME
========================= */

function Home() {

  return (

    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-gray-900
      via-gray-800
      to-gray-700
      text-white
      overflow-hidden"
    >

      {/* NAVBAR */}
      <Navbar />

      {/* ================= HERO ================= */}

      <section
        className="
        relative
        w-full
        h-screen"
      >

        {/* Spotlight Effect */}

        <Spotlight
          className="
          -top-40
          left-0
          md:left-60
          md:-top-20"
        />

        <div
          className="
          grid
          md:grid-cols-2
          h-full"
        >

          {/* LEFT SIDE */}

          <div
            className="
            flex
            flex-col
            justify-center
            px-10
            z-10"
          >

            <motion.h1
              initial={{
                opacity: 0,
                y: 40
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 1
              }}
              className="
              text-5xl
              md:text-6xl
              font-bold
              bg-gradient-to-b
              from-purple-300
              to-white
              bg-clip-text
              text-transparent"
            >

              Smart Hostel
              <br />
              Management System

            </motion.h1>

            <motion.p
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 0.5
              }}
              className="
              mt-6
              text-lg
              text-gray-400
              max-w-lg"
            >

              Manage hostel operations efficiently
              with smart room allocation,
              student management,
              and real-time availability tracking.

            </motion.p>

            

          </div>

          {/* RIGHT SIDE 3D */}

          <div
            className="
            relative
            w-full
            h-full"
          >

            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section
        className="
        py-20
        px-10
        bg-gradient-to-b
        from-gray-700
        to-gray-800"
      >

        <motion.h2
          initial={{
            opacity: 0
          }}
          whileInView={{
            opacity: 1
          }}
          className="
          text-4xl
          font-bold
          text-center
          mb-14"
        >

          Smart Hostel Features

        </motion.h2>

        <div
          className="
          grid
          md:grid-cols-4
          gap-8"
        >

          <FeatureCard
            icon={ Users}
            title="Student Management"
            desc="Manage student records, profiles, and hostel entries efficiently."
          />

      

          
          <FeatureCard
            icon={ClipboardList}
            title="Attendance Tracking"
            desc="Monitor student attendance and generate reports."
          />

          <FeatureCard
            icon={ShieldCheck}
            title="Security & Safety"
            desc="Maintain visitor logs and ensure hostel security."
          />

          <FeatureCard
  icon={MessageSquareWarning}
  title="Complaint System"
  desc="Students can submit complaints and track their resolution status easily."
/>

        </div>

      </section>

      {/* ================= DEMO CARD ================= */}

      <section
        className="
        px-10
        pb-20"
      >

    

      </section>
      <Footer />

    </div>

  );

}

export default Home;