import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import LandingPage from './Components/LandingPage.jsx';
import LoginPage from './Components/LoginPage.jsx';
import SignUpPage from './Components/SignUpPage.jsx';
import HomePage from './Components/Dashboard.jsx';
import { isAuthenticated, initializeAuth, clearAuthData } from './api/auth.js';

export default function App() {
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);

  useEffect(() => {
    // Initialize auth on app load - checks localStorage for token
    initializeAuth();
    setIsAuthenticatedState(isAuthenticated());
  }, []);

  const handleLogin = () => {
    setIsAuthenticatedState(true);
  };

  const handleLogout = () => {
    clearAuthData(); // Clear localStorage and token
    setIsAuthenticatedState(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar isAuthenticated={isAuthenticatedState} onLogout={handleLogout} />
        
        <Routes>
          <Route 
            path="/" 
            element={
              isAuthenticatedState ? (
                <Navigate to="/home" replace />
              ) : (
                <>
                  <LandingPage />
                  <Footer />
                </>
              )
            } 
          />
          <Route 
            path="/login" 
            element={
              isAuthenticatedState ? (
                <Navigate to="/home" replace />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/signup" 
            element={
              isAuthenticatedState ? (
                <Navigate to="/home" replace />
              ) : (
                <SignUpPage onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/home" 
            element={
              isAuthenticatedState ? (
                <HomePage onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          {/* Redirect any unknown routes to landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Global Toast Container */}
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
      </div>
    </Router>
  );
}