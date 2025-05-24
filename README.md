# LCA Flight Info API

This project provides a FastEdge-based Python API to scrape and serve arrival and departure flight information from Larnaca Airport (LCA). It also include a React frontend for showing the information in the style of an airport information board.

## Features
- Scrapes https://www.hermesairports.com/flight-info/arrivals-and-departures-lca every 2 minutes
- Exposes two endpoints:
  - `/lca-arrivals` — Returns latest arrivals as JSON
  - `/lca-departures` — Returns latest departures as JSON
- Dockerfile and docker-compose for easy development and deployment
- Includes unit tests

## Development

### Requirements
- Docker
- docker-compose

### Running the App

```
docker-compose up --build
```

The frontend will be available at `http://localhost:8050` and the API will be available at `http://localhost:8051`.

## Endpoints
- `GET /lca-arrivals`
- `GET /lca-departures`

## Testing

```
docker compose run --rm backend pytest
```

---

This project is for educational and demonstration purposes and is not affiliated with Hermes Airports.
