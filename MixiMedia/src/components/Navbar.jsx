import React from "react";
import { FaPlay } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="bg-stone-300 shadow fixed top-0 w-full z-50">
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
        <a className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-black lg:items-center lg:justify-center mb-4 md:mb-0">
          <FaPlay className="w-8 h-8 text-stone-700 p-2 bg-stone-500 rounded-full" />
          <span className="ml-3 text-xl">MixiMedia</span>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
