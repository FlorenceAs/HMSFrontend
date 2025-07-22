import { toast } from 'react-toastify';

/**
 * Check if user is authenticated by validating token
 * @returns {boolean} - true if authenticated, false otherwise
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    return false;
  }

  try {
    // Basic JWT token validation (you might want to decode and check expiry)
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return false;
    }

    // You can add more sophisticated validation here
    // like checking expiry date from the token payload
    
    return true;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

/**
 * Get the stored authentication token
 * @returns {string|null} - token or null if not found
 */
export const getAuthToken = () => {
  return localStorage.getItem('adminToken');
};

/**
 * Clear authentication data from storage
 */
export const clearAuthData = () => {
  localStorage.removeItem('adminToken');
};

/**
 * Logout user by calling API and clearing local data
 * @param {Function} setIsAuthenticated - function to update auth state
 * @param {Function} setUser - function to update user state
 * @param {Function} navigate - React Router navigate function
 */
export const logoutUser = async (setIsAuthenticated, setUser, navigate) => {
  try {
    const token = getAuthToken();
    
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
    clearAuthData();
    
    // Reset authentication state
    if (setIsAuthenticated) setIsAuthenticated(false);
    if (setUser) setUser(null);
    
    // Show success message
    toast.success("Logged out successfully");
    
    // Navigate to login screen
    if (navigate) {
      navigate("/admin/login", { replace: true });
    }
    
  } catch (error) {
    console.error("Logout error:", error);
    
    // Still perform local logout even if API call fails
    clearAuthData();
    if (setIsAuthenticated) setIsAuthenticated(false);
    if (setUser) setUser(null);
    
    toast.info("Logged out locally");
    if (navigate) {
      navigate("/admin/login", { replace: true });
    }
  }
};

/**
 * Add Authorization header to API requests
 * @param {Object} headers - existing headers object
 * @returns {Object} - headers with Authorization added
 */
export const addAuthHeader = (headers = {}) => {
  const token = getAuthToken();
  
  if (token) {
    return {
      ...headers,
      'Authorization': `Bearer ${token}`
    };
  }
  
  return headers;
};

/**
 * Handle API response errors, including unauthorized responses
 * @param {Response} response - fetch response object
 * @param {Function} setIsAuthenticated - function to update auth state  
 * @param {Function} setUser - function to update user state
 * @param {Function} navigate - React Router navigate function
 */
export const handleApiError = async (response, setIsAuthenticated, setUser, navigate) => {
  if (response.status === 401) {
    // Unauthorized - token might be expired or invalid
    toast.error("Session expired. Please login again.");
    await logoutUser(setIsAuthenticated, setUser, navigate);
    return;
  }
  
  // Handle other errors as needed
  const errorData = await response.json().catch(() => ({}));
  const errorMessage = errorData.message || 'An error occurred';
  
  toast.error(errorMessage);
  
  return errorData;
};