import React, { useState } from 'react';
import { getApiUrl } from '../api';

const CommentForm = () => {
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(getApiUrl('/api/comments'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ content: comment }),
            });
            if (!response.ok) {
                throw new Error('Failed to submit comment');
            }
            console.log('Comment submitted successfully');
            setComment('');
        } catch (error) {
            console.error('Error submitting comment:', error.message);
            alert('An error occurred while submitting the comment. Please try again.');
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
