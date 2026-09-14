import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Filters from "../components/Filters";
import ListingCard from "../components/ListingCard";
import { getListings } from "../api/listings";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchListings = async (activeFilters = {}) => {
    try {
      setLoading(true);
      setError("");

      const response = await getListings({
        offset: 0,
        limit: 50,
        locality: activeFilters.locality || "",
        bhk: activeFilters.bhk || "",
        minPrice: activeFilters.minPrice || "",
        maxPrice: activeFilters.maxPrice || "",
        furnishing: activeFilters.furnishing || "",
      });

      setListings(response?.results || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch listings");
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings(filters);
  }, [filters]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  return (
    <>
      <Navbar />

      <main className="listings-page">

        {/* HERO */}
        <section className="discovery-section">

          <div className="discovery-copy">
            <p className="eyebrow">PROPERTY DISCOVERY</p>

            <h1>
              Find a place
              <br />
              that feels like <em>home.</em>
            </h1>

            <p className="discovery-description">
              Browse residential properties by locality, budget,
              bedrooms, and furnishing preference.
            </p>

            <div className="discovery-stats">
              <div className="discovery-stat">
                <strong>4,415</strong>
                <span>properties</span>
              </div>

              <div className="discovery-stat">
                <strong>Multiple</strong>
                <span>neighbourhoods</span>
              </div>

              <div className="discovery-stat">
                <strong>Updated</strong>
                <span>listings</span>
              </div>
            </div>
          </div>

          <Filters
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
          />

        </section>

        {/* RESULTS */}
        <section className="listings-results">

          <div className="results-heading">
            <div>
              <p className="eyebrow">AVAILABLE HOMES</p>

              <h2>
                {loading
                  ? "Finding properties..."
                  : `${listings.length} properties found`}
              </h2>
            </div>

            {!loading && listings.length > 0 && (
              <span className="results-status">
                Showing latest listings
              </span>
            )}
          </div>

          {loading && (
            <div className="listings-loading">
              <div className="loading-spinner" />
              <p>Finding properties for you...</p>
            </div>
          )}

          {!loading && error && (
            <div className="listings-error">
              <span>!</span>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && listings.length === 0 && (
            <div className="empty-listings">
              <div className="empty-icon">⌂</div>

              <h3>No properties found</h3>

              <p>
                Try adjusting your filters to discover more homes.
              </p>
            </div>
          )}

          {!loading && !error && listings.length > 0 && (
            <div className="listing-grid">
              {listings.map((listing) => (
                <ListingCard
                  key={listing.listing_id}
                  listing={listing}
                />
              ))}
            </div>
          )}

        </section>
      </main>
    </>
  );
};

export default Listings;