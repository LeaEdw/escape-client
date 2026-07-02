import "./gameList.css";

import { useEffect, useState } from "react";
import { getRatings } from "../../data/games";

export const RatingsContainer = ({ game }) => {
  const [ratings, setRatings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!game) return;
    setIsLoading(true);
    getRatings(game.id).then((data) => {
      setRatings(data || []);
      setIsLoading(false);
    });
  }, [game?.id]);

  if (!game) return null;
  if (isLoading) return <p>Loading...</p>;

  const avgFun = ratings.length
    ? (ratings.reduce((sum, r) => sum + r.fun, 0) / ratings.length).toFixed(1)
    : "No ratings yet";
  const avgDesign = ratings.length
    ? (ratings.reduce((sum, r) => sum + r.design, 0) / ratings.length).toFixed(
        1,
      )
    : "No ratings yet";
  const avgDifficulty = ratings.length
    ? (
        ratings.reduce((sum, r) => sum + r.difficulty, 0) / ratings.length
      ).toFixed(1)
    : "No ratings yet";

  return (
    <div className="rating-container">
      <p className="rating-item">
        {avgDesign} <div className="rating-text">Design</div>
      </p>
      <p className="rating-item">
        {avgFun} <div className="rating-text">Fun</div>
      </p>

      <p className="rating-item">
        {avgDifficulty} <div className="rating-text">Difficulty</div>
      </p>
    </div>
  );
};
