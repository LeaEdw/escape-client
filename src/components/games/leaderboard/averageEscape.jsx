import { useEffect, useState } from "react";
import { getLeaderboard } from "../../../data/games";

const getEscapeSeconds = (duration) => {
    const parts = duration.split(":").map(Number);
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
};

const secondsToTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.round(totalSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, 0)}`
}

export const AverageEscapeTime = ({ game }) => {
    const [escapeTimes, setEscapeTimes] = useState([]);
    const [isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        if (!game) return;
        setIsLoading(true);
        getLeaderboard(game.id).then((data) => {
            setEscapeTimes(data || []);
            setIsLoading(false)
        })
    }, [game?.id])

    if(!game) return null;
    if (isLoading) return <p>Loading...</p>

    const averageTime = escapeTimes.length ? secondsToTime(escapeTimes.reduce(
        (sum, entry) => sum + getEscapeSeconds(entry.escape_time),
        0
    ) / escapeTimes.length) : "No times yet"


    return (
        <div className="average-time-container"> 
            <span className="average-time-label">{averageTime}</span>
            <div className="escape-average-text">Average Escape Time</div>
        </div>
    )
}