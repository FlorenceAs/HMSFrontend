import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { X, Users, UserCheck, UserPlus, BarChart3, Building2, Settings } from 'lucide-react'
import DashboardLayout from '../layout/dashboardLayout'
import MetricCard from '../../components/dashboard/admin/metricCard'
import ActivityTable from '../../components/dashboard/admin/activityTable'
import SystemStatus from '../../components/dashboard/admin/patientStatusChart'
import PatientStatusChart from '../../components/dashboard/admin/patientStatusChart'

// Sample data
const recentActivities = [
  { id: 1, name: 'Shade Badmus', email: 'shade@dovacareclinics', action: 'New Patient Registration', time: '1 hour ago', initials: 'SB' },
  { id: 2, name: 'Rita Barnes', email: 'rita@dovacareclinics', action: 'New Patient Registration', time: '30 minutes ago', initials: 'RB' },
  { id: 3, name: 'Milo Martin', email: 'milo@dovacareclinics', action: 'Payment Made', time: '5 minutes ago', initials: 'MM' },
  { id: 4, name: 'Jessica Pierce', email: 'jessica@dovacareclinics', action: 'Lab Test Results', time: 'Just now', initials: 'JP' },
  { id: 5, name: 'Tommy Alvarez', email: 'tommy@dovacareclinics', action: 'Medication Prescription', time: 'Yesterday', initials: 'TA' },
  { id: 6, name: 'Laura Kline', email: 'laura@dovacareclinics', action: 'Payment Made', time: 'Last week', initials: 'LK' },
  { id: 7, name: 'Greg Daniels', email: 'greg@dovacareclinics', action: 'Health Assessment', time: 'Last month', initials: 'GD' },
  { id: 8, name: 'Hannah Smith', email: 'hannah@dovacareclinics', action: 'Insurance Verification', time: '2 days ago', initials: 'HS' },
  { id: 9, name: 'Carlos Nunez', email: 'carlos@dovacareclinics', action: 'Payment Made', time: 'A year ago', initials: 'CN' }
]

const systemStatus = [
  { label: 'System Health', status: 'healthy', message: 'No errors detected' },
  { label: 'Database Status', status: 'healthy', message: 'All systems operational' },
  { label: 'Server Load Status', status: 'warning', message: 'High' },
  { label: 'Last Backup', status: 'healthy', message: 'Successful on 2023-10-01' },
  { label: 'System Performance', status: 'healthy', message: 'Running optimally' },
  { label: 'User Access', status: 'healthy', message: 'No issues detected' },
  { label: 'User Access', status: 'healthy', message: 'No issues detected' },
  { label: 'User Access', status: 'healthy', message: 'No issues detected' },
  { label: 'System Performance', status: 'healthy', message: 'Running optimally' }
]

const Dashboard = ({ user, setIsAuthenticated, setUser }) => {
  const navigate = useNavigate()
  const [showProfilePopup, setShowProfilePopup] = useState(false)

  // Default user if not passed from props
  const currentUser = user || {
    name: 'Shade Badmus',
    email: 'shade@dovacareclinics',
    initials: 'SB'
  }

  // Show popup after dashboard loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowProfilePopup(true)
    }, 1000) // Show popup 1 second after component mounts

    return () => clearTimeout(timer)
  }, [])

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
      
      // Reset authentication state
      if (setIsAuthenticated) setIsAuthenticated(false);
      if (setUser) setUser(null);
      
      // Show success message
      toast.success("Logged out successfully");
      
      // Navigate to login screen
      navigate("/admin/login", { replace: true });
      
    } catch (error) {
      console.error("Logout error:", error);
      
      // Still perform local logout even if API call fails
      localStorage.removeItem("adminToken");
      if (setIsAuthenticated) setIsAuthenticated(false);
      if (setUser) setUser(null);
      
      toast.success("Logged out Successfully");
      navigate("/admin/login", { replace: true });
    }
  };

  const handleMenuItemClick = (itemId) => {
    console.log('Menu item clicked:', itemId)
    
    // Handle navigation based on menu item
    switch (itemId) {
      case 'dashboard':
        navigate('/admin/dashboard')
        break
      case 'user':
        navigate('/admin/users')
        break
      case 'patients':
        navigate('/admin/patients')
        break
      case 'laboratory':
        navigate('/admin/laboratory')
        break
      case 'reception':
        navigate('/admin/reception')
        break
      case 'pharmacy':
        navigate('/admin/pharmacy')
        break
      case 'audit':
        navigate('/admin/audit-logs')
        break
      case 'billing':
        navigate('/admin/billing')
        break
      case 'providers':
        navigate('/admin/providers')
        break
      case 'access':
        navigate('/admin/access-control')
        break
      case 'settings':
        navigate('/admin/settings')
        break
      case 'logout':
        // Handle logout with proper API call and state management
        handleLogout()
        break
      default:
        console.log('Unknown menu item:', itemId)
    }
  }

  const handleAddUser = () => {
    // Navigate to add user page or open modal
    navigate('/admin/users/add')
  }

  const handleGoToProfile = () => {
    // TODO: Navigate to profile page when implemented
    console.log('Go to profile clicked')
    setShowProfilePopup(false)
  }

  const handleNotNow = () => {
    setShowProfilePopup(false)
  }

  // Format current date
  const getCurrentDate = () => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  }

  return (
    <DashboardLayout
      roleId={0}
      user={currentUser}
      title={`Hello ${currentUser.name}`}
      subtitle={`Today is ${getCurrentDate()}`}
      onMenuItemClick={handleMenuItemClick}
      setIsAuthenticated={setIsAuthenticated}
      setUser={setUser}
    >
      {/* Profile Completion Banner */}
      {showProfilePopup && (
        <div className="mb-6 animate-slideDown">
          <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Complete Your Profile
                </h3>
                <p className="text-sm text-gray-600">
                  Please provide additional information to complete your account setup
                </p>
              </div>
              <div className="flex items-center gap-4 ml-6">
                <div className="relative w-12 h-12">
                  <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                    {/* Background circle */}
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    {/* Progress circle */}
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                      strokeDasharray="35, 100"
                      className="progress-circle"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">35%</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleGoToProfile}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Go to Profile
                  </button>
                  <button
                    onClick={handleNotNow}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Not Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header with Add User button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Key Metrics</h2>
          {currentUser.hospital && (
            <p className="text-sm text-gray-600 mt-1">
              {currentUser.hospital.name} - {currentUser.hospital.status}
            </p>
          )}
        </div>
        <button 
          onClick={handleAddUser}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Add User
        </button>
      </div>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        <MetricCard
          title="Total Users" 
          value="0" 
          icon={Users}
          color="blue"
        />
        <MetricCard 
          title="Total Patients" 
          value="0"
          icon={UserCheck}
          color="green"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                <UserPlus className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Add New User</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">View Reports</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                <Building2 className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Manage Departments</span>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-gray-200 transition-colors">
                <Settings className="w-6 h-6 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">System Settings</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ActivityTable 
            activities={recentActivities}
            title="Recent Activities"
          />
        </div>
        <div className="xl:col-span-1">
          <PatientStatusChart />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
      `}</style>
    </DashboardLayout>
  )
}

export default Dashboard