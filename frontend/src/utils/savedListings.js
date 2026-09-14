import { getCurrentUser } from "../api/auth";

const getStorageKey = () => {
  const user = getCurrentUser();

  if (!user?.email) {
    return "ivy_saved_listings";
  }

  return `ivy_saved_listings_${user.email}`;
};

export const getSavedListings = () => {
  try {
    const saved = localStorage.getItem(getStorageKey());

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const isListingSaved = (listingId) => {
  return getSavedListings().some(
    (listing) => listing.listing_id === listingId
  );
};

export const saveListing = (listing) => {
  const current = getSavedListings();

  const exists = current.some(
    (item) => item.listing_id === listing.listing_id
  );

  if (exists) {
    return current;
  }

  const updated = [listing, ...current];

  localStorage.setItem(
    getStorageKey(),
    JSON.stringify(updated)
  );

  return updated;
};

export const removeSavedListing = (listingId) => {
  const updated = getSavedListings().filter(
    (listing) => listing.listing_id !== listingId
  );

  localStorage.setItem(
    getStorageKey(),
    JSON.stringify(updated)
  );

  return updated;
};