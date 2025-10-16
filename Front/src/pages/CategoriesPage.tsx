import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import { 
  Smartphone, 
  Shirt, 
  Home, 
  Dumbbell, 
  BookOpen, 
  Sparkles,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';

const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  
  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Cutting-edge technology at your fingertips',
      longDescription: 'Discover the latest smartphones, laptops, headphones, and smart devices. Each piece is carefully selected for innovation and quality.',
      icon: Smartphone,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      emoji: '⚡',
      features: ['Latest Technology', 'Premium Quality', 'Warranty Included']
    },
    {
      id: 'clothing',
      name: 'Clothing',
      description: 'Fashion that speaks your unique style',
      longDescription: 'From elegant evening wear to casual streetwear, find pieces that express your personality and make you feel confident.',
      icon: Shirt,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      emoji: '👗',
      features: ['Trendy Designs', 'Premium Fabrics', 'Perfect Fit']
    },
    {
      id: 'home-garden',
      name: 'Home & Garden',
      description: 'Transform your space into a sanctuary',
      longDescription: 'Create the perfect living environment with our curated selection of furniture, decor, and garden essentials.',
      icon: Home,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      emoji: '🏡',
      features: ['Stylish Design', 'Durable Materials', 'Easy Assembly']
    },
    {
      id: 'sports',
      name: 'Sports',
      description: 'Gear up for your next adventure',
      longDescription: 'Whether you\'re a weekend warrior or professional athlete, find equipment that enhances your performance.',
      icon: Dumbbell,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      emoji: '🏃‍♂️',
      features: ['Professional Grade', 'Performance Tested', 'Athlete Approved']
    },
    {
      id: 'books',
      name: 'Books',
      description: 'Feed your mind with knowledge and stories',
      longDescription: 'Dive into worlds of fiction, expand your knowledge with non-fiction, or learn new skills with our educational collection.',
      icon: BookOpen,
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      emoji: '📚',
      features: ['Bestsellers', 'Rare Editions', 'Expert Curated']
    },
    {
      id: 'beauty',
      name: 'Beauty',
      description: 'Enhance your natural radiance',
      longDescription: 'Premium skincare, makeup, and wellness products to help you look and feel your absolute best every day.',
      icon: Sparkles,
      color: 'from-violet-500 to-purple-500',
      bgColor: 'bg-violet-50',
      textColor: 'text-violet-600',
      emoji: '✨',
      features: ['Natural Ingredients', 'Dermatologist Tested', 'Cruelty Free']
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <Zap className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Discover Your Perfect
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Category
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto mb-8">
              Each category holds exclusive treasures waiting to be discovered. 
              <strong className="text-yellow-300"> Remember: only one item per product! </strong> 
              When you see something you love, act fast! ⚡
            </p>
            <div className="flex items-center justify-center space-x-2 text-lg">
              <Star className="h-6 w-6 text-yellow-300 fill-current" />
              <span className="text-yellow-300 font-semibold">Exclusive • Limited • Unique</span>
              <Star className="h-6 w-6 text-yellow-300 fill-current" />
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Explore Our Exclusive Categories
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Six carefully curated worlds of products, each with its own personality and charm. 
                Dive in and discover what speaks to you!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <div
                    key={category.id}
                    className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    {/* Content */}
                    <div className="relative p-8">
                      {/* Icon and Emoji */}
                      <div className="flex items-center justify-between mb-6">
                        <div className={`p-4 ${category.bgColor} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className={`h-8 w-8 ${category.textColor}`} />
                        </div>
                        <div className="text-4xl group-hover:animate-bounce">
                          {category.emoji}
                        </div>
                      </div>

                      {/* Title and Description */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mb-4 font-medium">
                        {category.description}
                      </p>
                      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                        {category.longDescription}
                      </p>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {category.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                            <div className={`w-2 h-2 rounded-full ${category.textColor.replace('text-', 'bg-')} mr-3`} />
                            {feature}
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <button 
                        onClick={() => navigate(`/categories/${category.id}`)}
                        className={`w-full bg-gradient-to-r ${category.color} text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center group`}
                      >
                        <span>Explore {category.name}</span>
                        <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${category.color}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-gradient-to-r from-gray-900 to-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-4">
                Ready to Start Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400"> Speedy </span>
                Adventure?
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Remember, each product is unique and available in limited quantity. 
                Don't miss out on your perfect find!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={() => navigate('/customer/products')}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Start Shopping Now
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300"
              >
                Learn More About Speedy
              </button>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">⚡ 47 min</div>
                <div className="text-gray-300">Fastest Delivery</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">🎯 1 Item</div>
                <div className="text-gray-300">Per Product Only</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">🏆 #1</div>
                <div className="text-gray-300">Speed in Italy</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CategoriesPage;