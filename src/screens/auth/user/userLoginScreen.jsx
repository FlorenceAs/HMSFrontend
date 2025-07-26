import React, { useState } from "react";
import { toast } from "react-toastify";
import UserLoginForm from "../../../components/auth/user/userLoginForm";
import loginImage from "../../../assets/login-image.svg";
import whitelogo from "../../../assets/d-logo-white.svg";
import coloredlogo from "../../../assets/colored-logo.svg";

const UserLoginScreen = ({ setIsAuthenticated, setUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (formData) => {
    setIsLoading(true);

    try {
      // Determine the API URL
      const apiUrl = getEnvVar('API_URL') || 'http://localhost:5000';
      const loginEndpoint = `${apiUrl}/api/auth/login`; // Using your existing endpoint

      console.log('Attempting user login to:', loginEndpoint);

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
        // Handle different error status codes based on your API
        if (response.status === 423) {
          throw new Error(data.message || "Account is locked");
        } else if (response.status === 401) {
          if (data.error === "Account disabled") {
            throw new Error("Your account has been disabled. Contact your administrator.");
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

      // Validate response data - your API returns data in nested structure
      if (!data.data || !data.data.token || !data.data.user) {
        throw new Error("Invalid login response from server");
      }

      // Store token in localStorage
      localStorage.setItem("userToken", data.data.token);

      // Transform your API response to match the expected structure
      const userData = {
        id: data.data.user.id,
        firstName: data.data.user.firstName,
        lastName: data.data.user.lastName,
        name: data.data.user.fullName || `${data.data.user.firstName} ${data.data.user.lastName}`,
        email: data.data.user.email,
        initials: `${data.data.user.firstName.charAt(0)}${data.data.user.lastName.charAt(0)}`.toUpperCase(),
        role: data.data.user.role,
        roleId: data.data.user.roleId,
        employeeId: data.data.user.employeeId,
        department: data.data.user.department,
        specialization: data.data.user.specialization,
        phone: data.data.user.phone,
        permissions: data.data.user.permissions,
        lastLogin: data.data.user.lastLogin,
        profilePicture: data.data.user.profilePicture,
        hospital: {
          id: data.data.hospital.id,
          hospitalId: data.data.hospital.hospitalId,
          name: data.data.hospital.name,
          status: data.data.hospital.status
        }
      };

      setUser(userData);
      setIsAuthenticated(true);

      // Show success toast
      toast.success(`Welcome back, ${userData.name}!`);
      
    } catch (error) {
      console.error("User login error:", error);

      // Handle specific error messages
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        toast.error("Unable to connect to server. Please check if the server is running.");
      } else if (error.message.includes("Account is locked") || error.message.includes("locked")) {
        toast.error(error.message);
      } else if (error.message.includes("Invalid email or password")) {
        toast.error("Invalid email or password. Please try again.");
      } else if (error.message.includes("disabled")) {
        toast.error("Your account has been disabled. Please contact your administrator.");
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

      // Mock validation - using the example user data you provided
      if (
        formData.email === "jamesasuelimen77@gmail.com" &&
        formData.password === "sAi#Jj!%dI9B" // temporary password from your example
      ) {
        const mockUser = {
          id: "68824c4a7dedd89b47860fb2",
          firstName: "james",
          lastName: "james",
          name: "james james",
          email: "jamesasuelimen77@gmail.com",
          initials: "JJ",
          role: "doctor",
          roleId: 1,
          employeeId: "DR0001",
          department: null,
          specialization: null,
          phone: null,
          permissions: [],
          hospital: {
            id: "68824a1208d3eadd32086a18",
            hospitalId: "HSP001",
            name: "kingscare",
            status: "active"
          }
        };

        localStorage.setItem("userToken", "mock-user-jwt-token");
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
          <UserLoginForm 
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
                  Test credentials: jamesasuelimen77@gmail.com / sAi#Jj!%dI9B
                </p>
              )}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default UserLoginScreen;