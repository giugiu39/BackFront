import { apiService } from './ApiService';

export interface UserProfile {
  id: number;
  keycloakId: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'COSTUMER';
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