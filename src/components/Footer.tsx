
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, ArrowUp, MessageCircle, MapPin, Book, Calendar, Link as LinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import emailjs from 'emailjs-com';

export function Footer() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const sendChatNotification = async () => {
    setIsLoading(true);
    
    try {
      // Prepare data to send
      const timestamp = new Date().toString();
      const browserInfo = navigator.userAgent;
      
      const templateParams = {
        to_email: 'ananyama09@gmail.com',
        subject: 'New Chat Request on EduPathfinder',
        message: `A user has opened the chat on the website.\nTimestamp: ${timestamp}\nBrowser Info: ${browserInfo}`,
      };
      
      // Send email using EmailJS
      const result = await emailjs.send(
        'service_edupath',
        'template_chatrequest',
        templateParams,
        'lcoIppQEnR3Y1wMdM'  // Updated to use the actual user ID
      );
      
      if (result.status === 200) {
        toast({
          title: "Chat request sent",
          description: "We'll respond to you shortly",
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending chat notification:', error);
      toast({
        title: "Couldn't send message",
        description: "Please try again or email us directly",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="relative">
      <div className="wave-divider">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-20 fill-white dark:fill-gray-900">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
      
      <div className="bg-white dark:bg-gray-900 pt-12 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-gradient mb-4">EduPathfinder</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Helping students make informed decisions about their academic future after PUC.
              </p>
              <button 
                onClick={scrollToTop}
                className="mt-4 group flex items-center text-edu-primary hover:text-purple-700 transition-all"
              >
                <ArrowUp className="h-4 w-4 mr-1 group-hover:-translate-y-1 transition-transform" />
                <span>Back to top</span>
              </button>
              
              <div className="mt-6 flex justify-center md:justify-start space-x-4">
                <a href="#" className="bg-edu-light p-2 rounded-full text-edu-primary hover:bg-edu-primary hover:text-white transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="bg-edu-light p-2 rounded-full text-edu-primary hover:bg-edu-primary hover:text-white transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="bg-edu-light p-2 rounded-full text-edu-primary hover:bg-edu-primary hover:text-white transition-colors">
                  <Instagram size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4 relative inline-block after:content-[''] after:block after:w-1/2 after:h-0.5 after:bg-edu-primary after:mt-1">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-edu-primary dark:hover:text-edu-primary transition-colors text-sm flex items-center group">
                    <LinkIcon className="mr-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link to="/degrees" className="text-gray-600 dark:text-gray-400 hover:text-edu-primary dark:hover:text-edu-primary transition-colors text-sm flex items-center group">
                    <Book className="mr-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Degrees</span>
                  </Link>
                </li>
                <li>
                  <Link to="/colleges" className="text-gray-600 dark:text-gray-400 hover:text-edu-primary dark:hover:text-edu-primary transition-colors text-sm flex items-center group">
                    <MapPin className="mr-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Colleges</span>
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-gray-600 dark:text-gray-400 hover:text-edu-primary dark:hover:text-edu-primary transition-colors text-sm flex items-center group">
                    <Calendar className="mr-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Register</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4 relative inline-block after:content-[''] after:block after:w-1/2 after:h-0.5 after:bg-edu-primary after:mt-1">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/eligibility" className="text-gray-600 dark:text-gray-400 hover:text-edu-primary dark:hover:text-edu-primary transition-colors text-sm flex items-center group">
                    <Book className="mr-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Eligibility Criteria</span>
                  </Link>
                </li>
                <li>
                  <Link to="/careers" className="text-gray-600 dark:text-gray-400 hover:text-edu-primary dark:hover:text-edu-primary transition-colors text-sm flex items-center group">
                    <Book className="mr-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>Career Prospects</span>
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-gray-600 dark:text-gray-400 hover:text-edu-primary dark:hover:text-edu-primary transition-colors text-sm flex items-center group">
                    <Book className="mr-2 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>FAQ</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4 relative inline-block after:content-[''] after:block after:w-1/2 after:h-0.5 after:bg-edu-primary after:mt-1">Contact</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                Email: ananyama09@gmail.com
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Phone: +91 8618714564
              </p>
              
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} EduPathfinder. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
