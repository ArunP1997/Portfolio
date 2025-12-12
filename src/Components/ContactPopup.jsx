import React from "react";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const ContactPopup = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative bg-white/95 backdrop-blur-lg text-black p-8 rounded-2xl w-[90%] max-w-[360px] shadow-xl border border-gray-200
        animate-fadeScale"
        onClick={(e) => e.stopPropagation()}
      >

        {/* X Close Icon */}
        <button
          onClick={onClose}
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
  );
};

export default ContactPopup;
