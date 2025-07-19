import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Users, UserCheck } from 'lucide-react'
import DashboardLayout from '../layout/dashboardLayout'
import MetricCard from '../../components/dashboard/admin/metricCard'
import ActivityTable from '../../components/dashboard/admin/activityTable'
import SystemStatus from '../../components/dashboard/admin/systemStatus'

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

const Dashboard = ({ user }) => {
  const navigate = useNavigate()

  // Default user if not passed from props
  const currentUser = user || {
    name: 'Shade Badmus',
    email: 'shade@dovacareclinics',
    initials: 'SB'
  }

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
        // Handle logout logic
        localStorage.removeItem('token') // if using localStorage
        navigate('/admin/login')
        break
      default:
        console.log('Unknown menu item:', itemId)
    }
  }

  const handleAddUser = () => {
    // Navigate to add user page or open modal
    navigate('/admin/users/add')
  }

  return (
    <DashboardLayout
      roleId={0}
      user={currentUser}
      title="Hello Admin"
      subtitle="Today is August 15, 2024"
      onMenuItemClick={handleMenuItemClick}
    >
      {/* Header with Add User button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Key Metrics</h2>
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
          title="Recent User Login" 
          value="0"
          icon={UserCheck}
          color="green"
        />
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
          <SystemStatus
            statusItems={systemStatus}
            title="System Status"
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard