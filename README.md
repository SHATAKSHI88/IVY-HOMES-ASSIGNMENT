# Ivy Homes Software Engineering Internship Assignment

## Candidate

**Shatakshi Pandey**

## Overview

This repository contains my submission for the Ivy Homes Software Engineering Internship Assignment.

The submission covers:

* Investigation of the Ivy Homes API
* Data extraction and analysis
* Answers to all 10 Stage 1 questions
* API documentation vs. actual API behavior analysis
* Data-quality and consistency checks
* A React-based property discovery application
* Property listings, rentals, projects and market insights
* Property detail pages
* Saved-property / shortlist functionality
* Authentication and protected routes
* Responsive premium real-estate UI
* Reproducible analysis and findings

---

# Application

The frontend is built with **React + Vite** and provides a property discovery experience around the Ivy Homes API.

### Main features

* Authentication using the Ivy Homes API
* Support for all three assignment demo accounts
* Property listing discovery
* Locality, BHK, budget and furnishing filters
* Property detail pages
* Save and remove properties from shortlist
* Saved properties page
* Rental listings
* Project listings
* Market insights dashboard
* Responsive navigation and layouts
* Protected pages for authenticated users
* Loading, empty and error states

### Demo accounts

The assignment provides three demo accounts:

| Account           | Password                            |
| ----------------- | ----------------------------------- |
| `demo1@ivy.homes` | Assignment-provided shared password |
| `demo2@ivy.homes` | Assignment-provided shared password |
| `demo3@ivy.homes` | Assignment-provided shared password |

The login form accepts the credentials entered by the user and sends them to the Ivy Homes authentication API.

---

# Project Structure

```text
IVY-HOMES-ASSIGNMENT/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
├── submission.json
├── README.md
└── .gitignore
```

---

# How to Run the Frontend

## Requirements

* Node.js
* npm
* Internet connection
* Valid Ivy Homes API credentials/configuration

## Install dependencies

```bash
cd frontend
npm install
```

## Configure environment variables

Create the required local environment file according to the API configuration used by the project.

Do not commit API keys, tokens, passwords or other secrets to GitHub.

## Start development server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173/
```

## Production build

```bash
npm run build
```

The final production build was verified successfully during development.

---

# Stage 1 Answers

| Question                                   |                    Answer |
| ------------------------------------------ | ------------------------: |
| Q1. Total listing records                  |                  **4700** |
| Q2. Unique physical properties             |                  **4699** |
| Q3. Active listings                        |                  **3722** |
| Q4. Corrupt listing IDs                    |                     **8** |
| Q5. Yelahanka monthly rent sum             |            **₹5,769,800** |
| Q6. Mean price / carpet area               |       **₹21,040.17/sqft** |
| Q7. Highest project maximum price          | **P10068 — ₹998,000,000** |
| Q8. Listings posted in the 7-day window    |                   **149** |
| Q9. Fake listing IDs                       |                     **8** |
| Q10. Projects with incorrect listing count |                   **392** |

The exact machine-readable answers and findings are stored in:

```text
submission.json
```

---

# API Investigation Findings

During implementation, the documented API behavior was compared with the actual responses returned by the service.

## Listings response structure

The actual listings response used:

```json
{
  "limit": 50,
  "offset": 0,
  "count": 50,
  "total": 4415,
  "has_more": true,
  "results": []
}
```

The frontend therefore uses the actual `results` field returned by the API.

## Pagination

Although the API documentation describes a larger maximum page size, the actual listings endpoint returned a maximum of **50 records per request** when tested.

The analysis retrieved:

* **4700 listing records**
* **520 project records**
* **1900 rental records**

The API-reported totals differed from the number of records retrieved in the analysis, so the discrepancy was documented rather than silently ignored.

## Listing detail endpoint

The actual listing-detail endpoint used during testing was:

```text
/v1/listings/{listing_id}
```

rather than the documented singular-path variant.

## Authentication

The actual access-token lifetime observed during testing was approximately **900 seconds**, so the frontend uses the returned `expires_in` value and falls back to 900 seconds when it is not supplied.

A refresh-token flow is also implemented.

## Missing / inconsistent endpoints

Some endpoints described in the documentation did not behave as documented during testing.

Examples include:

```text
/v1/analytics/summary
/v1/favourites
```

These discrepancies were recorded as API observations rather than being treated as frontend errors.

---

# Data Quality Findings

The API data was inspected for duplicates, corrupt records and suspicious listings.

## Duplicate physical property

Two listing records were identified as representing the same physical property:

```text
100-1003687
MAG-1004174
```

They matched on key property attributes such as apartment, locality, BHK, floor and area.

This contributed to the distinction between total listing records and unique physical properties.

## Corrupt listing IDs

The following listing IDs were identified as corrupt:

```text
100-1002346
DWE-1001165
DWE-1001183
DWE-1001909
SQU-1000979
SQU-1002843
ZER-1001207
ZER-1002632
```

## Suspicious / fake listings

The following IDs were identified as suspicious based on the analysis criteria:

```text
100-1002501
DWE-1002631
DWE-1003102
MAG-1003492
SQU-1001431
SQU-1003524
ZER-1003652
ZER-1003813
```

The fake-listing analysis prioritised **precision over recall**, as requested by the assignment methodology.

## Project listing-count discrepancy

A total of **392 projects** were identified where the reported listing count did not match the listing data observed during analysis.

---

# Implementation Notes

The application was designed so that:

* Users must authenticate before accessing protected application pages.
* The login form is generic and supports all three assignment demo accounts.
* Authentication tokens are stored locally for the active session.
* Refresh tokens are used when available.
* Listing detail pages preserve the selected property and can also fetch the property directly by ID.
* Saved properties are associated with the current user context.
* API behavior discovered during testing is handled in the frontend rather than relying solely on assumptions from the documentation.

---

# Technologies Used

### Frontend

* React
* Vite
* React Router
* JavaScript
* CSS

### API / Data Analysis

* Ivy Homes API
* Python
* Requests
* python-dotenv

### Development Tools

* Git
* GitHub
* VS Code / Notepad
* PowerShell

---

# LLM Usage Disclosure

LLM assistance was used during development for:

* debugging API integration
* reasoning about API response structures
* interpreting data-analysis results
* frontend implementation assistance
* UI/UX refinement
* debugging JavaScript/JSX/CSS issues
* improving documentation

The API investigation, data extraction, application behavior and final implementation were tested against the actual Ivy Homes service.

---

# Known Limitations

The application depends on the availability and behavior of the Ivy Homes API.

Some API behaviors observed during implementation differed from the supplied documentation, including response structures, pagination behavior, endpoint availability and reported dataset totals. These differences are documented above.

Saved properties are maintained on the client side rather than through the unavailable favourites endpoint.

---

# If I Had Two More Days

With additional development time, I would focus on:

* Adding richer property photography and image galleries
* Adding more advanced locality and price comparisons
* Improving market-insight visualisations
* Moving saved properties to a persistent backend service
* Adding automated API regression and data-quality tests
* Improving pagination and advanced search controls
* Adding stronger accessibility and keyboard-navigation coverage

---

# Submission

The GitHub repository contains the completed application source code, analysis deliverables and documentation for the Ivy Homes Software Engineering Internship Assignment.
