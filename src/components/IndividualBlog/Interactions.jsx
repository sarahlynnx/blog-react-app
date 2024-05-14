import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";

const Interactions = ({ views, likes, onLike, likedByUser }) => {
  return (
    <div className="interactions">
      <div className="views">
        <p>{views} views</p>
      </div>
      <div className="likes">
        <span>{likes} </span>
        {likedByUser ? (
          <FontAwesomeIcon
            icon={fasHeart}
            style={{ color: "#000000", cursor: "pointer" }}
            onClick={onLike}
          />
        ) : (
          <FontAwesomeIcon
            icon={farHeart}
            style={{ color: "#000000", cursor: "pointer" }}
            onClick={onLike}
          />
        )}
      </div>
    </div>
  );
};

export default Interactions;
