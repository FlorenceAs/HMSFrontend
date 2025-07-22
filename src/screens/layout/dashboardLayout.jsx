import React, { useState } from 'react';
import Sidebar from '../../utils/ui/sidebar';
import TopNav from '../../utils/ui/topNav';

const DashboardLayout = ({
  children,
  user,
  title = "Hello Admin",
  subtitle,
  roleId = 0,
  onMenuItemClick,
  setIsAuthenticated,
  setUser
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMenuItemClick = (itemId) => {
    onMenuItemClick?.(itemId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="h-screen border overflow-auto bg-white flex p-2">
      <Sidebar
        roleId={roleId}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={closeMobileMenu}
        onMenuItemClick={handleMenuItemClick}
        setIsAuthenticated={setIsAuthenticated}
        setUser={user}
      />
      
      <div className="flex-1 flex flex-col h-full overflow-hidden ">
        <TopNav
          user={user}
          onMobileMenuToggle={toggleMobileMenu}
          title={title}
          subtitle={subtitle}
        />
        
        <main className="flex-1 overflow-auto p-2 lg:p-4">
          <div className="max-w-8xl ">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;