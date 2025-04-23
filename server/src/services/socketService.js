const logger = require('../utils/logger');
const speedtestService = require('./speedtestService');

/**
 * Socket service for real-time test updates
 * @param {object} io - Socket.IO instance
 */
module.exports = (io) => {
  logger.info('Initializing socket service');
  
  io.on('connection', (socket) => {
    logger.info(`New socket connection: ${socket.id}`);
    
    // Handle client joining a test room
    socket.on('join-test', (testId) => {
      if (!testId) {
        socket.emit('error', { message: 'Test ID is required' });
        return;
      }
      
      logger.info(`Socket ${socket.id} joined test room: ${testId}`);
      socket.join(`test-${testId}`);
      socket.emit('joined', { testId });
    });
    
    // Handle client starting a test
    socket.on('start-test', async (data) => {
      try {
        const { serverId, testType, clientInfo } = data;
        
        if (!serverId) {
          socket.emit('error', { message: 'Server ID is required' });
          return;
        }
        
        logger.info(`Starting test for socket ${socket.id} with server ${serverId}`);
        
        // Initiate the test
        const testId = await speedtestService.initiateTest(serverId, testType);
        
        // Join the test room
        socket.join(`test-${testId}`);
        
        // Send initial status
        socket.emit('test-started', { 
          testId, 
          status: 'initiated', 
          timestamp: new Date().toISOString() 
        });
        
        // Simulate test progress
        simulateTestProgress(io, testId, testType);
      } catch (error) {
        logger.error(`Error in start-test: ${error.message}`);
        socket.emit('error', { message: 'Failed to start test' });
      }
    });
    
    // Handle client leaving
    socket.on('disconnect', () => {
      logger.info(`Socket disconnected: ${socket.id}`);
    });
  });
};

/**
 * Simulate speed test progress with socket updates
 * @param {object} io - Socket.IO instance
 * @param {string} testId - Test ID
 * @param {string} testType - Type of test
 */
function simulateTestProgress(io, testId, testType = 'comprehensive') {
  const testRoom = `test-${testId}`;
  const steps = determineTestSteps(testType);
  let currentStep = 0;
  
  // Send initial progress
  io.to(testRoom).emit('test-progress', {
    testId,
    status: 'starting',
    progress: 0,
    currentStep: steps[currentStep],
    totalSteps: steps.length,
    timestamp: new Date().toISOString()
  });
  
  // Simulate test progression
  const interval = setInterval(() => {
    currentStep++;
    
    if (currentStep < steps.length) {
      // Send progress update
      const progress = Math.round((currentStep / steps.length) * 100);
      
      io.to(testRoom).emit('test-progress', {
        testId,
        status: 'in-progress',
        progress,
        currentStep: steps[currentStep],
        totalSteps: steps.length,
        timestamp: new Date().toISOString()
      });
    } else {
      // Test completed
      clearInterval(interval);
      
      // Generate results
      const results = generateMockResults(testType);
      
      // Update test record with results
      speedtestService.completeTest(testId, results);
      
      // Send completed status with results
      io.to(testRoom).emit('test-completed', {
        testId,
        status: 'completed',
        progress: 100,
        results,
        timestamp: new Date().toISOString()
      });
    }
  }, 1000); // Update every second
}

/**
 * Determine test steps based on test type
 * @param {string} testType - Type of test
 * @returns {Array} Array of test steps
 */
function determineTestSteps(testType) {
  const steps = [];
  
  if (testType === 'comprehensive' || testType === 'ping') {
    steps.push('Measuring latency');
    steps.push('Calculating jitter');
  }
  
  if (testType === 'comprehensive' || testType === 'download') {
    steps.push('Preparing download test');
    steps.push('Testing download speed (25%)');
    steps.push('Testing download speed (50%)');
    steps.push('Testing download speed (75%)');
    steps.push('Finalizing download test');
  }
  
  if (testType === 'comprehensive' || testType === 'upload') {
    steps.push('Preparing upload test');
    steps.push('Testing upload speed (33%)');
    steps.push('Testing upload speed (66%)');
    steps.push('Finalizing upload test');
  }
  
  steps.push('Finalizing results');
  
  return steps;
}

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
      bytesReceived: 20 * 1024 * 1024,
      duration: Math.random() * 5 + 3, // 3-8 seconds
      unit: 'Mbps'
    };
  }
  
  if (testType === 'upload' || testType === 'comprehensive') {
    results.upload = {
      speed: Math.random() * 50 + 10, // 10-60 Mbps
      bytesSent: 10 * 1024 * 1024,
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