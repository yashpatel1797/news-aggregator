import React from 'react';
import { NewspaperIcon } from '@heroicons/react/24/outline';
import SearchBar from '../Search/SearchBar';
import MobileNav from './MobileNav';
import { LAYOUT_CONSTANTS } from './constans';

const Navbar: React.FC = () => {
  return (
    <nav 
      className="bg-white shadow sticky top-0"
      style={{ zIndex: LAYOUT_CONSTANTS.Z_INDICES.NAVBAR }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <MobileNav />
            <div className="flex items-center space-x-2">
              <NewspaperIcon className="h-6 w-6 text-blue-500" />
              <h1 className="text-xl font-bold text-gray-900">
                News Aggregator
              </h1>
            </div>
          </div>
          <div className="flex-1 max-w-xl mx-auto px-4">
            <SearchBar />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;