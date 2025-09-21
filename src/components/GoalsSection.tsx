
'use client';

import { client } from "@/src/lib/sanity";
import { Goal } from "@/src/types";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { getRandomImageUrl } from "@/src/utils/imageUtils";

async function getGoals() {
  const query = `*[_type == "goal"] | order(dueDate asc)`;
  const data = await client.fetch(query);
  return data;
}

interface GoalsSectionProps {
  imageUrls?: string[];
}

const GoalsSection: React.FC<GoalsSectionProps> = ({ imageUrls }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    getGoals().then(data => setGoals(data));
    if (imageUrls) {
      setBackgroundImage(getRandomImageUrl(imageUrls));
    }
  }, [imageUrls]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'inProgress':
        return 'text-blue-400';
      case 'notStarted':
        return 'text-gray-400';
      case 'onHold':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <section 
      className="relative w-full py-16 px-4 bg-gray-950 text-white bg-cover bg-center bg-fixed"
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div> {/* Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500">
          My Goals
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {goals.length === 0 ? (
            <p className="col-span-full text-center text-gray-300">No goals added yet.</p>
          ) : (
            goals.map((goal) => (
              <motion.div
                key={goal._id}
                className="bg-gray-800 rounded-xl p-8 shadow-xl hover:shadow-pink-500/40 transition-all duration-300 border border-gray-700"
                variants={itemVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <h3 className="text-2xl font-bold mb-2 text-pink-300">{goal.title}</h3>
                <p className="text-gray-200 mb-4">{goal.description}</p>
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-semibold ${getStatusColor(goal.status)}`}>
                    {goal.status ? goal.status.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()) : ''}
                  </span>
                  {goal.dueDate && (
                    <span className="text-gray-300 text-sm">
                      Due: {new Date(goal.dueDate).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default GoalsSection;
