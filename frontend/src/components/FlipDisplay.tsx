import React, { useEffect, useState } from 'react';

interface FlipDisplayProps {
  value: string;
  className?: string;
  dark?: boolean;
}

const FlipDisplay: React.FC<FlipDisplayProps> = ({ value, className = '', dark = true }) => {
  const [previousValue, setPreviousValue] = useState<string>(value);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  
  useEffect(() => {
    if (value !== previousValue) {
      setIsFlipping(true);
      
      const timer = setTimeout(() => {
        setPreviousValue(value);
        setIsFlipping(false);
      }, 500); // Animation duration
      
      return () => clearTimeout(timer);
    }
  }, [value, previousValue]);
  
  const baseClasses = "inline-block font-digital tracking-wider relative overflow-hidden";
  const colorClasses = dark ? "bg-black text-yellow-300" : "bg-white text-black";
  
  return (
    <span 
      className={`${baseClasses} ${colorClasses} ${className} ${isFlipping ? 'animate-flip' : ''}`}
    >
      {previousValue}
    </span>
  );
};

export default FlipDisplay;