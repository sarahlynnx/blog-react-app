import React, { useState, useContext } from "react";
import { UserContext } from "../userContext";
import { formatDate } from "../DateFormat";

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
        {comments.map((comment) => (
          <li key={comment._id}>
            <div className="comment-item d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="comment-header" style={{ width: "250px" }}>
                  <strong>{comment.author.name}</strong>
                  {formatDate(comment.createdAt)}
                </div>
                {currentUser && comment.author._id === currentUser.id && (
                  <>
                    {commentId === comment._id ? (
                      <div>
                        <button onClick={cancelEdit}>Cancel</button>
                        <button onClick={() => saveEdit(comment._id)}>Save</button>
                      </div>
                    ) : (
                      <div>
                        <button onClick={() => beginEdit(comment)}>Edit</button>
                        <button onClick={() => handleDelete(comment._id)}>Delete</button>
                      </div>
                    )}
                  </>
                )}
              </div>
              {commentId === comment._id ? (
                <input
                  type="text"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                />
              ) : (
                <div className="comment-content">{comment.content}</div>
              )}
              </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsSection;
