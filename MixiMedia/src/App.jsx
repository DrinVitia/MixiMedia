import React from "react";
import AudioPlayer from "../src/Pages/Audioplayer";
import Carousel from "../src/Pages/Carousel";
import Navbar from "../src/components/Navbar";

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-stone-600 to-stone-800">
      <Navbar />
      <AudioPlayer />
      <div className="mt-8 w-full flex justify-center">
        <Carousel
          onSlideChange={(next) => console.log("Slide changed to: ", next)}
        />
      </div>
    </div>
  );
}

export default App;
