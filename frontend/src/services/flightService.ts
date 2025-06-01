import { Flight } from '../types/flight';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function fetchFlights(type: 'arrivals' | 'departures'): Promise<Flight[]> {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const endpoint = type === 'arrivals' ? '/lca-arrivals' : '/lca-departures';
    const response = await axios.get(apiUrl + endpoint);
    const json = response.data;
    
    const flights: Flight[] = (json[type] || []).map((item: any) => ({
      flightNumber: item.Flight,
      airline: item.Airline,
      origin: type === 'arrivals' ? item.From : item.To,
      scheduledTime: item.Time,
      status: item.Status
    }));
    return flights;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw new Error('Failed to fetch flight data');
  }
}
