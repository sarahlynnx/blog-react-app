import React, {useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import './blog.css';
import { getApiUrl } from '../api';

import BlogContent from './BlogContent';
import SharingIcons from './SharingIcons';
import Interactions from './Interactions';
import CommentsSection from './CommentsSection';
import CommentForm from './CommentForm';

const Blog = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState([]);
    const [images, setImages] = useState([]);
    const [likes, setLikes] = useState();
    const [comments, setComments] = useState([]);
    const [views, setViews] = useState();

    const handleView = useCallback(() => {
        fetch(`/api/blogs/${id}/views`, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => setViews(data.views))
            .catch(error => console.error('Error updating views:', error));
    }, [id]);

    useEffect(() => {
        // fetch article details 
        fetch(getApiUrl(`blogs/${id}`), {
            method: 'GET',
          })
            .then(response => response.json())
            .then(data => {
                setTitle(data.title);
                setContent(data.content);
                setImages(data.images || []);
            })
            .catch(error => console.error('Error fetching article details:', error));

        //fetch article likes and views
        fetch(getApiUrl(`blogs/${id}`))
            .then(response => response.json())
            .then(data => {
                setViews(data.views);
                setLikes(data.likes);
            })
            .catch(error => console.error('Error fetching article:', error));

        //fetch article comments
        fetch(getApiUrl(`blogs/${id}`), { mode: 'no-cors' })
            .then(response => response.json())
            .then(data => setComments(data.comments))
            .catch(error => console.error('Error fetching comments:', error));

        handleView();

    }, [id, handleView]);

    const onLike = () => {
        fetch(`/api/blogs/${id}/likes`, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => setLikes(data.likes))
            .catch(error => console.error('Error updating likes:', error));
    };

    const addComment = ({comment}) => {
        fetch(`/api/blogs/${id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ comment }),
        })
            .then(response => response.json())
            .then(data => setComments(data.comments))
            .catch(error => console.error('Error adding comment:', error));
    }

    return (
        <div className='blog-container'>
            <BlogContent title={title} content={content} images={images} />
            <SharingIcons />
            <Interactions views={views} likes={likes} onLike={onLike} />
            <CommentsSection comments={comments} />
            <CommentForm onAddComment={addComment} /> 
        </div>  
    );
};


export default Blog;