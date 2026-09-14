import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getProjects } from "../api/projects";

const formatProjectPrice = (value) => {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "Price unavailable";
  }

  // Ivy project prices are stored in crore-scale values.
  return `₹${number.toFixed(2)} Cr`;
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");

  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  const [locality, setLocality] = useState("");

  const loadProjects = async (
    newOffset = 0,
    append = false
  ) => {
    try {
      setError("");

      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const data = await getProjects({
        offset: newOffset,
        limit: 50,
        locality,
      });

      const results = data.results || [];

      setProjects((current) =>
        append ? [...current, ...results] : results
      );

      setTotal(Number(data.total) || 0);
      setOffset(newOffset);
      setHasMore(Boolean(data.has_more));
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to load projects.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const applyFilters = () => {
    loadProjects(0, false);
  };

  const clearFilters = () => {
    setLocality("");

    setTimeout(() => {
      loadProjects(0, false);
    }, 0);
  };

  return (
    <>
      <Navbar />

      <main className="collection-page">
        <header className="collection-header">
          <div>
            <p className="eyebrow">DEVELOPMENTS</p>

            <h1>Projects worth exploring.</h1>

            <p>
              Compare residential developments,
              pricing and available inventory.
            </p>
          </div>

          <div className="results-count">
            <strong>
              {total.toLocaleString("en-IN")}
            </strong>
            <span>projects</span>
          </div>
        </header>

        <section className="simple-filter-bar">
          <div>
            <label>Locality</label>

            <input
              value={locality}
              onChange={(e) =>
                setLocality(e.target.value)
              }
              placeholder="e.g. Yelahanka"
            />
          </div>

          <button
            className="primary-button"
            onClick={applyFilters}
          >
            Apply
          </button>

          <button
            className="secondary-button"
            onClick={clearFilters}
          >
            Clear
          </button>
        </section>

        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="empty-state">
            <h2>No projects found</h2>
            <p>Try another locality.</p>
          </div>
        ) : (
          <>
            <div className="project-grid">
              {projects.map((project) => (
                <article
                  className="project-card"
                  key={
                    project.project_id ||
                    project.id
                  }
                >
                  <div className="project-visual">
                    <span>PROJECT</span>

                    {project.status && (
                      <small>
                        {project.status}
                      </small>
                    )}
                  </div>

                  <div className="project-body">
                    <p className="project-locality">
                      {project.locality ||
                        "Location unavailable"}
                    </p>

                    <h2>
                      {project.project_name ||
                        project.name ||
                        "Residential Project"}
                    </h2>

                    <div className="project-prices">
                      <div>
                        <span>Starting from</span>

                        <strong>
                          {formatProjectPrice(
                            project.price_min
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>Maximum</span>

                        <strong>
                          {formatProjectPrice(
                            project.price_max
                          )}
                        </strong>
                      </div>
                    </div>

                    <div className="project-meta">
                      <span>
                        {project.total_units ??
                          "—"}{" "}
                        units
                      </span>

                      <span>
                        {project.total_listings ??
                          "—"}{" "}
                        listings
                      </span>

                      {project.launch_date && (
                        <span>
                          Launch:{" "}
                          {project.launch_date}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {hasMore && (
              <div className="load-more-container">
                <button
                  className="load-more-button"
                  onClick={() =>
                    loadProjects(
                      offset + 50,
                      true
                    )
                  }
                  disabled={loadingMore}
                >
                  {loadingMore
                    ? "Loading..."
                    : "Load more projects"}
                </button>

                <p>
                  Showing{" "}
                  {projects.length.toLocaleString(
                    "en-IN"
                  )}{" "}
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

export default Projects;