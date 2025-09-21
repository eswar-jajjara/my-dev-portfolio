
'use client';

import { client, urlFor } from "@/src/lib/sanity";
import { Certificate } from "@/src/types";
import Image from "next/image";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import Hero from "@/src/components/Hero";

async function getCertificates() {
  const query = `*[_type == "certificate"]`;
  const data = await client.fetch(query);
  return data;
}

export default function Home() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  useEffect(() => {
    getCertificates().then(data => setCertificates(data));
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <Hero profileImageSrc="/profile.png" />
      <main className="flex min-h-screen flex-col items-center py-16 px-4 bg-gray-950 text-white">
        <h1 className="text-5xl font-extrabold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">My Certificates</h1>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {certificates.map((cert: Certificate) => (
            <motion.div 
              key={cert._id} 
              className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-cyan-500/40 transition-shadow duration-300 border border-gray-700"
              variants={cardVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <div className="relative h-60">
                <Image
                  src={urlFor(cert.image).url()}
                  alt={cert.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-cyan-300">{cert.title}</h3>
                <p className="text-gray-300 mb-1">Issued by: {cert.issuer}</p>
                <p className="text-gray-400 text-sm">Date: {new Date(cert.date).toLocaleDateString()}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </>
  );
}

