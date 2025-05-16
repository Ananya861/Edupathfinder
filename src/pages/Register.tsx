
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { registerStudent } from "@/api/students";
import emailjs from 'emailjs-com';

const Register = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    agreeToTerms: false,
  });

  const validateForm = () => {
    const errors = {
      name: formData.name.trim() === "",
      email: !/\S+@\S+\.\S+/.test(formData.email),
      password: formData.password.length < 6,
      confirmPassword: formData.password !== formData.confirmPassword,
      agreeToTerms: !formData.agreeToTerms,
    };
    
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when field is edited
    if (field in formErrors && formErrors[field as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: false }));
    }
  };

  const sendRegistrationEmail = async (studentData: any) => {
    try {
      console.log('Attempting to send registration email from Register page...');
      
      const templateParams = {
        to_email: 'ananyama09@gmail.com',
        subject: 'New Student Registration on EduPathfinder',
        message: `A new student has registered:\nName: ${studentData.name}\nEmail: ${studentData.email}`,
      };
      
      await emailjs.send(
        'service_edupath',
        'template_chatrequest',
        templateParams,
        'lcoIppQEnR3Y1wMdM'
      );
      
      console.log('Registration notification email sent successfully from Register page');
      return true;
    } catch (emailError) {
      console.error('Error sending registration notification email from Register page:', emailError);
      // Try again with a delay
      try {
        console.log('Retrying email send from Register page...');
        setTimeout(async () => {
          const templateParams = {
            to_email: 'ananyama09@gmail.com',
            subject: 'New Student Registration on EduPathfinder',
            message: `A new student has registered:\nName: ${studentData.name}\nEmail: ${studentData.email}`,
          };
          
          await emailjs.send(
            'service_edupath',
            'template_chatrequest',
            templateParams,
            'lcoIppQEnR3Y1wMdM'
          );
          console.log('Registration email sent on retry from Register page');
        }, 1500);
      } catch (retryError) {
        console.error('Error sending registration email on retry from Register page:', retryError);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setSubmitting(true);
        
        // Create registration data with default values for required fields
        const studentData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: "0000000000", // Default phone
          pucStream: "science", // Default stream
          pucPercentage: 0, // Default percentage
          preferredDegree: "",
          preferredLocation: "",
          notes: ""
        };
        
        let apiSuccess = false;
        // Try to send registration to API
        try {
          await registerStudent(studentData);
          apiSuccess = true;
          console.log("API registration successful from Register page");
        } catch (apiError) {
          console.error("API registration failed from Register page:", apiError);
          // Continue with email notification even if API fails
        }
        
        // Send notification email about new registration
        const emailSent = await sendRegistrationEmail(studentData);
        
        if (apiSuccess || emailSent) {
          toast({
            title: "Registration Successful!",
            description: "Thank you for registering. We will contact you with more information about your educational options.",
          });
          
          // Reset form
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            agreeToTerms: false,
          });
        } else {
          // Both API and email failed
          toast({
            title: "Registration processed",
            description: "Your information has been received. We'll contact you soon.",
          });
        }
      } catch (error) {
        console.error("Registration process failed from Register page:", error);
        toast({
          title: "Registration Issue",
          description: "There was a problem with your registration. Please try again or contact support.",
          variant: "destructive",
        });
      } finally {
        setSubmitting(false);
      }
    } else {
      toast({
        title: "Form has errors",
        description: "Please correct the highlighted fields and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Register for Personalized Guidance
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              Fill out the form below and our education counselors will contact you with tailored recommendations for your academic journey.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={formErrors.name ? "border-red-500" : ""}
                    />
                    {formErrors.name && <p className="text-red-500 text-sm">Please enter your name</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && <p className="text-red-500 text-sm">Please enter a valid email</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      className={formErrors.password ? "border-red-500" : ""}
                    />
                    {formErrors.password && <p className="text-red-500 text-sm">Password must be at least 6 characters</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password <span className="text-red-500">*</span></Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange("confirmPassword", e.target.value)}
                      className={formErrors.confirmPassword ? "border-red-500" : ""}
                    />
                    {formErrors.confirmPassword && <p className="text-red-500 text-sm">Passwords do not match</p>}
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleChange("agreeToTerms", Boolean(checked))}
                    className={formErrors.agreeToTerms ? "border-red-500" : ""}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the terms and conditions <span className="text-red-500">*</span>
                    </Label>
                    {formErrors.agreeToTerms && <p className="text-red-500 text-sm">You must agree to the terms</p>}
                    <p className="text-sm text-gray-500">
                      By registering, you agree to receive educational information and guidance from EduPathfinder.
                    </p>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-edu-primary hover:bg-edu-dark"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Registration"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
