import React, {useEffect} from 'react';
import { Link } from "react-router-dom";
import "./errormessage.css";


const ErrorMessage = ({ message, onClose }) => {

  useEffect(() => {
    document.body.classList.add("disable-scroll");

    return () => {
      document.body.classList.remove("disable-scroll");
    };
  }, []);

  return (
    <div className="error-wrapper">
        <button className='error-btn' onClick={onClose}>Close</button>
        <div className="error-message-box">
            <p>{message}</p>
            <Link className="blog-login-link" to={"/login"}>
                <button className="error-link-btn">Log In</button>
            </Link>  
            <Link className="blog-login-link" to={"/signup"}>
                <button className="error-link-btn">Sign Up</button>
            </Link>  
        </div>
    </div>
  );
};

export default ErrorMessage;
