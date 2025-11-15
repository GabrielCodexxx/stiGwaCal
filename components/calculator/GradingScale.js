import React from 'react';

export default function GradingScale() {
  const scales = [
    { range: '97.50-100%', gwa: '1.00 (Excellent)', bg: 'bg-green-50', text: 'text-green-700' },
    { range: '94.50-97.49%', gwa: '1.25 (Very Good)', bg: 'bg-green-50', text: 'text-green-600' },
    { range: '91.50-94.49%', gwa: '1.50 (Very Good)', bg: 'bg-blue-50', text: 'text-blue-600' },
    { range: '86.50-91.49%', gwa: '1.75 (Very Good)', bg: 'bg-blue-50', text: 'text-blue-600' },
    { range: '81.50-86.49%', gwa: '2.00 (Satisfactory)', bg: 'bg-yellow-50', text: 'text-yellow-700' },
    { range: '76.00-81.49%', gwa: '2.25 (Satisfactory)', bg: 'bg-yellow-50', text: 'text-yellow-700' },
    { range: '70.50-75.99%', gwa: '2.50 (Satisfactory)', bg: 'bg-orange-50', text: 'text-orange-600' },
    { range: '65.00-70.49%', gwa: '2.75 (Fair)', bg: 'bg-orange-50', text: 'text-orange-600' },
    { range: '59.50-64.99%', gwa: '3.00 (Fair)', bg: 'bg-red-50', text: 'text-red-600' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Grading Scale Reference</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
        {scales.map((scale, index) => (
          <div key={index} className={`flex justify-between p-2 ${scale.bg} rounded-lg`}>
            <span className="font-semibold">{scale.range}</span>
            <span className={scale.text}>{scale.gwa}</span>
          </div>
        ))}
        <div className="flex justify-between p-2 bg-red-100 rounded-lg col-span-full">
          <span className="font-semibold">Below 59.50%</span>
          <span className="text-red-700">5.00 (Failed)</span>
        </div>
      </div>
    </div>
  );
}