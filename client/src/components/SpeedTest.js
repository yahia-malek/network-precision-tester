import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socketService from '../utils/socketService';
import { servers } from '../utils/api';
import Speedometer from './Speedometer';

const SpeedTest = () => {
  const navigate = useNavigate();
  const [selectedServer, setSelectedServer] = useState(null);
  const [serverList, setServerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [testType, setTestType] = useState('comprehensive');
  const [testId, setTestId] = useState(null);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState(0);
  const [pingValue, setPingValue] = useState(0);
  const [jitterValue, setJitterValue] = useState(0);

  // Load server list
  useEffect(() => {
    const fetchServers = async () => {
      try {
        const data = await servers.getAllServers();
        setServerList(data.servers || []);
        
        // Auto-select the first server
        if (data.servers && data.servers.length > 0) {
          setSelectedServer(data.servers[0].id);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching servers:', error);
        setLoading(false);
      }
    };

    fetchServers();
  }, []);

  // Start the test
  const handleStartTest = async () => {
    if (!selectedServer) {
      alert('Please select a server');
      return;
    }

    setTestStarted(true);
    setTestProgress(0);
    setCurrentStep('Initializing test...');
    setDownloadSpeed(0);
    setUploadSpeed(0);
    setPingValue(0);
    setJitterValue(0);

    try {
      // Start the test via socket
      const result = await socketService.startTest(
        { serverId: selectedServer, testType },
        handleTestProgress,
        handleTestComplete
      );

      setTestId(result.testId);
    } catch (error) {
      console.error('Error starting test:', error);
      setTestStarted(false);
    }
  };

  // Handle test progress updates
  const handleTestProgress = (data) => {
    setTestProgress(data.progress);
    setCurrentStep(data.currentStep);

    // Simulate live results for better UX
    if (data.currentStep.includes('download')) {
      const randomSpeed = Math.random() * (data.progress / 2) + 10;
      setDownloadSpeed(randomSpeed);
    } else if (data.currentStep.includes('upload')) {
      const randomSpeed = Math.random() * (data.progress / 3) + 5;
      setUploadSpeed(randomSpeed);
    } else if (data.currentStep.includes('latency') || data.currentStep.includes('ping')) {
      const randomPing = Math.random() * 30 + 10;
      setPingValue(randomPing);
      const randomJitter = Math.random() * 5 + 1;
      setJitterValue(randomJitter);
    }
  };

  // Handle test completion
  const handleTestComplete = (data) => {
    // Navigate to results page
    if (data.testId) {
      setTimeout(() => {
        navigate(`/results/${data.testId}`);
      }, 1000);
    } else {
      setTestStarted(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Internet Speed Test</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading servers...</p>
          </div>
        ) : testStarted ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-semibold mb-6">Testing Your Connection</h2>
            
            {/* Current step */}
            <div className="mb-6">
              <p className="text-lg font-medium text-gray-800 mb-2">{currentStep}</p>
              
              {/* Progress bar */}
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div 
                  className="h-full bg-blue-500 rounded-full transition-all duration-300"
                  style={{ width: `${testProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">{testProgress}% complete</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Download Speedometer */}
              <div>
                <h3 className="text-lg font-medium mb-2">Download</h3>
                <Speedometer 
                  value={downloadSpeed} 
                  maxValue={150} 
                  unit="Mbps" 
                  color="#3b82f6" 
                />
              </div>
              
              {/* Upload Speedometer */}
              <div>
                <h3 className="text-lg font-medium mb-2">Upload</h3>
                <Speedometer 
                  value={uploadSpeed} 
                  maxValue={50} 
                  unit="Mbps" 
                  color="#10b981" 
                />
              </div>
            </div>
            
            <div className="flex justify-center items-center space-x-12">
              {/* Ping */}
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Ping</h3>
                <p className="text-3xl font-bold text-indigo-600">
                  {pingValue.toFixed(1)} <span className="text-lg font-normal">ms</span>
                </p>
              </div>
              
              {/* Jitter */}
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">Jitter</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {jitterValue.toFixed(1)} <span className="text-lg font-normal">ms</span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">Test Configuration</h2>
            
            {/* Server selection */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="server">
                Select Server
              </label>
              <select
                id="server"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedServer || ''}
                onChange={(e) => setSelectedServer(e.target.value)}
              >
                <option value="">Select a server</option>
                {serverList.map((server) => (
                  <option key={server.id} value={server.id}>
                    {server.name} ({server.location}) - {server.provider}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Test type selection */}
            <div className="mb-8">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Test Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    testType === 'comprehensive' 
                      ? 'bg-blue-50 border-blue-500 text-blue-700' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setTestType('comprehensive')}
                >
                  <div className="font-medium">Comprehensive</div>
                  <div className="text-sm text-gray-600">Download, Upload, Ping</div>
                </div>
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    testType === 'download' 
                      ? 'bg-blue-50 border-blue-500 text-blue-700' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setTestType('download')}
                >
                  <div className="font-medium">Download Only</div>
                  <div className="text-sm text-gray-600">Tests download speed</div>
                </div>
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    testType === 'upload' 
                      ? 'bg-blue-50 border-blue-500 text-blue-700' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setTestType('upload')}
                >
                  <div className="font-medium">Upload Only</div>
                  <div className="text-sm text-gray-600">Tests upload speed</div>
                </div>
                <div
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    testType === 'ping' 
                      ? 'bg-blue-50 border-blue-500 text-blue-700' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setTestType('ping')}
                >
                  <div className="font-medium">Ping Only</div>
                  <div className="text-sm text-gray-600">Tests latency & jitter</div>
                </div>
              </div>
            </div>
            
            {/* Start test button */}
            <div className="text-center">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={handleStartTest}
                disabled={!selectedServer}
              >
                Start Test
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tips and information */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">Testing Tips</h3>
        <ul className="space-y-2 text-blue-700">
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            For most accurate results, connect your device directly to your modem or router using an Ethernet cable.
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Close other applications and devices that may be using your network while testing.
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Try running the test at different times of day to see how your speeds vary with network congestion.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SpeedTest; 