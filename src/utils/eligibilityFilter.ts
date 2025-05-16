
import { College } from "@/types/college";
import { Degree } from "@/types/degree";
import type { StudentDetails } from "@/components/StudentEligibilityForm";

// Function to determine if a student is eligible for a degree based on PUC stream and percentage
export function isEligibleForDegree(degree: Degree, details: StudentDetails): boolean {
  // Check if degree eligibility criteria mentions the student's stream
  const streamMatches = degree.eligibility.some(criterion => 
    criterion.toLowerCase().includes(details.pucStream.toLowerCase())
  );
  
  // Extract percentage requirement from eligibility criteria
  const percentageRequirement = degree.eligibility.reduce((req, criterion) => {
    const percentageMatch = criterion.match(/minimum\s+(\d+)%/i);
    if (percentageMatch) {
      const percentage = parseInt(percentageMatch[1]);
      return Math.max(req, percentage);
    }
    return req;
  }, 0);
  
  // Special handling for specific degree categories
  switch (degree.category.toLowerCase()) {
    case "engineering & technology":
      // Engineering typically requires Science stream with PCM
      if (details.pucStream !== "science") {
        return false;
      }
      break;
    case "medical & health sciences":
      // Medical typically requires Science stream with PCB
      if (details.pucStream !== "scienceBio") {
        return false;
      }
      break;
    case "commerce & finance":
      // Commerce degrees typically prefer commerce stream
      if (details.pucStream !== "commerce" && !streamMatches) {
        // Allow if explicitly mentioned in eligibility
        return false;
      }
      break;
  }

  // Check percentage requirement
  return details.pucPercentage >= percentageRequirement;
}

// Filter degrees based on student eligibility
export function getEligibleDegrees(degrees: Degree[], details: StudentDetails): Degree[] {
  return degrees.filter(degree => isEligibleForDegree(degree, details));
}

// Filter colleges based on eligible degrees and location preference
export function getEligibleColleges(
  colleges: College[],
  eligibleDegreeIds: number[],
  preferredLocation?: string
): College[] {
  return colleges.filter(college => {
    // Check if college offers at least one eligible degree
    const offersEligibleDegree = college.degreesOffered.some(degreeId => 
      eligibleDegreeIds.includes(degreeId)
    );
    
    // Check location preference if specified
    const locationMatches = !preferredLocation || 
      college.location.toLowerCase().includes(preferredLocation.toLowerCase());
    
    return offersEligibleDegree && locationMatches;
  });
}
