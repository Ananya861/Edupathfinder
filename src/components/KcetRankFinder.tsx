
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { fetchCollegesByKcetRank } from "@/api/supabaseService";
import { College } from "@/types/college";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, Search } from "lucide-react";

interface KcetRankFinderProps {
  onCollegesFound: (colleges: College[]) => void;
}

export function KcetRankFinder({ onCollegesFound }: KcetRankFinderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [kcetRank, setKcetRank] = useState<number | null>(null);
  const [category, setCategory] = useState('General');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const categories = ['General', 'SC', 'ST', 'OBC', '2A', '2B', '3A', '3B'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!kcetRank) {
      toast({
        title: "Error",
        description: "Please enter your KCET rank",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const colleges = await fetchCollegesByKcetRank(kcetRank, category);
      
      if (colleges.length === 0) {
        toast({
          title: "No Results",
          description: "No colleges found for the given rank. Please try a different rank or category.",
          variant: "default",
        });
      } else {
        onCollegesFound(colleges);
        setIsOpen(false);
        toast({
          title: "Colleges Found",
          description: `Found ${colleges.length} colleges matching your KCET rank.`,
        });
      }
    } catch (error) {
      console.error("Error fetching colleges by KCET rank:", error);
      toast({
        title: "Error",
        description: "Failed to fetch colleges. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="bg-white text-edu-primary hover:bg-gray-100 flex items-center gap-2 w-full sm:w-auto"
        >
          <Search className="w-5 h-5" />
          Find & Enter KCET Rank
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Find Colleges by KCET Rank</DialogTitle>
          <DialogDescription>
            Enter your KCET rank and category to find eligible colleges and courses
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="kcetRank">Your KCET Rank</Label>
            <Input 
              id="kcetRank" 
              type="number" 
              placeholder="e.g., 5000" 
              min="1"
              onChange={(e) => setKcetRank(parseInt(e.target.value) || null)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              value={category} 
              onValueChange={setCategory}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            type="submit" 
            className="w-full mt-4 bg-edu-primary hover:bg-edu-secondary"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Find Colleges"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
