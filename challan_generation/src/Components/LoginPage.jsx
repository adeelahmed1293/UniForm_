import React, { useState } from 'react';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import axiosClient from '../api/axiosClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axiosClient.post('/auth/login', {
        gmail: email,
        password: password
      });

      // Check if response status is 200 or 201 (success)
      if (res.status === 200 || res.status === 201) {
        const { token, message } = res.data;

        // Store token in localStorage
        if (token) {
          localStorage.setItem('authToken', token);
          
          // Store user email for session management
          localStorage.setItem('userEmail', email);
          
          // Store login timestamp
          localStorage.setItem('loginTimestamp', new Date().toISOString());
          
          // Optional: Store isAuthenticated flag
          localStorage.setItem('isAuthenticated', 'true');

          // Set token in axios default headers for future requests
          axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        toast.success(message || "Login successful!");
        
        // Navigate to dashboard after a short delay to show the success toast
        setTimeout(() => {
          // Call onLogin to update app state
          if (onLogin) {
            onLogin();
          }
          navigate('/home');
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      
      // Handle different error scenarios
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.detail || 
                           error.response.data?.message || 
                           "Login failed. Please try again.";
        toast.error(errorMessage);
      } else if (error.request) {
        // Request made but no response received
        toast.error("Network error. Please check your connection.");
      } else {
        // Something else happened
        toast.error("An unexpected error occurred.");
      }
      setIsLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="container">
        <div className="login-box">
          <div className="header">
            <GraduationCap className="icon" />
            <h2>Sign in</h2>
            <p className="subtitle">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              <label className={email ? 'filled' : ''}>Email</label>
            </div>

            <div className="input-box">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              <label className={password ? 'filled' : ''}>Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="eye-button"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="eye-icon" />
                ) : (
                  <Eye className="eye-icon" />
                )}
              </button>
            </div>

            <button className="btn" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </button>

            <div className="signup-link">
              <span>Don't have an account? </span>
              <Link to="/signup">Sign up</Link>
            </div>
          </form>
        </div>

        {[...Array(50)].map((_, i) => (
          <span key={i} style={{ '--i': i }} />
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  min-height: 100vh;
  background: #1f293a;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;

  .container {
    position: relative;
    width: 400px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: visible;
  }

  .container span {
    position: absolute;
    left: 0;
    width: 32px;
    height: 6px;
    background: #2c4766;
    border-radius: 80px;
    transform-origin: 200px;
    transform: rotate(calc(var(--i) * (360deg / 50)));
    animation: blink 3s linear infinite;
    animation-delay: calc(var(--i) * (3s / 50));
  }

  @keyframes blink {
    0% {
      background: #0ef;
    }
    25% {
      background: #2c4766;
    }
  }

  .login-box {
    position: absolute;
    width: 90%;
    max-width: 320px;
    z-index: 1;
    padding: 30px 20px;
    border-radius: 20px;
    background: rgba(31, 41, 58, 0.8);
    backdrop-filter: blur(10px);
  }

  .header {
    text-align: center;
    margin-bottom: 20px;
  }

  .icon {
    height: 32px;
    width: 32px;
    color: #0ef;
    margin: 0 auto 12px;
  }

  h2 {
    font-size: 1.8em;
    color: #0ef;
    text-align: center;
    margin-bottom: 8px;
  }

  .subtitle {
    font-size: 0.85em;
    color: #fff;
    opacity: 0.7;
  }

  form {
    width: 100%;
    padding: 0 10px;
  }

  .input-box {
    position: relative;
    margin: 20px 0;
  }

  input {
    width: 100%;
    height: 45px;
    background: transparent;
    border: 2px solid #2c4766;
    outline: none;
    border-radius: 40px;
    font-size: 1em;
    color: #fff;
    padding: 0 15px;
    transition: 0.5s ease;
  }

  input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  input:focus {
    border-color: #0ef;
  }

  input:not(:placeholder-shown) ~ label,
  input:focus ~ label,
  label.filled {
    top: -10px;
    font-size: 0.8em;
    background: #1f293a;
    padding: 0 6px;
    color: #0ef;
  }

  label {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    font-size: 1em;
    pointer-events: none;
    transition: 0.5s ease;
    color: #fff;
  }

  .eye-button {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: #fff;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s ease;
  }

  .eye-button:hover:not(:disabled) {
    color: #0ef;
  }

  .eye-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .eye-icon {
    width: 18px;
    height: 18px;
  }

  .btn {
    width: 100%;
    height: 45px;
    background: #0ef;
    border: none;
    outline: none;
    border-radius: 40px;
    cursor: pointer;
    font-size: 1em;
    color: #1f293a;
    font-weight: 600;
    margin-top: 10px;
    transition: all 0.3s ease;
  }

  .btn:hover:not(:disabled) {
    background: #0dd;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 238, 255, 0.3);
  }

  .btn:disabled {
    background: #2c4766;
    cursor: not-allowed;
    transform: none;
  }

  .signup-link {
    margin: 15px 0 0;
    text-align: center;
  }

  .signup-link span {
    font-size: 0.9em;
    color: #fff;
    background: none;
    width: auto;
    height: auto;
    position: static;
    transform: none;
    animation: none;
  }

  .signup-link a {
    font-size: 0.9em;
    color: #0ef;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
  }

  .signup-link a:hover {
    color: #0dd;
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    .container {
      width: 350px;
      height: 350px;
    }

    .container span {
      transform-origin: 175px;
    }

    .login-box {
      max-width: 280px;
      padding: 25px 15px;
    }
  }
`;

export default LoginPage;