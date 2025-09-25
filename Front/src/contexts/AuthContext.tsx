import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import keycloak, { initKeycloak, login, logout, register, getToken, isLoggedIn, getUsername, hasRole, isAdmin, isCustomer } from '../services/KeycloakService';
import { userApi, UserProfile } from '../services/userApi';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: () => void;
  logout: () => void;
  register: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const authenticated = await initKeycloak();
        console.log('Keycloak authentication status:', authenticated);
        setIsAuthenticated(authenticated);
        
        if (authenticated) {
          console.log('User is authenticated, fetching profile...');
          // Ottieni il profilo utente dal backend solo se autenticato
          try {
            // Aspetta un po' di più per assicurarsi che il token sia disponibile
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Verifica che il token sia disponibile
            const token = keycloak.token;
            console.log('Token available before API call:', !!token);
            if (!token) {
              console.error('No token available, cannot fetch profile');
              setIsAuthenticated(false);
              setUser(null);
              return;
            }
            
            const userProfile = await userApi.getUserProfile();
            console.log('User profile fetched successfully:', userProfile);
            setUser(userProfile);
            
            // Reindirizza alla pagina profilo SOLO se l'utente ha appena fatto login
            // Non reindirizzare automaticamente all'avvio dell'app
            const currentPath = window.location.pathname;
            console.log('Current path:', currentPath);
            
            // Controlla se c'è un parametro URL che indica un login appena completato
            const urlParams = new URLSearchParams(window.location.search);
            const justLoggedIn = urlParams.has('state') || urlParams.has('session_state') || urlParams.has('code');
            
            if (justLoggedIn && (currentPath === '/' || currentPath === '/login' || currentPath === '/register')) {
              console.log('User just logged in, redirecting to profile page...');
              window.location.href = '/profile';
            } else {
              console.log('User already authenticated, no redirect needed');
            }
          } catch (error) {
            console.error('Error fetching user profile:', error);
            // Se l'errore è 401, l'utente non è realmente autenticato
            if (error.message && error.message.includes('401')) {
              console.log('User not authenticated on backend, redirecting to login');
              setIsAuthenticated(false);
              setUser(null);
              return;
            }
            // Per altri errori, mantieni l'autenticazione Keycloak ma senza profilo
            console.log('Keeping Keycloak authentication despite profile error');
            // Non reindirizzare se c'è un errore nel profilo
          }
        } else {
          console.log('User is not authenticated');
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
    
    // Aggiungi listener per i cambiamenti di pagina
    const handleLocationChange = () => {
      console.log('Location changed, re-checking auth status');
      // Solo se non stiamo già caricando, ricontrolla lo stato
      if (!loading) {
        initAuth();
      }
    };
    
    // Ascolta i cambiamenti di popstate (back/forward)
    window.addEventListener('popstate', handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const handleLogin = () => {
    login();
  };

  const handleRegister = () => {
    register();
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login: handleLogin, logout: handleLogout, register: handleRegister, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};