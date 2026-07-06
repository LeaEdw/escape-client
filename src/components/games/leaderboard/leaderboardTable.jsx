import { useState, useEffect } from "react";
import { getLeaderboard, getGames } from "../../../data/games";
import { getUserProfile } from "../../../data/auth";
import "./leaderboard.css";

export const LeaderboardTable = ({ game }) => {
  const [times, setTimes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserProfile().then(setCurrentUser);
  }, []);

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

  const myEntryIndex = currentUser
    ? times.findIndex((entry) => entry.user.id === currentUser.id)
    : -1;
  const myEntry = myEntryIndex !== -1 ? times[myEntryIndex] : null;
  const myRank = myEntryIndex !== -1 ? myEntryIndex + 1 : "N/A";

  return (
    <>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Best Time</th>
            <th className="username-column">Username</th>
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
                    <span className="rank-username">{game.user.username}</span>
                  </>
                ) : (
                  <span className="leaderboard-empty">—</span>
                )}
              </td>
              <td>{index + 1}</td>
            </tr>
          ))}
          <tr className="leaderboard-my-rank-row">
            <td>{myEntry ? myEntry.escape_time : "--:--"}</td>
            <td>My Personal Best</td>
            <td>{myRank}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};
