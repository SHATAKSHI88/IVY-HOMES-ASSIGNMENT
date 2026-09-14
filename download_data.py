import os
import json
import time
import requests
from dotenv import load_dotenv

load_dotenv()

BASE_URL = "https://solve.ivy.homes"
API_KEY = os.getenv("IVY_API_KEY")

if not API_KEY:
    raise RuntimeError("IVY_API_KEY is missing from .env")

HEADERS = {
    "X-API-Key": API_KEY
}


def get_all(endpoint):
    records = []
    offset = 0
    limit = 200

    while True:
        url = f"{BASE_URL}{endpoint}"
        params = {
            "limit": limit,
            "offset": offset
        }

        response = requests.get(
            url,
            headers=HEADERS,
            params=params,
            timeout=30
        )

        response.raise_for_status()
        data = response.json()

        batch = data.get("results", [])

        if not batch:
            break

        records.extend(batch)

        print(
            f"{endpoint}: downloaded {len(records)} "
            f"(offset={offset}, batch={len(batch)}, "
            f"reported_total={data.get('total')})"
        )

        if not data.get("has_more", False):
            break

        offset += len(batch)

        time.sleep(0.1)

    return records


def save(filename, data):
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Saved {len(data)} records to {filename}")


def main():
    print("Downloading listings...")
    listings = get_all("/v1/listings")
    save("all_listings.json", listings)

    print("\nDownloading rentals...")
    rentals = get_all("/v1/rentals")
    save("all_rentals.json", rentals)

    print("\nDownloading projects...")
    projects = get_all("/v1/projects")
    save("all_projects.json", projects)

    print("\nDownload complete.")


if __name__ == "__main__":
    main()