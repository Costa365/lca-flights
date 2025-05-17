import { Flight } from '../types/flight';
import axios from 'axios';
import * as cheerio from 'cheerio';

// In a real application, we would need a proxy server or edge function to bypass CORS
export async function fetchLarnacaArrivals(): Promise<Flight[]> {
  try {
    const response = await axios.get('http://127.0.0.1:8000/lca-arrivals');
    const json = response.data;
    // Each arrival has: Airline, Flight, From, Time, Status
    const flights: Flight[] = (json.arrivals || []).map((item: any) => ({
      flightNumber: item.Flight,
      airline: item.Airline,
      origin: item.From,
      scheduledTime: item.Time,
      status: item.Status
    }));
    return flights;
  } catch (error) {
    console.error('Error fetching flight data:', error);
    throw new Error('Failed to fetch flight data');
  }
}
