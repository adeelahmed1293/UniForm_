import React, { useState } from 'react';
import { Send, FileText, CheckCircle, AlertCircle, User, Hash, BookOpen, Mail, Calendar } from 'lucide-react';
import axiosClient from '../api/axiosClient';

const ManualEntry = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    rollNumber: '',
    className: '',
    email: '',
    expiryDate: ''
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleManualSubmit = async () => {
    if (!formData.className || !formData.rollNumber || !formData.studentName || !formData.email) {
      setMessage('Please fill all required fields');
      setMessageType('error');
      return;
    }

    const payload = {
      student_name: formData.studentName,
      roll_number: formData.rollNumber,
      class_name: formData.className,
      email: formData.email,
      expiry_date: formData.expiryDate || "2025-12-31"
    };
    console.log('Sending payload:', payload);

    try {
      setLoading(true);
      const response = await axiosClient.post('/api/manual-entry', payload);
      console.log('Backend response:', response.data);
      setMessage(`Student data sent successfully. Challan: ${response.data.challan_no}`);
      setMessageType('success');
      setFormData({
        studentName: '',
        rollNumber: '',
        className: '',
        email: '',
        expiryDate: ''
      });
    } catch (error) {
      console.error(error);
      setMessage('Failed to send data to backend');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-[600px]">
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 w-full max-w-5xl overflow-hidden">
        
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-[#1a7a83] to-[#16a085] p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-10" />
          <div className="relative flex items-center gap-5">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center 
                          shadow-lg border border-white/30">
              <FileText className="h-10 w-10 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white mb-2">Manual Entry</h2>
              <p className="text-teal-100 font-medium">Add individual student information</p>
            </div>
          </div>
        </div>

        {/* Body Section */}
        <div className="p-8">
          {/* Status Message */}
          {message && (
            <div className={`mb-6 px-6 py-4 rounded-xl border-2 flex items-center gap-3 animate-slideIn
              ${messageType === 'success' 
                ? 'bg-green-50 border-green-200 text-green-700' 
                : 'bg-red-50 border-red-200 text-red-700'}`}
            >
              {messageType === 'success' ? (
                <CheckCircle className="h-5 w-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
              )}
              <span className="font-semibold">{message}</span>
            </div>
          )}

          {/* Form Section */}
          <div className="max-w-4xl mx-auto">
            <label className="block text-lg font-black text-[#2c3e50] mb-6">
              Student Information
            </label>

            <div className="grid md:grid-cols-2 gap-6">

              {/* Student Name */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <User className="h-4 w-4 text-[#1a7a83]" />
                  Student Name
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl 
                           focus:border-[#1a7a83] focus:ring-4 focus:ring-[#1a7a83]/10
                           transition-all duration-300 font-medium text-gray-800
                           placeholder:text-gray-400"
                  placeholder="Enter full name"
                />
              </div>

              {/* Roll Number */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Hash className="h-4 w-4 text-[#1a7a83]" />
                  Roll Number
                </label>
                <input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl 
                           focus:border-[#1a7a83] focus:ring-4 focus:ring-[#1a7a83]/10
                           transition-all duration-300 font-medium text-gray-800
                           placeholder:text-gray-400"
                  placeholder="e.g., 2024001"
                />
              </div>

              {/* Class Name */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#1a7a83]" />
                  Class Name
                </label>
                <input
                  type="text"
                  name="className"
                  value={formData.className}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl 
                           focus:border-[#1a7a83] focus:ring-4 focus:ring-[#1a7a83]/10
                           transition-all duration-300 font-medium text-gray-800
                           placeholder:text-gray-400"
                  placeholder="e.g., BSCS-6A"
                />
              </div>

              {/* Email */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#1a7a83]" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl 
                           focus:border-[#1a7a83] focus:ring-4 focus:ring-[#1a7a83]/10
                           transition-all duration-300 font-medium text-gray-800
                           placeholder:text-gray-400"
                  placeholder="student@university.edu"
                />
              </div>

              {/* Expiry Date */}
              <div className="group md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#1a7a83]" />
                  Expiry Date (Optional)
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl 
                           focus:border-[#1a7a83] focus:ring-4 focus:ring-[#1a7a83]/10
                           transition-all duration-300 font-medium text-gray-800"
                />
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 bg-gradient-to-r from-teal-50 to-green-50 rounded-xl p-5 border border-teal-100">
              <p className="text-sm text-gray-700 font-medium leading-relaxed">
                <span className="font-black text-[#1a7a83]">Note:</span> All fields are required except the expiry date. 
                If no expiry date is provided, it defaults to December 31, 2025.
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleManualSubmit}
              disabled={loading}
              className={`w-full mt-8 py-5 rounded-xl text-lg font-black
                         flex items-center justify-center gap-3 transition-all duration-300
                         shadow-lg hover:shadow-xl transform hover:-translate-y-1
                         ${loading
                           ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                           : 'bg-gradient-to-r from-[#1a7a83] to-[#16a085] text-white hover:from-[#0a6a73] hover:to-[#0e8f75]'
                         }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-6 w-6" strokeWidth={2.5} />
                  <span>Submit Student Data</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}} />
    </div>
  );
};

export default ManualEntry;