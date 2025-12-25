import React, { useState } from 'react';
import { Upload, Send, FileText } from 'lucide-react';
import axiosClient from '../api/axiosClient'; // Your axios instance

const BulkUpload = () => {
  const [csvFile, setCsvFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
    setMessage('');
  };

  const handleBulkSubmit = async () => {
    if (!csvFile) {
      setMessage('Please upload a CSV file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      setLoading(true);
      setMessage('');

      // Send CSV to backend
      const response = await axiosClient.post('/api/send-csv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('✓ Bulk data sent successfully');
      console.log('Backend response:', response.data);
    } catch (error) {
      console.error('Error uploading CSV:', error);
      setMessage('❌ Failed to send bulk data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-3xl">
        
        {/* Header */}
        <div className="p-8 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center">
              <Upload className="h-7 w-7 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Bulk Upload</h2>
              <p className="text-sm text-gray-500 mt-1">Import multiple students</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          {message && (
            <div className="mb-6 px-5 py-2 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700 font-medium">
              {message}
            </div>
          )}

          <div className="max-w-2xl mx-auto">
            
            {/* Label */}
            <label className="block text-base font-semibold text-gray-900 mb-4">
              CSV File
            </label>

            {/* File Upload Box */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 
                            text-center hover:border-blue-400 hover:bg-blue-50 
                            transition cursor-pointer">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload" className="cursor-pointer block">
                {csvFile ? (
                  <>
                    <FileText className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <p className="text-lg text-gray-900 font-semibold">{csvFile.name}</p>
                    <p className="text-sm text-gray-500 mt-2">Click to change file</p>
                  </>
                ) : (
                  <>
                    <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-900 font-semibold">Upload CSV File</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Click or drag file here to upload
                    </p>
                  </>
                )}
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleBulkSubmit}
              disabled={loading}
              className={`mt-8 w-full py-4 bg-blue-600 text-white rounded-xl text-base 
                         font-semibold hover:bg-blue-700 flex items-center justify-center 
                         gap-3 transition-colors shadow-sm cursor-pointer ${
                           loading ? 'opacity-50 cursor-not-allowed' : ''
                         }`}
            >
              <Send className="h-5 w-5" />
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
