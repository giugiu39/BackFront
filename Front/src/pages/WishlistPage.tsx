import React from 'react';
import Layout from '../components/common/Layout';
import Wishlist from '../components/customer/Wishlist';

const WishlistPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Wishlist />
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;