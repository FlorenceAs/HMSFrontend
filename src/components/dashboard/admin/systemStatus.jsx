import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const StatusIcon = ({ status }) => {
  switch (status) {
    case 'healthy':
      return <CheckCircle size={16} className="text-green-500" />;
    case 'warning':
      return <AlertCircle size={16} className="text-yellow-500" />;
    case 'error':
      return <XCircle size={16} className="text-red-500" />;
    default:
      return <CheckCircle size={16} className="text-green-500" />;
  }
};

const SystemStatus = ({ statusItems = [], title = "System Status" }) => {
  return (
    <div className="bg-[#F4F6F8] rounded-lg h-[76%] overflow-auto border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">{title}</h2>
      <div className="space-y-4">
        {statusItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-0.5">
              <StatusIcon status={item.status} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800">{item.label}</p>
              <p className="text-sm text-gray-500 mt-1">{item.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemStatus;