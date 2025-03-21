import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-blue-600">EduFeedback</h1>
      <p className="text-lg text-gray-500 mt-4">
        AI-powered feedback platform to analyze student essays.
      </p>
      <Link to="/dashboard" className="mt-6 bg-blue-500 text-white px-6 py-2 rounded">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Home;
