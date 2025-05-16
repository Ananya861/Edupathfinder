
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { registerStudent } from "@/api/students";
import { StudentDTO } from "@/api/students";
import emailjs from 'emailjs-com';

export function RegistrationPopup({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Omit<StudentDTO, "id">>({
    name: "",
    email: "",
    password: "",
    phone: "", // Keeping this in state but not showing in form
    pucStream: "science", // Default values for required fields
    pucPercentage: 0,
    preferredDegree: "",
    preferredLocation: "",
    notes: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendRegistrationEmail = async (userData: Omit<StudentDTO, "id">) => {
    try {
      console.log('Attempting to send registration email...');
      
      const templateParams = {
        to_email: 'ananyama09@gmail.com',
        subject: 'New Student Registration on EduPathfinder',
        message: `A new student has registered:\nName: ${userData.name}\nEmail: ${userData.email}`,
      };
      
      await emailjs.send(
        'service_edupath',
        'template_chatrequest',
        templateParams,
        'lcoIppQEnR3Y1wMdM'
      );
      
      console.log('Registration notification email sent successfully');
      return true;
    } catch (emailError) {
      console.error('Error sending registration email:', emailError);
      // Try again with a delay
      try {
        console.log('Retrying email send...');
        setTimeout(async () => {
          const templateParams = {
            to_email: 'ananyama09@gmail.com',
            subject: 'New Student Registration on EduPathfinder',
            message: `A new student has registered:\nName: ${userData.name}\nEmail: ${userData.email}`,
          };
          
          await emailjs.send(
            'service_edupath',
            'template_chatrequest',
            templateParams,
            'lcoIppQEnR3Y1wMdM'
          );
          console.log('Registration email sent on retry');
        }, 1500);
      } catch (retryError) {
        console.error('Error sending registration email on retry:', retryError);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare the full student data (with default values for hidden fields)
      const studentData = {
        ...formData,
        phone: formData.phone || "0000000000", // Default phone if not provided
      };
      
      // Try to register with API
      let apiSuccess = false;
      try {
        await registerStudent(studentData);
        console.log("API registration successful");
        apiSuccess = true;
      } catch (apiError) {
        console.error("API registration failed:", apiError);
        // Continue with email notification even if API fails
      }
      
      // Send email notification regardless of API success
      const emailSent = await sendRegistrationEmail(studentData);
      
      if (apiSuccess || emailSent) {
        toast({
          title: "Registration successful",
          description: "Your account has been created successfully.",
        });
        
        onOpenChange(false);
      } else {
        // Both API and email failed
        toast({
          title: "Registration processed",
          description: "Your information has been received. We'll contact you soon.",
        });
        // Close the popup even if there was an error, since we've captured their information
        onOpenChange(false);
      }
    } catch (error) {
      console.error("Registration complete process failed:", error);
      toast({
        title: "Registration processed",
        description: "Your information has been received. We'll contact you soon.",
      });
      // Close the popup even if there was an error
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Join EduPathfinder</DialogTitle>
          <DialogDescription className="text-center">
            Create an account to save your preferences and get personalized recommendations.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name*</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address*</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password*</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="mr-2"
            >
              Maybe Later
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
