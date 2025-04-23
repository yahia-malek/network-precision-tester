import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 rounded-xl shadow-lg mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Network Precision Tester</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            A comprehensive tool for measuring and analyzing your internet connection performance with precision and reliability.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/speedtest"
              className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300 shadow-md"
            >
              Start Speed Test
            </Link>
            <Link
              to="/diagnostics"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 px-6 py-3 rounded-full text-lg font-semibold transition-colors duration-300"
            >
              Run Diagnostics
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-blue-100 text-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Speed Testing</h3>
              <p className="text-gray-600">
                Measure your download and upload speeds with precise and reliable tests that simulate real-world conditions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-green-100 text-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Network Diagnostics</h3>
              <p className="text-gray-600">
                Diagnose connection issues with ping tests, traceroute analysis, and DNS lookup tools to identify bottlenecks.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform duration-300 hover:transform hover:scale-105">
              <div className="bg-purple-100 text-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Historical Analysis</h3>
              <p className="text-gray-600">
                Track your internet performance over time with detailed history logs and visualization tools to spot trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-16 bg-gray-50 py-12 rounded-xl">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">Select a Server</h3>
              <p className="text-gray-600">Choose from our global network of test servers for accurate results.</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">Run the Test</h3>
              <p className="text-gray-600">Our system will measure your connection's performance accurately.</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-gray-600">View detailed metrics about your connection's performance.</p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="text-xl font-semibold mb-2">Analyze & Improve</h3>
              <p className="text-gray-600">Use our recommendations to optimize your network setup.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 rounded-xl shadow-lg mb-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Test Your Network?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get a comprehensive analysis of your internet connection with our precision testing tools.
          </p>
          <Link
            to="/speedtest"
            className="bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-300 shadow-md inline-block"
          >
            Start Free Test Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 