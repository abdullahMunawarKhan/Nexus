import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import { Web3Provider } from './lib/web3';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Routes
import ProtectedRoute from './routes/ProtectedRoute';
import RoleBasedRoute from './routes/RoleBasedRoute';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DonorDashboard from './pages/DonorDashboard';
import NgoDashboard from './pages/NgoDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CampaignDetails from './pages/CampaignDetails';
import Transparency from './pages/Transparency';

function App() {
  return (
    <Web3Provider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/campaign/:id" element={<CampaignDetails />} />
              <Route path="/transparency" element={<Transparency />} />
            </Route>

            {/* Protected Role-Based Routes */}
            <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
              <Route 
                path="/donor-dashboard" 
                element={
                  <RoleBasedRoute allowedRoles={['donor']}>
                    <DonorDashboard />
                  </RoleBasedRoute>
                } 
              />
              <Route 
                path="/ngo-dashboard" 
                element={
                  <RoleBasedRoute allowedRoles={['ngo']}>
                    <NgoDashboard />
                  </RoleBasedRoute>
                } 
              />
              <Route 
                path="/admin-dashboard" 
                element={
                  <RoleBasedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </RoleBasedRoute>
                } 
              />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </Web3Provider>
  );
}

export default App;
