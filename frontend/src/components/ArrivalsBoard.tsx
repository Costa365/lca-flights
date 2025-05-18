import React from 'react';
import { Flight } from '../types/flight';
import FlightRow from './FlightRow';
import { useFlightData } from '../hooks/useFlightData';
import { RotateCcw } from 'lucide-react';

const ArrivalsBoard: React.FC = () => {
  const { flights, loading, error, lastUpdated, refreshData } = useFlightData({
    refreshInterval: 60000 // Refresh every minute
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
      <header className="bg-yellow-400 p-4 sticky top-0 z-10">
        <div className="container mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-center flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                width="48"
                height="48"
                className="mr-2"
                aria-label="Arrivals"
              >
                <g>
                  <rect x="0" y="0" width="100" height="100" fill="#000" rx="2" />
                  <rect x="10" y="85" width="80" height="7" fill="#ffe600" rx="2" />
                  <path
                    d="M15 20 L25 23 L30 40 L60 50 L35 20 L45 22 L80 62 Q85 70 80 72 Q75 74 15 48 Q10 45 15 43 Z"
                    fill="#ffe600"
                  />
                </g>
              </svg>
            LARNACA AIRPORT ARRIVALS
          </h1>
          <div className="flex justify-between items-center mt-2 text-sm">
            <p>Last updated: {formatLastUpdated()}</p>
            <button 
              onClick={() => refreshData()}
              className="bg-black hover:bg-blue-900 px-2 py-1 rounded flex items-center text-white"
              disabled={loading}
            >
              <RotateCcw size={14} className={`mr-1 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto">
        {/* Header row */}
        <div className="grid grid-cols-12 gap-1 py-2 px-2 bg-gray-800 font-semibold text-xs uppercase tracking-wider text-gray-300">
          <div className="col-span-4 md:col-span-2">Time</div>
          <div className="col-span-3 md:col-span-2">Flight</div>
          <div className="col-span-4 md:col-span-3">From</div>
          <div className="hidden md:block md:col-span-3">Airline</div>
          <div className="col-span-3 md:col-span-2">Status</div>
        </div>
        
        {loading && flights.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 w-8 bg-blue-500 rounded-full mb-4 animate-bounce"></div>
              <p className="text-lg">Loading flight information...</p>
            </div>
          </div>
        ) : (
          <div className="arrival-rows">
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
            <p className="text-xl">No arrivals information available</p>
          </div>
        )}
      </main>
      
      <footer className="bg-gray-900 border-t border-gray-800 p-4 mt-8">
        <div className="container mx-auto text-center text-sm text-gray-500">
          <p>This is a simulation of Larnaca Airport arrivals board</p>
          <p className="mt-1">Data is refreshed automatically every minute</p>
        </div>
      </footer>
    </div>
  );
};

export default ArrivalsBoard;