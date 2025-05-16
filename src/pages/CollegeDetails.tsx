
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { colleges, degrees } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";

const CollegeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const collegeId = parseInt(id || "0");
  const college = colleges.find((c) => c.id === collegeId);
  
  if (!college) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">College Not Found</h1>
          <p className="mb-6">The college you're looking for doesn't exist.</p>
          <Link to="/colleges">
            <Button>Return to Colleges</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const offeredDegrees = degrees.filter((degree) => 
    college.degreesOffered.includes(degree.id)
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/colleges" className="inline-flex items-center text-edu-primary hover:text-edu-dark mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Colleges
        </Link>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{college.name}</h1>
              <div className="flex items-center mb-4">
                <div className="text-gray-500 mr-6">{college.location}</div>
                <div className="flex items-center bg-yellow-100 px-2 py-1 rounded text-sm">
                  <svg
                    className="h-4 w-4 text-yellow-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {college.rating} / 5.0
                </div>
              </div>
              <p className="text-lg text-gray-600 mb-6">{college.description}</p>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Fee Structure</h2>
                <p className="text-gray-600">{college.fees}</p>
              </div>
            </div>
            <div>
              <div className="rounded-lg overflow-hidden mb-6">
                <img
                  src={college.imageUrl}
                  alt={college.name}
                  className="w-full h-auto"
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <h3 className="font-semibold mb-2">Interested in this college?</h3>
                <Link to="/register">
                  <Button className="bg-edu-primary hover:bg-edu-dark w-full">Register for More Info</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Degree Programs Offered</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {offeredDegrees.map((degree) => (
                <Link key={degree.id} to={`/degrees/${degree.id}`}>
                  <Card className="edu-card-hover h-full">
                    <CardContent className="p-6">
                      <Badge className="mb-2 bg-edu-secondary w-fit">{degree.category}</Badge>
                      <h3 className="text-xl font-semibold mb-2">{degree.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">Duration: {degree.duration}</p>
                      <p className="text-gray-600">{degree.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          <Card className="mb-12">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Campus Facilities</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Academic Facilities</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Modern classrooms</li>
                    <li>Well-equipped laboratories</li>
                    <li>Digital library</li>
                    <li>Research centers</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Sports &amp; Recreation</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Sports complex</li>
                    <li>Gymnasium</li>
                    <li>Indoor games</li>
                    <li>Cultural center</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Student Services</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Career counseling</li>
                    <li>Placement assistance</li>
                    <li>Cafeteria</li>
                    <li>Health center</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Address</h3>
                  <p className="text-gray-600">
                    {college.name},<br />
                    {college.location}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Get in Touch</h3>
                  <p className="text-gray-600 mb-1">Phone: +91 9876543210</p>
                  <p className="text-gray-600 mb-1">Email: admissions@{college.name.toLowerCase().replace(/\s/g, "")}.edu.in</p>
                  <p className="text-gray-600">Website: www.{college.name.toLowerCase().replace(/\s/g, "")}.edu.in</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CollegeDetails;
