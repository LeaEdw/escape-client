import { useEffect, useState } from "react";
import "./profile.css";
import { getUserEscapeTime, getGames } from "../../data/games";
import { getUserProfile } from "../../data/auth";
import { GameBadges } from "../games/gameBadges";

export const UserProfileComponent = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const [games, setGames] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserProfile().then((user) => {
      setCurrentUser(user);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    getGames().then((data) => setGames(data || []))
  }, [])

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

  const bestTimeGame = bestTime ? games.find((g) => g.id === bestTime.game) : null;

  return (
    <div className="profile-container">
      <div className="top-container">
        <div className="game-badges"><GameBadges currentUser={currentUser}/></div>
        <div className="user-info">
          <img src={currentUser.profile_image} alt={currentUser.username} className="profile-img"/>
          <div className="button-container">
            <button className="user-button">{currentUser.username}</button>
            <button className="user-button">Edit Profile</button>
          </div>
        </div>
      </div>
      <div className="bottom-container">
        <div className="about-me">{currentUser.about_me || "No bio yet."}</div>
        <div className="favorite-game">
          {currentUser.favorite_game
            ? currentUser.favorite_game.title
            : "Favorite Game: ???"}
        </div>
        <div className="best-time">
          Best Time: {bestTime ? bestTime.escape_time : "--:--:--"}
          {bestTimeGame && `${bestTimeGame.title}`}
        </div>
        <div className="wish-item">
          Wants to play next:
          {currentUser.wants_to_play_next
            ? currentUser.wants_to_play_next.title
            : "TBD"}
        </div>
      </div>
    </div>
  );
};
