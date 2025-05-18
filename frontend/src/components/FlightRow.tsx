import React from 'react';
import { Flight } from '../types/flight';
import FlipDisplay from './FlipDisplay';

interface FlightRowProps {
  flight: Flight;
  isAlternate?: boolean;
}

const FlightRow: React.FC<FlightRowProps> = ({ flight, isAlternate = false }) => {
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

      <div className="col-span-4 md:col-span-2">
        <FlipDisplay value={flight.status} className="text-sm md:text-base" />
      </div>
    </div>
  );
};

export default FlightRow;