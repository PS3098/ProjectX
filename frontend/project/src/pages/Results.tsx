import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft } from 'lucide-react';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const feedback = location.state?.feedback;
  const score = location.state?.score;
  const topic = location.state?.topic || "Unknown Topic";// || "Unknown Topic";

console.log("Topic is:", topic);
  // Save the feedback to localStorage
  const handleSaveToHistory = () => {
    const savedHistory = JSON.parse(localStorage.getItem('feedbackHistory') || '[]');

    const newHistoryItem = {
      title: topic,
      feedback: feedback,
      score: score,
      date: new Date().toLocaleString(),
    };

    savedHistory.push(newHistoryItem);
    localStorage.setItem('feedbackHistory', JSON.stringify(savedHistory));
    alert('Feedback saved to history!');
  };

  const renderFormattedFeedback = (feedback) => {
    if (!feedback) return null;

    return feedback.split("\n").map((line, index) => {
      if (line.startsWith("**")) {
        return (
          <h3 key={index} className="text-lg font-bold mt-6 text-gray-900">
            {line.replace(/\*\*/g, "")}
          </h3>
        );
      } else if (line.startsWith("* ")) {
        return (
          <li key={index} className="ml-6 list-disc text-gray-700">
            {line.replace("* ", "")}
          </li>
        );
      } else if (line.trim() !== "") {
        return (
          <p key={index} className="text-gray-700 mt-2 leading-relaxed">
            {line}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4"
    >
      <button
        onClick={() => navigate('/history')}
        className="flex items-center text-gray-600 hover:text-indigo-600 mb-6 group"
      >
        <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        <span>Back to History</span>
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{topic}</h2>
          <div className="text-xl font-bold text-indigo-600">{score}/100🎯</div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          {renderFormattedFeedback(feedback)}
        </div>

        {/* Save to History Button */}
        <button
          onClick={handleSaveToHistory}
          className="flex items-center mt-6 px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
        >
          <Save className="h-5 w-5 mr-2" />
          Save to History
        </button>
      </div>
    </motion.div>
  );
};

export default Results;

