import React, { ReactNode } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Search, 
  Menu, 
  X,
  Heart,
  Package,
  LogOut,
  Settings,
  BarChart3,
  Users,
  ShoppingCart
} from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
  showNavbar?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showNavbar = true }) => {
  const { user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: user ? (isAdmin ? '/admin' : '/customer') : '/' },
    // Rimuovo Products dalla navigazione per gli admin
    ...(isAdmin ? [] : [{ name: 'Products', href: '/customer/products' }]),
    // Aggiungo Categories tra Products e About per i non-admin
    ...(isAdmin ? [] : [{ name: 'Categories', href: '/categories' }]),
    { name: 'FAQ', href: isAdmin ? '/admin/faq' : '/customer/faq' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: isAdmin ? '/admin/contact' : (user ? '/customer/contact' : '/contact') },
  ];

  if (!showNavbar) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-blue-600">Speedy</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>



            {/* Right Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {user && !isAdmin && (
                <>
                  <button 
                    onClick={() => navigate('/wishlist')} 
                    className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors group"
                    title="Wishlist"
                  >
                    <Heart className="h-6 w-6" />
                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      Wishlist
                    </span>
                  </button>
                  <button 
                    onClick={() => navigate('/customer/cart')} 
                    className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors group"
                    title="Cart"
                  >
                    <ShoppingCart className="h-6 w-6" />
                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      Cart
                    </span>
                  </button>
                </>
              )}

              {/* Admin navigation buttons removed as requested */}
              
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="relative flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors group"
                    title="Profile"
                  >
                    <User className="h-6 w-6" />
                    <span className="text-sm font-medium">{user.firstName}</span>
                    <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      Profile
                    </span>
                  </button>
                  
                  {mobileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <button
                        onClick={() => navigate(isAdmin ? '/admin/profile' : '/customer/profile')}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </button>
                      {/* Admin Dashboard button removed as requested - home button already provides this functionality */}
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="inline h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button onClick={() => navigate('/login')} className="text-gray-700 hover:text-blue-600 transition-colors">
                    Sign in
                  </button>
                  <button
                    onClick={() => navigate('/register')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Sign up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                >
                  {item.name}
                </Link>
              ))}
              
              {user ? (
                <>
                  <button 
                    onClick={() => navigate(isAdmin ? '/admin/profile' : '/customer/profile')} 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  
                  {/* Customer-specific mobile menu items */}
                  {!isAdmin && (
                    <>
                      <button 
                        onClick={() => navigate('/wishlist')} 
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                      >
                        Wishlist
                      </button>
                      <button 
                        onClick={() => navigate('/customer/cart')} 
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                      >
                        My Cart
                      </button>
                    </>
                  )}
                  
                  {/* Admin-specific mobile menu items removed as requested */}
                  
                  <button
                    onClick={logout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => navigate('/login')} 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  >
                    Sign in
                  </button>
                  <button 
                    onClick={() => navigate('/register')} 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Speedy</h3>
              <p className="text-gray-400">Your trusted online shopping destination.</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/customer/products" className="hover:text-white transition-colors">Products</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to={isAdmin ? '/admin/contact' : (user ? '/customer/contact' : '/contact')} className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          <div>
              <h4 className="text-sm font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to={isAdmin ? '/admin/faq' : '/customer/faq'} className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/returns" className="hover:text-white transition-colors">Returns</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Speedy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;