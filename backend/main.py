import asyncio
import time
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from typing import List, Dict
import httpx
from bs4 import BeautifulSoup
import certifi
import ssl
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

URL = "https://www.hermesairports.com/flight-info/arrivals-and-departures-lca"

# In-memory cache
flight_cache = {
    "arrivals": [],
    "departures": [],
    "last_updated": 0
}

ssl_context = ssl.create_default_context()
ssl_context.load_verify_locations(cafile=certifi.where())

async def fetch_flights() -> Dict[str, List[Dict]]:
    async with httpx.AsyncClient(verify=ssl_context) as client:
        resp = await client.get(URL)
        soup = BeautifulSoup(resp.text, "html.parser")

        results = {"arrivals": [], "departures": []}
        for flight_type in ["arrivals", "departures"]:
            container_id = f"{flight_type}-results-container"
            container = soup.find("div", {"id": container_id})
            if not container:
                continue
            table = container.find("table")
            if not table:
                continue
            tbody = table.find("tbody")
            if not tbody:
                continue
            rows = tbody.find_all("tr")
            current_date = None
            for row in rows:
                # Check if this is a date row
                if "new-day-row" in row.get("class", []):
                    td = row.find("td", class_="date-text")
                    current_date = ' '.join(td.get_text(strip=True).split(' ')[4:]) if td else None
                    continue
                # Only process data rows
                if "inside-table-text" not in row.get("class", []):
                    continue
                cells = row.find_all("td")
                if len(cells) != 6:
                    continue
                try:
                    airline = cells[0].get_text(strip=True)
                    if airline == '':
                        airline_img = cells[0].find("img")
                        airline = airline_img["alt"].strip() if airline_img and "alt" in airline_img.attrs else ""
                    flight = cells[1].get_text(strip=True)
                    location = cells[2].get_text(strip=True)
                    time_ = cells[3].get_text(strip=True)
                    status = cells[4].get_text(strip=True)
                    # Combine date and time
                    date_time = f"{current_date} {time_}" if current_date else time_
                    flight_data = {
                        "Airline": airline.title(),
                        "Flight": flight,
                        "Time": date_time,
                        "Status": status,
                    }
                    if flight_type == "arrivals":
                        flight_data["From"] = location
                    else:
                        flight_data["To"] = location
                    results[flight_type].append(flight_data)
                except Exception as e:
                    print(f"Error processing row: {e}", flush=True)
                    continue
        return results


async def update_cache_periodically():
    while True:
        print("Fetching flights data - Started", flush=True)
        flights = await fetch_flights()
        print("Fetching flights data - Finished", flush=True)
        flight_cache["arrivals"] = flights["arrivals"]
        flight_cache["departures"] = flights["departures"]
        flight_cache["last_updated"] = int(time.time())
        await asyncio.sleep(300)  # 5 minutes

@asynccontextmanager
def lifespan(app: FastAPI):
    asyncio.create_task(update_cache_periodically())
    yield

app = FastAPI(lifespan=lifespan)

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this to your frontend's URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/lca-arrivals")
async def get_arrivals():
    return JSONResponse(content={
        "last_updated": flight_cache["last_updated"],
        "arrivals": flight_cache["arrivals"]
    })

@app.get("/lca-departures")
async def get_departures():
    return JSONResponse(content={
        "last_updated": flight_cache["last_updated"],
        "departures": flight_cache["departures"]
    })
