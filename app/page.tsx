'use client';

import React, { useState } from 'react';
import { Calculator, Moon, Sun, Github,} from 'lucide-react';

type GradeInfo = { gwa: number; desc: string };

type PeriodGradesState = {
  prelim: GradeInfo | null;
  midterm: GradeInfo | null;
  prefinal: GradeInfo | null;
  final: GradeInfo | null;
  average: string;
} | null;

export default function STIGWACalculator() {
  const [prelim, setPrelim] = useState('');
  const [midterm, setMidterm] = useState('');
  const [prefinal, setPrefinal] = useState('');
  const [final, setFinal] = useState('');
  const [gwa, setGwa] = useState('');
  const [gradePoint, setGradePoint] = useState('');
  const [periodGrades, setPeriodGrades] = useState<PeriodGradesState>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showModal, setShowModal] = useState(false);


  const GITHUB_LINK = 'https://github.com/GabrielCodexxx';

  const getGradePoint = (percentage: string | number): GradeInfo | null => {
    const grade = parseFloat(String(percentage));
    if (isNaN(grade)) return null;
    
    if (grade >= 97.50 && grade <= 100) return { gwa: 1.00, desc: 'Excellent' };
    if (grade >= 94.50) return { gwa: 1.25, desc: 'Very Good' };
    if (grade >= 91.50) return { gwa: 1.50, desc: 'Very Good' };
    if (grade >= 86.50) return { gwa: 1.75, desc: 'Very Good' };
    if (grade >= 81.50) return { gwa: 2.00, desc: 'Satisfactory' };
    if (grade >= 76.00) return { gwa: 2.25, desc: 'Satisfactory' };
    if (grade >= 70.50) return { gwa: 2.50, desc: 'Satisfactory' };
    if (grade >= 65.00) return { gwa: 2.75, desc: 'Fair' };
    if (grade >= 59.50) return { gwa: 3.00, desc: 'Fair' };
    return { gwa: 5.00, desc: 'Failed' };
  };

  const calculateGWA = async () => {
    const grades = [
      parseFloat(prelim),
      parseFloat(midterm),
      parseFloat(prefinal),
      parseFloat(final)
    ];

    const validGrades = grades.filter(g => !isNaN(g) && g >= 0 && g <= 100);
    
    if (validGrades.length === 0) {
      setShowModal(true);
      return;
    }

    setIsCalculating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const average = validGrades.reduce((sum, grade) => sum + grade, 0) / validGrades.length;
    const gradeInfo = getGradePoint(average);
    
    if (gradeInfo) {
      setGwa(gradeInfo.gwa.toFixed(2));
      setGradePoint(gradeInfo.desc);
      
      setPeriodGrades({
        prelim: prelim ? getGradePoint(parseFloat(prelim)) : null,
        midterm: midterm ? getGradePoint(parseFloat(midterm)) : null,
        prefinal: prefinal ? getGradePoint(parseFloat(prefinal)) : null,
        final: final ? getGradePoint(parseFloat(final)) : null,
        average: average.toFixed(2)
      });
    }

    setIsCalculating(false);
  };

  const resetCalculator = () => {
    setPrelim('');
    setMidterm('');
    setPrefinal('');
    setFinal('');
    setGwa('');
    setGradePoint('');
    setPeriodGrades(null);
  };

  const gradingScale = [
    { range: '97.50-100%', gwa: '1.00 (Excellent)', color: darkMode ? 'bg-emerald-800 border-emerald-700 text-white' : 'bg-teal-200 border-teal-400 text-teal-900' },
    { range: '94.50-97.49%', gwa: '1.25 (Very Good)', color: darkMode ? 'bg-green-800 border-green-700 text-white' : 'bg-green-200 border-green-400 text-green-900' },
    { range: '91.50-94.49%', gwa: '1.50 (Very Good)', color: darkMode ? 'bg-blue-800 border-blue-700 text-white' : 'bg-blue-200 border-blue-400 text-blue-900' },
    { range: '86.50-91.49%', gwa: '1.75 (Very Good)', color: darkMode ? 'bg-cyan-800 border-cyan-700 text-white' : 'bg-cyan-200 border-cyan-400 text-cyan-900' },
    { range: '81.50-86.49%', gwa: '2.00 (Satisfactory)', color: darkMode ? 'bg-yellow-800 border-yellow-700 text-white' : 'bg-yellow-200 border-yellow-400 text-yellow-900' },
    { range: '76.00-81.49%', gwa: '2.25 (Satisfactory)', color: darkMode ? 'bg-amber-800 border-amber-700 text-white' : 'bg-amber-200 border-amber-400 text-amber-900' },
    { range: '70.50-75.99%', gwa: '2.50 (Satisfactory)', color: darkMode ? 'bg-orange-800 border-orange-700 text-white' : 'bg-orange-200 border-orange-400 text-orange-900' },
    { range: '65.00-70.49%', gwa: '2.75 (Fair)', color: darkMode ? 'bg-red-800 border-red-700 text-white' : 'bg-red-200 border-red-400 text-red-900' },
    { range: '59.50-64.99%', gwa: '3.00 (Fair)', color: darkMode ? 'bg-rose-800 border-rose-700 text-white' : 'bg-pink-200 border-pink-400 text-pink-900' },
    { range: 'Below 59.50%', gwa: '5.00 (Failed)', color: darkMode ? 'bg-red-900 border-red-800 text-white' : 'bg-red-300 border-red-500 text-red-950' },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
        <div className="min-h-screen py-4 px-3">
          <div className="max-w-6xl mx-auto">
            <div className={`rounded-2xl shadow-lg p-4 mb-4 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 flex-1">
                  <div className="flex-1 text-center">
                    <h1 className={`text-2xl md:text-3xl ml-25 font-bold bg-gradient-to-r ${darkMode ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'} bg-clip-text text-transparent`}>
                      STI College GWA Calculator
                    </h1>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={GITHUB_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900'}`}
                    title="View on GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-2 rounded-full transition-all ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                  >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className={`rounded-2xl shadow-lg p-4 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Grading Scale Reference
                </h2>
                <div className="space-y-2">
                  {gradingScale.map((scale, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-xl border-2 transition-all ${scale.color}`}
                    >
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span>{scale.range}</span>
                        <span>{scale.gwa}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              <div className="lg:col-span-2 space-y-4">
                <div className={`rounded-2xl shadow-lg p-4 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Enter Your Grades
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className={`block text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        Prelim Grade (%)
                      </label>
                      <input
                        type="number"
                        placeholder="Enter Prelim grade"
                        value={prelim}
                        onChange={(e) => setPrelim(e.target.value)}
                        min="0"
                        max="100"
                        step="0.01"
                        className={`w-full px-3 py-2.5 border-2 rounded-lg focus:outline-none transition-all text-sm font-medium ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 placeholder-gray-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        Midterm Grade (%)
                      </label>
                      <input
                        type="number"
                        placeholder="Enter Midterm grade"
                        value={midterm}
                        onChange={(e) => setMidterm(e.target.value)}
                        min="0"
                        max="100"
                        step="0.01"
                        className={`w-full px-3 py-2.5 border-2 rounded-lg focus:outline-none transition-all text-sm font-medium ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 placeholder-gray-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        Pre-Final Grade (%)
                      </label>
                      <input
                        type="number"
                        placeholder="Enter Pre-Final grade"
                        value={prefinal}
                        onChange={(e) => setPrefinal(e.target.value)}
                        min="0"
                        max="100"
                        step="0.01"
                        className={`w-full px-3 py-2.5 border-2 rounded-lg focus:outline-none transition-all text-sm font-medium ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 placeholder-gray-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-bold mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                        Final Grade (%)
                      </label>
                      <input
                        type="number"
                        placeholder="Enter Final grade"
                        value={final}
                        onChange={(e) => setFinal(e.target.value)}
                        min="0"
                        max="100"
                        step="0.01"
                        className={`w-full px-3 py-2.5 border-2 rounded-lg focus:outline-none transition-all text-sm font-medium ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-400 placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 placeholder-gray-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={calculateGWA}
                      disabled={isCalculating}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-md font-bold text-sm ${isCalculating ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {isCalculating ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Calculating...
                        </>
                      ) : (
                        <>
                          <Calculator className="w-4 h-4" />
                          Calculate GWA
                        </>
                      )}
                    </button>
                    <button
                      onClick={resetCalculator}
                      disabled={isCalculating}
                      className={`px-6 py-2.5 rounded-lg transition-all font-bold text-sm ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                      } ${isCalculating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {gwa && (
                  <div className={`rounded-2xl shadow-lg p-4 transition-colors ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <h2 className={`text-lg font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Your Results
                    </h2>

                    {periodGrades && (
                      <div className={`p-3 rounded-xl mb-3 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                        <h3 className={`text-sm font-bold mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                          Grade Breakdown
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {periodGrades.prelim && (
                            <div className={`p-2 rounded-lg text-xs ${darkMode ? 'bg-gray-800 border border-gray-600' : 'bg-white border border-gray-200'}`}>
                              <div className="flex justify-between items-center">
                                <span className={`font-bold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Prelim:</span>
                                <span className={`font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                                  {prelim}% → {periodGrades.prelim.gwa}
                                </span>
                              </div>
                            </div>
                          )}
                          {periodGrades.midterm && (
                            <div className={`p-2 rounded-lg text-xs ${darkMode ? 'bg-gray-800 border border-gray-600' : 'bg-white border border-gray-200'}`}>
                              <div className="flex justify-between items-center">
                                <span className={`font-bold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Midterm:</span>
                                <span className={`font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                                  {midterm}% → {periodGrades.midterm.gwa}
                                </span>
                              </div>
                            </div>
                          )}
                          {periodGrades.prefinal && (
                            <div className={`p-2 rounded-lg text-xs ${darkMode ? 'bg-gray-800 border border-gray-600' : 'bg-white border border-gray-200'}`}>
                              <div className="flex justify-between items-center">
                                <span className={`font-bold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Pre-Final:</span>
                                <span className={`font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                                  {prefinal}% → {periodGrades.prefinal.gwa}
                                </span>
                              </div>
                            </div>
                          )}
                          {periodGrades.final && (
                            <div className={`p-2 rounded-lg text-xs ${darkMode ? 'bg-gray-800 border border-gray-600' : 'bg-white border border-gray-200'}`}>
                              <div className="flex justify-between items-center">
                                <span className={`font-bold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>Final:</span>
                                <span className={`font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                                  {final}% → {periodGrades.final.gwa}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className={`mt-2 p-2 rounded-lg border ${darkMode ? 'bg-indigo-900/30 border-indigo-700' : 'bg-indigo-50 border-indigo-300'}`}>
                          <div className="flex justify-between items-center text-xs">
                            <span className={`font-bold ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                              Average:
                            </span>
                            <span className={`text-base font-bold ${darkMode ? 'text-indigo-400' : 'text-indigo-700'}`}>
                              {periodGrades.average}%
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className={`p-4 rounded-xl border-2 ${darkMode ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-700' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-300'}`}>
                      <h3 className={`text-base font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Final GWA Result
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                          <p className={`text-xs mb-1 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            GWA
                          </p>
                          <p className={`text-4xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                            {gwa}
                          </p>
                        </div>
                        <div className={`p-4 rounded-lg shadow ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
                          <p className={`text-xs mb-1 font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Performance
                          </p>
                          <p className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-700'}`}>
                            {gradePoint}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
            <div className={`rounded-2xl shadow-2xl p-6 max-w-md w-full transform transition-all animate-scaleIn ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'}`}>
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <h3 className={`text-xl font-bold text-center mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Invalid Input
              </h3>
              <p className={`text-center mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Please enter at least one valid grade (0-100) to calculate your GWA.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-bold transition-all shadow-md"
              >
                Got it!
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}