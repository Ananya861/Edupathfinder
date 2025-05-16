
import { get, post, put, del } from './apiClient';
import { Degree } from '@/types/degree';

// Get all degrees
export const fetchDegrees = () => 
  get<Degree[]>('/api/degrees');

// Get all degree names
export const fetchDegreeNames = () => 
  get<string[]>('/api/degrees/names');

// Get all eligibility criteria
export const fetchEligibilityCriteria = () => 
  get<string[]>('/api/degrees/eligibility-criteria');

// Get a single degree by ID
export const fetchDegreeById = (id: number) => 
  get<Degree>(`/api/degrees/${id}`);

// Admin functions (require authentication)

// Create a new degree
export const createDegree = (degreeData: Omit<Degree, 'id'>) => 
  post<Degree>('/api/degrees', degreeData, true);

// Update an existing degree
export const updateDegree = (id: number, degreeData: Partial<Degree>) => 
  put<Degree>(`/api/degrees/${id}`, degreeData, true);

// Delete a degree
export const deleteDegree = (id: number) => 
  del<null>(`/api/degrees/${id}`, true);
