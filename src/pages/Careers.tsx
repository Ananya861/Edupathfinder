
import { Layout } from "@/components/Layout";
import { degrees } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Briefcase, Search, PieChart, TrendingUp, ChevronRight } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface CareerPathway {
  career: string;
  relatedDegrees: number[];
  description: string;
  skills: string[];
  outlook: "Excellent" | "Good" | "Moderate";
}

const careerPathways: CareerPathway[] = [
  {
    career: "Software Developer",
    relatedDegrees: [1],
    description: "Design, develop, and maintain software applications and systems. Work on various stages of software development from requirements analysis to deployment.",
    skills: ["Programming", "Problem Solving", "System Design", "Testing", "Logical Thinking"],
    outlook: "Excellent"
  },
  {
    career: "Business Manager",
    relatedDegrees: [2, 6],
    description: "Oversee operations of a business or department, manage teams, implement strategies, and ensure organizational goals are met efficiently.",
    skills: ["Leadership", "Communication", "Strategic Planning", "Decision Making", "Financial Analysis"],
    outlook: "Good"
  },
  {
    career: "Medical Professional",
    relatedDegrees: [3],
    description: "Diagnose and treat illnesses, prescribe medications, perform medical procedures, and provide healthcare advice to patients.",
    skills: ["Clinical Knowledge", "Diagnostic Skills", "Communication", "Empathy", "Critical Thinking"],
    outlook: "Excellent"
  },
  {
    career: "Counselor/Psychologist",
    relatedDegrees: [4],
    description: "Provide psychological support, assessment, and therapy for individuals dealing with mental health issues, life challenges, or career decisions.",
    skills: ["Empathy", "Active Listening", "Analytical Skills", "Communication", "Emotional Intelligence"],
    outlook: "Good"
  },
  {
    career: "Research Scientist",
    relatedDegrees: [5, 7],
    description: "Conduct research to expand scientific knowledge, develop new technologies, materials, or methodologies in various fields of science.",
    skills: ["Analytical Thinking", "Research Methodology", "Data Analysis", "Technical Writing", "Creativity"],
    outlook: "Good"
  },
  {
    career: "Financial Analyst",
    relatedDegrees: [6, 8],
    description: "Analyze financial data, create financial models, evaluate investment opportunities, and provide recommendations for financial decisions.",
    skills: ["Quantitative Analysis", "Financial Modeling", "Market Research", "Critical Thinking", "Attention to Detail"],
    outlook: "Good"
  },
  {
    career: "Civil Engineer",
    relatedDegrees: [7],
    description: "Plan, design, and oversee construction projects such as buildings, roads, bridges, and water supply systems.",
    skills: ["Technical Knowledge", "Mathematics", "Design Skills", "Problem Solving", "Project Management"],
    outlook: "Good"
  },
  {
    career: "Economist",
    relatedDegrees: [8],
    description: "Study economic trends, analyze data, forecast market conditions, and provide recommendations on economic policies.",
    skills: ["Data Analysis", "Research", "Mathematical Skills", "Critical Thinking", "Communication"],
    outlook: "Moderate"
  }
];

