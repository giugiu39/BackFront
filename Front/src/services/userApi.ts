import { apiService } from './ApiService';

export interface UserProfile {
  id: number;
  keycloakId: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
    country?: string;
  };
  role: 'ADMIN' | 'CUSTOMER';
  img?: string;
  image?: any;
}

export const userApi = {
  getUserProfile: async (): Promise<UserProfile> => {
    const response = await apiService.get('/api/user/profile');
    console.log('Raw response:', response);
    console.log('Response data:', response.data);
    
    // Parse JSON if needed
    const data = response.data || await response.json();
    console.log('Parsed data:', data);
    
    return data;
  }
};