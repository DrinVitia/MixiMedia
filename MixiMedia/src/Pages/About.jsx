import React, { useState, useEffect } from "react";
import ParticleBackground from "../Pixi/ParticleBackground";
import Preloader from "../Pages/Preloader";
// import Asap from "../assets/images/asap.jpg";
import Myvideo from "../assets/21 Savage - redrum.mp4";
// import RunningOuttaTimeImg from "../assets/images/running1.jpg"

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div>
          <div className="absolute inset-0 w-full h-full top-0 left-0">
            <ParticleBackground />
          </div>
          <div className="absolute self-center left-[25vw] flex flex-col items-center justify-center min-h-screen bg-transparent text-stone-100 p-8 overflow-hidden">
            <div className="flex flex-col items-center space-y-8 bg-stone-800 p-24">
              <h1 className="text-4xl font-bold">About MixiMedia</h1>
              <p className="text-center">
                MixiMedia is a music player app built with React and Tailwind
                CSS. It uses the Web Audio to play audio files.
              </p>
              <video
                title="My Video"
                src={Myvideo}
                style={{ maxWidth: "100%", width: "800px", height: "500px" }}
                controls
                autoPlay
                muted
                loop
                frameBorder="0"
                allowFullScreen
                loading="lazy"
              ></video>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;
