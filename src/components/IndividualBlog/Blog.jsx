import React, {useState, useEffect} from 'react';
import './blog.css';
import { useParams } from 'react-router-dom';
import BlogContent from './BlogContent';
import SharingIcons from './SharingIcons';
import Interactions from './Interactions';
import CommentsSection from './CommentsSection';
import CommentForm from './CommentForm';

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
        comments: '',
    });

    const handleLike = async () => {
        try {
            const response = await fetch(`/api/posts/${id}/like`, {
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
            await fetch(`/api/posts/${id}/view`, {
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

    useEffect(() => {
        const fetchBlogData = async () => {
            try {
                const response = await fetch(`/api/posts/${postId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
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
                    author: data.author,
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
            <BlogContent author={author} date={date} title={title} content={content} images={images} />
            <SharingIcons />
            <Interactions views={views} likes={likes} onLike={handleLike} onView={handleView} />
            <CommentsSection comments={comments} />
            <CommentForm /> 
        </div>  
    );
};


export default Blog;