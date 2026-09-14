const Filters = ({ filters, setFilters, onApply, onClear }) => {
  const updateFilter = (key, value) => {
    setFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <div className="filters-panel">
      <div className="filter-field">
        <label>Locality</label>

        <input
          type="text"
          placeholder="e.g. Yelahanka"
          value={filters.locality}
          onChange={(e) =>
            updateFilter("locality", e.target.value)
          }
        />
      </div>

      <div className="filter-field">
        <label>Bedrooms</label>

        <select
          value={filters.bhk}
          onChange={(e) =>
            updateFilter("bhk", e.target.value)
          }
        >
          <option value="">Any BHK</option>
          <option value="1">1 BHK</option>
          <option value="2">2 BHK</option>
          <option value="3">3 BHK</option>
          <option value="4">4 BHK</option>
          <option value="5">5+ BHK</option>
        </select>
      </div>

      <div className="filter-field">
        <label>Min price</label>

        <input
          type="number"
          placeholder="Minimum price"
          value={filters.minPrice}
          onChange={(e) =>
            updateFilter("minPrice", e.target.value)
          }
        />
      </div>

      <div className="filter-field">
        <label>Max price</label>

        <input
          type="number"
          placeholder="Maximum price"
          value={filters.maxPrice}
          onChange={(e) =>
            updateFilter("maxPrice", e.target.value)
          }
        />
      </div>

      <div className="filter-field">
        <label>Furnishing</label>

        <select
          value={filters.furnishing}
          onChange={(e) =>
            updateFilter("furnishing", e.target.value)
          }
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

      <div className="filter-actions">
        <button
          className="primary-button"
          onClick={onApply}
        >
          Apply filters
        </button>

        <button
          className="secondary-button"
          onClick={onClear}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Filters;
