import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Clerk } from '@clerk/clerk-js';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
    const clerk = new Clerk(clerkPubKey);

    // Load Clerk and check user authentication
    const checkAuthStatus = async () => {
      await clerk.load();
      setIsAuthenticated(clerk.user !== null);  // Set authenticated status
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return (<div>Loading...</div>);  // You can display a loader while checking authentication
  }

  // If not authenticated, redirect to sign-in page
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return children;  // Render the children components (Dashboard) if authenticated
};

export default ProtectedRoute;
