import { io } from 'socket.io-client';

let socket;

/**
 * Initialize the socket connection
 * @returns {Object} Socket instance
 */
export const initSocket = () => {
  if (!socket) {
    socket = io(process.env.REACT_APP_API_URL || 'http://localhost:3001', {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });
    
    // Setup listeners
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });
    
    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });
    
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
    
    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }
  
  return socket;
};

/**
 * Start a speed test
 * @param {Object} testParams - Test parameters
 * @param {function} onProgress - Progress callback
 * @param {function} onComplete - Completion callback
 * @returns {Promise} Promise that resolves when test is started
 */
export const startTest = (testParams, onProgress, onComplete) => {
  return new Promise((resolve, reject) => {
    const socket = initSocket();
    
    // Set up test-specific listeners
    socket.on('test-started', (data) => {
      console.log('Test started:', data);
      resolve(data);
    });
    
    socket.on('test-progress', (data) => {
      console.log('Test progress:', data);
      if (onProgress) onProgress(data);
    });
    
    socket.on('test-completed', (data) => {
      console.log('Test completed:', data);
      if (onComplete) onComplete(data);
      
      // Remove listeners after test completes
      socket.off('test-progress');
      socket.off('test-completed');
    });
    
    // Emit start test event
    socket.emit('start-test', testParams);
  });
};

/**
 * Join a test room to receive updates for a specific test
 * @param {string} testId - Test ID
 * @param {function} onProgress - Progress callback
 * @param {function} onComplete - Completion callback
 */
export const joinTestRoom = (testId, onProgress, onComplete) => {
  const socket = initSocket();
  
  // Set up listeners
  socket.on('test-progress', (data) => {
    if (onProgress) onProgress(data);
  });
  
  socket.on('test-completed', (data) => {
    if (onComplete) onComplete(data);
    
    // Remove listeners
    socket.off('test-progress');
    socket.off('test-completed');
  });
  
  // Join the test room
  socket.emit('join-test', testId);
};

/**
 * Disconnect the socket
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export default {
  initSocket,
  startTest,
  joinTestRoom,
  disconnectSocket
}; 