const UploadBox = () => {
    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <div className="flex justify-center items-center">
          <img src="/vite.svg" alt="Upload Icon" className="w-16 h-16" />
        </div>
        <p className="text-blue-500 mt-4">Click to upload or drag and drop</p>
        <p className="text-gray-500">Supported file formats: PDF, DOC, DOCX, TXT (max 10MB)</p>
      </div>
    );
  };
  
  export default UploadBox;
  