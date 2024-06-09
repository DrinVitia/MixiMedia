import React from "react";
import AudioPlayer from "../src/Pages/Audioplayer";
import Carousel from "../src/Pages/Carousel";

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
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
