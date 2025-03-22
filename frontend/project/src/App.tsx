import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Upload, FileText, Copy, Loader2, Sparkles, Book, Users, Brain, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [textInput, setTextInput] = useState('');

  const generateDetailedFeedback = (text: string) => {
    // This is a mock implementation. In a real app, this would call an AI API
    const mockFeedback = {
      overview: "Your essay demonstrates good understanding of the topic but needs improvement in structure and clarity.",
      strengths: [
        "Strong thesis statement and main argument",
        "Good use of evidence to support claims",
        "Effective conclusion that ties back to the main point"
      ],
      improvements: [
        "Consider reorganizing paragraphs for better flow",
        "Add more transition sentences between paragraphs",
        "Strengthen topic sentences in body paragraphs"
      ],
      grammarIssues: [
        { line: 3, issue: "Subject-verb agreement error", suggestion: "Change 'were' to 'was'" },
        { line: 7, issue: "Run-on sentence", suggestion: "Split into two sentences or use proper conjunction" }
      ],
      score: 85,
      detailedAnalysis: "The essay effectively argues its main point but could benefit from structural improvements. The introduction captures attention, though the transition to the first body paragraph needs work. Evidence is well-chosen but could be better integrated. Consider adding more analysis after each piece of evidence."
    };

    return mockFeedback;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setTimeout(() => {
      const feedbackData = generateDetailedFeedback(textInput);
      setFeedback(JSON.stringify(feedbackData));
      setIsLoading(false);
      setCurrentPage('results');
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(feedback);
  };

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-indigo-600" />,
      title: "Smart Analysis",
      description: "Advanced AI algorithms provide comprehensive feedback on structure, grammar, and content"
    },
    {
      icon: <Sparkles className="h-8 w-8 text-purple-600" />,
      title: "Instant Insights",
      description: "Get detailed feedback with specific suggestions within seconds"
    },
    {
      icon: <Users className="h-8 w-8 text-pink-600" />,
      title: "Personalized Growth",
      description: "Track progress and receive tailored recommendations for improvement"
    }
  ];

  const renderFeedback = () => {
    if (!feedback) return null;
    const data = JSON.parse(feedback);
    
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-3">Overview</h3>
          <p className="text-gray-700">{data.overview}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-xl p-6">
            <div className="flex items-center mb-3">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold">Strengths</h3>
            </div>
            <ul className="space-y-2">
              {data.strengths.map((strength: string, index: number) => (
                <li key={index} className="flex items-center text-green-700">
                  <span className="mr-2">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 rounded-xl p-6">
            <div className="flex items-center mb-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mr-2" />
              <h3 className="text-lg font-semibold">Areas for Improvement</h3>
            </div>
            <ul className="space-y-2">
              {data.improvements.map((improvement: string, index: number) => (
                <li key={index} className="flex items-center text-amber-700">
                  <span className="mr-2">•</span>
                  {improvement}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-red-50 rounded-xl p-6">
          <div className="flex items-center mb-3">
            <XCircle className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-lg font-semibold">Grammar & Style Issues</h3>
          </div>
          <ul className="space-y-2">
            {data.grammarIssues.map((issue: any, index: number) => (
              <li key={index} className="text-red-700">
                <span className="font-semibold">Line {issue.line}:</span> {issue.issue}
                <br />
                <span className="text-sm text-red-600">Suggestion: {issue.suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-3">Detailed Analysis</h3>
          <p className="text-gray-700">{data.detailedAnalysis}</p>
          <div className="mt-4 flex items-center">
            <span className="text-lg font-semibold mr-2">Score:</span>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full">{data.score}/100</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen mesh-gradient">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold gradient-text">EduMentor AI</span>
          </motion.div>
          <div className="flex space-x-6">
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage('upload')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {currentPage === 'home' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h1 className="text-6xl font-bold mb-6 gradient-text">
                Transform Teaching Through AI
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Empower your teaching with intelligent feedback. Help every student reach their full potential.
              </p>
              <button
                onClick={() => setCurrentPage('upload')}
                className="bg-white text-indigo-600 px-8 py-4 rounded-2xl hover:bg-indigo-50 transition-colors font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Start Analyzing Now
              </button>
            </motion.div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.2 }}
                  className="bg-white/90 backdrop-blur-md rounded-2xl p-6 card-hover"
                >
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-3 inline-block mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {currentPage === 'upload' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6 gradient-text">Upload Content</h2>
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="border-2 border-dashed border-indigo-300 rounded-2xl p-8 text-center bg-gradient-to-br from-indigo-50/50 to-purple-50/50 cursor-pointer"
                >
                  <Upload className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                  <p className="text-gray-600">Drag and drop files here or click to browse</p>
                </motion.div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or paste content directly:
                  </label>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    className="w-full h-40 rounded-xl border-indigo-200 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-white/50 backdrop-blur-sm"
                    placeholder="Paste student work here..."
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Generate Detailed Feedback
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {currentPage === 'results' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6 gradient-text">Comprehensive Feedback</h2>
              {isLoading ? (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="flex items-center justify-center py-12"
                >
                  <Loader2 className="h-12 w-12 text-indigo-600" />
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {renderFeedback()}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={copyToClipboard}
                    className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium mt-6"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy feedback</span>
                  </motion.button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500">© 2024 EduMentor AI. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Documentation</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;