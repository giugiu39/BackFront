import keycloak, { getToken, updateToken } from './KeycloakService';

const API_BASE_URL = 'http://localhost:8081';

// Funzione helper per aggiungere il token di autenticazione
const authHeader = async (isFormData = false) => {
  try {
    // Aggiorna il token se sta per scadere
    await updateToken(60);
    const token = getToken();
    
    console.log('Token available:', !!token);
    if (token) {
      console.log('Token length:', token.length);
    }
    
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`
    };
    
    // Non impostare Content-Type per FormData, il browser lo gestisce automaticamente
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    
    return headers;
  } catch (error) {
    console.error('Failed to get auth header', error);
    const headers: Record<string, string> = {};
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }
    return headers;
  }
};

// Classe per gestire le chiamate API
class ApiService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async get(endpoint: string) {
    const headers = await authHeader();
    console.log('Making GET request to:', `${this.baseURL}${endpoint}`);
    console.log('Headers:', headers);
    
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      return response;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  async post(endpoint: string, data?: any) {
    const headers = await authHeader();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: data ? JSON.stringify(data) : undefined
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response;
  }
}

export const apiService = new ApiService(API_BASE_URL);

// Funzione generica per le richieste API
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  try {
    // Determina se stiamo inviando FormData
    const isFormData = options.body instanceof FormData;
    const headers = await authHeader(isFormData);
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    });

    if (!response.ok) {
      console.warn(`API error: ${response.status} for endpoint ${endpoint}`);
      // Se il backend non è disponibile, restituiamo dati di fallback
      if (response.status === 404 || response.status === 0) {
        return getMockData(endpoint);
      }
      throw new Error(`API error: ${response.status}`);
    }

    // Se la risposta è 204 No Content, non c'è JSON da parsare
    if (response.status === 204) {
      return null;
    }
    
    // Per altre risposte di successo, prova a parsare il JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    // Se non è JSON, restituisci null per risposte di successo
    return null;
  } catch (error) {
    console.error('API request failed:', error);
    // In caso di errore di connessione, restituiamo dati di fallback
    return getMockData(endpoint);
  }
};

// Funzione per ottenere dati di fallback in base all'endpoint
const getMockData = (endpoint: string) => {
  console.log(`Returning mock data for ${endpoint}`);
  
  // Dati di fallback per vari endpoint
  if (endpoint.includes('/products')) {
    return [
      {
        id: '1',
        name: 'Smartphone Pro',
        description: 'Un potente smartphone con funzionalità avanzate',
        price: 699.99,
        discountPrice: 599.99,
        imageUrl: 'https://via.placeholder.com/300',
        categoryName: 'Elettronica'
      },
      {
        id: '2',
        name: 'Cuffie Wireless',
        description: 'Cuffie con cancellazione del rumore e audio di alta qualità',
        price: 149.99,
        imageUrl: 'https://via.placeholder.com/300',
        categoryName: 'Accessori'
      }
    ];
  }
  
  // Restituisci un array vuoto come fallback generico
  return [];
};

// API per gli utenti Admin
export const adminApi = {
  // Categorie
  getCategories: () => apiRequest('/api/admin'),
  createCategory: (categoryData: any) => apiRequest('/api/admin/category', {
    method: 'POST',
    body: JSON.stringify(categoryData)
  }),
  
  // Prodotti
  getProducts: () => apiRequest('/api/admin/products'),
  createProduct: (productData: any) => apiRequest('/api/admin/product', {
    method: 'POST',
    body: productData // FormData per il file upload
  }),
  updateProduct: (productId: string, productData: any) => apiRequest(`/api/admin/product/${productId}`, {
    method: 'PUT',
    body: productData // FormData per il file upload
  }),
  deleteProduct: (productId: string) => apiRequest(`/api/admin/product/${productId}`, {
    method: 'DELETE'
  }),
  
  // Ordini
  getOrders: () => apiRequest('/admin/orders'),
  updateOrderStatus: (orderId: string, status: string) => apiRequest(`/admin/orders/${orderId}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status })
  }),
  
  // Coupon
  getCoupons: () => apiRequest('/admin/coupons'),
  createCoupon: (couponData: any) => apiRequest('/admin/coupons', {
    method: 'POST',
    body: JSON.stringify(couponData)
  }),
  
  // Analytics
  getAnalytics: () => apiRequest('/api/admin/order/analytics')
};

// API per gli utenti Customer
export const customerApi = {
  // Prodotti
  getAllProducts: () => apiRequest('/api/customer/products'),
  getProductsByCategory: (categoryName: string) => apiRequest(`/api/customer/products/category/${categoryName}`),
  searchProducts: (searchTerm: string) => apiRequest(`/api/customer/search/${searchTerm}`),
  getProductDetails: (productId: string) => apiRequest(`/api/customer/product/${productId}`),
  
  // Carrello
  getCart: () => apiRequest('/api/customer/cart'),
  addToCart: async (productId: number) => {
    // Ottieni l'ID Keycloak dell'utente corrente
    const keycloakId = keycloak.tokenParsed?.sub;
    if (!keycloakId) {
      throw new Error('User not authenticated');
    }
    
    return apiRequest('/api/customer/cart', {
      method: 'POST',
      body: JSON.stringify({
        userId: keycloakId, // Usa keycloakId invece di un ID numerico
        productId: productId
      })
    });
  },
  updateCartItem: (itemId: string, quantity: number) => apiRequest(`/api/customer/cart/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity })
  }),
  removeFromCart: (itemId: string) => apiRequest(`/api/customer/cart/${itemId}`, {
    method: 'DELETE'
  }),
  
  // Ordini
  placeOrder: (orderData: any) => apiRequest('/api/customer/orders', {
    method: 'POST',
    body: JSON.stringify(orderData)
  }),
  getOrders: () => apiRequest('/api/customer/orders'),
  
  // Wishlist
  getWishlist: () => apiRequest('/api/customer/wishlist'),
  addToWishlist: (productId: string) => apiRequest('/api/customer/wishlist', {
    method: 'POST',
    body: JSON.stringify({ productId })
  }),
  removeFromWishlist: (wishlistItemId: string) => apiRequest(`/api/customer/wishlist/${wishlistItemId}`, {
    method: 'DELETE'
  }),
  
  // Profile
  getUserProfile: () => apiRequest('/api/user/profile'),
  updateUserProfile: (profileData: any) => apiRequest('/api/user/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData)
  }),

  // Recensioni
  addReview: (productId: string, reviewData: any) => apiRequest(`/customer/products/${productId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(reviewData)
  })
};

// API pubbliche (non richiedono autenticazione)
export const publicApi = {
  trackOrder: (trackingId: string) => fetch(`${API_BASE_URL}/order/trackOrder/${trackingId}`).then(res => res.json())
};

export default {
  admin: adminApi,
  customer: customerApi,
  public: publicApi
};