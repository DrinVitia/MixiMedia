import React from "react";

function Preloader() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-8 h-8 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
    </div>
  );
}

export default Preloader;
