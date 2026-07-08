import { fetchWithResponse } from "./fetchers";

export function getAllGamesForAdmin() {
  return fetchWithResponse("games?include_archived=true", {
    headers: {
      Authorization: `Token ${localStorage.getItem("escape_token")}`,
    },
  });
}

export function createGame(gameData) {
  return fetchWithResponse("games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("escape_token")}`,
    },
    body: JSON.stringify(gameData),
  });
}

export function updateGame(gameData) {
  return fetchWithResponse(`games/${gameId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("escape_token")}`,
    },
    body: JSON.stringify(gameData),
  });
}

export function archiveGame(gameId) {
  return updateGame(gameId, { active_status: false });
}

export function unarchiveGame(gameId) {
  return updateGame(gameId, { active_status: true });
}

export function getLocations() {
  return fetchWithResponse("locations", {
    headers: {
      Authorization: `Token ${localStorage.getItem("escape_token")}`,
    },
  });
}
