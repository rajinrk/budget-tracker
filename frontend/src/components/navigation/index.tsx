import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { getIsAuthenticated } from '../../services/redux/selectors';
import { PublicRoute } from '../public-route';
import { Login, Register } from '../../pages';

import { Header } from '../header';
import { ProtectedRoute } from '../protected-route';
import Dashboard from '../../pages/dashboard';
import SettingsPage from '../../pages/settings';
import ReportsPage from '../../pages/reports';

// Main Navigation Component
export const RootNavigation: React.FC = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);


  return (
    <BrowserRouter>
      <Box className="min-h-screen flex flex-col">
        <Header isAuthenticated={isAuthenticated} />

        <Box className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <PublicRoute
                  element={<Navigate to="/login" replace />}
                />
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute
                  element={<Login />}
                />
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute
                  element={<Register />}
                />
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute element={<Dashboard />} />
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute element={<SettingsPage />} />
              }
            />

            <Route
              path="/reports"
              element={
                <ProtectedRoute element={<ReportsPage />} />
              }
            />

            {/* 404 Route */}
            <Route
              path="*"
              element={
                <Box className="flex items-center justify-center min-h-[400px]">
                  <Typography variant="h4">404 - Page Not Found</Typography>
                </Box>
              }
            />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
};
