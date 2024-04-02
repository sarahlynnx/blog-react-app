import React, { useState } from 'react';

const CommentForm = ({ onAddComment }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddComment({ comment });
        setComment('');
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
