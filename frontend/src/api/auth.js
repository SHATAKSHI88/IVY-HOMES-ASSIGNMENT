import { request } from "./client";

const ACCESS_TOKEN_KEY = "ivy_access_token";
const REFRESH_TOKEN_KEY = "ivy_refresh_token";
const USER_KEY = "ivy_current_user";
const EXPIRES_AT_KEY = "ivy_token_expires_at";

export const login = async (email, password) => {
  const response = await request("/auth/login", {
    method: "POST",
    auth: false,
    body: {
      email,
      password,
    },
  });

  localStorage.setItem(
    ACCESS_TOKEN_KEY,
    response.access_token
  );

  if (response.refresh_token) {
    localStorage.setItem(
      REFRESH_TOKEN_KEY,
      response.refresh_token
    );
  }

  const expiresIn =
    Number(response.expires_in) || 900;

  localStorage.setItem(
    EXPIRES_AT_KEY,
    String(Date.now() + expiresIn * 1000)
  );

  const user = {
    email,
  };

  localStorage.setItem(
    USER_KEY,
    JSON.stringify(user)
  );

  return response;
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem(
    REFRESH_TOKEN_KEY
  );

  if (!refreshToken) {
    throw new Error("No refresh token available.");
  }

  const response = await request(
    "/auth/refresh",
    {
      method: "POST",
      auth: false,
      body: {
        refresh_token: refreshToken,
      },
    }
  );

  localStorage.setItem(
    ACCESS_TOKEN_KEY,
    response.access_token
  );

  if (response.refresh_token) {
    localStorage.setItem(
      REFRESH_TOKEN_KEY,
      response.refresh_token
    );
  }

  const expiresIn =
    Number(response.expires_in) || 900;

  localStorage.setItem(
    EXPIRES_AT_KEY,
    String(Date.now() + expiresIn * 1000)
  );

  return response.access_token;
};

export const getAccessToken = () => {
  return localStorage.getItem(
    ACCESS_TOKEN_KEY
  );
};

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem(
      USER_KEY
    );

    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  return Boolean(getAccessToken());
};

export const logout = () => {
  localStorage.removeItem(
    ACCESS_TOKEN_KEY
  );

  localStorage.removeItem(
    REFRESH_TOKEN_KEY
  );

  localStorage.removeItem(
    EXPIRES_AT_KEY
  );

  localStorage.removeItem(
    USER_KEY
  );
};

export const getTokenExpiry = () => {
  return Number(
    localStorage.getItem(EXPIRES_AT_KEY)
  ) || 0;
};