import { request } from "./client";

export const getListings = async ({
  offset = 0,
  limit = 50,
  locality = "",
  bhk = "",
  minPrice = "",
  maxPrice = "",
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

  if (minPrice !== "") {
    params.set("min_price", String(minPrice));
  }

  if (maxPrice !== "") {
    params.set("max_price", String(maxPrice));
  }

  if (furnishing) {
    params.set("furnishing", furnishing);
  }

  return request(`/v1/listings?${params.toString()}`);
};

export const getListingById = async (listingId) => {
  return request(
    `/v1/listings/${encodeURIComponent(listingId)}`
  );
};