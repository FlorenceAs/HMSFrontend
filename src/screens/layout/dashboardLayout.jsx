import React, { useState } from 'react';
import Sidebar from '../../utils/ui/sidebar';
import TopNav from '../../utils/ui/topNav';

const DashboardLayout = ({
  children,
  roleId = 0,
  user,
  title = "Hello Admin",
  subtitle,
  onMenuItemClick
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuItemClick = (itemId) => {
    onMenuItemClick?.(itemId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="h-screen border overflow-none bg-white flex">
      <Sidebar
        roleId={roleId}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
        onMenuItemClick={handleMenuItemClick}
      />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden ">
        <TopNav
          user={user}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          title={title}
          subtitle={subtitle}
        />
        
        <main className="flex-1 overflow-none p-2 lg:p-4">
          <div className="max-w-8xl ">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;