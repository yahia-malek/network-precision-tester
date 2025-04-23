const express = require('express');
const router = express.Router();
const speedtestController = require('./controllers/speedtestController');
const networkController = require('./controllers/networkController');
const serversController = require('./controllers/serversController');

// Speedtest routes
router.post('/speedtest/start', speedtestController.startTest);
router.get('/speedtest/results/:id', speedtestController.getTestResult);
router.get('/speedtest/history', speedtestController.getTestHistory);

// Network diagnostics routes
router.get('/network/ping/:host', networkController.pingHost);
router.get('/network/traceroute/:host', networkController.traceRoute);
router.get('/network/dns/:domain', networkController.dnsLookup);

// Test servers routes
router.get('/servers', serversController.getServers);
router.get('/servers/:region', serversController.getServersByRegion);

module.exports = router;
