import React from 'react';
import Layout from '../components/common/Layout';
import CustomerCart from '../components/customer/CustomerCart';

const CustomerCartPage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto py-6">
        <CustomerCart />
      </div>
    </Layout>
  );
};

export default CustomerCartPage;