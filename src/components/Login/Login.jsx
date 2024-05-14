import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { getApiUrl } from "../api";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./login.css";

import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const { login } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const response = await fetch(getApiUrl("/api/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login failed: ", errorData.message);
        return;
      }
      const { user, token } = await response.json();
      login(user);
      localStorage.setItem("token", token);
      console.log("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login failed: ", error.message);
      alert("An error occurred while logging in. Please try again later.");
    }
  };

  return (
    <Container className="login-container">
      <div className="login-header">
        <div className="login-text">Log In</div>
        <div className="login-underline"></div>
        <Link className="auth-action-links" to={"/signup"}>
          Not yet signed up? <span>Sign Up</span>
        </Link>
      </div>
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <div className="input-container">
          <img className="login-input-icon" src={email_icon} alt="email-icon" />
          <input
            className="login-input"
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            autoComplete="email"
          />
        </div>
        <div className="input-container">
          <img
            className="login-input-icon"
            src={password_icon}
            alt="password-icon"
          />
          <div className="password-wrapper">
            <input
              className="login-input"
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              autoComplete="current-password"
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
        <div className="auth-action-links">
          Forgot Password? <span>Click Here!</span>
        </div>
        <div className="login-submit-container">
          <button type="submit" className="login-submit">
            Login
          </button>
        </div>
      </form>
    </Container>
  );
};

export default Login;
