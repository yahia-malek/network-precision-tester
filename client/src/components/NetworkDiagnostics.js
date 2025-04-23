import React, { useState } from 'react';
import { networkDiagnostics } from '../utils/api';

const NetworkDiagnostics = () => {
  const [activeTab, setActiveTab] = useState('ping');
  
  const [pingHost, setPingHost] = useState('google.com');
  const [pingCount, setPingCount] = useState(5);
  const [pingResult, setPingResult] = useState(null);
  const [pingLoading, setPingLoading] = useState(false);
  const [pingError, setPingError] = useState(null);
  
  const [traceHost, setTraceHost] = useState('google.com');
  const [traceResult, setTraceResult] = useState(null);
  const [traceLoading, setTraceLoading] = useState(false);
  const [traceError, setTraceError] = useState(null);
  
  const [dnsDomain, setDnsDomain] = useState('google.com');
  const [dnsResult, setDnsResult] = useState(null);
  const [dnsLoading, setDnsLoading] = useState(false);
  const [dnsError, setDnsError] = useState(null);
  
  // Handle ping test
  const handlePingTest = async (e) => {
    e.preventDefault();
    setPingError(null);
    setPingResult(null);
    setPingLoading(true);
    
    try {
      // Validate the host (simple validation)
      if (!pingHost.trim()) {
        throw new Error('Please enter a valid hostname or IP address');
      }
      
      const data = await networkDiagnostics.pingHost(pingHost, pingCount);
      setPingResult(data);
    } catch (error) {
      console.error('Ping test error:', error);
      setPingError(error.message || 'An error occurred while performing the ping test');
    } finally {
      setPingLoading(false);
    }
  };
  
  // Handle traceroute test
  const handleTraceRouteTest = async (e) => {
    e.preventDefault();
    setTraceError(null);
    setTraceResult(null);
    setTraceLoading(true);
    
    try {
      // Validate the host (simple validation)
      if (!traceHost.trim()) {
        throw new Error('Please enter a valid hostname or IP address');
      }
      
      const data = await networkDiagnostics.traceRoute(traceHost);
      setTraceResult(data);
    } catch (error) {
      console.error('Traceroute error:', error);
      setTraceError(error.message || 'An error occurred while performing the traceroute');
    } finally {
      setTraceLoading(false);
    }
  };
  
  // Handle DNS lookup
  const handleDnsLookup = async (e) => {
    e.preventDefault();
    setDnsError(null);
    setDnsResult(null);
    setDnsLoading(true);
    
    try {
      // Validate the domain (simple validation)
      if (!dnsDomain.trim()) {
        throw new Error('Please enter a valid domain name');
      }
      
      const data = await networkDiagnostics.dnsLookup(dnsDomain);
      setDnsResult(data);
    } catch (error) {
      console.error('DNS lookup error:', error);
      setDnsError(error.message || 'An error occurred while performing the DNS lookup');
    } finally {
      setDnsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Network Diagnostics</h1>
      
      {/* Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap border-b border-gray-200">
          <button
            className={`px-6 py-3 text-lg font-medium rounded-t-lg ${
              activeTab === 'ping'
                ? 'bg-white text-blue-600 border-l border-t border-r border-gray-200'
                : 'bg-gray-50 text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('ping')}
          >
            Ping Test
          </button>
          <button
            className={`px-6 py-3 text-lg font-medium rounded-t-lg ${
              activeTab === 'traceroute'
                ? 'bg-white text-blue-600 border-l border-t border-r border-gray-200'
                : 'bg-gray-50 text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('traceroute')}
          >
            Traceroute
          </button>
          <button
            className={`px-6 py-3 text-lg font-medium rounded-t-lg ${
              activeTab === 'dns'
                ? 'bg-white text-blue-600 border-l border-t border-r border-gray-200'
                : 'bg-gray-50 text-gray-600 hover:text-blue-600'
            }`}
            onClick={() => setActiveTab('dns')}
          >
            DNS Lookup
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        {/* Ping Test */}
        {activeTab === 'ping' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Ping Test</h2>
            <p className="text-gray-600 mb-6">
              Ping measures the round-trip time for messages sent from your device to a destination server.
              It helps determine network latency and packet loss.
            </p>
            
            <form onSubmit={handlePingTest} className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="pingHost" className="block text-gray-700 text-sm font-bold mb-2">
                    Host / IP Address
                  </label>
                  <input
                    id="pingHost"
                    type="text"
                    value={pingHost}
                    onChange={(e) => setPingHost(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., google.com or 8.8.8.8"
                  />
                </div>
                <div>
                  <label htmlFor="pingCount" className="block text-gray-700 text-sm font-bold mb-2">
                    Number of Pings
                  </label>
                  <input
                    id="pingCount"
                    type="number"
                    min="1"
                    max="10"
                    value={pingCount}
                    onChange={(e) => setPingCount(parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                disabled={pingLoading}
              >
                {pingLoading ? 'Running Test...' : 'Start Ping Test'}
              </button>
            </form>
            
            {/* Ping Results */}
            {pingError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                <p className="font-bold">Error:</p>
                <p>{pingError}</p>
              </div>
            )}
            
            {pingResult && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Ping Results for {pingResult.host}</h3>
                
                {/* Summary */}
                <div className="bg-white p-4 mb-4 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-2">Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Transmitted</div>
                      <div className="text-lg font-bold">{pingResult.summary.transmitted}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Received</div>
                      <div className="text-lg font-bold">{pingResult.summary.received}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Packet Loss</div>
                      <div className="text-lg font-bold">{pingResult.summary.packetLoss}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Avg. Ping</div>
                      <div className="text-lg font-bold">{pingResult.summary.avg} ms</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">Min/Max</div>
                      <div className="text-lg font-bold">{pingResult.summary.min}/{pingResult.summary.max} ms</div>
                    </div>
                  </div>
                </div>
                
                {/* Detailed Results */}
                <h4 className="font-medium text-gray-700 mb-2">Detailed Results</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 text-left">Seq</th>
                        <th className="py-2 px-4 text-left">Status</th>
                        <th className="py-2 px-4 text-left">Time</th>
                        <th className="py-2 px-4 text-left">TTL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pingResult.results.map((ping) => (
                        <tr key={ping.seq} className="border-t border-gray-200">
                          <td className="py-2 px-4">{ping.seq}</td>
                          <td className="py-2 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              ping.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {ping.status === 'success' ? 'Success' : 'Failed'}
                            </span>
                          </td>
                          <td className="py-2 px-4">{ping.rtt !== null ? `${ping.rtt.toFixed(2)} ms` : '-'}</td>
                          <td className="py-2 px-4">{ping.ttl || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Traceroute */}
        {activeTab === 'traceroute' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Traceroute</h2>
            <p className="text-gray-600 mb-6">
              Traceroute tracks the path packets take from your device to a destination server, 
              showing all intermediate hops and the time it takes to reach each hop.
            </p>
            
            <form onSubmit={handleTraceRouteTest} className="mb-6">
              <div className="mb-6">
                <label htmlFor="traceHost" className="block text-gray-700 text-sm font-bold mb-2">
                  Host / IP Address
                </label>
                <input
                  id="traceHost"
                  type="text"
                  value={traceHost}
                  onChange={(e) => setTraceHost(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., google.com or 8.8.8.8"
                />
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                disabled={traceLoading}
              >
                {traceLoading ? 'Tracing Route...' : 'Start Traceroute'}
              </button>
            </form>
            
            {/* Warning about trace taking time */}
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg mb-6">
              <p className="font-medium">Please note:</p>
              <p>Traceroute can take up to a minute to complete depending on the destination.</p>
            </div>
            
            {/* Traceroute Results */}
            {traceError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                <p className="font-bold">Error:</p>
                <p>{traceError}</p>
              </div>
            )}
            
            {traceLoading && (
              <div className="text-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Tracing route to {traceHost}...</p>
                <p className="text-gray-500 text-sm">This may take up to a minute to complete.</p>
              </div>
            )}
            
            {traceResult && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Traceroute Results for {traceResult.host}</h3>
                
                {/* Hops */}
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 text-left">Hop</th>
                        <th className="py-2 px-4 text-left">IP Address</th>
                        <th className="py-2 px-4 text-left">RTT</th>
                        <th className="py-2 px-4 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {traceResult.hops.map((hop) => (
                        <tr key={hop.hop} className="border-t border-gray-200">
                          <td className="py-2 px-4">{hop.hop}</td>
                          <td className="py-2 px-4">{hop.ip || '*'}</td>
                          <td className="py-2 px-4">{hop.rtt !== null ? `${hop.rtt.toFixed(2)} ms` : '-'}</td>
                          <td className="py-2 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              hop.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {hop.status === 'success' ? 'Reached' : 'Timeout'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* DNS Lookup */}
        {activeTab === 'dns' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">DNS Lookup</h2>
            <p className="text-gray-600 mb-6">
              DNS (Domain Name System) lookup converts domain names to IP addresses and vice versa.
              This tool shows various DNS records for a domain.
            </p>
            
            <form onSubmit={handleDnsLookup} className="mb-6">
              <div className="mb-6">
                <label htmlFor="dnsDomain" className="block text-gray-700 text-sm font-bold mb-2">
                  Domain Name
                </label>
                <input
                  id="dnsDomain"
                  type="text"
                  value={dnsDomain}
                  onChange={(e) => setDnsDomain(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., google.com"
                />
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                disabled={dnsLoading}
              >
                {dnsLoading ? 'Looking Up...' : 'Lookup DNS Records'}
              </button>
            </form>
            
            {/* DNS Results */}
            {dnsError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                <p className="font-bold">Error:</p>
                <p>{dnsError}</p>
              </div>
            )}
            
            {dnsLoading && (
              <div className="text-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Looking up DNS records for {dnsDomain}...</p>
              </div>
            )}
            
            {dnsResult && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">DNS Results for {dnsResult.domain}</h3>
                
                {/* A Records */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">A Records (IPv4)</h4>
                  {dnsResult.records.A && dnsResult.records.A.length > 0 ? (
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <ul className="space-y-1">
                        {dnsResult.records.A.map((record, index) => (
                          <li key={index} className="font-mono">{record}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-gray-500">No A records found</p>
                  )}
                </div>
                
                {/* AAAA Records */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">AAAA Records (IPv6)</h4>
                  {dnsResult.records.AAAA && dnsResult.records.AAAA.length > 0 ? (
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <ul className="space-y-1">
                        {dnsResult.records.AAAA.map((record, index) => (
                          <li key={index} className="font-mono">{record}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-gray-500">No AAAA records found</p>
                  )}
                </div>
                
                {/* MX Records */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">MX Records (Mail Servers)</h4>
                  {dnsResult.records.MX && dnsResult.records.MX.length > 0 ? (
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <ul className="space-y-1">
                        {dnsResult.records.MX.map((record, index) => (
                          <li key={index} className="font-mono">
                            Priority: {record.priority} - Server: {record.exchange}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-gray-500">No MX records found</p>
                  )}
                </div>
                
                {/* NS Records */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-2">NS Records (Name Servers)</h4>
                  {dnsResult.records.NS && dnsResult.records.NS.length > 0 ? (
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <ul className="space-y-1">
                        {dnsResult.records.NS.map((record, index) => (
                          <li key={index} className="font-mono">{record}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-gray-500">No NS records found</p>
                  )}
                </div>
                
                {/* TXT Records */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">TXT Records</h4>
                  {dnsResult.records.TXT && dnsResult.records.TXT.length > 0 ? (
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <ul className="space-y-2">
                        {dnsResult.records.TXT.map((record, index) => (
                          <li key={index} className="font-mono break-all text-sm">{record.join(' ')}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <p className="text-gray-500">No TXT records found</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Information Box */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-blue-800 mb-4">About Network Diagnostics</h3>
        <p className="text-blue-700 mb-3">
          These diagnostic tools help identify network issues, troubleshoot connectivity problems, and gain insights into your internet connection's routing.
        </p>
        <ul className="space-y-2 text-blue-700">
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span><strong>Ping</strong> is useful for testing basic connectivity and measuring latency to servers.</span>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span><strong>Traceroute</strong> helps identify where packet loss or delays occur in your connection path.</span>
          </li>
          <li className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span><strong>DNS Lookup</strong> can diagnose DNS-related issues that might affect your ability to reach websites.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NetworkDiagnostics; 