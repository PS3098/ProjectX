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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-6xl mx-auto px-4"
    >
      <div className="text-center mb-20">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative inline-block"
        >
          <h1 className="text-6xl font-bold text-gray-900 mb-6 relative z-10">
            Transform Teaching with
            <span className="text-indigo-600"> AI-Powered</span> Feedback
          </h1>
          <div className="absolute -inset-1 bg-indigo-100 rounded-full blur-3xl opacity-20 z-0"></div>
        </motion.div>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
        >
          Empower your teaching with instant, personalized feedback for your students.
          Save valuable time and enhance learning outcomes with our intelligent assistant.
        </motion.p>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-x-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/upload')}
            className="bg-indigo-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold
                     hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/25
                     flex items-center justify-center space-x-2 group"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all
                     border border-gray-100 group"
          >
            <div className="bg-indigo-50 p-3 rounded-xl w-fit group-hover:bg-indigo-100 transition-colors">
              <feature.icon className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-20 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Teaching?</h2>
        <p className="text-gray-600 mb-8">Join thousands of educators who are already saving time with EduFeedback.</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/upload')}
          className="bg-gray-900 text-white px-8 py-4 rounded-2xl text-lg font-semibold
                   hover:bg-gray-800 transition-all shadow-lg"
        >
          Try EduFeedback Now
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Home;