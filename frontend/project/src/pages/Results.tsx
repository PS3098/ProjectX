import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Copy, ArrowLeft, Save, Award, AlertTriangle, ThumbsUp } from 'lucide-react';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  const [feedback, setFeedback] = useState({
    score: 0,
    summary: '',
    strengths: [],
    improvements: [],
    detailedFeedback: ''
  });

  useEffect(() => {
    if (!location.state?.text) {
      navigate('/upload');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setFeedback({
        score: 85,
        summary: 'Well-structured essay with clear arguments and good use of evidence.',
        strengths: [
          'Strong thesis statement',
          'Good use of supporting evidence',
          'Clear paragraph structure'
        ],
        improvements: [
          'Consider adding more counterarguments',
          'Some grammatical errors need attention',
          'Conclusion could be stronger'
        ],
        detailedFeedback: location.state.text
      });
      setLoading(false);
    }, 2000);
  }, [location.state, navigate]);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(feedback, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex flex-col items-center justify-center h-[60vh]"
      >
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600
                       rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full" />
          </div>
        </div>
        <p className="mt-6 text-lg text-gray-600 font-medium">Analyzing content...</p>
        <p className="mt-2 text-sm text-gray-500">This may take a few moments</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4"
    >
      <button
        onClick={() => navigate('/upload')}
        className="flex items-center text-gray-600 hover:text-indigo-600 mb-6
                 group"
      >
        <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Upload</span>
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <motion.h2 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-3xl font-bold text-gray-900"
          >
            Feedback Results
          </motion.h2>
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopy}
              className="flex items-center px-4 py-2 rounded-xl bg-gray-100
                       hover:bg-gray-200 transition-colors space-x-2"
            >
              {copied ? (
                <>
                  <Check className="h-5 w-5 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5" />
                  <span>Copy</span>
                </>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-4 py-2 rounded-xl bg-indigo-600
                       text-white hover:bg-indigo-700 transition-colors space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>Save to History</span>
            </motion.button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Overall Score</h3>
                <p className="text-gray-600">Based on content quality and structure</p>
              </div>
              <div className="flex items-center space-x-3">
                <Award className="h-8 w-8 text-indigo-600" />
                <span className="text-4xl font-bold text-indigo-600">{feedback.score}</span>
                <span className="text-xl text-gray-400">/100</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <ThumbsUp className="h-5 w-5 text-green-600" />
              <span>Summary</span>
            </h3>
            <p className="text-gray-700 bg-green-50 p-4 rounded-xl">{feedback.summary}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">Strengths</h3>
              <ul className="space-y-3">
                {feedback.strengths.map((strength, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center bg-green-50 p-3 rounded-xl text-gray-700"
                  >
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{strength}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-orange-600">Areas for Improvement</h3>
              <ul className="space-y-3">
                {feedback.improvements.map((improvement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center bg-orange-50 p-3 rounded-xl text-gray-700"
                  >
                    <AlertTriangle className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0" />
                    <span>{improvement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Detailed Feedback</h3>
            <div className="bg-gray-50 p-6 rounded-xl">
              <pre className="whitespace-pre-wrap text-gray-700 font-mono text-sm">
                {feedback.detailedFeedback}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Results;