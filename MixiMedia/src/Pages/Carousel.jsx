import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Meltdown from "../assets/MELTDOWN (feat. Drake).mp3"
import MeltdownImg from "../assets/images/Meltdown.jpg"
import FreezeRaël from "../assets/Freeze Raël.mp3"
import FreezeRaëlImg from "../assets/images/freezerael.jpg"
import Redbone from "../assets/Redbone.mp3"
import RedboneImg from "../assets/images/redbone.jpg"
import RunningOuttaTime from "../assets/Runnin Outta Time.mp3"
import RunningOuttaTimeImg from "../assets/images/running1.jpg"


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


const Carousel = ({ onSlideChange }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    beforeChange: (current, next) => onSlideChange(next),
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1028,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className=" w-4/5 relative">
      <Slider {...settings}>
        {audioList.map((audio, index) => (
          <div key={index} className="flex flex-col items-center p-2">
            <div className="rounded-2xl h-64 w-64 flex justify-center items-center">
              <img
                src={audio.img}
                alt={audio.title}
                className="rounded-md h-56 w-56 shadow-lg"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
