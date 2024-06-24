import React from "react";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  document.body.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") {
      let logo = document.getElementById("logo");
      logo.scrollIntoView({ behavior: "smooth" });
      logo.style.scale = "1.2";
      setTimeout(() => {
        logo.style.scale = "1";
      }, 2000);
    }
    if (e.key === "ArrowDown") {
      let logo = document.getElementById("logo");
      logo.scrollIntoView({ behavior: "smooth" });
      logo.style.scale = "0.8";
      setTimeout(() => {
        logo.style.scale = "1";
      }, 2000);
    }
  });
  return (
    <header className="bg-stone-200 shadow fixed top-0 w-full z-50">
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
        <div className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-black lg:items-center lg:justify-center mb-4 md:mb-0">
          <Link to="/" className="flex items-center" id="logo">
            <FaPlay className="w-8 h-8 text-stone-700 p-2 bg-stone-500 rounded-full" />
            <span className="ml-3 text-xl">MixiMedia</span>
          </Link>
        </div>
        <nav className="lg:w-2/5 flex flex-wrap items-center text-base md:ml-2">
          <Link
            to="/"
            className="mr-5 hover:text-stone-900 text-lg font-semibold"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="mr-5 hover:text-stone-900 text-lg font-semibold"
          >
            About
          </Link>
          <Link
            to="/listeningnow"
            className="mr-5 hover:text-stone-900 text-lg font-semibold"
          >
            Listening Now
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
