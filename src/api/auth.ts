
import { get, post } from './apiClient';

// Login credentials type
type LoginCredentials = {
  email: string;
  password: string;
};

// User data type
type User = {
  id: string;
  username: string;
  email: string;
  role: string;
};

// Auth response type
type AuthResponse = {
  token: string;
  user: User;
};

// Type for API responses
type ApiResponse<T> = {
  data: T;
  message: string;
  status: string;
};

// Login user
export const login = async (credentials: LoginCredentials) => {
  const response = await post<ApiResponse<AuthResponse>>('/auth/login', credentials);
  
  // Store token in localStorage
  if (response.data?.token) {
    localStorage.setItem('auth_token', response.data.token);
  }
  
  return response;
};

// Logout user
export const logout = () => {
  localStorage.removeItem('auth_token');
};

// Get current user info
export const getCurrentUser = () => 
  get<ApiResponse<User>>('/auth/me', true);

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('auth_token') !== null;
};
