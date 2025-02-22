import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ButtonProps } from './types';

const ClearButton: React.FC<ButtonProps> = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="inline-flex items-center px-3 py-1.5 text-sm font-medium 
                text-gray-700 bg-white border border-gray-300 rounded-lg 
                hover:bg-gray-50 transition-colors duration-200 shadow-sm
                whitespace-nowrap mb-4 cursor-pointer"
    aria-label={`Clear ${label.toLowerCase()}`}
  >
    <XMarkIcon className="h-4 w-4 mr-1.5 flex-shrink-0" />
    <span>{label}</span>
  </button>
);

export default ClearButton;