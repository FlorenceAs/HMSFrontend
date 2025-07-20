import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const PatientStatusChart = ({ 
  patientData = [
    { name: 'Completed', value: 45, color: '#10B981' },
    { name: 'Administration', value: 30, color: '#3B82F6' },
    { name: 'Pending', value: 15, color: '#F59E0B' },
    { name: 'Incoming', value: 10, color: '#8B5CF6' }
  ],
  title = "Patient Status Overview" 
}) => {
  
  const COLORS = patientData.map(item => item.color);

  // Custom label function for percentages
  const renderLabel = (entry) => {
    const percent = ((entry.value / patientData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1);
    return `${percent}%`;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-800">
            {data.name}: {data.value} patients
          </p>
          <p className="text-xs text-gray-500">
            {((data.value / patientData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700 font-medium">
              {entry.value}
            </span>
            <span className="text-xs text-gray-500">
              ({patientData.find(item => item.name === entry.value)?.value || 0})
            </span>
          </div>
        ))}
      </div>
    );
  };

  const totalPatients = patientData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-[#F4F6F8] rounded-lg h-[76%] border border-gray-200 p-6">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Total Patients: <span className="font-medium text-gray-700">{totalPatients}</span>
          </p>
        </div>

        {/* Chart Container */}
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={patientData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                stroke="#ffffff"
                strokeWidth={2}
              >
                {patientData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Status Summary */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {patientData.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientStatusChart;