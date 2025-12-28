import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle, Clock, XCircle, TrendingUp, Activity, Search, Trash2, Check, AlertCircle } from 'lucide-react';

const EmailMonitor = () => {
  const [emailStatuses, setEmailStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingEmail, setDeletingEmail] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchEmailStatuses();
  }, []);

  // Toast auto-hide effect
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const fetchEmailStatuses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://challan-pdf-genertor.onrender.com/list-challans', {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      
      // Transform API data to match our component structure
      const transformedData = data.map((item, index) => ({
        id: index + 1,
        studentName: item.student_name || 'N/A',
        email: item.email || 'N/A',
        status: item.status?.toLowerCase() || 'pending',
        sentAt: item.created_at ? new Date(item.created_at).toLocaleString() : 'N/A'
      }));
      
      setEmailStatuses(transformedData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching email statuses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (email) => {
    if (!confirm(`Are you sure you want to delete the challan for ${email}?`)) {
      return;
    }

    try {
      setDeletingEmail(email);
      const response = await fetch(`https://challan-pdf-genertor.onrender.com/delete-challan/${encodeURIComponent(email)}`, {
        method: 'DELETE',
        headers: {
          'accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete challan');
      }

      // Remove the deleted item from the list
      setEmailStatuses(prevStatuses => prevStatuses.filter(item => item.email !== email));
      showToast('Challan deleted successfully', 'success');
      
    } catch (err) {
      showToast(`Error: ${err.message}`, 'error');
      console.error('Error deleting challan:', err);
    } finally {
      setDeletingEmail(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
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
    pending: emailStatuses.filter(s => s.status === 'pending').length,
    failed: emailStatuses.filter(s => s.status === 'failed').length,
  };

  // Filter emails based on search query
  const filteredEmails = emailStatuses.filter(item => 
    item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex justify-center items-start min-h-[600px]">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border-2 
                       transform transition-all duration-300 animate-slideIn
                       ${toast.type === 'success' 
                         ? 'bg-green-50 border-green-200 text-green-800' 
                         : 'bg-red-50 border-red-200 text-red-800'}`}>
          {toast.type === 'success' ? (
            <Check className="h-5 w-5 text-green-600" strokeWidth={2.5} />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600" strokeWidth={2.5} />
          )}
          <span className="font-bold">{toast.message}</span>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 w-full overflow-hidden">
        
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center p-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600 font-semibold">Loading email statuses...</p>
            </div>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="p-8">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
              <XCircle className="h-12 w-12 text-red-500 mx-auto mb-3" />
              <p className="text-red-700 font-bold mb-2">Error Loading Data</p>
              <p className="text-red-600 text-sm mb-4">{error}</p>
              <button 
                onClick={fetchEmailStatuses}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}
        
        {/* Content */}
        {!loading && !error && (
          <>
        
        {/* Header Section */}
        <div className="relative bg-gradient-to-r from-purple-600 to-purple-800 p-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full filter blur-3xl opacity-10" />
          <div className="relative flex items-center gap-5">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center 
                          shadow-lg border border-white/30">
              <Mail className="h-10 w-10 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white mb-2">Email Monitor</h2>
              <p className="text-purple-100 font-medium">Track and monitor email delivery status</p>
            </div>
          </div>
        </div>

        {/* Body Section */}
        <div className="p-8">
          
          {/* Status Summary Cards */}
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="h-5 w-5 text-[#2c3e50]" />
              <h3 className="text-lg font-black text-[#2c3e50]">Status Overview</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Sent Card */}
              <div className="group relative bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 
                            rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full filter blur-2xl opacity-30" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-blue-700">Sent</span>
                    <div className="w-10 h-10 bg-blue-200/50 rounded-xl flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-blue-600" strokeWidth={2.5} />
                    </div>
                  </div>
                  <p className="text-4xl font-black text-blue-700">{statusCounts.sent}</p>
                  <p className="text-xs text-blue-600 font-semibold mt-2">Successfully sent</p>
                </div>
              </div>
              
              {/* Pending Card */}
              <div className="group relative bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200 
                            rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-200 rounded-full filter blur-2xl opacity-30" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-yellow-700">Pending</span>
                    <div className="w-10 h-10 bg-yellow-200/50 rounded-xl flex items-center justify-center">
                      <Clock className="h-5 w-5 text-yellow-600" strokeWidth={2.5} />
                    </div>
                  </div>
                  <p className="text-4xl font-black text-yellow-700">{statusCounts.pending}</p>
                  <p className="text-xs text-yellow-600 font-semibold mt-2">Awaiting delivery</p>
                </div>
              </div>
              
              {/* Failed Card */}
              <div className="group relative bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 
                            rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-200 rounded-full filter blur-2xl opacity-30" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-red-700">Failed</span>
                    <div className="w-10 h-10 bg-red-200/50 rounded-xl flex items-center justify-center">
                      <XCircle className="h-5 w-5 text-red-600" strokeWidth={2.5} />
                    </div>
                  </div>
                  <p className="text-4xl font-black text-red-700">{statusCounts.failed}</p>
                  <p className="text-xs text-red-600 font-semibold mt-2">Delivery failed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#2c3e50]" />
                <h3 className="text-lg font-black text-[#2c3e50]">Recent Activity</h3>
              </div>
              
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by email or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none 
                           transition-colors text-sm font-medium w-64"
                />
              </div>
            </div>
            
            <div className="grid gap-4">
              {filteredEmails.length === 0 ? (
                <div className="text-center py-12">
                  <Mail className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-semibold">
                    {searchQuery ? 'No matching records found' : 'No email records found'}
                  </p>
                  {searchQuery && (
                    <p className="text-gray-400 text-sm mt-2">Try a different search term</p>
                  )}
                </div>
              ) : (
                filteredEmails.map((item) => (
                <div key={item.id} 
                     className="border-2 border-gray-100 rounded-2xl p-6 hover:border-purple-200 
                              hover:shadow-lg transition-all duration-300 bg-white group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-lg font-black text-gray-900">{item.studentName}</p>
                        {getStatusIcon(item.status)}
                      </div>
                      <p className="text-sm text-gray-500 font-medium flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5" />
                        {item.email}
                      </p>
                    </div>
                    
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(item.email)}
                      disabled={deletingEmail === item.email}
                      className={`ml-4 p-2.5 rounded-xl border-2 transition-all duration-300
                                ${deletingEmail === item.email
                                  ? 'bg-gray-100 border-gray-200 cursor-not-allowed'
                                  : 'bg-red-50 border-red-200 hover:bg-red-100 hover:border-red-300 hover:shadow-md'
                                }`}
                      title="Delete challan"
                    >
                      {deletingEmail === item.email ? (
                        <div className="animate-spin h-5 w-5 border-2 border-gray-400 border-t-transparent rounded-full" />
                      ) : (
                        <Trash2 className="h-5 w-5 text-red-600" strokeWidth={2.5} />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-sm px-4 py-2 rounded-xl border-2 font-bold ${getStatusColor(item.status)}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                    <span className="text-sm text-gray-400 font-semibold flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      {item.sentAt}
                    </span>
                  </div>
                </div>
              ))
              )}
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
            <p className="text-sm text-gray-700 font-medium leading-relaxed">
              <span className="font-black text-purple-600">Live Monitoring:</span> Email statuses are updated in real-time. 
              Sent emails indicate successful dispatch, while failed emails may require manual intervention.
            </p>
          </div>
        </div>
        </>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}} />
    </div>
  );
};

export default EmailMonitor;