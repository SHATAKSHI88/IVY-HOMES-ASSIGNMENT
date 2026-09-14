const getStorageKey = (user) => {
  const email =
    user?.email ||
    localStorage.getItem("ivy_user_email") ||
    "guest";

  return `ivy_saved_listings_${email}`;
};

export const getSavedListings = (user) => {
  try {
    const key = getStorageKey(user);
    const saved = localStorage.getItem(key);

    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Unable to read saved listings:", error);
    return [];
  }
};

export const isListingSaved = (listingId, user) => {
  const saved = getSavedListings(user);

  return saved.some(
    (listing) => listing.listing_id === listingId
  );
};

export const saveListing = (listing, user) => {
  const current = getSavedListings(user);

  const exists = current.some(
    (item) => item.listing_id === listing.listing_id
  );

  if (exists) {
    return current;
  }

  const updated = [listing, ...current];

  localStorage.setItem(
    getStorageKey(user),
    JSON.stringify(updated)
  );

  return updated;
};

export const removeSavedListing = (listingId, user) => {
  const current = getSavedListings(user);

  const updated = current.filter(
    (listing) => listing.listing_id !== listingId
  );

  localStorage.setItem(
    getStorageKey(user),
    JSON.stringify(updated)
  );

  return updated;
};

export const toggleSavedListing = (listing, user) => {
  if (isListingSaved(listing.listing_id, user)) {
    return removeSavedListing(
      listing.listing_id,
      user
    );
  }

  return saveListing(listing, user);
};