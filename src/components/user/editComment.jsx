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
        return
    }
  };
};
