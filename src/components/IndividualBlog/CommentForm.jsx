import React from 'react';

const CommentForm = ({handleSubmit, comment, setComment}) => {

    return (
            <div className='comment-form'>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder='Add a comment...'
                    type='text'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default CommentForm;
