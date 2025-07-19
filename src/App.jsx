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
import AdminLoginScreen from "./screens/auth/admin/adminLoginScreen";
import Dashboard from "./screens/dashboard/dashboard";
import ProtectedRoute from "./components/dashboard/protectedRoutes";
import LandingPage from "./screens/landingPage";

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

          {/* Onboarding/Registration Route */}
          <Route
            path="/onboarding"
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

          {/* Admin Login (redirect from old route) */}
          <Route
            path="/admin/login"
            element={<Navigate to="/onboarding" replace />}
          />

          {/* Dashboard */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute
                isAuthenticated={isAuthenticated}
                devMode={DEV_MODE}
              >
                <Dashboard user={user} />
              </ProtectedRoute>
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

        {/* Development Mode Indicator */}
        {DEV_MODE && (
          <div className="fixed bottom-4 left-4 bg-yellow-500 text-white px-3 py-2 rounded-lg text-sm font-medium z-50 shadow-lg">
            🚧 Development Mode - Auth Disabled
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;