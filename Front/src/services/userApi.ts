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
    return response.data;
  }
};