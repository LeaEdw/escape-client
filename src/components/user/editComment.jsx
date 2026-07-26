import "./comments.css";

import { useState } from "react";
import { updateComment, deleteComment } from "../../data/games";

const initialEditState = {
  id: 0,
  commentTitle: "",
  commentBody: "",
};

export const EditComment = () => {
  const [commentToEdit, setCommentToEdit] = useState(initialEditState);
  const [refreshComments, setRefreshComments] = useState(0);

  const handleTitleCHange = (event) => {
    setCommentToEdit({
      ...commentToEdit,
      commentTitle: event.target.value,
    });
  };

  const handleBodyChange = (event) => {
    setCommentToEdit({
      ...commentToEdit,
      commentBody: event.target.value,
    });
  };

  const editOwnComment = async (e) => {
    e.preventDefault();

    if (!commentToEdit.commentBody || commentToEdit.commentBody.trim() === "") {
      alert("Comment body missing text.");
    }

    try {
      updateComment(commentToEdit);

      setRefreshComments((prev) => prev + 1);
      alert("Comment successfully updated.");

      setCommentToEdit(initialEditState);
    } catch (error) {
      console.error("Failed to update tasks:", error);
      alert("Failed to update tasks.");
      return (
        <>
          <div className="commentEdit-container">
            <fieldset>
              <input
                type="text"
                className="editTask-title"
                placeholder="Add a title"
                value={commentToEdit.commentTitle}
              />
            </fieldset>
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
                {" "}
                {isSubmitting ? "Posting..." : "Post Comment"}
              </button>
            </div>
          </div>
        </>
      );
    }
  };
};
