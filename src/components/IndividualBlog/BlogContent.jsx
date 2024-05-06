import React from 'react';

const BlogContent = ({ title, content, images }) => {
    const mainImage = images.length > 0 ? images[0].url : null; // Use image URL from fetched data

    return (
        <div className='blog-content'>
            {mainImage && (
                <img src={mainImage} alt={title} className='blog-main-image' />
            )}
            <h1>{title}</h1>
            <p>{content}</p>
            {images.slice(1).map((image, index) => (
                <img key={index} src={image.url} alt='' className='blog-secondary-image' />
            ))}
        </div>
    );
};

export default BlogContent;
