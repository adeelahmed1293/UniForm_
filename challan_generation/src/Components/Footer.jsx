import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 font-bold text-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#1a7a83]" />
            <span>© {new Date().getFullYear()} UNI-EMAIL. All rights reserved.</span>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#1a7a83]">Terms of Service</a>
            <a href="#" className="hover:text-[#1a7a83]">Privacy Policy</a>
            <a href="#" className="hover:text-[#1a7a83]">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;