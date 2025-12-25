import React, { useState } from 'react';
import { Upload, FileText, Mail, ArrowLeft } from 'lucide-react';
import BulkUpload from '../pages/BulkUpload';
import ManualEntry from '../pages/ManualEntry';
import EmailMonitor from '../pages/EmailMonitor';

const HomePage = () => {
  const [activeView, setActiveView] = useState('dashboard'); 

  // Render the active component based on state
  const renderContent = () => {
    switch (activeView) {
      case 'bulk':
        return (
          <div className="w-full">
            <button
              onClick={() => setActiveView('dashboard')}
              className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <BulkUpload />
          </div>
        );

      case 'manual':
        return (
          <div className="w-full">
            <button
              onClick={() => setActiveView('dashboard')}
              className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <ManualEntry />
          </div>
        );

      case 'monitor':
        return (
          <div className="w-full">
            <button
              onClick={() => setActiveView('dashboard')}
              className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back</span>
            </button>
            <EmailMonitor />
          </div>
        );

      default:
        return (
          <div className="w-full">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Management Dashboard</h1>
              <p className="text-gray-600">Choose an action to get started</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              
              {/* Bulk Upload Card */}
              <button
                onClick={() => setActiveView('bulk')}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center 
                           hover:border-blue-500 hover:shadow-lg transition-all group 
                           cursor-pointer"
              >
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 
                                group-hover:bg-blue-100 transition cursor-pointer">
                  <Upload className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 cursor-pointer">Bulk Upload</h3>
                <p className="text-sm text-gray-600 mb-4 cursor-pointer">
                  Import multiple student records at once using CSV files
                </p>
                <div className="inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700 
                                cursor-pointer">
                  Open Module
                  <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" 
                       fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* Manual Entry Card */}
              <button
                onClick={() => setActiveView('manual')}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center 
                           hover:border-green-500 hover:shadow-lg transition-all group 
                           cursor-pointer"
              >
                <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4 
                                group-hover:bg-green-100 transition cursor-pointer">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 cursor-pointer">Manual Entry</h3>
                <p className="text-sm text-gray-600 mb-4 cursor-pointer">
                  Add individual student information manually through the form
                </p>
                <div className="inline-flex items-center text-sm font-medium text-green-600 group-hover:text-green-700 
                                cursor-pointer">
                  Open Module
                  <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" 
                       fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

              {/* Email Monitor Card */}
              <button
                onClick={() => setActiveView('monitor')}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center 
                           hover:border-purple-500 hover:shadow-lg transition-all group 
                           cursor-pointer"
              >
                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4 
                                group-hover:bg-purple-100 transition cursor-pointer">
                  <Mail className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 cursor-pointer">Email Monitor</h3>
                <p className="text-sm text-gray-600 mb-4 cursor-pointer">
                  Track and monitor email delivery status for all students
                </p>
                <div className="inline-flex items-center text-sm font-medium text-purple-600 group-hover:text-purple-700 
                                cursor-pointer">
                  Open Module
                  <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" 
                       fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>

            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-full mx-auto px-6 py-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default HomePage;
