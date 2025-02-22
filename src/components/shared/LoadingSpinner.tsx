import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div 
    className="flex justify-center items-center py-8"
    role="status"
    aria-label="Loading"
  >
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
  </div>
);

export default LoadingSpinner;