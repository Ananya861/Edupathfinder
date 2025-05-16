
import { get, post, put } from './apiClient';

// Student registration data type
export type StudentDTO = {
  id?: number;
  name: string;
  email: string;
  password?: string;
  phone: string;
  pucStream: string;
  pucPercentage: number;
  preferredDegree?: string;
  preferredLocation?: string;
  notes?: string;
};

// Eligible degree type
export type EligibleDegreeDTO = {
  id: number;
  name: string;
  matchPercentage: number;
  requirements: string[];
};

// Student summary type
export type StudentSummaryDTO = {
  id: number;
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
};

// Register a new student
export const registerStudent = (studentData: StudentDTO) => 
  post<StudentDTO>('/api/students/register', studentData);

// Login a student
export const loginStudent = (email: string, password: string) => 
  post<StudentDTO>('/api/students/login', { email, password });

// Get a student by email
export const getStudentByEmail = (email: string) => 
  get<StudentDTO>(`/api/students/${email}`);

// Get eligible degrees for a student
export const getEligibleDegreesForStudent = (email: string) => 
  get<EligibleDegreeDTO[]>(`/api/students/${email}/eligible-degrees`);

// Update a student
export const updateStudent = (id: number, studentData: Partial<StudentDTO>) => 
  put<StudentDTO>(`/api/students/${id}`, studentData);

// Admin functions (require authentication)

// Get all student summaries (admin only)
export const fetchStudentSummaries = () => 
  get<StudentSummaryDTO[]>('/api/students/summaries', true);
