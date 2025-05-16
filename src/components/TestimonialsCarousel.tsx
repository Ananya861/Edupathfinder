
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Engineering Student, IIT Bombay",
    image: "/placeholder.svg",
    quote: "EduPathfinder helped me find the perfect engineering program aligned with my interests. The eligibility checker was a game-changer!",
    initials: "PS"
  },
  {
    name: "Rahul Verma",
    role: "BBA Student, Christ University",
    image: "/placeholder.svg",
    quote: "This platform gave me clarity about different management degrees and helped me choose the right university for my career goals.",
    initials: "RV"
  },
  {
    name: "Ananya Reddy",
    role: "B.Sc. Biology Student, NISER",
    image: "/placeholder.svg",
    quote: "I was confused after PUC, but the stream comparison features and college rankings made my decision process smooth and informed.",
    initials: "AR"
  },
  {
    name: "Vikram Singh",
    role: "B.Tech CSE Student, NIT Surathkal",
    image: "/placeholder.svg",
    quote: "The detailed information about cutoffs and specializations helped me set realistic goals and find a program that matched my KCET rank.",
    initials: "VS"
  }
];

export const TestimonialsCarousel = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-12">What Students Say</h2>
        
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-4">
                  <motion.div 
                    className="bg-gray-50 rounded-lg p-6 shadow-sm relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute top-6 right-6 text-edu-light">
                      <Quote size={40} className="opacity-40" />
                    </div>
                    <div className="flex items-center mb-4">
                      <Avatar className="h-14 w-14 border-2 border-edu-light">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback className="bg-edu-primary text-white">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <blockquote className="text-gray-700 italic relative z-10">
                      "{testimonial.quote}"
                    </blockquote>
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-4">
            <CarouselPrevious className="relative static transform-none mx-2" />
            <CarouselNext className="relative static transform-none mx-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
