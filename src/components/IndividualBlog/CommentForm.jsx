import React, { useState } from 'react';

const CommentForm = () => {
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: commentContent }),
            });
            if (!response.ok) {
                throw new Error('Failed to submit comment');
            }
            console.log('Comment submitted successfully');
            setComment('');
        } catch (error) {
            console.error('Error submitting comment:', error.message);
        }
    };


    return (
            <div className='comment-form'>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='Add a comment...'
                    type='text'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default CommentForm;
