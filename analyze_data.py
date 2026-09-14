import json
from collections import Counter, defaultdict
from datetime import datetime

REFERENCE = datetime.fromisoformat("2026-09-10T00:00:00+05:30")
SEVEN_DAYS_BEFORE = REFERENCE.timestamp() - 7 * 24 * 60 * 60


def load(filename):
    with open(filename, "r", encoding="utf-8") as f:
        return json.load(f)


listings = load("all_listings.json")
rentals = load("all_rentals.json")
projects = load("all_projects.json")


# ---------------------------------------------------------
# Q1. Total listing records
# ---------------------------------------------------------

q1 = len(listings)


# ---------------------------------------------------------
# Q2. Unique physical properties
# ---------------------------------------------------------

# We use the strongest matching signature available in the data.
# Records with the same apartment, locality, BHK, floor,
# carpet area, super built-up area and parking/facing are
# treated as the same physical property.

property_keys = set()

for x in listings:
    key = (
        x.get("apartment_name"),
        x.get("locality"),
        x.get("bedroom"),
        x.get("floor"),
        x.get("carpet_area"),
        x.get("super_built_up_area"),
    )
    property_keys.add(key)

q2 = len(property_keys)


# ---------------------------------------------------------
# Q3. Active/live listings
# ---------------------------------------------------------

q3 = sum(
    1 for x in listings
    if x.get("is_live") is True
)


# ---------------------------------------------------------
# Q4. Corrupt listing IDs
# ---------------------------------------------------------

corrupt_ids = sorted(
    x["listing_id"]
    for x in listings
    if isinstance(x.get("price"), (int, float))
    and x["price"] < 0
)

q4 = corrupt_ids


# ---------------------------------------------------------
# Q5. Total monthly rent in Yelahanka
# ---------------------------------------------------------

yelahanka_rentals = [
    x for x in rentals
    if str(x.get("locality", "")).strip().lower() == "yelahanka"
]

q5 = sum(
    x.get("price", 0)
    for x in yelahanka_rentals
    if isinstance(x.get("price"), (int, float))
)


# ---------------------------------------------------------
# Q6. Mean price / carpet area for live 2-BHK listings
# Excluding Q4 and Q9 IDs
# ---------------------------------------------------------

# Fake candidates are very-low positive prices.
# We identify them below as positive prices under ₹100,000.

fake_ids = {
    x["listing_id"]
    for x in listings
    if isinstance(x.get("price"), (int, float))
    and 0 < x["price"] < 100000
}

excluded_ids = set(corrupt_ids) | fake_ids

q6_values = []

for x in listings:
    if x.get("listing_id") in excluded_ids:
        continue

    if x.get("is_live") is not True:
        continue

    if x.get("bedroom") != 2:
        continue

    price = x.get("price")
    carpet = x.get("carpet_area")

    if not isinstance(price, (int, float)):
        continue

    if not isinstance(carpet, (int, float)) or carpet <= 0:
        continue

    q6_values.append(price / carpet)

q6 = sum(q6_values) / len(q6_values)


# ---------------------------------------------------------
# Q7. Project with highest maximum price
# ---------------------------------------------------------

highest_project = max(
    projects,
    key=lambda x: x.get("price_max", float("-inf"))
)

q7_project_id = highest_project.get("project_id")
q7_price_max_crore = highest_project.get("price_max")

# Project prices are reported in crore in the actual data.
q7_price_max_inr = q7_price_max_crore * 10_000_000


# ---------------------------------------------------------
# Q8. Listings posted in [REFERENCE-7d, REFERENCE)
# ---------------------------------------------------------

start_timestamp = SEVEN_DAYS_BEFORE
end_timestamp = REFERENCE.timestamp()

q8 = 0

for x in listings:
    posted_at = x.get("posted_at")

    if not posted_at:
        continue

    try:
        dt = datetime.fromisoformat(posted_at.replace("Z", "+00:00"))

        # Treat naive timestamps as IST because the assignment
        # reference is explicitly given in IST.
        if dt.tzinfo is None:
            dt = dt.replace(tzinfo=REFERENCE.tzinfo)

        timestamp = dt.timestamp()

        if start_timestamp <= timestamp < end_timestamp:
            q8 += 1

    except ValueError:
        continue


# ---------------------------------------------------------
# Q9. Fake listing IDs
# ---------------------------------------------------------

q9 = sorted(fake_ids)


# ---------------------------------------------------------
# Q10. Projects whose reported listing count is wrong
# ---------------------------------------------------------

actual_project_counts = Counter(
    x.get("project_id")
    for x in listings
    if x.get("project_id")
)

q10 = 0
project_mismatches = []

for project in projects:
    project_id = project.get("project_id")

    reported = project.get("total_listings", 0)
    actual = actual_project_counts.get(project_id, 0)

    if reported != actual:
        q10 += 1
        project_mismatches.append({
            "project_id": project_id,
            "reported": reported,
            "actual": actual
        })


# ---------------------------------------------------------
# Print results
# ---------------------------------------------------------

print("\n========================================")
print("IVY HOMES — STAGE 1 ANSWERS")
print("========================================\n")

print(f"Q1 Total listing records: {q1}")

print(f"Q2 Unique physical properties: {q2}")

print(f"Q3 Active listings: {q3}")

print("Q4 Corrupt listing IDs:")
for listing_id in q4:
    print(f"  {listing_id}")

print(f"\nQ5 Yelahanka monthly rent sum: ₹{q5}")

print(
    f"\nQ6 Mean price/carpet area: "
    f"₹{q6:.2f} per sq ft"
)

print("\nQ7 Highest project maximum price:")
print(f"  project_id: {q7_project_id}")
print(f"  price_max_inr: ₹{q7_price_max_inr:.0f}")

print(f"\nQ8 Listings posted in 7-day window: {q8}")

print("\nQ9 Fake listing IDs:")
for listing_id in q9:
    print(f"  {listing_id}")

print(
    f"\nQ10 Projects with incorrect reported "
    f"listing count: {q10}"
)

print("\n========================================")