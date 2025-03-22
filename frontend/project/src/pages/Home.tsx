import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, Clock, Users, ArrowRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Sparkles,
      title: 'AI-Powered Analysis',
      description: 'Get instant, intelligent feedback on student work using advanced AI technology.'
    },
    {
      icon: BookOpen,
      title: 'Comprehensive Feedback',
      description: 'Detailed analysis covering grammar, structure, content quality, and suggestions for improvement.'
    },
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Reduce grading time significantly with automated feedback, letting you focus on teaching.'
    },
    {
      icon: Users,
      title: 'Track Progress',
      description: 'Monitor student improvement over time with detailed historical feedback tracking.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-4 text-[#2C2C2C]"
    >
      <div className="text-center mb-20 relative">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative inline-block"
        >
          <h1 className="text-6xl font-extrabold text-[#2C3E50] relative z-10 font-serif">
            Transform Teaching with
            <span className="text-[#B8860B]"> AI-Powered</span> Feedback
          </h1>
          <p className="text-xl text-[#2C2C2C] mt-4 max-w-3xl mx-auto">
            Empower your teaching with instant, personalized feedback for your students.
          </p>
        </motion.div>
        
        <motion.div className="flex justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/upload')}
            className="bg-[#2C3E50] text-white px-8 py-4 rounded-full text-lg font-semibold
                       hover:bg-[#1A252F] transition-all shadow-lg"
          >
            Get Started <ArrowRight className="w-5 h-5 inline-block ml-2" />
          </motion.button>
        </motion.div>
      </div>

      <motion.div className="grid md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-full shadow-lg border-4 border-[#D4AF37] bg-white text-center"
          >
            <div className="bg-[#D4AF37] p-4 rounded-full inline-block">
              <feature.icon className="h-10 w-10 text-[#2C3E50]" />
            </div>
            <h3 className="text-2xl font-semibold mt-4 mb-2 text-[#2C3E50] font-serif">{feature.title}</h3>
            <p className="text-[#2C2C2C] leading-relaxed font-light">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Home;
