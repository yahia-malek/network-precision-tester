import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servers } from '../utils/api';

const ServerSelection = () => {
  const [serverList, setServerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch servers on component mount
  useEffect(() => {
    const fetchServers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await servers.getAllServers();
        
        if (data && data.servers) {
          setServerList(data.servers);
        } else {
          setServerList([]);
        }
      } catch (error) {
        console.error('Error fetching servers:', error);
        setError('Failed to load server list. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServers();
  }, []);

  // Filter servers by region and search query
  const filteredServers = serverList.filter((server) => {
    const matchesRegion = selectedRegion === 'all' || server.region === selectedRegion;
    
    const matchesSearch = searchQuery === '' || 
      server.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      server.provider.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesRegion && matchesSearch;
  });

  // Get unique regions for filter dropdown
  const regions = ['all', ...new Set(serverList.map(server => server.region))];

  // Get server distance label
  const getDistanceLabel = (distance) => {
    if (!distance) return 'Unknown';
    if (distance < 10) return 'Very Close';
    if (distance < 50) return 'Close';
    if (distance < 500) return 'Medium';
    if (distance < 1000) return 'Far';
    return 'Very Far';
  };

  // Get connection quality based on distance
  const getConnectionQuality = (distance) => {
    if (!distance) return 'Unknown';
    if (distance < 100) return 'Excellent';
    if (distance < 500) return 'Good';
    if (distance < 1000) return 'Average';
    if (distance < 3000) return 'Fair';
    return 'Poor';
  };

  // Get color for connection quality
  const getQualityColor = (quality) => {
    switch (quality) {
      case 'Excellent':
        return 'text-green-600';
      case 'Good':
        return 'text-green-500';
      case 'Average':
        return 'text-yellow-500';
      case 'Fair':
        return 'text-orange-500';
      case 'Poor':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Test Servers</h1>
      
      {/* Filter and Search */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Region Filter */}
          <div>
            <label htmlFor="region-filter" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Region
            </label>
            <select
              id="region-filter"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region === 'all' ? 'All Regions' : region}
                </option>
              ))}
            </select>
          </div>
          
          {/* Search */}
          <div>
            <label htmlFor="server-search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Servers
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                id="server-search"
                type="text"
                placeholder="Search by name, location, or provider"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Server List */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading servers...</p>
          </div>
        </div>
      ) : error ? (
        <div className="text-center p-8 bg-red-50 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Retry
          </button>
        </div>
      ) : filteredServers.length === 0 ? (
        <div className="text-center p-8 bg-gray-50 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No Servers Found</h2>
          <p className="text-gray-600 mb-4">No servers match your current filters. Try adjusting your search criteria.</p>
          <button
            onClick={() => {
              setSelectedRegion('all');
              setSearchQuery('');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServers.map((server) => {
            const connectionQuality = getConnectionQuality(server.distance);
            const qualityColor = getQualityColor(connectionQuality);
            
            return (
              <div
                key={server.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-transform hover:transform hover:scale-105"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-800">{server.name}</h2>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      server.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {server.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-600">{server.location}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className="text-gray-600">{server.provider}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">{server.region}</span>
                    </div>
                    
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-gray-600">
                        Distance: {server.distance ? `${server.distance.toFixed(0)} km` : 'Unknown'} ({getDistanceLabel(server.distance)})
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-500">Connection Quality:</span>
                      <span className={`text-sm font-bold ${qualityColor}`}>{connectionQuality}</span>
                    </div>
                    
                    <Link
                      to={`/speedtest?server=${server.id}`}
                      className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                      Test with this Server
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Server Map */}
      <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Global Server Network</h2>
        <div className="aspect-w-16 aspect-h-9 map-container">
          <div className="bg-gray-200 h-full w-full flex items-center justify-center text-gray-500">
            <p>Server location map would be displayed here</p>
            {/* In a real application, integrate a map library like Google Maps, Mapbox, or Leaflet */}
          </div>
        </div>
        <p className="mt-4 text-gray-600 text-sm">
          Our global network of test servers provides accurate speed measurements across different regions.
          For the most accurate results, choose a server that is geographically close to your location.
        </p>
      </div>
    </div>
  );
};

export default ServerSelection; 