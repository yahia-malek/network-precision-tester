const serversService = require('../services/serversService');
const logger = require('../utils/logger');

/**
 * Get all available test servers
 */
exports.getServers = async (req, res) => {
  try {
    const servers = await serversService.getAllServers();
    
    return res.status(200).json({
      count: servers.length,
      servers
    });
  } catch (error) {
    logger.error(`Error retrieving servers: ${error.message}`);
    return res.status(500).json({ error: 'Failed to retrieve servers' });
  }
};

/**
 * Get servers by region
 */
exports.getServersByRegion = async (req, res) => {
  try {
    const { region } = req.params;
    
    if (!region) {
      return res.status(400).json({ error: 'Region is required' });
    }
    
    const servers = await serversService.getServersByRegion(region);
    
    return res.status(200).json({
      region,
      count: servers.length,
      servers
    });
  } catch (error) {
    logger.error(`Error retrieving servers by region: ${error.message}`);
    return res.status(500).json({ error: 'Failed to retrieve servers by region' });
  }
}; 