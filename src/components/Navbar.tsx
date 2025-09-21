
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-lg py-4 px-8 flex justify-between items-center"
    >
      <div className="text-2xl font-bold text-white">
        <a href="#hero" onClick={() => scrollToSection('hero')}>
          Eswar Jajjara
        </a>
      </div>
      <ul className="flex space-x-8">
        <li>
          <a
            href="#certificates"
            onClick={() => scrollToSection('certificates')}
            className="text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium"
          >
            Certificates
          </a>
        </li>
        <li>
          <a
            href="#coding-profiles"
            onClick={() => scrollToSection('coding-profiles')}
            className="text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium"
          >
            Coding Profiles
          </a>
        </li>
        <li>
          <a
            href="#projects"
            onClick={() => scrollToSection('projects')}
            className="text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium"
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#internships"
            onClick={() => scrollToSection('internships')}
            className="text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium"
          >
            Internships
          </a>
        </li>
        <li>
          <a
            href="#resume"
            onClick={() => scrollToSection('resume')}
            className="text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium"
          >
            Resume
          </a>
        </li>
        <li>
          <a
            href="#skills"
            onClick={() => scrollToSection('skills')}
            className="text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium"
          >
            Skills
          </a>
        </li>
        <li>
          <a
            href="#goals"
            onClick={() => scrollToSection('goals')}
            className="text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium"
          >
            Goals
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={() => scrollToSection('contact')}
            className="text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium"
          >
            Contact
          </a>
        </li>
      </ul>
    </motion.nav>
  );
};

export default Navbar;