const Careers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [visibleItems, setVisibleItems] = useState(4);

  useEffect(() => {
    setIsPageLoaded(true);
    
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 500) {
        if (visibleItems < filteredCareers.length) {
          setVisibleItems(prev => Math.min(prev + 2, filteredCareers.length));
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getRelatedDegreesNames = (relatedDegrees: number[]) => {
    return relatedDegrees.map(id => {
      const degree = degrees.find(d => d.id === id);
      return degree ? degree.name : "";
    });
  };

  const filteredCareers = careerPathways.filter(career =>
    career.career.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getRelatedDegreesNames(career.relatedDegrees).some(name => 
      name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getOutlookColor = (outlook: "Excellent" | "Good" | "Moderate") => {
    switch (outlook) {
      case "Excellent": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
      case "Good": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
      case "Moderate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100";
    }
  };

  const getOutlookIcon = (outlook: "Excellent" | "Good" | "Moderate") => {
    switch (outlook) {
      case "Excellent": return <TrendingUp size={16} className="mr-1" />;
      case "Good": return <PieChart size={16} className="mr-1" />;
      case "Moderate": return <ChevronRight size={16} className="mr-1" />;
      default: return null;
    }
  };

  return (
    <Layout>
      <section className="relative overflow-hidden py-12 bg-gradient-to-b from-transparent to-secondary/30 dark:to-secondary/10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJWMjJoMnY0em0tNCAyaC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0yVjZoMnY0em0tNCAxMmgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMlY2aDJ2NHptLTQgMTJoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJWNmgydjR6bS00IDEyaC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0yVjZoMnY0em0tNCAxMmgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6TTEyIDEwaC0yVjhoMnYyem0wIDRoLTJ2LTJoMnYyem0wLThoLTJWNGgydjJ6bTQgMGgtMlY0aDJ2MnptMCA0aC0yVjhoMnYyem0wIDRoLTJ2LTJoMnYyem0wLTEyaC0yVjBoMnY0em00IDBoLTJWMGgydjR6bTQgMGgtMlYwaDJ2NHptNCAwaC0yVjBoMnY0em00IDBoLTJWMGgydjR6bTQgMGgtMlYwaDJ2NHptNCAwaC0yVjBoMnY0em00IDBoLTJWMGgydjR6bTAgNGgtMlY0aDJ2NHptMCA0aC0yVjhoMnY0em0tNCAxMmgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMlY0aDJ2NHptLTQgMjBoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJWNGgydjR6bS00IDI0aC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0ydi0yaDJ2MnptMC00aC0yVjRoMnY0em0tNCAyNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMnYtMmgydjJ6bTAtNGgtMlY0aDJ2NHptLTQgMjRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJ2LTJoMnYyem0wLTRoLTJWNGgydjR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 dark:opacity-10 z-0" />
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transition-all duration-700 transform ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">
                Career Prospects
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
                Explore potential career paths and job opportunities associated with different degree programs.
              </p>
            </div>
            <div className={`max-w-lg mx-auto transition-all duration-700 delay-300 transform ${isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search for careers or degrees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-full border-gray-300 focus:border-edu-primary focus:ring focus:ring-edu-primary/20 shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="diagonal-divider absolute bottom-0 left-0 right-0 fill-white dark:fill-gray-900 opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M1200 120L0 16.48V0h1200v120z" className="fill-current text-white dark:text-gray-900"></path>
          </svg>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 staggered-fade-in">
            {filteredCareers.length > 0 ? (
              filteredCareers.slice(0, visibleItems).map((career, index) => (
                <Card key={index} className="card-3d border-transparent bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                  <CardHeader className="pb-2 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <div className="mr-3 p-2 rounded-full bg-edu-accent text-edu-accent-foreground">
                          <Briefcase size={20} />
                        </div>
                        <CardTitle className="text-xl">{career.career}</CardTitle>
                      </div>
                      <Badge className={`flex items-center ${getOutlookColor(career.outlook)}`}>
                        {getOutlookIcon(career.outlook)}
                        {career.outlook} Outlook
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{career.description}</p>
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Key Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map((skill, i) => (
                          <HoverCard key={i}>
                            <HoverCardTrigger>
                              <Badge key={i} className="bg-edu-accent text-edu-accent-foreground cursor-pointer transition-all hover:bg-edu-accent/80">
                                {skill}
                              </Badge>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-64 text-sm p-3">
                              <p className="text-gray-700 dark:text-gray-300">{skill} is a critical skill for success as a {career.career}.</p>
                            </HoverCardContent>
                          </HoverCard>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Related Degrees:</h4>
                      <div className="flex flex-wrap gap-2">
                        {getRelatedDegreesNames(career.relatedDegrees).map((name, i) => (
                          <Badge key={i} className="bg-edu-light text-edu-primary dark:bg-edu-primary/20 dark:text-edu-primary">
                            {name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400 text-lg">No matching career paths found.</p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-edu-primary hover:text-edu-primary/80 font-medium"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
          
          {visibleItems < filteredCareers.length && (
            <div className="text-center mt-8">
              <button 
                onClick={() => setVisibleItems(prev => Math.min(prev + 2, filteredCareers.length))}
                className="px-6 py-2 rounded-full bg-edu-primary text-white hover:bg-edu-primary/90 transition-all btn-shiny"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
