import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const PatientStatusChart = ({ 
  patientData = [
    { name: 'Admitted', value: 150, color: '#3B82F6' },
    { name: 'Outpatients', value: 132, color: '#F59E0B' },
    { name: 'Discharged', value: 15, color: '#10B981' }
  ],
  title = "Patients Status Overview" 
}) => {
  
  const totalPatients = patientData.reduce((sum, item) => sum + item.value, 0);

  // Calculate percentages
  const dataWithPercentages = patientData.map(item => ({
    ...item,
    percentage: Math.round((item.value / totalPatients) * 100)
  }));

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-gray-800 text-white p-3 rounded-lg shadow-lg border">
          <p className="text-sm font-medium">
            {data.name}
          </p>
          <p className="text-sm">
            {data.value} patients ({data.payload.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-[76%] w-full">
      <div className="flex flex-col h-full">
        {/* Header with dotted border */}
        <div className="border-b border-dotted border-blue-300 pb-3 mb-6">
          <h2 className="text-base font-medium text-gray-800 text-center">{title}</h2>
        </div>

        {/* Chart Container */}
        <div className="relative flex-1 flex items-center justify-center">
          <div style={{ width: '250px', height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataWithPercentages}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {dataWithPercentages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-sm text-gray-500 mb-1">Total Counts</div>
            <div className="text-3xl font-bold text-gray-800">{totalPatients}</div>
          </div>
        </div>

        {/* Legend Table */}
        <div className="mt-6 space-y-2">
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 pb-2 border-b border-gray-200">
            <div className="text-sm font-medium text-gray-600">Status</div>
            <div className="text-sm font-medium text-gray-600 text-right">Counts</div>
            <div className="text-sm font-medium text-gray-600 text-right">%</div>
          </div>
          
          {/* Data rows */}
          {dataWithPercentages.map((item, index) => (
            <div key={index} className="grid grid-cols-3 gap-4 py-2">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-700">{item.name}</span>
              </div>
              <div className="text-sm font-medium text-gray-800 text-right">{item.value}</div>
              <div className="text-sm text-gray-600 text-right">{item.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientStatusChart;