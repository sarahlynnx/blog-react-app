import React, {useState, useEffect} from 'react';
import './blog.css';
import { useParams } from 'react-router-dom';
import BlogContent from './BlogContent';
import SharingIcons from './SharingIcons';
import Interactions from './Interactions';
import CommentsSection from './CommentsSection';
import CommentForm from './CommentForm';
import { getApiUrl } from '../api';

const Blog = () => {
    const { id } = useParams();
    const [blogData, setBlogData] = useState({
        title: '',
        content: [],
        images: [],
        likes: 0,
        views: 0,
        author: '',
        date: '',
        comments: [],
    });

    const handleLike = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(getApiUrl(`/api/posts/${id}/like`), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            if(response.ok) {
                setBlogData(prevData => ({ ...prevData, likes: prevData.likes + 1 }));
            } else {
                throw new Error('Error updating likes');
            }
        } catch (error) {
            console.error('Error updating likes:', error);
        }
    };

    const handleView = async () => {
        try {
            await fetch(getApiUrl(`/api/posts/${id}/view`), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', 
                },
            });
            setBlogData(prevData => ({...prevData, views: prevData.views + 1}));
        } catch (error) {
            console.error('Error updating views', error);
        }
    };

    const handleDelete = async (commentId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(getApiUrl(`/api/comments/${commentId}`), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete comment');
            }
            setBlogData(prevData => ({
                ...prevData,
                comments: prevData.comments.filter(comment => comment._id !== commentId)
            }));
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('An error occurred while deleting the comment. Please try again.');
        }
    };

    const handleEdit = async (commentId, updatedContent) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(getApiUrl(`/api/comments/${commentId}`), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ content: updatedContent}),
            });
            if (!response.ok) {
                throw new Error('Failed to update comment');
            }
            setBlogData(prevData => {
                const updatedComments = prevData.comments.map(comment => 
                    comment._id === commentId ? { ...comment, content: updatedContent } : comment
                );
                return { ...prevData, comments: updatedComments };
            });
        } catch (error) {
            console.error('Error updating comment:', error);
            alert('An error occurred while updating the comment. Please try again.');
        }
    };

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await fetch(getApiUrl(`/api/posts/${id}`), {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch post');
                }
                const data = await response.json();
                setBlogData({
                    title: data.title,
                    content: data.content,
                    images: data.images,
                    likes: data.likes,
                    views: data.views,
                    author: data.author.name,
                    date: data.date,
                    comments: data.comments,
                });
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchBlogData();
    }, [id]);

    return (
        <div className='blog-container'>
            <BlogContent author={blogData.author} date={blogData.date} title={blogData.title} content={blogData.content} images={blogData.images} />
            <SharingIcons />
            <Interactions views={blogData.views} likes={blogData.likes} onLike={handleLike} onView={handleView} />
            <CommentsSection comments={blogData.comments} handleDelete={handleDelete} handleEdit={handleEdit} />
            <CommentForm /> 
        </div>  
    );
};


export default Blog;