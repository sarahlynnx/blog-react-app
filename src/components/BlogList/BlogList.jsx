import React, { useState, useEffect, useContext } from "react";
import ReactMarkdown from "react-markdown";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getApiUrl, getBlogImageUrl } from "../api";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { formatDate } from "../DateFormat";
import { UserContext } from "../userContext";
import "./bloglist.css";

const BlogList = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, logout } = useContext(UserContext);

  const handleLogoutSubmit = async () => {
    logout();
    localStorage.removeItem("token");
    console.log("Logout successful!");
    navigate("/");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(getApiUrl("/api/posts"), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Container>
      <div className="blog-header">
        <h2>All Posts</h2>
        {currentUser ? (
          <div className="d-flex gap-2">
            <button
              className="blog-login-btn"
              onClick={() => handleLogoutSubmit()}
            >
              Logout
            </button>
            {currentUser.role === "author" && (
              <button
                className="blog-login-btn"
                onClick={() => navigate("/blog/create")}
              >
                New blog
              </button>
            )}
          </div>
        ) : (
          <Link className="blog-login-link" to={"/signup"}>
            <button className="blog-login-btn">Login / Sign Up</button>
          </Link>
        )}
      </div>
      <div className="blog-preview">
        {loading ? (
          <LoadingAnimation />
        ) : (
          <>
            {blogs.map((blog) => (
              <Link
                className="ind-blog-link"
                to={`/blog/${blog._id}`}
                key={blog._id}
              >
                <Row className="blog-row">
                  <Col sm className="p-2">
                    <div className="blog-img">
                      {blog.images.length > 0 ? (
                        <img
                          src={getBlogImageUrl(blog._id, blog.images[0]._id)}
                          alt={`Thumbnail for ${blog.title} Blog`}
                        />
                      ) : (
                        <img
                          src="../Assets/logo1.svg"
                          alt="Playful Pathways Logo"
                        />
                      )}
                    </div>
                  </Col>
                  <Col sm className="p-2">
                    <div className="blog-info">
                      <div className="bloglist-blog-header">
                        <div className="blog-author-date">
                          {blog.author.name}
                        </div>
                        <div className="blog-author-date">
                          {formatDate(blog.date)}
                        </div>
                      </div>
                      <div className="bloglist-markdown">
                        <ReactMarkdown>{`### ${blog.title}`}</ReactMarkdown>
                        <ReactMarkdown>{blog.content}</ReactMarkdown>
                      </div>
                      <div>
                        <div style={{ borderBottom: "1px solid black" }}></div>
                        <div className="d-flex flex-row gap-3 mt-1">
                          <div>{blog.views} views</div>
                          <div>{blog.totalComments} comments</div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Link>
            ))}
          </>
        )}
      </div>
    </Container>
  );
};

export default BlogList;
