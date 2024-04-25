import React, {useState, useEffect, useCallback} from 'react';
import './blog.css';
import { getApiUrl } from '../api';

import BlogContent from './BlogContent';
import SharingIcons from './SharingIcons';
import Interactions from './Interactions';
import CommentsSection from './CommentsSection';
import CommentForm from './CommentForm';

const Blog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState([]);
    const [images, setImages] = useState([]);
    const [likes, setLikes] = useState();
    const [views, setViews] = useState();

    return (
        <div className='blog-container'>
            <BlogContent title={title} content={content} images={images} />
            <SharingIcons />
            <Interactions views={views} likes={likes} onLike={onLike} />
            <CommentsSection />
            <CommentForm /> 
        </div>  
    );
};


export default Blog;