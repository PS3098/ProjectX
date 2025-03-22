import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/80 backdrop-blur-md shadow-sm mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 mb-4 md:mb-0">
            <p className="font-medium">© {currentYear} EduFeedback. All rights reserved.</p>
            <p className="text-sm mt-1">Empowering educators with AI-powered feedback</p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition-colors p-2 hover:bg-indigo-50 rounded-xl"
              aria-label="Github"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition-colors p-2 hover:bg-indigo-50 rounded-xl"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600 transition-colors p-2 hover:bg-indigo-50 rounded-xl"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;