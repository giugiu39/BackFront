import React from 'react';
import Layout from '../components/common/Layout';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const { user } = useAuth();

  const handleLoginSuccess = () => {
    if (user?.role === 'admin') {
      window.location.href = '/admin';
    } else {
      window.location.href = '/';
    }
  };

  return (
    <Layout showNavbar={false}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <a href="/" className="inline-block">
              <span className="text-3xl font-bold text-blue-600">ECommerce</span>
            </a>
          </div>

          {/* Login Form */}
          <LoginForm role="customer" onSuccess={handleLoginSuccess} />

          {/* Admin Login Link */}
          <div className="mt-6 text-center">
            <a
              href="/admin/login"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              Are you an admin? Sign in here
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;