
import { supabase } from "@/integrations/supabase/client";
import { College } from "@/types/college";
import { Degree } from "@/types/degree";
import { mapSupabaseToCollege, CollegeFromSupabase } from "@/types/supabase";

// Fetch all colleges from Supabase
export async function fetchCollegesFromSupabase(): Promise<College[]> {
  const { data: collegesData, error: collegesError } = await supabase
    .from('colleges')
    .select('*');
  
  if (collegesError) {
    console.error('Error fetching colleges:', collegesError);
    throw new Error('Failed to fetch colleges');
  }

  // Get all college-degree relationships to build the degreesOffered arrays
  const { data: collegeDegrees, error: relationshipError } = await supabase
    .from('college_degrees')
    .select('*');

  if (relationshipError) {
    console.error('Error fetching college-degree relationships:', relationshipError);
    throw new Error('Failed to fetch college-degree relationships');
  }

  // Map Supabase college data to our College type
  const colleges: College[] = collegesData.map((college: CollegeFromSupabase) => {
    const mappedCollege = mapSupabaseToCollege(college);
    
    // Populate degreesOffered array
    mappedCollege.degreesOffered = collegeDegrees
      .filter(rel => rel.college_id === college.id)
      .map(rel => rel.degree_id);
    
    return mappedCollege;
  });

  return colleges;
}

// Fetch colleges by KCET rank
export async function fetchCollegesByKcetRank(rank: number, category: string = 'General', year: number = 2024): Promise<College[]> {
  try {
    // First get eligible cutoffs based on the rank
    const { data: cutoffsData, error: cutoffsError } = await supabase
      .from('kcet_cutoffs')
      .select('college_id, degree_id')
      .lte('cutoff_rank', rank)
      .eq('category', category)
      .eq('year', year);

    if (cutoffsError) {
      console.error('Error fetching cutoffs:', cutoffsError);
      throw new Error('Failed to fetch cutoffs');
    }

    if (!cutoffsData.length) {
      return []; // No matching colleges found
    }

    // Get unique college IDs from the cutoffs
    const collegeIds = [...new Set(cutoffsData.map(cutoff => cutoff.college_id))];

    // Fetch the colleges by IDs
    const { data: collegesData, error: collegesError } = await supabase
      .from('colleges')
      .select('*')
      .in('id', collegeIds);

    if (collegesError) {
      console.error('Error fetching colleges:', collegesError);
      throw new Error('Failed to fetch colleges');
    }

    // Get all college-degree relationships for these colleges
    const { data: collegeDegrees, error: relationshipError } = await supabase
      .from('college_degrees')
      .select('*')
      .in('college_id', collegeIds);

    if (relationshipError) {
      console.error('Error fetching college-degree relationships:', relationshipError);
      throw new Error('Failed to fetch college-degree relationships');
    }

    // Map Supabase college data to our College type
    const colleges: College[] = collegesData.map((college: CollegeFromSupabase) => {
      const mappedCollege = mapSupabaseToCollege(college);
      
      // Populate degreesOffered array
      mappedCollege.degreesOffered = collegeDegrees
        .filter(rel => rel.college_id === college.id)
        .map(rel => rel.degree_id);
      
      return mappedCollege;
    });

    return colleges;
  } catch (error) {
    console.error('Error in fetchCollegesByKcetRank:', error);
    return [];
  }
}

// Get top ranked colleges (based on the new rank field)
export async function fetchTopRankedColleges(limit: number = 10): Promise<College[]> {
  try {
    const { data: collegesData, error: collegesError } = await supabase
      .from('colleges')
      .select('*')
      .order('rank', { ascending: true })
      .not('rank', 'is', null)
      .limit(limit);
    
    if (collegesError) {
      console.error('Error fetching top ranked colleges:', collegesError);
      throw new Error('Failed to fetch top ranked colleges');
    }
    
    // Get all college-degree relationships for these colleges
    const collegeIds = collegesData.map(college => college.id);
    
    const { data: collegeDegrees, error: relationshipError } = await supabase
      .from('college_degrees')
      .select('*')
      .in('college_id', collegeIds);

    if (relationshipError) {
      console.error('Error fetching college-degree relationships:', relationshipError);
      throw new Error('Failed to fetch college-degree relationships');
    }
    
    // Map Supabase college data to our College type
    const colleges: College[] = collegesData.map((college: CollegeFromSupabase) => {
      const mappedCollege = mapSupabaseToCollege(college);
      
      // Populate degreesOffered array
      mappedCollege.degreesOffered = collegeDegrees
        .filter(rel => rel.college_id === college.id)
        .map(rel => rel.degree_id);
      
      return mappedCollege;
    });
    
    return colleges;
  } catch (error) {
    console.error('Error in fetchTopRankedColleges:', error);
    return [];
  }
}
