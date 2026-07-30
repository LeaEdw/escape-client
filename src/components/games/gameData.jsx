import { useState, useEffect } from "react";
import { getGames, getLeaderboard } from "../../data/games";
import { getUserProfile } from "../../data/auth";
import "./gameList.css";

export const GameData = ({ game }) => {
  const [times, setTimes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserProfile().then(setCurrentUser)
  }, [])

  useEffect(() => {
    if (!game) return;
    setIsLoading(true);
    getLeaderboard(game.id).then((data) => {
      setTimes(data || []);
      setIsLoading(false);
    });
  }, [game?.id]);

  if (!game) return null;
  if (isLoading) return <p>Loading leaderboard...</p>;

  const myEntryIndex = currentUser
    ? times.findIndex((entry) => entry.user.id === currentUser.id)
    : -1;
  const myEntry = myEntryIndex !== -1 ? times[myEntryIndex] : null;

  return (
    <div className="game-data-container">
      <div className="left-side-items">
        <div className="difficulty-container">
          Difficulty:
          {game.difficulty === "N/A" ? "N/A" : `${game.difficulty} / 10`}
        </div>
        <ul className="game-location-container">
          {game.locations.map((location) => (
            <li key={location.id}>
              📍 {location.city} - {location.area_location}
            </li>
          ))}
        </ul>
      </div>

      <div className="user-time-container">
        {currentUser.username}'s Personal Best: {myEntry ? myEntry.escape_time : "--:--:--"}
      </div>
    </div>
  );
};

export const DifficultyComponentStandalone = ({ game }) => {
  if (!game) return null;

  return (
    <div className="sq-difficulty-container">
      <span className="difficulty-rating">
        {game.difficulty === "N/A" ? "N/A" : `${game.difficulty} / 10`}
      </span>
      <div className="difficulty-text">Difficulty</div>
    </div>
  );
};
