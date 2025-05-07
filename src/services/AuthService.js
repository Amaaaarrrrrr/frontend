import { api } from './api';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'lecturer' | 'admin';
  profilePicture?: string;
};

export const authService = {
  async login(email: string, password: string): Promise<User> {
    try {
      // In a real app, this would make an API call
      const response = await api.post('/api/login', { email, password });
      
      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
      
      return response.data.user;
    } catch (error) {
      throw new Error('Authentication failed. Please check your credentials.');
    }
  },
  
  async getCurrentUser(): Promise<User | null> {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return null;
      }
      
      const response = await api.get('/api/profile');
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      return null;
    }
  },
  
  logout(): void {
    localStorage.removeItem('token');
  },
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
};