const speedtestService = require('../services/speedtestService');
const logger = require('../utils/logger');

/**
 * Start a new speed test
 */
exports.startTest = async (req, res) => {
  try {
    const { serverId, testType } = req.body;
    
    if (!serverId) {
      return res.status(400).json({ error: 'Server ID is required' });
    }
    
    const testId = await speedtestService.initiateTest(serverId, testType);
    
    return res.status(200).json({
      message: 'Speed test initiated successfully',
      testId,
      status: 'pending'
    });
  } catch (error) {
    logger.error(`Error starting speed test: ${error.message}`);
    return res.status(500).json({ error: 'Failed to start speed test' });
  }
};

/**
 * Get test result by ID
 */
exports.getTestResult = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id) {
      return res.status(400).json({ error: 'Test ID is required' });
    }
    
    const result = await speedtestService.getTestResult(id);
    
    if (!result) {
      return res.status(404).json({ error: 'Test result not found' });
    }
    
    return res.status(200).json(result);
  } catch (error) {
    logger.error(`Error retrieving test result: ${error.message}`);
    return res.status(500).json({ error: 'Failed to retrieve test result' });
  }
};

/**
 * Get history of tests
 */
exports.getTestHistory = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;
    
    const history = await speedtestService.getTestHistory(parseInt(limit), parseInt(offset));
    
    return res.status(200).json({
      count: history.length,
      results: history
    });
  } catch (error) {
    logger.error(`Error retrieving test history: ${error.message}`);
    return res.status(500).json({ error: 'Failed to retrieve test history' });
  }
}; 