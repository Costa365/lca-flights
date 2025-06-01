import React from 'react';
import { Flight } from '../types/flight';
import FlightRow from './FlightRow';
import { useFlightData } from '../hooks/useFlightData';
import { RotateCcw } from 'lucide-react';

const DeparturesBoard: React.FC = () => {
  const { flights, loading, error, lastUpdated, refreshData } = useFlightData({
    refreshInterval: 60000,
    type: 'departures'
  });
  
  const formatLastUpdated = () => {
    if (!lastUpdated) return '';
    
    return lastUpdated.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Flight Data</h2>
          <p className="mb-4">{error.message}</p>
          <button 
            onClick={() => refreshData()}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center mx-auto"
          >
            <RotateCcw size={16} className="mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 text-black">
      <div className="container mx-auto flex justify-between items-center py-2 px-4">
        <p className="text-sm text-gray-300">Last updated: {formatLastUpdated()}</p>
        <button 
          onClick={() => refreshData()}
          className="bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded flex items-center text-gray-300"
          disabled={loading}
        >
          <RotateCcw size={14} className={`mr-1 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      
      <main className="container mx-auto">
        {/* Header row */}
        <div className="grid grid-cols-12 gap-0.5 py-1 px-1 bg-gray-800 font-semibold text-[10px] md:text-xs uppercase tracking-wide text-gray-300">
          <div className="col-span-2 pl-2">Time</div>
          <div className="col-span-2 pl-2">Flight</div>
          <div className="col-span-2 pl-2">To</div>
          <div className="col-span-3 pl-2">Airline</div>
          <div className="col-span-3 pl-2">Status</div>
        </div>
        
        {loading && flights.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-8 bg-blue-500 rounded-full mb-4 animate-bounce"></div>
              <p className="text-lg">Loading flight information...</p>
            </div>
          </div>
        ) : (
          <div className="departure-rows">
            {flights.map((flight, index) => (
              <FlightRow 
                key={flight.flightNumber + index} 
                flight={flight} 
                isAlternate={index % 2 === 0}
              />
            ))}
          </div>
        )}
        
        {flights.length === 0 && !loading && (
          <div className="text-center py-10">
            <p className="text-xl">No departures information available</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DeparturesBoard;
