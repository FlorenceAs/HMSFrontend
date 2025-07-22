import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Building2, User, Mail, CheckCircle, Shield, Users, Star, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';

const HospitalOnboardingForm = ({ setIsAuthenticated, setUser }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [slideDirection, setSlideDirection] = useState('');

  // API base URL
  const API_BASE_URL = 'http://localhost:5000';

  const [hospitalData, setHospitalData] = useState({
    name: '',
    registrationNumber: '',
    licenseNumber: '',
    hospitalNumber: '',
    email: ''
  });

  const [adminData, setAdminData] = useState({
    fullName: '',
    jobTitle: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [verificationData, setVerificationData] = useState({
    token: '',
    isVerified: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const steps = [
    { number: 1, title: 'Hospital Details', icon: <Building2 className="w-4 h-4" /> },
    { number: 2, title: 'Admin Account', icon: <User className="w-4 h-4" /> },
    { number: 3, title: 'Email Verification', icon: <Mail className="w-4 h-4" /> },
    { number: 4, title: 'Welcome', icon: <CheckCircle className="w-4 h-4" /> }
  ];

  const handleStepChange = (newStep, direction = 'forward') => {
    setSlideDirection(direction);
    setTimeout(() => {
      setCurrentStep(newStep);
      setSlideDirection('');
    }, 150);
  };

  const handleHospitalSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate hospital data
    if (!hospitalData.name || !hospitalData.email || !hospitalData.licenseNumber || !hospitalData.registrationNumber || !hospitalData.hospitalNumber) {
      toast.error('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call - keeping your original approach
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Hospital details saved!');
      handleStepChange(2, 'forward');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate admin data
    if (!adminData.fullName || !adminData.jobTitle || !adminData.email || !adminData.password) {
      toast.error('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    if (adminData.password !== adminData.confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (adminData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      // Real API call to register hospital and send verification email
      const response = await fetch(`${API_BASE_URL}/api/hospital/register-with-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hospitalData,
          adminData
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Verification code sent to your email!');
        handleStepChange(3, 'forward');
      } else {
        // Handle specific error cases
        if (data.error === 'Hospital already exists') {
          toast.error('A hospital with this information already exists');
        } else if (data.error === 'Admin email already exists') {
          toast.error('An admin with this email already exists');
        } else if (data.error === 'Validation failed') {
          toast.error('Please check your input and try again');
        } else if (data.error === 'Email service unavailable') {
          toast.error('Unable to send verification email. Please try again later.');
        } else {
          toast.error(data.message || data.error || 'Registration failed');
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.name === 'TypeError') {
        toast.error('Network error. Please check your connection and ensure the backend is running.');
      } else {
        toast.error('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!verificationData.token || verificationData.token.length !== 6) {
      toast.error('Please enter a valid 6-digit verification code');
      setIsLoading(false);
      return;
    }

    try {
      // Real API call to verify email
      const response = await fetch(`${API_BASE_URL}/api/hospital/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: adminData.email,
          token: verificationData.token
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user data
        localStorage.setItem('adminToken', data.token);
        
        setUser({
          id: data.admin.id,
          name: data.admin.name,
          email: data.admin.email,
          initials: data.admin.name.split(' ').map(n => n[0]).join('').toUpperCase(),
          role: 'admin',
          jobTitle: data.admin.jobTitle,
          hospital: data.hospital
        });

        setVerificationData({ ...verificationData, isVerified: true });
        toast.success('Email verified successfully!');
        handleStepChange(4, 'forward');
      } else {
        // Handle specific error cases
        if (data.error === 'Token already used') {
          toast.error('This verification code has already been used');
        } else if (data.error === 'Token expired') {
          toast.error('Verification code has expired. Please request a new one');
        } else if (data.error === 'Invalid token') {
          toast.error('Invalid verification code. Please try again');
        } else if (data.error === 'Too many attempts') {
          toast.error('Too many verification attempts. Please request a new code');
        } else {
          toast.error(data.message || data.error || 'Verification failed');
        }
      }
    } catch (error) {
      console.error('Verification error:', error);
      if (error.name === 'TypeError') {
        toast.error('Network error. Please check your connection and ensure the backend is running.');
      } else {
        toast.error('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/hospital/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: adminData.email
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Verification code resent to your email!');
        // Clear the current token
        setVerificationData({ ...verificationData, token: '' });
      } else {
        toast.error(data.message || data.error || 'Failed to resend code');
      }
    } catch (error) {
      console.error('Resend error:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const handleAccessDashboard = () => {
    setIsAuthenticated(true);
    toast.success('Welcome to HMS!');
  };

  const prevStep = () => {
    if (currentStep > 1) {
      handleStepChange(currentStep - 1, 'backward');
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-lg shadow-2xl shadow-gray-500/50 min-h-[600px]">
      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">
            Step {currentStep} of 4
          </div>
          <div className="text-sm font-medium text-blue-600">
            Hospital Registration
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center space-x-2 ${
                step.number <= currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                  step.number < currentStep 
                    ? 'bg-blue-600 border-blue-600 text-white transform scale-110'
                    : step.number === currentStep
                    ? 'border-blue-600 text-blue-600 bg-blue-50 transform scale-110 shadow-lg'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {step.number < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    step.icon
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-1 mx-2 rounded transition-all duration-700 ${
                  step.number < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content with Smooth Transitions */}
      <div className="flex-1 flex items-center justify-center p-6 relative overflow-hidden">
        <div className={`w-full max-w-md transition-all duration-500 ease-in-out transform ${
          slideDirection === 'forward' ? 'translate-x-full opacity-0' : 
          slideDirection === 'backward' ? '-translate-x-full opacity-0' : 
          'translate-x-0 opacity-100'
        }`}>
          
          {/* Step 1: Hospital Details */}
          {currentStep === 1 && (
            <div className="space-y-6" style={{ animation: 'fadeIn 0.6s ease-out forwards' }}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl transform rotate-3">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Hospital Information</h2>
                <p className="text-gray-600">Tell us about your healthcare facility</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hospital Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={hospitalData.name}
                    onChange={(e) => setHospitalData({...hospitalData, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter hospital name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Official Registration Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={hospitalData.registrationNumber}
                    onChange={(e) => setHospitalData({...hospitalData, registrationNumber: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="REG123456"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      License Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={hospitalData.licenseNumber}
                      onChange={(e) => setHospitalData({...hospitalData, licenseNumber: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="LIC123456"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hospital Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={hospitalData.hospitalNumber}
                      onChange={(e) => setHospitalData({...hospitalData, hospitalNumber: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="HSP123456"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Official Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={hospitalData.email}
                    onChange={(e) => setHospitalData({...hospitalData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="hospital@example.com"
                  />
                </div>
              </div>

              <button
                onClick={handleHospitalSubmit}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Continue</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Step 2: Admin Account */}
          {currentStep === 2 && (
            <div className="space-y-6" style={{ animation: 'fadeIn 0.6s ease-out forwards' }}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl transform -rotate-3">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Admin Account</h2>
                <p className="text-gray-600">Create your administrator account</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin's Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={adminData.fullName}
                    onChange={(e) => setAdminData({...adminData, fullName: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={adminData.jobTitle}
                    onChange={(e) => setAdminData({...adminData, jobTitle: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Hospital Administrator"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={adminData.email}
                    onChange={(e) => setAdminData({...adminData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="admin@hospital.com"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    We'll send a verification code to this email
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={adminData.password}
                      onChange={(e) => setAdminData({...adminData, password: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={adminData.confirmPassword}
                      onChange={(e) => setAdminData({...adminData, confirmPassword: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleAdminSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Code</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Email Verification */}
          {currentStep === 3 && (
            <div className="space-y-6" style={{ animation: 'fadeIn 0.6s ease-out forwards' }}>
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl transform rotate-3">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Email Verification</h2>
                <p className="text-gray-600 mb-4">
                  We've sent a 6-digit code to
                </p>
                <p className="text-blue-600 font-semibold text-lg">{adminData.email}</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                    Enter Verification Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength="6"
                    value={verificationData.token}
                    onChange={(e) => setVerificationData({...verificationData, token: e.target.value.replace(/\D/g, '')})}
                    className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-center text-3xl font-mono tracking-widest bg-gray-50"
                    placeholder="123456"
                  />
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Didn't receive the code? 
                    <button 
                      type="button" 
                      className="text-blue-600 hover:underline ml-1 font-medium"
                      onClick={handleResendCode}
                    >
                      Resend
                    </button>
                  </p>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>

                <button
                  onClick={handleVerificationSubmit}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Verify</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Welcome & Terms */}
          {currentStep === 4 && (
            <div className="space-y-6" style={{ animation: 'fadeIn 0.6s ease-out forwards' }}>
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to HMS!</h2>
                <p className="text-gray-600 mb-4">
                  Your hospital has been successfully registered
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Hospital ID:</span>
                    <span className="font-mono font-semibold text-green-700">HOSP0001</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-8 max-h-32 overflow-y-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Terms & Conditions</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>1. Data Security:</strong> HIPAA compliant security measures.</p>
                  <p><strong>2. System Usage:</strong> For legitimate healthcare operations only.</p>
                  <p><strong>3. Support:</strong> 24/7 technical support available.</p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>HIPAA Compliant & Secure</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span>Multi-Role User Management</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>24/7 Premium Support</span>
                </div>
              </div>

              <button
                onClick={handleAccessDashboard}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Access Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                You can now start managing your hospital operations
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default HospitalOnboardingForm;