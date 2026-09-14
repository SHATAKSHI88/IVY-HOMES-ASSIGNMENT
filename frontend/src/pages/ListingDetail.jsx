import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getListingById } from "../api/listings";
import {
  isListingSaved,
  toggleSavedListing,
} from "../api/saved";
import { getCurrentUser } from "../api/auth";

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
  const { listingId } = useParams();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loadListing = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getListingById(
          listingId
        );

        setListing(data);

        setSaved(
          isListingSaved(listingId, user)
        );
      } catch (err) {
        console.error(err);
        setError(
          err.message ||
            "Unable to load this property."
        );
      } finally {
        setLoading(false);
      }
    };

    loadListing();
  }, [listingId]);

  const handleSave = () => {
    if (!listing) return;

    const updated = toggleSavedListing(
      listing,
      user
    );

    setSaved(
      updated.some(
        (item) =>
          item.listing_id ===
          listing.listing_id
      )
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="detail-page">
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading property...</p>
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
          <div className="detail-error">
            <p className="eyebrow">
              PROPERTY NOT FOUND
            </p>

            <h1>
              We couldn't load this listing.
            </h1>

            <p>
              {error ||
                "The requested property does not exist."}
            </p>

            <button
              className="primary-button"
              onClick={() =>
                navigate("/listings")
              }
            >
              Back to listings
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="detail-page">
        <button
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back to listings
        </button>

        <section className="detail-hero">
          <div className="detail-visual">
            <span>
              {listing.property_type ||
                "Residential"}
            </span>

            {listing.is_live && (
              <small>LIVE LISTING</small>
            )}
          </div>

          <div className="detail-summary">
            <div className="detail-heading">
              <div>
                <p className="eyebrow">
                  {listing.locality ||
                    "PROPERTY"}
                </p>

                <h1>
                  {listing.apartment_name ||
                    "Property"}
                </h1>
              </div>

              <button
                className={
                  saved
                    ? "save-button saved detail-save"
                    : "save-button detail-save"
                }
                onClick={handleSave}
              >
                {saved ? "♥" : "♡"}
              </button>
            </div>

            <strong className="detail-price">
              {formatPrice(listing.price)}
            </strong>

            <p className="detail-location">
              {listing.locality ||
                "Location unavailable"}
              {listing.city
                ? `, ${listing.city}`
                : ""}
            </p>
          </div>
        </section>

        <section className="detail-grid">
          <div className="detail-panel">
            <p className="eyebrow">
              PROPERTY DETAILS
            </p>

            <div className="detail-spec-grid">
              <div>
                <span>Bedrooms</span>
                <strong>
                  {listing.bedroom || "—"}
                </strong>
              </div>

              <div>
                <span>Floor</span>
                <strong>
                  {listing.floor || "—"}
                </strong>
              </div>

              <div>
                <span>Carpet area</span>
                <strong>
                  {listing.carpet_area
                    ? `${Number(
                        listing.carpet_area
                      ).toLocaleString(
                        "en-IN"
                      )} sqft`
                    : "—"}
                </strong>
              </div>

              <div>
                <span>Super built-up</span>
                <strong>
                  {listing.super_built_up_area
                    ? `${Number(
                        listing.super_built_up_area
                      ).toLocaleString(
                        "en-IN"
                      )} sqft`
                    : "—"}
                </strong>
              </div>

              <div>
                <span>Furnishing</span>
                <strong>
                  {listing.furnishing || "—"}
                </strong>
              </div>

              <div>
                <span>Property type</span>
                <strong>
                  {listing.property_type || "—"}
                </strong>
              </div>
            </div>
          </div>

          <div className="detail-panel">
            <p className="eyebrow">
              LISTING INFORMATION
            </p>

            <div className="detail-info">
              <div>
                <span>Listing ID</span>
                <strong>
                  {listing.listing_id}
                </strong>
              </div>

              <div>
                <span>Posted by</span>
                <strong>
                  {listing.posted_by || "—"}
                </strong>
              </div>

              <div>
                <span>Verification</span>
                <strong>
                  {listing.is_verified
                    ? "Verified"
                    : "Not verified"}
                </strong>
              </div>

              <div>
                <span>Status</span>
                <strong>
                  {listing.is_live
                    ? "Live"
                    : "Inactive"}
                </strong>
              </div>
            </div>
          </div>
        </section>

        {listing.description && (
          <section className="detail-description">
            <p className="eyebrow">
              DESCRIPTION
            </p>

            <h2>About this property</h2>

            <p>{listing.description}</p>
          </section>
        )}
      </main>
    </>
  );
};

export default ListingDetail;