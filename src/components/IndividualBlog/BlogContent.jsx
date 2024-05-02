import React from 'react';

const BlogContent = ({ title, content, images }) => {
    
    return (
        <div className='blog-content'>
            <h1>{title}</h1>
            <p>{content}</p>
            {images.map((image, index) => (
                <img key={index} src={image} alt={''} />
            ))}
        </div>
    );
};

export default BlogContent;
