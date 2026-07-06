import { useState, useEffect } from "react";
import { getLeaderboard, getGames } from "../../../data/games";
import "./leaderboard.css";

export const LeaderboardTable = ({ game }) => {
  const [times, setTimes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const rows = Array.from({ length: 10 }, (_, index) => times[index] || null);

  return (
    <table className="leaderboard-table">
      <thead>
        <tr>
          <th>Best Time</th>
          <th>Username</th>
          <th>#</th>
        </tr>
      </thead>
      
      <tbody>
        {rows.map((game, index) => (
          <tr key={game ? game.id : `empty-${index}`}>
            <td>{game ? game.escape_time : "--:--"}</td>
            <td className="leaderboard-user">
              {game ? (
                <>
                  <img
                    src={game.user.profile_image}
                    alt={game.user.username}
                    className="leaderboard-avatar"
                  />
                  {game.user.username}
                </>
              ) : (
                <span className="leaderboard-empty">—</span>
              )}
            </td>
            <td>{index + 1}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
