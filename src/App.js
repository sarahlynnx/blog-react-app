import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Blog from './components/IndividualBlog/Blog';
import BlogList from './components/BlogList/BlogList';
import CreateBlog from './components/CreateBlog/CreateBlog';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ForgotPassword from './components/Login/ForgotPassword';
import ResetPassword from './components/Login/ResetPassword';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { faXTwitter, faFacebook, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
library.add(fas, faXTwitter, faFacebook, faLinkedinIn, faHeart, faUser);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/blog/create" element={<CreateBlog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/forgot-password" element={<ForgotPassword />} />
        <Route path='/login/reset-password/:token' element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<BlogList />} />
      </Routes>
    </Router>
  );
}

export default App;
