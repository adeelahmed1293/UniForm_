import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, Clock, XCircle } from 'lucide-react';

const EmailMonitor = () => {
  const [emailStatuses, setEmailStatuses] = useState([
    { id: 1, studentName: 'John Doe', email: 'john@university.edu', status: 'sent', sentAt: '2025-12-13 10:30 AM' },
    { id: 2, studentName: 'Jane Smith', email: 'jane@university.edu', status: 'delivered', sentAt: '2025-12-13 10:28 AM' },
    { id: 3, studentName: 'Mike Johnson', email: 'mike@university.edu', status: 'pending', sentAt: '2025-12-13 10:25 AM' },
    { id: 4, studentName: 'Sarah Williams', email: 'sarah@university.edu', status: 'failed', sentAt: '2025-12-13 10:20 AM' },
    { id: 5, studentName: 'David Brown', email: 'david@university.edu', status: 'delivered', sentAt: '2025-12-13 10:15 AM' },
    { id: 6, studentName: 'Emma Wilson', email: 'emma@university.edu', status: 'sent', sentAt: '2025-12-13 10:10 AM' },
    { id: 7, studentName: 'James Taylor', email: 'james@university.edu', status: 'delivered', sentAt: '2025-12-13 10:05 AM' },
  ]);

  // You can add useEffect here to fetch real data from your API
  // useEffect(() => {
  //   fetchEmailStatuses();
  // }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'sent':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'delivered':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'failed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const statusCounts = {
    sent: emailStatuses.filter(s => s.status === 'sent').length,
    delivered: emailStatuses.filter(s => s.status === 'delivered').length,
    pending: emailStatuses.filter(s => s.status === 'pending').length,
    failed: emailStatuses.filter(s => s.status === 'failed').length,
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm w-full">
      <div className="p-8 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center">
            <Mail className="h-7 w-7 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Email Monitor</h2>
            <p className="text-sm text-gray-500 mt-1">Track delivery status</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Status Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-green-700">Delivered</span>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-700">{statusCounts.delivered}</p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-blue-700">Sent</span>
              <CheckCircle className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-700">{statusCounts.sent}</p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-yellow-700">Pending</span>
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-yellow-700">{statusCounts.pending}</p>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-red-700">Failed</span>
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-3xl font-bold text-red-700">{statusCounts.failed}</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="grid gap-4">
            {emailStatuses.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-xl p-5 hover:bg-gray-50 transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-semibold text-gray-900">{item.studentName}</p>
                    <p className="text-sm text-gray-500 mt-1">{item.email}</p>
                  </div>
                  {getStatusIcon(item.status)}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm px-3 py-1.5 rounded-full border font-medium ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                  <span className="text-sm text-gray-400">{item.sentAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailMonitor;