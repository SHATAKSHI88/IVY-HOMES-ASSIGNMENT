import Navbar from "../components/Navbar";

const Insights = () => {
  const metrics = [
    {
      label: "Total listings",
      value: "4,700",
      description: "Records retrieved from the listings API",
    },
    {
      label: "Active listings",
      value: "3,722",
      description: "Listings currently marked as live",
    },
    {
      label: "Unique properties",
      value: "4,699",
      description: "One apparent duplicate physical property found",
    },
    {
      label: "7-day listings",
      value: "149",
      description: "Posted between Sep 3 and Sep 10, 2026",
    },
  ];

  const findings = [
    {
      number: "01",
      title: "Listing completeness needs attention",
      value: "978",
      description:
        "Records in the downloaded listing dataset were marked inactive, despite the documentation describing the endpoint as active-only.",
    },
    {
      number: "02",
      title: "Project inventory is inconsistent",
      value: "392",
      description:
        "Project records have a reported listing count that does not match the independently counted listings for that project.",
    },
    {
      number: "03",
      title: "Potential fake listings detected",
      value: "8",
      description:
        "Live listings with unusually low positive prices were identified as likely enquiry-bait records.",
    },
    {
      number: "04",
      title: "Corrupt prices detected",
      value: "8",
      description:
        "Eight listing records contain negative prices and were excluded from price-based analysis.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="insights-page">
        <header className="insights-header">
          <div>
            <p className="eyebrow">MARKET INTELLIGENCE</p>

            <h1>What the data is telling us.</h1>

            <p>
              A concise view of the property dataset,
              anomalies and signals discovered during API
              analysis.
            </p>
          </div>

          <div className="insight-source">
            <span>DATA SOURCE</span>
            <strong>Ivy Homes API</strong>
            <small>Reference date · 10 Sep 2026</small>
          </div>
        </header>

        <section className="metric-grid">
          {metrics.map((metric) => (
            <article
              className="metric-card"
              key={metric.label}
            >
              <span>{metric.label}</span>

              <strong>{metric.value}</strong>

              <p>{metric.description}</p>
            </article>
          ))}
        </section>

        <section className="insights-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">DATA QUALITY</p>

              <h2>Signals worth investigating</h2>
            </div>

            <span className="finding-count">
              4 priority findings
            </span>
          </div>

          <div className="findings-grid">
            {findings.map((finding) => (
              <article
                className="finding-card"
                key={finding.number}
              >
                <div className="finding-number">
                  {finding.number}
                </div>

                <div className="finding-content">
                  <h3>{finding.title}</h3>

                  <strong>{finding.value}</strong>

                  <p>{finding.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="insights-bottom">
          <div className="insight-panel">
            <p className="eyebrow">MARKET SNAPSHOT</p>

            <h2>2-BHK pricing</h2>

            <div className="big-stat">
              ₹21,040
              <span>/ sqft</span>
            </div>

            <p>
              Mean price per carpet sqft across live
              2-bedroom listing records after excluding
              corrupt and fake records.
            </p>
          </div>

          <div className="insight-panel">
            <p className="eyebrow">PROJECT MARKET</p>

            <h2>Highest project ceiling</h2>

            <div className="big-stat">
              ₹99.80
              <span>Cr</span>
            </div>

            <p>
              Project P10068 has the highest reported
              maximum project price in the dataset.
            </p>
          </div>

          <div className="insight-panel">
            <p className="eyebrow">RENTAL MARKET</p>

            <h2>Yelahanka rental volume</h2>

            <div className="big-stat">
              ₹57.70L
            </div>

            <p>
              Combined monthly rent across all rental
              records assigned to Yelahanka.
            </p>
          </div>
        </section>

        <section className="methodology-card">
          <div>
            <p className="eyebrow">METHODOLOGY</p>

            <h2>Built from observed API behaviour</h2>
          </div>

          <p>
            These insights are calculated from the
            records retrieved directly from the Ivy Homes
            API. Where the API documentation conflicted
            with observed behaviour, the running API was
            treated as the source of truth.
          </p>
        </section>
      </main>
    </>
  );
};

export default Insights;