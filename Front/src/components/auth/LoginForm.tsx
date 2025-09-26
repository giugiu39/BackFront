import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormProps {
  role: 'admin' | 'customer';
  onSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ role, onSuccess }) => {
  const { login } = useAuth();

  const handleLogin = () => {
    login();
    // Remove onSuccess callback since redirect is now handled in AuthContext
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {role === 'admin' ? 'Admin Login' : 'Sign In'}
          </h2>
          <p className="mt-2 text-gray-600">
            {role === 'admin' ? 'Access your admin dashboard' : 'Welcome back to your account'}
          </p>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Click the button below to sign in securely through our authentication system.
          </p>
          
          <button
            onClick={handleLogin}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {role === 'admin' ? 'Admin Sign In' : 'Sign In'}
          </button>
        </div>

        {role === 'customer' && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="font-medium text-blue-600 hover:text-blue-800">
                Sign up
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;