import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SharingIcons = ({title}) => {
    const tweetText = encodeURIComponent(`Check out this blog: ${title}`);
    return (
        <div className='sharing-icons'>
            <p>Share this article!</p>
            < a href={`https://twitter.com/intent/tweet?text=${tweetText}`} rel="noopener noreferrer" target="_blank" >
            <FontAwesomeIcon icon={"fa-brands fa-x-twitter"} />
            </a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    window.location.href )}`} target="_blank" rel="noopener noreferrer" >
            <FontAwesomeIcon icon={"fa-brands fa-linkedin-in"} style={{ color: "#000000" }} />
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    window.location.href)}`} target="_blank" rel="noopener noreferrer" >
            <FontAwesomeIcon icon={"fa-brands fa-facebook"} style={{ color: "#000000" }} />
            </a>
        </div>
    );
};

export default SharingIcons;
