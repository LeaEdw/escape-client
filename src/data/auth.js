import { fetchWithResponse } from "./fetchers";

export function login(user) {
  return fetchWithResponse("login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

export function register(user) {
  return fetchWithResponse("register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

export const getToken = () => localStorage.getItem("escape_token");

export const setToken = (token) => localStorage.setItem("escape_token", token);

export const removeToken = () => localStorage.removeItem("escape_token");

export const isAuthenticated = () => !!getToken();

export function getUserProfile() {
  return fetchWithResponse("profile", {
    headers: {
      Authorization: `Token ${localStorage.getItem("escape_token")}`,
    },
  });
}

export function updateProfile(data) {
  return fetchWithResponse("profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("escape_token")}`,
    },
    body: JSON.stringify(data),
  });
}

export function submitEscapeTime(gameId, escapeTime) {
  return fetchWithResponse("escapetimes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("escape_token")}`,
    },
    body: JSON.stringify({ game: gameId, escape_time: escapeTime }),
  });
}

export function getUserById(userId) {
  return fetchWithResponse(`users/${userId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('escape_token')}`}
  })
}