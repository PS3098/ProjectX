import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, FileText, Clipboard, ArrowRight } from 'lucide-react';

const Upload = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      navigate('/results', { state: { text } });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4"
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Upload Content</h2>
          <p className="text-gray-600">Submit student work for AI-powered feedback and analysis</p>
        </motion.div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all
                      group cursor-pointer
                      ${isDragging 
                        ? 'border-indigo-600 bg-indigo-50 scale-[1.02]' 
                        : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'}`}
          >
            <motion.div 
              className="bg-white p-4 rounded-2xl inline-block mb-4 shadow-sm
                         group-hover:shadow-md transition-shadow"
            >
              <UploadIcon className="h-12 w-12 text-indigo-600" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Drop your file here</h3>
            <p className="text-gray-600 mb-4">or</p>
            <label className="inline-block">
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      setText(e.target?.result as string);
                    };
                    reader.readAsText(file);
                  }
                }}
              />
              <span className="px-6 py-3 rounded-xl bg-indigo-100 text-indigo-600 font-medium
                           hover:bg-indigo-200 transition-colors cursor-pointer inline-flex
                           items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Browse files</span>
              </span>
            </label>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Or paste your content here:
            </label>
            <div className="relative">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-48 p-4 border rounded-xl focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 bg-gray-50 focus:bg-white transition-colors"
                placeholder="Paste student work here..."
              />
              <button
                type="button"
                onClick={() => navigator.clipboard.readText().then(setText)}
                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-indigo-600
                         rounded-lg hover:bg-indigo-50 transition-colors"
                title="Paste from clipboard"
              >
                <Clipboard className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!text.trim()}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold
                     hover:bg-indigo-700 transition-all disabled:bg-gray-400
                     disabled:cursor-not-allowed flex items-center justify-center
                     space-x-2 group"
          >
            <span>Generate Feedback</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default Upload;