import { useState, useEffect } from 'react';
import { Flight } from '../types/flight';
import { fetchFlights } from '../services/flightService';

interface UseFlightDataOptions {
  refreshInterval?: number;
  initialData?: Flight[];
  type?: 'arrivals' | 'departures';
}

export function useFlightData({ refreshInterval = 120000, initialData = [], type = 'arrivals' }: UseFlightDataOptions = {}) {
  const [flights, setFlights] = useState<Flight[]>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchFlightData = async () => {
    try {
      setLoading(true);
      const data = await fetchFlights(type);
      setFlights(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch flight data'));
      console.error('Failed to fetch flight data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlightData();
    
    // Set up auto-refresh
    const intervalId = setInterval(fetchFlightData, refreshInterval);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [refreshInterval, type]);

  return {
    flights,
    loading,
    error,
    lastUpdated,
    refreshData: fetchFlightData
  };
}
