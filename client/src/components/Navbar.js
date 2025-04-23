import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Helper function to determine if a link is active
  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-500 font-semibold' : 'text-gray-700 hover:text-blue-500';
  };
  
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo and brand name */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-800">NetworkPT</span>
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`${isActive('/')} transition-colors duration-300`}>Home</Link>
            <Link to="/speedtest" className={`${isActive('/speedtest')} transition-colors duration-300`}>Speed Test</Link>
            <Link to="/diagnostics" className={`${isActive('/diagnostics')} transition-colors duration-300`}>Diagnostics</Link>
            <Link to="/history" className={`${isActive('/history')} transition-colors duration-300`}>History</Link>
            <Link to="/servers" className={`${isActive('/servers')} transition-colors duration-300`}>Servers</Link>
            <Link to="/about" className={`${isActive('/about')} transition-colors duration-300`}>About</Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`${isActive('/')} py-2 transition-colors duration-300`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/speedtest" 
                className={`${isActive('/speedtest')} py-2 transition-colors duration-300`}
                onClick={() => setIsMenuOpen(false)}
              >
                Speed Test
              </Link>
              <Link 
                to="/diagnostics" 
                className={`${isActive('/diagnostics')} py-2 transition-colors duration-300`}
                onClick={() => setIsMenuOpen(false)}
              >
                Diagnostics
              </Link>
              <Link 
                to="/history" 
                className={`${isActive('/history')} py-2 transition-colors duration-300`}
                onClick={() => setIsMenuOpen(false)}
              >
                History
              </Link>
              <Link 
                to="/servers" 
                className={`${isActive('/servers')} py-2 transition-colors duration-300`}
                onClick={() => setIsMenuOpen(false)}
              >
                Servers
              </Link>
              <Link 
                to="/about" 
                className={`${isActive('/about')} py-2 transition-colors duration-300`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 