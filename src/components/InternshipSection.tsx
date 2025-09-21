
'use client';

import { client } from "@/src/lib/sanity";
import { Internship } from "@/src/types";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { PortableText } from '@portabletext/react';
import { getRandomImageUrl } from "@/src/utils/imageUtils";

async function getInternships() {
  const query = `*[_type == "internship"] | order(endDate desc)`;
  const data = await client.fetch(query);
  return data;
}

interface InternshipSectionProps {
  imageUrls?: string[];
}

const InternshipSection: React.FC<InternshipSectionProps> = ({ imageUrls }) => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    getInternships().then(data => setInternships(data));
    if (imageUrls) {
      setBackgroundImage(getRandomImageUrl(imageUrls));
    }
  }, [imageUrls]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const portableTextComponents = {
    block: {
      li: ({ children }: any) => <li className="list-disc ml-4 text-gray-200 mb-1">{children}</li>,
      normal: ({ children }: any) => <p className="text-gray-200 mb-2">{children}</p>,
    },
  };

  return (
    <section 
      className="relative w-full py-16 px-4 bg-gray-950 text-white bg-cover bg-center bg-fixed"
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div> {/* Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          Internship Experience
        </h2>
        <motion.div
          className="flex flex-col gap-12"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {internships.length === 0 ? (
            <p className="col-span-full text-center text-gray-400">No internship experience added yet.</p>
          ) : (
            internships.map((internship) => (
              <motion.div
                key={internship._id}
                className="bg-gray-800 rounded-xl p-8 shadow-xl hover:shadow-yellow-500/40 transition-all duration-300 border border-gray-700"
                variants={itemVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <h3 className="text-2xl font-bold text-yellow-300 mb-2">{internship.role} at {internship.company}</h3>
                <p className="text-gray-300 text-sm mb-4">
                  {new Date(internship.startDate).toLocaleDateString()} - {internship.endDate ? new Date(internship.endDate).toLocaleDateString() : 'Present'}
                </p>
                <div className="prose prose-invert max-w-none">
                  <PortableText value={internship.description} components={portableTextComponents} />
                </div>
                {internship.technologies && internship.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {internship.technologies.map((tech, index) => (
                      <span key={index} className="bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default InternshipSection;
