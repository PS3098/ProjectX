import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, FileText, ArrowRight } from 'lucide-react';
import axios from 'axios';

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMode, setUploadMode] = useState<'file' | 'text'>('file');  // Switch between file and text upload mode

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadMode === 'file' && !file) return;
    if (uploadMode === 'text' && !text) return;

    const formData = new FormData();
    if (uploadMode === 'file') {
      formData.append('file', file!);  // Force non-null as we already check for file
    } else {
      formData.append('text', text);
    }

    try {
      setIsUploading(true);

      const response = await axios.post('http://127.0.0.1:8000/generate-feedback', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/results', {
  state: {
    feedback: response.data.feedback || "No feedback generated.",
    score: response.data.score ?? "N/A",  // Prevent undefined errors
  },
});


    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload. Please try again.');
    } finally {
      setIsUploading(false);
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
        <motion.div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Upload Student Submission</h2>
          <p className="text-gray-600">Get AI-powered feedback instantly</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="mb-6">
            <button
              type="button"
              onClick={() => setUploadMode(uploadMode === 'file' ? 'text' : 'file')}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold mb-4"
            >
              Switch to {uploadMode === 'file' ? 'Text Upload' : 'File Upload'}
            </button>

            {uploadMode === 'file' ? (
              <div className="border-2 border-dashed rounded-2xl p-12 text-center">
                <UploadIcon className="h-12 w-12 text-indigo-600" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Drag & Drop a file here</h3>

                <label className="inline-block">
                  <input type="file" className="hidden" onChange={handleFileChange} />
                  <span className="px-6 py-3 rounded-xl bg-indigo-100 text-indigo-600">
                    <FileText className="h-5 w-5" /> Browse files
                  </span>
                </label>
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-2xl p-12 text-center">
                <textarea
                  className="w-full p-4 border rounded-lg"
                  rows={6}
                  placeholder="Paste your text here"
                  value={text}
                  onChange={handleTextChange}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={(uploadMode === 'file' && !file) || (uploadMode === 'text' && !text) || isUploading}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold"
          >
            {isUploading ? 'Uploading...' : 'Generate Feedback'}
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Upload;

