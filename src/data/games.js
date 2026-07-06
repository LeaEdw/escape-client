import { fetchWithResponse } from "./fetchers";

export function getGames() {
    return fetchWithResponse('games', {
        headers: {
            Authorization: `Token ${localStorage.getItem('escape_token')}`
        }
    })
}

export function getGame(id) {
    return fetchWithResponse(`games/${id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('escape_token')}`
        }
    })
}

export function getRatings(gameId) {
    return fetchWithResponse(`ratings?game=${gameId}`)
}

export function getLeaderboard(gameId) {
    return fetchWithResponse(`games/${gameId}/leaderboard`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('escape_token')}`
        }
    })
}

export function getMyTime(gameId) {
    return fetchWithResponse(`games/${gameId}/my_time`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('escape_token')}`
        }
    })
}