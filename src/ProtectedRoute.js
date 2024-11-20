import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserAuth } from './UserAuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, role } = useUserAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export const AccountantRoute = ({ children }) => {
  return <ProtectedRoute requiredRole="accountant">{children}</ProtectedRoute>;
};

export const UserRoute = ({ children }) => {
  return <ProtectedRoute requiredRole="user">{children}</ProtectedRoute>;
};

export const AdminRoute = ({ children }) => {
  return <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>;
};

export default ProtectedRoute;
