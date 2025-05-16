
// Base API client for making requests to the backend

// API base URL - would come from environment variables in production
const API_BASE_URL = 'http://localhost:8080';

// Request options type
type RequestOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  requiresAuth?: boolean;
};

// Function to get authentication token from storage
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Main API request function
export async function apiRequest<T>(
  endpoint: string, 
  options: RequestOptions = { method: 'GET' }
): Promise<T> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    // Default headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers
    };
    
    // Add auth token if required
    if (options.requiresAuth) {
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authentication required');
      }
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Prepare request
    const requestOptions: RequestInit = {
      method: options.method,
      headers,
      credentials: 'include',
    };
    
    // Add body for non-GET requests
    if (options.body && options.method !== 'GET') {
      requestOptions.body = JSON.stringify(options.body);
    }
    
    // Make request
    const response = await fetch(url, requestOptions);
    
    // Handle non-2xx responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status}`);
    }
    
    // Parse JSON response
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Common HTTP method wrappers
export const get = <T>(endpoint: string, requiresAuth = false) => 
  apiRequest<T>(endpoint, { method: 'GET', requiresAuth });

export const post = <T>(endpoint: string, body: any, requiresAuth = false) => 
  apiRequest<T>(endpoint, { method: 'POST', body, requiresAuth });

export const put = <T>(endpoint: string, body: any, requiresAuth = false) => 
  apiRequest<T>(endpoint, { method: 'PUT', body, requiresAuth });

export const del = <T>(endpoint: string, requiresAuth = false) => 
  apiRequest<T>(endpoint, { method: 'DELETE', requiresAuth });
