import React from "react";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FlaskConical,
  Phone,
  Pill,
  FileText,
  CreditCard,
  UserCheck,
  Shield,
  Settings,
  LogOut,
  Stethoscope,
  ClipboardList,
  Edit3,
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const menuConfig = {
  0: [ // Admin menu
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard"
    },
    { 
      id: "user", 
      label: "User", 
      icon: Users,
      path: "/admin/users"
    },
    { 
      id: "patients", 
      label: "Patients", 
      icon: UserPlus,
      path: "/admin/patients"
    },
    { 
      id: "laboratory", 
      label: "Laboratory", 
      icon: FlaskConical,
      path: "/admin/laboratory"
    },
    { 
      id: "reception", 
      label: "Reception", 
      icon: Phone,
      path: "/admin/reception"
    },
    { 
      id: "pharmacy", 
      label: "Pharmacy", 
      icon: Pill,
      path: "/admin/pharmacy"
    },
    { 
      id: "audit", 
      label: "Audit Logs", 
      icon: FileText,
      path: "/admin/audit"
    },
    { 
      id: "billing", 
      label: "Billing", 
      icon: CreditCard,
      path: "/admin/billing"
    },
    { 
      id: "providers", 
      label: "Providers", 
      icon: UserCheck,
      path: "/admin/providers"
    },
    { 
      id: "access", 
      label: "Access Control", 
      icon: Shield,
      path: "/admin/access"
    },
    { 
      id: "settings", 
      label: "System Settings", 
      icon: Settings,
      path: "/admin/settings"
    },
    { 
      id: "logout", 
      label: "Logout", 
      icon: LogOut 
    },
  ],
  1: [ // Doctor menu (roleId 1)
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/user/dashboard"
    },
    { 
      id: "patients", 
      label: "Patients", 
      icon: Users,
      path: "/user/patients"
    },
    { 
      id: "lab-request", 
      label: "Lab Request", 
      icon: FlaskConical,
      path: "/user/lab-request"
    },
    { 
      id: "prescription", 
      label: "Prescription", 
      icon: Edit3,
      path: "/user/prescription"
    },
    { 
      id: "logout", 
      label: "Logout", 
      icon: LogOut 
    },
  ]
};

const Sidebar = ({
  roleId = 0,
  isMobileOpen,
  onMobileClose,
  onMenuItemClick,
  setIsAuthenticated,
  setUser,
}) => {
  const menuItems = menuConfig[roleId] || [];
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      // Determine token key and logout endpoint based on role
      const isAdmin = roleId === 0;
      const tokenKey = isAdmin ? "adminToken" : "userToken";
      const logoutEndpoint = isAdmin 
        ? "http://localhost:5000/api/admin/logout"
        : "http://localhost:5000/api/auth/logout";
      const loginPath = isAdmin ? "/admin/login" : "/user/login";
      
      const token = localStorage.getItem(tokenKey);
      
      if (token) {
        // Call the logout endpoint
        const response = await fetch(logoutEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          console.error("Logout API error:", data);
          // Continue with logout even if API fails
        }
      }

      // Clear local storage
      localStorage.removeItem(tokenKey);
      
      // Reset authentication state (with safety checks)
      if (typeof setIsAuthenticated === 'function') {
        setIsAuthenticated(false);
      }
      if (typeof setUser === 'function') {
        setUser(null);
      }
      
      // Show success message
      toast.success("Logged out successfully");
      
      // Navigate to appropriate login screen
      navigate(loginPath, { replace: true });
      
    } catch (error) {
      console.error("Logout error:", error);
      
      // Still perform local logout even if API call fails
      const isAdmin = roleId === 0;
      const tokenKey = isAdmin ? "adminToken" : "userToken";
      const loginPath = isAdmin ? "/admin/login" : "/user/login";
      
      localStorage.removeItem(tokenKey);
      
      // Reset authentication state (with safety checks)
      if (typeof setIsAuthenticated === 'function') {
        setIsAuthenticated(false);
      }
      if (typeof setUser === 'function') {
        setUser(null);
      }
      
      toast.success("Logged out Successfully");
      navigate(loginPath, { replace: true });
    }
  };

  const handleMenuItemClick = (item) => {
    if (item.id === "logout") {
      handleLogout();
    } else if (item.path) {
      navigate(item.path);
      onMenuItemClick?.(item.id);
    } else {
      // For items without paths, just call the callback
      onMenuItemClick?.(item.id);
    }
  };

  return (
    <>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <div
        className={`
        fixed left-0 top-0 h-[100%] w-64 bg-[#E8EDF2] border-r border-blue-100 z-50 transform transition-transform duration-300 ease-in-out rounded-3xl
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}
      >
        <div className="p-6 text-3xl text-blue-500">
          dovacare
          
        </div>

        <nav className="mt-6 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isLogout = item.id === "logout";
            const isActive = item.path && location.pathname === item.path;
            
            return (
              <button
                key={item.id}
                onClick={() => handleMenuItemClick(item)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-left transition-colors rounded-lg mb-2
                  ${
                    isActive
                      ? "bg-[#D1E5F8] text-[#0066CC] shadow-sm"
                      : isLogout 
                      ? "text-red-600 hover:bg-red-50 hover:text-red-700"
                      : "text-gray-900 hover:bg-blue-100"
                  }
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;