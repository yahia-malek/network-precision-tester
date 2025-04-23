import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">About Network Precision Tester</h1>
      
      {/* Main content */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-6">
          Network Precision Tester was created to provide users with an accurate, reliable, and comprehensive tool to 
          measure and analyze their internet connection. Our mission is to help you understand your network performance 
          with precision and clarity, empowering you to make informed decisions about your internet service.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <p className="text-gray-700 mb-6">
          Our testing methodology uses a combination of client and server-side measurements to provide the most accurate 
          assessment of your network performance. We test multiple aspects of your connection:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-5 rounded-lg">
            <h3 className="text-lg font-medium text-blue-800 mb-2">Download Speed</h3>
            <p className="text-gray-600">
              We measure how quickly your connection can retrieve data from our servers, which affects activities like 
              streaming videos, downloading files, and browsing websites.
            </p>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-lg">
            <h3 className="text-lg font-medium text-green-800 mb-2">Upload Speed</h3>
            <p className="text-gray-600">
              We measure how quickly your connection can send data to our servers, which affects activities like video 
              calls, cloud backups, and social media uploads.
            </p>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-lg">
            <h3 className="text-lg font-medium text-purple-800 mb-2">Latency (Ping)</h3>
            <p className="text-gray-600">
              We measure the time it takes for data to travel from your device to our servers and back, which affects 
              responsiveness for gaming, video calls, and web browsing.
            </p>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-lg">
            <h3 className="text-lg font-medium text-indigo-800 mb-2">Jitter</h3>
            <p className="text-gray-600">
              We measure variations in latency, which affects the stability of real-time applications like voice and 
              video calls or online gaming.
            </p>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
        <p className="text-gray-700 mb-6">
          Network Precision Tester uses advanced web technologies and optimized algorithms to measure your connection with high accuracy:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          <li>
            <span className="font-medium">WebSocket Protocol:</span> For real-time, bidirectional communication between your browser and our test servers
          </li>
          <li>
            <span className="font-medium">Multi-threaded Testing:</span> To maximize your connection utilization during tests
          </li>
          <li>
            <span className="font-medium">Adaptive Quality Measurement:</span> Our tests automatically adjust based on your connection quality
          </li>
          <li>
            <span className="font-medium">Global Server Network:</span> Servers strategically placed around the world for accurate regional testing
          </li>
          <li>
            <span className="font-medium">Comprehensive Analysis:</span> Advanced algorithms to provide detailed insights about your connection
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
        <p className="text-gray-700 mb-6">
          We respect your privacy and are committed to protecting your data. Here's what you should know about our data practices:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          <li>We collect only essential data needed to run the tests</li>
          <li>We anonymize all data used for analytics purposes</li>
          <li>We do not sell your personal information to third parties</li>
          <li>We use industry-standard security measures to protect your data</li>
          <li>You can request deletion of your test history at any time</li>
        </ul>
        
        <div className="flex justify-center">
          <Link
            to="/speedtest"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow transition-colors duration-300"
          >
            Start Testing Your Connection
          </Link>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Why do my results differ from my ISP's advertised speeds?</h3>
            <p className="text-gray-700">
              Several factors can affect your test results, including your home network configuration, device capabilities, 
              network congestion, time of day, and the distance to the test server. ISPs typically advertise "up to" speeds 
              under ideal conditions.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">How can I improve my internet speed?</h3>
            <p className="text-gray-700">
              You can try several approaches: restart your router, connect via Ethernet instead of Wi-Fi, upgrade your router, 
              check for background downloads, move your router to a central location, or contact your ISP about potential service issues.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">How often should I test my internet connection?</h3>
            <p className="text-gray-700">
              We recommend regular testing, especially if you notice performance issues. Testing at different times of day can 
              help you understand how your connection performs during peak and off-peak hours.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">What is a good internet speed?</h3>
            <p className="text-gray-700">
              This depends on your usage. For basic browsing and email, 5-10 Mbps is sufficient. For HD streaming, 15-25 Mbps is recommended. 
              For 4K streaming or households with multiple users, 50+ Mbps is ideal. For gaming, ping and jitter are often more important than raw speed.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Do you offer API access to your testing service?</h3>
            <p className="text-gray-700">
              Yes, we offer API access for developers and businesses who want to integrate our testing capabilities into their applications. 
              Please contact us for more information about our API documentation and pricing.
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Information */}
      <div className="bg-blue-50 rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-6">
          Have questions, feedback, or need support? We're here to help. Get in touch with our team:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Support</h3>
            <p className="text-gray-600 mb-2">For technical issues and help with using our tool:</p>
            <p className="text-blue-600">support@networkprecisiontester.com</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Business Inquiries</h3>
            <p className="text-gray-600 mb-2">For partnerships, API access, and enterprise solutions:</p>
            <p className="text-blue-600">business@networkprecisiontester.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 