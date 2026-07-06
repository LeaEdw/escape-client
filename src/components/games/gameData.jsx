import { useState, useEffect } from "react";
import { getGames } from "../../data/games";

export const GameData = ({ game }) => {
  if (!game) return null;

  return (
    <div className="game-data-container">
      <div className="left-side-items">
        {" "}
        <div className="difficulty-container">
          Difficulty: {game.difficulty === "N/A" ? "N/A" : `${game.difficulty} / 10`}
        </div>
        <ul className="game-location-container">
          {game.locations.map((location) => (
            <li key={location.id}>
              📍 {location.city} - {location.area_location}
            </li>
          ))}
        </ul>
      </div>

      <div className="user-time-container">Best Time: ??:??</div>
    </div>
  );
};
