import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    src: "../Public/Running Outta Time.mp3",
    title: "Running Outta Time",
    artist: "Future",
    img: "../Public/images/runningouttatime.png",
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
    <div className="w-1/2 relative">
      <Slider {...settings}>
        {audioList.map((audio, index) => (
          <div key={index} className="flex flex-col items-center p-2">
            <div className="bg-gray-100 rounded-2xl h-64 w-64 flex justify-center items-center shadow-md">
              <img
                src={audio.img}
                alt={audio.title}
                className="rounded-2xl h-56 w-56"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
