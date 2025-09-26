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
    if (loading) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Role-based access control
    if (requiredRole) {
      if (requiredRole === 'admin' && !isAdmin) {
        // Customer trying to access admin route
        navigate(redirectTo || '/customer');
        return;
      }
      
      if (requiredRole === 'customer' && isAdmin) {
        // Admin trying to access customer route
        navigate(redirectTo || '/admin');
        return;
      }
    }
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