// src/pages/Home.jsx
import React, { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import heroImg from "../assets/hero.jpg";
import activitiesImg from "../assets/SchoolActivities.jpg";
import teachersPhoto from "../assets/teachers-group.jpg";

/**
 * Lazy-load the Chatbot so any problems inside the Chatbot (missing package, runtime error)
 * won't break the whole page. If Chatbot fails to load, the page still works.
 */
const Chatbot = lazy(() => import("../components/Chatbot"));

export default function Home() {
  return (
    <section className="bg-background">
      {/* Hero Section */}
      <div className="container mx-auto py-16 flex flex-col items-center text-center px-3">
        <motion.h1
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="font-extrabold text-4xl md:text-5xl text-primary mb-4"
        >
          Welcome to Gaushala Public School
        </motion.h1>
        <p className="text-xl text-secondary mb-8 font-semibold">Nurturing Young Minds for a Bright Tomorrow</p>
        <img
          src={heroImg}
          alt="Happy students"
          className="rounded-xl shadow-lg mb-8 w-full max-w-2xl border-4 border-primary"
        />
        <div className="space-x-4">
          <a
            href="/admissions"
            className="bg-accent text-white rounded px-6 py-3 font-bold shadow-lg hover:bg-primary hover:text-white transition"
          >
            Apply Now
          </a>
          <a
            href="/about"
            className="bg-secondary text-white rounded px-6 py-3 font-bold hover:bg-accent transition"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Mission and Quick Facts */}
      <div className="container mx-auto my-12 flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-primary mb-3">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Empowering children to discover, grow, and thrive academically and personally in a caring, creative environment.
          </p>
          <ul className="text-left space-y-2">
            <li>• Inclusive, joyful classrooms</li>
            <li>• Experiential learning methods</li>
            <li>• Focus on well-being & values</li>
          </ul>
        </div>
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-3">
            <div><strong className="text-accent text-3xl">450+</strong> Happy Students</div>
            <div><strong className="text-primary text-3xl">30+</strong> Experienced Teachers</div>
            <div><strong className="text-secondary text-3xl">12</strong> Modern Classrooms</div>
            <div><strong className="text-accent text-3xl">95%</strong> Parent Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Teachers Intro */}
      <div className="container mx-auto my-12 text-center">
        <h2 className="text-2xl font-bold text-accent mb-4">Meet Our Caring Teachers</h2>
        <img
          src={teachersPhoto}
          alt="Gaushala Public School Teachers"
          className="mx-auto rounded-full shadow-lg w-36 h-36 object-cover mb-4 border-4 border-accent"
        />
        <p className="text-gray-700 max-w-2xl mx-auto">
          Our faculty blend knowledge, compassion, and creativity so your child flourishes every day. <a href="/about#teachers" className="text-primary font-bold hover:underline">Meet All Teachers</a>
        </p>
      </div>

      {/* Activities/Facilities Spotlight */}
      <div className="container mx-auto my-16 flex flex-col md:flex-row gap-10 items-center bg-white rounded-xl shadow-lg p-8">
        <img
          src={activitiesImg}
          alt="School Activities"
          className="w-full md:w-1/2 rounded-lg object-cover border-4 border-primary"
        />
        <div className="flex-1 md:pl-12">
          <h2 className="text-2xl font-bold text-primary mb-3">Learning Beyond the Classroom</h2>
          <ul className="text-gray-700 space-y-2 text-left">
            <li>🎨 Spacious art & craft studios</li>
            <li>⚽ Big playground for games & sports</li>
            <li>🎶 Music, dance, yoga sessions</li>
            <li>💻 Modern computer lab & smart classes</li>
            <li>🌳 Green campus with adventure zone</li>
            <li>🚌 Safe bus transport</li>
          </ul>
        </div>
      </div>

      {/* Awards/Badges */}
      <div className="container mx-auto my-14 flex flex-wrap justify-center gap-4">
        <div className="bg-primary text-white px-6 py-3 rounded-full shadow font-bold">Best Primary School 2024</div>
        <div className="bg-accent text-white px-6 py-3 rounded-full shadow font-bold">ISO 9001:2015 Certified</div>
        <div className="bg-secondary text-white px-6 py-3 rounded-full shadow font-bold">Top Parent Choice</div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto text-center my-16">
        <h2 className="text-3xl font-extrabold text-accent mb-4">Ready to Join the GPS Family?</h2>
        <a
          href="/admissions"
          className="bg-primary text-white px-8 py-4 rounded-lg font-bold text-xl hover:bg-accent transition"
        >
          Start Your Application Now
        </a>
      </div>

      {/* Chatbot widget (lazy-loaded so it can't break the page) */}
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </section>
  );
}
