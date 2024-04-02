import React from 'react';

const CommentsSection = ({ comments }) => {
    return (
        <div className='comments-section'>
            <h2>Comments</h2>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommentsSection;
