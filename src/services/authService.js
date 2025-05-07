import { api } from './api';

export const authService = {
  async login(email, password) {
    try {
      // In a real app, this would make an API call
      const response = await api.post('/api/login', { email, password });
      
      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
      
      // For demo purposes, return mock user data based on email
      // In production, this would come from the API response
      let mockUser = {
        id: '123',
        name: 'Demo User',
        email: email,
        profilePicture: null
      };
      
      // Set role based on email prefix for demo purposes
      if (email.startsWith('student')) {
        mockUser.role = 'student';
        mockUser.name = 'John Student';
      } else if (email.startsWith('lecturer')) {
        mockUser.role = 'lecturer';
        mockUser.name = 'Dr. Jane Professor';
      } else if (email.startsWith('admin')) {
        mockUser.role = 'admin';
        mockUser.name = 'Admin User';
      } else {
        // Default to student for demo
        mockUser.role = 'student';
      }
      
      return mockUser;
    } catch (error) {
      // For demo purposes, simulate login with mock data
      console.log('Using mock login data for demonstration');
      
      let mockUser = {
        id: '123',
        name: 'Demo User',
        email: email,
        profilePicture: null
      };
      
      // Set role based on email prefix for demo
      if (email.startsWith('student')) {
        mockUser.role = 'student';
        mockUser.name = 'John Student';
      } else if (email.startsWith('lecturer')) {
        mockUser.role = 'lecturer';
        mockUser.name = 'Dr. Jane Professor';
      } else if (email.startsWith('admin')) {
        mockUser.role = 'admin';
        mockUser.name = 'Admin User';
      } else {
        // Default to student for demo
        mockUser.role = 'student';
      }
      
      // Store mock token
      localStorage.setItem('token', 'mock-jwt-token');
      
      return mockUser;
    }
  },
  
  async getCurrentUser() {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return null;
      }
      
      // In a real app, this would validate the token with the server
      const response = await api.get('/api/profile');
      return response.data;
    } catch (error) {
      // For demo purposes, return mock data if token exists
      const token = localStorage.getItem('token');
      
      if (token) {
        // This is only for demonstration
        // In production, you would validate with the server
        return {
          id: '123',
          name: 'Demo User',
          email: 'user@example.com',
          role: 'student',
          profilePicture: null
        };
      }
      
      localStorage.removeItem('token');
      return null;
    }
  },
  
  logout() {
    localStorage.removeItem('token');
  },
  
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },
};