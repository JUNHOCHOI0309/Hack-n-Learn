import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  // Define your user properties here
  id: string;
  username: string;
  nickname: string;
  email: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (e.g., by checking for a cookie)
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('/api/auth/me'); // An endpoint that returns the logged-in user
        if (response.data) {
          setUser(response.data);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log('User not logged in');
        setUser(null);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.error('Error during logout API call:', error);
    } finally {
      setUser(null);
      setIsLoggedIn(false);
      window.location.href = '/'; // Redirect to home
    }
  };

  const value = {
    isLoggedIn,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
