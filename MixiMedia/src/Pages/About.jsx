import React from "react";
import ParticleBackground from "../Pixi/ParticleBackground";

const About = () => {
  return (
    <div>
      <div className="absolute inset-0 w-full h-full top-0 left-0">
        <ParticleBackground />
      </div>
      <div className="absolute self-center left-[25vw] flex flex-col items-center justify-center min-h-screen bg-transparent text-white p-8 overflow-hidden">
        <div className="flex flex-col items-center space-y-8 bg-gray-900 p-24">
          <h1 className="text-4xl font-bold">About MixiMedia</h1>
          <p className="text-center">
            MixiMedia is a music player app built with React and Tailwind CSS.
            It uses the Web Audio to play audio files.
          </p>
          <img
            src="https://magnolia.fillonit.tech/assets/Drugs-BkebkmFX.jpg"
            width={400}
            height={400}
            alt="Test"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
