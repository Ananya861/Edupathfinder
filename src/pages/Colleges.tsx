
import { Layout } from "@/components/Layout";
import { CollegeCard } from "@/components/CollegeCard";
import { colleges, degrees } from "@/data/mockData";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, MapPin, School } from "lucide-react";
import { AnimatedIcons } from "@/components/AnimatedIcons";
import { TopColleges } from "@/components/TopColleges";
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel";

const Colleges = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [affiliationFilter, setAffiliationFilter] = useState("");
  const [sortBy, setSortBy] = useState("rank");

  // Extract unique locations and affiliations for filters
  const locations = [...new Set(colleges.map((college) => college.location))];
  const affiliations = [...new Set(colleges.filter(college => college.affiliation).map((college) => college.affiliation as string))];

  // Filter colleges based on search term, location and affiliation
  const filteredColleges = colleges.filter((college) => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (college.description && college.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLocation = locationFilter === "" || college.location === locationFilter;
    const matchesAffiliation = affiliationFilter === "" || college.affiliation === affiliationFilter;
    
    return matchesSearch && matchesLocation && matchesAffiliation;
  });

  // Sort colleges based on selected sort option
  const sortedColleges = [...filteredColleges].sort((a, b) => {
    if (sortBy === "rank") {
      return (a.rank || 999) - (b.rank || 999);
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  return (
    <Layout>
      {/* Banner */}
      <section className="bg-gradient-to-r from-edu-primary to-edu-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Discover Top Colleges</h1>
            <p className="text-lg">
              Explore India's leading educational institutions to find the perfect match for your academic journey
            </p>
          </div>
        </div>
      </section>

      <AnimatedIcons />

      {/* Top Colleges Feature */}
      <TopColleges colleges={colleges} degrees={degrees} />

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-grow relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search colleges by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <div className="w-full sm:w-auto flex items-center gap-2">
                  <MapPin size={18} className="text-edu-secondary" />
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-locations">All Locations</SelectItem>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full sm:w-auto flex items-center gap-2">
                  <School size={18} className="text-edu-secondary" />
                  <Select value={affiliationFilter} onValueChange={setAffiliationFilter}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Affiliation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-affiliations">All Affiliations</SelectItem>
                      {affiliations.map((affiliation) => (
                        <SelectItem key={affiliation} value={affiliation}>
                          {affiliation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full sm:w-auto flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-edu-secondary" />
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rank">Rank</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="name">Name</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={() => {
                  setSearchTerm("");
                  setLocationFilter("");
                  setAffiliationFilter("");
                }}>
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* College List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedColleges.length > 0 ? (
              sortedColleges.map((college) => (
                <CollegeCard key={college.id} college={college} degrees={degrees} />
              ))
            ) : (
              <div className="col-span-full py-16 text-center">
                <h3 className="text-xl font-semibold text-gray-800">No colleges found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search term.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* CTA Section */}
      <section className="py-16 bg-edu-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need Help Choosing a College?</h2>
            <p className="text-lg mb-8">Our educational counselors can guide you through the selection process based on your academic profile and career goals.</p>
            <Button className="bg-white text-edu-primary hover:bg-gray-100">
              Talk to a Counselor
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Colleges;
