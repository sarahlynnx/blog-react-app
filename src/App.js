import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { faXTwitter, faFacebook, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import LoadingAnimation from './components/LoadingAnimation/LoadingAnimation';
library.add(fas, faXTwitter, faFacebook, faLinkedinIn, faHeart, faUser);

const Blog = lazy(() => import('./components/IndividualBlog/Blog'));
const BlogList = lazy(() => import('./components/BlogList/BlogList'));
const CreateBlog = lazy(() => import('./components/CreateBlog/CreateBlog'));
const Login = lazy(() => import('./components/Login/Login'));
const Signup = lazy(() => import('./components/Signup/Signup'));
const ForgotPassword = lazy(() => import('./components/Login/ForgotPassword'));
const ResetPassword = lazy(() => import('./components/Login/ResetPassword'));

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingAnimation />}>
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
      </Suspense>
    </Router>
  );
}

export default App;
