import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { getApiUrl } from "../api";
import "./login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    
    try {
      const response = await fetch(getApiUrl("/api/auth/forgot-password"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.status === 404) {
        setError("User not found.");
      } else if (response.ok) {
        setMessage("Reset password link has been sent to your email.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      setError(
        "Failed to send the request. Please check your network and try again."
      );
    }
  };

  return (
    <Container className="password-container">
        <div className="password-wrapper">
            <h1 className="password-header">Forgot Password?</h1>
            <form onSubmit={handleSubmit} className="password-form">
                <label htmlFor="email">
                Email:
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email.."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </label>
                <button type="submit"> Forgot Password </button>
                {message && <p>{message}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
      </div>
    </Container>
  );
};

export default ForgotPassword;
