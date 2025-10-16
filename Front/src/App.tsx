import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ReturnsPage from './pages/ReturnsPage';
import CategoriesPage from './pages/CategoriesPage';
import CustomerProductsPage from './pages/CustomerProductsPage';
import WishlistPage from './pages/WishlistPage';
// Pagine prodotti customer rimosse temporaneamente
import './index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              
              {/* Rotta admin/products rimossa definitivamente */}
              
              {/* Customer Products Routes */}
              <Route 
                path="/customer/products" 
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CustomerProductsPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/categories/:categoryName" 
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CustomerProductsPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected Admin Routes */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin/profile" 
                element={
                  <ProtectedRoute requiredRole="admin">
                    <Layout><ProfilePage /></Layout>
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected Customer Routes */}
              <Route 
                path="/customer" 
                element={
                  <ProtectedRoute requiredRole="customer">
                    <CustomerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/customer/profile" 
                element={
                  <ProtectedRoute requiredRole="customer">
                    <Layout><ProfilePage /></Layout>
                  </ProtectedRoute>
                } 
              />
              
              {/* General Protected Routes */}
              <Route 
                path="/wishlist" 
                element={
                  <ProtectedRoute>
                  <WishlistPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Layout><ProfilePage /></Layout>
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;