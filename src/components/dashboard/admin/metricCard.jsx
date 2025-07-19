import React from 'react';

const MetricCard = ({ title, value, icon: Icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-semibold text-gray-800">{value}</p>
        </div>
        <div className={`${colorClasses[color]} opacity-80`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
