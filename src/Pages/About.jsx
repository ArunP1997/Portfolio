import React, { useState } from "react";
import ContactPopup from "../Components/ContactPopup";
import FloatingContactButton from "../Components/FloatingContactButton";

// Animation styles injected into component
const style = `
@keyframes fillBar {
  from { width: 0%; }
  to { width: var(--fill-width); }
}
.animate-fill {
  animation: fillBar 1.4s ease-out forwards;
}

/* Subtle fade-in */
@keyframes subtleFade {
  from { opacity: 0.4; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.logo-fade {
  animation: subtleFade 0.6s ease-out forwards;
}

/* Pulse animation */
@keyframes pulseSoft {
  0% { transform: scale(1); }
  50% { transform: scale(1.07); }
  100% { transform: scale(1); }
}
.logo-pulse {
  animation: pulseSoft 2.4s ease-in-out infinite;
}

/* Hover glow */
.logo-hover:hover {
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.45));
  transform: scale(1.15);
}

/* Tooltip bubble */
.skill-bubble {
  position: absolute;
  top: -42px;
  background: #cdb94d;
  color: #111;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  animation: fadeInBubble 0.5s ease-out forwards;
}

.skill-bubble::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #cdb94d;
}

@keyframes fadeInBubble {
  from { opacity: 0; transform: translate(-50%, -5px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

/* Donut animation */
@keyframes donutFill {
  from { stroke-dasharray: 0 1000; }
  to { stroke-dasharray: var(--progress) var(--circumference); }
}
`;

// Donut Component
const Donut = ({ label, level }) => {
  const size = 110;
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (level / 5) * circumference;

  return (
    <div className="relative flex flex-col items-center mx-6">
      <svg width={size} height={size}>
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#333"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#cdb94d"
            strokeWidth={stroke}
            style={{
              "--progress": progress,
              "--circumference": circumference,
              animation: "donutFill 1.6s ease-out forwards",
            }}
            strokeDasharray={`0 ${circumference}`}
            strokeLinecap="round"
          />
        </g>
      </svg>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <span className="text-yellow-300 text-md font-semibold">{label}</span>
      </div>
    </div>
  );
};

const About = ({ navHeight }) => {
  const [showPopup, setShowPopup] = useState(false);

  const skills = [
    { name: "Test Automation", value: 75 },
    { name: "User Acceptance Testing", value: 90 },
    { name: "Mobile App Testing", value: 90 },
    { name: "Python", value: 80 },
    { name: "Java", value: 65 },
    { name: "Rest Api", value: 80 },
    { name: "Javascript", value: 85 },
    { name: "Git", value: 70 },
  ];

  const languages = [
    { name: "English", level: 5, label: "Fluent" },
    { name: "German", level: 1, label: "Basic" },
    { name: "French", level: 1, label: "Basic" },
  ];

  const frameworkItems = [
    { name: "Vue", img: "vue.png" },
    { name: "React", img: "logo512.png" },
    { name: "Flask", img: "flask.png" },
    { name: "Figma", img: "Figma.png" },
    { name: "Selenium", img: "Selenium.png" },
    { name: "MongoDB", img: "mongodb.png" },
    { name: "Docker", img: "docker.png" },
    { name: "Postman", img: "postman.png" },
  ];

  return (
    <div
      className="z-10 text-white w-full px-6 py-6 lg:py-0 relative"
      style={{ minHeight: `calc(100vh - ${navHeight}px)` }}
    >
      <style>{style}</style>

      <div className="flex flex-col h-full">
        {/* ===== TOP: ABOUT ME ===== */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-12 mb-8 lg:mb-10">
          <div className="w-full lg:basis-1/3 pl-4 sm:pl-6 lg:pl-28">
            <h1 className="text-4xl lg:text-6xl font-light text-yellow-300 text-left">
              About Me
            </h1>
          </div>

          <div className="w-full lg:flex-1 lg:-ml-24 pr-4 lg:pr-20">
            <p className="text-sm sm:text-base lg:text-sm leading-relaxed tracking-wide text-gray-200 max-w-5xl">
              I'm Arun Prasad, a QA Engineer with nearly 4 years of experience across manual testing
              and Selenium automation. I also worked as a Junior Project Manager handling sprint
              boards, planning, and cross-team coordination. During my master's in Applied Computer
              Science, I developed full-stack applications using React, Vue.js, Flask, MongoDB &
              Redis. My thesis involved fine-tuning multimodal VLMs to build a clinically oriented
              medical chatbot that performs image–text reasoning.
            </p>
          </div>
        </div>

        {/* ===== MIDDLE SECTION ===== */}
        <div className="flex flex-col lg:flex-row items-stretch mt-6">
          {/* LEFT: SKILLS */}
          <div className="lg:w-1/2 flex justify-center items-start">
            <div className="w-full max-w-2xl px-4">
              <h2 className="text-4xl font-light text-yellow-300 mb-8 text-left">
                Skills
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-14">
                {skills.map((skill, index) => (
                  <div key={index} className="w-full">
                    <span className="block mb-1 text-gray-200">{skill.name}</span>
                    <div className="w-full bg-gray-600/40 rounded-full h-2 relative">
                      <div
                        className="bg-gray-300 h-2 rounded-full animate-fill"
                        style={{ "--fill-width": `${skill.value}%` }}
                      />
                      <div
                        className="skill-bubble"
                        style={{ left: `calc(${skill.value}% - 18px)` }}
                      >
                        {skill.value}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: FRAMEWORKS */}
          <div className="lg:w-1/2 flex flex-col px-8 lg:px-12">
            <h2 className="text-4xl font-light text-yellow-300 mt-14 lg:mt-0 mb-16">
              Frameworks & Tools
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-14">
              {frameworkItems.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="mb-2 text-gray-200">{item.name}</span>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-contain logo-fade logo-pulse logo-hover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== LANGUAGES ===== */}
        <div className="mt-6 mb-6 flex flex-col items-start lg:items-center w-full">
          <h2 className="text-4xl font-normal text-yellow-300 text-left lg:text-center w-full px-4">
            Languages
          </h2>

          {/* ⭐ FIXED DONUT LAYOUT */}
          <div className="flex flex-col lg:flex-row items-center lg:justify-center mt-6 gap-12 w-full px-4">
            {languages.map((lang, index) => (
              <div key={index} className="flex flex-col items-center">
                <span className="text-gray-200 text-lg mb-2">{lang.name}</span>
                <Donut label={lang.label} level={lang.level} />
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

export default About;
