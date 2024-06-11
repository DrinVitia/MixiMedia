import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AudioPlayer from "../src/Pages/Audioplayer";
import Navbar from "../src/components/Navbar";
import About from "../src/Pages/About";
import ListeningNow from "../src/Pages/ListeningNow";
import Preloader from "../src/Pages/Preloader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<AudioPlayer />} />
            <Route path="/about" element={<About />} />
            <Route path="/listeningnow" element={<ListeningNow />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
