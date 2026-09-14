import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getRentals } from "../api/rentals";

const formatCurrency = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "Price unavailable";
  }

  return `₹${number.toLocaleString("en-IN")}`;
};

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  const [locality, setLocality] = useState("");
  const [bhk, setBhk] = useState("");

  const loadRentals = async (
    newOffset = 0,
    append = false
  ) => {
    try {
      setError("");

      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const data = await getRentals({
        offset: newOffset,
        limit: 50,
        locality,
        bhk,
      });

      const results = data.results || [];

      setRentals((current) =>
        append ? [...current, ...results] : results
      );

      setTotal(Number(data.total) || 0);
      setOffset(newOffset);
      setHasMore(Boolean(data.has_more));
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to load rentals.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadRentals();
  }, []);

  const applyFilters = () => {
    loadRentals(0, false);
  };

  const clearFilters = () => {
    setLocality("");
    setBhk("");

    setTimeout(() => {
      loadRentals(0, false);
    }, 0);
  };

  return (
    <>
      <Navbar />

      <main className="collection-page">
        <header className="collection-header">
          <div>
            <p className="eyebrow">RENTAL MARKET</p>

            <h1>Homes for rent.</h1>

            <p>
              Explore monthly rental opportunities and
              compare asking rents.
            </p>
          </div>

          <div className="results-count">
            <strong>
              {total.toLocaleString("en-IN")}
            </strong>
            <span>rentals</span>
          </div>
        </header>

        <section className="simple-filter-bar">
          <div>
            <label>Locality</label>

            <input
              value={locality}
              onChange={(e) =>
                setLocality(e.target.value)
              }
              placeholder="e.g. Yelahanka"
            />
          </div>

          <div>
            <label>Bedrooms</label>

            <select
              value={bhk}
              onChange={(e) =>
                setBhk(e.target.value)
              }
            >
              <option value="">Any BHK</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
            </select>
          </div>

          <button
            className="primary-button"
            onClick={applyFilters}
          >
            Apply
          </button>

          <button
            className="secondary-button"
            onClick={clearFilters}
          >
            Clear
          </button>
        </section>

        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading rentals...</p>
          </div>
        ) : rentals.length === 0 ? (
          <div className="empty-state">
            <h2>No rentals found</h2>
            <p>Try another locality or bedroom count.</p>
          </div>
        ) : (
          <>
            <div className="rental-grid">
              {rentals.map((rental) => (
                <article
                  className="rental-card"
                  key={
                    rental.rental_id ||
                    rental.id ||
                    `${rental.locality}-${rental.bedroom}-${rental.price}`
                  }
                >
                  <div className="rental-top">
                    <span>
                      {rental.property_type ||
                        "Residential"}
                    </span>

                    {rental.furnishing && (
                      <span>
                        {rental.furnishing}
                      </span>
                    )}
                  </div>

                  <h2>
                    {rental.apartment_name ||
                      rental.property_name ||
                      "Rental Property"}
                  </h2>

                  <p className="rental-location">
                    {rental.locality || "Location unavailable"}
                  </p>

                  <div className="rent-price">
                    {formatCurrency(
                      rental.monthly_rent ||
                        rental.rent ||
                        rental.price
                    )}
                    <small>/ month</small>
                  </div>

                  <div className="rental-details">
                    <div>
                      <span>Bedrooms</span>
                      <strong>
                        {rental.bedroom ||
                          rental.bhk ||
                          "—"}
                      </strong>
                    </div>

                    <div>
                      <span>Area</span>
                      <strong>
                        {rental.carpet_area
                          ? `${Number(
                              rental.carpet_area
                            ).toLocaleString(
                              "en-IN"
                            )} sqft`
                          : "—"}
                      </strong>
                    </div>

                    <div>
                      <span>Deposit</span>
                      <strong>
                        {formatCurrency(
                          rental.security_deposit ||
                            rental.deposit
                        )}
                      </strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {hasMore && (
              <div className="load-more-container">
                <button
                  className="load-more-button"
                  onClick={() =>
                    loadRentals(
                      offset + 50,
                      true
                    )
                  }
                  disabled={loadingMore}
                >
                  {loadingMore
                    ? "Loading..."
                    : "Load more rentals"}
                </button>

                <p>
                  Showing{" "}
                  {rentals.length.toLocaleString(
                    "en-IN"
                  )}{" "}
                  of{" "}
                  {total.toLocaleString("en-IN")}
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
};

export default Rentals;