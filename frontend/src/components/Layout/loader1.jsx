import React from "react";
import "./Loader1.css";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="text-white text-center">
      <div className="loader w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin mx-auto"></div>
      <p className="mt-4">Loading...</p>
    </div>
  </div>
  
  );
};

export default Loader;
