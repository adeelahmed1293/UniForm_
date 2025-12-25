import React, { useState } from 'react';
import { Send, FileText } from 'lucide-react';
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleManualSubmit = async () => {
  if (!formData.className || !formData.rollNumber || !formData.studentName || !formData.email) {
    setMessage('Please fill all required fields');
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
  
    const response = await axiosClient.post('/api/manual-entry', payload);
    console.log('Backend response:', response.data);
    setMessage(`✓ Student data sent successfully. Challan: ${response.data.challan_no}`);
    setFormData({
      semester: '',
      rollNumber: '',
      studentName: '',
      department: '',
      email: '',
      phone: ''
    });

  } catch (error) {
    console.error(error);
    setMessage('Failed to send data to backend');
  }
};


  return (
    <div className="flex justify-center">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-3xl">

        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Manual Entry</h2>
              <p className="text-sm text-gray-500 mt-1">Add individual student</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {message && (
            <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700 font-medium">
              {message}
            </div>
          )}

          {/* Form */}
          <div className="grid md:grid-cols-2 gap-5">

            {/* Student Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Student Name</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                placeholder="Full name"
              />
            </div>

            {/* Roll Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Roll Number</label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 2024001"
              />
            </div>

            {/* Class Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Class Name</label>
              <input
                type="text"
                name="className"
                value={formData.className}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                placeholder="e.g., BSCS-6A"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                placeholder="student@university.edu"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleManualSubmit}
            className="w-full mt-7 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Send className="h-5 w-5" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManualEntry;
