import React, { useContext, useState } from "react";
import { getApiUrl } from "../api";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import "./signup.css";

import user_icon from "../Assets/user.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Signup = () => {
  const { signup } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      const response = await fetch(getApiUrl("/api/auth/register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const { user, token } = await response.json();
        signup(user);
        localStorage.setItem("token", token);
        console.log("Signup successful!");
        navigate("/");
      } else {
        const error = await response.json();
        console.error("Error signing up:", error);
      }
    } catch (error) {
      console.error("Signup failed: ", error.message);
      alert("An error occurred while signing up. Please try again later.");
    }
  };

  return (
    <Container className="signup-container">
      <div className="signup-header">
        <div className="signup-text">Sign Up</div>
        <div className="signup-underline"></div>
        <Link className="auth-action-links" to={"/login"}>
          Already a member? <span>Log In</span>
        </Link>
      </div>
      <form className="signup-form" onSubmit={handleSignupSubmit}>
        <div className="input-container">
          <img className="signup-input-icon" src={user_icon} alt="user-icon" />
          <input
            className="signup-input"
            id="name"
            type="text"
            name="name"
            placeholder="Name"
            autoComplete="given-name"
          />
        </div>
        <div className="input-container">
          <img
            className="signup-input-icon"
            src={email_icon}
            alt="email-icon"
          />
          <input
            className="signup-input"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
          />
        </div>
        <div className="input-container">
          <img
            className="signup-input-icon"
            src={password_icon}
            alt="password-icon"
          />
          <div className="password-wrapper">
            <input
              className="signup-input"
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              autoComplete="new-password"
            />
            <button
              type="button"
              id="toggle-password"
              className="show-hide-icon"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>
        <div className="signup-submit-container">
          <button type="submit" className="submit-btn">
            Sign Up
          </button>
        </div>
      </form>
    </Container>
  );
};

export default Signup;
