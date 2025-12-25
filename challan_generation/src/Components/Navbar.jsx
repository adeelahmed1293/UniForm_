import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, GraduationCap, LogOut } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import { toast } from 'react-toastify';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Show logout success toast FIRST
   

    // Remove all session-related data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('loginTimestamp');
    localStorage.removeItem('isAuthenticated');

    // Remove default axios Authorization header
    delete axiosClient.defaults.headers.common['Authorization'];

    
 toast.success("Logout successful!", {
      position: "top-right",
      autoClose: 2000,
    });

    // Trigger parent logout logic if provided
    if (onLogout) onLogout();

    // Redirect after a delay to ensure toast shows
    setTimeout(() => {
      navigate('/login');
    }, 800); // Increased delay to ensure toast is visible



  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <Link to={isAuthenticated ? "/home" : "/"} className="flex items-center gap-2 hover:opacity-80 transition">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">UniForm</span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className="px-4 py-2 text-base text-gray-600 hover:text-gray-900 transition"
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 text-base text-gray-600 hover:text-gray-900 transition"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="ml-2 px-5 py-2 text-base bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
                >
                  Get started
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 
                           text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 
                           transition-all duration-200 shadow-sm hover:shadow-md 
                           transform hover:scale-105 active:scale-95"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 hover:text-gray-900 transition">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
          <div className="px-4 py-3 space-y-2">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-3 py-2.5 text-base text-gray-600 hover:bg-gray-50 rounded-lg transition"
                >
                  Home
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-3 py-2.5 text-base text-gray-600 hover:bg-gray-50 rounded-lg transition"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left px-3 py-2.5 text-base bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition text-center font-medium"
                >
                  Get started
                </Link>
              </>
            ) : (
              <button
                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 
                           text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 
                           transition-all duration-200 shadow-sm active:scale-95"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;