
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface CollegeFeaturesProps {
  features: string[];
  className?: string;
}

export const CollegeFeatures = ({ features, className = "" }: CollegeFeaturesProps) => {
  if (!features || features.length === 0) return null;
  
  return (
    <Card className={className}>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-3">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="bg-green-100 p-1 rounded-full">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
