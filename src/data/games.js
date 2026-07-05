import { fetchWithResponse } from "./fetchers";

export function getGames() {
    return fetchWithResponse('games', {
        headers: {
            Authorization: `Token ${localStorage.getItem('escape_token')}`
        }
    })
}

export function getGame(id) {
    return fetchWithResponse(`games${id}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('escape_token')}`
        }
    })
}

export function getRatings(gameId) {
    return fetchWithResponse(`ratings?game=${gameId}`)
}
