
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { College } from '@/types/college';
import { Degree } from '@/types/degree';
import { MapPin, Book, Star, Award, Building, ArrowRight } from "lucide-react";

interface CollegeCardProps {
  college: College;
  degrees?: Degree[];
}

export const EnhancedCollegeCard = ({ college, degrees = [] }: CollegeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Find degree names for this college
  const collegeDegreesMap = new Map();
  college.degreesOffered.forEach((degId) => {
    const degree = degrees.find(d => d.id === degId);
    if (degree) {
      collegeDegreesMap.set(degId, degree.name);
    }
  });
  
  const degreeNames = Array.from(collegeDegreesMap.values());
  const limitedDegrees = degreeNames.slice(0, 3);
  const hasMoreDegrees = degreeNames.length > 3;
  
  // Generate a random pastel color class for the card shine effect
  const pastelClasses = ['bg-pastel-blue', 'bg-pastel-teal', 'bg-pastel-yellow', 
                         'bg-pastel-amber', 'bg-pastel-orange', 'bg-pastel-pink', 'bg-pastel-purple'];
  const randomPastel = pastelClasses[college.id % pastelClasses.length] || pastelClasses[0];
  const shimmerClass = randomPastel.replace('bg-', 'from-') + '/30';

  return (
    <Card 
      className={`h-full flex flex-col relative overflow-hidden card-3d ${
        isHovered ? 'shadow-lg shadow-' + randomPastel.replace('bg-', '') + '/20' : 'shadow'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient border */}
      <div className={`absolute -inset-[1px] bg-gradient-to-r ${shimmerClass} to-transparent rounded-lg blur-sm opacity-0 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : ''
      }`}></div>
      
      {/* Card content */}
      <CardHeader className="p-0 overflow-hidden">
        <div className="relative h-48 w-full overflow-hidden group">
          <img 
            src={college.imageUrl} 
            alt={college.name} 
            className={`w-full h-full object-cover rounded-t-lg transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          {/* Overlay on hover */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}></div>
          
          {college.rank && (
            <div className="absolute top-3 right-3 bg-edu-primary text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
              <Award className="h-4 w-4" />
              <span className="font-bold">Rank #{college.rank}</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow p-4 z-10 bg-white dark:bg-gray-900">
        <div className="space-y-3">
          <Link to={`/college/${college.id}`} className="block">
            <h3 className={`font-semibold text-lg text-gray-900 dark:text-gray-100 line-clamp-2 transition-all duration-300 ${
              isHovered ? 'text-edu-primary transform translate-x-1' : ''
            }`}>
              {college.name}
            </h3>
          </Link>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-1 text-edu-secondary" />
            <span>{college.location}</span>
          </div>
          
          {college.affiliation && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Building className="h-4 w-4 mr-1 text-edu-secondary" />
              <span>{college.affiliation}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm">
            <Star className={`h-4 w-4 mr-1 text-yellow-500 fill-yellow-500 ${
              isHovered ? 'animate-pulse-gentle' : ''
            }`} />
            <span className="font-medium">{college.rating}</span>
            <span className="mx-2 text-gray-400">|</span>
            <span className="text-gray-600 dark:text-gray-400">{college.fees}</span>
          </div>
          
          {college.specialization && college.specialization.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Book className="h-4 w-4 mr-1 text-edu-secondary" />
                <span className="font-medium">Specializations:</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {college.specialization.slice(0, 3).map((spec, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className={`bg-gray-50 dark:bg-gray-800 transition-all duration-300 ${
                      isHovered ? 'scale-105' : ''
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    {spec}
                  </Badge>
                ))}
                {college.specialization.length > 3 && (
                  <Badge variant="outline" className="bg-gray-50 dark:bg-gray-800">
                    +{college.specialization.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}
          
          <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm">{college.description}</p>
        </div>
      </CardContent>
      
      <CardFooter className="border-t px-4 py-3 z-10 bg-white dark:bg-gray-900">
        <div className="w-full">
          <div className="flex flex-wrap gap-1">
            {limitedDegrees.map((degreeName, index) => (
              <Badge 
                key={index} 
                className={`bg-edu-light text-edu-primary transition-all duration-300 ${
                  isHovered ? 'translate-y-[-2px]' : ''
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {degreeName}
              </Badge>
            ))}
            {hasMoreDegrees && (
              <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                +{degreeNames.length - 3} more
              </Badge>
            )}
          </div>
          
          {/* View details button that appears on hover */}
          <div className={`mt-3 text-right transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <Link 
              to={`/college/${college.id}`} 
              className="inline-flex items-center text-sm font-medium text-edu-primary hover:text-edu-secondary"
            >
              View Details
              <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
