import React, { useState, useContext } from "react";
import { UserContext } from "../userContext";

const CommentsSection = ({ comments, handleDelete, handleEdit }) => {
  const { currentUser } = useContext(UserContext);
  const [commentId, setCommentId] = useState(null);
  const [commentContent, setCommentContent] = useState("");

  const beginEdit = (comment) => {
    setCommentId(comment._id);
    setCommentContent(comment.content);
  };

  const cancelEdit = () => {
    setCommentContent("");
    setCommentId(null);
  };

  const saveEdit = (commentId) => {
    handleEdit(commentId, commentContent);
    cancelEdit();
  };
  return (
    <div className="comments-section">
      <h2>Comments</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            {commentId === comment._id ? (
              <>
                <input
                  type="text"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                />
                <button onClick={cancelEdit}>Cancel</button>
                <button onClick={() => saveEdit(comment._id)}>Save</button>
              </>
            ) : (
              <>
                {comment.content}
                {currentUser && comment.author._id === currentUser._id && (
                  <>
                    <button onClick={() => beginEdit(comment)}>Edit</button>
                    <button onClick={() => handleDelete(comment._id)}>
                      Delete
                    </button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsSection;
