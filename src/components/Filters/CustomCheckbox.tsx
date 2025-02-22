import React from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { CheckboxProps } from './types';

export const CustomCheckbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => (
  <button 
    onClick={onChange} 
    className="w-full relative flex items-center p-2 rounded-lg cursor-pointer 
             hover:bg-blue-50 transition-colors duration-150 group"
    aria-checked={checked}
    role="checkbox"
  >
    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mr-3
                   transition-all duration-200 ${
                     checked 
                       ? 'bg-blue-500 border-blue-500 scale-105' 
                       : 'border-gray-300 group-hover:border-blue-400'
                   }`}>
      {checked && <CheckIcon className="h-3 w-3 text-white" />}
    </div>
    <span className={`text-sm ${checked ? 'text-blue-700 font-medium' : 'text-gray-700'} 
                   group-hover:text-blue-900`}>
      {label}
    </span>
  </button>
);
