import React, {useState, useEffect} from 'react';

const CommentsSection = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`/api/posts/${postId}/comments`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch comments');
                }
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchComments();
    }, []);

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
            setComments(comments => comments.map(comment => {
                if (comment._id === commentId) {
                    return {...comment, content: updatedContent}
                }
                return comment;
            }));
        } catch (error) {
            console.error('Error updating comment:', error);
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
