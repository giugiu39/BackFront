import React from 'react';
import Layout from '../components/common/Layout';
import { Clock, Zap, Users, Award, Phone, Mail, MapPin } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-6">The Speedy Story</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              From lightning speed to your doorstep - discover how your favorite e-commerce was born!
            </p>
          </div>
        </section>

        {/* Story Timeline */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-lg text-gray-600">A story of speed, innovation and passion for customers</p>
            </div>

            <div className="space-y-16">
              {/* 2020 - L'Idea */}
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <Zap className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">2020 - The Lightning Inspiration</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    It all started during a torrential rainy day. Gianluca, our founder, urgently needed a laptop charger 
                    but all the stores were closed. "If only there was a way to get what you need in a flash!" he thought. 
                    And so the idea of <strong>Speedy</strong> was born - an e-commerce that promises deliveries as fast 
                    as lightning! ⚡ Our unique approach? <strong>One product, one chance</strong> - each item is available 
                    in limited quantity of just one piece, making every purchase exclusive and urgent!
                  </p>
                </div>
                <div className="lg:w-1/2">
                  <img 
                    src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Fulmine nel cielo" 
                    className="rounded-lg shadow-lg w-full h-80 object-cover"
                  />
                </div>
              </div>

              {/* 2021 - Il Team */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                <div className="lg:w-1/2">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">2021 - The Speed Team</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Gianluca convinced his best friends: Laura (former athletics champion), Giuseppe (logistics wizard) 
                    and Sofia (marketing genius). Their motto? "If it doesn't arrive same day, coffee's on us!" ☕
                    They started from Gianluca's garage with 3 electric bikes and lots of determination. The revolutionary 
                    concept was simple: <strong>exclusive single-item availability</strong> - when you see something you like, 
                    you better be quick because there's only one available!
                  </p>
                </div>
                <div className="lg:w-1/2">
                  <img 
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Team di giovani imprenditori" 
                    className="rounded-lg shadow-lg w-full h-80 object-cover"
                  />
                </div>
              </div>

              {/* 2022 - La Crescita */}
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <Clock className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">2022 - Speed Record!</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Our record? Delivering a pair of running shoes in just 47 minutes from order! 🏃‍♂️ 
                    The customer was about to miss a marathon and we saved her! From that day, Speedy became 
                    synonymous with "impossible is just a word". We opened our first automated warehouse 
                    with robots that move faster than a cheetah! Our <strong>one-item-per-product philosophy</strong> 
                    creates the perfect urgency - no time to hesitate, just pure speed and decision!
                  </p>
                </div>
                <div className="lg:w-1/2">
                  <img 
                    src="https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Magazzino automatizzato" 
                    className="rounded-lg shadow-lg w-full h-80 object-cover"
                  />
                </div>
              </div>

              {/* 2023-2024 - Il Presente */}
              <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                <div className="lg:w-1/2">
                  <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <Award className="h-8 w-8 text-yellow-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">2023-2024 - Awards and Recognition</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Today Speedy is Italy's #1 e-commerce for delivery speed! 🏆 We won the "Golden Lightning" award 
                    for logistics innovation and the "Customer Choice Award" for three consecutive years. 
                    Our fleet includes drones, electric bikes and even a rocket-shaped van! 🚀 
                    But the best part? The smiles on our customers' faces when they receive their orders! 
                    Our <strong>exclusive single-piece inventory</strong> model has revolutionized online shopping - 
                    every purchase is unique, every decision matters, and every delivery is special!
                  </p>
                </div>
                <div className="lg:w-1/2">
                  <img 
                    src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Premiazione e successo" 
                    className="rounded-lg shadow-lg w-full h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fun Facts */}
        <section className="py-16 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Fun Facts About Speedy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-bold text-lg mb-2">47 minutes</h3>
                <p className="text-gray-600">Our fastest delivery record</p>
              </div>
              <div className="text-center bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="font-bold text-lg mb-2">1 Rocket-Van</h3>
                <p className="text-gray-600">Our most iconic delivery vehicle</p>
              </div>
              <div className="text-center bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">☕</div>
                <h3 className="font-bold text-lg mb-2">2,847 Coffees</h3>
                <p className="text-gray-600">Offered for delays (very few!)</p>
              </div>
              <div className="text-center bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="font-bold text-lg mb-2">1 Item Only</h3>
                <p className="text-gray-600">Each product has just one piece available</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
              <p className="text-xl text-gray-300">
                Ready to experience the speed? We're here to help!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-gray-300">+39 02 1234 5678</p>
                <p className="text-sm text-gray-400">Mon-Fri 8:00-20:00</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-gray-300">hello@speedy.it</p>
                <p className="text-sm text-gray-400">We reply within 30 minutes!</p>
              </div>
              
              <div className="text-center">
                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Address</h3>
                <p className="text-gray-300">Via della Riforma, 123</p>
                <p className="text-gray-300">20100 Milano, Italy</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutPage;