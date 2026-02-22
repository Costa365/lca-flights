# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LCA Flights displays real-time arrivals and departures for Larnaca International Airport (LCA). The backend scrapes [Hermes Airports](https://www.hermesairports.com/flight-info/arrivals-and-departures-lca) every 2 minutes and caches the data; the frontend polls the backend every 60 seconds and renders an airport flip-board style UI.

## Commands

### Frontend (from `frontend/`)
```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

### Backend tests
```bash
docker compose run --rm backend pytest
```

### Running the full stack
```bash
docker-compose up --build          # Development (hot reload, ports 8050/8051)
docker-compose -f docker-compose-prod.yml up --build  # Production
```

## Architecture

### Backend (`backend/main.py`)
- FastAPI app with two endpoints: `GET /lca-arrivals` and `GET /lca-departures`
- On startup, a background task (`update_cache_periodically`) scrapes the Hermes Airports page every 2 minutes using `httpx` + `BeautifulSoup4`, storing results in an in-memory dict
- Requests always return the cached data immediately; the cache is never invalidated, only refreshed
- HTML parsing identifies flights by looking for date header rows followed by data rows with specific CSS classes

### Frontend (`frontend/src/`)
- `App.tsx` manages the active tab (Arrivals/Departures) and renders the appropriate board
- `ArrivalsBoard` / `DeparturesBoard` use the `useFlightData` hook, which auto-refreshes at a configurable interval
- `FlightRow` renders a single flight; it tries to load an airline logo GIF from `public/images/` using a 2-letter IATA code, falls back to a 1-letter code, then falls back to plain text
- `FlipDisplay` creates the 3D CSS flip animation (500ms) seen on airport split-flap boards — it triggers on value changes

### Airline Logos
PNG/GIF logos live in `frontend/public/images/`. Filenames must match the 2-letter IATA airline code (e.g., `U2.gif` for easyJet). The fallback chain in `FlightRow` is: 2-letter code → 1-letter code → display airline name as text.

### Environment variable
`VITE_API_URL` controls the backend URL the frontend calls. Set in Docker Compose or a `.env` file.

### Infrastructure
- Dev: Vite HMR on one port, FastAPI with `--reload` on another
- Prod: Multi-stage Docker build (Node builder → nginx), served behind an external `nginx-proxy` network for SSL termination
