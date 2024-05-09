import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blog from './components/IndividualBlog/Blog';
import BlogList from './components/BlogList/BlogList';
import CreateBlog from './components/CreateBlog/CreateBlog';
import LoginSignup from './components/LoginSignup/LoginSignup';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { faXTwitter, faFacebook, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
library.add(fas, faXTwitter, faFacebook, faLinkedinIn, faHeart, faUser);


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/blog.html" element={<BlogList />} />
        <Route path="/" element={<BlogList />} />
        <Route path="blog/:id" element={<Blog />} /> 
        <Route path="blog/create" element={<CreateBlog />} />
        <Route path="login" element={<LoginSignup />} />
      </Routes>
    </Router>
  );
}

export default App;