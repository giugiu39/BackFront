import React from 'react';
import Layout from '../components/common/Layout';
import { Phone, Mail, RotateCcw, ShieldCheck, Info, CheckCircle } from 'lucide-react';

const ReturnsPage: React.FC = () => {
  // Contact details taken from ContactPage for consistency
  const phoneDisplay = '+39 02 1234 5678';
  const phoneLink = 'tel:+390212345678';
  const email = 'hello@speedy.it';

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <RotateCcw className="h-14 w-14 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-4">Returns & Refunds</h1>
            <p className="text-xl text-rose-100 max-w-3xl mx-auto">
              For refund requests, please call us or send an email. We’ll process your request quickly and keep you updated at every step.
            </p>
          </div>
        </section>

        {/* Contact Callouts */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-fuchsia-50 to-pink-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="bg-fuchsia-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us for Refunds</h3>
                <p className="text-2xl font-bold text-fuchsia-700 mb-2">{phoneDisplay}</p>
                <p className="text-gray-600 mb-4">Mon–Fri 8:00–20:00</p>
                <a href={phoneLink} className="inline-block bg-fuchsia-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-fuchsia-700 transition-colors">
                  Call Now
                </a>
              </div>

              <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center">
                <div className="bg-rose-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email Our Support</h3>
                <p className="text-xl font-bold text-rose-700 mb-2">{email}</p>
                <p className="text-gray-600 mb-4">We usually reply within 30 minutes</p>
                <a href={`mailto:${email}`} className="inline-block bg-rose-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-rose-700 transition-colors">
                  Write Email
                </a>
              </div>
            </div>

            {/* How Returns Work */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center mb-4">
                <ShieldCheck className="h-6 w-6 text-fuchsia-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">How Our Returns Work</h2>
              </div>
              <p className="text-gray-700 mb-6">
                We aim to make returns simple and transparent. Contact us via phone or email with your order ID and the reason for the refund. Our team will guide you through the next steps and provide a fast resolution.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-white to-fuchsia-50 p-6 rounded-xl border border-fuchsia-100">
                  <div className="flex items-center mb-2">
                    <Info className="h-5 w-5 text-fuchsia-700 mr-2" />
                    <span className="font-semibold text-gray-900">Prepare your details</span>
                  </div>
                  <p className="text-gray-600">Have your order ID and a brief description ready.</p>
                </div>
                <div className="bg-gradient-to-br from-white to-pink-50 p-6 rounded-xl border border-pink-100">
                  <div className="flex items-center mb-2">
                    <Phone className="h-5 w-5 text-pink-700 mr-2" />
                    <span className="font-semibold text-gray-900">Contact us</span>
                  </div>
                  <p className="text-gray-600">Reach out by phone or email and we’ll take it from there.</p>
                </div>
                <div className="bg-gradient-to-br from-white to-rose-50 p-6 rounded-xl border border-rose-100">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-rose-700 mr-2" />
                    <span className="font-semibold text-gray-900">Fast resolution</span>
                  </div>
                  <p className="text-gray-600">We process refunds quickly and keep you informed throughout.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ReturnsPage;