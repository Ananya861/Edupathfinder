
import { Degree } from "@/types/degree";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface DegreeCardProps {
  degree: Degree;
}

export function DegreeCard({ degree }: DegreeCardProps) {
  return (
    <Link to={`/degrees/${degree.id}`}>
      <Card className="h-full edu-card-hover">
        <CardHeader className="pb-2">
          <Badge className="mb-2 bg-edu-secondary w-fit">{degree.category}</Badge>
          <CardTitle className="text-lg">{degree.name}</CardTitle>
          <div className="text-sm text-gray-500">Duration: {degree.duration}</div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 line-clamp-3">{degree.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {degree.careers.slice(0, 3).map((career, index) => (
              <Badge key={index} className="bg-edu-light text-edu-primary">
                {career}
              </Badge>
            ))}
            {degree.careers.length > 3 && (
              <Badge className="bg-edu-light text-edu-primary">
                +{degree.careers.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
