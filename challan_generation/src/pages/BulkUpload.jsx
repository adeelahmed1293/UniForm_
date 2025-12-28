import React, { useState } from 'react';
import { Upload, Send, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import axiosClient from '../api/axiosClient'; // Your axios instance

const BulkUpload = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
    setMessage('');
    setMessageType('');
  };

  const handleBulkSubmit = async () => {
    if (!csvFile) {
      setMessage('Please upload a CSV file first');
      setMessageType('error');
      return;
    }

    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      setLoading(true);
      setMessage('');
      setMessageType('');

      // Send CSV to backend
      const response = await axiosClient.post('/api/send-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('Bulk data sent successfully');
      setMessageType('success');
      console.log('Backend response:', response.data);
    } catch (error) {
      console.error('Error uploading CSV:', error);
      setMessage('Failed to send bulk data');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-[600px]">
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 w-full max-w-4xl overflow-hidden">
        
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-[#4a90e2] to-[#1a7a83] p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-10" />
          <div className="relative flex items-center gap-5">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center 
                          shadow-lg border border-white/30">
              <Upload className="h-10 w-10 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white mb-2">Bulk Upload</h2>
              <p className="text-blue-100 font-medium">Import multiple student records at once</p>
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

          <div className="max-w-2xl mx-auto">
            
            {/* Section Label */}
            <label className="block text-lg font-black text-[#2c3e50] mb-5">
              Select CSV File
            </label>

            {/* File Upload Box */}
            <div className={`relative border-3 border-dashed rounded-2xl p-16 
                            text-center transition-all duration-300 group
                            ${csvFile 
                              ? 'border-[#4a90e2] bg-blue-50' 
                              : 'border-gray-300 hover:border-[#4a90e2] hover:bg-blue-50'}`}
            >
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload" className="cursor-pointer block">
                {csvFile ? (
                  <div className="animate-fadeIn">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 
                                  rounded-2xl flex items-center justify-center mx-auto mb-5
                                  shadow-lg">
                      <FileText className="h-10 w-10 text-[#4a90e2]" strokeWidth={2.5} />
                    </div>
                    <p className="text-xl text-gray-900 font-black mb-2">{csvFile.name}</p>
                    <p className="text-sm text-gray-500 font-medium">
                      File ready to upload • Click to change
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center 
                                  mx-auto mb-5 group-hover:bg-blue-100 transition-colors
                                  group-hover:scale-110 duration-300">
                      <Upload className="h-10 w-10 text-gray-400 group-hover:text-[#4a90e2] transition-colors" 
                              strokeWidth={2.5} />
                    </div>
                    <p className="text-xl text-gray-900 font-black mb-2">
                      Drop your CSV file here
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                      or click to browse from your computer
                    </p>
                  </div>
                )}
              </label>
            </div>

            {/* Info Box */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-5 border border-blue-100">
              <p className="text-sm text-gray-700 font-medium leading-relaxed">
                <span className="font-black text-[#1a7a83]">Pro Tip:</span> Ensure your CSV file contains the required columns: 
                Student Name, Email, Roll Number, and Department.
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleBulkSubmit}
              disabled={loading || !csvFile}
              className={`mt-8 w-full py-5 rounded-xl text-lg font-black
                         flex items-center justify-center gap-3 transition-all duration-300
                         shadow-lg hover:shadow-xl transform hover:-translate-y-1
                         ${loading || !csvFile
                           ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                           : 'bg-gradient-to-r from-[#4a90e2] to-[#1a7a83] text-white hover:from-[#3a80d2] hover:to-[#0a6a73]'
                         }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="h-6 w-6" strokeWidth={2.5} />
                  <span>Upload & Send Data</span>
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
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}} />
    </div>
  );
};

export default BulkUpload;