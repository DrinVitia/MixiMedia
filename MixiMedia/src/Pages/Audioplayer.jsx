import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import PixiImage from "../Pixi/PixiImage";
import Carousel from "../Pages/Carousel";

import Meltdown from "../assets/MELTDOWN (feat. Drake).mp3";
import MeltdownImg from "../assets/images/Meltdown.jpg";
import FreezeRaël from "../assets/Freeze Raël.mp3";
import FreezeRaëlImg from "../assets/images/freezerael.jpg";
import Redbone from "../assets/Redbone.mp3";
import RedboneImg from "../assets/images/redbone.jpg";
import RunningOuttaTime from "../assets/Runnin Outta Time.mp3";
import RunningOuttaTimeImg from "../assets/images/running1.jpg";

const audioList = [
  {
    src: Meltdown,
    title: "MELTDOWN (feat. Drake)",
    artist: "Travis Scott",
    img: MeltdownImg,
  },
  {
    src: FreezeRaël,
    title: "Freeze Raël",
    artist: "Freeze Corleone",
    img: FreezeRaëlImg,
  },
  {
    src: Redbone,
    title: "Redbone",
    artist: "Childish Gambino",
    img: RedboneImg,
  },
  {
    src: RunningOuttaTime,
    title: "Running Outta Time",
    artist: "Future",
    img: RunningOuttaTimeImg,
  },
];

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function AudioPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    audioRef.current.muted = !audioRef.current.muted;
  };

  const playNext = () => {
    setCurrentTrack((currentTrack + 1) % audioList.length);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    setCurrentTrack((currentTrack - 1 + audioList.length) % audioList.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleSeek = (event) => {
    const seekTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (event) => {
    const volumeValue = event.target.value / 100;
    audioRef.current.volume = volumeValue;
    setVolume(volumeValue);
  };

  useEffect(() => {
    const handleCanPlay = () => {
      setDuration(audioRef.current.duration);
      if (isPlaying) {
        audioRef.current.play();
      }
    };

    const audioElement = audioRef.current;
    audioElement.addEventListener("canplaythrough", handleCanPlay);
    audioElement.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audioElement.removeEventListener("canplaythrough", handleCanPlay);
      audioElement.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [currentTrack, isPlaying]);

  document.body.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      let title = audioList[currentTrack].title;
      let artist = audioList[currentTrack].artist;
      window.open(`https://open.spotify.com/search/${title}%20${artist}`);
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-stone-600 to-stone-800">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center space-y-4 bg-stone-300 shadow-lg rounded-lg p-8 w-full sm:w-3/4 md:w-1/2">
          <div className=" rounded-full overflow-hidden">
            <PixiImage src={audioList[currentTrack].img} />
          </div>
          <div className="text-center">
            <h2 className="text-sm sm:text-md md:text-xl font-bold">
              {audioList[currentTrack].title}
            </h2>
            <p className="text-gray-600">{audioList[currentTrack].artist}</p>
          </div>
          <div className="flex items-center space-x-4">
            <FaStepBackward
              onClick={playPrevious}
              className="text-sm sm:text-md md:text-3xl text-black cursor-pointer hover:text-gray-900"
            />
            {isPlaying ? (
              <FaPause
                onClick={togglePlay}
                className="text-sm sm:text-md md:text-3xl text-black cursor-pointer hover:text-gray-900"
              />
            ) : (
              <FaPlay
                onClick={togglePlay}
                className="text-sm sm:text-md md:text-3xl text-black cursor-pointer hover:text-gray-900"
              />
            )}
            <FaStepForward
              onClick={playNext}
              className="text-sm sm:text-md md:text-3xl text-black cursor-pointer hover:text-gray-900"
            />
          </div>
          <div className="w-full flex items-center justify-center">
            <span className="text-gray-600 mr-2">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              value={(currentTime / duration) * 100 || 0}
              onChange={handleSeek}
              className="w-2/4 appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full 
[&::-webkit-slider-runnable-track]:bg-black/25 
[&::-webkit-slider-thumb]:appearance-none 
[&::-webkit-slider-thumb]:h-4
[&::-webkit-slider-thumb]:w-4
[&::-webkit-slider-thumb]:rounded-full
[&::-webkit-slider-thumb]:bg-slate-900"
              min="0"
              max="100"
            />
            <span className="text-gray-600 ml-2">{formatTime(duration)}</span>
          </div>
          <div className="flex items-center justify-center w-full mt-4">
            {isMuted ? (
              <FaVolumeMute
                className="text-gray-600 mr-2 cursor-pointer text-sm"
                onClick={handleMute}
              />
            ) : (
              <FaVolumeUp
                className="text-gray-600 mr-2 cursor-pointer text-sm"
                onClick={handleMute}
              />
            )}
            <input
              type="range"
              value={isMuted ? 0 : volume * 100}
              onChange={handleVolumeChange}
              className="w-2/4 appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full 
[&::-webkit-slider-runnable-track]:bg-black/25 
[&::-webkit-slider-thumb]:appearance-none 
[&::-webkit-slider-thumb]:h-4
[&::-webkit-slider-thumb]:w-4
[&::-webkit-slider-thumb]:rounded-full
[&::-webkit-slider-thumb]:bg-slate-900"
              min="0"
              max="100"
            />
          </div>
          <audio ref={audioRef} src={audioList[currentTrack].src} />
          <div className="mt-8 w-full flex justify-center">
            <Carousel
              onSlideChange={(next) => console.log("Slide changed to: ", next)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
