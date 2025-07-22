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
} from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import logoimg from "../../assets/hmslogo.svg";

const menuConfig = {
  0: [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      active: true,
    },
    { id: "user", label: "User", icon: Users },
    { id: "patients", label: "Patients", icon: UserPlus },
    { id: "laboratory", label: "Laboratory", icon: FlaskConical },
    { id: "reception", label: "Reception", icon: Phone },
    { id: "pharmacy", label: "Pharmacy", icon: Pill },
    { id: "audit", label: "Audit Logs", icon: FileText },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "providers", label: "Providers", icon: UserCheck },
    { id: "access", label: "Access Control", icon: Shield },
    { id: "settings", label: "System Settings", icon: Settings },
    { id: "logout", label: "Logout", icon: LogOut },
  ],
};

const Sidebar = ({
  roleId = 0,chrome
  isMobileOpen,
  onMobileClose,
  onMenuItemClick,
  setIsAuthenticated,
  setUser,
}) => {
  const menuItems = menuConfig[roleId] || [];
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      
      if (token) {
        // Call the logout endpoint
        const response = await fetch("/api/admin/logout", {
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
      localStorage.removeItem("adminToken");
      
      // Reset authentication state (with safety checks)
      if (typeof setIsAuthenticated === 'function') {
        setIsAuthenticated(false);
      }
      if (typeof setUser === 'function') {
        setUser(null);
      }
      
      // Show success message
      toast.success("Logged out successfully");
      
      // Navigate to login screen
      navigate("/admin/login", { replace: true });
      
    } catch (error) {
      console.error("Logout error:", error);
      
      // Still perform local logout even if API call fails
      localStorage.removeItem("adminToken");
      
      // Reset authentication state (with safety checks)
      if (typeof setIsAuthenticated === 'function') {
        setIsAuthenticated(false);
      }
      if (typeof setUser === 'function') {
        setUser(null);
      }
      
      toast.success("Logged out Successfully");
      navigate("/admin/login", { replace: true });
    }
  };

  const handleMenuItemClick = (itemId) => {
    if (itemId === "logout") {
      handleLogout();
    } else {
      onMenuItemClick?.(itemId);
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
        fixed left-0 top-0 h-[100%] w-64 bg-[#E8EDF2]  border-r border-blue-100 z-50 transform transition-transform duration-300 ease-in-out rounded-3xl
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}
      >
        <div className="p-6 text-3xl text-blue-500">
         {setUser.hospital.name}
        </div>

        <nav className="mt-6 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isLogout = item.id === "logout";
            
            return (
              <button
                key={item.id}
                onClick={() => handleMenuItemClick(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-left transition-colors rounded-lg mb-2
                  ${
                    item.active
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