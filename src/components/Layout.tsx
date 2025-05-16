
import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showInitialAnimation, setShowInitialAnimation] = useState(true);
  
  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      // Update mouse position for parallax effect
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    // Hide initial animation after it completes
    const animationTimer = setTimeout(() => {
      setShowInitialAnimation(false);
    }, 2500);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(animationTimer);
    };
  }, []);

  // Calculate parallax effect based on scroll position and mouse movement
  const backgroundOffset = scrollPosition * 0.05;
  const mouseParallaxX = mousePosition.x * 20 - 10;
  const mouseParallaxY = mousePosition.y * 20 - 10;

  if (showInitialAnimation) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient-animated"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            EduPathfinder
          </motion.h1>
          <motion.div
            className="mt-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="text-muted-foreground">Find your perfect educational path</p>
            <div className="mt-6 flex justify-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-pastel-blue animate-pulse"></span>
              <span className="w-3 h-3 rounded-full bg-pastel-teal animate-pulse" style={{ animationDelay: "0.2s" }}></span>
              <span className="w-3 h-3 rounded-full bg-pastel-pink animate-pulse" style={{ animationDelay: "0.4s" }}></span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col min-h-screen transition-all duration-700 bg-white ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* White background replacing the pastel background */}
      <div 
        className="fixed inset-0 -z-20 hero-pattern" 
        style={{ transform: `translateY(${backgroundOffset * 0.5}px)` }}
      />
      <div 
        className="fixed inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        {/* Floating shapes in the background with lighter shades */}
        <div className="absolute top-[10%] right-[10%] w-64 h-64 bg-gray-100/50 rounded-full blur-3xl animate-float" 
             style={{ transform: `translate(${mouseParallaxX * 0.3}px, ${mouseParallaxY * 0.3}px)` }} 
        />
        <div className="absolute bottom-[15%] left-[15%] w-80 h-80 bg-gray-100/50 rounded-full blur-3xl animate-float" 
             style={{ animationDelay: '1s', transform: `translate(${mouseParallaxX * -0.2}px, ${mouseParallaxY * -0.2}px)` }} 
        />
        <div className="absolute top-[40%] left-[25%] w-48 h-48 bg-gray-100/50 rounded-full blur-2xl animate-float" 
             style={{ animationDelay: '2s', transform: `translate(${mouseParallaxX * 0.4}px, ${mouseParallaxY * 0.4}px)` }} 
        />
        {/* Gradient mesh with very light shades */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(245,245,245,0.1),transparent_70%)]" />
      </div>
      
      {/* Main content */}
      <Header />
      <main className="flex-grow relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
      <Footer />
    </motion.div>
  );
}
