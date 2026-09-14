import os
import json
import time
import requests
from dotenv import load_dotenv

load_dotenv(override=True)

BASE_URL = "https://solve.ivy.homes"

API_KEY = os.getenv("IVY_API_KEY")
EMAIL = os.getenv("IVY_EMAIL")
PASSWORD = os.getenv("IVY_PASSWORD")

if not API_KEY:
    raise RuntimeError("IVY_API_KEY is missing from .env")

if not EMAIL:
    raise RuntimeError("IVY_EMAIL is missing from .env")

if not PASSWORD:
    raise RuntimeError("IVY_PASSWORD is missing from .env")


def login():
    print("Logging in...")

    response = requests.post(
        f"{BASE_URL}/auth/login",
        headers={
            "X-API-Key": API_KEY
        },
        json={
            "email": EMAIL,
            "password": PASSWORD
        },
        timeout=30
    )

    response.raise_for_status()

    data = response.json()

    token = data.get("access_token")

    if not token:
        raise RuntimeError("Login succeeded but no access token was returned")

    print("Login successful.")

    return token


def get_all(endpoint, token):
    records = []
    offset = 0

    # The API documentation says 200, but the API may enforce
    # a smaller actual limit. We detect that from the response.
    requested_limit = 200

    headers = {
        "X-API-Key": API_KEY,
        "Authorization": f"Bearer {token}"
    }

    while True:
        response = requests.get(
            f"{BASE_URL}{endpoint}",
            headers=headers,
            params={
                "limit": requested_limit,
                "offset": offset
            },
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
        json.dump(
            data,
            f,
            indent=2,
            ensure_ascii=False
        )

    print(f"Saved {len(data)} records to {filename}")


def main():
    token = login()

    print("\nDownloading listings...")
    listings = get_all("/v1/listings", token)
    save("all_listings.json", listings)

    print("\nDownloading rentals...")
    rentals = get_all("/v1/rentals", token)
    save("all_rentals.json", rentals)

    print("\nDownloading projects...")
    projects = get_all("/v1/projects", token)
    save("all_projects.json", projects)

    print("\nAll downloads completed successfully.")


if __name__ == "__main__":
    main()