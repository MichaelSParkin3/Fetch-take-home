import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.js';

const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.session.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;