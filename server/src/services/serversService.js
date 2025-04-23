const config = require('../../config/config');
const logger = require('../utils/logger');

// In-memory storage for servers (in a production app, use a database)
const servers = [
  {
    id: 'server1',
    name: 'US East Server',
    location: 'New York',
    region: 'us-east',
    coordinates: {
      lat: 40.7128,
      lng: -74.0060
    },
    provider: 'AWS',
    distance: null, // Would be calculated based on client location
    status: 'active'
  },
  {
    id: 'server2',
    name: 'US West Server',
    location: 'San Francisco',
    region: 'us-west',
    coordinates: {
      lat: 37.7749,
      lng: -122.4194
    },
    provider: 'GCP',
    distance: null,
    status: 'active'
  },
  {
    id: 'server3',
    name: 'Europe Server',
    location: 'Frankfurt',
    region: 'eu-central',
    coordinates: {
      lat: 50.1109,
      lng: 8.6821
    },
    provider: 'Azure',
    distance: null,
    status: 'active'
  },
  {
    id: 'server4',
    name: 'Asia Pacific Server',
    location: 'Tokyo',
    region: 'ap-northeast',
    coordinates: {
      lat: 35.6762,
      lng: 139.6503
    },
    provider: 'AWS',
    distance: null,
    status: 'active'
  },
  {
    id: 'server5',
    name: 'South America Server',
    location: 'São Paulo',
    region: 'sa-east',
    coordinates: {
      lat: -23.5505,
      lng: -46.6333
    },
    provider: 'GCP',
    distance: null,
    status: 'maintenance'
  }
];

/**
 * Get all available test servers
 * @returns {Array} Array of server objects
 */
exports.getAllServers = async () => {
  logger.info('Getting all servers');
  return servers.filter(server => server.status === 'active');
};

/**
 * Get servers by region
 * @param {string} region - Region code
 * @returns {Array} Array of server objects in the specified region
 */
exports.getServersByRegion = async (region) => {
  logger.info(`Getting servers for region: ${region}`);
  return servers.filter(server => 
    server.region.toLowerCase().includes(region.toLowerCase()) && 
    server.status === 'active'
  );
};

/**
 * Get server by ID
 * @param {string} id - Server ID
 * @returns {object|null} Server object or null if not found
 */
exports.getServerById = async (id) => {
  logger.info(`Getting server by ID: ${id}`);
  return servers.find(server => server.id === id);
};

/**
 * Find nearest server based on client coordinates
 * @param {number} latitude - Client latitude
 * @param {number} longitude - Client longitude
 * @returns {object} Nearest server
 */
exports.findNearestServer = async (latitude, longitude) => {
  logger.info(`Finding nearest server to coordinates: ${latitude}, ${longitude}`);
  
  // Calculate distances for each server
  const serversWithDistance = servers
    .filter(server => server.status === 'active')
    .map(server => {
      const distance = calculateDistance(
        latitude, 
        longitude,
        server.coordinates.lat,
        server.coordinates.lng
      );
      
      return {
        ...server,
        distance
      };
    });
  
  // Sort by distance and return the nearest
  serversWithDistance.sort((a, b) => a.distance - b.distance);
  
  return serversWithDistance[0] || null;
};

/**
 * Calculate distance between two points using Haversine formula
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lon1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lon2 - Longitude of point 2
 * @returns {number} Distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return distance;
} 