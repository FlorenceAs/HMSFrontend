import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./screens/dashboard/dashboard";
import UserPage from "./screens/dashboard/userPage"; 
import ProtectedRoute from "./components/dashboard/protectedRoutes";
import LandingPage from "./screens/landingPage";
import AdminRegScreen from "./screens/auth/admin/adminRegScreen";
import AdminLoginScreen from "./screens/auth/admin/adminLoginScreen";
import UserLoginScreen from "./screens/auth/user/userLoginScreen"; // Import the user login screen
import DoctorDashboard from "./screens/dashboard/doctorDashboard";

const DEV_MODE = false; // Set to false to enable proper flow

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(DEV_MODE);
  const [user, setUser] = useState(
    DEV_MODE
      ? {
          id: 1,
          name: "Development User",
          email: "dev@dovacare.com",
          initials: "DU",
          role: "admin",
          hospital: {
            name: "dovacare"
          }
        }
      : null
  );

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing Page - Main entry point */}
          <Route
            path="/"
            element={<LandingPage />}
          />

          {/* Admin Login Route */}
          <Route
            path="/admin/login"
            element={
              isAuthenticated ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <AdminLoginScreen
                  setIsAuthenticated={setIsAuthenticated}
                  setUser={setUser}
                />
              )
            }
          />

          {/* User Login Route */}
          <Route
            path="/user/login"
            element={
              isAuthenticated ? (
                // Redirect based on user role after authentication
                user?.role === "admin" ? (
                  <Navigate to="/admin/dashboard" replace />
                ) : (
                  <Navigate to="/user/dashboard" replace />
                )
              ) : (
                <UserLoginScreen
                  setIsAuthenticated={setIsAuthenticated}
                  setUser={setUser}
                />
              )
            }
          />

          {/* Onboarding/Registration Route */}
          <Route
            path="/onboarding"
            element={
              isAuthenticated ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <AdminRegScreen
                  setIsAuthenticated={setIsAuthenticated}
                  setUser={setUser}
                />
              )
            }
          />

          {/* Admin Dashboard - Protected Route */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                devMode={DEV_MODE}
              >
                <Dashboard
                  user={user}
                  setIsAuthenticated={setIsAuthenticated}
                  setUser={setUser}
                />
              </ProtectedRoute>
            }
          />

          {/* Admin Users Page - Protected Route */}
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                devMode={DEV_MODE}
              >
                <UserPage
                  user={user}
                  setIsAuthenticated={setIsAuthenticated}
                  setUser={setUser}
                />
              </ProtectedRoute>
            }
          />

          {/* User Dashboard - Protected Route (placeholder for now) */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                devMode={DEV_MODE}
              >
               
                <DoctorDashboard/>
              </ProtectedRoute>
            }
          />

          {/* Redirect /admin to dashboard if authenticated, otherwise to login */}
          <Route
            path="/admin"
            element={
              isAuthenticated ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <Navigate to="/admin/login" replace />
              )
            }
          />

          {/* Redirect /user to appropriate page based on authentication */}
          <Route
            path="/user"
            element={
              isAuthenticated ? (
                <Navigate to="/user/dashboard" replace />
              ) : (
                <Navigate to="/user/login" replace />
              )
            }
          />

          {/* Catch all - redirect to landing page */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;