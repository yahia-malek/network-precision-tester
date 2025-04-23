import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Speed test API calls
export const speedTest = {
  startTest: (serverId, testType = 'comprehensive') => {
    return api.post('/speedtest/start', { serverId, testType });
  },
  getTestResult: (testId) => {
    return api.get(`/speedtest/results/${testId}`);
  },
  getTestHistory: (limit = 10, offset = 0) => {
    return api.get(`/speedtest/history?limit=${limit}&offset=${offset}`);
  }
};

// Network diagnostics API calls
export const networkDiagnostics = {
  pingHost: (host, count = 4) => {
    return api.get(`/network/ping/${host}?count=${count}`);
  },
  traceRoute: (host) => {
    return api.get(`/network/traceroute/${host}`);
  },
  dnsLookup: (domain) => {
    return api.get(`/network/dns/${domain}`);
  }
};

// Servers API calls
export const servers = {
  getAllServers: () => {
    return api.get('/servers');
  },
  getServersByRegion: (region) => {
    return api.get(`/servers/${region}`);
  }
};

// Request interceptor for adding auth token if needed
api.interceptors.request.use(
  (config) => {
    // You could add authorization headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle errors
    console.error('API Error:', error.response?.data || error.message);
    
    // You can add custom error handling here
    if (error.response?.status === 401) {
      // Handle unauthorized access
    }
    
    return Promise.reject(error.response?.data || error);
  }
);

export default api; 