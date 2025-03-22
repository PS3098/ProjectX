import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, Upload, History, Home } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/upload', icon: Upload, label: 'Upload' },
    { path: '/history', icon: History, label: 'History' },
  ];

  return (
    <header className="bg-[#F8F1E5] backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-[#2C3E50] p-2 rounded-xl group-hover:bg-[#D4AF37] transition-colors">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent 
                         bg-gradient-to-r from-[#2C3E50] to-[#D4AF37]">
              InsightEd
            </span>
          </Link>
          
          <div className="flex space-x-8">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className={`relative group flex items-center space-x-2 px-4 py-2 rounded-xl
                          transition-colors ${
                            location.pathname === path
                            ? 'text-[#2C3E50]'
                            : 'text-[#2C2C2C] hover:text-[#2C3E50]'
                          }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{label}</span>
                {location.pathname === path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-[#D4AF37] rounded-xl -z-10"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

