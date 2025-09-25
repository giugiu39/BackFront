import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8090',
  realm: 'ecommerce',
  clientId: 'ecommerce-app'
};

const keycloak = new Keycloak(keycloakConfig);
let isInitialized = false;

export const initKeycloak = () => {
  if (isInitialized) {
    return Promise.resolve(keycloak.authenticated);
  }
  
  isInitialized = true;
  return keycloak
    .init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
      pkceMethod: 'S256',
      redirectUri: window.location.origin + '/login'
    })
    .then((authenticated) => {
      if (authenticated) {
        console.log('User is authenticated');
      } else {
        console.log('User is not authenticated');
      }
      return authenticated;
    })
    .catch((error) => {
      console.error('Failed to initialize Keycloak', error);
      isInitialized = false; // Reset flag on error
      throw error;
    });
};

export const login = () => {
  keycloak.login({
    redirectUri: window.location.origin + '/login'
  });
};

export const register = () => {
  keycloak.register({
    redirectUri: window.location.origin + '/register'
  });
};

export const logout = () => {
  keycloak.logout();
};

export const getToken = () => {
  return keycloak.token;
};

export const isLoggedIn = () => {
  return !!keycloak.token;
};

export const updateToken = (minValidity = 5) => {
  return keycloak.updateToken(minValidity);
};

export const getUsername = () => {
  return keycloak.tokenParsed?.preferred_username;
};

export const hasRole = (roles: string[]) => {
  return roles.some((role) => keycloak.hasRealmRole(role));
};

export const isAdmin = () => {
  return keycloak.hasRealmRole('admin');
};

export const isCustomer = () => {
  return keycloak.hasRealmRole('customer');
};

export default keycloak;