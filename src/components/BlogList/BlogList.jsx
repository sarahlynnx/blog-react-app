import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './bloglist.css';

const BlogList = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
        try {
            const response = await fetch('/api/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            setBlogs((prevBlogs) => [...prevBlogs, ...data]);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    fetchPosts();
}, []);

    const onToggleLogin = () => {
        if (isLoggedIn) {
            setIsLoggedIn(false);
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <Container>
                <div className='blog-header'>
                    <h2>All Posts</h2>
                    {isLoggedIn ? (
                        <button className='blog-login-btn' onClick={() => onToggleLogin()}>
                            Logout
                        </button>
                    ) : (
                        <Link className='blog-login-link' to={'/login'}>
                            <button className='blog-login-btn' onClick={() => onToggleLogin()}>
                                Login / Sign Up
                            </button>
                        </Link>
                    )}
                </div>
                <div className='blog-preview'>
                        {blogs.map((blog) => (
                            <Link className='ind-blog-link' to={`/blog/${blog.id}`} key={blog.id}>
                                <Row className='blog-row' >
                                    <Col sm className='p-2'>
                                        <div className='blog-img'>
                                            <img src={blog.img} alt={`Thumbnail for ${blog.title} Blog`} />
                                        </div>
                                    </Col>
                                    <Col sm className='p-2'> 
                                        <div className='blog-info'>
                                            <p className='blog-author-date'>{blog.author} {blog.date}</p>
                                            <h2>{blog.title}</h2>
                                            <p>{blog.body}</p>
                                        </div>
                                    </Col>
                                </Row>
                            </Link>
                        ))}
                </div>
            </Container>
    </>
    );
};

export default BlogList;