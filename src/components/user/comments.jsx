import "./comments.css";
// all other imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGames } from "../../data/games";
import { createComment } from "../../data/games";
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
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setComments(game?.comments || []);
  }, [game]);

  if (!game) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    createComment({
      game: game.id,
      title,
      comment_body: commentBody,
      is_spoiler: isSpoiler,
    })
      .then((newComment) => {
        setComments((prev) => [...prev, newComment]);
        setTitle("");
        setCommentBody("");
        setIsSpoiler(true);
      })
      .catch(() => {
        setError("Something went wrong posting your comment.");
      })
      .finally(() => setIsSubmitting(false));
  };
  return (
    <div className="comments-container">
      <div className="comment-tab">
        <div>Comments</div>
      </div>

      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          className="input-bar"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
          placeholder="Add a comment..."
          required
        ></textarea>
        <label htmlFor="spoiler-checkbox">
          <input
            type="checkbox"
            id="spoiler-checkbox"
            checked={isSpoiler}
            onChange={(e) => setIsSpoiler(e.target.checked)}
          />
          Contains spoilers
        </label>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Posting..." : "Post Comment"}
        </button>
      </form>
      
        <div className="comment-area"><div className="comment-list">
          {comments.length === 0 ? (
            <p>No Comments Yet</p>
          ) : (
            comments.map((comment) => (
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
                  <p
                    className={`comment-text ${comment.is_locked ? "comment-blurred" : ""}`}
                  >
                    {comment.comment_body}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
