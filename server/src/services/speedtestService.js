const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');
const config = require('../../config/config');

// In-memory storage for test results (in a production app, use a database)
const testResults = new Map();

/**
 * Initiate a new speed test
 * @param {string} serverId - ID of the server to test against
 * @param {string} testType - Type of test (download, upload, ping, comprehensive)
 * @returns {string} Test ID
 */
exports.initiateTest = async (serverId, testType = 'comprehensive') => {
  const testId = uuidv4();
  
  // Create a test record
  const testRecord = {
    id: testId,
    serverId,
    testType,
    status: 'pending',
    startTime: new Date().toISOString(),
    endTime: null,
    results: {}
  };
  
  // Store the test
  testResults.set(testId, testRecord);
  
  // In a real implementation, you would offload the test to a background worker
  // For demo purposes, we'll simulate the test completion after a delay
  setTimeout(() => {
    this.completeTest(testId, generateMockResults(testType));
  }, 3000);
  
  logger.info(`Speed test initiated: ${testId} for server ${serverId}`);
  
  return testId;
};

/**
 * Complete a test with results
 * @param {string} testId - ID of the test
 * @param {object} results - Test results
 */
exports.completeTest = (testId, results) => {
  const test = testResults.get(testId);
  
  if (!test) {
    logger.error(`Test not found: ${testId}`);
    return;
  }
  
  // Update the test record
  test.status = 'completed';
  test.endTime = new Date().toISOString();
  test.results = results;
  
  // Store updated test
  testResults.set(testId, test);
  
  logger.info(`Speed test completed: ${testId}`);
};

/**
 * Get test result by ID
 * @param {string} testId - ID of the test
 * @returns {object|null} Test result or null if not found
 */
exports.getTestResult = async (testId) => {
  const test = testResults.get(testId);
  
  if (!test) {
    logger.warn(`Test result not found: ${testId}`);
    return null;
  }
  
  return test;
};

/**
 * Get test history
 * @param {number} limit - Maximum number of results to return
 * @param {number} offset - Offset for pagination
 * @returns {Array} Array of test results
 */
exports.getTestHistory = async (limit = 10, offset = 0) => {
  const results = Array.from(testResults.values())
    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
    .slice(offset, offset + limit);
  
  return results;
};

/**
 * Generate mock results for demonstration purposes
 * @param {string} testType - Type of test
 * @returns {object} Mock results
 */
function generateMockResults(testType) {
  const results = {};
  
  if (testType === 'download' || testType === 'comprehensive') {
    results.download = {
      speed: Math.random() * 100 + 50, // 50-150 Mbps
      bytesReceived: config.speedTest.downloadSampleSize,
      duration: Math.random() * 5 + 3, // 3-8 seconds
      unit: 'Mbps'
    };
  }
  
  if (testType === 'upload' || testType === 'comprehensive') {
    results.upload = {
      speed: Math.random() * 50 + 10, // 10-60 Mbps
      bytesSent: config.speedTest.uploadSampleSize,
      duration: Math.random() * 5 + 4, // 4-9 seconds
      unit: 'Mbps'
    };
  }
  
  if (testType === 'ping' || testType === 'comprehensive') {
    results.ping = {
      min: Math.random() * 10 + 5, // 5-15 ms
      max: Math.random() * 20 + 20, // 20-40 ms
      avg: Math.random() * 15 + 15, // 15-30 ms
      jitter: Math.random() * 5 + 1, // 1-6 ms
      packetLoss: Math.random() * 1, // 0-1%
      unit: 'ms'
    };
  }
  
  return results;
} 