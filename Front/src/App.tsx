import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPage from './pages/AdminPage';
import CartPage from './pages/CartPage';

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
      default:
        return <HomePage />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          {renderPage()}
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;