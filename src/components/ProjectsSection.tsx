
'use client';

import { client, urlFor } from "@/src/lib/sanity";
import { Project } from "@/src/types";
import Image from "next/image";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { getRandomImageUrl } from "@/src/utils/imageUtils";

async function getProjects() {
  const query = `*[_type == "project"] | order(_createdAt desc)`;
  const data = await client.fetch(query);
  return data;
}

interface ProjectsSectionProps {
  imageUrls?: string[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ imageUrls }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [backgroundImage, setBackgroundImage] = useState<string>('');

  useEffect(() => {
    getProjects().then(data => setProjects(data));
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
      <div className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          My Projects
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {projects.length === 0 ? (
            <p className="col-span-full text-center text-gray-400">No projects added yet. Check back soon!</p>
          ) : (
            projects.map((project) => (
              <motion.div
                key={project._id}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-purple-500/40 transition-all duration-300 border border-gray-700"
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className="relative h-60">
                  {project.image && (
                    <Image
                      src={urlFor(project.image).url()}
                      alt={project.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-purple-300">{project.title}</h3>
                  <p className="text-gray-200 mb-4">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline text-sm"
                      >
                        View Project
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline text-sm"
                      >
                        GitHub Repo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
