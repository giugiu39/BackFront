import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Layout from './Layout';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'customer';
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole,
  redirectTo 
}) => {
  const { user, isAdmin, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('ProtectedRoute - loading:', loading, 'isAuthenticated:', isAuthenticated, 'isAdmin:', isAdmin, 'requiredRole:', requiredRole);
    
    // IMPORTANTE: Non fare NULLA finché il loading non è completato
    if (loading) {
      console.log('ProtectedRoute - Still loading, waiting...');
      return;
    }

    if (!isAuthenticated) {
      console.log('ProtectedRoute - User not authenticated after loading completed, redirecting to login');
      navigate('/login');
      return;
    }

    // Role-based access control
    if (requiredRole) {
      if (requiredRole === 'admin' && !isAdmin) {
        // Customer trying to access admin route
        console.log('ProtectedRoute - Customer trying to access admin route, redirecting to customer');
        navigate(redirectTo || '/customer');
        return;
      }
      
      if (requiredRole === 'customer' && isAdmin) {
        // Admin trying to access customer route
        console.log('ProtectedRoute - Admin trying to access customer route, redirecting to admin');
        navigate(redirectTo || '/admin');
        return;
      }
    }

    console.log('ProtectedRoute - Access granted');
  }, [loading, isAuthenticated, isAdmin, requiredRole, redirectTo, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Role-based access control
  if (requiredRole) {
    if (requiredRole === 'admin' && !isAdmin) {
      return null;
    }
    
    if (requiredRole === 'customer' && isAdmin) {
      return null;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;