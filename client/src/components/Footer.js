import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xl font-bold">NetworkPT</span>
            </div>
            <p className="text-gray-400">
              A comprehensive network testing tool to measure your internet performance, diagnose issues, and optimize your connection.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">Home</Link></li>
              <li><Link to="/speedtest" className="text-gray-400 hover:text-white transition-colors duration-300">Speed Test</Link></li>
              <li><Link to="/diagnostics" className="text-gray-400 hover:text-white transition-colors duration-300">Diagnostics</Link></li>
              <li><Link to="/history" className="text-gray-400 hover:text-white transition-colors duration-300">History</Link></li>
            </ul>
          </div>
          
          {/* Column 3: Resources */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300">About</Link></li>
              <li><Link to="/servers" className="text-gray-400 hover:text-white transition-colors duration-300">Test Servers</Link></li>
              <li><Link to="/about#faq" className="text-gray-400 hover:text-white transition-colors duration-300">FAQ</Link></li>
              <li><Link to="/about#contact" className="text-gray-400 hover:text-white transition-colors duration-300">Support</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Legal */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section with copyright */}
        <div className="pt-8 mt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {currentYear} Network Precision Tester. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 