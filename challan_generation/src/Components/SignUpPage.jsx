import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Eye, EyeOff } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

const SignUpPage = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.name || !formData.email) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const res = await axiosClient.post('/auth/signup', {
        name: formData.name,
        gmail: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword
      });

      // Check if response status is 200 or 201 (success)
      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.message || "Signup successful!");
        
        // Navigate to login after a short delay to show the success toast
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      
      // Handle different error scenarios
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data?.detail || 
                           error.response.data?.message || 
                           "Signup failed. Please try again.";
        toast.error(errorMessage);
      } else if (error.request) {
        // Request made but no response received
        toast.error("Network error. Please check your connection.");
      } else {
        // Something else happened
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <div className="signup-box">
          <div className="header">
            <GraduationCap className="icon" />
            <h2>Create account</h2>
            <p className="subtitle">Start managing student forms</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label className={formData.name ? 'filled' : ''}>Full name</label>
            </div>

            <div className="input-box">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label className={formData.email ? 'filled' : ''}>Email</label>
            </div>

            <div className="input-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label className={formData.password ? 'filled' : ''}>Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="eye-button"
              >
                {showPassword ? (
                  <EyeOff className="eye-icon" />
                ) : (
                  <Eye className="eye-icon" />
                )}
              </button>
            </div>

            <div className="input-box">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <label className={formData.confirmPassword ? 'filled' : ''}>Confirm password</label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="eye-button"
              >
                {showConfirmPassword ? (
                  <EyeOff className="eye-icon" />
                ) : (
                  <Eye className="eye-icon" />
                )}
              </button>
            </div>

            <button className="btn" type="submit">
              Create account
            </button>

            <div className="signin-link">
              <span>Already have an account? </span>
              <Link to="/login">Sign in</Link>
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
    width: 450px;
    height: 550px;
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
    transform-origin: 225px;
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

  .signup-box {
    position: absolute;
    width: 90%;
    max-width: 360px;
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
    margin: 18px 0;
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

  .eye-button:hover {
    color: #0ef;
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

  .btn:hover {
    background: #0dd;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 238, 255, 0.3);
  }

  .signin-link {
    margin: 15px 0 0;
    text-align: center;
  }

  .signin-link span {
    font-size: 0.9em;
    color: #fff;
    background: none;
    width: auto;
    height: auto;
    position: static;
    transform: none;
    animation: none;
  }

  .signin-link a {
    font-size: 0.9em;
    color: #0ef;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
  }

  .signin-link a:hover {
    color: #0dd;
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    .container {
      width: 380px;
      height: 480px;
    }

    .container span {
      transform-origin: 190px;
    }

    .signup-box {
      max-width: 300px;
      padding: 25px 15px;
    }

    .input-box {
      margin: 15px 0;
    }

    h2 {
      font-size: 1.6em;
    }
  }
`;

export default SignUpPage;