import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Atom } from 'react-loading-indicators';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireApproval?: boolean;
}

/**
 * ProtectedRoute Component
 * 
 * Protects routes based on authentication and authorization status:
 * - Redirects to /login if user is not authenticated
 * - Redirects to /approval-pending if user is pending approval
 * - Redirects to /access-denied if user is rejected
 * - Allows access if user is approved
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireApproval = true 
}) => {
  const { currentUser, userProfile, loading } = useAuth();

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Atom color="#0d9488" size="medium" text="" textColor="#0d9488" />
      </div>
    );
  }

  // Not logged in - redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If we require approval checks
  if (requireApproval && userProfile) {
    // User is pending approval
    if (userProfile.status === 'pending') {
      return <Navigate to="/approval-pending" replace />;
    }

    // User is rejected
    if (userProfile.status === 'rejected') {
      return <Navigate to="/access-denied" replace />;
    }
  }

  // User is authenticated and approved (or approval not required)
  return <>{children}</>;
};

export default ProtectedRoute;
