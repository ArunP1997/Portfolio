import React, { useState, useEffect, useRef } from "react";
import { FaBug, FaCode } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import ContactPopup from "../Components/ContactPopup";
import FloatingContactButton from "../Components/FloatingContactButton";

// =======================
// UPDATED PROJECT DATA
// =======================

const qaProjects = [
  {
    title: "Fitness Streaming Platform (Web, Android & iOS)",
    type: "QA",
    desc: "Studio SWEAT onDemand is a subscription-based fitness platform.",
    details:
      "Studio Sweat OnDemand is a fitness streaming platform offering live and on-demand workout videos across web, Android, and iOS. The platform includes subscription management, workout scheduling, video playback, user accounts, and in-app purchases. Your role was to ensure the product delivers a bug-free, smooth, and high-performance experience across all devices.",
    role: "QA Engineer – Manual Testing (Web, Android, iOS)",
    responsibility: [
      "Executed end-to-end manual testing across web, Android, and iOS applications.",
      "Designed test cases, test data, and test scenarios for functional and regression testing.",
      "Verified UI/UX consistency across platforms and ensured mobile responsiveness and usability."
    ],
    frameworks: ["Regression Testing", "Smoke / Sanity Testing", "Subscription Flow & Payment Testing"],
    skills: ["Cross-platform testing (web + mobile)", "Regression & sanity testing","Video Playback & Streaming Testing", "UI/UX validation"],
    imgs: ["/SSODhome.png", "/ssod feedback.png"],
  },
  {
    title: "Community Tax (Android & iOS)",
    type: "QA",
    desc: "Community Tax application (login, payments, document-upload)",
    details:
      "Community Tax is a client-portal app from a tax-service provider. It lets users manage their tax-related services: track service status, upload documents, sign documents in-app, view payment schedules, manage payment methods, schedule appointments with their dedicated service team, and get real-time updates and offers.",
    role: "QA Engineer (Cross-Platform: Android, iOS)",
    responsibility: [
      "Tested functional flows: user login / registration, document upload & signing, payment and billing workflows, appointment scheduling, in-app notifications, status updates, and navigation flows.",
      "Conducted cross-platform compatibility testing, ensuring features and behavior match across Web, Android, and iOS.",
      "Reduced regression cycle from 3 days to 1 hour"
    ],
    frameworks: ["Functional Testing", "Regression Testing", "Document Upload & E-Signature Testing","Notification & Status Update Testing"],
    skills: ["Bug reporting & defect tracking", "Functional workflow testing (payments, uploads, scheduling, notifications)", "Cross-device compatibility testing"],
    imgs: ["/Ctaxhome.jpeg", "/Ctaxsign.jpeg"],
  },
  {
    title: "inHarmony (Android & iOS)",
    type: "QA",
    desc: "A mindfulness and sound-therapy app offering vibration-enhanced meditation sessions and holistic relaxation tools.",
    details:
      "inHarmony — a wellness & mindfulness platform / e-commerce site offering vibroacoustic therapy products, sound- and vibration-based relaxation tools, and meditation content.",
    role: "QA Engineer – Manual & Automation Testing (iOS & Android)",
    responsibility: [
      "Executed end-to-end manual and automated tests across iOS and Android platforms.",
      "Developed and maintained mobile automation scripts to streamline repetitive test flows.",
      "Implemented automated regression workflow for releases"
    ],
    frameworks: ["Automation Testing (Mobile UI)", "Navigation & Workflow Testing", "Regression Testing (manual + automated)","Playwright"],
    skills: ["Test script creation & maintenance", "Exploratory testing", "UI automation for repetitive flows"],
    imgs: ["/IHhome.png", "/IHfeedback.png"],
  },
];

