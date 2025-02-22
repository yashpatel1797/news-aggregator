import React, { useState, useCallback } from 'react';
  import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
  import FilterSection from '../Filters/FilterSection';
  import PreferencesSection from '../Filters/PreferencesSection';
  import { LAYOUT_CONSTANTS } from './constans';
  
  const MobileNav: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleNav = useCallback(() => {
      setIsOpen(prev => !prev);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    }, [isOpen]);
  
    return (
      <div className="md:hidden">
        <button
          onClick={toggleNav}
          className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
  
        {isOpen && (
          <div 
            className="fixed inset-0 bg-white"
            style={{ zIndex: LAYOUT_CONSTANTS.Z_INDICES.MOBILE_NAV }}
          >
            <div className="flex justify-end p-4">
              <button
                onClick={toggleNav}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                aria-label="Close menu"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto pb-20 max-h-[calc(100vh-80px)]">
              <FilterSection />
              <PreferencesSection />
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default MobileNav;