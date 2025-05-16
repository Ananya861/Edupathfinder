
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { degrees, colleges } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CollegeCard } from "@/components/CollegeCard";
import { ChevronLeft } from "lucide-react";

const DegreeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const degreeId = parseInt(id || "0");
  const degree = degrees.find((d) => d.id === degreeId);
  
  // Find colleges offering this degree
  const collegesOfferingDegree = colleges.filter((college) =>
    college.degreesOffered.includes(degreeId)
  );

  if (!degree) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Degree Not Found</h1>
          <p className="mb-6">The degree you're looking for doesn't exist.</p>
          <Link to="/degrees">
            <Button>Return to Degrees</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/degrees" className="inline-flex items-center text-edu-primary hover:text-edu-dark mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Degrees
        </Link>
        
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Badge className="mb-4 bg-edu-secondary">{degree.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{degree.name}</h1>
            <div className="text-gray-500 mb-4">Duration: {degree.duration}</div>
            <p className="text-lg text-gray-600">{degree.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Eligibility Criteria</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {degree.eligibility.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Career Prospects</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {degree.careers.map((career, index) => (
                    <li key={index}>{career}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-2xl font-bold mb-6">Colleges Offering This Degree</h2>
          {collegesOfferingDegree.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collegesOfferingDegree.map((college) => (
                <CollegeCard 
                  key={college.id} 
                  college={college} 
                  degrees={degrees} 
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-6">
              No colleges currently offering this degree are listed in our database.
            </p>
          )}

          <div className="mt-12 text-center">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Interested in this degree program?</h3>
              <p className="text-gray-600 mb-4">Register to receive more information about admission requirements and opportunities.</p>
              <Link to="/register">
                <Button className="bg-edu-primary hover:bg-edu-dark">Register Now</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DegreeDetails;
