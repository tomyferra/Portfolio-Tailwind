import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";

function Navbar() {
  const [nav, setNav] = useState(true);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 text-white">
      <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">
        TOMAS FERRARI
      </h1>
      <ul className="hidden md:flex">

        <li className="p-4"><a aria-current="page" href="#About">About</a></li>
        <li className="p-4"><a aria-current="page" href="#Experience">Experience</a></li>
        <li className="p-4"><a aria-current="page" href="#Apps">Apps</a></li>
        <li className="p-4"><a aria-current="page" href="#Skills">Skills</a></li>
        <li className="p-4"><a aria-current="page" href="#Contact">Contact</a></li>
      </ul>
      <div className=" block md:hidden" onClick={handleNav}>
        {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          !nav
            ? "fixed left-0 top-0 w-[50%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">
          Tomas Ferrari
        </h1>
        <ul className="pt-4">
          <li className="p-4 border-b border-gray-600"><a onClick={handleNav} aria-current="page" href="#About">About</a></li>
          <li className="p-4 border-b border-gray-600"><a onClick={handleNav} aria-current="page" href="#Experience">Experience</a></li>
          <li className="p-4 border-b border-gray-600"><a onClick={handleNav} aria-current="page" href="#Apps">Apps</a></li>
          <li className="p-4 border-b border-gray-600"><a onClick={handleNav} aria-current="page" href="#Skills">Skills</a></li>
          <li className="p-4"><a onClick={handleNav} aria-current="page" href="#Contact">Contact</a></li>
        </ul>
      </div>
    </div>
  );
}
export default Navbar;
