import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_lca_arrivals():
    response = client.get("/lca-arrivals")
    assert response.status_code == 200
    data = response.json()
    assert "arrivals" in data
    assert "last_updated" in data
    assert isinstance(data["arrivals"], list)

def test_lca_departures():
    response = client.get("/lca-departures")
    assert response.status_code == 200
    data = response.json()
    assert "departures" in data
    assert "last_updated" in data
    assert isinstance(data["departures"], list)
