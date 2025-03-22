import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Search, Filter } from 'lucide-react';

const History = () => {
  // Simulated history data
  const feedbackHistory = [
    {
      id: 1,
      title: "Essay on Climate Change",
      date: "2024-03-10",
      score: 85,
      status: "Completed"
    },
    {
      id: 2,
      title: "Research Paper: AI Ethics",
      date: "2024-03-09",
      score: 92,
      status: "Completed"
    },
    {
      id: 3,
      title: "Literature Review",
      date: "2024-03-08",
      score: 78,
      status: "Completed"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Feedback History</h2>
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search feedback..."
                className="pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500"
              />
            </div>
            <button className="flex items-center px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200">
              <Filter className="h-5 w-5 mr-2" />
              Filter
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {feedbackHistory.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.02 }}
              className="border rounded-xl p-6 hover:border-indigo-500 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <div className="flex items-center text-gray-500 mt-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{item.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-indigo-600">{item.score}/100</div>
                  <span className="inline-block px-3 py-1 rounded-full text-sm
                                 bg-green-100 text-green-800 mt-2">
                    {item.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default History;