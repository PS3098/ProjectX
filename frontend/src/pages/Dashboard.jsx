import UploadBox from "../components/UploadBox";

const Dashboard = () => {
  return (
    <div className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center">Dashboard</h2>
      <p className="text-center text-gray-600 mt-4">Upload student essays for AI-powered feedback and analysis.</p>
      <div className="mt-8 max-w-4xl mx-auto">
        <UploadBox />
      </div>
    </div>
  );
};

export default Dashboard;
