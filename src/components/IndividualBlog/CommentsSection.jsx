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
              <div className="d-flex flex-column">
              <div className="comment-header">
                <div className="comment-header" style={{width: '250px'}}>
                  <div><strong>
                    {comment.author.name}
                  </strong></div>
                  <div>
                  {formatDate(comment.createdAt)}
                  </div>
                </div>
                  {currentUser && comment.author._id === currentUser.id && (
                    <div>
                      <button onClick={() => beginEdit(comment)}>Edit</button>
                      <button onClick={() => handleDelete(comment._id)}>
                        Delete
                      </button>
                    </div>
                  )}
              </div>
              <div className="comment-content">
                {comment.content}
              </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentsSection;
