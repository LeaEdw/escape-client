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

export function getUserEscapeTime(userId) {
    return fetchWithResponse(`escapetimes?user=${userId}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('escape_token')}`
        }
    })
}

export function getComments(gameId) {
    return fetchWithResponse(`comments?game=${gameId}`, {
        headers: {
            Authorization: `Token ${localStorage.getItem('escape_token')}`
        }
    })
}

export function createComment(commentData) {
    return fetchWithResponse('comments', {
        method: 'POST',
        headers: {
            Authorization: `Token ${localStorage.getItem('escape_token')}`
        },
        body: JSON.stringify(commentData)
    })
}

export function updateComment(commentData) {
    return fetchWithResponse('comments', {
        method: 'PATCH',
        headers: {
            Authorization: `Token ${localStorage.getItem('escape_token')}`
        },
        body: JSON.stringify(commentData)
    })
}

export function deleteComment(commentId) {
    return fetchWithResponse(`comments/${commentId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Token ${localStorage.getItem('escape_token')}`
        }
    })
}