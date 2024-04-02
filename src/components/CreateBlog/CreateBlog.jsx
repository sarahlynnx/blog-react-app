import React, { useState } from 'react';
import './CreateBlog.css';
import ReactMarkdown from 'react-markdown';
import { getApiUrl } from '../api';

function NewBlogPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Replace 'YOUR_API_URL' with the actual URL of your API endpoint
    const apiUrl = getApiUrl('api/blogs');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        console.log('Blog created successfully!');
      } else {
        console.error('Failed to create blog:', response.status, response.statusText);
        const errorResponse = await response.json();
        console.error('Error details:', errorResponse);
      }
    } catch (error) {
      console.error('Error creating blog:', error.message);
    }
  };

  return (
    <div className='create-blog'>
      <h2>Create New Blog</h2>
      <form className='create-blog-form' onSubmit={handleSubmit}>
        <label htmlFor='title'>
          Title 
          <input id='title' placeholder='Enter a title' type='text' value={title} onChange={handleTitleChange} />
        </label>
        <label htmlFor='content'>
          Content (Markdown)
          <textarea id='content' className='create-blog-textarea' placeholder='Enter blog content' value={content} onChange={handleContentChange} />
        </label>
        <button className='create-blog-btn' type="submit">Submit Blog</button>
      </form>
      <div>
        <h3>Preview</h3>
        <ReactMarkdown className='create-blog-preview'>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default NewBlogPage;
