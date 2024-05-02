import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Interactions = ({ views, likes, onLike }) => {
    
    return (
        <div className='interactions'>
            <div className='views'>
                <p>{views} views</p>
            </div>
            <div className='likes'>
                <span>{likes} </span>
                <FontAwesomeIcon icon="fa-solid fa-heart" style={{ color: "#000000", cursor: 'pointer' }} onClick={onLike} />
            </div>
        </div>
    );
};

export default Interactions;
