
'use client';

import { client } from "@/src/lib/sanity";
import { Skill } from "@/src/types";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { getRandomImageUrl } from "@/src/utils/imageUtils";

async function getSkills() {
  const query = `*[_type == "skill"] | order(category asc, name asc)`;
  const data = await client.fetch(query);
  return data;
}

interface SkillsSectionProps {
  imageUrls?: string[];
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ imageUrls }) => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    getSkills().then(data => setSkills(data));
    if (imageUrls) {
      setBackgroundImage(getRandomImageUrl(imageUrls));
    }
  }, [imageUrls]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <section 
      className="relative w-full py-16 px-4 bg-gray-950 text-white bg-cover bg-center bg-fixed"
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div> {/* Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">
          My Skills
        </h2>
        {categories.length === 0 ? (
          <p className="col-span-full text-center text-gray-300">No skills added yet.</p>
        ) : (
          categories.map(category => (
            <div key={category} className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-blue-300">{category.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</h3>
              <motion.div
                className="flex flex-wrap gap-4"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
              >
                {skills.filter(skill => skill.category === category).map(skill => (
                  <motion.div
                    key={skill._id}
                    className="bg-gray-800 rounded-full px-6 py-2 shadow-xl hover:shadow-blue-500/40 transition-all duration-300 border border-gray-700 text-gray-200 text-lg font-medium"
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  >
                    {skill.name}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
