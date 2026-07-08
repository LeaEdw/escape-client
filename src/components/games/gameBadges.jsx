import { useState, useEffect } from "react";
import { getGames, getUserEscapeTime } from "../../data/games";
import { TimeSubmitModal } from "../user/TimeSubmit";
import lockIcon from "../../assets/lock.png"
import "./gameBadges.css";

export const GameBadges = ({ currentUser, isEditing }) => {
  const [games, setGames] = useState([]);
  const [completeGameIds, setCompletedGameIds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null)

  useEffect(() => {
    getGames().then((data) => setGames(data || []));
  }, []);

  const refetchTimes = () => {
    if (!currentUser) return;
    getUserEscapeTime(currentUser.id).then((data) =>{
        const approvedGameIds = (data || [])
            .filter((entry) => entry.approval_status)
            .map((entry) => entry.game)
        setCompletedGameIds(new Set(approvedGameIds));
        setIsLoading(false);
    })
  }

  useEffect(() => {
    refetchTimes();
  }, [currentUser?.id])

  if (isLoading) return <p>Loading badges...</p>;

  return (
    <div className="game-badges">
      {games.map((game) => {
        const primaryImage = game.images?.find((img) => img.is_primary);
        const isUnlocked = completeGameIds.has(game.id);

        return (
          <div
            key={game.id}
            className={`badge-item ${isUnlocked ? "unlocked" : "locked"} ${isEditing ? "editable" : ""}`}
            title={game.title}
            onClick={() => isEditing && setSelectedGame(game)}
          >
            {primaryImage && (
                <img 
                src={`http://localhost:8000/media/${primaryImage.image_path}`}
                alt={game.title}
                className="badge-image"/>
        )} {!isUnlocked && (
            <div className="badge-lock-overlay">
                <img src={lockIcon} alt="Locked" className="lock-icon"/>
            </div>
        )}
          </div>
        );
      })}

      {selectedGame && (
        <TimeSubmitModal
            game={selectedGame}
            onClose={() => setSelectedGame(null)}
            onSubmitted={refetchTimes} />
      )}
    </div>
  );
};
