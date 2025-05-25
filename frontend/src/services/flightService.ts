import { Flight } from '../types/flight';
import axios from 'axios';
import * as cheerio from 'cheerio';

export async function fetchLarnacaArrivals(): Promise<Flight[]> {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await axios.get(apiUrl+'/lca-arrivals');
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
