import React, {useState, useEffect} from 'react';
import './blog.css';
import { useParams } from 'react-router-dom';
import BlogContent from './BlogContent';
import SharingIcons from './SharingIcons';
import Interactions from './Interactions';
import CommentsSection from './CommentsSection';
import CommentForm from './CommentForm';
import { getApiUrl } from '../api';
import { formatDate } from '../DateFormat';

const Blog = () => {
    const { id } = useParams();
    const [comment, setComment] = useState('');
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
                const data = await response.json();
                setBlogData(prevData => ({ 
                    ...prevData, 
                    likes: data.likes,
                    likedByUser: data.likedByUser 
                }));
            } else {
                throw new Error('Error updating likes');
            }
        } catch (error) {
            console.error('Error updating likes:', error);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(getApiUrl('/api/comments'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ content: comment, postId: `${id}` }),
            });
            if (!response.ok) {
                throw new Error('Failed to submit comment');
            }
            console.log('Comment submitted successfully');
            setComment('');
        } catch (error) {
            console.error('Error submitting comment:', error.message);
            alert('An error occurred while submitting the comment. Please try again.');
        }
    };

    useEffect(() => {
        const fetchBlogData = async () => {
            console.log(`Component mounted or id changed: ${id}`);
            try {
                console.log(`Fetching post data for ID: ${id}`);
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
                    likedByUser: data.likedBy ? data.likedBy.includes(localStorage.getItem('userId')) : false
                });
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchBlogData();
    }, [id]);

    return (
        <div className='blog-container'>
            <div className='d-flex flex-row justify-content-between align-items-center p-2'>
                <div className='d-flex flex-row gap-4'>
                    <div>{blogData.author}</div>
                    <div>{formatDate(blogData.date)}</div>
                </div>
                <div>
                    <button>Edit</button> 
                    <button>Delete</button> 
                </div>
            </div>
            <BlogContent title={blogData.title} content={blogData.content} images={blogData.images} />
            <SharingIcons />
            <Interactions views={blogData.views} likes={blogData.likes} onLike={handleLike} />
            <CommentsSection comments={blogData.comments} handleDelete={handleDelete} handleEdit={handleEdit} />
            <CommentForm handleSubmit={handleSubmit} comment={comment} setComment={setComment} /> 
        </div>  
    );
};


export default Blog;