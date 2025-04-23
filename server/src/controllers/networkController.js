const networkService = require('../services/networkService');
const logger = require('../utils/logger');

/**
 * Ping a host
 */
exports.pingHost = async (req, res) => {
  try {
    const { host } = req.params;
    const { count = 4 } = req.query;
    
    if (!host) {
      return res.status(400).json({ error: 'Host is required' });
    }
    
    const result = await networkService.pingHost(host, parseInt(count));
    
    return res.status(200).json(result);
  } catch (error) {
    logger.error(`Error pinging host: ${error.message}`);
    return res.status(500).json({ error: 'Failed to ping host' });
  }
};

/**
 * Perform a traceroute to a host
 */
exports.traceRoute = async (req, res) => {
  try {
    const { host } = req.params;
    
    if (!host) {
      return res.status(400).json({ error: 'Host is required' });
    }
    
    const result = await networkService.traceRoute(host);
    
    return res.status(200).json(result);
  } catch (error) {
    logger.error(`Error performing traceroute: ${error.message}`);
    return res.status(500).json({ error: 'Failed to perform traceroute' });
  }
};

/**
 * Perform DNS lookup
 */
exports.dnsLookup = async (req, res) => {
  try {
    const { domain } = req.params;
    
    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' });
    }
    
    const result = await networkService.dnsLookup(domain);
    
    return res.status(200).json(result);
  } catch (error) {
    logger.error(`Error performing DNS lookup: ${error.message}`);
    return res.status(500).json({ error: 'Failed to perform DNS lookup' });
  }
}; 