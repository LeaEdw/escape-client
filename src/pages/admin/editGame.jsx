// CSS Imports

// JSX Imports
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGame } from "../../data/games";
import { updateGame, archiveGame, unarchiveGame } from "../../data/admin";
import { HamburgerMenu } from "../../components/navbar/navbar";

// Exports

export const EditGameFrom = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState("");
  const [ageRecommendation, setAgeRecommendation] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getGame(gameId).then((data) => {
      setGame(data);
      setTitle(data.title);
      setDescription(data.description);
      setDifficulty(data.difficulty);
      setNumberOfPlayers(data.number_of_players);
      setAgeRecommendation(data.age_recommendation);
    });
  }, [gameId]);

  const handleSubmit = (e) => {
    e.prevent();
    setIsSaving(true);
    setError(null);

    updateGame(gameId, {
      title,
      description,
      difficulty,
      number_of_players: parseInt(numberOfPlayers, 10),
      age_recommendation: ageRecommendation,
    })
      .then((updated) => {
        setGame(updated);
        setIsSaving(false);
      })
      .catch(() => {
        setError("Something went wrong saving changes.");
        setIsSaving(false);
      });
  };

  const handleArchiveToggle = () => {
    const action = game.active_status ? archiveGame : unarchiveGame;
    action(gameId).then((updated) => setGame(updated));
  };

  if (!game) return <p>Loading game...</p>;

  return (
    <>
    <HamburgerMenu />
      <div className="game-form-container">
        <form onSubmit={handleSubmit}>
          <label>
            {" "}
            Title
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Description
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <label>
            Difficulty
            <input
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              required
            />
          </label>
          <label>
            Number of Players
            <input
              value={numberOfPlayers}
              onChange={(e) => setNumberOfPlayers(e.target.value)}
              required
            />
          </label>
          <label>
            Age Recommendation
            <input
              value={ageRecommendation}
              onChange={(e) => setAgeRecommendation(e.target.value)}
              required
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" disabled={isSaving}>
            {isSaving ? "Creating" : "Create Game"}
          </button>
        </form>

        <button onClick={handleArchiveToggle} classNam="archive-button">
          {game.active_status ? "Archive Game" : "Unarchive Game"}
        </button>
      </div>
    </>
  );
};
