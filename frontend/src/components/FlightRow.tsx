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
    <div className={`grid grid-cols-12 gap-0.5 py-1 px-1 items-center text-xs sm:text-sm font-digital ${rowClass}`}>
      <div className="col-span-2 min-w-[3rem] pl-2">
        <FlipDisplay value={flight.scheduledTime} className="text-xs sm:text-sm" />
      </div>
      
      <div className="col-span-2 min-w-[3.5rem] pl-2">
        <FlipDisplay value={flight.flightNumber} className="text-xs sm:text-sm" />
      </div>
      
      <div className="col-span-2 overflow-hidden min-w-[3.5rem] pl-2">
        <FlipDisplay 
          value={flight.origin} 
          className="text-xs sm:text-sm" 
        />
      </div>
      
      <div className="col-span-3 overflow-hidden min-w-[4rem] pl-2">
        <FlipDisplay 
          value={flight.airline} 
          className="text-xs sm:text-sm" 
        />
      </div>
      
      <div className="col-span-3 min-w-[4rem] pl-2">
        <FlipDisplay 
          value={flight.status} 
          className="text-xs sm:text-sm" 
          dark={true}
        />
      </div>
    </div>
  );
};

export default FlightRow;