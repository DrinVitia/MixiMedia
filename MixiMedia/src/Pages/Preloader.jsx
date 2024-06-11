import React from "react";

function Preloader() {
  return (
    <div className="flex justify-center items-center h-screen bg-stone-300">
      <div className="w-16 h-16 border-8 border-t-8 border-t-stone-500 border-gray-200 rounded-full animate-spin"></div>
    </div>
  );
}

export default Preloader;
