import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import WebGLDotRipple from "./Components/WebGLDotRipple";
import Navbar from "./Components/Navbar";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Projects from "./Pages/Projects";

function AppLayout() {
  const location = useLocation();

  const [navHeight, setNavHeight] = useState(0);

  // Hide navbar ONLY on Home page
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar onHeight={setNavHeight} />}

      <div style={{ paddingTop: hideNavbar ? 0 : navHeight }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About navHeight={navHeight} />} />
          <Route path="/projects" element={<Projects navHeight={navHeight} />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <WebGLDotRipple />
      <AppLayout />
    </Router>
  );
}

export default App;