const devProjects = [
  {
    title: "MEeat",
    desc: "Dine-matching & experience app.",
    type: "DEV",
    details:
      "MEeat is a social dining and food-delivery prototype built using the MEVN stack (MongoDB planned, Express, Vue, Node). Users can create and join dining events, track routes, view restaurants on maps, and order together.",
    role: "Frontend-Focused Full-Stack Developer",
    responsibility: [
      "Implemented core app features including login/register, account management, and map-based location logic",
      "Integrated Vue.js frontend with a Node/Express backend, improving data handling and security by removing 100% of sensitive user data from session storage.",
      "Built and refined 15+ UI components, fixed major UX issues, and resolved frontend/backend bugs to boost overall app stability by 40%."
    ],
    frameworks: ["Vue.js", "JavaScript (ES6)", "Node.js", "Express.js", "Dummy JSON Server"],
    skills: [
      "Authentication & validation",
      "Git/GitHub",
      "State management",
      "Geolocation & map interactions",
    ],
    imgs: ["/home.png", "/Scheduleorder.png", "/register.png"],
  },
  {
    title: "Hotel Management System",
    type: "DEV",
    desc: "Managing, Booking hotel operations.",
    details:
      "A full-stack system to manage hotel operations: bookings, check-in, billing, room inventory, staff dashboards, and workflow automation.",
    role: "Full-Stack Developer",
    responsibility: [
      "Developed core booking, check-in/out, and room management features, enabling smooth hotel operations.",
      "Built and refined UI forms and validation flows, ensuring a clean and user-friendly admin experience."
    ],
    frameworks: ["React.js", "Node.js", "MySQL", "REST APIs"],
    skills: ["Guest management", "Authentication/Authorization", "Database handling"],
    imgs: ["/sdphome.png", "/sdplogin.png", "/sdpservices.png"],
  },
  {
    title: "Train Tracking System",
    type: "DEV",
    desc: "Real-time train graph mapping.",
    details:
      "A multi-database train tracking platform using MongoDB, Redis, and Neo4j. Includes fare calculation, optimal routing, analytics, and seat reservation.",
    role: "Backend Developer",
    responsibility: [
      "Built the Statistics Dashboard integrating MongoDB + Neo4j, powering 100% of project analytics.",
      "Designed 3+ database models and 10+ aggregation/Cypher queries for real-time metrics",
      "Developed UI dashboards visualizing train delays, traffic trends, and route insights."
    ],
    frameworks: ["Neo4j", "MongoDB", "Python", "Flask / FastAPI"],
    skills: [
      "Backend API development",
      "Data analytics",
      "Graph queries (Neo4j)",
      "MongoDB modeling",
    ],
    imgs: ["/bloom-visualisation.png", "/snippets.png"],
  },
];

// =======================================
// AUTO SLIDER
// =======================================

const AutoSlider = ({ items }) => {
  const [index, setIndex] = useState(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % items.length), 4000);
    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    if (wrapperRef.current)
      wrapperRef.current.style.transform = `translateX(-${index * 100}%)`;
  }, [index]);

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={wrapperRef}
        className="flex transition-transform duration-700"
        style={{ width: `${items.length * 100}%` }}
      >
        {items.map((node, i) => (
          <div key={i} className="w-full flex-shrink-0">
            {node}
          </div>
        ))}
      </div>
    </div>
  );
};

// =======================================
// PROJECT MODAL
// =======================================

