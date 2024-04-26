import React, {useState} from 'react';

const CommentsSection = ({ comments }) => {
    const [comments, setComments] = useState([]);

    const handleDelete = async (commentId) => {
        try {
            const response = await fetch(`/api/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete comment');
            }
            setComments(comments => comments.filter(comment => comment._id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('An error occurred while deleting the comment. Please try again.');
        }
    };

    const handleEdit = async (commentId, updatedContent) => {
        try {
            const response = await fetch(`/api/comments/${commentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: updatedContent}),
            });
            if (!response.ok) {
                throw new Error('Failed to update comment');
            }

            const updatedCommentIndex = comments.findIndex(comment => comment._id === commentId);
            if (updatedCommentIndex === -1) {
                throw new Error('Comment not found');
            }
            const updatedComments = [...comments];
            updatedComments[updatedCommentIndex] = {...updatedComments[updatedCommentIndex], content: updatedContent};

            setComments(updatedComments);
        } catch (error) {
            console.error('Error updating comment:', error);
            alert('An error occurred while updating the comment. Please try again.');
        }
    };

    return (
        <div className='comments-section'>
            <h2>Comments</h2>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>
                        {comment.content}
                        {comment.userId === currentUser.id && (
                            <>
                                <button onClick={() => handleEdit(comment._id)}>Edit</button>
                                <button onClick={() => handleDelete(comment._id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentsSection;
