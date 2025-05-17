import { useState, useEffect } from 'react';
import { Flight } from '../types/flight';
import { fetchLarnacaArrivals } from '../services/flightService';

interface UseFlightDataOptions {
  refreshInterval?: number;
  initialData?: Flight[];
}

export function useFlightData({ refreshInterval = 60000, initialData = [] }: UseFlightDataOptions = {}) {
  const [flights, setFlights] = useState<Flight[]>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchFlights = async () => {
    try {
      setLoading(true);
      const data = await fetchLarnacaArrivals();
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
    fetchFlights();
    
    // Set up auto-refresh
    const intervalId = setInterval(fetchFlights, refreshInterval);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [refreshInterval]);

  return {
    flights,
    loading,
    error,
    lastUpdated,
    refreshData: fetchFlights
  };
}