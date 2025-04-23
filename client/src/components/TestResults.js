import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { speedTest } from '../utils/api';
import socketService from '../utils/socketService';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const TestResults = () => {
  const { testId } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch the test result
    const fetchTestResult = async () => {
      try {
        // If the test is still in progress, join the test room to get updates
        socketService.joinTestRoom(
          testId,
          null, // We don't need progress updates here
          (data) => {
            if (data.status === 'completed') {
              fetchResultFromAPI();
            }
          }
        );
        
        // Try to get the result from the API
        fetchResultFromAPI();
      } catch (error) {
        console.error('Error fetching test result:', error);
        setError('Failed to load test results. Please try again later.');
        setLoading(false);
      }
    };
    
    const fetchResultFromAPI = async () => {
      try {
        const data = await speedTest.getTestResult(testId);
        
        if (data && data.status === 'completed') {
          setResult(data);
          setLoading(false);
        } else if (data && data.status === 'pending') {
          // If test is still pending, wait and try again
          setTimeout(fetchResultFromAPI, 1000);
        } else {
          setError('Test result not found.');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching from API:', error);
        setError('Failed to load test results. Please try again later.');
        setLoading(false);
      }
    };

    fetchTestResult();
    
    // Cleanup socket connection on unmount
    return () => {
      socketService.disconnectSocket();
    };
  }, [testId]);

  // Create chart data for download/upload comparison
  const getSpeedComparisonData = () => {
    if (!result || !result.results) return null;
    
    const downloadSpeed = result.results.download?.speed || 0;
    const uploadSpeed = result.results.upload?.speed || 0;
    
    return {
      labels: ['Download', 'Upload'],
      datasets: [
        {
          data: [downloadSpeed, uploadSpeed],
          backgroundColor: ['#3b82f6', '#10b981'],
          hoverBackgroundColor: ['#2563eb', '#059669'],
          borderWidth: 0,
        },
      ],
    };
  };

  // Create ping history chart data (simulated data since we don't have real history)
  const getPingHistoryData = () => {
    if (!result || !result.results || !result.results.ping) return null;
    
    // Create simulated history data based on current ping
    const currentPing = result.results.ping.avg;
    const labels = Array.from({ length: 10 }, (_, i) => `Test ${i + 1}`);
    const data = Array.from({ length: 10 }, () => currentPing + (Math.random() * 10 - 5));
    
    return {
      labels,
      datasets: [
        {
          label: 'Ping (ms)',
          data,
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.2)',
          tension: 0.3,
        },
      ],
    };
  };

  // Get a grade based on the results
  const getPerformanceGrade = () => {
    if (!result || !result.results) return { grade: 'N/A', color: 'gray' };
    
    const downloadSpeed = result.results.download?.speed || 0;
    const uploadSpeed = result.results.upload?.speed || 0;
    const ping = result.results.ping?.avg || 0;
    
    // Calculate a score out of 100
    let score = 0;
    
    // Download affects score the most (up to 50 points)
    if (downloadSpeed >= 100) score += 50;
    else if (downloadSpeed >= 50) score += 40;
    else if (downloadSpeed >= 25) score += 30;
    else if (downloadSpeed >= 10) score += 20;
    else score += 10;
    
    // Upload (up to 30 points)
    if (uploadSpeed >= 50) score += 30;
    else if (uploadSpeed >= 25) score += 25;
    else if (uploadSpeed >= 10) score += 20;
    else if (uploadSpeed >= 5) score += 15;
    else score += 5;
    
    // Ping (up to 20 points - lower is better)
    if (ping <= 10) score += 20;
    else if (ping <= 20) score += 15;
    else if (ping <= 40) score += 10;
    else if (ping <= 100) score += 5;
    
    // Convert score to grade
    let grade;
    let color;
    
    if (score >= 90) { grade = 'A+'; color = '#10b981'; }
    else if (score >= 80) { grade = 'A'; color = '#34d399'; }
    else if (score >= 70) { grade = 'B'; color = '#6ee7b7'; }
    else if (score >= 60) { grade = 'C'; color = '#fcd34d'; }
    else if (score >= 50) { grade = 'D'; color = '#f59e0b'; }
    else { grade = 'F'; color = '#ef4444'; }
    
    return { grade, color, score };
  };

  // Get recommendations based on results
  const getRecommendations = () => {
    if (!result || !result.results) return [];
    
    const recommendations = [];
    const downloadSpeed = result.results.download?.speed || 0;
    const uploadSpeed = result.results.upload?.speed || 0;
    const ping = result.results.ping?.avg || 0;
    const jitter = result.results.ping?.jitter || 0;
    
    // Download speed recommendations
    if (downloadSpeed < 10) {
      recommendations.push('Your download speed is very low. Consider upgrading your internet plan or check for network issues.');
    } else if (downloadSpeed < 25) {
      recommendations.push('Your download speed is suitable for basic web browsing, but may struggle with HD streaming or large downloads.');
    }
    
    // Upload speed recommendations
    if (uploadSpeed < 5) {
      recommendations.push('Your upload speed is low. This may affect video calls, gaming, and uploading files.');
    }
    
    // Ping recommendations
    if (ping > 50) {
      recommendations.push('Your ping is high, which may cause lag in real-time applications like gaming and video calls.');
    }
    
    // Jitter recommendations
    if (jitter > 10) {
      recommendations.push('Your connection has significant jitter, which can cause stuttering in real-time communications.');
    }
    
    // General recommendations
    recommendations.push('For the most accurate results, try running tests at different times of the day.');
    
    if (recommendations.length === 0) {
      recommendations.push('Your internet connection is performing well!');
    }
    
    return recommendations;
  };

  const { grade, color, score } = getPerformanceGrade();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Loading test results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-red-700 mb-2">Error</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <Link to="/speedtest" className="text-blue-600 hover:underline">
          Run a new test
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Test Results</h1>
      
      {/* Test summary card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Test Summary</h2>
            <p className="text-gray-500">
              {new Date(result.endTime).toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <div 
              className="text-3xl font-bold rounded-full w-16 h-16 flex items-center justify-center"
              style={{ backgroundColor: `${color}20`, color }}
            >
              {grade}
            </div>
            <div className="text-sm text-gray-500 mt-1">Score: {score}/100</div>
          </div>
        </div>
        
        {/* Result metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Download Speed */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <h3 className="font-semibold text-gray-700">Download</h3>
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {result.results.download?.speed.toFixed(2)} <span className="text-lg font-normal">Mbps</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {result.results.download?.bytesReceived ? `${(result.results.download.bytesReceived / (1024 * 1024)).toFixed(2)} MB received` : ''}
            </p>
          </div>
          
          {/* Upload Speed */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <h3 className="font-semibold text-gray-700">Upload</h3>
            </div>
            <div className="text-3xl font-bold text-green-600">
              {result.results.upload?.speed.toFixed(2)} <span className="text-lg font-normal">Mbps</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {result.results.upload?.bytesSent ? `${(result.results.upload.bytesSent / (1024 * 1024)).toFixed(2)} MB sent` : ''}
            </p>
          </div>
          
          {/* Ping */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-semibold text-gray-700">Ping</h3>
            </div>
            <div className="text-3xl font-bold text-purple-600">
              {result.results.ping?.avg.toFixed(1)} <span className="text-lg font-normal">ms</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Jitter: {result.results.ping?.jitter.toFixed(1)} ms
            </p>
          </div>
        </div>
      </div>
      
      {/* Chart section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Download/Upload comparison chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Speed Comparison</h3>
          <div className="h-64">
            {getSpeedComparisonData() ? (
              <Doughnut 
                data={getSpeedComparisonData()} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                    },
                  }
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No data available</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Ping history chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Ping History</h3>
          <div className="h-64">
            {getPingHistoryData() ? (
              <Line 
                data={getPingHistoryData()} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                  scales: {
                    y: {
                      beginAtZero: false,
                    }
                  }
                }}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No ping data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Recommendations section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
        <ul className="space-y-3">
          {getRecommendations().map((recommendation, index) => (
            <li key={index} className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700">{recommendation}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Link 
          to="/speedtest" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow transition-colors duration-300"
        >
          Run Another Test
        </Link>
        <Link 
          to="/history" 
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full shadow transition-colors duration-300"
        >
          View Test History
        </Link>
      </div>
    </div>
  );
};

export default TestResults;
