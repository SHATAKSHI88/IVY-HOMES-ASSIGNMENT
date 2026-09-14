import {
  getAccessToken,
  getTokenExpiry,
  refreshAccessToken,
  logout,
} from "./auth";

const BASE_URL = "https://solve.ivy.homes";

let refreshPromise = null;

const performRefresh = async () => {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken()
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

const request = async (
  path,
  {
    method = "GET",
    body,
    auth = true,
    retry = true,
  } = {}
) => {
  let token = getAccessToken();

  /*
   * Refresh the token before it expires.
   * 60-second buffer prevents requests from
   * failing because the token expires mid-request.
   */
  if (
    auth &&
    token &&
    getTokenExpiry() &&
    Date.now() >= getTokenExpiry() - 60000
  ) {
    try {
      token = await performRefresh();
    } catch (error) {
      console.error(
        "Token refresh failed:",
        error
      );

      logout();

      throw new Error(
        "Your session has expired. Please log in again."
      );
    }
  }

  const headers = {
    "Content-Type": "application/json",
  };

  if (auth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const apiKey =
    import.meta.env.VITE_IVY_API_KEY;

  if (apiKey) {
    headers["X-API-Key"] = apiKey;
  }

  const response = await fetch(
    `${BASE_URL}${path}`,
    {
      method,
      headers,
      body: body
        ? JSON.stringify(body)
        : undefined,
    }
  );

  /*
   * If the token was rejected by the API,
   * refresh once and retry the request.
   */
  if (
    response.status === 401 &&
    auth &&
    retry
  ) {
    try {
      const newToken =
        await performRefresh();

      return request(path, {
        method,
        body,
        auth,
        retry: false,
      });
    } catch (error) {
      console.error(
        "Unable to refresh session:",
        error
      );

      logout();

      throw new Error(
        "Your session has expired. Please log in again."
      );
    }
  }

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      data?.detail ||
      data?.message ||
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
};

export { request };