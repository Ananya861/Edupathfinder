
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EnhancedCollegeCard } from "./EnhancedCollegeCard";
import { motion } from "framer-motion";
import { Award, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { College } from "@/types/college";
import { Degree } from "@/types/degree";

interface TopCollegesProps {
  colleges: College[];
  degrees: Degree[];
}

export const TopColleges = ({ colleges, degrees }: TopCollegesProps) => {
  const [filter, setFilter] = useState<'cutoff' | 'trending'>('cutoff');
  
  // Get top colleges based on rank (cutoff)
  const cutoffColleges = [...colleges]
    .filter(college => college.rank)
    .sort((a, b) => (a.rank || 999) - (b.rank || 999))
    .slice(0, 3);
  
  // For trending, we'll simulate using a different criteria (could be student interest metric in real app)
  const trendingColleges = [...colleges]
    .filter(college => college.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  
  const displayedColleges = filter === 'cutoff' ? cutoffColleges : trendingColleges;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Top Colleges 2025</h2>
          <div className="flex space-x-2">
            <Button
              variant={filter === 'cutoff' ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter('cutoff')}
              className="flex items-center gap-1"
            >
              <Award className="h-4 w-4" />
              By Cutoff
            </Button>
            <Button
              variant={filter === 'trending' ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter('trending')}
              className="flex items-center gap-1"
            >
              <TrendingUp className="h-4 w-4" />
              Trending
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedColleges.map((college, index) => (
            <motion.div
              key={college.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <EnhancedCollegeCard college={college} degrees={degrees} />
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <Button asChild>
            <Link to="/colleges" className="flex items-center gap-2">
              Explore All Colleges
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
