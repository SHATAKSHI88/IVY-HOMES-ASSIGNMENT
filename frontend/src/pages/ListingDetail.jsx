import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getListingById } from "../api/listings";
import { getCurrentUser } from "../api/auth";
import { isListingSaved, toggleSavedListing } from "../api/saved";

const formatPrice = (price) => {
  const value = Number(price);

  if (!Number.isFinite(value)) {
    return "Price unavailable";
  }

  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} L`;
  }

  return `₹${value.toLocaleString("en-IN")}`;
};

const ListingDetail = () => {
  const { listingId: id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const user = getCurrentUser();

  const [listing, setListing] = useState(location.state?.listing || null);
  const [loading, setLoading] = useState(!location.state?.listing);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(
    location.state?.listing
      ? isListingSaved(location.state.listing.listing_id, user)
      : false
  );

  useEffect(() => {
    if (listing) {
      setSaved(isListingSaved(listing.listing_id, user));
      return;
    }

    const fetchListing = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getListingById(id);

        setListing(response);
        setSaved(isListingSaved(response?.listing_id, user));
      } catch (err) {
        console.error(err);
        setError("Unable to load this property.");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleSave = () => {
    if (!listing) return;

    const updated = toggleSavedListing(listing, user);

    setSaved(
      updated.some(
        (item) => item.listing_id === listing.listing_id
      )
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="detail-page">
          <div className="detail-loading">
            <div className="loading-spinner" />
            <p>Loading property details...</p>
          </div>
        </main>
      </>
    );
  }

  if (error || !listing) {
    return (
      <>
        <Navbar />

        <main className="detail-page">
          <section className="detail-error">
            <div className="empty-icon">⌂</div>
            <p className="eyebrow">PROPERTY UNAVAILABLE</p>
            <h1>We couldn't find this property.</h1>
            <p>
              The listing may have been removed or is temporarily
              unavailable.
            </p>

            <button
              className="collection-card-button"
              onClick={() => navigate("/listings")}
            >
              ← Back to listings
            </button>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="detail-page">
        <section className="detail-hero">
          <div className="detail-hero-image">
            <div className="detail-image-overlay" />

            <span className="detail-property-type">
              {listing.property_type || "Residential"}
            </span>

            {listing.is_live && (
              <span className="detail-live-badge">
                <span className="live-dot" />
                Live listing
              </span>
            )}

            <button
              className={
                saved
                  ? "detail-save-button saved"
                  : "detail-save-button"
              }
              onClick={handleSave}
              aria-label={
                saved
                  ? "Remove from saved listings"
                  : "Save listing"
              }
            >
              {saved ? "♥" : "♡"}
            </button>
          </div>

          <div className="detail-intro">
            <button
              className="detail-back-button"
              onClick={() => navigate("/listings")}
            >
              ← Back to listings
            </button>

            <p className="eyebrow">
              {listing.locality || "PROPERTY DETAILS"}
            </p>

            <h1>
              {listing.apartment_name || "Property"}
            </h1>

            <div className="detail-price">
              {formatPrice(listing.price)}
            </div>

            <p className="detail-location">
              {listing.locality || "Location unavailable"}
            </p>
          </div>
        </section>

        <section className="detail-content">
          <div className="detail-main-card">
            <div className="detail-section-heading">
              <div>
                <p className="eyebrow">PROPERTY OVERVIEW</p>
                <h2>Everything you need to know.</h2>
              </div>
            </div>

            <div className="detail-stats-grid">
              <div className="detail-stat">
                <span>Bedrooms</span>
                <strong>
                  {listing.bedroom || "—"} BHK
                </strong>
              </div>

              <div className="detail-stat">
                <span>Carpet area</span>
                <strong>
                  {listing.carpet_area
                    ? `${Number(
                        listing.carpet_area
                      ).toLocaleString("en-IN")} sqft`
                    : "—"}
                </strong>
              </div>

              <div className="detail-stat">
                <span>Furnishing</span>
                <strong>
                  {listing.furnishing || "—"}
                </strong>
              </div>

              <div className="detail-stat">
                <span>Property type</span>
                <strong>
                  {listing.property_type || "Residential"}
                </strong>
              </div>
            </div>

            <div className="detail-information">
              <div>
                <span>Listing ID</span>
                <strong>{listing.listing_id || "—"}</strong>
              </div>

              <div>
                <span>Apartment</span>
                <strong>
                  {listing.apartment_name || "—"}
                </strong>
              </div>

              <div>
                <span>Locality</span>
                <strong>
                  {listing.locality || "—"}
                </strong>
              </div>

              <div>
                <span>Posted</span>
                <strong>
                  {listing.posted_date
                    ? new Date(
                        listing.posted_date
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </strong>
              </div>
            </div>
          </div>

          <aside className="detail-side-card">
            <p className="eyebrow">YOUR SHORTLIST</p>

            <h3>
              {saved
                ? "Saved to your shortlist."
                : "Keep this property in mind."}
            </h3>

            <p>
              {saved
                ? "You can find this property anytime from your saved listings."
                : "Save this property so you can easily compare it later."}
            </p>

            <button
              className="detail-action-button"
              onClick={handleSave}
            >
              {saved ? "Remove from saved" : "Save property"}
            </button>

            <button
              className="detail-secondary-button"
              onClick={() => navigate("/saved")}
            >
              View saved properties →
            </button>
          </aside>
        </section>
      </main>
    </>
  );
};

export default ListingDetail;