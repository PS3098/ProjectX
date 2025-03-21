import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-blue-600 font-bold text-xl">EduFeedback</Link>
      <div className="flex gap-6">
        <Link to="/" className="text-gray-600 hover:text-blue-500">Home</Link>
        <Link to="/dashboard" className="text-gray-600 hover:text-blue-500">Dashboard</Link>
        <Link to="/history" className="text-gray-600 hover:text-blue-500">History</Link>
      </div>
      <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Get Started
      </Link>
    </nav>
  );
};

export default Navbar;