const ProjectModal = ({ project, onClose }) => {
  const [showImageZoom, setShowImageZoom] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  // Always place hooks BEFORE conditional returns
  const images = project?.imgs || [];

  const nextImage = () => setImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    if (!project || showImageZoom || images.length === 0) return;
    const interval = setInterval(nextImage, 2500);
    return () => clearInterval(interval);
  }, [project, showImageZoom, images.length]);

  // NOW safe to return conditionally
  if (!project) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]"
        onClick={onClose}
      >
        {/* MODAL */}
        <div
          className="relative bg-white/95 backdrop-blur-xl border border-gray-200
          rounded-2xl shadow-2xl p-8 w-[92%] max-w-4xl max-h-[92vh] overflow-y-auto
          animate-fadeScale"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
          >
            <AiOutlineClose size={26} />
          </button>

          {/* IMAGE SLIDER */}
          <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg">
            <div
              className="flex transition-transform duration-700"
              style={{ transform: `translateX(-${imageIndex * 100}%)` }}
            >
              {images.map((src, i) => (
                <div key={i} className="min-w-full">
                  <img
                    src={src}
                    alt="slide"
                    className="w-full h-64 object-cover cursor-pointer hover:brightness-105"
                    onClick={() => setShowImageZoom(true)}
                  />
                </div>
              ))}
            </div>

            {/* Slider Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md text-black"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow-md text-black"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* TITLE */}
          <h2 className="text-3xl font-semibold text-gray-900 mb-3">
            {project.title}
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            {project.details}
          </p>

          {/* DIVIDER */}
          <div className="h-[1px] w-full bg-gray-200 mb-6"></div>

          {/* CONTENT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* LEFT */}
            <div>
              <p className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                Role
              </p>
              <p className="text-gray-700 text-sm mt-2">{project.role}</p>

              <p className="font-semibold text-gray-900 text-sm uppercase tracking-wide mt-6">
                Responsibilities
              </p>
              <ul className="list-disc list-inside text-gray-700 text-sm mt-2 space-y-2">
                {(
                  Array.isArray(project.responsibility)
                    ? project.responsibility
                    : [project.responsibility]
                ).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* RIGHT */}
            <div>
              <p className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                {project.type === "DEV" ? "Frameworks" : "Testing / Tools Used"}
              </p>
              <ul className="list-disc list-inside text-gray-700 text-sm mt-2 space-y-2">
                {project.frameworks.map((fw, i) => (
                  <li key={i}>{fw}</li>
                ))}
              </ul>

              <p className="font-semibold text-gray-900 text-sm uppercase tracking-wide mt-6">
                Skills
              </p>
              <ul className="list-disc list-inside text-gray-700 text-sm mt-2 space-y-2">
                {project.skills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE ZOOM */}
      {showImageZoom && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[110]"
          onClick={() => setShowImageZoom(false)}
        >
          <div
            className="relative max-w-[1300px] w-[95%]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowImageZoom(false)}
              className="absolute -top-12 right-0 text-white text-3xl"
            >
              ✕
            </button>

            <img
              src={images[imageIndex]}
              className="w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-0 -translate-y-1/2 bg-black/60 text-white p-4 rounded-r-xl"
                >
                  ‹
                </button>
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-0 -translate-y-1/2 bg-black/60 text-white p-4 rounded-l-xl"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Animation */}
      <style>{`
        @keyframes fadeScale {
          0% { opacity: 0; transform: scale(0.92); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fadeScale {
          animation: fadeScale 0.25s ease-out;
        }
      `}</style>
    </>
  );
};

// =======================================
// MAIN PAGE
// =======================================

