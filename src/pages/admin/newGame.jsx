// CSS Imports
import "./admin.css";
// JSX Imports
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGame, getLocations, uploadGameImage } from "../../data/admin";
import { AdminGameCarousel } from "./adminGameCarousel";
import { HamburgerMenu } from "../../components/navbar/navbar";

// Exports

export const NewGameForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numberOfPlayers, setNumberOfPlayers] = useState("");
  const [ageRecommendation, setAgeRecommendation] = useState("");
  const [locations, setLocations] = useState([]);
  const [selectedLocationIds, setSelectedLocationIds] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getLocations().then((data) => setLocations(data || []));
  }, []);

  const toggleLocation = (locationId) => {
    setSelectedLocationIds((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId],
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    createGame({
      title,
      description,
      difficulty,
      number_of_players: parseInt(numberOfPlayers, 10),
      age_recommendation: ageRecommendation,
      active_status: true,
      location_ids: selectedLocationIds,
    })
      .then((newGame) =>
        imageFile
          ? uploadGameImage(newGame.id, imageFile, true).then(() => newGame)
          : newGame,
      )
      .then((newGame) => {
        navigate(`/edit_game/${newGame.id}`);
      })
      .catch(() => {
        setError("Something went wrong creating the game");
        setIsSubmitting(false);
      });
  };

  return (
    <div className="game-form-container">
      <HamburgerMenu />
      <div className="admin-carousel">
        <AdminGameCarousel />
      </div>
      <div className="admin-file">
        <form onSubmit={handleSubmit}>
          <input
            className="input-bar title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Title"
          ></input>
          <div className="description-container">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description..."
              required
            ></textarea>
          </div>

          <div className="sbs-inputs">
            <input
              className="input-bar difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              required
              placeholder="Difficulty"
            ></input>
            <input
              className="input-bar number-of-players"
              value={numberOfPlayers}
              onChange={(e) => setNumberOfPlayers(e.target.value)}
              required
              placeholder="Number of Players"
            ></input>
            <input
              className="input-bar age-recommendation"
              value={ageRecommendation}
              onChange={(e) => setAgeRecommendation(e.target.value)}
              required
              placeholder="Age Recommendation"
            ></input>
          </div>

          <fieldset className="locations-container">
            <div>Locations:</div>
            {locations.map((location) => (
              <label key={location.id} className="location-checkbox">
                <input
                  type="checkbox"
                  checked={selectedLocationIds.includes(location.id)}
                  onChange={() => toggleLocation(location.id)}
                />
                {location.city} - {location.area_location}
              </label>
            ))}
          </fieldset>
          <div className="image-upload-container">
            <label for="game-image">
              <input
                id="game-image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0] || null)}
              />
            </label>
          </div>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating" : "Create Game"}
          </button>
        </form>
      </div>
    </div>
  );
};
