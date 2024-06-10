import React, { useRef, useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";
import Preloader from "../Pages/Preloader";
import PixiImage from "../Pixi/PixiImage";

const audioList = [
  {
    src: "../Public/MELTDOWN (feat. Drake).mp3",
    title: "MELTDOWN (feat. Drake)",
    artist: "Travis Scott",
    img: "../Public/images/meltdown.jpg",
  },
  {
    src: "../Public/Freeze Raël.mp3",
    title: "Freeze Raël",
    artist: "Freeze Corleone",
    img: "../Public/images/freezerael.jpg",
  },
  {
    src: "../Public/Redbone.mp3",
    title: "Redbone",
    artist: "Childish Gambino",
    img: "../Public/images/redbone.jpg",
  },
  {
    src: "../Public/Runnin Outta Time.mp3",
    title: "Running Outta Time",
    artist: "Future",
    img: "../Public/images/runningouttatime.png",
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
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
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

  useEffect(() => {
    setIsLoading(true);
  }, [currentTrack]);

  return (
    <div className="flex flex-col items-center space-y-4 bg-white shadow-lg rounded-lg p-4 w-80">
      <div className="w-64 h-64">
        <PixiImage src={audioList[currentTrack].img} />
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold">{audioList[currentTrack].title}</h2>
        <p className="text-gray-600">{audioList[currentTrack].artist}</p>
      </div>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <div className="flex items-center space-x-4">
            <FaStepBackward
              onClick={playPrevious}
              className="text-3xl text-black cursor-pointer hover:text-gray-900"
            />
            {isPlaying ? (
              <FaPause
                onClick={togglePlay}
                className="text-3xl text-black cursor-pointer hover:text-gray-900"
              />
            ) : (
              <FaPlay
                onClick={togglePlay}
                className="text-3xl text-black cursor-pointer hover:text-gray-900"
              />
            )}
            <FaStepForward
              onClick={playNext}
              className="text-3xl text-black cursor-pointer hover:text-gray-900"
            />
          </div>
          <div className="w-full flex items-center">
            <span className="text-gray-600">{formatTime(currentTime)}</span>
            <input
              type="range"
              value={(currentTime / duration) * 100 || 0}
              onChange={handleSeek}
              className="w-full mx-2"
            />
            <span className="text-gray-600">{formatTime(duration)}</span>
          </div>
        </>
      )}
      <div className="flex items-center w-full mt-4">
        {isMuted ? (
          <FaVolumeMute
            className="text-gray-600 mr-2 cursor-pointer"
            onClick={handleMute}
          />
        ) : (
          <FaVolumeUp
            className="text-gray-600 mr-2 cursor-pointer"
            onClick={handleMute}
          />
        )}
        <input
          type="range"
          value={isMuted ? 0 : volume * 100}
          onChange={handleVolumeChange}
          className="w-full
          appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full 
  [&::-webkit-slider-runnable-track]:bg-black/25 
  [&::-webkit-slider-thumb]:appearance-none 
  [&::-webkit-slider-thumb]:h-5 
  [&::-webkit-slider-thumb]:w-5 
  [&::-webkit-slider-thumb]:rounded-full
  [&::-webkit-slider-thumb]:bg-slate-900"
          min="0"
          max="100"
        />
      </div>
      <audio ref={audioRef} src={audioList[currentTrack].src} />
    </div>
  );
}

export default AudioPlayer;
