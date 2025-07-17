// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-400">
          <Link to="/">MyPortfolio</Link>
        </div>
        <div className="space-x-8 font-medium">
          <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-blue-400 transition-colors">About</Link>
          <Link to="/projects" className="hover:text-blue-400 transition-colors">Projects</Link>
          <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
