
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Degrees from "./pages/Degrees";
import DegreeDetails from "./pages/DegreeDetails";
import Colleges from "./pages/Colleges";
import CollegeDetails from "./pages/CollegeDetails";
import Eligibility from "./pages/Eligibility";
import Careers from "./pages/Careers";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import { RegistrationPopup } from "./components/RegistrationPopup";
import { ChatBox } from "./components/ChatBox";
import { initializeEmailJS } from "./utils/emailConfig";
import emailjs from 'emailjs-com';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});

// Add Google Fonts
const GoogleFonts = () => {
  useEffect(() => {
    // Create link element for Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);
  
  return null;
};

const App = () => {
  const [showRegistrationPopup, setShowRegistrationPopup] = useState(false);
  const [emailServiceInitialized, setEmailServiceInitialized] = useState(false);
  
  useEffect(() => {
    // Initialize EmailJS
    const initialized = initializeEmailJS();
    setEmailServiceInitialized(initialized);
    
    // Check system preference for dark mode
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDarkMode) {
      document.documentElement.classList.add("dark");
    }
    
    // Send website visit notification email
    const sendVisitNotification = async () => {
      if (!emailServiceInitialized && !initialized) {
        console.warn('EmailJS not initialized, cannot send visit notification');
        return;
      }
      
      try {
        const timestamp = new Date().toString();
        const browserInfo = navigator.userAgent;
        const pageUrl = window.location.href;
        
        const templateParams = {
          to_email: 'ananyama09@gmail.com',
          subject: 'New Website Visit on EduPathfinder',
          message: `Someone opened your website.\nTimestamp: ${timestamp}\nBrowser: ${browserInfo}\nURL: ${pageUrl}`,
        };
        
        await emailjs.send(
          'service_edupath',
          'template_chatrequest',
          templateParams,
          'lcoIppQEnR3Y1wMdM'
        );
        
        console.log('Website visit notification sent');
      } catch (error) {
        console.error('Error sending visit notification:', error);
      }
    };
    
    // Send the notification when the app loads, with multiple retries
    const maxRetries = 3;
    let retryCount = 0;
    
    const attemptSendNotification = () => {
      setTimeout(() => {
        sendVisitNotification().catch(() => {
          retryCount++;
          if (retryCount < maxRetries) {
            console.log(`Retrying visit notification (${retryCount}/${maxRetries})...`);
            attemptSendNotification();
          }
        });
      }, 1000 * (retryCount + 1)); // Increase delay with each retry
    };
    
    attemptSendNotification();
    
    // Show the registration popup after a delay when the app loads
    const timer = setTimeout(() => {
      setShowRegistrationPopup(true);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleFonts />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/degrees" element={<Degrees />} />
            <Route path="/degrees/:id" element={<DegreeDetails />} />
            <Route path="/colleges" element={<Colleges />} />
            <Route path="/colleges/:id" element={<CollegeDetails />} />
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/register" element={<Register />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <RegistrationPopup 
          open={showRegistrationPopup} 
          onOpenChange={setShowRegistrationPopup} 
        />
        <ChatBox />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
