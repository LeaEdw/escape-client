import "./profile.css";

export const UserProfileComponent = () => {
  return (
    <div className="profile-container">
      <div className="top-container">
        <div className="game-badges"></div>
        <div className="user-info">
          <div className="profile-img">Profile Image</div>
          <div className="button-container">
            <button className="user-button">Username</button>
            <button className="user-button">Edit Profile</button>
          </div>
        </div>
      </div>
      <div className="bottom-container">
        <div className="about-me">About Me</div>
        <div className="favorite-game">Favorite Game</div>
        <div className="best-time">Best Time</div>
        <div className="wish-item">Wants to play next: ...</div>
      </div>
    </div>
  );
};
