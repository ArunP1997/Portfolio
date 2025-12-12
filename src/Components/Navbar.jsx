import React, { useState, useRef, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { FaUserAlt, FaCode } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = ({ onHeight }) => {
  const [nav, setNav] = useState(false);
  const [visible, setVisible] = useState(true);
  const navRef = useRef(null);

  const handleNav = () => setNav(!nav);

  // Measure navbar height
  useEffect(() => {
    const updateHeight = () => {
      if (navRef.current) {
        onHeight(navRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [onHeight]);

  // Scroll-based navbar visibility (DISABLED when menu is open)
  useEffect(() => {
    const handleScroll = () => {
      if (nav) return; // ⛔ don't auto-hide when menu is open
      setVisible(window.scrollY < 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [nav]);

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <div
        ref={navRef}
        className={`
          text-white flex justify-between h-24 mx-auto px-4 items-center
          fixed top-0 left-0 w-full z-50
          transition-transform duration-300 ease-out
          ${visible || nav ? "translate-y-0" : "-translate-y-full"}
          ${nav ? "bg-black" : "bg-transparent"}
        `}
      >
        {/* Logo / Left */}
        <Link to="/" className="w-full text-3xl font-bold text-lime-600" />

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-lg">
          <li className="p-2 hover:text-yellow-300 transition">
            <Link to="/">
              <AiFillHome size={28} />
            </Link>
          </li>

          <li className="p-2 hover:text-yellow-300 transition">
            <Link to="/about">
              <FaUserAlt size={26} />
            </Link>
          </li>

          <li className="p-2 hover:text-yellow-300 transition">
            <Link to="/projects">
              <FaFolderOpen size={32} />
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Icon */}
        <div onClick={handleNav} className="block md:hidden cursor-pointer">
          {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </div>
      </div>

      {/* ===== MOBILE OVERLAY (NEW) ===== */}
      {nav && (
        <div
          className="fixed inset-0 bg-black/80 z-30 md:hidden"
          onClick={handleNav}
        />
      )}

      {/* ===== MOBILE SIDEBAR ===== */}
        <div
          className={
            nav
              ? "fixed left-0 top-24 h-[calc(100%-96px)] w-[60%] bg-[#000300] border-r border-gray-900 ease-in-out duration-500 z-40"
              : "fixed left-[-100%]"
          }
        >
          <ul className="p-4 text-white">
            <li className="flex items-center gap-4 p-4 border-b border-yellow-300">
              <AiFillHome size={24} />
              <Link to="/" onClick={handleNav}>
                Home
              </Link>
            </li>

            <li className="flex items-center gap-4 p-4 border-b border-yellow-300">
              <FaUserAlt size={22} />
              <Link to="/about" onClick={handleNav}>
                About
              </Link>
            </li>

            <li className="flex items-center gap-4 p-4 border-b border-yellow-300">
              <FaCode size={24} />
              <Link to="/projects" onClick={handleNav}>
                Projects
              </Link>
            </li>
          </ul>
        </div>

    </>
  );
};

export default Navbar;
