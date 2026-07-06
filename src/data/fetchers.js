import { getToken } from "./auth";

const API_URL = "http://localhost:8000";

const checkError = (res) => {
  if (!res.ok) {
    throw Error(res.status);
  }
  return res;
};

const checkErrorJson = async (res) => {
  if (res.ok) {
    if (res.status === 204) {
      return null;
    }
    const json = await res.json();
    return json;
  }

  const err = new Error(String(res.status));

  err.status = res.status;

  // Try to parse the response body as JSON, but if it fails, just set it to null
  try {
    err.body = await res.json();
  } catch (_) {
    err.body = null;
  }

  throw err;
};

const catchError = (err) => {
  if (err.message === "401") {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return;
  }
  throw err;
};

export const fetchWithResponse = (resource, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Token ${token}` } : {}),
    ...options.headers,
  };

  return fetch(`${API_URL}/${resource}`, { ...options, headers })
    .then(checkErrorJson)
    .catch(catchError);
};

export const fetchWithoutResponse = (resource, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Token ${token}` } : {}),
    ...options.headers,
  };
  return fetch(`${API_URL}/${resource}`, { ...options, headers })
    .then(checkError)
    .catch(catchError);
};
