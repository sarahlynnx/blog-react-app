import React from 'react';

const BlogContent = ({ title, content, images }) => {
    return (
        <div className='blog-content'>
            <h1>{title}</h1>
            <p>{content}</p>
            {images.length > 0 && images.map((image, index) => (
                <img src={image.url} alt={title} key={index} className='blog-image' />
            ))}
        </div>
    );
};

export default BlogContent;
