import { useState } from "react";

const Filters = ({ onApply, onClear }) => {
  const [locality, setLocality] = useState("");
  const [bhk, setBhk] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [furnishing, setFurnishing] = useState("");

  const handleApply = () => {
    onApply({
      locality,
      bhk,
      minPrice,
      maxPrice,
      furnishing,
    });
  };

  const handleClear = () => {
    setLocality("");
    setBhk("");
    setMinPrice("");
    setMaxPrice("");
    setFurnishing("");

    onClear();
  };

  return (
    <section className="property-search-panel">
      <div className="search-panel-top">
        <div>
          <p className="search-panel-eyebrow">REFINE YOUR SEARCH</p>
          <h2>Find your perfect property</h2>
        </div>

        <button
          type="button"
          className="clear-filters-button"
          onClick={handleClear}
        >
          Clear all
        </button>
      </div>

      <div className="property-filter-grid">

        {/* Location */}
        <div className="property-filter">
          <label>Location</label>

          <div className="filter-control">
            <span className="filter-icon">⌖</span>

            <input
              type="text"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              placeholder="Search locality"
            />
          </div>
        </div>

        {/* Bedrooms */}
        <div className="property-filter">
          <label>Bedrooms</label>

          <div className="filter-control">
            <span className="filter-icon">⌂</span>

            <select
              value={bhk}
              onChange={(e) => setBhk(e.target.value)}
            >
              <option value="">Any bedrooms</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
              <option value="5">5+ BHK</option>
            </select>
          </div>
        </div>

        {/* Budget */}
        <div className="property-filter budget-filter">
          <label>Budget</label>

          <div className="budget-controls">

            <div className="filter-control">
              <span className="currency-symbol">₹</span>

              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min"
              />
            </div>

            <span className="budget-separator">—</span>

            <div className="filter-control">
              <span className="currency-symbol">₹</span>

              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max"
              />
            </div>

          </div>
        </div>

        {/* Furnishing */}
        <div className="property-filter">
          <label>Furnishing</label>

          <div className="filter-control">
            <span className="filter-icon">✦</span>

            <select
              value={furnishing}
              onChange={(e) => setFurnishing(e.target.value)}
            >
              <option value="">Any furnishing</option>
              <option value="fully-furnished">
                Fully furnished
              </option>
              <option value="semi-furnished">
                Semi furnished
              </option>
              <option value="unfurnished">
                Unfurnished
              </option>
            </select>
          </div>
        </div>

        {/* Search button */}
        <button
          type="button"
          className="search-properties-button"
          onClick={handleApply}
        >
          <span>Search properties</span>
          <span className="search-arrow">→</span>
        </button>

      </div>
    </section>
  );
};

export default Filters;