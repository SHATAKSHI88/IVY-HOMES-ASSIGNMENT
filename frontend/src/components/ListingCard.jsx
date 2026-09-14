import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../api/auth";
import {
  isListingSaved,
  toggleSavedListing,
} from "../api/saved";

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

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [saved, setSaved] = useState(
    isListingSaved(listing.listing_id, user)
  );

  const handleSave = (event) => {
    event.stopPropagation();

    const updated = toggleSavedListing(listing, user);

    setSaved(
      updated.some(
        (item) => item.listing_id === listing.listing_id
      )
    );
  };

  const openDetails = () => {
    navigate(`/listings/${listing.listing_id}`, {
      state: { listing },
    });
  };

  return (
    <article className="listing-card">
      <div
        className="listing-card-image"
        onClick={openDetails}
      >
        <div className="listing-image-overlay" />

        <span className="listing-type">
          {listing.property_type || "Residential"}
        </span>

        <button
          className={
            saved
              ? "save-button saved"
              : "save-button"
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

        {listing.is_live && (
          <span className="image-live-badge">
            <span className="live-dot" />
            Live
          </span>
        )}
      </div>

      <div className="listing-card-body">
        <div className="listing-card-top">
          <div className="listing-heading">
            <p className="listing-locality">
              {listing.locality ||
                "Location unavailable"}
            </p>

            <h2>
              {listing.apartment_name ||
                "Property"}
            </h2>
          </div>
        </div>

        <div className="listing-price-row">
          <strong className="listing-price">
            {formatPrice(listing.price)}
          </strong>

          {listing.posted_date && (
            <span className="listing-posted">
              Recently listed
            </span>
          )}
        </div>

        <div className="listing-meta">
          <span>
            <strong>{listing.bedroom || "—"}</strong>
            BHK
          </span>

          <span className="meta-divider" />

          <span>
            <strong>
              {listing.carpet_area
                ? Number(
                    listing.carpet_area
                  ).toLocaleString("en-IN")
                : "—"}
            </strong>
            sqft
          </span>

          {listing.furnishing && (
            <>
              <span className="meta-divider" />

              <span>
                {listing.furnishing}
              </span>
            </>
          )}
        </div>

        <button
          className="view-property-button"
          onClick={openDetails}
        >
          View property
          <span>→</span>
        </button>
      </div>
    </article>
  );
};

export default ListingCard;