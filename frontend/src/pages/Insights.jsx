import Navbar from "../components/Navbar";

const Insights = () => {
  return (
    <>
      <Navbar />

      <main className="insights-page">

        {/* =========================
            HERO
        ========================== */}
        <section className="insights-hero">
          <div className="insights-hero-copy">
            <p className="eyebrow">MARKET INTELLIGENCE</p>

            <h1>
              Data that helps you
              <em> see the market.</em>
            </h1>

            <p className="insights-hero-description">
              A concise view of the property dataset, market patterns,
              data-quality findings, and the signals discovered during
              analysis.
            </p>
          </div>

          <div className="insights-hero-card">
            <span className="insights-card-label">DATASET</span>

            <strong>4,700</strong>

            <span>property records analysed</span>

            <div className="insights-card-line" />

            <div className="insights-card-meta">
              <span>Live records</span>
              <strong>3,722</strong>
            </div>
          </div>
        </section>


        {/* =========================
            KEY METRICS
        ========================== */}
        <section className="insights-section">
          <div className="insights-section-heading">
            <div>
              <p className="eyebrow">AT A GLANCE</p>

              <h2>
                The numbers behind the market.
              </h2>
            </div>

            <span className="insights-section-note">
              Verified from the API dataset
            </span>
          </div>

          <div className="metric-grid">

            <article className="metric-card metric-card-featured">
              <span className="metric-icon">⌂</span>

              <span className="metric-label">
                Total properties
              </span>

              <strong>4,700</strong>

              <p>
                Records retrieved during the analysis.
              </p>
            </article>


            <article className="metric-card">
              <span className="metric-icon">◉</span>

              <span className="metric-label">
                Active listings
              </span>

              <strong>3,722</strong>

              <p>
                Properties marked as currently live.
              </p>
            </article>


            <article className="metric-card">
              <span className="metric-icon">◇</span>

              <span className="metric-label">
                Unique properties
              </span>

              <strong>4,699</strong>

              <p>
                Unique property identities detected.
              </p>
            </article>


            <article className="metric-card">
              <span className="metric-icon">↗</span>

              <span className="metric-label">
                Last 7 days
              </span>

              <strong>149</strong>

              <p>
                Listings posted during the latest seven-day window.
              </p>
            </article>

          </div>
        </section>


        {/* =========================
            MARKET SNAPSHOT
        ========================== */}
        <section className="market-snapshot-section">

          <div className="snapshot-heading">
            <p className="eyebrow">MARKET SNAPSHOT</p>

            <h2>
              Three signals worth
              <em> noticing.</em>
            </h2>

            <p>
              The dataset reveals useful patterns across individual
              listings, rental inventory, and large residential projects.
            </p>
          </div>


          <div className="snapshot-grid">

            <article className="snapshot-card">
              <div className="snapshot-number">
                01
              </div>

              <span className="snapshot-tag">
                RESALE MARKET
              </span>

              <h3>
                2-BHK price density
              </h3>

              <strong>
                ₹21,040.17
              </strong>

              <span className="snapshot-unit">
                per sqft
              </span>

              <p>
                Mean individual property price per carpet-area square
                foot for live 2-BHK listings after excluding anomalous
                records.
              </p>

              <div className="snapshot-bar">
                <span style={{ width: "72%" }} />
              </div>
            </article>


            <article className="snapshot-card">
              <div className="snapshot-number">
                02
              </div>

              <span className="snapshot-tag">
                PROJECT MARKET
              </span>

              <h3>
                Highest project ceiling
              </h3>

              <strong>
                ₹99.80 Cr
              </strong>

              <span className="snapshot-unit">
                maximum project price
              </span>

              <p>
                The highest maximum project price found in the dataset,
                associated with project P10068.
              </p>

              <div className="snapshot-bar">
                <span style={{ width: "92%" }} />
              </div>
            </article>


            <article className="snapshot-card">
              <div className="snapshot-number">
                03
              </div>

              <span className="snapshot-tag">
                RENTAL MARKET
              </span>

              <h3>
                Yelahanka rental value
              </h3>

              <strong>
                ₹57.70 L
              </strong>

              <span className="snapshot-unit">
                combined listed rent
              </span>

              <p>
                Total rental value across the Yelahanka rental records
                returned during the analysis.
              </p>

              <div className="snapshot-bar">
                <span style={{ width: "58%" }} />
              </div>
            </article>

          </div>
        </section>


        {/* =========================
            DATA QUALITY
        ========================== */}
        <section className="insights-section findings-section">

          <div className="insights-section-heading">
            <div>
              <p className="eyebrow">
                DATA QUALITY
              </p>

              <h2>
                What needed a closer look.
              </h2>
            </div>

            <span className="quality-badge">
              4 findings
            </span>
          </div>


          <div className="findings-grid">

            <article className="finding-card">
              <div className="finding-top">
                <span className="finding-index">
                  01
                </span>

                <span className="finding-severity warning">
                  REVIEW
                </span>
              </div>

              <h3>
                Inactive inventory
              </h3>

              <strong>
                978
              </strong>

              <p>
                Records retrieved from the API were not marked as live,
                despite the documented active-only expectation.
              </p>
            </article>


            <article className="finding-card">
              <div className="finding-top">
                <span className="finding-index">
                  02
                </span>

                <span className="finding-severity warning">
                  REVIEW
                </span>
              </div>

              <h3>
                Project inventory mismatch
              </h3>

              <strong>
                392
              </strong>

              <p>
                Projects reported 392 listings in aggregate while the
                retrieved project dataset contained a different count.
              </p>
            </article>


            <article className="finding-card">
              <div className="finding-top">
                <span className="finding-index">
                  03
                </span>

                <span className="finding-severity critical">
                  ANOMALY
                </span>
              </div>

              <h3>
                Suspicious price records
              </h3>

              <strong>
                8
              </strong>

              <p>
                Extremely low positive-price records were identified
                and excluded from the relevant analysis.
              </p>
            </article>


            <article className="finding-card">
              <div className="finding-top">
                <span className="finding-index">
                  04
                </span>

                <span className="finding-severity critical">
                  ANOMALY
                </span>
              </div>

              <h3>
                Negative-price records
              </h3>

              <strong>
                8
              </strong>

              <p>
                Listings containing negative prices were identified
                as corrupt and excluded from calculations.
              </p>
            </article>

          </div>
        </section>


        {/* =========================
            METHODOLOGY
        ========================== */}
        <section className="methodology-section">

          <div className="methodology-intro">

            <p className="eyebrow">
              METHODOLOGY
            </p>

            <h2>
              Analysis with
              <em> precision.</em>
            </h2>

            <p>
              The analysis prioritised correctness over blindly trusting
              documented API behaviour. Retrieved data was inspected,
              filtered, deduplicated, and validated before calculating
              market metrics.
            </p>

          </div>


          <div className="methodology-card">

            <div className="method-step">
              <span>01</span>

              <div>
                <h3>
                  Retrieve
                </h3>

                <p>
                  Pulled paginated records from listings, rentals,
                  and projects endpoints.
                </p>
              </div>
            </div>


            <div className="method-step">
              <span>02</span>

              <div>
                <h3>
                  Validate
                </h3>

                <p>
                  Compared API behaviour and response fields against
                  the supplied documentation.
                </p>
              </div>
            </div>


            <div className="method-step">
              <span>03</span>

              <div>
                <h3>
                  Clean
                </h3>

                <p>
                  Removed corrupt and suspicious records from
                  calculations while preserving the original dataset.
                </p>
              </div>
            </div>


            <div className="method-step">
              <span>04</span>

              <div>
                <h3>
                  Interpret
                </h3>

                <p>
                  Converted the cleaned data into concise market
                  signals and actionable findings.
                </p>
              </div>
            </div>

          </div>

        </section>


        {/* =========================
            FOOTER NOTE
        ========================== */}
        <section className="insights-footer-note">

          <div>
            <span className="footer-mark">
              I
            </span>

            <div>
              <strong>
                IVY HOMES
              </strong>

              <span>
                Property intelligence, made clearer.
              </span>
            </div>
          </div>

          <p>
            Analysis prioritises data accuracy,
            transparency, and reproducibility.
          </p>

        </section>

      </main>
    </>
  );
};

export default Insights;