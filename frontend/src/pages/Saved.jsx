import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getCurrentUser } from "../api/auth";
import { getSavedListings, toggleSavedListing } from "../api/saved";

const formatPrice = (price) => {
  const value = Number(price);

  if (!Number.isFinite(value)) return "Price unavailable";

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

  const [savedListings, setSavedListings] = useState([]);

  useEffect(() => {
    setSavedListings(getSavedListings(user));
  }, [user]);

  const handleRemove = (event, listing) => {
    event.stopPropagation();

    const updated = toggleSavedListing(listing, user);
    setSavedListings(updated);
  };

  const openDetails = (listing) => {
    navigate(`/listings/${listing.listing_id}`, {
      state: { listing },
    });
  };

  return (
    <>
      <Navbar />

      <main className="collection-page saved-page">
        <header className="collection-header">
          <p className="eyebrow">YOUR SHORTLIST</p>

          <h1>
            Places you <em>love.</em>
          </h1>

          <p className="collection-description">
            Keep your favourite properties together and come back
            whenever you're ready to make a decision.
          </p>

          {savedListings.length > 0 && (
            <div className="saved-count">
              {savedListings.length}{" "}
              {savedListings.length === 1
                ? "property saved"
                : "properties saved"}
            </div>
          )}
        </header>

        {savedListings.length === 0 ? (
          <section className="collection-empty">
            <div className="empty-icon">♡</div>

            <h3>Your shortlist is empty</h3>

            <p>
              Save properties while browsing and they'll appear here.
            </p>

            <button
              className="collection-card-button"
              onClick={() => navigate("/listings")}
            >
              Explore properties →
            </button>
          </section>
        ) : (
          <section className="saved-grid">
            {savedListings.map((listing) => (
              <article
                key={listing.listing_id}
                className="saved-property-card"
                onClick={() => openDetails(listing)}
              >
                <div className="saved-property-image">
                  <span className="saved-property-label">
                    {listing.property_type || "Residential"}
                  </span>

                  <button
                    className="saved-remove-button"
                    onClick={(event) =>
                      handleRemove(event, listing)
                    }
                    aria-label="Remove saved property"
                  >
                    ♥
                  </button>
                </div>

                <div className="saved-property-body">
                  <p className="listing-locality">
                    {listing.locality || "Location unavailable"}
                  </p>

                  <h2>
                    {listing.apartment_name || "Property"}
                  </h2>

                  <strong className="saved-property-price">
                    {formatPrice(listing.price)}
                  </strong>

                  <div className="listing-meta">
                    <span>
                      <strong>{listing.bedroom || "—"}</strong> BHK
                    </span>

                    <span className="meta-divider" />

                    <span>
                      <strong>
                        {listing.carpet_area
                          ? Number(
                              listing.carpet_area
                            ).toLocaleString("en-IN")
                          : "—"}
                      </strong>{" "}
                      sqft
                    </span>

                    {listing.furnishing && (
                      <>
                        <span className="meta-divider" />
                        <span>{listing.furnishing}</span>
                      </>
                    )}
                  </div>

                  <button
                    className="view-property-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      openDetails(listing);
                    }}
                  >
                    View property
                    <span>→</span>
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </>
  );
};

export default Saved;