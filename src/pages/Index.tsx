import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { degrees, colleges } from "@/data/mockData";
import { DegreeCard } from "@/components/DegreeCard";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { StudentEligibilityForm, StudentDetails } from "@/components/StudentEligibilityForm";
import { getEligibleDegrees } from "@/utils/eligibilityFilter";
import { useToast } from "@/hooks/use-toast";
import { College } from "@/types/college";
import { fetchCollegesByKcetRank } from "@/api/supabaseService";
import { AnimatedIcons } from "@/components/AnimatedIcons";
import { TrendingCareers } from "@/components/TrendingCareers";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";
import { TopColleges } from "@/components/TopColleges";
import { CollegeCard } from "@/components/CollegeCard"; // Add this import

const Index = () => {
  const featuredDegrees = degrees.slice(0, 4);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [findingMatches, setFindingMatches] = useState(false);
  const [eligibleDegrees, setEligibleDegrees] = useState<typeof degrees>([]);
  const [matchingColleges, setMatchingColleges] = useState<typeof colleges>([]);
  const { toast } = useToast();

  // Add state for KCET rank based college results
  const [kcetColleges, setKcetColleges] = useState<College[]>([]);
  const [isKcetResults, setIsKcetResults] = useState(false);

  const handleEligibilitySubmit = async (details: StudentDetails) => {
    setFindingMatches(true);
    
    try {
      // Handle KCET rank search if provided
      if (details.kcetRank) {
        try {
          const colleges = await fetchCollegesByKcetRank(details.kcetRank, details.category || 'General');
          if (colleges && colleges.length > 0) {
            setKcetColleges(colleges);
            setIsKcetResults(true);
            setEligibleDegrees([]);
            setMatchingColleges([]);
            setFindingMatches(false);
            setIsDialogOpen(false);
            
            toast({
              title: "KCET Results Found",
              description: `Found ${colleges.length} colleges matching your KCET rank.`,
            });
            
            // Scroll to the results section
            document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
            return;
          } else {
            // If no colleges found by KCET rank, we'll fall back to regular eligibility matching
            toast({
              title: "No KCET Matches",
              description: "No colleges found for the given KCET rank. Showing eligibility-based results instead.",
              variant: "default",
            });
          }
        } catch (error) {
          console.error("Error fetching colleges by KCET rank:", error);
          // Continue with regular eligibility matching if KCET search fails
        }
      }
      
      // Regular eligibility matching
      // Find eligible degrees based on student details
      const eligible = getEligibleDegrees(degrees, details);
      setEligibleDegrees(eligible);
      
      // Get IDs of eligible degrees
      const eligibleDegreeIds = eligible.map(degree => degree.id);
      
      // Filter colleges that offer eligible degrees and match location preference
      const matching = colleges.filter(college => {
        const offersEligibleDegree = college.degreesOffered.some(degreeId => 
          eligibleDegreeIds.includes(degreeId)
        );
        
        const locationMatches = !details.preferredLocation || 
          college.location.toLowerCase().includes(details.preferredLocation.toLowerCase());
        
        return offersEligibleDegree && locationMatches;
      });
      
      setMatchingColleges(matching);
      setIsKcetResults(false); // Reset KCET results when using eligibility search
      
      toast({
        title: "Results Found",
        description: `Found ${matching.length} colleges and ${eligible.length} degree programs matching your profile.`,
      });
      
      setIsDialogOpen(false);
      
      // Scroll to the results section
      document.getElementById("results-section")?.scrollIntoView({ behavior: "smooth" });
    } finally {
      setFindingMatches(false);
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-edu-primary to-edu-secondary text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Perfect Academic Path After PUC
            </h1>
            <p className="text-xl mb-8">
              Explore degree options, eligibility criteria, and career prospects
              tailored to your interests and qualifications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-edu-primary hover:bg-gray-100"
                onClick={() => setIsDialogOpen(true)}
              >
                Find Your Path
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stream Icons */}
      <AnimatedIcons />

      {/* Results Section - Only shows after submitting the form */}
      {(eligibleDegrees.length > 0 || matchingColleges.length > 0 || kcetColleges.length > 0) && (
        <section className="py-16 bg-gray-50" id="results-section">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {isKcetResults ? "Colleges Based on Your KCET Rank" : "Your Personalized Academic Matches"}
            </h2>
            
            {!isKcetResults && eligibleDegrees.length > 0 && (
              <div className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Recommended Degree Programs</h3>
                  <Link to="/degrees" className="text-edu-primary hover:underline">
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {eligibleDegrees.slice(0, 4).map((degree) => (
                    <DegreeCard key={degree.id} degree={degree} />
                  ))}
                </div>
              </div>
            )}
            
            {!isKcetResults && matchingColleges.length > 0 && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Matching Colleges</h3>
                  <Link to="/colleges" className="text-edu-primary hover:underline">
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {matchingColleges.slice(0, 3).map((college) => (
                    <CollegeCard key={college.id} college={college} degrees={degrees} />
                  ))}
                </div>
              </div>
            )}
            
            {/* KCET Rank Based College Results */}
            {isKcetResults && kcetColleges.length > 0 && (
              <div>
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                  <p className="text-gray-600">
                    These colleges accept students with your KCET rank. Click on a college to view available courses.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {kcetColleges.map((college) => (
                    <CollegeCard key={college.id} college={college} degrees={degrees} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Featured Degrees */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Popular Degree Programs</h2>
            <Link to="/degrees" className="text-edu-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredDegrees.map((degree) => (
              <DegreeCard key={degree.id} degree={degree} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Trending Careers Section */}
      <TrendingCareers />
      
      {/* Top Colleges Section */}
      <TopColleges colleges={colleges} degrees={degrees} />

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose EduPathfinder?
            </h2>
            <p className="text-gray-600">
              We help students make informed decisions about their academic future with comprehensive information and personalized guidance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-edu-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-edu-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Comprehensive Database
              </h3>
              <p className="text-gray-600">
                Access information on hundreds of degree programs and colleges across India.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-edu-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-edu-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Verified Information
              </h3>
              <p className="text-gray-600">
                All details are verified and updated regularly to ensure accuracy and relevance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-edu-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-edu-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Career Guidance
              </h3>
              <p className="text-gray-600">
                Discover potential career paths and understand job prospects for each degree program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-16 bg-edu-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Find Your Perfect Academic Path?
            </h2>
            <p className="text-xl mb-8">
              Enter your academic details to get personalized degree and college recommendations tailored to your profile.
            </p>
            <Button 
              size="lg" 
              className="bg-white text-edu-primary hover:bg-gray-100"
              onClick={() => setIsDialogOpen(true)}
            >
              Find Courses & Colleges
            </Button>
          </div>
        </div>
      </section>

      {/* Dialog for Student Eligibility Form */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Enter Your Academic Details</DialogTitle>
            <DialogDescription>
              Provide your PUC stream, percentage, and optionally your KCET rank to find courses and colleges that match your profile.
            </DialogDescription>
          </DialogHeader>
          <StudentEligibilityForm
            onSubmit={handleEligibilitySubmit}
            isLoading={findingMatches}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Index;
