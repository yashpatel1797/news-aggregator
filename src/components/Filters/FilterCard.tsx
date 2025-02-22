import React from 'react';

interface FilterCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const FilterCard: React.FC<FilterCardProps> = ({ title, icon, children }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm">
    <h3 className="text-lg font-semibold mb-4 text-gray-900 border-b pb-2 flex items-center">
      {icon && <span className="mr-2">{icon}</span>}
      {title}
    </h3>
    {children}
  </div>
);