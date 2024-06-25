import React, { useState, useEffect, useContext } from "react";
import "./blog.css";
import { useParams, useNavigate } from "react-router-dom";
import BlogContent from "./BlogContent";
import SharingIcons from "./SharingIcons";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Interactions from "./Interactions";
import CommentsSection from "./CommentsSection";
import CommentForm from "./CommentForm";
import { UserContext } from "../userContext";
import { getApiUrl, getBlogImageUrl } from "../api";

const Blog = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    images: [],
    likes: 0,
    views: 0,
    author: {},
    date: "",
    likedByUser: false,
  });
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const clearTokenAndRedirect = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // like post
  const handleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowErrorMsg(true);
      return;
    }

    try {
      const response = await fetch(getApiUrl(`/api/posts/${id}/like`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log("before update:", blogData.likedByUser);
        setBlogData((prevData) => ({
          ...prevData,
          likes: data.likes,
          likedByUser: data.likedByUser,
        }));
        console.log("after update", data.likedByUser);
        console.log(data.msg);
      } else {
        if (response.status === 401) {
          alert("Session has expired, please log in again.");
          clearTokenAndRedirect();
        } else {
          throw new Error("Error updating likes");
        }
      }
    } catch (error) {
      console.error("Error updating likes:", error);
      alert("An error occured while updating likes.");
    }
  };

  // delete comment
  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to delete your comment");
      return;
    }
    try {
      const response = await fetch(getApiUrl(`/api/comments/${commentId}`), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        const commentsData = await fetchComments();
        setComments(commentsData.comments);
        setCurrentPage(commentsData.currentPage);
        setTotalPages(commentsData.totalPages);
        alert(data.msg);
      } else {
        if (response.status === 401) {
          alert("Session has expired, please log in again.");
          clearTokenAndRedirect();
        } else {
          throw new Error("Failed to delete comment");
        }
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the comment. Please try again.");
    }
  };

  // Delete post
  const handleDeletePost = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to delete the post.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this post?")) {
      console.log("Deletion cancelled");
      return;
    }
    try {
      const response = await fetch(getApiUrl(`/api/posts/${id}`), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        alert(data.msg);
        navigate("/");
      } else {
        if (response.status === 401) {
          alert("Session has expired, please log in again.");
          clearTokenAndRedirect();
        } else {
          throw new Error("Failed to delete post");
        }
      }
    } catch (error) {
      console.error(error);
      alert("An error occured while deleting the post. Please try again.");
    }
  };

  // Edit comment
  const handleEditComment = async (commentId, updatedContent) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to edit your comment.");
      return;
    }
    try {
      const response = await fetch(getApiUrl(`/api/comments/${commentId}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: updatedContent }),
      });
      if (response.ok) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? { ...comment, content: updatedContent }
              : comment
          )
        );
      } else {
        if (response.status === 401) {
          alert("Session has expired, please log in again.");
          clearTokenAndRedirect();
        } else {
          throw new Error("Failed to update comment");
        }
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      alert("An error occurred while updating the comment. Please try again.");
    }
  };

  // // Edit post
  const handleEditPost = async (updatedContent, updatedTitle) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to edit the post.");
      return;
    }
    try {
      const response = await fetch(getApiUrl(`/api/posts/${id}`), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: updatedContent, title: updatedTitle }),
      });
      if (response.ok) {
        setBlogData((prevData) => ({
          ...prevData,
          title: updatedTitle,
          content: updatedContent,
        }));
      } else {
        if (response.status === 401) {
          alert("Session has expired, please log in again.");
          clearTokenAndRedirect();
        } else {
          throw new Error("Failed to update post");
        }
      }
    } catch (error) {
      console.error(error);
      alert("An error occured while updating the post. Please try again.");
    }
  };

  // Post comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setShowErrorMsg(true);
      return;
    }
    try {
      const response = await fetch(getApiUrl("/api/comments"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: comment, postId: id }),
      });
      const data = await response.json();
      if (response.ok) {
        const commentsData = await fetchComments(id, currentPage);
        setComments(commentsData.comments);
        setCurrentPage(commentsData.currentPage);
        setTotalPages(commentsData.totalPages);
        setComment("");
      } else {
        if (response.status === 401) {
          alert("Session has expired, please log in again.");
          clearTokenAndRedirect();
        } else {
          throw new Error("Failed to submit comment");
        }
      }
    } catch (error) {
      console.error("Error submitting comment:", error.message);
      alert(
        "An error occurred while submitting the comment. Please try again."
      );
    }
  };

  // Fetch Post Data on mount
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const post = await fetchPost(id);
        const images = await fetchImages(id, post.images);
        const likedByUser = currentUser
          ? post.likedBy.includes(currentUser.id)
          : false;
        setBlogData({
          title: post.title,
          content: post.content,
          images: images,
          likes: post.likes,
          views: post.views,
          author: post.author,
          date: post.date,
          likedByUser: likedByUser,
        });
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchBlogData();
  }, [id, currentUser]);

  // Get Individual Post
  const fetchPost = async (postId) => {
    const response = await fetch(getApiUrl(`/api/posts/${postId}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch post with ID: ${postId}`);
    }
    return await response.json();
  };

  useEffect(() => {
    const fetchCommentsData = async () => {
      try {
        const commentsData = await fetchComments();
        setComments(commentsData.comments);
        setCurrentPage(commentsData.currentPage);
        setTotalPages(commentsData.totalPages);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchCommentsData();
  }, [id, currentPage]);

  // Get all comments for individual post
  const fetchComments = async () => {
    try {
      const response = await fetch(
        getApiUrl(`/api/comments?postId=${id}&page=${currentPage}&limit=5`),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch comments for post ID: ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching comments:", error);
      throw error;
    }
  };

  // Get all images for individual post
  const fetchImages = async (postId, images) => {
    const imagesData = await Promise.all(
      images.map(async (image) => {
        try {
          const imageUrl = getBlogImageUrl(postId, image._id);
          const response = await fetch(imageUrl);
          if (response.ok) {
            const imageData = await response.blob();
            return {
              ...image,
              url: URL.createObjectURL(imageData),
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error fetching image:", error);
          return null;
        }
      })
    );
    return imagesData.filter((img) => img !== null);
  };

  return (
    <>
      <div className="blog-container">
        <BlogContent
          title={blogData.title}
          content={blogData.content}
          images={blogData.images}
          author={blogData.author}
          date={blogData.date}
          handleDeletePost={handleDeletePost}
          handleEditPost={handleEditPost}
        />
        <SharingIcons title={blogData.title} />
        <Interactions
          views={blogData.views}
          likes={blogData.likes}
          onLike={handleLike}
          likedByUser={blogData.likedByUser}
        />
        <CommentsSection
          comments={comments}
          handleDelete={handleDeleteComment}
          handleEdit={handleEditComment}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
        <CommentForm
          handleSubmit={handleSubmitComment}
          comment={comment}
          setComment={setComment}
        />
      </div>
      {showErrorMsg && (
        <ErrorMessage
          message="Please log in to like or comment on this post."
          onClose={() => setShowErrorMsg(false)}
        />
      )}
    </>
  );
};

export default Blog;
