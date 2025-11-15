import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  icon?: LucideIcon;
  className?: string;
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  icon: Icon, 
  className = '' 
}: ButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-8 py-4 rounded-lg transition-all font-semibold text-lg ${variants[variant]} ${className}`}
    >
      {Icon && <Icon className="w-6 h-6" />}
      {children}
    </button>
  );
}