import React from 'react';
import { GraduationCap } from 'lucide-react';

export default function Header() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
      <div className="flex items-center justify-center gap-3 mb-4">
        <GraduationCap className="w-10 h-10 text-blue-600" />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          STI College GWA Calculator
        </h1>
      </div>
      <p className="text-center text-gray-600">Calculate your General Weighted Average with ease</p>
    </div>
  );
}