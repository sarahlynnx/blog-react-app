import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CreateBlog.css";
import ReactMarkdown from "react-markdown";
import { getApiUrl } from "../api";

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);

    useEffect(() => {
    return () => {
      images.forEach(file => URL.revokeObjectURL(file));
    };
  }, [images]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    images.forEach(file => URL.revokeObjectURL(file));

    setImages(Array.from(e.target.files));
  };  

  const markdownContent = `
  # ${title}

  ${content}
  `;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    images.forEach((image, index) => 
      formData.append('images', image));
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(getApiUrl('/api/posts'), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Blog created successfully!");
        alert("Blog created successfully!");
        setTitle("");
        setContent("");
        setImages([]);
      } else {
        throw new Error("Error creating blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error.message);
      alert("An error occurred while creating the blog. Please try again.");
    }
  };

  return (
    <div className="create-blog">
      <div className="cancel-create"><Link className="cancel-link" to={'/'}>Cancel</Link></div>
      <h2>Create New Blog</h2>
      <form className="create-blog-form" onSubmit={handleSubmit} method="post" encType="multipart/form-data">
        <label htmlFor="title">
          Title
          <input
            id="title"
            placeholder="Enter a title"
            type="text"
            value={title}
            onChange={handleTitleChange}
          />
        </label>
        <label htmlFor="content">
          Content
          <textarea
            id="content"
            className="create-blog-textarea"
            placeholder="Enter blog content"
            value={content}
            onChange={handleContentChange}
          />
        </label>
        <label htmlFor="image-upload">
          Upload Images
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </label>

        <button className="create-blog-btn" type="submit">
          Submit Blog
        </button>
      </form>
      <div>
        <h3>Preview</h3>
        <ReactMarkdown className="create-blog-preview">
          {markdownContent}
        </ReactMarkdown>
        {images.map(file => (
         <img key={file.name} src={URL.createObjectURL(file)} alt={file.name} style={{width: '330px'}}/>
        ))}
      </div>
    </div>
  );
};

export default CreateBlog;
