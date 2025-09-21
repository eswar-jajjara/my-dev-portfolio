
'use client';

import { client } from "@/src/lib/sanity";
import { Resume } from "@/src/types";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { FaFilePdf } from 'react-icons/fa';
import { getRandomImageUrl } from "@/src/utils/imageUtils";

async function getResume() {
  const query = `*[_type == "resume"][0]{
    title,
    "fileUrl": file.asset->url
  }`; // Fetch the first (and likely only) resume document
  const data = await client.fetch(query);
  return data;
}

interface ResumeSectionProps {
  imageUrls?: string[];
}

const ResumeSection: React.FC<ResumeSectionProps> = ({ imageUrls }) => {
  const [resume, setResume] = useState<Resume | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    getResume().then(data => setResume(data));
    if (imageUrls) {
      setBackgroundImage(getRandomImageUrl(imageUrls));
    }
  }, [imageUrls]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section 
      className="relative w-full py-16 px-4 bg-gray-950 text-white bg-cover bg-center bg-fixed"
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div> {/* Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-500">
          My Resume
        </h2>
        {resume && resume.fileUrl ? (
          <motion.a
            href={resume.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gray-800 rounded-xl p-4 shadow-xl hover:shadow-red-500/40 transition-all duration-300 border border-gray-700"
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <FaFilePdf className="text-red-400 text-3xl" />
            <span className="text-lg font-semibold">{resume.title || 'View Resume'}</span>
          </motion.a>
        ) : (
          <p className="text-gray-300">Resume not available yet.</p>
        )}
      </div>
    </section>
  );
};

export default ResumeSection;
