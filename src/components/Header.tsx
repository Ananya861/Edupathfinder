
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Home, Sun, Moon, Menu, X } from "lucide-react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(document.documentElement.classList.contains("dark") || prefersDarkMode);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <span className="text-2xl font-bold text-gradient animate-pulse-gentle">
                EduPathfinder
              </span>
              <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">✨</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-gray-700 dark:text-gray-300 hover:text-edu-primary transition-colors flex items-center gap-1 link-underline ${location.pathname === '/' ? 'font-medium text-edu-primary' : ''}`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link 
              to="/degrees" 
              className={`text-gray-700 dark:text-gray-300 hover:text-edu-primary transition-colors link-underline ${location.pathname === '/degrees' ? 'font-medium text-edu-primary' : ''}`}
            >
              Degrees
            </Link>
            <Link 
              to="/colleges" 
              className={`text-gray-700 dark:text-gray-300 hover:text-edu-primary transition-colors link-underline ${location.pathname === '/colleges' ? 'font-medium text-edu-primary' : ''}`}
            >
              Colleges
            </Link>
            <Link 
              to="/eligibility" 
              className={`text-gray-700 dark:text-gray-300 hover:text-edu-primary transition-colors link-underline ${location.pathname === '/eligibility' ? 'font-medium text-edu-primary' : ''}`}
            >
              Eligibility
            </Link>
            <Link 
              to="/careers" 
              className={`text-gray-700 dark:text-gray-300 hover:text-edu-primary transition-colors link-underline ${location.pathname === '/careers' ? 'font-medium text-edu-primary' : ''}`}
            >
              Careers
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-gradient-to-r from-edu-primary to-purple-600 hover:from-purple-600 hover:to-edu-primary btn-shiny">
                Register
              </Button>
            </Link>
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={toggleDarkMode}
              className="ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>

          <div className="md:hidden flex items-center gap-3">
            <Button 
              size="icon" 
              variant="ghost" 
              onClick={toggleDarkMode}
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-edu-primary focus:outline-none transition-transform duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with animation */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 staggered-fade-in">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/' ? 'text-edu-primary' : 'text-gray-700 dark:text-gray-300'} hover:text-edu-primary hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-2 transition-all`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/degrees"
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/degrees' ? 'text-edu-primary' : 'text-gray-700 dark:text-gray-300'} hover:text-edu-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-all`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Degrees
            </Link>
            <Link
              to="/colleges"
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/colleges' ? 'text-edu-primary' : 'text-gray-700 dark:text-gray-300'} hover:text-edu-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-all`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Colleges
            </Link>
            <Link
              to="/eligibility"
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/eligibility' ? 'text-edu-primary' : 'text-gray-700 dark:text-gray-300'} hover:text-edu-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-all`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Eligibility
            </Link>
            <Link
              to="/careers"
              className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === '/careers' ? 'text-edu-primary' : 'text-gray-700 dark:text-gray-300'} hover:text-edu-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-all`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Careers
            </Link>
            <Link
              to="/register"
              className="block px-3 py-2 rounded-md text-base font-medium bg-gradient-to-r from-edu-primary to-purple-600 text-white hover:from-purple-600 hover:to-edu-primary transition-all"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
