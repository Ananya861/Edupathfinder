
export interface College {
  id: number;
  name: string;
  location: string;
  description: string;
  rating: number;
  fees: string;
  imageUrl: string;
  degreesOffered: number[];
  isFeatured?: boolean;
  collegeCode?: string;
  specialization?: string[];
  rank?: number;
  affiliation?: string;
  features?: string[];
}
