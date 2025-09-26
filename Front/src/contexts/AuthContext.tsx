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
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

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
              setIsAdmin(false);
              return;
            }
            
            const userProfile = await userApi.getUserProfile();
            console.log('User profile fetched successfully:', userProfile);
            console.log('User profile role:', userProfile.role);
            console.log('Role type:', typeof userProfile.role);
            setUser(userProfile);
            
            // Check if user is admin based on the role in the profile
            const adminStatus = userProfile.role === 'ADMIN';
            console.log('Admin status determined:', adminStatus);
            console.log('Comparison result: userProfile.role === "ADMIN":', userProfile.role === 'ADMIN');
            setIsAdmin(adminStatus);
            
            // Reindirizza alla dashboard specifica del ruolo SOLO se l'utente ha appena fatto login
            // Non reindirizzare automaticamente all'avvio dell'app
            const currentPath = window.location.pathname;
            console.log('Current path:', currentPath);
            
            // Controlla se c'è un parametro URL che indica un login appena completato
            const urlParams = new URLSearchParams(window.location.search);
            const justLoggedIn = urlParams.has('state') || urlParams.has('session_state') || urlParams.has('code');
            console.log('URL params:', window.location.search);
            console.log('Just logged in:', justLoggedIn);
            console.log('Current path for redirect check:', currentPath);
            
            // Sempre reindirizza se l'utente è autenticato e si trova su pagine di login
            if (currentPath === '/login' || currentPath === '/register' || currentPath === '/admin/login') {
              if (adminStatus) {
                console.log('Authenticated admin on login page, redirecting to admin dashboard...');
                console.log('About to redirect admin to /admin from path:', currentPath);
                window.location.replace('/admin');
              } else {
                console.log('Authenticated customer on login page, redirecting to customer dashboard...');
                console.log('About to redirect to /customer from path:', currentPath);
                window.location.replace('/customer');
              }
            } else if (currentPath === '/' && justLoggedIn) {
              // Reindirizza dalla home page alla dashboard appropriata SOLO dopo il login
              if (adminStatus) {
                console.log('Admin user just logged in from home, redirecting to admin dashboard...');
                window.location.replace('/admin');
              } else {
                console.log('Customer user just logged in from home, redirecting to customer dashboard...');
                window.location.replace('/customer');
              }
            } else {
              console.log('User already authenticated, no redirect needed for path:', currentPath);
              console.log('User role:', adminStatus ? 'admin' : 'customer');
              console.log('Authentication status:', isLoggedIn());
            }
          } catch (error) {
            console.error('Error fetching user profile:', error);
            // Se l'errore è 401, l'utente non è realmente autenticato
            if (error.message && error.message.includes('401')) {
              console.log('User not authenticated on backend, redirecting to login');
              setIsAuthenticated(false);
              setUser(null);
              setIsAdmin(false);
              return;
            }
            // Per altri errori, mantieni l'autenticazione Keycloak ma senza profilo
            console.log('Keeping Keycloak authentication despite profile error');
            setIsAdmin(false);
            // Non reindirizzare se c'è un errore nel profilo
          }
        } else {
          console.log('User is not authenticated');
          setIsAuthenticated(false);
          setUser(null);
          setIsAdmin(false);
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
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login: handleLogin, logout: handleLogout, register: handleRegister, loading, isAdmin }}>
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