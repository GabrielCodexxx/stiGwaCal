import React from 'react';

export default function ResultsDisplay({ gwa, gradePoint, periodGrades, prelim, midterm, prefinal, final }) {
  if (!gwa || gwa === '') return null;

  return (
    <div className="mt-8 space-y-6">
      {periodGrades && (
        <div className="p-6 bg-gray-50 rounded-xl">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Grade Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {periodGrades.prelim && (
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">Prelim:</span>
                <span className="text-blue-600">{prelim}% → {periodGrades.prelim.gwa} ({periodGrades.prelim.desc})</span>
              </div>
            )}
            {periodGrades.midterm && (
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">Midterm:</span>
                <span className="text-blue-600">{midterm}% → {periodGrades.midterm.gwa} ({periodGrades.midterm.desc})</span>
              </div>
            )}
            {periodGrades.prefinal && (
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">Pre-Final:</span>
                <span className="text-blue-600">{prefinal}% → {periodGrades.prefinal.gwa} ({periodGrades.prefinal.desc})</span>
              </div>
            )}
            {periodGrades.final && (
              <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                <span className="font-semibold text-gray-700">Final:</span>
                <span className="text-blue-600">{final}% → {periodGrades.final.gwa} ({periodGrades.final.desc})</span>
              </div>
            )}
          </div>
          <div className="mt-4 p-3 bg-indigo-50 rounded-lg border-2 border-indigo-200">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800">Average Percentage:</span>
              <span className="text-xl font-bold text-indigo-600">{periodGrades.average}%</span>
            </div>
          </div>
        </div>
      )}

      <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Final GWA Result</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm mb-1">General Weighted Average</p>
            <p className="text-5xl font-bold text-blue-600">{gwa}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm mb-1">Performance Level</p>
            <p className="text-3xl font-bold text-purple-600">{gradePoint}</p>
          </div>
        </div>
      </div>
    </div>
  );
}