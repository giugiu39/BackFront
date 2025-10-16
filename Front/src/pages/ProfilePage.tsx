import React from 'react';
import Layout from '../components/common/Layout';
import UserProfile from '../components/customer/UserProfile';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <div className="text-lg text-red-600">Sign-in required</div>
          <div className="text-sm text-gray-600">You need to sign in to view your profile</div>
          <div className="flex space-x-4">
            <button 
              onClick={() => window.location.href = '/login'}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign in
            </button>
            <button 
              onClick={() => window.location.href = '/register'}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <UserProfile />
      </div>
    </Layout>
  );
};

export default ProfilePage;