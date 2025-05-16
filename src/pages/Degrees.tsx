
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { DegreeCard } from "@/components/DegreeCard";
import { fetchDegrees } from "@/api/degrees";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Degree } from "@/types/degree";
import { getDegrees } from "@/utils/mockDataFallback";
import { StudentEligibilityForm, StudentDetails } from "@/components/StudentEligibilityForm";
import { getEligibleDegrees } from "@/utils/eligibilityFilter";

const Degrees = () => {
  const { toast } = useToast();
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [filteredDegrees, setFilteredDegrees] = useState<Degree[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEligibilityForm, setShowEligibilityForm] = useState(false);
  const [isEligibilityMode, setIsEligibilityMode] = useState(false);
  const [studentDetails, setStudentDetails] = useState<StudentDetails | null>(null);
  const [findingMatches, setFindingMatches] = useState(false);

  // Load degrees data
  useEffect(() => {
    const loadDegrees = async () => {
      try {
        setLoading(true);
        // Using our fallback utility to get data with mock data as fallback
        const data = await getDegrees(fetchDegrees);
        setDegrees(data);
        setFilteredDegrees(data);
      } catch (error) {
        console.error("Error loading degrees:", error);
        toast({
          title: "Notice",
          description: "Using mock data since the API server is not available.",
          variant: "default",
        });
      } finally {
        setLoading(false);
      }
    };

    loadDegrees();
  }, [toast]);

  // Get unique categories from degrees
  const categories = Array.from(new Set(degrees.map((degree) => degree.category)));

  // Filter degrees when search term or category changes
  useEffect(() => {
    // Skip if in eligibility mode
    if (isEligibilityMode) return;
    
    const filtered = degrees.filter((degree) => {
      const matchesSearch = degree.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        degree.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || degree.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
    setFilteredDegrees(filtered);
  }, [searchTerm, categoryFilter, degrees, isEligibilityMode]);

  // Handle student eligibility form submission
  const handleEligibilitySubmit = (details: StudentDetails) => {
    setFindingMatches(true);
    
    try {
      // Find eligible degrees based on student details
      const eligible = getEligibleDegrees(degrees, details);
      
      setFilteredDegrees(eligible);
      setStudentDetails(details);
      setIsEligibilityMode(true);
      
      toast({
        title: "Results Found",
        description: `Found ${eligible.length} degree programs matching your profile.`,
      });
      
      // Hide the form after submission
      setShowEligibilityForm(false);
    } finally {
      setFindingMatches(false);
    }
  };

  // Reset eligibility filtering
  const resetEligibilityFilter = () => {
    setIsEligibilityMode(false);
    setStudentDetails(null);
    setShowEligibilityForm(false);
    
    // Restore normal filtering
    let filtered = degrees.filter((degree) => {
      const matchesSearch = degree.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        degree.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || degree.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
    
    setFilteredDegrees(filtered);
  };

  return (
    <Layout>
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Explore Degree Programs
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Discover various degree options available after your PUC and find the right path for your future.
            </p>
            
            {/* Search options - simplified */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
              <Button 
                variant={!isEligibilityMode ? "default" : "outline"} 
                className={!isEligibilityMode ? "bg-edu-primary text-white" : "text-edu-primary"} 
                onClick={() => {
                  if (isEligibilityMode) {
                    resetEligibilityFilter();
                  } else {
                    setShowEligibilityForm(false);
                  }
                }}
              >
                Standard Search
              </Button>
              <Button 
                variant={isEligibilityMode || showEligibilityForm ? "default" : "outline"} 
                className={isEligibilityMode || showEligibilityForm ? "bg-edu-primary text-white" : "text-edu-primary"}
                onClick={() => {
                  if (!isEligibilityMode && !showEligibilityForm) {
                    setShowEligibilityForm(true);
                  }
                }}
              >
                Eligibility-Based Search
              </Button>
            </div>
            
            {showEligibilityForm ? (
              <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Enter Your Academic Details</h3>
                <StudentEligibilityForm 
                  onSubmit={handleEligibilitySubmit}
                  isLoading={findingMatches}
                />
              </div>
            ) : !isEligibilityMode ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Input
                    type="text"
                    placeholder="Search for degree programs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <Select
                    value={categoryFilter}
                    onValueChange={(value) => setCategoryFilter(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your Academic Profile</h3>
                    <div className="space-y-1 text-gray-700">
                      <p><span className="font-medium">PUC Stream:</span> {studentDetails?.pucStream === "science" ? "Science (PCM)" : 
                                                   studentDetails?.pucStream === "scienceBio" ? "Science (PCB)" : 
                                                   studentDetails?.pucStream === "commerce" ? "Commerce" : "Arts"}</p>
                      <p><span className="font-medium">PUC Percentage:</span> {studentDetails?.pucPercentage}%</p>
                      {studentDetails?.kcetRank && (
                        <p><span className="font-medium">KCET Rank:</span> {studentDetails.kcetRank}</p>
                      )}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setShowEligibilityForm(true);
                      setIsEligibilityMode(false);
                    }}
                    className="text-gray-700"
                  >
                    Modify Details
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isEligibilityMode && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Degrees Matching Your Profile</h2>
                <Button onClick={resetEligibilityFilter} variant="outline">
                  Clear Filter
                </Button>
              </div>
            </div>
          )}
          
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-edu-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
              <p className="text-gray-500 text-lg mt-4">Loading degrees...</p>
            </div>
          ) : filteredDegrees.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredDegrees.map((degree) => (
                <DegreeCard key={degree.id} degree={degree} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No matching degree programs found.</p>
              <Button onClick={resetEligibilityFilter} variant="outline" className="mt-4">
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Degrees;
