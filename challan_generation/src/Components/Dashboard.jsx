import React, { useState } from 'react';
import { Upload, FileText, Mail, ArrowLeft, LogOut, Menu, X } from 'lucide-react';
import BulkUpload from '../pages/BulkUpload';
import ManualEntry from '../pages/ManualEntry';
import EmailMonitor from '../pages/EmailMonitor';

const HomePage = ({ onLogout }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Render the active component based on state
  const renderContent = () => {
    switch (activeView) {
      case 'bulk':
        return (
          <div className="w-full animate-fadeIn">
            <button
              onClick={() => setActiveView('dashboard')}
              className="mb-6 flex items-center gap-2 text-gray-600 hover:text-[#1a7a83] transition-all group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-semibold">Back to Dashboard</span>
            </button>
            <BulkUpload />
          </div>
        );

      case 'manual':
        return (
          <div className="w-full animate-fadeIn">
            <button
              onClick={() => setActiveView('dashboard')}
              className="mb-6 flex items-center gap-2 text-gray-600 hover:text-[#1a7a83] transition-all group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-semibold">Back to Dashboard</span>
            </button>
            <ManualEntry />
          </div>
        );

      case 'monitor':
        return (
          <div className="w-full animate-fadeIn">
            <button
              onClick={() => setActiveView('dashboard')}
              className="mb-6 flex items-center gap-2 text-gray-600 hover:text-[#1a7a83] transition-all group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-semibold">Back to Dashboard</span>
            </button>
            <EmailMonitor />
          </div>
        );

      default:
        return (
          <div className="w-full animate-fadeIn">
            {/* Welcome Header */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl lg:text-5xl font-black text-[#2c3e50] mb-4">
                Email Management
                <span className="block text-[#1a7a83] mt-2">Dashboard</span>
              </h1>
              <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
                Streamline your university communications with powerful automation tools
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              
              {/* Bulk Upload Card */}
              <button
                onClick={() => setActiveView('bulk')}
                className="group relative bg-white rounded-2xl p-8 cursor-pointer 
                         border-2 border-gray-100 hover:border-[#4a90e2] 
                         shadow-sm hover:shadow-2xl transition-all duration-300
                         transform hover:-translate-y-2 text-left"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full 
                              filter blur-3xl opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none" />
                
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 
                                rounded-2xl flex items-center justify-center mb-6
                                group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
                                shadow-lg group-hover:shadow-xl">
                    <Upload className="h-10 w-10 text-[#4a90e2]" strokeWidth={2.5} />
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 mb-3">
                    Bulk Upload
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                    Import multiple student records at once using CSV files
                  </p>
                  
                  <div className="flex items-center text-[#4a90e2] font-bold group-hover:gap-3 gap-2 transition-all">
                    <span>Open Module</span>
                    <ArrowLeft className="h-5 w-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>

              {/* Manual Entry Card */}
              <button
                onClick={() => setActiveView('manual')}
                className="group relative bg-white rounded-2xl p-8 cursor-pointer 
                         border-2 border-gray-100 hover:border-[#1a7a83] 
                         shadow-sm hover:shadow-2xl transition-all duration-300
                         transform hover:-translate-y-2 text-left"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full 
                              filter blur-3xl opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none" />
                
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-50 to-teal-100 
                                rounded-2xl flex items-center justify-center mb-6
                                group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
                                shadow-lg group-hover:shadow-xl">
                    <FileText className="h-10 w-10 text-[#1a7a83]" strokeWidth={2.5} />
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 mb-3">
                    Manual Entry
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                    Add individual student information manually through forms
                  </p>
                  
                  <div className="flex items-center text-[#1a7a83] font-bold group-hover:gap-3 gap-2 transition-all">
                    <span>Open Module</span>
                    <ArrowLeft className="h-5 w-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>

              {/* Email Monitor Card */}
              <button
                onClick={() => setActiveView('monitor')}
                className="group relative bg-white rounded-2xl p-8 cursor-pointer 
                         border-2 border-gray-100 hover:border-purple-500 
                         shadow-sm hover:shadow-2xl transition-all duration-300
                         transform hover:-translate-y-2 text-left"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full 
                              filter blur-3xl opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none" />
                
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-50 to-purple-100 
                                rounded-2xl flex items-center justify-center mb-6
                                group-hover:scale-110 group-hover:rotate-3 transition-all duration-300
                                shadow-lg group-hover:shadow-xl">
                    <Mail className="h-10 w-10 text-purple-600" strokeWidth={2.5} />
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 mb-3">
                    Email Monitor
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                    Track and monitor email delivery status for all students
                  </p>
                  
                  <div className="flex items-center text-purple-600 font-bold group-hover:gap-3 gap-2 transition-all">
                    <span>Open Module</span>
                    <ArrowLeft className="h-5 w-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </button>

            </div>

            {/* Stats Section */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              <StatCard number="10K+" label="Emails Sent" color="blue" />
              <StatCard number="99.8%" label="Delivery Rate" color="teal" />
              <StatCard number="24/7" label="Monitoring" color="purple" />
              <StatCard number="3" label="Active Modules" color="orange" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f9fa]">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1a7a83] to-[#4a90e2] 
                            rounded-xl flex items-center justify-center shadow-lg">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-black text-[#2c3e50]">
                UNI-<span className="text-[#1a7a83]">EMAIL</span>
              </span>
            </div>

            {/* Desktop Logout Button */}
            <button
              onClick={onLogout}
              className="hidden md:flex items-center gap-2 px-6 py-2.5 
                       bg-red-50 text-red-600 rounded-lg font-bold
                       hover:bg-red-600 hover:text-white transition-all
                       border-2 border-red-200 hover:border-red-600"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-6 py-4">
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 
                         bg-red-50 text-red-600 rounded-lg font-bold
                         hover:bg-red-600 hover:text-white transition-all
                         border-2 border-red-200 hover:border-red-600"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {renderContent()}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}} />
    </div>
  );
};

// Stats Card Component
const StatCard = ({ number, label, color }) => {
  const colorMap = {
    blue: 'from-blue-500 to-blue-600',
    teal: 'from-teal-500 to-teal-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600',
  };

  return (
    <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100
                  hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className={`text-3xl font-black bg-gradient-to-r ${colorMap[color]} 
                     bg-clip-text text-transparent mb-2`}>
        {number}
      </div>
      <div className="text-sm font-semibold text-gray-600">
        {label}
      </div>
    </div>
  );
};

export default HomePage;