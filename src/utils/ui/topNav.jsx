import React from 'react';
import { Bell, Menu } from 'lucide-react';

const TopNav = ({ user, onMobileMenuToggle, title = "Hello Admin", subtitle }) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="bg-white border-b border-gray-200 px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
            <p className="text-sm text-gray-500 mt-1">
              {subtitle || `Today is ${currentDate}`}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">{user.initials}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;