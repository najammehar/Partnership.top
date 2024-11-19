import React from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

const Notification = ({ 
  show, 
  type = 'success', 
  message, 
  title,
  onClose 
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-1 ${
          type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`} />
        
        <div className="p-6">
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0">
              {type === 'success' ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-500" />
              )}
            </div>
            
            <div className="ml-3 flex-1">
              <h3 className={`text-lg font-semibold ${
                type === 'success' ? 'text-green-700' : 'text-red-700'
              }`}>
                {title}
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                {message}
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mt-4">
            <button
              onClick={onClose}
              className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-colors ${
                type === 'success' 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;