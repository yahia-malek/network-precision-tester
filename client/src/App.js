import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './components/HomePage';
import SpeedTest from './components/SpeedTest';
import TestResults from './components/TestResults';
import NetworkDiagnostics from './components/NetworkDiagnostics';
import TestHistory from './components/TestHistory';
import ServerSelection from './components/ServerSelection';
import About from './components/About';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/speedtest" element={<SpeedTest />} />
          <Route path="/results/:testId" element={<TestResults />} />
          <Route path="/diagnostics" element={<NetworkDiagnostics />} />
          <Route path="/history" element={<TestHistory />} />
          <Route path="/servers" element={<ServerSelection />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
