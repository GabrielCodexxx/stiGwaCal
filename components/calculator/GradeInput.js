import React from 'react';

export default function GradeInput({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min="0"
        max="100"
        step="0.01"
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-lg"
      />
    </div>
  );
}