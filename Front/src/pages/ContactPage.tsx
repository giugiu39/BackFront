import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Headphones } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert('Thank you for your message! We\'ll get back to you within 30 minutes.');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Need help? Have questions? We're here to assist you at lightning speed! ⚡
            </p>
          </div>
        </section>

        {/* Contact Information Cards */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-lg text-gray-600">Choose your preferred way to reach us</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Phone Support</h3>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600 mb-2">+39 02 1234 5678</p>
                  <p className="text-gray-600 mb-2">Mon-Fri 8:00-20:00</p>
                  <p className="text-sm text-gray-500">Average wait time: 2 minutes</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Email Support</h3>
                <div className="text-center">
                  <p className="text-xl font-bold text-green-600 mb-2">hello@speedy.it</p>
                  <p className="text-gray-600 mb-2">We reply within 30 minutes!</p>
                  <p className="text-sm text-gray-500">24/7 availability</p>
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

        {/* Contact Form Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a Message</h2>
              <p className="text-lg text-gray-600">Fill out the form below and we'll get back to you in a flash!</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="What can we help you with?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Quick Help Section */}
        <section className="py-16 bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Need Quick Help?</h2>
              <p className="text-xl text-blue-100">Choose the fastest way to get assistance</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                <p className="text-blue-100 mb-4">Get instant help from our support team</p>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Start Chat
                </button>
              </div>
              
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold mb-2">Call Us</h3>
                <p className="text-blue-100 mb-4">Speak directly with our experts</p>
                <a 
                  href="tel:+390212345678"
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
                >
                  Call Now
                </a>
              </div>
              
              <div className="text-center">
                <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold mb-2">FAQ</h3>
                <p className="text-blue-100 mb-4">Find answers to common questions</p>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  View FAQ
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Response Time Promise */}
        <section className="py-12 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Our Speed Promise</h3>
            <p className="text-lg text-gray-300 mb-6">
              Just like our deliveries, our customer support is lightning fast!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-3xl font-bold text-blue-400 mb-2">30 min</div>
                <div className="text-sm text-gray-300">Email Response</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-3xl font-bold text-green-400 mb-2">2 min</div>
                <div className="text-sm text-gray-300">Phone Wait Time</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                <div className="text-sm text-gray-300">Availability</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ContactPage;