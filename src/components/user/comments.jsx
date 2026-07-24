import "./comments.css";
// all other imports
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGames, updateComment } from "../../data/games";
import { getUserProfile } from "../../data/auth";
import { createComment } from "../../data/games";
import { deleteComment } from "../../data/games";
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
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    setComments(game?.comments || []);
  }, [game]);

  useEffect(() => {
    getUserProfile().then(setLoggedInUser);
  }, []);

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


  const handleDelete = (commentId) => {
    deleteComment(commentId)
      .then(() => {
        setComments((prev) =>
          prev.filter((comment) => comment.id !== commentId),
        );
        setSuccessMessage("Message deleted successfully.");
        setTimeout(() => setSuccessMessage(null), 3000);
      })
      .catch(() => {
        setError("Something went wrong deleting your comment.");
      });
  };
  return (
    <div className="comment-layers">
      <div className="comments-container">
        <div className="comment-tab">
          <div>Comments</div>
        </div>
        <div className="comment-area">
          <div className="comment-list">
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
                      src={comment.user.profile_image || "/default-avatar.png"}
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
                    {loggedInUser?.id === comment.user.id && (
                      <button
                        type="button"
                        className="comment-delete"
                        onClick={() => handleDelete(comment.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          <form className="comment-form" onSubmit={handleSubmit}>
            <input
              className="comment-input-bar"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
            <textarea
              className="comment-textarea"
              value={commentBody}
              onChange={(e) => setCommentBody(e.target.value)}
              placeholder="Add a comment..."
              required
            ></textarea>
            <div className="comment-submission-container">
              {" "}
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
              <button
                className="comment-submit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </form>
          {successMessage && (
            <p className="comment-success">{successMessage}</p>
          )}
        </div>{" "}
      </div>
    </div>
  );
};
