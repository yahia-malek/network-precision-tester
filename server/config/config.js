require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  env: process.env.NODE_ENV || 'development',
  logLevel: process.env.LOG_LEVEL || 'info',
  
  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequestsPerWindow: 100
  },
  
  // CORS settings
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  },
  
  // Test parameters
  speedTest: {
    downloadSampleSize: 20 * 1024 * 1024, // 20 MB
    uploadSampleSize: 10 * 1024 * 1024, // 10 MB
    pingCount: 10,
    defaultServers: [
      { id: 'server1', name: 'Primary Server', location: 'US East' },
      { id: 'server2', name: 'Secondary Server', location: 'US West' },
      { id: 'server3', name: 'Europe Server', location: 'Frankfurt' }
    ]
  }
}; 