import React from 'react';
import { ErrorMessageProps } from './types';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => (
  <div className="text-center py-8" role="alert">
    <p className="text-red-600 mb-4">{message}</p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600
                  transition-colors duration-200"
        aria-label="Retry"
      >
        Try Again
      </button>
    )}
  </div>
);

export default ErrorMessage;