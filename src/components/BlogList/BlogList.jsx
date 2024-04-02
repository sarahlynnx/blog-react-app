import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './bloglist.css';

const BlogList = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [blogs, setBlogs] = useState([
        {title: 'What OT does!', body: 'Occupational therapists look at the whole person during an evaluation or therapy session. We understand that there are many influences on...', date: 'Aug 2', author: 'Alisha Elsperger', img: 'https://static.wixstatic.com/media/651ab0_a80296d3b79b4234acaa7e23be051e64~mv2.png/v1/fill/w_430,h_1075,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/651ab0_a80296d3b79b4234acaa7e23be051e64~mv2.png', id: 1},
        {title: 'Back to School', body: 'Can we believe it\'s already Labor Day weekend and time to head back to school?! Here are some tips for school and home to help the school...', date: 'Sept 2', author: 'Alisha Elsperger', img: 'https://static.wixstatic.com/media/651ab0_b29f0e54a80840b580eb0a6884f0ab9e~mv2.png/v1/fill/w_1080,h_1920,al_c,q_95,enc_auto/651ab0_b29f0e54a80840b580eb0a6884f0ab9e~mv2.png', id: 2},
        {title: 'Thanksgiving', body: 'Thanksgiving is a time to reflect on what we are thankful for: family, friends, a home, transportation, health, hobbies, work, school,...', date: 'Nov 21', author: 'Alisha Elsperger', img: 'https://static.wixstatic.com/media/651ab0_53aaab08af5748379ef88944b10276ec~mv2.jpg/v1/fill/w_1157,h_1500,al_c,q_85,enc_auto/651ab0_53aaab08af5748379ef88944b10276ec~mv2.jpg', id: 3}
    ]);

    const onOpenBlog = (id) => {
        navigate(`/blog/${id}`);
    };

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
                                <Row className='blog-row' onClick={() => onOpenBlog(blog.id)}>
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