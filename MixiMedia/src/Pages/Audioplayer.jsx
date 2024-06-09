import React, { useRef, useState, useEffect } from "react";
import Preloader from "../Pages/Preloader";

function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const audioElement = audioRef.current;
    audioElement.addEventListener("canplaythrough", handleCanPlay);

    return () => {
      audioElement.removeEventListener("canplaythrough", handleCanPlay);
    };
  }, []);

  return (
    <div className="flex items-center space-x-4">
      {isLoading ? (
        <Preloader />
      ) : (
        <button
          onClick={togglePlay}
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-700"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      )}
      <audio ref={audioRef} src="path/to/your/audio/file.mp3" />
    </div>
  );
}

export default AudioPlayer;
