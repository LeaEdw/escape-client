import { fetchWithResponse } from "./fetchers";

export function getAllGamesForAdmin() {
  return fetchWithResponse(`games?include_archived=true`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("escape_token")}`,
    },
  });
}

export function getGameForAdmin(gameId) {
  return fetchWithResponse(`games/${gameId}?include_archived=true`, {
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
  return fetchWithResponse(`games/${gameData.id}?include_archived=true`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${localStorage.getItem("escape_token")}`,
    },
    body: JSON.stringify(gameData),
  });
}

export function uploadGameImage(gameId, file, isPrimary = false) {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("is_primary", isPrimary);

    return fetchWithResponse(`games/${gameId}/upload_image`, {
        method: "POST",
        headers: {
            Authorization: `Token ${localStorage.getItem("escape_token")}`
        },
        body: formData,
    })
}

export function archiveGame(gameId) {
  return updateGame({ id: gameId, active_status: false });
}

export function unarchiveGame(gameId) {
  return updateGame({ id: gameId, active_status: true });
}

export function getLocations() {
  return fetchWithResponse("locations", {
    headers: {
      Authorization: `Token ${localStorage.getItem("escape_token")}`,
    },
  });
}
