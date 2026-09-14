import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "../api/auth";

const STATS = [
  { value: "4,700", label: "Records analysed" },
  { value: "3,722", label: "Live listings" },
  { value: "149", label: "Added this week" },
];

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);

      const destination = location.state?.from || "/listings";
      navigate(destination, { replace: true });
    } catch (err) {
      setError(
        err.message ||
          "We couldn't sign you in. Check your details and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-shell">

        <div className="login-form-panel">
          <div className="login-form-inner">

            <div className="login-brand">
              <span className="login-brand-mark">I</span>
              <span className="login-brand-text">
                <strong>IVY</strong>
                <span>HOMES</span>
              </span>
            </div>

            <div className="login-heading">
              <h1>Welcome back</h1>
              <p>
                Sign in to explore properties, rentals and market insights.
              </p>
            </div>

            <form
              className="login-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="login-field">
                <label htmlFor="email">Email address</label>

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  disabled={loading}
                  autoFocus
                  required
                />
              </div>

              <div className="login-field">
                <div className="login-field-row">
                  <label htmlFor="password">Password</label>

                  <button
                    type="button"
                    className="login-forgot"
                    tabIndex={-1}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="login-password-wrap">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    disabled={loading}
                    required
                  />

                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M6.6 6.7C4.5 8.1 3 10 2 12c1.8 3.6 5.5 7 10 7 1.6 0 3.1-.4 4.5-1.1M9.9 5.1A10.8 10.8 0 0112 5c4.5 0 8.2 3.4 10 7-.6 1.2-1.4 2.4-2.4 3.5"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M2 12c1.8-3.6 5.5-7 10-7s8.2 3.4 10 7c-1.8 3.6-5.5 7-10 7s-8.2-3.4-10-7z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="login-error" role="alert">
                  <span className="login-error-icon">!</span>
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="login-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="login-spinner" />
                    Signing in
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <p className="login-footnote">
              Access is by invitation only. Contact your workspace admin
              if you need an account.
            </p>
          </div>
        </div>

        <div className="login-visual" aria-hidden="true">
          <div className="login-visual-inner">
            <p className="eyebrow login-visual-eyebrow">
              Market intelligence
            </p>

            <h2 className="login-visual-heading">
              Real intelligence
              <em> on every property.</em>
            </h2>

            <p className="login-visual-copy">
              Ivy Homes tracks pricing, inventory and locality trends
              across the market, so you always sign in to a live picture
              of where the opportunity is.
            </p>

            <div className="login-stats">
              {STATS.map((stat) => (
                <div className="login-stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            <svg
              className="login-skyline"
              viewBox="0 0 520 140"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M0 140V96h24V70h20v26h18V54h26v42h16V60h30v22h14V40h28v46h12V64h24v32h16V30h30v56h14V80h22v20h20V50h26v50h18V90h30v10H0z"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.2"
              />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;