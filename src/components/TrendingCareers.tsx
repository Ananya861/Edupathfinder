
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Star } from "lucide-react";

const careerData = [
  {
    title: "Data Science",
    growth: "34% growth",
    salary: "₹8-15 LPA",
    skills: ["Python", "Machine Learning", "Statistics"],
    rating: 4.8,
    color: "bg-pastel-blue"
  },
  {
    title: "UI/UX Design",
    growth: "28% growth",
    salary: "₹6-12 LPA",
    skills: ["Figma", "Adobe XD", "User Research"],
    rating: 4.5,
    color: "bg-pastel-pink"
  },
  {
    title: "Cybersecurity",
    growth: "32% growth",
    salary: "₹9-18 LPA",
    skills: ["Network Security", "Cryptography", "Ethical Hacking"],
    rating: 4.7,
    color: "bg-pastel-yellow"
  },
  {
    title: "AI Engineering",
    growth: "42% growth",
    salary: "₹10-20 LPA",
    skills: ["TensorFlow", "Neural Networks", "NLP"],
    rating: 4.9,
    color: "bg-pastel-teal"
  }
];

export const TrendingCareers = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Trending Careers</h2>
          <Badge className="bg-edu-secondary flex items-center gap-1">
            <TrendingUp className="h-4 w-4" /> Hot Career Paths
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {careerData.map((career, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card className={`border-t-4 ${career.color} overflow-hidden h-full`}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{career.title}</CardTitle>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{career.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-green-600 mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    <span>{career.growth}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">Average Salary: {career.salary}</p>
                  <div className="flex flex-wrap gap-2">
                    {career.skills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="bg-white">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
