// css Imports
import "./comments.css";
// all other imports

// There will need to be a user profile thumbnail image

// Username

// Indicator of the age of the comment

export const CommentSection = () => {
  return (
    <div className="comments">
      <div className="comment-tab">
        <div>Comments</div>
      </div>
      <UserComment />
    </div>
  );
};

export const UserComment = () => {
  return (
    <div className="comment-area">
      <div>Comments will be here</div>
      <div className="reactions"></div>
      <div className="comment-footer">
        <div className="icon-container">
          <div className="icon">👍</div>
          <div className="icon">👎</div>
        </div>
        <div className="reply-button">Reply</div>
        <div className="spoiler-button">View Spoilers</div>
      </div>
    </div>
  );
};
