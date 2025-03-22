import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F8F1E5] text-[#2C2C2C] shadow-md mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="font-medium text-lg">© {currentYear} InsightEd. All rights reserved.</p>
            <p className="text-sm mt-1 font-light">Empowering educators with AI-powered feedback</p>
          </div>
          <div className="flex space-x-6">
            {[
              { icon: Github, label: 'Github', href: '#' },
              { icon: Twitter, label: 'Twitter', href: '#' },
              { icon: Mail, label: 'Email', href: '#' }
            ].map(({ icon: Icon, label, href }, index) => (
              <a
                key={index}
                href={href}
                className="text-[#2C3E50] hover:text-[#D4AF37] transition-colors p-2 rounded-xl hover:bg-[#F8F1E5] shadow-md"
                aria-label={label}
              >
                <Icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

