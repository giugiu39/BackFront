import React from 'react';
import Layout from '../components/common/Layout';
import LoginForm from '../components/auth/LoginForm';
import { Shield } from 'lucide-react';

const AdminLoginPage: React.FC = () => {
  const handleLoginSuccess = () => {
    window.location.href = '/admin';
  };

  return (
    <Layout showNavbar={false}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-3xl font-bold text-gray-900">Admin Portal</span>
            </div>
            <p className="text-gray-600 mt-2">Secure administrative access</p>
          </div>

          {/* Login Form */}
          <LoginForm role="admin" onSuccess={handleLoginSuccess} />

          {/* Back to main site */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              ← Back to main site
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLoginPage;