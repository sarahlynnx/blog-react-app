import React, {useState, useContext} from 'react';
import { formatDate } from '../DateFormat';
import { UserContext } from "../userContext";

const BlogContent = ({ title, content, images, author, date, handleDeletePost, handleEditPost }) => {
    const { currentUser } = useContext(UserContext);
    const [editing, setEditing] = useState(false);
    const [postContent, setPostContent] = useState(content);
    const [postTitle, setPostTitle] = useState(title);

    const beginEdit = (post) => {
        setEditing(true);
        setPostContent(content);
        setPostTitle(title);
    };

    const cancelEdit = () => {
        setPostContent(content);
        setPostTitle(title);
        setEditing(false);
    };

    const saveEdit =() => {
        handleEditPost(postContent, postTitle);
        setEditing(false);
    }

    return (
        <div className='blog-content'>
            <div className='individual-blog-header'>
                <div className='d-flex flex-row gap-4'>
                    <div>{author.name}</div>
                    <div>{formatDate(date)}</div>
                </div>
                {currentUser && author._id === currentUser.id && (
                    <div>
                        {!editing ? (
                            <>
                                <button className='author-blog-btns' onClick={beginEdit}>Edit</button>
                                <button className='author-blog-btns' onClick={handleDeletePost}>Delete</button>
                            </>
                        ) : (
                            <>
                                <button className='author-blog-btns' onClick={saveEdit}>Save</button>
                                <button className='author-blog-btns' onClick={cancelEdit}>Cancel</button>
                            </>
                        )}
                    </div>
                )}
            </div> 
            {editing ? (
                <>
                    <input type='text' value={postTitle} onChange={(e) => setPostTitle(e.target.value)} className='post-update-input'/>
                    <textarea value={postContent} onChange={(e) => setPostContent(e.target.value)} className='post-update-input'/>
                </>
            ) : (
                <>
                    <h1>{title}</h1>
                    <p>{content}</p> 
                </>
            )}
            {images.length > 0 && images.map((image, index) => (
                <img src={image.url} alt={title} key={index} className='blog-image' />
            ))}
        </div>
    );
};

export default BlogContent;
