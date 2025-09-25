import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import keycloak, { initKeycloak, login as keycloakLogin, logout as keycloakLogout, register as keycloakRegister, isAdmin, isCustomer } from '../services/KeycloakService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: () => void;
  logout: () => void;
  register: () => void;
  loading: boolean;
  isAdmin: boolean;
  isCustomer: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const [userIsCustomer, setUserIsCustomer] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await initKeycloak();
        
        if (keycloak.authenticated) {
          setToken(keycloak.token || null);
          
          // Estrai le informazioni dell'utente dal token
          const tokenParsed = keycloak.tokenParsed as any;
          if (tokenParsed) {
            const keycloakUser: User = {
              id: tokenParsed.sub,
              email: tokenParsed.email || '',
              firstName: tokenParsed.given_name || '',
              lastName: tokenParsed.family_name || '',
              role: isAdmin() ? 'admin' : 'customer',
              createdAt: new Date().toISOString(),
            };
            setUser(keycloakUser);
            setUserIsAdmin(isAdmin());
            setUserIsCustomer(isCustomer());
          }
        }
      } catch (error) {
        console.error('Error initializing Keycloak:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Aggiorna il token quando sta per scadere
  useEffect(() => {
    if (keycloak.authenticated) {
      const refreshInterval = setInterval(() => {
        keycloak.updateToken(70)
          .then((refreshed) => {
            if (refreshed) {
              setToken(keycloak.token || null);
            }
          })
          .catch(() => {
            console.error('Failed to refresh token');
          });
      }, 60000); // Controlla ogni minuto

      return () => clearInterval(refreshInterval);
    }
  }, []);

  const login = () => {
    keycloakLogin();
  };

  const logout = () => {
    keycloakLogout();
    setUser(null);
    setToken(null);
    setUserIsAdmin(false);
    setUserIsCustomer(false);
  };

  const register = () => {
    keycloakRegister();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        register,
        loading,
        isAdmin: userIsAdmin,
        isCustomer: userIsCustomer
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};