import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getApiUrl } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ResetPassword = ({ match }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const {token} = useParams();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        getApiUrl(`/api/auth/reset-password`),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("Your password has successfully been reset.. navigating to login page.");
        setTimeout(() => {
          navigate("/login");
        }, 5000);

      } else {
        setError(data.msg || "Error: Unable to reset password.");
      }
    } catch (error) {
      setError("Failed to reset password. Please check your network and try again.");
    }
    
  };
  return (
    <Container className="password-container">
      <div className="password-wrapper">
        <h1 className="password-header">Reset Password</h1>
        <form onSubmit={handleSubmit} className="password-form">
          <label htmlFor="password">
            New password:
            <div className="reset-input-container">
              <div className="reset-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  placeholder="Enter your new password.."
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
          </label>
          <button type="submit">Reset Password</button>
          {message && <p>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </Container>
  );
};

export default ResetPassword;
