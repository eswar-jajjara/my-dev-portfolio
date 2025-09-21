
'use client';

import { client } from "@/src/lib/sanity";
import { CodingProfile } from "@/src/types";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { getRandomImageUrl } from "@/src/utils/imageUtils";

async function getCodingProfiles() {
  const query = `*[_type == "codingProfile"] | order(platform asc)`;
  const data = await client.fetch(query);
  return data;
}

interface CodingProfilesProps {
  imageUrls?: string[];
}

const CodingProfiles: React.FC<CodingProfilesProps> = ({ imageUrls }) => {
  const [profiles, setProfiles] = useState<CodingProfile[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    getCodingProfiles().then(data => setProfiles(data));
    if (imageUrls) {
      setBackgroundImage(getRandomImageUrl(imageUrls));
    }
  }, [imageUrls]);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const categories = Array.from(new Set(profiles.map(profile => profile.category)));

  return (
    <section 
      className="relative w-full py-16 px-4 bg-gray-950 text-white bg-cover bg-center bg-fixed"
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none' }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div> {/* Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Coding Profiles
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {profiles.map((profile) => (
            <motion.a
              key={profile._id}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-gray-800 rounded-xl p-6 shadow-xl hover:shadow-green-500/40 transition-all duration-300 border border-gray-700 flex flex-col items-center text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <h3 className="text-xl font-semibold mb-2 text-green-300">{profile.platform}</h3>
              {profile.username && <p className="text-gray-200">@{profile.username}</p>}
              <p className="text-sm text-gray-400 mt-2">View Profile</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CodingProfiles;
