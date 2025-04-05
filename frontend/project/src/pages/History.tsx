import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Search, ArrowRight } from 'lucide-react';

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load history from localStorage
  useEffect(() => {
    const storedHistory = localStorage.getItem('feedbackHistory');
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Filter history by search term
  const filteredHistory = history.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigate to detailed feedback page
  const handleViewFeedback = (feedback, score, topic) => {
    navigate('/results', {
      state: {
        feedback,
        score,
        topic
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4"
    >
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Feedback History</h2>
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredHistory.length === 0 ? (
            <p className="text-gray-500">No feedback history found.</p>
          ) : (
            filteredHistory.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                className="border rounded-xl p-6 hover:border-indigo-500 transition-colors cursor-pointer"
                onClick={() => handleViewFeedback(item.feedback, item.score, item.title)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {item.title || item.feedback.split(' ').slice(0, 5).join(' ')}
                    </h3>
                    <div className="flex items-center text-gray-500 mt-2">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      {item.score}/100 🎯
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-indigo-600 flex items-center justify-end">
                  <span>View Details</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default History;

