import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShieldCheck, LogOut, ArrowRight } from 'lucide-react';
import axiosClient from '../api/axiosClient';
import { toast } from 'react-toastify';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    delete axiosClient.defaults.headers.common['Authorization'];
    toast.success("Signed out successfully");
    if (onLogout) onLogout();
    setTimeout(() => navigate('/login'), 600);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-[#1a7a83] rounded-lg shadow-inner">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-800">
            UNI-<span className="text-[#1a7a83]">EMAIL</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-bold text-gray-600 hover:text-[#1a7a83]">Features</Link>
         <Link to="/how-it-works" className="text-sm font-bold text-gray-600 hover:text-[#1a7a83]">
  How It Works
</Link>

              {!isAuthenticated ? (
            <Link to="/signup" className="px-6 py-2.5 bg-[#1a7a83] text-white text-sm font-bold rounded-md hover:bg-[#145d64] transition-all shadow-md active:scale-95">
              Get Started
            </Link>
          ) : (
            <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 font-bold text-sm">
              <LogOut size={18} /> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;