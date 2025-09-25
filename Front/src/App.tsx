import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  // Simple routing basato sul path - in un'app reale useresti React Router
  const path = window.location.pathname;

  const renderPage = () => {
    switch (path) {
      case '/':
        return <HomePage />;
      case '/login':
        return <LoginPage />;
      case '/register':
        return <RegisterPage />;
      case '/admin/login':
        return <AdminLoginPage />;
      case '/admin':
        return <AdminPage />;
      case '/cart':
        return <CartPage />;
      case '/profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            {renderPage()}
          </div>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;