
import { College } from '@/types/college';

export interface CollegeFromSupabase {
  id: number;
  name: string;
  location: string;
  description: string;
  rating: number;
  fees: string;
  image_url: string;
  is_featured?: boolean;
  college_code?: string;
  created_at: string;
  specialization?: string[];
  rank?: number;
  affiliation?: string;
  features?: string[];
}

// Helper function to map Supabase college data to our College type
export function mapSupabaseToCollege(college: CollegeFromSupabase): College {
  return {
    id: college.id,
    name: college.name,
    location: college.location,
    description: college.description,
    rating: college.rating,
    fees: college.fees,
    imageUrl: college.image_url,
    degreesOffered: [], // Will be populated separately
    isFeatured: college.is_featured || false,
    collegeCode: college.college_code,
    specialization: college.specialization || [],
    rank: college.rank,
    affiliation: college.affiliation,
    features: college.features || []
  };
}
