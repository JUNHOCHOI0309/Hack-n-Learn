import { create } from 'zustand';
import axios from 'axios';

axios.defaults.withCredentials = true;

interface User {
  id: string;
  username: string;
  // Add other user properties as needed
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null; // Add token to AuthState
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  token: null, // Initialize token
  isLoading: true, // Start as true to indicate initial loading of auth status

  login: async (username, password) => {
    set({ isLoading: true });
    try {
      const response = await axios.post('/api/auth/login', {
        id: username,
        password,
      });
      if (response.status === 200) {
        const user: User = { id: '1', username: username }; // Mock user
        const token = response.data.token || 'mock-token'; // Assuming token is returned
        set({ isAuthenticated: true, user: user, token: token, isLoading: false });
        return true;
      }
      set({ isAuthenticated: false, user: null, token: null, isLoading: false });
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      set({ isAuthenticated: false, user: null, token: null, isLoading: false });
      return false;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await axios.post('/api/auth/logout');
      set({ isAuthenticated: false, user: null, token: null, isLoading: false });
    } catch (error) {
      console.error('Logout failed:', error);
      set({ isLoading: false });
    }
  },

  checkAuthStatus: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get('/api/auth/me');
      console.log('checkAuthStatus response:', response);
      if (response.status === 200 && response.data.user) {
        const token = response.data.token || 'mock-token'; // Assuming token is returned
        set({
          isAuthenticated: true,
          user: response.data.user,
          token: token,
          isLoading: false,
        });
      } else {
        console.log(
          'checkAuthStatus: No user data or status not 200',
          response
        );
        set({ isAuthenticated: false, user: null, token: null, isLoading: false });
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      set({ isAuthenticated: false, user: null, token: null, isLoading: false });
    }
  },
}));
