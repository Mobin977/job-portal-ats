import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import type { UserRole } from '../@types/auth.js';

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const token = localStorage.getItem('ats_auth_token');
  const userJson = localStorage.getItem('ats_user_profile');

  if (!token || !userJson) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(userJson);
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/login" replace />;
    }
  } catch {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
