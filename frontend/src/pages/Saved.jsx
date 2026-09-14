import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  getSavedListings,
  removeSavedListing,
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

const Saved = () => {
  const navigate = useNavigate();

  const user = getCurrentUser();

  const [savedListings, setSavedListings] =
    useState([]);

  useEffect(() => {
    setSavedListings(getSavedListings(user));
  }, [user]);

  const handleRemove = (listingId) => {
    const updated = removeSavedListing(
      listingId,
      user
    );

    setSavedListings(updated);
  };

  return (
    <>
      <Navbar />

      <main className="collection-page">
        <header className="collection-header">
          <div>
            <p className="eyebrow">YOUR COLLECTION</p>

            <h1>Saved homes.</h1>

            <p>
              Properties you've saved for later.
            </p>
          </div>

          <div className="results-count">
            <strong>{savedListings.length}</strong>
            <span>saved</span>
          </div>
        </header>

        {savedListings.length === 0 ? (
          <section className="empty-state">
            <div className="empty-icon">♡</div>

            <h2>No saved properties yet</h2>

            <p>
              Browse listings and save properties
              you'd like to revisit.
            </p>

            <button
              className="primary-button"
              onClick={() => navigate("/listings")}
            >
              Browse listings
            </button>
          </section>
        ) : (
          <div className="listings-grid">
            {savedListings.map((listing) => (
              <article
                className="saved-card"
                key={listing.listing_id}
              >
                <div
                  className="saved-card-image"
                  onClick={() =>
                    navigate(
                      `/listings/${listing.listing_id}`
                    )
                  }
                >
                  <span>
                    {listing.property_type ||
                      "Residential"}
                  </span>
                </div>

                <div className="saved-card-body">
                  <div className="saved-card-heading">
                    <div>
                      <p>
                        {listing.locality ||
                          "Location unavailable"}
                      </p>

                      <h2>
                        {listing.apartment_name ||
                          listing.property_name ||
                          "Property"}
                      </h2>
                    </div>

                    <button
                      className="remove-save-button"
                      onClick={() =>
                        handleRemove(
                          listing.listing_id
                        )
                      }
                      aria-label="Remove saved listing"
                    >
                      ♥
                    </button>
                  </div>

                  <strong className="saved-price">
                    {formatPrice(listing.price)}
                  </strong>

                  <div className="saved-meta">
                    <span>
                      {listing.bedroom || "—"} BHK
                    </span>

                    <span>
                      {listing.carpet_area
                        ? `${Number(
                            listing.carpet_area
                          ).toLocaleString(
                            "en-IN"
                          )} sqft`
                        : "Area unavailable"}
                    </span>
                  </div>

                  <button
                    className="view-property-button"
                    onClick={() =>
                      navigate(
                        `/listings/${listing.listing_id}`
                      )
                    }
                  >
                    View property
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default Saved;