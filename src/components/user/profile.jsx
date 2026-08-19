import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./profile.css";
import { getUserEscapeTime, getGames } from "../../data/games";
import {
  updateProfile,
  getUserProfile,
  getUserById,
  uploadProfileImage,
} from "../../data/auth";
import { GameBadges } from "../games/gameBadges";

export const UserProfileComponent = () => {
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [editedAboutMe, setEditedAboutMe] = useState("");
  const [editedFavoriteGameId, setEditedFavoriteGameId] = useState("");
  const [editedWantsToPlayId, setEditedWantsToPlayId] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState("false");
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    getUserProfile().then(setLoggedInUser);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchProfile = userId ? getUserById(userId) : getUserProfile();
    fetchProfile.then((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
  }, [userId]);

  useEffect(() => {
    getGames().then((data) => setGames(data || []));
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    getUserEscapeTime(currentUser.id).then((data) => {
      const approvedTimes = (data || []).filter((t) => t.approval_status);
      if (approvedTimes.length === 0) {
        setBestTime(null);
        return;
      }
      const fastest = approvedTimes.reduce((best, entry) =>
        entry.escape_time < best.escape_time ? entry : best,
      );
      setBestTime(fastest);
    });
  }, [currentUser?.id]);

  if (isLoading) return <p>Loading profile...</p>;
  if (!currentUser) return <p>Unable to load profile</p>;

  const isOwnProfile = loggedInUser && loggedInUser.id === currentUser.id;
  const showEditingUI = isOwnProfile && isEditing;

  const startEditing = () => {
    setEditedUsername(currentUser.username || "");
    setEditedAboutMe(currentUser.about_me || "");
    setEditedFavoriteGameId(
      currentUser.favorite_game ? currentUser.favorite_game.id : "",
    );
    setEditedWantsToPlayId(
      currentUser.wants_to_play_next ? currentUser.wants_to_play_next.id : "",
    );
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const saveChanges = () => {
    setIsSaving(true);
    const payload = {
      username: editedUsername,
      about_me: editedAboutMe,
      favorite_game_id: editedFavoriteGameId || null,
      wants_to_play_next_id: editedWantsToPlayId || null,
    };
    updateProfile(payload)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setIsEditing(false);
        setIsSaving(false);
      })
      .catch(() => setIsSaving(false));
  };

  const bestTimeGame = bestTime
    ? games.find((g) => g.id === bestTime.game)
    : null;

  return (
    <div className="profile-container">
      <div className="left-container">
        <div className="user-info-container">
          <img
            src={currentUser.profile_image || "/default_avatar.png"}
            alt={currentUser.username}
            className={`profile-img ${showEditingUI} ? "profile-img-editable" : ""}`}
            onClick={() => {
              if (showEditingUI) fileInputRef.current?.click();
            }}
          />
          {showEditingUI && (
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                setIsUploadingImage(true);
                uploadProfileImage(file)
                  .then((updatedUser) => setCurrentUser(updatedUser))
                  .finally(() => setIsUploadingImage(false));
              }}
            />
          )}
          <div className="button-container">
            {showEditingUI ? (
              <input
                className="user-button"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
              />
            ) : (
              <div className="user-button">{currentUser.username}</div>
            )}
            {isOwnProfile &&
              (isEditing ? (
                <div className="user-edit-buttons">
                  <button
                    className="user-button save-btn"
                    onClick={saveChanges}
                    disabled={isSaving}
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                  <button
                    className="user-button cancel-button"
                    onClick={cancelEditing}
                    disabled={isSaving}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="user-edit-buttons">
                  <button className="user-button" onClick={startEditing}>
                    Edit Profile
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="user-input-container">
          <div className="about-me">
            {showEditingUI ? (
              <textarea
                className="about-me-body"
                value={editedAboutMe}
                onChange={(e) => setEditedAboutMe(e.target.value)}
                placeholder="Tell others about yourself"
                rows={10}
              />
            ) : (
              currentUser.about_me || "No bio yet"
            )}
          </div>
          <div className="favorite-game">
            <strong>Favorite Game:</strong>
            {isEditing ? (
              <select
                value={editedFavoriteGameId}
                onChange={(e) => setEditedFavoriteGameId(e.target.value)}
              >
                <option value="">Favorite Game: none selected</option>
                {games.map((game) => (
                  <option key={game.id} value={game.id}>
                    {game.title}
                  </option>
                ))}
              </select>
            ) : currentUser.favorite_game ? (
              currentUser.favorite_game.title
            ) : (
              "Favorite Game: ???"
            )}
          </div>
          <div className="wish-item">
            <strong>Wants to play next:</strong>
            {isEditing ? (
              <select
                value={editedWantsToPlayId}
                onChange={(e) => setEditedWantsToPlayId(e.target.value)}
              >
                <option value="" className="wishlist-text">
                  Wants to play next: none selected
                </option>
                {games.map((game) => (
                  <option key={game.id} value={game.id}>
                    {game.title}
                  </option>
                ))}
              </select>
            ) : (
              <div className="wishlist-game">
                {currentUser.wants_to_play_next
                  ? currentUser.wants_to_play_next.title
                  : "TBD"}
              </div>
            )}
          </div>
        </div>
</div>

      <div className="right-container">
        <div className="game-badges-container">
          <GameBadges currentUser={currentUser} isEditing={isEditing} />
        </div>
      </div>
    </div>
  );
};
