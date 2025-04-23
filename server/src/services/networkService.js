const { promisify } = require('util');
const dns = require('dns');
const ping = require('node-ping');
const { exec } = require('child_process');
const logger = require('../utils/logger');

const execAsync = promisify(exec);
const dnsLookupAsync = promisify(dns.lookup);
const dnsResolveAsync = promisify(dns.resolve);

/**
 * Ping a host
 * @param {string} host - Host to ping
 * @param {number} count - Number of pings to send
 * @returns {object} Ping results
 */
exports.pingHost = async (host, count = 4) => {
  try {
    logger.info(`Pinging host: ${host} (${count} times)`);
    
    // Sanitize input to prevent command injection
    if (!/^[a-zA-Z0-9.-]+$/.test(host)) {
      throw new Error('Invalid host name format');
    }
    
    const pingResults = [];
    let totalRtt = 0;
    let packetLoss = 0;
    let minRtt = Infinity;
    let maxRtt = 0;
    
    for (let i = 0; i < count; i++) {
      try {
        const res = await ping.promise.probe(host, {
          timeout: 10,
          extra: ['-c', '1'],
        });
        
        const rtt = parseFloat(res.time);
        pingResults.push({
          seq: i + 1,
          rtt: rtt,
          ttl: res.ttl || null,
          status: res.alive ? 'success' : 'failed'
        });
        
        if (res.alive) {
          totalRtt += rtt;
          minRtt = Math.min(minRtt, rtt);
          maxRtt = Math.max(maxRtt, rtt);
        } else {
          packetLoss++;
        }
      } catch (error) {
        pingResults.push({
          seq: i + 1,
          rtt: null,
          ttl: null,
          status: 'failed',
          error: error.message
        });
        packetLoss++;
      }
    }
    
    const successfulPings = count - packetLoss;
    const avgRtt = successfulPings > 0 ? totalRtt / successfulPings : 0;
    const packetLossPercent = (packetLoss / count) * 100;
    
    return {
      host,
      timestamp: new Date().toISOString(),
      summary: {
        transmitted: count,
        received: successfulPings,
        packetLoss: packetLossPercent.toFixed(2) + '%',
        min: minRtt === Infinity ? 0 : minRtt.toFixed(2),
        avg: avgRtt.toFixed(2),
        max: maxRtt.toFixed(2),
        unit: 'ms'
      },
      results: pingResults
    };
  } catch (error) {
    logger.error(`Error in pingHost: ${error.message}`);
    throw error;
  }
};

/**
 * Perform a traceroute to a host
 * @param {string} host - Host to trace
 * @returns {object} Traceroute results
 */
exports.traceRoute = async (host) => {
  try {
    logger.info(`Performing traceroute to host: ${host}`);
    
    // Sanitize input to prevent command injection
    if (!/^[a-zA-Z0-9.-]+$/.test(host)) {
      throw new Error('Invalid host name format');
    }
    
    // Different command for different OS
    const isWindows = process.platform === 'win32';
    const cmd = isWindows
      ? `tracert -d -h 30 ${host}`
      : `traceroute -n -m 30 ${host}`;
    
    const { stdout } = await execAsync(cmd);
    
    // Parse the traceroute output (simplified)
    const hops = parseTracerouteOutput(stdout, isWindows);
    
    return {
      host,
      timestamp: new Date().toISOString(),
      hops
    };
  } catch (error) {
    logger.error(`Error in traceRoute: ${error.message}`);
    throw error;
  }
};

/**
 * Perform DNS lookup
 * @param {string} domain - Domain to lookup
 * @returns {object} DNS lookup results
 */
exports.dnsLookup = async (domain) => {
  try {
    logger.info(`Performing DNS lookup for domain: ${domain}`);
    
    // Sanitize input to prevent injection
    if (!/^[a-zA-Z0-9.-]+$/.test(domain)) {
      throw new Error('Invalid domain format');
    }
    
    // Get A records (IPv4)
    const aRecords = await dnsResolveAsync(domain, 'A').catch(() => []);
    
    // Get AAAA records (IPv6)
    const aaaaRecords = await dnsResolveAsync(domain, 'AAAA').catch(() => []);
    
    // Get MX records
    const mxRecords = await dnsResolveAsync(domain, 'MX').catch(() => []);
    
    // Get NS records
    const nsRecords = await dnsResolveAsync(domain, 'NS').catch(() => []);
    
    // Get TXT records
    const txtRecords = await dnsResolveAsync(domain, 'TXT').catch(() => []);
    
    return {
      domain,
      timestamp: new Date().toISOString(),
      records: {
        A: aRecords,
        AAAA: aaaaRecords,
        MX: mxRecords,
        NS: nsRecords,
        TXT: txtRecords
      }
    };
  } catch (error) {
    logger.error(`Error in dnsLookup: ${error.message}`);
    throw error;
  }
};

/**
 * Parse traceroute output (simplified implementation)
 * @param {string} output - Command output
 * @param {boolean} isWindows - Whether the platform is Windows
 * @returns {Array} Array of hop objects
 */
function parseTracerouteOutput(output, isWindows) {
  const lines = output.split('\n');
  const hops = [];
  
  if (isWindows) {
    // Parse Windows tracert format
    for (let i = 4; i < lines.length - 2; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const match = line.match(/^\s*(\d+)\s+(\*|\d+\s+ms)\s+(\*|\d+\s+ms)\s+(\*|\d+\s+ms)\s+(.*)$/);
      if (match) {
        const hop = parseInt(match[1]);
        const rtt1 = match[2] === '*' ? null : parseFloat(match[2]);
        const rtt2 = match[3] === '*' ? null : parseFloat(match[3]);
        const rtt3 = match[4] === '*' ? null : parseFloat(match[4]);
        const ip = match[5] || null;
        
        const rtts = [rtt1, rtt2, rtt3].filter(r => r !== null);
        const avgRtt = rtts.length ? rtts.reduce((a, b) => a + b, 0) / rtts.length : null;
        
        hops.push({
          hop,
          ip,
          rtt: avgRtt,
          status: avgRtt !== null ? 'success' : 'timeout'
        });
      }
    }
  } else {
    // Parse Unix/Linux traceroute format
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const match = line.match(/^\s*(\d+)\s+(?:(\d+\.\d+\.\d+\.\d+)|(\*))\s+(?:(\d+\.\d+)\s+ms\s+)?(?:(\d+\.\d+)\s+ms\s+)?(?:(\d+\.\d+)\s+ms)?/);
      if (match) {
        const hop = parseInt(match[1]);
        const ip = match[2] || null;
        const rtt1 = match[4] ? parseFloat(match[4]) : null;
        const rtt2 = match[5] ? parseFloat(match[5]) : null;
        const rtt3 = match[6] ? parseFloat(match[6]) : null;
        
        const rtts = [rtt1, rtt2, rtt3].filter(r => r !== null);
        const avgRtt = rtts.length ? rtts.reduce((a, b) => a + b, 0) / rtts.length : null;
        
        hops.push({
          hop,
          ip,
          rtt: avgRtt,
          status: ip ? 'success' : 'timeout'
        });
      }
    }
  }
  
  return hops;
} 