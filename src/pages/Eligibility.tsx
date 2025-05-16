
import { Layout } from "@/components/Layout";
import { degrees } from "@/data/mockData";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Eligibility = () => {
  // Group degrees by category
  const degreesByCategory = degrees.reduce((acc, degree) => {
    if (!acc[degree.category]) {
      acc[degree.category] = [];
    }
    acc[degree.category].push(degree);
    return acc;
  }, {} as Record<string, typeof degrees>);

  const categories = Object.keys(degreesByCategory);

  return (
    <Layout>
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Eligibility Criteria
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Learn about the academic requirements and qualifications needed for various degree programs after PUC.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Understanding Eligibility Requirements
              </h2>
              <Card className="p-6">
                <p className="text-gray-600 mb-4">
                  Eligibility criteria for higher education programs typically include:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4">
                  <li><span className="font-medium">Academic Prerequisites</span>: Minimum percentage/grades in PUC or qualifying exams</li>
                  <li><span className="font-medium">Subject Requirements</span>: Specific subjects that should be studied in PUC</li>
                  <li><span className="font-medium">Entrance Exams</span>: National or institution-specific entrance tests</li>
                  <li><span className="font-medium">Additional Requirements</span>: Interviews, portfolio submissions, etc., as applicable</li>
                </ul>
                <p className="text-gray-600">
                  Below, you'll find the specific eligibility criteria for various degree programs categorized by field of study.
                </p>
              </Card>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {categories.map((category, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-md overflow-hidden">
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                    <h3 className="text-xl font-semibold">{category}</h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-6">
                      {degreesByCategory[category].map((degree) => (
                        <div key={degree.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                          <h4 className="text-lg font-semibold mb-2">{degree.name}</h4>
                          <p className="text-gray-600 mb-2">{degree.description}</p>
                          <h5 className="font-medium text-gray-900 mt-4 mb-2">Eligibility Requirements:</h5>
                          <ul className="list-disc list-inside space-y-1 text-gray-600">
                            {degree.eligibility.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                          <div className="mt-4">
                            <h5 className="font-medium text-gray-900 mb-2">Career Prospects:</h5>
                            <div className="flex flex-wrap gap-2">
                              {degree.careers.map((career, i) => (
                                <Badge key={i} className="bg-edu-light text-edu-primary">
                                  {career}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Eligibility;
