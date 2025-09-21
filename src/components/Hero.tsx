'use client';

import React from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), {
  ssr: false,
});
const MotionH1 = dynamic(() => import('framer-motion').then(mod => mod.motion.h1), {
  ssr: false,
});
const MotionP = dynamic(() => import('framer-motion').then(mod => mod.motion.p), {
  ssr: false,
});

interface HeroProps {
  profileImageSrc: string;
}

const Hero: React.FC<HeroProps> = ({ profileImageSrc }) => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      <div className="relative z-10 text-center">
        <MotionDiv
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-[600px] h-[600px] mx-auto mb-8"
        >
          <Image
            src={profileImageSrc}
            alt="Profile Picture"
            layout="fill"
            objectFit="contain"
            className="rounded-full drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]"
          />
        </MotionDiv>
        <MotionH1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-6xl font-bold text-white mb-4"
        >
          Eswar Jajjara
        </MotionH1>
        <MotionP
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-2xl text-gray-300"
        >
          Full-stack Developer | AI Enthusiast
        </MotionP>
      </div>
    </div>
  );
};

export default Hero;