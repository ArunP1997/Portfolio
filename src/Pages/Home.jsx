import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Home = () => {
  const typedRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["a QA Engineer", "a FullStack Developer", "an AI Engineer"],
      typeSpeed: 150,
      backSpeed: 150,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="text-white">

      {/* CONTACT POPUP */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="relative bg-white/95 backdrop-blur-lg text-black p-8 rounded-2xl w-[90%] max-w-[360px] shadow-xl border border-gray-200 animate-fadeScale"
            onClick={(e) => e.stopPropagation()}
          >

            {/* X Close Icon */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black transition"
            >
              <AiOutlineClose size={22} />
            </button>

            <h2 className="text-2xl font-semibold mb-5 text-center text-gray-900">
              Contact
            </h2>

            <div className="space-y-5 text-center">

              {/* Email */}
              <div className="flex items-center justify-center gap-2">
                <MdEmail size={18} className="text-gray-700" />
                <p className="text-sm text-gray-800">arunpmdn1997@gmail.com</p>
              </div>

              <div className="h-[1px] w-full bg-gray-200"></div>

              {/* LinkedIn */}
              <div className="flex items-center justify-center gap-2">
                <FaLinkedin size={18} className="text-blue-600" />
                <a
                  href="https://www.linkedin.com/in/arun-prasad-m-508a18377/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:underline text-sm"
                >
                  LinkedIn
                </a>
              </div>

              <div className="h-[1px] w-full bg-gray-200"></div>

              {/* GitHub */}
              <div className="flex items-center justify-center gap-2">
                <FaGithub size={18} className="text-black" />
                <a
                  href="https://github.com/ArunP1997"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:underline text-sm"
                >
                  GitHub
                </a>
              </div>

            </div>

            {/* Animation Styles */}
            <style>{`
              @keyframes fadeScale {
                0% { opacity: 0; transform: scale(0.85); }
                100% { opacity: 1; transform: scale(1); }
              }
              .animate-fadeScale {
                animation: fadeScale 0.25s ease-out;
              }
            `}</style>

          </div>
        </div>
      )}

      {/* ==== REST OF YOUR HOME PAGE BELOW (UNCHANGED) ==== */}

      <div className="flex flex-col text-center justify-center w-full h-screen mt-[-96px] mx-auto max-w-[800px]">
        <p className="text-lime-600 text-yellow-300 font-light p-2 md:text-3xl text-xl">
          My Portfolio
        </p>

        <h1 className="font-medium md:text-5xl sm:text-5xl text-3xl md:py-6">
          Arun Prasad Muralidharan
        </h1>

        <div className="flex justify-center items-center">
          <p className="md:text-3xl sm:text-3xl text-xl font-light">I'm&nbsp;</p>
          <span
            ref={typedRef}
            className="md:text-3xl sm:text-3xl text-xl text-yellow-300 font-light pl-2"
          ></span>
        </div>

        <div className="flex justify-center gap-[50px] mt-[90px]">
          <Link
            to="/about"
            className="
              bg-black border-[2px] border-yellow-300 text-white font-medium
              h-[60px] w-[140px] text-sm
              sm:h-[80px] sm:w-[200px] sm:text-base
              md:h-[100px] md:w-[260px] md:text-lg
              flex justify-center items-center
              hover:bg-white hover:text-black transition duration-300 rounded-none
            "
          >
            About Me
          </Link>

          <Link
            to="/projects"
            className="
              bg-black border-[2px] border-yellow-300 text-white font-medium
              h-[60px] w-[140px] text-sm
              sm:h-[80px] sm:w-[200px] sm:text-base
              md:h-[100px] md:w-[260px] md:text-lg
              flex justify-center items-center
              hover:bg-white hover:text-black transition duration-300 rounded-none
            "
          >
            Projects
          </Link>
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => setShowPopup(true)}
            className="
              bg-black border-[2px] border-yellow-300 text-white font-medium
              h-[60px] w-[140px] text-sm
              sm:h-[80px] sm:w-[200px] sm:text-base
              md:h-[100px] md:w-[260px] md:text-lg
              flex justify-center items-center
              hover:bg-white hover:text-black transition duration-300 rounded-none
            "
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
