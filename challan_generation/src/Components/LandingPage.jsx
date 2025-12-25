import React from "react";
import { Upload, FileText, Send } from "react-feather";

import { Link } from "react-router-dom";

const LandingPage = ({ setCurrentPage }) => {
  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Student form management made simple
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Upload CSV files or fill out forms manually. Everything you need to
            manage student records in one place.
          </p>
          <div className="flex justify-center flex-wrap gap-3">
            <button
              onClick={() => setCurrentPage("signup")}
              className="px-5 py-2.5 bg-gray-900 text-white rounded hover:bg-gray-800 font-medium"
            >
            <Link
  to="/signup"
 >
  Get started
</Link>
            </button>
            <button
              className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 font-medium"
            >
             <Link
  to="/login"
 >
  Sign in
</Link>
            </button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 flex flex-col gap-6">
          {/* Bulk Upload Card */}
          <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mt-1">
              <Upload className="h-6 w-6 text-gray-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Bulk upload
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Import student data from CSV files. Process hundreds of records at
                once.
              </p>
            </div>
          </div>

          {/* Manual Entry Card */}
          <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mt-1">
              <FileText className="h-6 w-6 text-gray-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Manual entry
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Add individual student records through a simple form interface.
              </p>
            </div>
          </div>

          {/* Monitor Gmail Status Card */}
          <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mt-1">
              <Send className="h-6 w-6 text-gray-700" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Monitor Gmail Status
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Track and monitor Gmail account activity and email statuses in real-time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
