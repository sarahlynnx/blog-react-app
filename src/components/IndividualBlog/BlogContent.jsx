import React from 'react';

const BlogContent = ({ author, date, title, content, images }) => {
    
    return (
        <div className='blog-content'>
            <p>{author}</p>
            <p>{date}</p>
            <button>Edit</button> 
            <button>Delete</button> 
            <h1>{title}</h1>
            <p>{content}</p>

            {images.map((image, index) => (
                <img key={index} src={image} alt={''} />
            ))}
        </div>
    );
};

export default BlogContent;
