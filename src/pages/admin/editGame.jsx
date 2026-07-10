// CSS Imports
import "./admin.css";

// JSX Imports
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  updateGame,
  archiveGame,
  unarchiveGame,
  getLocations,
  getGameForAdmin,
} from "../../data/admin";
import { HamburgerMenu } from "../../components/navbar/navbar";
import { AdminGameCarousel } from "./adminGameCarousel";

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
  const [locations, setLocations] = useState([]);
  const [selectedLocationIds, setSelectedLocationIds] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isUnsaved, setIsUnsaved] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    getGameForAdmin(gameId).then((data) => {
      setGame(data);
      setTitle(data.title);
      setDescription(data.description);
      setDifficulty(data.difficulty);
      setNumberOfPlayers(data.number_of_players);
      setAgeRecommendation(data.age_recommendation);
      setSelectedLocationIds(data.locations.map((location) => location.id));
      setIsUnsaved(false);
    });
  }, [gameId]);

  useEffect(() => {
    getLocations().then((data) => setLocations(data || []));
  }, []);

  const markUnsaved = (setter) => (value) => {
    setter(value);
    setIsUnsaved(true);
  };

  const toggleLocation = (locationId) => {
    setSelectedLocationIds((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId],
    );
    setIsUnsaved(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaveStatus("saving");
    setError(null);

    updateGame({
      id: gameId,
      title,
      description,
      difficulty,
      number_of_players: parseInt(numberOfPlayers, 10),
      age_recommendation: ageRecommendation,
      location_ids: selectedLocationIds,
    })
      .then((updated) => {
        setGame(updated);
        setIsUnsaved(false);
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      })
      .catch(() => {
        setError("Something went wrong saving changes.");
        setSaveStatus("idle");
      });
  };

  if (!game) return <p>Loading game...</p>;

  const handleArchiveToggle = () => {
    const action = game.active_status ? archiveGame : unarchiveGame;
    action(gameId).then((updated) => {
      setGame(updated);
      setRefreshTrigger((prev) => prev + 1);
    });
  };

  return (
    <>
      <HamburgerMenu />
      <div className="admin-carousel">
        <AdminGameCarousel
          isUnsaved={isUnsaved}
          refreshTrigger={refreshTrigger}
        />
      </div>
      <div className="admin-file">
        <form onSubmit={handleSubmit}>
          <div className="game-edit-containers">
            <div className="title-desc-container">
              <input
                className="input-bar title"
                value={title}
                onChange={(e) => markUnsaved(setTitle)(e.target.value)}
                required
                placeholder="Title"
              ></input>
              <div className="description-container">
                <textarea
                  value={description}
                  onChange={(e) => markUnsaved(setDescription)(e.target.value)}
                  placeholder="Description..."
                  required
                > </textarea>
              </div>
            </div>
            <div className="sbs-locations-container">
              <div className="sbs-inputs">
                <input
                  className="input-bar difficulty"
                  value={difficulty}
                  onChange={(e) => markUnsaved(setDifficulty)(e.target.value)}
                  required
                  placeholder="Difficulty"
                ></input>
                <input
                  className="input-bar number-of-players"
                  value={numberOfPlayers}
                  onChange={(e) =>
                    markUnsaved(setNumberOfPlayers)(e.target.value)
                  }
                  required
                  placeholder="Number of Players"
                ></input>
                <input
                  className="input-bar age-recommendation"
                  value={ageRecommendation}
                  onChange={(e) =>
                    markUnsaved(setAgeRecommendation)(e.target.value)
                  }
                  required
                  placeholder="Age Recommendation"
                ></input>
              </div>

              <fieldset className="locations-container">
                {locations.map((location) => (
                  <label key={location.id} className="location-checkbox">
                    <input
                      type="checkbox"
                      className="checkbox-box"
                      checked={selectedLocationIds.includes(location.id)}
                      onChange={() => markUnsaved(toggleLocation)(location.id)}
                    />
                    {location.city} - {location.area_location}
                  </label>
                ))}
              </fieldset>
            </div>
          </div>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" disabled={saveStatus === "saving"}>
            {saveStatus === "saving"
              ? "Saving..."
              : saveStatus === "saved"
                ? "Saved"
                : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={handleArchiveToggle}
            className="archive-button"
          >
            {game.active_status ? "Archive Game" : "Unarchive Game"}
          </button>
        </form>
      </div>
    </>
  );
};
