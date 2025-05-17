# LCA Flight Info API

This project provides a FastEdge-based Python API to scrape and serve arrival and departure flight information from Larnaca Airport (LCA).

## Features
- Scrapes https://www.hermesairports.com/flight-info/arrivals-and-departures-lca every 5 minutes
- Exposes two endpoints:
  - `/lca-arrivals` — Returns latest arrivals as JSON
  - `/lca-departures` — Returns latest departures as JSON
- Dockerfile and docker-compose for easy development and deployment
- Includes unit tests

## Development

### Requirements
- Docker
- docker-compose

### Running the API

```
docker-compose up --build
```

The API will be available at `http://localhost:8000`.

## Endpoints
- `GET /lca-arrivals`
- `GET /lca-departures`

## Testing

```
docker-compose run --rm api pytest
```

---

This project is for demonstration purposes and is not affiliated with Hermes Airports.
