'use client';

import { client } from "@/src/lib/sanity";
import { ContactInfo } from "@/src/types";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'; // Assuming react-icons is installed
import { getRandomImageUrl } from "@/src/utils/imageUtils";

async function getContactInfo() {
  const query = `*[_type == "contactInfo"][0]`; // Fetch the first (and likely only) contact info document
  const data = await client.fetch(query);
  return data;
}

interface ContactMeProps {
  imageSrc?: string;
  imageUrls?: string[];
}

const ContactMe: React.FC<ContactMeProps> = ({ imageSrc, imageUrls }) => {
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    getContactInfo().then(data => setContact(data));
    if (imageSrc) {
      setBackgroundImage(imageSrc);
    } else if (imageUrls) {
      setBackgroundImage(getRandomImageUrl(imageUrls));
    }
  }, [imageSrc, imageUrls]);

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
        <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Get in Touch
        </h2>
        {contact ? (
          <motion.div
            className="flex flex-wrap justify-center gap-8"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {contact.linkedin && (
              <motion.a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gray-800 rounded-xl p-4 shadow-xl hover:shadow-blue-500/40 transition-all duration-300 border border-gray-700"
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <FaLinkedin className="text-blue-400 text-3xl" />
                <span className="text-lg font-semibold">LinkedIn</span>
              </motion.a>
            )}
            {contact.github && (
              <motion.a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gray-800 rounded-xl p-4 shadow-xl hover:shadow-gray-500/40 transition-all duration-300 border border-gray-700"
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <FaGithub className="text-gray-400 text-3xl" />
                <span className="text-lg font-semibold">My Other Works</span>
              </motion.a>
            )}
            {contact.email && (
              <motion.a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 bg-gray-800 rounded-xl p-4 shadow-xl hover:shadow-red-500/40 transition-all duration-300 border border-gray-700"
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <FaEnvelope className="text-red-400 text-3xl" />
                <span className="text-lg font-semibold">Email Me</span>
              </motion.a>
            )}
          </motion.div>
        ) : (
          <p className="text-gray-300">Loading contact information...</p>
        )}
      </div>
    </section>
  );
};

export default ContactMe;