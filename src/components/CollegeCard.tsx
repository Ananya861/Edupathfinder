
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { College } from "@/types/college";
import { Degree } from "@/types/degree";
import { MapPin, GraduationCap, Star } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CollegeCardProps {
  college: College;
  degrees?: Degree[]; // Make degrees optional
}

export function CollegeCard({ college, degrees = [] }: CollegeCardProps) {
  // Default to empty array if degrees is not provided
  const degreesOffered = college.degreesOffered.map(
    (id) => degrees.find((degree) => degree.id === id)?.name || "Degree #" + id
  ).filter(name => name !== "");

  // Check if the college is in Bangalore
  const isBangaloreCollege = college.location.toLowerCase().includes("bangalore") || 
                            college.location.toLowerCase().includes("bengaluru");

  // Format rating to display stars
  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating)
                ? "text-yellow-500 fill-yellow-500"
                : i < rating
                ? "text-yellow-500 fill-yellow-500 opacity-50"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-semibold">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <Link to={`/colleges/${college.id}`}>
      <Card className={`h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-gray-200 ${college.isFeatured ? 'ring-2 ring-edu-primary ring-offset-2' : ''}`}>
        <div className="relative overflow-hidden">
          <AspectRatio ratio={16 / 10}>
            <img
              src={college.imageUrl}
              alt={college.name}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </AspectRatio>
          {isBangaloreCollege && (
            <Badge className="absolute top-3 right-3 bg-edu-primary text-white">
              Bangalore
            </Badge>
          )}
          {college.isFeatured && (
            <Badge className="absolute top-3 left-3 bg-yellow-500 text-white">
              Featured
            </Badge>
          )}
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg text-gray-900">{college.name}</CardTitle>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPin className="h-4 w-4 mr-1 text-gray-400" />
            {college.location}
          </div>
          <div className="mt-1">
            {renderRatingStars(college.rating)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-3">
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700">Fees:</span>
              <span className="text-sm text-gray-600 ml-1">{college.fees}</span>
            </div>
          </div>
          <div className="mb-3">
            <div className="flex items-start">
              <GraduationCap className="h-4 w-4 mr-1 mt-0.5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Programs:</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {degreesOffered.slice(0, 2).map((degree, index) => (
                <Badge key={index} className="bg-edu-light text-edu-primary">
                  {degree}
                </Badge>
              ))}
              {degreesOffered.length > 2 && (
                <Badge className="bg-edu-light text-edu-primary">
                  +{degreesOffered.length - 2} more
                </Badge>
              )}
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-600 line-clamp-2">
            {college.description.substring(0, 100)}
            {college.description.length > 100 ? "..." : ""}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
