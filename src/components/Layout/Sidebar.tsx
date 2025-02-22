  import React from 'react';
  import FilterSection from '../Filters/FilterSection';
  import PreferencesSection from '../Filters/PreferencesSection';
  
  const Sidebar: React.FC = () => {
    return (
      <div className="h-full bg-white shadow-md overflow-y-auto">
        <div className="p-4 space-y-6">
          <FilterSection />
          <PreferencesSection />
        </div>
      </div>
    );
  };
  
  export default Sidebar;