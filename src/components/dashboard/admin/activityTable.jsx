import React from 'react';

const ActivityTable = ({ activities = [], title = "Recent Activities" }) => {
  // Function to get different colors for initials
  const getInitialsColor = (index) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500', 
      'bg-purple-500',
      'bg-pink-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-indigo-500',
      'bg-teal-500',
      'bg-orange-500'
    ];
    return colors[index % colors.length];
  };

  return (
     <div className="bg-white rounded-lg border h-[76%] border-gray-200 p-6 overflow-auto flex flex-col">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">{title}</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
                NAME
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
                DESCRIPTION
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 uppercase tracking-wider">
                DATE
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {activities.map((activity, index) => (
              <tr key={activity.id} className="hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${getInitialsColor(index)} rounded-full flex items-center justify-center`}>
                      <span className="text-white font-medium text-sm">{activity.initials}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{activity.name}</p>
                      <p className="text-xs text-gray-500">{activity.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-600 font-medium">{activity.action}</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-600">{activity.time}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-center mt-6 gap-2">
        <button className="p-2 text-gray-400 hover:text-gray-600">
          «
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          ‹
        </button>
        <button className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center text-sm">
          1
        </button>
        <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded flex items-center justify-center text-sm">
          2
        </button>
        <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded flex items-center justify-center text-sm">
          3
        </button>
        <span className="text-gray-400 px-2">...</span>
        <button className="w-8 h-8 text-gray-600 hover:bg-gray-100 rounded flex items-center justify-center text-sm">
          10
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          ›
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600">
          »
        </button>
      </div>
    </div>
  );
};

export default ActivityTable;