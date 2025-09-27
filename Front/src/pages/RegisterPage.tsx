import React from 'react';
import Layout from '../components/common/Layout';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage: React.FC = () => {
  const handleRegisterSuccess = () => {
    window.location.href = '/';
  };

  return (
    <Layout showNavbar={false}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <a href="/" className="inline-block">
              <span className="text-3xl font-bold text-blue-600">Speedy</span>
            </a>
          </div>

          {/* Register Form */}
          <RegisterForm onSuccess={handleRegisterSuccess} />
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;