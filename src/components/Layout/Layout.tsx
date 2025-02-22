import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { LayoutProps } from './types';
import { LAYOUT_CONSTANTS } from './constans';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex relative">
        <aside 
          className="hidden md:block fixed top-16 left-0 w-64 h-[calc(100vh-64px)]"
          style={{ 
            top: LAYOUT_CONSTANTS.HEADER_HEIGHT,
            width: LAYOUT_CONSTANTS.SIDEBAR_WIDTH,
            height: `calc(100vh - ${LAYOUT_CONSTANTS.HEADER_HEIGHT})`
          }}
        >
          <Sidebar />
        </aside>
        <main className="flex-1 p-4 md:p-6 md:ml-64">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
