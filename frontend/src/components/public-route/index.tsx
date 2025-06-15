import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsAuthenticated } from '../../services/redux/selectors';

interface PublicRouteProps {
  element: React.ReactNode;
  redirectPath?: string;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  element,
  redirectPath = '/dashboard',
}) => {

  const isAuthenticated = useSelector(getIsAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{element}</>;
};
