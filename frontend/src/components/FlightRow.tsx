import React from 'react';
import { Flight } from '../types/flight';
import FlipDisplay from './FlipDisplay';

interface FlightRowProps {
  flight: Flight;
  isAlternate?: boolean;
}

const FlightRow: React.FC<FlightRowProps> = ({ flight, isAlternate = false }) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'LANDED':
        return 'text-green-400';
      case 'DELAYED':
        return 'text-amber-400';
      case 'CANCELLED':
        return 'text-red-500';
      case 'IN_AIR':
        return 'text-blue-400';
      default:
        return 'text-white';
    }
  };

  const rowClass = isAlternate 
    ? 'bg-gray-900 border-b border-gray-800' 
    : 'bg-black border-b border-gray-800';

  return (
    <div className={`grid grid-cols-12 gap-1 py-3 px-2 items-center ${rowClass}`}>
      <div className="col-span-4 md:col-span-2">
        <FlipDisplay value={flight.scheduledTime} className="text-sm md:text-base" />
      </div>
      
      <div className="col-span-3 md:col-span-2 font-mono">
        <FlipDisplay value={flight.flightNumber} className="text-sm md:text-base" />
      </div>
      
      <div className="col-span-4 md:col-span-3 truncate">
        <FlipDisplay value={flight.origin} className="text-sm md:text-base" />
      </div>
      
      <div className="hidden md:block md:col-span-3 truncate">
        <FlipDisplay value={flight.airline} className="text-sm md:text-base" />
      </div>
      
      <div className={`col-span-3 md:col-span-2 font-mono ${getStatusClass(flight.status)}`}>
        <FlipDisplay 
          value={flight.status} 
          className="text-sm md:text-base" 
          dark={false}
        />
      </div>
    </div>
  );
};

export default FlightRow;