const Projects = () => {
  const [active, setActive] = useState("QA");
  const displayed = active === "QA" ? qaProjects : devProjects;

  const [selectedProject, setSelectedProject] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="w-full text-yellow-300 pt-10 px-4 lg:px-10 relative pb-28 lg:pb-0">

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <div className="text-left mb-8 lg:mb-16 px-4 lg:px-32">
        <h1 className="text-4xl lg:text-6xl font-light tracking-tight">Projects</h1>
      </div>

      {/* ===== MOBILE TOP TABS (QA / DEV) ===== */}
        <div className="lg:hidden flex justify-center mb-8">
          <div className="flex border border-black/30 rounded-lg overflow-hidden bg-[#d8d0be] text-black">
            <button
              onClick={() => setActive("QA")}
              className={`px-6 py-2 text-sm font-medium transition ${
                active === "QA" ?  "text-black/70" : "bg-black text-white"
              }`}
            >
              QA
            </button>

            <button
              onClick={() => setActive("DEV")}
              className={`px-6 py-2 text-sm font-medium transition ${
                active === "DEV" ? "text-black/70" : "bg-black text-white"
              }`}
            >
              DEV
            </button>
          </div>
        </div>


      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-20 items-stretch">

        {/* ========== HERO + MINI CARDS ========== */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* HERO CARD */}
          <div
            onClick={() => setSelectedProject(displayed[0])}
            className="cursor-pointer bg-[#d8d0be] text-black rounded-xl overflow-hidden group hover:scale-[1.02] transition-transform"
          >
            <div className="overflow-hidden">
              <img
                src={displayed[0].imgs[0]}
                alt="thumbnail"
                className="w-full h-56 object-cover rounded-t-xl shadow-md group-hover:brightness-110"
              />
            </div>

            <div className="p-6 h-24">
              <AutoSlider
                items={[
                  <div>
                    <h2 className="text-xl font-semibold">{displayed[0].title}</h2>
                    <p className="mt-2 text-sm text-black/70 font-semibold">{displayed[0].desc}</p>
                  </div>,
                  <div className="text-sm text-black/70 font-semibold">
                    {displayed[0].frameworks.join(" • ")}
                  </div>,
                  <div className="text-sm text-black/70 font-semibold">
                    {displayed[0].skills.join(" • ")}
                  </div>,
                  <div className="text-sm text-black/70 font-semibold">{displayed[0].role}</div>,
                ]}
              />
            </div>
          </div>

          {/* SMALL CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayed.slice(1).map((proj, i) => (
              <div
                key={i}
                onClick={() => setSelectedProject(proj)}
                className="cursor-pointer bg-[#d8d0be] text-black rounded-xl overflow-hidden group hover:scale-[1.02]"
              >
                <div className="overflow-hidden">
                  <img
                    src={proj.imgs[0]}
                    className="w-full h-32 object-cover rounded-t-xl shadow-md group-hover:brightness-110"
                  />
                </div>

                <div className="p-4 h-20">
                  <AutoSlider
                    items={[
                      <div>
                        <h2 className="text-lg font-semibold">{proj.title}</h2>
                        <p className="mt-2 text-sm text-black/70 font-semibold">{proj.desc}</p>
                      </div>,
                      <div className="text-sm text-black/70 font-semibold">
                        {proj.frameworks.join(" • ")}
                      </div>,
                      <div className="text-sm text-black/70 font-semibold">
                        {proj.skills.join(" • ")}
                      </div>,
                      <div className="text-sm text-black/70 font-semibold">{proj.role}</div>,
                    ]}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============= RIGHT LIST PANEL ============= */}
        <div className="hidden lg:flex relative bg-[#d8d0be] text-black rounded-xl p-6 flex-col h-full overflow-hidden">

          <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none">
            {active === "QA" ? (
              <FaBug className="text-black text-[480px]" />
            ) : (
              <FaCode className="text-black text-[480px]" />
            )}
          </div>

          {/* Tabs */}
          <div className="flex mb-4 border-b border-black/30 pb-3 relative z-10">
            <button
              className={`mr-6 pb-1 text-lg ${
                active === "QA" ? "border-b-2 border-black font-bold" : "text-black/60"
              }`}
              onClick={() => setActive("QA")}
            >
              QA
            </button>

            <button
              className={`pb-1 text-lg ${
                active === "DEV" ? "border-b-2 border-black font-bold" : "text-black/60"
              }`}
              onClick={() => setActive("DEV")}
            >
              DEV
            </button>
          </div>

          {/* List */}
          <div className="space-y-6 mt-2 relative z-10">
            {displayed.map((proj, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedProject(proj)}
                className="border-b border-black/30 pb-3 cursor-pointer hover:scale-[1.01]"
              >
                <p className="font-semibold text-lg">{proj.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FloatingContactButton onClick={() => setShowPopup(true)} />
      <ContactPopup show={showPopup} onClose={() => setShowPopup(false)} />
    </div>
  );
};

export default Projects;