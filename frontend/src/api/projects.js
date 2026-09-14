import { request } from "./client";

export const getProjects = async ({
  offset = 0,
  limit = 50,
  locality = "",
  status = "",
} = {}) => {
  const params = new URLSearchParams();

  params.set("limit", String(limit));
  params.set("offset", String(offset));

  if (locality.trim()) {
    params.set("locality", locality.trim());
  }

  if (status) {
    params.set("status", status);
  }

  return request(`/v1/projects?${params.toString()}`);
};