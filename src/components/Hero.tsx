'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { client } from "@/src/lib/sanity";
import { Resume } from "@/src/types";
import { FaLinkedin, FaGithub, FaFilePdf } from 'react-icons/fa';
import { getRandomImageUrl } from "@/src/utils/imageUtils";

const MotionH1 = dynamic(() => import('framer-motion').then(mod => mod.motion.h1), {
  ssr: false,
});
const MotionP = dynamic(() => import('framer-motion').then(mod => mod.motion.p), {
  ssr: false,
});
const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), {
  ssr: false,
});

async function getResume() {
  const query = `*[_type == "resume"][0]{
    title,
    "fileUrl": file.asset->url
  }`; 
  const data = await client.fetch(query);
  return data;
}

interface HeroProps {
  imageUrls?: string[];
}

const Hero: React.FC<HeroProps> = ({ imageUrls }) => {
  const [resume, setResume] = useState<Resume | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    getResume().then(data => setResume(data));
    if (imageUrls) {
      setBackgroundImage(getRandomImageUrl(imageUrls));
    }
  }, [imageUrls]);

  return (
    <div 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay for text readability */}
      <div className="relative z-10 text-center p-4 flex flex-col items-center justify-center max-w-6xl mx-auto">
        {/* Text Content */}
        <div className="text-center">
          <MotionH1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-5xl md:text-6xl font-bold text-white mb-2 leading-tight"
          >
            Eswar Jajjara
          </MotionH1>
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-4"
          >
            Full-stack Developer | AI Driven Edge Architecture and Applications
          </MotionP>
          <MotionP
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8"
          >
            Passionate about building innovative solutions and exploring the frontiers of AI and edge computing. With a strong foundation in full-stack development, I thrive on creating impactful applications that leverage cutting-edge technologies.
          </MotionP>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex justify-center gap-4 mb-8"
          >
            <a
              href="#projects"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 text-lg"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View My Work
            </a>
            {resume && resume.fileUrl && (
              <a
                href={resume.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300 text-lg inline-flex items-center gap-2"
              >
                <FaFilePdf /> Download Resume
              </a>
            )}
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex justify-center gap-6 text-white text-3xl"
          >
            <a href="https://www.linkedin.com/in/eswarvardanjajjara/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors duration-300">
              <FaLinkedin />
            </a>
            <a href="https://github.com/eswar-jajjara" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors duration-300">
              <FaGithub />
            </a>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
};

export default Hero;