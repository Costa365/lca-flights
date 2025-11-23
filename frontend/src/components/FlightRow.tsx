import React, { useEffect, useState } from 'react';
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
  const [imageIndex, setImageIndex] = useState(0);
  const [showName, setShowName] = useState(false);

  useEffect(() => {
    // Reset image attempts when flight changes
    setImageIndex(0);
    setShowName(false);
  }, [flight.flightNumber]);

  return (
    <div className={`grid grid-cols-12 gap-0.5 py-1 px-1 items-center text-xs sm:text-sm font-digital ${rowClass}`}>
      <div className="col-span-2 min-w-[3rem] pl-2">
        <FlipDisplay value={flight.scheduledTime} className="text-xs sm:text-sm" />
      </div>
      
      <div className="col-span-2 min-w-[3.5rem] pl-2">
        <FlipDisplay value={flight.flightNumber} className="text-xs sm:text-sm" />
      </div>
      
      <div className="col-span-3 overflow-hidden min-w-[3.5rem] pl-2">
        <FlipDisplay 
          value={flight.origin} 
          className="text-xs sm:text-sm" 
        />
      </div>
      
      <div className="col-span-2 overflow-hidden min-w-[4rem] pl-2 flex items-center">
        {(() => {
          // Build candidate airline codes: prefer first 2 alphanumerics, then first 1
          const normalized = (flight.flightNumber || '').replace(/[^A-Za-z0-9]/g, '');
          const firstTwo = normalized ? normalized.slice(0, 2).toUpperCase() : '';
          const firstOne = normalized ? normalized.slice(0, 1).toUpperCase() : '';
          const candidates = Array.from(new Set([firstTwo, firstOne].filter(Boolean)));
          const code = candidates[imageIndex] || null;
          const logoSrc = code ? `/images/${code}.gif` : null;

          if (logoSrc && !showName) {
            return (
              <img
                src={logoSrc}
                alt={`${flight.airline} logo`}
                className="h-6 w-auto object-contain"
                onError={() => {
                  if (imageIndex < candidates.length - 1) {
                    setImageIndex(i => i + 1);
                  } else {
                    setShowName(true);
                  }
                }}
              />
            );
          }

          return (
            <FlipDisplay 
              value={flight.airline} 
              className="text-xs sm:text-sm" 
            />
          );
        })()}
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