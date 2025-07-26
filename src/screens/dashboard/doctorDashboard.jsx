import React, { useState, useEffect } from "react";
import { Menu, Bell, Search, User, Edit2 } from "lucide-react";
import Sidebar from "../../utils/ui/sidebar";

const DoctorDashboard = ({ user, setIsAuthenticated, setUser }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  // Mock data for waiting patients
  const [waitingPatients] = useState([
    {
      patientId: "PA0004",
      name: "Clara Bennett",
      age: 52,
      gender: "Female",
      contact: "07067684532"
    },
    {
      patientId: "PA0005",
      name: "James Anderson",
      age: 24,
      gender: "Male",
      contact: "07067684532"
    },
    {
      patientId: "PA0006",
      name: "Sophie Turner",
      age: 31,
      gender: "Female",
      contact: "07067684532"
    },
    {
      patientId: "PA0008",
      name: "Olivia Martinez",
      age: 50,
      gender: "Female",
      contact: "07067684532"
    },
    {
      patientId: "PA0009",
      name: "Ethan Brown",
      age: 12,
      gender: "Male",
      contact: "07067684532"
    },
    {
      patientId: "PA0010",
      name: "Ava Davis",
      age: 8,
      gender: "Male",
      contact: "07067684532"
    },
    {
      patientId: "PA0011",
      name: "Ava Davis",
      age: 17,
      gender: "Female",
      contact: "07067684532"
    },
    {
      patientId: "PA0012",
      name: "Ava Davis",
      age: 17,
      gender: "Female",
      contact: "07067684532"
    },
    {
      patientId: "PA0013",
      name: "Ava Davis",
      age: 17,
      gender: "Female",
      contact: "07067684532"
    }
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 8;

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setCurrentDate(formattedDate);
  }, []);

  // Calculate pagination
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = waitingPatients.slice(indexOfFirstPatient, indexOfLastPatient);
  const totalPages = Math.ceil(waitingPatients.length / patientsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 text-sm rounded-lg ${
            currentPage === i
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        roleId={user?.roleId || 1} // Doctor roleId is 1
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
        setIsAuthenticated={setIsAuthenticated}
        setUser={setUser}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Doctor Dashboard</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell size={20} className="text-gray-600" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user?.initials || 'SB'}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'Shade Badmus'}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'shade@dovacare.com'}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <div className="p-6 overflow-y-auto h-full">
          {/* Welcome Section */}
          <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Hello Doctor</h2>
                <p className="text-gray-600">Today is {currentDate}</p>
              </div>
            </div>
            
            {/* Key Metrics */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-600 mb-1">Total patient Seen</h4>
                  <p className="text-3xl font-bold text-gray-900">32</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-600 mb-1">Pending Lab Result</h4>
                  <p className="text-3xl font-bold text-gray-900">15</p>
                </div>
              </div>
            </div>
          </div>

          {/* Waiting Patients Table */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Waiting Patients</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                  View All
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentPatients.map((patient, index) => (
                    <tr
                      key={patient.patientId}
                      className={index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                        {patient.patientId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {patient.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {patient.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {patient.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        {patient.contact}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Edit2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {indexOfFirstPatient + 1} to {Math.min(indexOfLastPatient, waitingPatients.length)} of {waitingPatients.length} patients
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ‹
                  </button>
                  
                  {renderPaginationNumbers()}
                  
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ›
                  </button>
                  
                  <span className="text-sm text-gray-700 ml-2">»</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;