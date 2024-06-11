import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AudioPlayer from "../src/Pages/Audioplayer";
import Navbar from "../src/components/Navbar";
import About from "../src/Pages/About";

function App() {
  return (
    <Router>
      {/* <div className="flex flex-col min-h-screen bg-gradient-to-r from-stone-600 to-stone-800"> */}
      <Navbar />
      {/* <div className="flex-1 flex flex-col justify-center items-center"> */}
      <Routes>
        <Route path="/" element={<AudioPlayer />} />
        <Route path="/about" element={<About />} />
      </Routes>
      {/* </div> */}
      {/* </div> */}
    </Router>
  );
}

export default App;
