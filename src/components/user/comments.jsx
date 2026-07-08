import "./comments.css";
// all other imports
import { getGames } from "../../data/games";
import { useNavigate } from "react-router-dom";
import { confirmVisitProfile } from "./profileNavigator";

const getTimePosted = (createdAt) => {
  const now = new Date();
  const commentDate = new Date(createdAt);
  const secondsAgo = Math.floor((now - commentDate) / 1000);

  const intervals = [
    { label: "y", seconds: 31536000 },
    { label: "mo", seconds: 2592000 },
    { label: "w", seconds: 604800 },
    { label: "d", seconds: 86400 },
    { label: "h", seconds: 3600 },
    { label: "m", seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(secondsAgo / interval.seconds);
    if (count >= 1) {
      return `${count}${interval.label} ago`;
    }
  }

  return "just now";
};

export const CommentSection = ({ game }) => {
  const navigate = useNavigate();

  if (!game) return null;
  return (
    <div className="comments-container">
      <div className="comment-tab">
        <div>Comments</div>
      </div>
      <div className="comment-area">
        {game.comments.length === 0 ? (
          <p>No Comments Yet</p>
        ) : (
          game.comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div
                className="user-info"
                onClick={() =>
                  confirmVisitProfile(
                    navigate,
                    comment.user.id,
                    comment.user.username,
                  )
                }
              >
                <img
                  src={comment.user.profile_image}
                  alt={comment.user.username}
                  className="comment-avatar"
                />

                <p className="comment-author">
                  {comment.user.username}
                  <span className="comment-time">
                    {getTimePosted(comment.created_at)}
                  </span>
                </p>
              </div>
              <div className="comment-body-container">
                <h4 className="comment-title">{comment.title}</h4>
                <p className="comment-text">{comment.comment_body}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
