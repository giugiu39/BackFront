import React from 'react';
import Layout from '../components/common/Layout';
import { Phone, Mail, MapPin, Clock, MessageCircle, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminContactPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const handleViewFaq = () => {
    navigate(isAdmin ? '/admin/faq' : '/customer/faq');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">Contact Information</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              All the important contact details for administrators
            </p>
          </div>
        </section>

        {/* Contact Information Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-lg text-gray-600">Important contacts for administrators</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Phone</h3>
                <div className="text-center">
                  <p className="text-lg font-semibold text-blue-600 mb-1">+39 02 1234 5678</p>
                  <p className="text-sm text-gray-500">Mon-Fri: 9:00 - 18:00</p>
                  <p className="text-sm text-gray-500">Sat: 9:00 - 12:00</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Email</h3>
                <div className="text-center">
                  <p className="text-lg font-semibold text-green-600 mb-1">admin@speedy.it</p>
                  <p className="text-sm text-gray-500">For administrative inquiries</p>
                  <p className="text-lg font-semibold text-green-600 mb-1 mt-2">tech@speedy.it</p>
                  <p className="text-sm text-gray-500">For technical support</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Visit Us</h3>
                <div className="text-center">
                  <p className="text-lg font-semibold text-purple-600 mb-1">Via della Riforma, 123</p>
                  <p className="text-lg font-semibold text-purple-600 mb-2">20100 Milano, Italy</p>
                  <p className="text-sm text-gray-500">By appointment only</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Help Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Admin Resources</h2>
              <p className="text-xl text-blue-100">Quick access to important resources</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold mb-2">FAQ</h3>
                <p className="text-blue-100 mb-4">Find answers to common questions</p>
                <button onClick={handleViewFaq} className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  View FAQ
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Response Time Promise */}
        <section className="py-12 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Admin Support Metrics</h3>
            <p className="text-lg text-gray-300 mb-6">
              Our internal support performance metrics
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-3xl font-bold text-blue-400 mb-2">15 min</div>
                <div className="text-sm text-gray-300">Internal Response</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-3xl font-bold text-green-400 mb-2">1 min</div>
                <div className="text-sm text-gray-300">Tech Support Wait</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-sm text-gray-300">Emergency Support</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AdminContactPage;