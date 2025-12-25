import React, { useState } from 'react';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import axiosClient from '../api/axiosClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center px-4 py-8">
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
        theme="light"
      />
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <GraduationCap className="h-8 w-8 text-gray-800 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Sign in</h2>
          <p className="text-sm text-gray-600">Enter your credentials to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
              placeholder="name@university.edu"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-gray-900 text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>

          <div className="text-center pt-2">
            <span className="text-sm text-gray-600">Don't have an account? </span>
            <Link
              to="/signup"
              className="text-sm text-gray-900 font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;