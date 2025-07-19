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

import logoimg from "../../assets/colored-logo.svg";

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
  roleId = 0,
  isMobileOpen,
  onMobileClose,
  onMenuItemClick,
}) => {
  const menuItems = menuConfig[roleId] || [];

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
        fixed left-0 top-0 h-[96%] w-64 bg-[#E8EDF2] m-4 border-r border-blue-100 z-50 transform transition-transform duration-300 ease-in-out rounded-3xl
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}
      >
        <div className="p-6 border-b border-blue-100">
          <img src={logoimg} alt="" />
        </div>

        <nav className="mt-6 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onMenuItemClick?.(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-left transition-colors rounded-lg mb-2
                  ${
                    item.active
                      ? "bg-[#D1E5F8] text-[#0066CC] shadow-sm"
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
