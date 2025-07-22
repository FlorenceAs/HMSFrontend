import React, { useState } from "react";
import { toast } from "react-toastify";
import AdminLoginForm from "../../../components/auth/admin/adminLoginForm";
import loginImage from "../../../assets/login-image.svg";
import whitelogo from "../../../assets/d-logo-white.svg";
import coloredlogo from "../../../assets/colored-logo.svg";

const AdminLoginScreen = ({ setIsAuthenticated, setUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (formData) => {
    setIsLoading(true);

    try {
      // Determine the API URL
      const apiUrl = getEnvVar('API_URL') || 'http://localhost:5000';
      const loginEndpoint = `${apiUrl}/api/admin/login`;

      console.log('Attempting login to:', loginEndpoint);

      const response = await fetch(loginEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      // Check if response has content
      const contentType = response.headers.get("content-type");
      let data = {};

      if (contentType && contentType.includes("application/json")) {
        try {
          data = await response.json();
        } catch (jsonError) {
          console.error("JSON parsing error:", jsonError);
          throw new Error("Invalid response from server");
        }
      } else {
        // If no JSON content, get text response for debugging
        const textResponse = await response.text();
        console.error("Non-JSON response:", textResponse);
        throw new Error("Server returned invalid response format");
      }

      if (!response.ok) {
        // Handle different error status codes
        if (response.status === 423) {
          throw new Error(data.message || "Account is locked");
        } else if (response.status === 401) {
          if (data.error === "Account inactive") {
            throw new Error("Your account has been deactivated. Contact support.");
          } else if (data.error === "Email not verified") {
            throw new Error("Please verify your email address before logging in.");
          } else if (data.error === "Hospital inactive") {
            throw new Error("Hospital account is not active. Contact support.");
          } else {
            throw new Error(data.message || "Invalid email or password");
          }
        } else if (response.status === 400) {
          throw new Error(data.message || "Please check your input and try again");
        } else if (response.status === 404) {
          throw new Error("Login service not available. Please check server configuration.");
        } else if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        } else {
          throw new Error(data.message || "Login failed");
        }
      }

      // Validate response data
      if (!data.token || !data.user) {
        throw new Error("Invalid login response from server");
      }

      // Store token in localStorage
      localStorage.setItem("adminToken", data.token);

      // Update authentication state with the complete user data from backend
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        initials: data.user.initials,
        role: data.user.role,
        jobTitle: data.user.jobTitle,
        lastLoginAt: data.user.lastLoginAt,
        hospital: data.user.hospital
      });

      setIsAuthenticated(true);

      // Show success toast
      toast.success(`Welcome back, ${data.user.name}!`);
      
    } catch (error) {
      console.error("Login error:", error);

      // Handle specific error messages
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        toast.error("Unable to connect to server. Please check if the server is running.");
      } else if (error.message.includes("Account is locked") || error.message.includes("locked")) {
        toast.error(error.message);
      } else if (error.message.includes("Invalid email or password")) {
        toast.error("Invalid email or password. Please try again.");
      } else if (error.message.includes("deactivated")) {
        toast.error("Your account has been deactivated. Please contact support.");
      } else if (error.message.includes("verify your email")) {
        toast.error("Please verify your email address before logging in.");
      } else if (error.message.includes("Hospital account")) {
        toast.error("Hospital account is not active. Please contact support.");
      } else if (error.message.includes("Login service not available")) {
        toast.error("Login service is not available. Please contact support.");
      } else if (error.message.includes("Server error")) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(error.message || "Login failed. Please try again.");
      }

      throw error; // Re-throw to be handled by the form
    } finally {
      setIsLoading(false);
    }
  };

  // Mock login function for testing when backend is not available
  const handleMockLogin = async (formData) => {
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock validation
      if (
        formData.email === "admin@dovacare.com" &&
        formData.password === "admin123"
      ) {
        const mockUser = {
          id: 1,
          name: "Shade Badmus",
          email: "admin@dovacare.com",
          initials: "SB",
          role: "admin",
          jobTitle: "System Administrator",
          hospital: {
            id: 1,
            hospitalId: "HSP001",
            name: "General Hospital",
            status: "active",
            setupStatus: "completed"
          }
        };

        localStorage.setItem("adminToken", "mock-jwt-token");
        setUser(mockUser);
        setIsAuthenticated(true);
        toast.success(`Welcome back, ${mockUser.name}! (Mock Login)`);
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Get environment variables (works for both Vite and Create React App)
  const getEnvVar = (name) => {
    // Try Vite format first
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env[`VITE_${name}`];
    }
    // Fallback to Create React App format
    if (typeof window !== 'undefined' && window.process && window.process.env) {
      return window.process.env[`REACT_APP_${name}`];
    }
    return undefined;
  };

  const isDevelopment = () => {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return import.meta.env.MODE === 'development';
    }
    if (typeof window !== 'undefined' && window.process && window.process.env) {
      return window.process.env.NODE_ENV === 'development';
    }
    return false;
  };

  // Use mock login if in development mode and USE_MOCK_LOGIN is true
  const shouldUseMockLogin = isDevelopment() && getEnvVar('USE_MOCK_LOGIN') === 'true';

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-purple-100 to-blue-100 flex overflow-hidden">
      {/* Left Side - Image Section */}
      <div className="flex-1 relative overflow-hidden hidden md:flex">
        {/* Logo */}
        <div className="absolute top-6 left-6 z-10">
          <img src={whitelogo} alt="Dovacare Logo" />
        </div>

        {/* Image */}
        <img
          src={loginImage}
          alt="Healthcare professionals"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-4 md:p-8 min-h-screen relative">
        {/* Mobile Logo */}
        <div className="absolute top-6 left-6 md:hidden">
          <img src={coloredlogo} alt="Dovacare Logo" />
        </div>

        {/* Development Mode Indicator */}
        {shouldUseMockLogin && (
          <div className="absolute top-6 right-6 bg-yellow-100 border border-yellow-400 text-yellow-800 px-3 py-2 rounded-lg text-sm">
            Mock Login Mode
          </div>
        )}

        {/* Login Form Container */}
        <div className="w-full max-w-lg">
          <AdminLoginForm 
            onSubmit={shouldUseMockLogin ? handleMockLogin : handleLogin} 
            isLoading={isLoading} 
          />
          
          {/* Development Help */}
          {/* {isDevelopment() && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
              <h3 className="font-medium text-gray-900 mb-2">Development Info:</h3>
              <p>API URL: {getEnvVar('API_URL') || 'http://localhost:5000'}</p>
              <p>Mock Login: {shouldUseMockLogin ? 'Enabled' : 'Disabled'}</p>
              {shouldUseMockLogin && (
                <p className="mt-2 text-blue-600">
                  Test credentials: admin@dovacare.com / admin123
                </p>
              )}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default AdminLoginScreen;