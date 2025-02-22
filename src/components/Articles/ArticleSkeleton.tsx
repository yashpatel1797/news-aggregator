import React from 'react';

const ArticleSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-4">
      <div className="flex justify-between mb-2">
        <div className="h-4 bg-gray-200 w-24 rounded"></div>
        <div className="h-4 bg-gray-200 w-24 rounded"></div>
      </div>
      <div className="h-6 bg-gray-200 w-3/4 mb-2 rounded"></div>
      <div className="h-4 bg-gray-200 w-full mb-2 rounded"></div>
      <div className="h-4 bg-gray-200 w-2/3 rounded"></div>
    </div>
  </div>
);

export default ArticleSkeleton;