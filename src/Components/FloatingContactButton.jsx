import React from "react";
import { FiMail } from "react-icons/fi";

const FloatingContactButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        fixed bottom-6 right-6
        bg-yellow-300 text-black
        w-14 h-14 rounded-full
        shadow-xl flex items-center justify-center
        hover:scale-110 hover:bg-yellow-400
        transition-all cursor-pointer z-40
      "
    >
      <FiMail size={26} />
    </button>
  );
};

export default FloatingContactButton;
