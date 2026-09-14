import { request } from "./client";

export const getRentals = async ({
  offset = 0,
  limit = 50,
  locality = "",
  bhk = "",
  furnishing = "",
} = {}) => {
  const params = new URLSearchParams();

  params.set("limit", String(limit));
  params.set("offset", String(offset));

  if (locality.trim()) {
    params.set("locality", locality.trim());
  }

  if (bhk) {
    params.set("bhk", String(bhk));
  }

  if (furnishing) {
    params.set("furnishing", furnishing);
  }

  return request(`/v1/rentals?${params.toString()}`);
};