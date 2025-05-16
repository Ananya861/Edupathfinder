
import { motion } from "framer-motion";
import { School, GraduationCap, Book, Briefcase, Users, Code, Calculator, Activity, Leaf } from "lucide-react";

export const AnimatedIcons = () => {
  const streamIcons = [
    { icon: <School />, label: "Engineering", color: "bg-pastel-blue" },
    { icon: <GraduationCap />, label: "Medical", color: "bg-pastel-pink" },
    { icon: <Book />, label: "Arts", color: "bg-pastel-yellow" },
    { icon: <Briefcase />, label: "Commerce", color: "bg-pastel-orange" },
    { icon: <Users />, label: "Management", color: "bg-pastel-amber" },
    { icon: <Code />, label: "Computer Science", color: "bg-pastel-teal" },
    { icon: <Calculator />, label: "Mathematics", color: "bg-pastel-purple" },
    { icon: <Activity />, label: "Science", color: "bg-pastel-blue" },
    { icon: <Leaf />, label: "Agriculture", color: "bg-pastel-teal" },
  ];

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold text-center mb-8">Explore Educational Streams</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-4 px-4">
        {streamIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`flex flex-col items-center justify-center p-4 rounded-lg ${item.color} transition-all hover:shadow-md cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <motion.div
              className="text-edu-primary w-10 h-10 mb-2 flex items-center justify-center"
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              {item.icon}
            </motion.div>
            <span className="text-xs font-medium text-center">{item.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
