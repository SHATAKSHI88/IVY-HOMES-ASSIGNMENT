import { useEffect, useState } from "react";
import { getListings } from "../api/listings";
import ListingCard from "../components/ListingCard";
import Filters from "../components/Filters";
import Navbar from "../components/Navbar";

const emptyFilters = {
  locality: "",
  bhk: "",
  minPrice: "",
  maxPrice: "",
  furnishing: "",
};

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState(emptyFilters);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [error, setError] = useState("");

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  const loadListings = async ({
    newFilters = filters,
    newOffset = 0,
    append = false,
  } = {}) => {
    try {
      setError("");

      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const data = await getListings({
        offset: newOffset,
        limit: 50,
        locality: newFilters.locality,
        bhk: newFilters.bhk,
        minPrice: newFilters.minPrice,
        maxPrice: newFilters.maxPrice,
        furnishing: newFilters.furnishing,
      });

      const newResults = data.results || [];

      setListings((current) =>
        append ? [...current, ...newResults] : newResults
      );

      setTotal(Number(data.total) || 0);
      setOffset(newOffset);
      setHasMore(Boolean(data.has_more));
    } catch (err) {
      console.error("Listings error:", err);

      setError(
        err.message || "Unable to load listings."
      );

      if (!append) {
        setListings([]);
        setTotal(0);
        setHasMore(false);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadListings({
      newFilters: emptyFilters,
      newOffset: 0,
      append: false,
    });
  }, []);

  const handleApply = () => {
    loadListings({
      newFilters: filters,
      newOffset: 0,
      append: false,
    });
  };

  const handleClear = () => {
    setFilters({ ...emptyFilters });

    loadListings({
      newFilters: emptyFilters,
      newOffset: 0,
      append: false,
    });
  };

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) {
      return;
    }

    loadListings({
      newFilters: filters,
      newOffset: offset + 50,
      append: true,
    });
  };

  return (
    <>
      <Navbar />

      <main className="dashboard-page">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">IVY HOMES</p>

            <h1>Find your next home.</h1>

            <p className="dashboard-subtitle">
              Explore residential properties across
              leading neighbourhoods.
            </p>
          </div>

          <div className="results-count">
            <strong>
              {total.toLocaleString("en-IN")}
            </strong>

            <span>properties</span>
          </div>
        </header>

        <Filters
          filters={filters}
          setFilters={setFilters}
          onApply={handleApply}
          onClear={handleClear}
        />

        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading properties...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="empty-state">
            <h2>No properties found</h2>

            <p>
              Try changing your filters to see more
              listings.
            </p>
          </div>
        ) : (
          <>
            <div className="listings-grid">
              {listings.map((listing) => (
                <ListingCard
                  key={listing.listing_id}
                  listing={listing}
                />
              ))}
            </div>

            {hasMore && (
              <div className="load-more-container">
                <button
                  className="load-more-button"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  {loadingMore
                    ? "Loading..."
                    : "Load more properties"}
                </button>

                <p>
                  Showing{" "}
                  {listings.length.toLocaleString("en-IN")}{" "}
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

export default Listings;