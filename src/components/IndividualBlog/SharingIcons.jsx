import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";

const SharingIcons = ({ title}) => {
  const { id } = useParams();
  const postUrl = `https://sarahlynnx.github.io/Playful-Pathways/blog.html#/blog/${id}`;
  const titleText = encodeURIComponent(`Check out this blog: ${title}`);
  return (
    <div className="sharing-icons">
      <p>Share this article!</p>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(titleText)}&url=${encodeURIComponent(postUrl)}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <FontAwesomeIcon icon={"fa-brands fa-x-twitter"} />
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={"fa-brands fa-linkedin-in"}
          style={{ color: "#000000" }}
        />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon
          icon={"fa-brands fa-facebook"}
          style={{ color: "#000000" }}
        />
      </a>
    </div>
  );
};

export default SharingIcons;
