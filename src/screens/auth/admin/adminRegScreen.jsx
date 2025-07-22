import React, { useState } from "react";
import { toast } from "react-toastify";
import AdminLoginForm from "../../../components/auth/admin/hospitalOnboardingForm";
import loginImage from "../../../assets/login-image.svg";
import whitelogo from "../../../assets/d-logo-white.svg";
import coloredlogo from "../../../assets/colored-logo.svg";
import HospitalOnboardingScreen from "../../../components/auth/admin/hospitalOnboardingForm";
import HospitalOnboardingForm from "../../../components/auth/admin/hospitalOnboardingForm";

const AdminRegScreen = ({ setIsAuthenticated, setUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (formData) => {
    setIsLoading(true);

    try {
      // Replace this with your actual API call
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token in localStorage or secure storage
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
      }

      // Update authentication state
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        initials: data.user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase(),
        role: data.user.role,
      });

      setIsAuthenticated(true);

      // Show success toast
      toast.success(`Welcome back, ${data.user.name}!`);
    } catch (error) {
      console.error("Login error:", error);

      // Handle specific error cases
      if (error.message.includes("Invalid credentials")) {
        toast.error("Invalid email or password. Please try again.");
      } else if (error.message.includes("Account locked")) {
        toast.error("Your account has been locked. Please contact support.");
      } else if (error.message.includes("Network")) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error(error.message || "Login failed. Please try again.");
      }

      throw error; // Re-throw to be handled by the form
    } finally {
      setIsLoading(false);
    }
  };

  // Mock login function for testing (remove when you have real API)
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
        };

        localStorage.setItem("adminToken", "mock-jwt-token");
        setUser(mockUser);
        setIsAuthenticated(true);
        toast.success(`Welcome back, ${mockUser.name}!`);
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

        {/* Login Form Container */}
        <div className="w-full max-w-lg">
          <HospitalOnboardingForm
            setIsAuthenticated={setIsAuthenticated}
            setUser={setUser}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminRegScreen;
