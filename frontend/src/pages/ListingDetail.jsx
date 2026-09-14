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

const formatDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const ListingDetail = () => {
  const { listingId: id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const user = getCurrentUser();

  const [listing, setListing] = useState(
    location.state?.listing || null
  );

  const [loading, setLoading] = useState(
    !location.state?.listing
  );

  const [error, setError] = useState("");

  const [saved, setSaved] = useState(
    location.state?.listing
      ? isListingSaved(
          location.state.listing.listing_id,
          user
        )
      : false
  );

  useEffect(() => {
    if (listing) {
      setSaved(
        isListingSaved(
          listing.listing_id,
          user
        )
      );
      return;
    }

    const fetchListing = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getListingById(id);

        setListing(response);

        setSaved(
          isListingSaved(
            response?.listing_id,
            user
          )
        );
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

    const updated = toggleSavedListing(
      listing,
      user
    );

    setSaved(
      updated.some(
        (item) =>
          item.listing_id === listing.listing_id
      )
    );
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="detail-page">
          <section className="detail-loading-card">
            <div className="loading-spinner" />
            <p>Loading property details...</p>
          </section>
        </main>
      </>
    );
  }

  if (error || !listing) {
    return (
      <>
        <Navbar />

        <main className="detail-page">
          <section className="detail-error-card">
            <div className="detail-error-icon">⌂</div>

            <p className="eyebrow">
              PROPERTY UNAVAILABLE
            </p>

            <h1>
              We couldn't find this property.
            </h1>

            <p>
              The listing may have been removed or is
              temporarily unavailable.
            </p>

            <button
              type="button"
              className="detail-back-primary"
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

        {/* ================= BACK NAVIGATION ================= */}
        <div className="detail-topbar">
          <button
            type="button"
            className="detail-back-button"
            onClick={() => navigate("/listings")}
          >
            <span>←</span>
            Back to listings
          </button>

          <span className="detail-id-label">
            {listing.listing_id || "PROPERTY"}
          </span>
        </div>

        {/* ================= PROPERTY HERO ================= */}
        <section className="detail-hero-new">

          <div className="detail-visual-card">
            <div className="detail-visual-background">
              <div className="detail-building">
                <div className="detail-building-roof" />

                <div className="detail-building-body">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="detail-visual-glow" />
              <div className="detail-visual-grid" />
            </div>

            <div className="detail-visual-content">

              <div className="detail-badges">
                <span className="detail-type-pill">
                  {listing.property_type ||
                    "Residential"}
                </span>

                {listing.is_live && (
                  <span className="detail-live-pill">
                    <span className="live-dot" />
                    Live listing
                  </span>
                )}
              </div>

              <button
                type="button"
                className={
                  saved
                    ? "detail-heart-button saved"
                    : "detail-heart-button"
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

              <div className="detail-visual-caption">
                <span>IVY HOMES</span>
                <strong>PROPERTY</strong>
              </div>
            </div>
          </div>

          <div className="detail-hero-copy">

            <p className="detail-kicker">
              {listing.locality ||
                "PROPERTY DETAILS"}
            </p>

            <h1>
              {listing.apartment_name ||
                "Property"}
            </h1>

            <div className="detail-location-row">
              <span className="detail-location-icon">
                ⌖
              </span>

              <span>
                {listing.locality ||
                  "Location unavailable"}
              </span>
            </div>

            <div className="detail-price-block">
              <span className="detail-price-label">
                Asking price
              </span>

              <strong>
                {formatPrice(listing.price)}
              </strong>
            </div>

            <div className="detail-quick-stats">
              <div>
                <strong>
                  {listing.bedroom || "—"}
                </strong>
                <span>BHK</span>
              </div>

              <div>
                <strong>
                  {listing.carpet_area
                    ? Number(
                        listing.carpet_area
                      ).toLocaleString("en-IN")
                    : "—"}
                </strong>
                <span>sqft</span>
              </div>

              <div>
                <strong>
                  {listing.furnishing
                    ? listing.furnishing
                        .replace("-", " ")
                        .replace(/\b\w/g, (char) =>
                          char.toUpperCase()
                        )
                    : "—"}
                </strong>
                <span>furnishing</span>
              </div>
            </div>

            <button
              type="button"
              className="detail-primary-action"
              onClick={handleSave}
            >
              <span>
                {saved
                  ? "Saved to shortlist"
                  : "Save this property"}
              </span>

              <span className="detail-primary-arrow">
                {saved ? "♥" : "→"}
              </span>
            </button>

          </div>
        </section>

        {/* ================= MAIN CONTENT ================= */}
        <section className="detail-main-layout">

          <div className="detail-main-column">

            <div className="detail-section-card">

              <div className="detail-section-title">
                <div>
                  <p className="eyebrow">
                    PROPERTY OVERVIEW
                  </p>

                  <h2>
                    Everything you need to know.
                  </h2>
                </div>

                <span className="detail-section-marker">
                  01
                </span>
              </div>

              <div className="detail-feature-grid">

                <div className="detail-feature">
                  <span className="detail-feature-icon">
                    BED
                  </span>

                  <div>
                    <span>Bedrooms</span>
                    <strong>
                      {listing.bedroom || "—"} BHK
                    </strong>
                  </div>
                </div>

                <div className="detail-feature">
                  <span className="detail-feature-icon">
                    AREA
                  </span>

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
                </div>

                <div className="detail-feature">
                  <span className="detail-feature-icon">
                    STYLE
                  </span>

                  <div>
                    <span>Furnishing</span>
                    <strong>
                      {listing.furnishing
                        ? listing.furnishing
                            .replace("-", " ")
                            .replace(
                              /\b\w/g,
                              (char) =>
                                char.toUpperCase()
                            )
                        : "—"}
                    </strong>
                  </div>
                </div>

                <div className="detail-feature">
                  <span className="detail-feature-icon">
                    TYPE
                  </span>

                  <div>
                    <span>Property type</span>
                    <strong>
                      {listing.property_type ||
                        "Residential"}
                    </strong>
                  </div>
                </div>

              </div>
            </div>

            <div className="detail-section-card">

              <div className="detail-section-title">
                <div>
                  <p className="eyebrow">
                    LISTING INFORMATION
                  </p>

                  <h2>
                    A closer look at this listing.
                  </h2>
                </div>

                <span className="detail-section-marker">
                  02
                </span>
              </div>

              <div className="detail-information-grid">

                <div className="detail-information-item">
                  <span>Listing ID</span>
                  <strong>
                    {listing.listing_id || "—"}
                  </strong>
                </div>

                <div className="detail-information-item">
                  <span>Apartment</span>
                  <strong>
                    {listing.apartment_name || "—"}
                  </strong>
                </div>

                <div className="detail-information-item">
                  <span>Locality</span>
                  <strong>
                    {listing.locality || "—"}
                  </strong>
                </div>

                <div className="detail-information-item">
                  <span>Posted</span>
                  <strong>
                    {formatDate(
                      listing.posted_date
                    )}
                  </strong>
                </div>

              </div>
            </div>

          </div>

          {/* ================= SIDE PANEL ================= */}
          <aside className="detail-aside">

            <div className="detail-side-card premium">

              <span className="detail-side-number">
                03
              </span>

              <p className="eyebrow">
                YOUR SHORTLIST
              </p>

              <h3>
                {saved
                  ? "This property is on your shortlist."
                  : "Keep this property in mind."}
              </h3>

              <p>
                {saved
                  ? "You can return to this property anytime from your saved listings."
                  : "Save this property so you can compare it with other homes later."}
              </p>

              <button
                type="button"
                className="detail-side-primary"
                onClick={handleSave}
              >
                {saved
                  ? "Remove from saved"
                  : "Save property"}

                <span>
                  {saved ? "×" : "→"}
                </span>
              </button>

              <button
                type="button"
                className="detail-side-secondary"
                onClick={() => navigate("/saved")}
              >
                View saved properties
                <span>→</span>
              </button>

            </div>

            <div className="detail-side-note">
              <span>IVY HOMES</span>

              <p>
                Explore more properties, compare your
                shortlist and make a more informed
                decision.
              </p>
            </div>

          </aside>

        </section>

      </main>
    </>
  );
};

export default ListingDetail;